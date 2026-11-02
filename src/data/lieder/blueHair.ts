import { anzeigeName, jeTakt, type Lied } from '../songblatt'

// Blue Hair (TV Girl, 2018) – Akkorde nach der Transkription von „guitar_newbie" auf
// Ultimate Guitar; Liedtext bewusst weggelassen. Tonart E-Dur, 136 BPM, 4/4 (Hooktheory
// und Spotify). Ohne Kapodaster: zwei offene maj7-Griffe, zwei Barrés im 2. Bund.
//
// Fast der ganze Song pendelt zwischen Emaj7 und Amaj7, nur der Refrain ist F♯m – B7sus2.
// Das Blatt ordnet die Akkorde dem Text zu, nicht Takten; hier dauert jeder Akkord einen
// Takt. Mit dem Aufbau unten ergibt das 120 Takte ≈ 3:32 Min. bei 136 BPM – passend zur
// Albumversion (3:37). Schlagmuster ↓ – ↓↑ – ↑ – ↑ laut Akkordblatt.

const STROPHE = ['Emaj7', 'Amaj7']
const REFRAIN = ['F#m', 'B7sus2']

/** `n` Runden eines Akkordpaars, jeder Akkord ein Takt. */
const runden = (paar: string[], n: number) => jeTakt(...Array.from({ length: n }, () => paar).flat())

const UNSICHER_TAKTE =
  'Das Akkordblatt ordnet die Akkorde dem Text zu, nicht Takten. Hier dauert jeder Akkord einen Takt (4 Schläge) – das ergibt mit diesem Aufbau 120 Takte ≈ 3:32 Min. bei 136 BPM, nahe an der Albumversion (3:37). Beim Hören prüfen.'

export const BLUE_HAIR: Lied = {
  id: 'blue-hair',
  titel: 'Blue Hair',
  lernIntro:
    'Ein ruhiges Indie-Pop-Lied: „Blue Hair" von TV Girl. Fast der ganze Song pendelt zwischen zwei offenen Griffen, Emaj7 und Amaj7 – nur der Refrain braucht F♯m und B7sus2 mit Barré im 2. Bund (die Em-Form kennst du von G♯m aus Go K.K. Rider). In fünf Schritten zum ganzen Lied.',
  rechte: '„Blue Hair" von TV Girl',
  bpm: 136,
  uebeBpm: 80,
  tempi: [80, 100, 120, 136],
  anschlaege: ['viertel', 'offbeat'],
  quelle: {
    autor: 'guitar_newbie',
    url: 'https://tabs.ultimate-guitar.com/tab/tv-girl/blue-hair-chords-2386317',
    zusatz: 'Liedtext weggelassen.',
  },
  liedtext: { seite: 'Genius', url: 'https://genius.com/search?q=TV%20Girl%20Blue%20Hair' },
  abschnitte: [
    {
      id: 'intro',
      name: 'Intro',
      teil: 1,
      takte: runden(STROPHE, 4),
      tipp:
        'Emaj7 und Amaj7 im Wechsel, jeder Akkord einen Takt. Gesungen werden hier nur Silben – ideal, um ins Tempo zu finden. Erst ruhige Viertel-Abschläge, dann das Blue-Hair-Muster.',
      unsicher:
        'Hooktheory notiert im Intro zusätzlich einen B-Dur-Akkord (H-Dur) und in der Strophe Emaj7 mit G♯ im Bass (Umkehrung). Das Akkordblatt bleibt bei den Grundgriffen – für die Begleitung reicht das.',
    },
    {
      id: 'strophe-1',
      name: 'Strophe',
      teil: 1,
      takte: runden(STROPHE, 8),
      tipp:
        'Weiter Emaj7 – Amaj7, jetzt achtmal. Zähl die Runden mit: Nach der achten kommt der Sprung ins Barré. Im letzten Takt (Amaj7) ist die 4 ein Luftschlag – genau dann den Griff lösen.',
      unsicher: UNSICHER_TAKTE,
    },
    {
      id: 'refrain-1',
      name: 'Refrain',
      teil: 1,
      takte: runden(REFRAIN, 4),
      vorher: 'Barré: Von Amaj7 geht es direkt zu F♯m im 2. Bund – erst den Zeigefinger quer ablegen, dann die anderen Finger.',
      tipp:
        'F♯m und B7sus2 im Wechsel, beide mit Barré im 2. Bund. Der Zeigefinger bleibt die ganze Zeit liegen, nur der Finger auf der A-Saite geht weg – und bei B7sus2 die tiefe E-Saite nicht anschlagen.',
      unsicher:
        'Ultimate Guitar nennt diesen Teil Refrain, Hooktheory Pre-Chorus (Vorrefrain) – dann wäre das folgende Zwischenspiel, in dem nur Silben gesungen werden, der eigentliche Refrain. Für die Akkorde macht das keinen Unterschied.',
    },
    {
      id: 'zwischenspiel-1',
      name: 'Zwischenspiel',
      teil: 1,
      takte: runden(STROPHE, 4),
      tipp: 'Zurück zu Emaj7 – Amaj7 wie im Intro. Von B7sus2 aus alle Finger lösen und in der offenen Lage auf der 1 landen.',
    },
    {
      id: 'strophe-2',
      name: 'Strophe',
      teil: 1,
      takte: runden(STROPHE, 8),
      tipp: 'Wie die erste Strophe: acht Runden Emaj7 – Amaj7.',
    },
    {
      id: 'refrain-2',
      name: 'Refrain',
      teil: 1,
      takte: runden(REFRAIN, 4),
      tipp: 'Wie der erste Refrain – Barré im 2. Bund liegen lassen.',
    },
    {
      id: 'zwischenspiel-2',
      name: 'Zwischenspiel',
      teil: 1,
      takte: runden(STROPHE, 4),
      tipp: 'Wie das erste Zwischenspiel.',
    },
    {
      id: 'strophe-3',
      name: 'Strophe',
      teil: 1,
      takte: runden(STROPHE, 8),
      tipp: 'Die letzte Strophe, wieder acht Runden.',
    },
    {
      id: 'refrain-3',
      name: 'Refrain',
      teil: 1,
      takte: runden(REFRAIN, 4),
      tipp: 'Der letzte Refrain – danach bleibt es bis zum Schluss bei Emaj7 – Amaj7.',
    },
    {
      id: 'zwischenspiel-3',
      name: 'Zwischenspiel',
      teil: 1,
      takte: runden(STROPHE, 4),
      tipp: 'Wie das erste Zwischenspiel – direkt danach setzt die Trompete ein.',
    },
    {
      id: 'solo',
      name: 'Trompetensolo',
      teil: 1,
      takte: runden(STROPHE, 8),
      tipp: 'Eine Trompete spielt die Melodie, du begleitest mit Emaj7 – Amaj7. Zum Schluss Emaj7 anschlagen und ausklingen lassen. 🎸',
      unsicher: 'Das Akkordblatt endet mit dem Solo. Wie der Song genau ausklingt (die Aufnahme ist ein paar Sekunden länger), nach Gehör.',
    },
  ],
}

/** Aufbau für Überblick und Spickzettel: Abschnitt, Akkordpaar und Länge in Takten. */
export const BLUE_HAIR_AUFBAU = BLUE_HAIR.abschnitte.map(a => ({
  name: a.name,
  akkorde: [...new Set(a.takte.flat())].map(anzeigeName).join(' – '),
  takte: a.takte.length,
}))
