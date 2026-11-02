// Gemeinsame Bausteine für die Songblätter („🎵 Das ganze Lied"). Die Lieder selbst
// stehen in data/lieder/*.ts – immer in den Original-Akkorden, so wie sie ohne
// Kapodaster gegriffen werden. Ein Lied kann zusätzlich eine vereinfachte Ansicht
// haben (`einfach`, z.B. bei Zombie D statt D/F♯) – dann zeigt das Songblatt einen Umschalter.
//
// Ein Takt = ein Array: ein Akkord (ganzer Takt) oder zwei Akkorde (je 2 Schläge).
// „N.C." (no chord) = Pause, die Band setzt aus. Slash-Akkorde wie „D/F#" = D mit F♯ im Bass.

export type Takt = [string] | [string, string]

/** Anschlagmuster im Songblatt (Definitionen in components/Songblatt.tsx). */
export type AnschlagId = 'einzeln' | 'viertel' | 'song' | 'rock' | 'offbeat'

export interface SongAbschnitt {
  id: string
  name: string
  /** 1 = Tonart vor dem Tonartwechsel, 2 = danach (einen Halbton höher). */
  teil: 1 | 2
  takte: Takt[]
  /** Anschlag dieses Abschnitts laut Quelle – dann bietet das Songblatt „Wie im Video" an. */
  anschlag?: AnschlagId
  /** Tempo gegenüber dem gewählten Tempo, z.B. 1.09 = 9 % schneller (fehlt = gleich schnell). */
  tempo?: number
  tipp: string
  /** Eigener Tipp für die Ansicht „Original", wenn das Lied eine vereinfachte Ansicht hat. */
  tippOriginal?: string
  /** Hinweis, der VOR dem Abschnitt hervorgehoben wird. */
  vorher?: string
  unsicher?: string
  /** Optionale Melodie-Tabulatur (6 Zeilen, hohe e-Saite oben). */
  tab?: string
}

export interface Lied {
  id: string
  titel: string
  /** Einleitungstext über den Lernschritten dieses Lieds. */
  lernIntro: string
  /** Rechte-Hinweis unter dem Songblatt, z.B. „Song © Nintendo". */
  rechte: string
  bpm: number
  uebeBpm: number
  tempi: number[]
  /** Vereinfachungen für die einfache Ansicht, z.B. { 'D/F#': 'D' }. Fehlt = keine Umschaltung. */
  einfach?: Record<string, string>
  /** Beschriftung der zwei Ansichten, wenn es `einfach` gibt. */
  ansichten?: { einfach: string; original: string }
  /** Anschlagmuster im Songblatt (Standard: Viertel und Song-Muster). */
  anschlaege?: AnschlagId[]
  /**
   * Quelle der Akkorde auf Ultimate Guitar; ohne `autor` = offizielle Tabulatur („Official").
   * `video`: stattdessen ein Video-Tutorial auf YouTube (`autor` = Kanal).
   */
  quelle: { autor?: string; url: string; zusatz?: string; video?: boolean }
  /** Link zu einer Seite mit dem (lizenzierten) Liedtext – die Lernseite selbst enthält keine Texte. */
  liedtext?: { seite: string; url: string }
  abschnitte: SongAbschnitt[]
}

/** Jeder Akkord ein ganzer Takt: jeTakt('B7', 'Bb7') → [['B7'], ['Bb7']]. */
export const jeTakt = (...akkorde: string[]): Takt[] => akkorde.map(a => [a])

export const PAUSE = 'N.C.'

/** Anzeige mit ♯/♭; „B" (englisch) bleibt B wie im Akkordblatt. Pause → „Pause". */
export const anzeigeName = (akkord: string) =>
  akkord === PAUSE ? 'Pause' : akkord.replace(/#/g, '♯').replace(/([A-G])b/g, '$1♭')

/** Akkord, wie er in der gewählten Ansicht gegriffen wird (vereinfacht oder original). */
export const gegriffen = (lied: Lied, akkord: string, vereinfacht: boolean) =>
  (vereinfacht && lied.einfach?.[akkord]) || akkord

/** Akkordname → Akkord-ID in data/akkorde.ts (für die Griffbilder). */
const GRIFF_ID: Record<string, string> = {
  // Go K.K. Rider
  'G#m': 'Gism', 'G#7': 'Gis7', 'F#': 'Fis', 'D#7': 'Dis7', B: 'H', 'C#m': 'Cism', 'A#': 'Ais',
  E: 'E', A: 'A', F: 'F', Am: 'Am', G: 'G', C: 'C', Dm: 'Dm', E7: 'E7', A7: 'A7',
  // K.K. Cruisin'
  B7: 'B7', Bb7: 'Bes7', Eb7sus2: 'Es7sus2', Ab7: 'As7', Gb7: 'Ges7', C7: 'C7', E7sus2: 'E7sus2', G7: 'G7',
  // Zombie
  Em: 'Em', D: 'D', 'D/F#': 'D-Fis', Cmaj7: 'Cmaj7',
  // Blue Hair
  Emaj7: 'Emaj7', Amaj7: 'Amaj7', 'F#m': 'Fism', B7sus2: 'B7sus2',
  // 505: Dm und Em (siehe oben)
}

/** Griff-ID für einen Akkordnamen (undefined bei Pause). */
export const griffId = (akkord: string): string | undefined => GRIFF_ID[akkord]

/** Griff-IDs eines Lieds (optional nur eines Teils) in der Reihenfolge ihres ersten Auftretens. */
export function songGriffe(lied: Lied, teil?: 1 | 2): string[] {
  const ids = lied.abschnitte
    .filter(a => teil === undefined || a.teil === teil)
    .flatMap(a => a.takte.flat())
    .map(griffId)
    .filter((id): id is string => id !== undefined)
  return [...new Set(ids)]
}

/** Akkordfolge als Kurztext, z.B. „G♯m F♯ E·F♯ B" (Punkt = zwei Akkorde in einem Takt). */
export const taktText = (takte: Takt[]) => takte.map(t => t.map(anzeigeName).join('·')).join('  ')

export const taktZahl = (lied: Lied) => lied.abschnitte.reduce((n, a) => n + a.takte.length, 0)

// ── Tabulatur ────────────────────────────────────────────────────────────

const SAITEN_TAB = ['e', 'H', 'G', 'D', 'A', 'E']

/**
 * Baut eine 6-zeilige Tabulatur aus einer Tonfolge, z.B. "G3 H4 H2" = G-Saite 3. Bund,
 * H-Saite 4. Bund, H-Saite 2. Bund (Saiten: e H G D A E; kleines e = hohe Saite).
 */
export function tabulatur(folge: string): string {
  const noten = folge.split(/\s+/).map(n => ({ saite: n[0], bund: n.slice(1) }))
  return SAITEN_TAB.map(s => {
    let zeile = `${s}|-`
    for (const n of noten) zeile += (n.saite === s ? n.bund : '-'.repeat(n.bund.length)) + '--'
    return zeile + '|'
  }).join('\n')
}
