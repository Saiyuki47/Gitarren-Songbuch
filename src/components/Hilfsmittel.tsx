import { useEffect } from 'react'
import { akkordNach } from '../data/akkorde'
import { ORIGINAL_BPM, UEBE_BPM } from '../data/song'
import { songGriffe, taktText, type Lied } from '../data/songblatt'
import { GO_KK_RIDER } from '../data/lieder/goKkRider'
import { KK_CRUISIN } from '../data/lieder/kkCruisin'
import { ZOMBIE, ZOMBIE_AUFBAU } from '../data/lieder/zombie'
import { BLUE_HAIR } from '../data/lieder/blueHair'
import { LIED_505, LIED_505_AUFBAU } from '../data/lieder/lied505'
import Griffbild from './Griffbild'

// Hilfsmittel-Tab: druckbarer Spickzettel (wie die Hilfsmittel-Tabs der anderen
// Lernseiten), alles mit den Original-Griffen ohne Kapodaster. Seite 1: Go K.K. Rider
// (Griffe, Akkordfolge, Schlagmuster). Seite 2: die Barré-Formen mit ihren offenen
// Vorlagen. Seite 3: K.K. Cruisin'. Seite 4: Zombie. Seite 5: Blue Hair. Seite 6: 505.
// „🖨️ Drucken" öffnet den Druckdialog; per @media print werden Header/Tabs
// ausgeblendet und die Boxen A4-tauglich gesetzt.

interface Zeile {
  /** Optionales Label vor dem Inhalt. */
  l?: string
  /** Inhalt (Regel/Muster), in Monospace. */
  f: string
}

interface Box {
  t: string
  r: Zeile[]
}

/** Akkordfolge eines Abschnitts (per ID) als Kurztext. */
const folge = (lied: Lied, id: string) => taktText(lied.abschnitte.find(a => a.id === id)!.takte)

const SEITE_GO_KK: Box[] = [
  {
    t: 'Go K.K. Rider',
    r: [
      { l: 'Tonart', f: 'G♯-Moll, Schluss A-Moll (½ Ton höher)' },
      { l: 'Tempo', f: `${ORIGINAL_BPM} BPM, 4/4 (üben ab ${UEBE_BPM})` },
      { l: 'Aufbau', f: 'Intro 4 · Strophe 8 · Refrain 8 Takte' },
      { l: 'Blatt', f: '1 Zeile = 1 Takt, 2 Akkorde = je 2 Schläge' },
    ],
  },
  {
    t: 'Akkordfolge (· = 2 Akkorde im Takt)',
    r: [
      { l: 'Intro', f: folge(GO_KK_RIDER, 'intro') },
      { l: 'Strophe', f: folge(GO_KK_RIDER, 'strophe-1') },
      { l: 'Refrain', f: folge(GO_KK_RIDER, 'refrain-1') },
      { l: 'Bridge', f: folge(GO_KK_RIDER, 'bridge') },
      { l: 'Strophe ↑', f: folge(GO_KK_RIDER, 'strophe-hoch') },
      { l: 'Refrain ↑', f: folge(GO_KK_RIDER, 'refrain-hoch') },
    ],
  },
  {
    t: 'Schlagmuster (1 + 2 + 3 + 4 +)',
    r: [
      { l: 'Einstieg', f: '↓   ↓   ↓   ↓' },
      { l: 'Song', f: '↓ – ↓ ↑ – ↑ ↓ ↑' },
      { l: '2 Akkorde', f: 'Wechsel auf die 3 (in die Lücke)' },
    ],
  },
  {
    t: 'Üben',
    r: [
      { l: 'Anker', f: 'F♯ ↔ B: Barré bleibt im 2. Bund' },
      { l: 'Anker', f: 'G♯m ↔ C♯m: Barré bleibt im 4. Bund' },
      { l: 'Schwer', f: 'D♯7↔G♯m · G♯m↔F♯ · C♯m↔D♯7' },
      { l: 'Steigern', f: '3× fehlerfrei → +5 BPM' },
      { l: 'Fehler', f: '−10 BPM, Stelle isolieren' },
    ],
  },
]

const SEITE_BARRE: Box[] = [
  {
    t: 'Barré-Formen',
    r: [
      { l: 'E-Form', f: 'F (1. Bund), F♯ (2. Bund)' },
      { l: 'E7-Form', f: 'G♯7 = A♭7 (4. Bund), G♭7 (2. Bund)' },
      { l: 'Em-Form', f: 'G♯m (4. Bund), F♯m (2. Bund)' },
      { l: 'A-Form', f: 'A♯ (1. Bund), B (2. Bund)' },
      { l: 'A7-Form', f: 'B♭7 (1. Bund)' },
      { l: 'Am-Form', f: 'C♯m (4. Bund), Dm (5. Bund), Em (7. Bund)' },
    ],
  },
  {
    t: 'Barré-Technik',
    r: [
      { f: 'Zeigefinger flach, leicht auf die Außenkante drehen' },
      { f: 'Daumen tief hinter dem Hals, Armgewicht statt Kraft' },
      { f: 'Erst im 5. Bund üben, dann tiefer' },
      { f: 'Zwischenschritt: nur die 4 hohen Saiten anschlagen' },
    ],
  },
  {
    t: 'Bund finden (Grundton)',
    r: [
      { l: 'E-Saite', f: 'E 0 · F 1 · F♯ 2 · G 3 · G♯ 4' },
      { l: 'A-Saite', f: 'A 0 · A♯/B♭ 1 · B/H 2 · C 3 · C♯ 4' },
    ],
  },
  {
    t: 'Stimmung (tief → hoch)',
    r: [
      { l: 'Saiten', f: 'E  A  D  G  H  e   (6 → 1)' },
      { l: 'Nach Gehör', f: '5. Bund = nächste Leersaite, G → H: 4. Bund' },
    ],
  },
]

const SEITE_KK: Box[] = [
  {
    t: "K.K. Cruisin'",
    r: [
      { l: 'Tonart', f: 'E♭-Moll, Schluss ½ Ton höher' },
      { l: 'Tempo', f: `ca. ${KK_CRUISIN.bpm} BPM, 4/4 (üben ab ${KK_CRUISIN.uebeBpm})` },
      { l: 'Schleife', f: 'B7 → B♭7 → E♭7sus2 → A♭7 (jedes 2. Mal G♭7)' },
      { l: 'Pause', f: '2. Refrain beginnt mit 2 Takten N.C.' },
      { l: 'Schluss', f: 'C7 → B7 → E7sus2 → A7 / G7' },
    ],
  },
  {
    t: 'Wechsel-Tipps',
    r: [
      { f: 'B♭7 → E♭7sus2: Barré bleibt im 1. Bund' },
      { f: 'A♭7 = G♯7 aus Go K.K. Rider (E7-Form, 4. Bund)' },
      { f: 'G♭7 = dieselbe E7-Form im 2. Bund' },
      { f: 'Sprünge: E♭7sus2 → A♭7 und A♭7 → B7 auf Schlag 4 vorbereiten' },
    ],
  },
  {
    t: 'Intro-Melodie',
    r: [
      { l: 'Töne', f: 'G3 H4 H2 G3 G1 D4 G1 G3 D4 D1' },
      { f: 'Saite + Bund, ein Finger pro Bund, Rhythmus nach Gehör' },
    ],
  },
]

const SEITE_ZOMBIE: Box[] = [
  {
    t: 'Zombie',
    r: [
      { l: 'Tonart', f: 'E-Moll, nur offene Griffe' },
      { l: 'Tempo', f: `ca. ${ZOMBIE.bpm} BPM, 4/4 (üben ab ${ZOMBIE.uebeBpm})` },
      { l: 'Schleife', f: 'Em → C → G → D, je 1 Takt – der ganze Song' },
      { l: 'Original', f: 'D/F♯ statt D, oft Cmaj7 statt C' },
    ],
  },
  {
    t: 'Aufbau (Runden der Schleife)',
    r: [
      { f: ZOMBIE_AUFBAU.slice(0, 5).map(a => `${a.name} ${a.runden}×`).join(' · ') },
      { f: ZOMBIE_AUFBAU.slice(5).map(a => `${a.name} ${a.runden}×`).join(' · ') },
    ],
  },
  {
    t: 'Anschlag und Dynamik (1 + 2 + 3 + 4 +)',
    r: [
      { l: 'Leise', f: '↓   ↓   ↓   ↓   (Strophe, oder zupfen)' },
      { l: 'Song', f: '↓ – ↓ ↑ – ↑ ↓ ↑' },
      { l: 'Laut', f: '↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓   (Refrain, Solo)' },
      { l: 'Zupfen', f: 'Bass G H e H G H G' },
    ],
  },
  {
    t: 'Wechsel-Tricks',
    r: [
      { f: 'Em → C: Em mit Zeige-/Mittelfinger, Mittelfinger bleibt' },
      { f: 'G → D: Ringfinger e-Saite → H-Saite (3. Bund)' },
      { f: 'D/F♯: Bass läuft G → F♯ → E zurück zum Em' },
      { f: 'Leise heißt nicht langsamer – beim Klick bleiben' },
    ],
  },
]

const SEITE_BLUE_HAIR: Box[] = [
  {
    t: 'Blue Hair',
    r: [
      { l: 'Tonart', f: 'E-Dur, ohne Kapo' },
      { l: 'Tempo', f: `ca. ${BLUE_HAIR.bpm} BPM, 4/4 (üben ab ${BLUE_HAIR.uebeBpm})` },
      { l: 'Strophe', f: 'Emaj7 ↔ Amaj7, je 1 Takt' },
      { l: 'Refrain', f: 'F♯m ↔ B7sus2, je 1 Takt (Barré 2. Bund)' },
    ],
  },
  {
    t: 'Aufbau (Takte)',
    r: [
      { f: 'Intro 8 · Strophe 16 · Refrain 8 · Zwischenspiel 8' },
      { f: 'Strophe → Refrain → Zwischenspiel 3×, dann Solo 16' },
      { f: 'Zwischenspiel und Solo wie die Strophe (Emaj7 ↔ Amaj7)' },
    ],
  },
  {
    t: 'Schlagmuster (1 + 2 + 3 + 4 +)',
    r: [
      { l: 'Einstieg', f: '↓   ↓   ↓   ↓' },
      { l: 'Song', f: '↓ – ↓ ↑ – ↑ – ↑' },
      { f: 'Auf der 4 nur Luftschlag – Hand pendelt weiter' },
    ],
  },
  {
    t: 'Wechsel-Tricks',
    r: [
      { f: 'Emaj7 → Amaj7: Zeigefinger bleibt auf G-Saite, 1. Bund' },
      { f: 'F♯m → B7sus2: Barré + kleiner Finger bleiben, Ringfinger weg' },
      { f: 'Amaj7 → F♯m: Griff auf der 4 lösen, Barré zuerst' },
      { f: 'F♯m-Zwischenschritt: nur 4 hohe Saiten (xx4222)' },
    ],
  },
]

/** Abschnitte von 505 als Kurztext, z.B. „Intro 8 · Refrain 16". */
const aufbau505 = (von: number, bis?: number) =>
  LIED_505_AUFBAU.slice(von, bis)
    .map(a => `${a.name} ${a.takte}`)
    .join(' · ')

const SEITE_505: Box[] = [
  {
    t: '505 (wie im Video)',
    r: [
      { l: 'Tonart', f: 'D-Moll (Dorisch), ohne Kapo' },
      { l: 'Tempo', f: `ca. ${LIED_505.bpm} BPM, ab Strophe 3 ca. 122 (üben ab ${LIED_505.uebeBpm})` },
      { l: 'Runde', f: 'Dm Dm Em Em – je Akkord 2 Takte' },
      { l: 'Song', f: 'Dieselbe Runde von Anfang bis Ende' },
    ],
  },
  {
    t: 'Aufbau (Takte)',
    r: [
      { l: '↓ 1×', f: aufbau505(0, 2) },
      { l: 'DDU UDU', f: aufbau505(2, 5) },
      { l: '↓ 1×', f: aufbau505(5, 6) },
      { l: 'schneller', f: `${aufbau505(6, 9)} (DDU UDU)` },
      { l: '↓ 1×', f: `${aufbau505(9)} – ausklingen` },
    ],
  },
  {
    t: 'Anschlag (1 + 2 + 3 + 4 +)',
    r: [
      { l: 'DOWN', f: '↓ auf die 1, zwei Takte klingen lassen' },
      { l: 'DDU UDU', f: '↓ – ↓ ↑ – ↑ ↓ ↑  (2× pro Akkord)' },
      { f: 'DDU UDU = Song-Muster aus Go K.K. Rider' },
    ],
  },
  {
    t: 'Wechsel-Tricks',
    r: [
      { f: 'Em mit Zeige-/Mittelfinger: Mittelfinger bleibt im 2. Bund' },
      { f: 'Dm: tiefe E-Saite still, leere A-Saite darf klingen' },
      { f: 'Umgreifen auf 4+ – Leersaiten dürfen kurz klingen' },
      { f: 'Barré-Variante (Bonus): Am-Form 5. Bund → 7. Bund' },
    ],
  },
]

function Griffuebersicht({ griffe, titel }: { griffe: string[]; titel: string }) {
  const liste = griffe.map(id => akkordNach(id)!)
  return (
    <section className="hm-box hm-griffe">
      <h4>{titel}</h4>
      <div className="hm-griffe-raster">
        {liste.map(a => (
          <Griffbild key={a.id} akkord={a} breite={76} />
        ))}
      </div>
    </section>
  )
}

interface SeiteProps {
  boxen: Box[]
  nr: number
  titel: string
  griffe: string[]
  griffTitel: string
}

function SpickzettelSeite({ boxen, nr, titel, griffe, griffTitel }: SeiteProps) {
  return (
    <div className="hm-page">
      <p className="hm-page-head">
        {titel} · Seite {nr}
      </p>
      <Griffuebersicht griffe={griffe} titel={griffTitel} />
      <div className="hm-grid">
        {boxen.map(box => (
          <section key={box.t} className="hm-box">
            <h4>{box.t}</h4>
            <ul>
              {box.r.map(zeile => (
                <li key={zeile.f}>
                  {zeile.l && <span className="hm-label">{zeile.l}</span>}
                  <span className="hm-code">{zeile.f}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

export default function Hilfsmittel() {
  useEffect(() => injectCss(), [])
  return (
    <div>
      <div className="section-header no-print">
        <h2>Spickzettel</h2>
        <p>
          Alle Song-Griffe und Kurzregeln auf A4 (Seite 1: Go K.K. Rider, Seite 2: Barré-Formen, Seite 3: K.K. Cruisin',
          Seite 4: Zombie, Seite 5: Blue Hair, Seite 6: 505) – zum Ausdrucken und neben den Notenständer legen. „🖨️ Drucken" erzeugt ein sauberes Blatt ohne Menü und Tabs.
        </p>
      </div>
      <div className="filter-row no-print" style={{ marginBottom: '0.9rem' }}>
        <button type="button" className="filter-btn" onClick={() => window.print()}>
          🖨️ Drucken (A4)
        </button>
      </div>
      <SpickzettelSeite
        boxen={SEITE_GO_KK}
        nr={1}
        titel={GO_KK_RIDER.titel}
        griffe={songGriffe(GO_KK_RIDER)}
        griffTitel="Song-Griffe (erster Teil, dann Schluss nach dem Tonartwechsel)"
      />
      <SpickzettelSeite
        boxen={SEITE_BARRE}
        nr={2}
        titel="Barré-Formen"
        griffe={['E', 'Fis', 'E7', 'Gis7', 'Em', 'Gism', 'Fism', 'A', 'H', 'A7', 'Bes7', 'Am', 'Cism']}
        griffTitel="Offene Vorlage → Barré-Griff"
      />
      <SpickzettelSeite
        boxen={SEITE_KK}
        nr={3}
        titel={KK_CRUISIN.titel}
        griffe={songGriffe(KK_CRUISIN)}
        griffTitel="Song-Griffe (Schleife, dann Schluss)"
      />
      <SpickzettelSeite
        boxen={SEITE_ZOMBIE}
        nr={4}
        titel={ZOMBIE.titel}
        griffe={['Em', 'C', 'G', 'D', 'D-Fis', 'Cmaj7']}
        griffTitel="Griffe (D/F♯ und Cmaj7 fürs Original)"
      />
      <SpickzettelSeite
        boxen={SEITE_BLUE_HAIR}
        nr={5}
        titel={BLUE_HAIR.titel}
        griffe={songGriffe(BLUE_HAIR)}
        griffTitel="Song-Griffe (Strophe offen, Refrain mit Barré)"
      />
      <SpickzettelSeite
        boxen={SEITE_505}
        nr={6}
        titel={LIED_505.titel}
        griffe={[...songGriffe(LIED_505), 'Dm-Barre', 'Em-Barre']}
        griffTitel="Song-Griffe (offen, dazu die Barré-Variante)"
      />
    </div>
  )
}

// Selbst-injiziertes CSS (einmalig) inkl. @media print – wie beim DB-Hilfsmittel.
// Nutzt die Theme-Variablen aus lernseiten-ui/styles.css.
const HM_CSS = `
.hm-page{margin:0 0 1.2rem}
.hm-page-head{margin:0 0 .5rem;font-size:.8rem;font-weight:600;color:var(--text2)}
.hm-griffe{margin-bottom:.7rem}
.hm-griffe-raster{display:flex;flex-wrap:wrap;gap:.25rem .5rem;color:var(--text)}
.hm-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:.7rem}
.hm-box{border:1px solid var(--border2,var(--border));border-radius:8px;background:var(--bg2);padding:.55rem .7rem;break-inside:avoid}
.hm-box h4{margin:0 0 .35rem;font-size:.85rem;color:var(--text)}
.hm-box ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:.3rem}
.hm-box li{font-size:.78rem;line-height:1.45;color:var(--text)}
.hm-label{display:inline-block;margin-right:.4rem;padding:0 .35rem;border-radius:4px;background:var(--bg3);color:var(--text2);font-size:.72rem;font-weight:600}
.hm-code{font-family:var(--font-mono,monospace);font-size:.76rem;color:var(--text)}
@media print{
  header,.tabs,.no-print,.site-nav{display:none!important}
  body{background:#fff}
  .container{max-width:none;padding:0}
  .hm-page{break-after:page;margin:0}
  .hm-page:last-child{break-after:auto}
  .hm-grid{grid-template-columns:1fr 1fr;gap:8pt}
  .hm-box{border:.75pt solid #999;background:#fff;padding:5pt 7pt}
  .hm-box h4{color:#000;font-size:9.5pt;margin-bottom:2pt}
  .hm-box li{color:#000;font-size:8pt;line-height:1.35}
  .hm-label{background:#eee;color:#333}
  .hm-code{color:#000}
  .hm-page-head{color:#333}
  .hm-griffe-raster{color:#000}
  .hm-griffe-raster svg{width:62px}
}
`

function injectCss() {
  if (typeof document === 'undefined') return
  if (document.getElementById('template-hilfsmittel-css')) return
  const s = document.createElement('style')
  s.id = 'template-hilfsmittel-css'
  s.textContent = HM_CSS
  document.head.appendChild(s)
}
