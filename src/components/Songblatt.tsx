import { useEffect, useMemo, useRef, useState } from 'react'
import { akkordNach } from '../data/akkorde'
import { PAUSE, anzeigeName, gegriffen, griffId, taktZahl, type AnschlagId, type Lied, type SongAbschnitt } from '../data/songblatt'
import { useLiedTexte } from '../lib/liedtext'
import { klick, starteTakt, useAudioContext } from '../lib/takt'
import Griffbild from './Griffbild'

// „Das ganze Lied" in den Lernschritten: komplettes Akkordblatt Takt für Takt in
// den Original-Griffen (ohne Kapodaster), mit Griffbildern und Tipps je Abschnitt und einem
// Mitspiel-Modus (Einzählen, Klick, aktueller Takt wird markiert und mitgescrollt).
// Hat ein Lied Vereinfachungen (`einfach`, z.B. Zombie: D statt D/F♯), gibt es einen
// Umschalter zwischen einfacher Ansicht und Original.
// Ein Klick auf einen Takt setzt den Startpunkt. Jede Kachel zeigt die Anschläge des
// gewählten Musters auf 8 Achtel-Plätzen (1 + 2 + 3 + 4 +); beim Mitspielen leuchtet
// der aktuelle Platz. Geben Abschnitte ihren Anschlag selbst vor (`anschlag`, z.B. 505
// laut Video), gibt es zusätzlich „Wie im Video": jeder Abschnitt mit seinem Muster.
// Abschnitte mit `tempo` laufen beim Mitspielen entsprechend schneller.
// Liedtexte enthält die Seite nicht (Urheberrecht): Je Abschnitt kann man den Text selbst
// eintragen – gespeichert nur im eigenen Browser (lib/liedtext.ts), optional mit Link zum Text.

const SCHLAEGE = 4
const EINZAEHLEN = 4

/** Anschläge je Achtel: ↓ ab, ↑ auf, – Luftschlag, '' = nichts (Hand pendelt nur). */
const ANSCHLAG: Record<AnschlagId, { name: string; slots: string[] }> = {
  // Nur beim Akkordwechsel anschlagen – dauert ein Akkord mehrere Takte, klingt er weiter
  einzeln: { name: '↓  Einmal pro Akkord', slots: ['↓', '', '', '', '', '', '', ''] },
  viertel: { name: '↓ ↓ ↓ ↓  Viertel (Einstieg)', slots: ['↓', '', '↓', '', '↓', '', '↓', ''] },
  song: { name: '↓ – ↓↑ – ↑ ↓↑  Song-Muster', slots: ['↓', '–', '↓', '↑', '–', '↑', '↓', '↑'] },
  rock: { name: '↓↓↓↓↓↓↓↓  Rock-Achtel (laut)', slots: ['↓', '↓', '↓', '↓', '↓', '↓', '↓', '↓'] },
  offbeat: { name: '↓ – ↓↑ – ↑ – ↑  Blue-Hair-Muster', slots: ['↓', '–', '↓', '↑', '–', '↑', '–', '↑'] },
}
const STANDARD_ANSCHLAEGE: AnschlagId[] = ['viertel', 'song']
const STANDARD_ANSICHTEN = { einfach: 'Einfache Griffe', original: 'Wie im Original' }
const ZAEHLZEIT = ['1', '+', '2', '+', '3', '+', '4', '+']

/** Auswahl „jeder Abschnitt mit seinem eigenen Anschlag" (nur wenn Abschnitte `anschlag` haben). */
const QUELLE = 'quelle'
type Auswahl = AnschlagId | typeof QUELLE

/** Startindex (global über alle Abschnitte) je Abschnitt. */
const offsetsVon = (lied: Lied) =>
  lied.abschnitte.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + lied.abschnitte[i - 1].takte.length)
    return acc
  }, [])

/** Index des Abschnitts, in dem der globale Takt `g` liegt. */
function abschnittVon(offsets: number[], g: number): number {
  let i = 0
  while (i + 1 < offsets.length && offsets[i + 1] <= g) i++
  return i
}

interface Position {
  takt: number // global, -1 = Einzählen
  achtel: number // 0–7 (Schlag = achtel / 2)
}

function AnschlagZeile({ anschlag, aktivesAchtel }: { anschlag: AnschlagId; aktivesAchtel?: number }) {
  return (
    <span className="sb-anschlag" aria-hidden="true">
      {ANSCHLAG[anschlag].slots.map((s, a) => (
        <i key={a} className={`${a % 2 ? '' : 'schlag'}${aktivesAchtel === a ? ' an' : ''}`}>
          {s}
        </i>
      ))}
    </span>
  )
}

/** Eigener Text eines Abschnitts: anzeigen, eintragen, bearbeiten (leer speichern = löschen). */
function AbschnittText({
  text,
  entwurf,
  aktiv,
  onEntwurf,
  onSpeichern,
}: {
  text?: string
  entwurf: string | null
  aktiv: boolean
  onEntwurf: (t: string | null) => void
  onSpeichern: (t: string) => void
}) {
  if (entwurf !== null) {
    return (
      <div className="sb-text">
        <textarea
          className="sb-text-feld"
          value={entwurf}
          onChange={e => onEntwurf(e.target.value)}
          rows={Math.max(5, entwurf.split('\n').length + 1)}
          placeholder="Text für diesen Abschnitt einfügen oder eintippen …"
          aria-label="Eigener Text zu diesem Abschnitt"
        />
        <div className="sb-text-knoepfe">
          <button
            type="button"
            className="filter-btn on"
            onClick={() => {
              onSpeichern(entwurf)
              onEntwurf(null)
            }}
          >
            Speichern
          </button>
          <button type="button" className="filter-btn" onClick={() => onEntwurf(null)}>
            Abbrechen
          </button>
        </div>
        <p className="sb-text-hinweis">Nur in diesem Browser gespeichert. Leer speichern löscht den Text.</p>
      </div>
    )
  }
  if (!text) {
    return (
      <button type="button" className="sb-link sb-text-neu" onClick={() => onEntwurf('')}>
        📝 Text eintragen
      </button>
    )
  }
  return (
    <div className={`sb-text${aktiv ? ' aktiv' : ''}`}>
      <p className="sb-text-inhalt">{text}</p>
      <button type="button" className="sb-link sb-text-bearbeiten" onClick={() => onEntwurf(text)}>
        Bearbeiten
      </button>
    </div>
  )
}

function Abschnitt({
  lied,
  abschnitt,
  vereinfacht,
  offset,
  position,
  startTakt,
  anschlag,
  onTaktKlick,
  zeigeText,
  text,
  onText,
}: {
  lied: Lied
  abschnitt: SongAbschnitt
  vereinfacht: boolean
  offset: number
  position: Position | null
  startTakt: number
  anschlag: AnschlagId
  onTaktKlick: (i: number) => void
  zeigeText: boolean
  text?: string
  onText: (text: string) => void
}) {
  const [entwurf, setEntwurf] = useState<string | null>(null)
  const mitText = zeigeText && (text !== undefined || entwurf !== null)
  const imAbschnitt = position !== null && position.takt >= offset && position.takt < offset + abschnitt.takte.length
  const griffe = useMemo(() => {
    const ids = new Set(abschnitt.takte.flat().map(a => griffId(gegriffen(lied, a, vereinfacht))))
    return [...ids].map(id => (id ? akkordNach(id) : undefined)).filter(a => a !== undefined)
  }, [lied, abschnitt, vereinfacht])

  return (
    <section className="card sb-abschnitt">
      {abschnitt.vorher && <p className="sb-vorher">⚠️ {abschnitt.vorher}</p>}
      <div className="sb-kopf">
        <h3 className="sb-titel">{abschnitt.name}</h3>
        <span className="ub-badge">{abschnitt.takte.length} Takte</span>
      </div>

      {abschnitt.tab && (
        <div className="sb-tab">
          <p className="sb-label">Melodie</p>
          <pre>{abschnitt.tab}</pre>
        </div>
      )}

      <div className={`sb-inhalt${mitText ? ' mit-text' : ''}`}>
        <div className="sb-takte">
          {abschnitt.takte.map((takt, i) => {
            const g = offset + i
            const aktiv = position?.takt === g
            const pause = takt.every(a => a === PAUSE)
            const klingt = anschlag === 'einzeln' && i > 0 && takt.join() === abschnitt.takte[i - 1].join()
            const griffText = takt.map(a => anzeigeName(gegriffen(lied, a, vereinfacht)))
            const originalText = takt.map(anzeigeName).join(' · ')
            return (
              <button
                key={i}
                type="button"
                className={`sb-takt${aktiv ? ' aktiv' : ''}${pause ? ' pause' : ''}${!position && startTakt === g && g > 0 ? ' start' : ''}`}
                onClick={() => onTaktKlick(g)}
                aria-label={`Takt ${i + 1}: ${griffText.join(', ')}. Ab hier mitspielen`}
                data-takt={g}
              >
                <span className="sb-taktnr">{i + 1}</span>
                <span className="sb-akkorde">
                  {griffText.map((a, j) => (
                    <span key={j} className="sb-akkord">
                      {a}
                    </span>
                  ))}
                </span>
                {/* Original klein darunter, wenn in der einfachen Ansicht etwas anderes steht */}
                {!pause && originalText !== griffText.join(' · ') && <span className="sb-original">{originalText}</span>}
                {pause ? (
                  <span className="sb-original">nicht spielen, mitzählen</span>
                ) : klingt ? (
                  <span className="sb-original">klingen lassen</span>
                ) : (
                  <AnschlagZeile anschlag={anschlag} aktivesAchtel={aktiv ? position.achtel : undefined} />
                )}
              </button>
            )
          })}
        </div>
        {zeigeText && (
          <AbschnittText text={text} entwurf={entwurf} aktiv={imAbschnitt} onEntwurf={setEntwurf} onSpeichern={onText} />
        )}
      </div>

      <div className="griffbild-reihe">
        {griffe.map(a => (
          <Griffbild key={a.id} akkord={a} breite={72} />
        ))}
      </div>
      <p className="tipp-block">💡 {!vereinfacht && abschnitt.tippOriginal ? abschnitt.tippOriginal : abschnitt.tipp}</p>
      {abschnitt.unsicher && <p className="sb-unsicher">❓ {abschnitt.unsicher}</p>}
    </section>
  )
}

export default function Songblatt({ lied }: { lied: Lied }) {
  const getCtx = useAudioContext()
  const offsets = useMemo(() => offsetsVon(lied), [lied])
  const gesamt = taktZahl(lied)
  const anschlaege = lied.anschlaege ?? STANDARD_ANSCHLAEGE
  const ansichten = lied.ansichten ?? STANDARD_ANSICHTEN
  const jeAbschnitt = lied.abschnitte.some(a => a.anschlag)
  const [anschlag, setAnschlag] = useState<Auswahl>(jeAbschnitt ? QUELLE : anschlaege[0])
  /** Muster, mit dem ein Abschnitt in der aktuellen Auswahl gespielt wird. */
  const musterVon = (a: SongAbschnitt): AnschlagId => (anschlag === QUELLE ? (a.anschlag ?? anschlaege[0]) : anschlag)
  const legendeMuster = [...new Set(lied.abschnitte.map(musterVon))]
  const [vereinfacht, setVereinfacht] = useState(true)
  const [bpm, setBpm] = useState(lied.uebeBpm)
  const [laeuft, setLaeuft] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)
  const [startTakt, setStartTakt] = useState(0)
  const [mitscrollen, setMitscrollen] = useState(true)
  const [zeigeText, setZeigeText] = useState(true)
  const [texte, setText] = useLiedTexte(lied.id)
  const wurzel = useRef<HTMLDivElement>(null)

  // Wiedergabe: Klicks (Viertel) mit Vorlauf in AudioContext-Zeit planen,
  // Anzeige (Achtel, für die Anschlag-Pfeile) aus derselben Uhr ableiten.
  // Einzählen im gewählten Tempo, danach je Abschnitt mal seinem `tempo`-Faktor.
  useEffect(() => {
    if (!laeuft) return
    const ctx = getCtx()
    const dauern: number[] = Array(EINZAEHLEN).fill(60 / bpm)
    for (let g = startTakt; g < gesamt; g++) {
      const faktor = lied.abschnitte[abschnittVon(offsets, g)].tempo ?? 1
      for (let s = 0; s < SCHLAEGE; s++) dauern.push(60 / (bpm * faktor))
    }
    // beginn[i] = Start von Schlag i relativ zu t0 (ein Eintrag mehr als Schläge)
    const beginn = [0]
    for (const d of dauern) beginn.push(beginn[beginn.length - 1] + d)
    const t0 = ctx.currentTime + 0.15
    const gesamtSchlaege = dauern.length
    let geplant = 0
    let schlag = 0
    let letzte = -2

    const tick = () => {
      while (geplant < gesamtSchlaege && t0 + beginn[geplant] < ctx.currentTime + 0.1) {
        const erster = geplant % SCHLAEGE === 0
        klick(ctx, t0 + beginn[geplant], geplant < EINZAEHLEN ? 1200 : erster ? 1600 : 1000, erster ? 0.6 : 0.35)
        geplant++
      }
      const jetzt = ctx.currentTime - t0
      if (jetzt < 0) return
      while (schlag < gesamtSchlaege && beginn[schlag + 1] <= jetzt) schlag++
      if (schlag >= gesamtSchlaege) {
        setLaeuft(false)
        return
      }
      const e = schlag * 2 + (jetzt - beginn[schlag] >= dauern[schlag] / 2 ? 1 : 0)
      if (e === letzte) return
      letzte = e
      const imLied = e - EINZAEHLEN * 2
      setPosition(
        imLied < 0
          ? { takt: -1, achtel: e }
          : { takt: startTakt + Math.floor(imLied / (SCHLAEGE * 2)), achtel: imLied % (SCHLAEGE * 2) },
      )
    }

    const stopp = starteTakt(tick)
    tick()
    return () => {
      stopp()
      setPosition(null)
    }
  }, [laeuft, bpm, startTakt, gesamt, getCtx, lied, offsets])

  // Aktuellen Takt im Blick behalten
  const aktTakt = position?.takt ?? -1
  const aktAbschnitt = aktTakt >= 0 ? lied.abschnitte[abschnittVon(offsets, aktTakt)] : undefined
  useEffect(() => {
    if (!mitscrollen || aktTakt < 0) return
    wurzel.current?.querySelector(`[data-takt="${aktTakt}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [aktTakt, mitscrollen])

  const taktKlick = (i: number) => {
    setStartTakt(i)
    if (laeuft) {
      // Neustart ab dem gewählten Takt
      setLaeuft(false)
      requestAnimationFrame(() => setLaeuft(true))
    }
  }

  return (
    <div ref={wurzel}>
      <div className="card sb-steuerung">
        <div className="sb-kopf">
          <h3 className="ub-title">🎵 {lied.titel} – das ganze Lied</h3>
        </div>

        <div className="sb-legende">
          <p>
            <b>So liest du das Blatt:</b> Eine Kachel = <b>ein Takt</b> = <b>4 Schläge</b>. Zähl dabei „1 + 2 + 3 + 4 +". Die
            Pfeile unten in jeder Kachel zeigen, wann du anschlägst: ↓ abwärts, ↑ aufwärts, – Luftschlag (die Hand bewegt
            sich, trifft aber nicht). Stehen <b>zwei Akkorde</b> in einer Kachel, wechselst du auf Schlag 3.
            {legendeMuster.includes('einzeln') && (
              <>
                {' '}
                Bei <b>„klingen lassen"</b> schlägst du nicht neu an – der Akkord vom Takt davor klingt weiter.
              </>
            )}
          </p>
          {legendeMuster.map(m => (
            <div key={m} className="sb-legende-beispiel" aria-hidden="true">
              <AnschlagZeile anschlag={m} />
              <span className="sb-anschlag sb-zaehlzeit">
                {ZAEHLZEIT.map((z, a) => (
                  <i key={a}>{z}</i>
                ))}
              </span>
            </div>
          ))}
          <p>{gesamt} Takte insgesamt. Tipp auf einen Takt, um ab dort mitzuspielen.</p>
        </div>

        <p className="sb-label">Anschlag</p>
        <div className="filter-row">
          {jeAbschnitt && (
            <button type="button" className={`filter-btn${anschlag === QUELLE ? ' on' : ''}`} onClick={() => setAnschlag(QUELLE)}>
              {lied.quelle.video ? '🎬 Wie im Video' : 'Wie in der Quelle'} (je Abschnitt)
            </button>
          )}
          {anschlaege.map(id => (
            <button key={id} type="button" className={`filter-btn${anschlag === id ? ' on' : ''}`} onClick={() => setAnschlag(id)}>
              {ANSCHLAG[id].name}
            </button>
          ))}
        </div>

        {lied.einfach && (
          <>
            <p className="sb-label">Griffe</p>
            <div className="filter-row">
              <button type="button" className={`filter-btn${vereinfacht ? ' on' : ''}`} onClick={() => setVereinfacht(true)}>
                {ansichten.einfach}
              </button>
              <button type="button" className={`filter-btn${!vereinfacht ? ' on' : ''}`} onClick={() => setVereinfacht(false)}>
                {ansichten.original}
              </button>
            </div>
          </>
        )}

        <p className="sb-label">Tempo</p>
        <div className="filter-row">
          {lied.tempi.map(t => (
            <button
              key={t}
              type="button"
              className={`filter-btn${bpm === t ? ' on' : ''}`}
              onClick={() => setBpm(t)}
              disabled={laeuft}
            >
              {t} BPM{t === lied.bpm ? (lied.quelle.video ? ' (Video)' : ' (Original)') : t === lied.uebeBpm ? ' (Üben)' : ''}
            </button>
          ))}
        </div>

        <p className="sb-label">Text</p>
        <div className="sb-text-optionen">
          <label className="sb-option">
            <input type="checkbox" checked={zeigeText} onChange={e => setZeigeText(e.target.checked)} /> Eigenen Text anzeigen
          </label>
          {lied.liedtext && (
            <a className="filter-btn" href={lied.liedtext.url} target="_blank" rel="noopener noreferrer">
              📝 Liedtext bei {lied.liedtext.seite} ↗
            </a>
          )}
        </div>
        <p className="sb-text-hinweis">
          Die Seite enthält keine Liedtexte. Über „📝 Text eintragen" bei jedem Abschnitt kannst du den Text (oder eigene
          Notizen) selbst einfügen – er wird nur in diesem Browser gespeichert und nicht veröffentlicht.
        </p>

        <label className="sb-option">
          <input type="checkbox" checked={mitscrollen} onChange={e => setMitscrollen(e.target.checked)} /> Mitscrollen
        </label>

        <div className="sb-status" aria-live="polite">
          {position?.takt === -1 && <b>Einzählen: {Math.floor(position.achtel / 2) + 1}</b>}
          {aktAbschnitt && (
            <>
              <b>{aktAbschnitt.name}</b> · Takt {aktTakt + 1} von {gesamt}
              {aktAbschnitt.tempo && ` · ${Math.round(bpm * aktAbschnitt.tempo)} BPM`}
            </>
          )}
          {!position && startTakt > 0 && (
            <>
              Start ab Takt {startTakt + 1} ({lied.abschnitte[abschnittVon(offsets, startTakt)].name}) ·{' '}
              <button type="button" className="sb-link" onClick={() => setStartTakt(0)}>
                von vorn
              </button>
            </>
          )}
        </div>

        <button type="button" className={`wz-start${laeuft ? ' stop' : ''}`} onClick={() => setLaeuft(l => !l)}>
          {laeuft ? '■ Stopp' : `▶ Mitspielen (${bpm} BPM)`}
        </button>
      </div>

      {lied.abschnitte.map((a, i) => (
        <Abschnitt
          key={a.id}
          lied={lied}
          abschnitt={a}
          vereinfacht={vereinfacht}
          offset={offsets[i]}
          position={position}
          startTakt={startTakt}
          anschlag={musterVon(a)}
          onTaktKlick={taktKlick}
          zeigeText={zeigeText}
          text={texte[a.id]}
          onText={t => setText(a.id, t)}
        />
      ))}

      <p className="sb-quelle">
        {lied.rechte}.{' '}
        {lied.quelle.video
          ? `Akkorde, Aufbau und Anschläge nach dem Video-Tutorial von „${lied.quelle.autor}" auf`
          : `Akkorde nach ${lied.quelle.autor ? `der Transkription von „${lied.quelle.autor}" auf` : 'der offiziellen Tabulatur auf'}`}{' '}
        <a href={lied.quelle.url} target="_blank" rel="noopener noreferrer">
          {lied.quelle.video ? 'YouTube ↗' : 'Ultimate Guitar ↗'}
        </a>
        .{lied.quelle.zusatz && ` ${lied.quelle.zusatz}`} Taktaufteilung und Tipps von dieser Lernseite.
      </p>
    </div>
  )
}
