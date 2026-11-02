import type { ReferenzKarte } from 'lernseiten-ui'
import Griffbild from '../components/Griffbild'
import { akkorde, akkordNach, griffKurz, type AkkordGruppe } from './akkorde'
import { AKKORDBLATT_URL, AUFBAU, ORIGINAL_BPM, UEBE_BPM } from './song'
import { songGriffe, type Lied } from './songblatt'
import { GO_KK_RIDER } from './lieder/goKkRider'
import { KK_CRUISIN } from './lieder/kkCruisin'
import { ZOMBIE, ZOMBIE_AUFBAU } from './lieder/zombie'
import { BLUE_HAIR, BLUE_HAIR_AUFBAU } from './lieder/blueHair'
import { LIED_505, LIED_505_AUFBAU } from './lieder/lied505'

// Nachschlagekarten „Griffe & Technik". Jede Karte hat eine stabile `id`
// (Inhaltsverzeichnis + Deep-Link #referenz/<id>). Karten mit Griffbildern/Tabellen
// nutzen `inhaltNode`; `inhalt` bleibt trotzdem gesetzt, damit die globale Suche sie findet.

/** Griffbilder einer Gruppe oder einer festen Liste von Akkord-IDs. */
function AkkordRaster({ gruppe, ids }: { gruppe?: AkkordGruppe; ids?: string[] }) {
  const liste = ids ? ids.map(id => akkordNach(id)!) : akkorde.filter(a => a.gruppe === gruppe)
  return (
    <div className="akkord-raster">
      {liste.map(a => (
        <figure key={a.id} className="akkord-zelle">
          <Griffbild akkord={a} />
          <figcaption>
            <code>{griffKurz(a)}</code>
            {a.tipp && <span>{a.tipp}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

const griffText = (ids: string[]) =>
  ids
    .map(id => akkordNach(id)!)
    .map(a => `${a.name}: ${griffKurz(a)}`)
    .join('\n')

/** Song-Griffe eines Lieds, getrennt nach Teil 1 und Schluss (nach dem Tonartwechsel). */
function SongGriffe({ lied, teil1, teil2 }: { lied: Lied; teil1: string; teil2: string }) {
  return (
    <>
      <p className="ref-absatz">
        <b>{teil1}</b>
      </p>
      <AkkordRaster ids={songGriffe(lied, 1)} />
      <p className="ref-absatz" style={{ marginTop: '1rem' }}>
        <b>{teil2}</b>
      </p>
      <AkkordRaster ids={songGriffe(lied, 2)} />
    </>
  )
}

const C = akkordNach('C')!
const GISM = akkordNach('Gism')!

export const referenzKarten: ReferenzKarte[] = [
  {
    id: 'song',
    titel: 'Go K.K. Rider im Überblick',
    inhalt: `Tempo ca. ${ORIGINAL_BPM} BPM, 4/4-Takt. Tonart G♯-Moll (manche Aufnahmen F-Moll), gegen Ende einen Halbton höher in A-Moll.
Gespielt ohne Kapodaster: im ersten Teil viel Barré, nach dem Tonartwechsel fast nur offene Griffe.
${AUFBAU.map(a => `${a.name}${a.takte ? ` (${a.takte} Takte)` : ''}: ${a.griffe.join(', ')}`).join('\n')}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          <b>Tempo ca. {ORIGINAL_BPM} BPM</b> im 4/4-Takt (je nach Aufnahme 147–153) – zum Üben mit {UEBE_BPM} BPM starten.
          Laut den meisten Transkriptionen steht der Song in <b>G♯-Moll</b> und wechselt gegen Ende einen Halbton höher nach
          A-Moll. Gespielt wird ohne Kapodaster: Der erste Teil braucht viel Barré (G♯m, F♯, B, C♯m, G♯7), nach dem
          Tonartwechsel sind fast alle Griffe offen. Manche Aufnahmen stehen in F-Moll (drei Halbtöne tiefer) – dazu passen die
          Griffe nicht. Jede Zeile im Akkordblatt ist ein Takt; stehen zwei Akkorde in einer Zeile, bekommt jeder zwei Schläge.
        </p>
        <table className="ref-tabelle">
          <thead>
            <tr>
              <th>Abschnitt</th>
              <th>Takte</th>
              <th>Akkorde</th>
            </tr>
          </thead>
          <tbody>
            {AUFBAU.map(a => (
              <tr key={a.name}>
                <td>
                  <b>{a.name}</b>
                  {a.hinweis && <span className="ref-hinweis">{a.hinweis}</span>}
                </td>
                <td>{a.takte ?? '–'}</td>
                <td>{a.griffe.join(' · ') || '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ref-absatz" style={{ marginTop: '0.75rem' }}>
          Das komplette Lied Takt für Takt – mit Griffbildern, Tipps und Mitspiel-Modus – steht unter{' '}
          <a href="#uebung/lied-go-kk-rider">Lernschritte → Go K.K. Rider → 🎵 Das ganze Lied</a>. Quelle der Akkorde:{' '}
          <a href={AKKORDBLATT_URL} target="_blank" rel="noopener noreferrer">
            Akkordblatt bei Ultimate Guitar ↗
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: 'song-griffe',
    titel: 'Die Song-Griffe von Go K.K. Rider',
    inhalt: `Erster Teil (G♯-Moll):\n${griffText(songGriffe(GO_KK_RIDER, 1))}\n\nSchluss nach dem Tonartwechsel (A-Moll):\n${griffText(songGriffe(GO_KK_RIDER, 2))}`,
    inhaltNode: (
      <SongGriffe lied={GO_KK_RIDER} teil1="Erster Teil (G♯-Moll):" teil2="Schluss nach dem Tonartwechsel (A-Moll) – fast alles offen:" />
    ),
  },
  {
    id: 'kk-cruisin',
    titel: "K.K. Cruisin' im Überblick",
    inhalt: `Zweites Lied. Tonart E♭-Moll, ca. ${KK_CRUISIN.bpm} BPM (Hooktheory), 4/4-Takt.
Fast der ganze Song ist die Schleife B7 – B♭7 – E♭7sus2 – A♭7/G♭7, am Ende einen Halbton höher mit offenen Griffen.
${griffText(songGriffe(KK_CRUISIN))}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          Tonart <b>E♭-Moll</b>, ca. <b>{KK_CRUISIN.bpm} BPM</b> (laut Hooktheory). Fast der ganze Song ist eine Schleife aus
          vier Septakkorden: <b>B7 – B♭7 – E♭7sus2 – A♭7</b> (jedes zweite Mal G♭7). Gespielt wird ohne Kapodaster: B7 ist
          offen, die anderen vier sind Barrés im 1., 2. und 4. Bund – A♭7 ist derselbe Griff wie G♯7 aus Go K.K. Rider. Vor
          dem letzten Refrain geht es einen Halbton höher, ab dort nur offene Griffe. Das komplette Songblatt steht unter{' '}
          <a href="#uebung/lied-kk-cruisin">Lernschritte → K.K. Cruisin' → 🎵 Das ganze Lied</a>.
        </p>
        <SongGriffe lied={KK_CRUISIN} teil1="Die Schleife:" teil2="Schluss nach dem Tonartwechsel – nur offene Griffe:" />
      </>
    ),
  },
  {
    id: 'zombie',
    titel: 'Zombie im Überblick',
    inhalt: `Bonuslied von The Cranberries. Tonart E-Moll, ca. ${ZOMBIE.bpm} BPM, 4/4-Takt, nur offene Griffe.
Der ganze Song ist eine Schleife: Em – C – G – D (im Original D/F♯, oft Cmaj7 statt C), jeder Akkord ein Takt.
Strophen leise, Refrains laut.
${ZOMBIE_AUFBAU.map(a => `${a.name}: ${a.runden} Runden (${a.takte} Takte)`).join('\n')}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          Ein Bonuslied außerhalb von Animal Crossing: <b>„Zombie" von The Cranberries</b>. Tonart <b>E-Moll</b>, ca.{' '}
          <b>{ZOMBIE.bpm} BPM</b> im 4/4-Takt – zum Üben mit {ZOMBIE.uebeBpm} BPM starten. Der ganze Song ist
          eine einzige Schleife aus vier offenen Griffen, <b>Em – C – G – D</b>, jeder Akkord einen Takt lang. Im Original klingt
          statt D meist <b>D/F♯</b> (der Bass läuft G → F♯ → E), viele Akkordblätter schreiben Cmaj7 statt C. Was den Song
          ausmacht, ist die <b>Dynamik</b>: leise Strophen, laute Refrains.
        </p>
        <table className="ref-tabelle">
          <thead>
            <tr>
              <th>Abschnitt</th>
              <th>Runden</th>
              <th>Takte</th>
            </tr>
          </thead>
          <tbody>
            {ZOMBIE_AUFBAU.map((a, i) => (
              <tr key={i}>
                <td>
                  <b>{a.name}</b>
                </td>
                <td>{a.runden}</td>
                <td>{a.takte}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ref-absatz" style={{ marginTop: '0.75rem' }}>
          Wie oft die Schleife pro Abschnitt läuft, unterscheidet sich zwischen den Akkordblättern – beim Hören mitzählen. Das
          komplette Songblatt steht unter <a href="#uebung/lied-zombie">Lernschritte → Zombie → 🎵 Das ganze Lied</a>. Quelle der
          Akkorde:{' '}
          <a href={ZOMBIE.quelle.url} target="_blank" rel="noopener noreferrer">
            Akkordblatt bei Ultimate Guitar ↗
          </a>
          .
        </p>
        <p className="ref-absatz" style={{ marginTop: '1rem' }}>
          <b>Die vier Griffe:</b>
        </p>
        <AkkordRaster ids={['Em', 'C', 'G', 'D']} />
        <p className="ref-absatz" style={{ marginTop: '1rem' }}>
          <b>Wie im Original (Bonus):</b>
        </p>
        <AkkordRaster ids={['D-Fis', 'Cmaj7']} />
      </>
    ),
  },
  {
    id: 'blue-hair',
    titel: 'Blue Hair im Überblick',
    inhalt: `„Blue Hair" von TV Girl. Tonart E-Dur, ca. ${BLUE_HAIR.bpm} BPM, 4/4-Takt, ohne Kapodaster.
Strophe, Zwischenspiel und Solo: Emaj7 – Amaj7 (offen), Refrain: F♯m – B7sus2 (Barré im 2. Bund), jeder Akkord ein Takt.
Schlagmuster laut Akkordblatt: ↓ – ↓ ↑ – ↑ – ↑
${BLUE_HAIR_AUFBAU.map(a => `${a.name}: ${a.akkorde} (${a.takte} Takte)`).join('\n')}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          <b>„Blue Hair" von TV Girl</b>. Tonart <b>E-Dur</b>, ca. <b>{BLUE_HAIR.bpm} BPM</b> im 4/4-Takt (Hooktheory, Spotify) – zum
          Üben mit {BLUE_HAIR.uebeBpm} BPM starten. Fast der ganze Song pendelt zwischen zwei offenen Griffen, <b>Emaj7 – Amaj7</b>,
          jeder einen Takt lang. Nur der Refrain wechselt zu <b>F♯m – B7sus2</b>, beide mit Barré im 2. Bund – der Zeigefinger
          bleibt dabei liegen. F♯m ist die Em-Form, also der G♯m-Griff aus Go K.K. Rider zwei Bünde tiefer. Schlagmuster laut
          Akkordblatt: <b>↓ – ↓ ↑ – ↑ – ↑</b> (auf der 4 ein Luftschlag).
        </p>
        <table className="ref-tabelle">
          <thead>
            <tr>
              <th>Abschnitt</th>
              <th>Akkorde</th>
              <th>Takte</th>
            </tr>
          </thead>
          <tbody>
            {BLUE_HAIR_AUFBAU.map((a, i) => (
              <tr key={i}>
                <td>
                  <b>{a.name}</b>
                </td>
                <td>{a.akkorde}</td>
                <td>{a.takte}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ref-absatz" style={{ marginTop: '0.75rem' }}>
          Das Akkordblatt ordnet die Akkorde dem Text zu, nicht Takten – ein Akkord pro Takt ergibt 3:32 Min., passend zur
          Albumversion (3:37). Das komplette Songblatt steht unter{' '}
          <a href="#uebung/lied-blue-hair">Lernschritte → Blue Hair → 🎵 Das ganze Lied</a>. Quelle der Akkorde:{' '}
          <a href={BLUE_HAIR.quelle.url} target="_blank" rel="noopener noreferrer">
            Akkordblatt bei Ultimate Guitar ↗
          </a>
          .
        </p>
        <p className="ref-absatz" style={{ marginTop: '1rem' }}>
          <b>Die vier Griffe:</b>
        </p>
        <AkkordRaster ids={songGriffe(BLUE_HAIR)} />
      </>
    ),
  },
  {
    id: '505',
    titel: '505 im Überblick',
    inhalt: `„505" von Arctic Monkeys, gespielt wie im Video-Tutorial von Dee Must. Tonart D-Moll (genauer D-Dorisch), ohne Kapodaster, nur Dm und Em (beide offen), jeder Akkord zwei Takte.
Anschlag laut Video: „DOWN" = ein Abschlag pro Akkord, „DDU UDU" = ↓ – ↓ ↑ – ↑ ↓ ↑, zweimal pro Akkord.
Tempo im Video ca. ${LIED_505.bpm} BPM, ab Strophe 3 ca. 122 BPM. Bonus: Dm und Em als Am-Form im 5. und 7. Bund.
${LIED_505_AUFBAU.map(a => `${a.name}: ${a.anschlag} (${a.takte} Takte${a.schneller ? ', schneller' : ''})`).join('\n')}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          <b>„505" von Arctic Monkeys</b> (2007, „Favourite Worst Nightmare"), so gespielt wie im Video-Tutorial von Dee Must.
          Tonart <b>D-Moll</b>, genauer D-Dorisch. Der ganze Song braucht nur zwei offene Griffe, <b>Dm – Em</b>, immer im
          Wechsel und jeder <b>zwei Takte</b> lang. Was sich ändert, ist die rechte Hand: Das Video blendet entweder{' '}
          <b>„DOWN"</b> ein (ein Abschlag pro Akkord, klingen lassen) oder <b>„DDU UDU"</b> (↓ – ↓ ↑ – ↑ ↓ ↑, das Song-Muster
          aus Go K.K. Rider) – zweimal pro Akkord. Tempo im Video ca. <b>{LIED_505.bpm} BPM</b>, ab Strophe 3 ca.{' '}
          <b>122 BPM</b>; zum Üben mit {LIED_505.uebeBpm} BPM starten. Wer mag, greift beide Akkorde als <b>Am-Form</b> im 5.
          und 7. Bund – dann rutscht dieselbe Handform nur zwei Bünde weiter.
        </p>
        <table className="ref-tabelle">
          <thead>
            <tr>
              <th>Abschnitt</th>
              <th>Anschlag</th>
              <th>Takte</th>
            </tr>
          </thead>
          <tbody>
            {LIED_505_AUFBAU.map((a, i) => (
              <tr key={i}>
                <td>
                  <b>{a.name}</b>
                  {a.schneller && <span className="ref-hinweis">schneller</span>}
                </td>
                <td>{a.anschlag}</td>
                <td>{a.takte}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ref-absatz" style={{ marginTop: '0.75rem' }}>
          Takte und Tempo sind am Video gemessen (Akkordwechsel alle 4,3 s, ab Strophe 3 alle 3,9 s); die Studioaufnahme ist
          mit ca. 140 BPM schneller. Das komplette Songblatt steht unter{' '}
          <a href="#uebung/lied-505">Lernschritte → 505 → 🎵 Das ganze Lied</a>. Quelle:{' '}
          <a href={LIED_505.quelle.url} target="_blank" rel="noopener noreferrer">
            Video-Tutorial auf YouTube ↗
          </a>
          .
        </p>
        <p className="ref-absatz" style={{ marginTop: '1rem' }}>
          <b>Die zwei Griffe:</b>
        </p>
        <AkkordRaster ids={songGriffe(LIED_505)} />
        <p className="ref-absatz" style={{ marginTop: '1rem' }}>
          <b>Barré-Variante (Bonus):</b>
        </p>
        <AkkordRaster ids={['Dm-Barre', 'Em-Barre']} />
      </>
    ),
  },
  {
    id: 'stimmung',
    titel: 'Saiten und Standardstimmung',
    inhalt: `Saite 6 (dickste)  E   tief
Saite 5            A
Saite 4            D
Saite 3            G
Saite 2            H   (international: B)
Saite 1 (dünnste)  e   hoch

Merksatz: „Eine Alte Dame Geht Heute Einkaufen"

Stimmen nach Gehör (Bundmethode):
Tiefe E-Saite im 5. Bund = Ton der A-Saite
A-Saite im 5. Bund       = D-Saite
D-Saite im 5. Bund       = G-Saite
G-Saite im 4. Bund (!)   = H-Saite
H-Saite im 5. Bund       = hohe e-Saite`,
  },
  {
    id: 'griffbild-lesen',
    titel: 'Griffbilder lesen',
    inhalt: `Senkrechte Linien = Saiten (links tiefes E, rechts hohes e)
Waagerechte Linien = Bünde, dicke Linie oben = Sattel
× über der Saite = nicht anschlagen, ○ = Leersaite klingt mit
Punkt mit Zahl = Finger: 1 Zeige, 2 Mittel, 3 Ring, 4 kleiner Finger
Balken = Barré (Zeigefinger quer über mehrere Saiten)
„4fr" = das Bild beginnt im 4. Bund
Kurzschrift: von tiefem E nach hohem e, z.B. C = x32010`,
    inhaltNode: (
      <div className="griffbild-erklaerung">
        <Griffbild akkord={C} breite={120} />
        <Griffbild akkord={GISM} breite={120} />
        <ul>
          <li><b>Senkrechte Linien</b> = Saiten, links die tiefe E-Saite, rechts die hohe e-Saite.</li>
          <li><b>Waagerechte Linien</b> = Bünde; die dicke Linie oben ist der Sattel.</li>
          <li><b>×</b> = Saite nicht anschlagen, <b>○</b> = Leersaite klingt mit.</li>
          <li><b>Punkt mit Zahl</b> = welcher Finger drückt: 1 Zeige-, 2 Mittel-, 3 Ring-, 4 kleiner Finger.</li>
          <li><b>Balken</b> = Barré: der Zeigefinger liegt quer über mehreren Saiten.</li>
          <li><b>„4fr"</b> = das Bild zeigt den Hals ab dem 4. Bund (kein Sattel oben).</li>
          <li><b>Kurzschrift</b> von tief nach hoch: C = <code>x32010</code>, G♯m = <code>466444</code>.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'schlagmuster',
    titel: 'Schlagmuster lesen und spielen',
    inhalt: `↓ = Abschlag (Richtung Boden)   ↑ = Aufschlag (Richtung Decke)
– = Luftschlag: Hand bewegt sich, trifft aber nicht

Zählweise bei Achteln:  1 und 2 und 3 und 4 und
Abschläge auf die Zahlen, Aufschläge auf „und"

Für Go K.K. Rider:
Einstieg:          ↓   ↓   ↓   ↓      (Viertel)
Song-Muster:       ↓ – ↓ ↑ – ↑ ↓ ↑
Zwei Akkorde pro Takt: Wechsel auf die 3 – fällt genau in die Lücke des Musters.

In Video-Tutorials oft als Buchstaben: D = Down (↓), U = Up (↑).
„DDU UDU" (z.B. 505) = ↓ – ↓ ↑ – ↑ ↓ ↑ – dasselbe wie das Song-Muster.`,
    beispiele: [
      {
        szenario: 'So übst du ein neues Muster',
        beispiele: [
          'Erst ohne Gitarre: Muster laut sprechen („Ab – Ab Auf – Auf Ab Auf") und dazu klatschen.',
          'Dann mit abgedämpften Saiten (linke Hand liegt locker auf) – nur Rhythmus, kein Klang.',
          'Dann mit E, dann im Wechsel E – A, später mit der Intro-Kette G♯m – F♯ – E – D♯7.',
          'Metronom im Tab „Werkzeuge" bei 70 BPM starten und das Muster mitlesen.',
        ],
      },
    ],
  },
  {
    id: 'swing',
    titel: 'Gerade und geswingte Achtel',
    inhalt: `Gerade Achtel: beide Hälften eines Schlags sind gleich lang („ta-ta ta-ta").
Geswingte Achtel (Shuffle): erste Hälfte lang, zweite kurz, ca. 2 : 1 („Dum-da Dum-da").

Hörtest: Klingt der Song eher „marschierend" → gerade. Eher „hüpfend / galoppierend" → Swing.
Die Hand pendelt in beiden Fällen weiter – nur das Timing der Aufschläge verschiebt sich.`,
  },
  {
    id: 'barre-griffe',
    titel: 'Barré-Formen',
    inhalt: `Barré-Formen (Zeigefinger ersetzt den Sattel):
E-Form: F (1. Bund), F♯ (2. Bund)
E7-Form: G♯7 = A♭7 (4. Bund), G♭7 (2. Bund)
Em-Form: G♯m (4. Bund), F♯m (2. Bund)
A-Form: A♯ (1. Bund), B (2. Bund)
A7-Form: B♭7 (1. Bund)
Am-Form: C♯m (4. Bund), Dm (5. Bund), Em (7. Bund)
Mini-Barré: E♭7sus2 (1. Bund)
${akkorde
  .filter(a => a.gruppe === 'Barré')
  .map(a => `${a.name}: ${griffKurz(a)}`)
  .join('\n')}`,
    inhaltNode: (
      <>
        <p className="ref-absatz">
          Beim Barré liegt der Zeigefinger quer über den Saiten und übernimmt die Rolle des Sattels. Jede offene Form wird so
          verschiebbar – die Form bestimmt Dur, Moll oder Sept, der Bund des Zeigefingers den Grundton: <b>E-Form</b> → F, F♯ ·{' '}
          <b>E7-Form</b> → G♯7/A♭7, G♭7 · <b>Em-Form</b> → G♯m, F♯m · <b>A-Form</b> → A♯, B · <b>A7-Form</b> → B♭7 ·{' '}
          <b>Am-Form</b> → C♯m, Dm, Em.
        </p>
        <p className="ref-absatz">
          <b>Zwischenschritt:</b> Solange ein volles Barré noch nicht klingt, nur die vier hohen Saiten anschlagen – z.B. G♯m
          als <code>xx6444</code>, F♯ als <code>xx4322</code>.
        </p>
        <AkkordRaster gruppe="Barré" />
      </>
    ),
  },
  {
    id: 'halbtoene',
    titel: 'Halbtöne, ♯ und ♭',
    inhalt: `Ein Bund = ein Halbton. Zwölf Halbtöne = eine Oktave.

C – C♯ – D – D♯ – E – F – F♯ – G – G♯ – A – A♯ – H – C

♯ (Kreuz) = einen Halbton höher: G♯ = Gis
♭ (be) = einen Halbton tiefer: E♭ = D♯, A♭ = G♯, G♭ = F♯, B♭ = A♯
Derselbe Ton kann zwei Namen haben – G♯7 (Go K.K. Rider) und A♭7 (K.K. Cruisin') sind derselbe Griff.

Englisch B = deutsch H. Im Akkordblatt steht „B" für H-Dur und „B♭" für das deutsche B.

So findest du den Bund eines Barré-Griffs:
E-Formen → Grundton auf der tiefen E-Saite: E (0) – F (1) – F♯ (2) – G (3) – G♯ (4)
A-Formen → Grundton auf der A-Saite:        A (0) – A♯/B♭ (1) – B/H (2) – C (3) – C♯ (4)`,
  },
  {
    id: 'ueben',
    titel: 'Effizient üben',
    inhalt: `Lieber 15 Minuten jeden Tag als 2 Stunden am Wochenende.
Aufwärmen (2 Min.): E und A greifen, Barré im 5. Bund halten, Finger lockern.
Technik (5 Min.): One-Minute-Changes des schwierigsten Paars (z.B. D♯7 ↔ G♯m).
Rhythmus (3 Min.): Schlagmuster zum Metronom.
Song (5+ Min.): ein Abschnitt in Schleife.

Tempo-Regel: Start bei ${UEBE_BPM} BPM, 3× fehlerfrei → +5 BPM, Fehler → −10 BPM. Ziel: ${ORIGINAL_BPM} BPM.
Schwierigste Stelle zuerst üben, nicht immer von vorne beginnen.`,
  },
  {
    id: 'probleme',
    titel: 'Häufige Probleme und Lösungen',
    inhalt: `Saite schnarrt → näher ans Bundstäbchen, fester drücken.
Saite klingt dumpf → ein anderer Finger berührt sie; Finger steiler aufsetzen.
Barré schnarrt nur auf einer Saite → Zeigefinger ein Stück verschieben, damit keine Saite in einer Hautfalte liegt.
Fingerkuppen schmerzen → normal in den ersten 2–3 Wochen; kürzer, dafür öfter üben.
Akkordwechsel zu langsam → Ankerfinger nutzen, Wechsel auf Schlag 4 vorbereiten.
Rhythmus stockt beim Wechsel → Schlaghand NIE anhalten, notfalls Leersaiten anschlagen.
Barré klingt nicht → Zeigefinger auf die Kante drehen, Armgewicht statt Kraft, erst höher am Hals üben.`,
  },
]
