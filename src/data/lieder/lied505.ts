import { jeTakt, type Lied } from '../songblatt'

// 505 (Arctic Monkeys, 2007) – letztes Lied auf „Favourite Worst Nightmare". Akkorde Dm und
// Em wie in der offiziellen Tabulatur auf Ultimate Guitar und übereinstimmend in weiteren
// Akkordblättern; Liedtext bewusst weggelassen. ca. 140 BPM, 4/4 (Spotify-Daten über
// SongBPM), Albumversion 4:14. Tonart D-Moll bzw. genauer D-Dorisch (Em statt E°).
// Ohne Kapodaster, nur zwei offene Griffe.
//
// Der ganze Song ist eine Runde aus Dm und Em. Die Blätter ordnen die Akkorde dem Text zu,
// nicht Takten; hier dauert jeder Akkord zwei Takte (Runde = Dm Dm Em Em, 4 Takte), wie im
// Intro der offiziellen Version. Mit den Runden unten ergibt das 148 Takte ≈ 4:14 Min. bei
// 140 BPM. Die Rundenzahl je Abschnitt ist geschätzt und auf diese Länge verteilt.

const RUNDE = ['Dm', 'Dm', 'Em', 'Em']

/** `n` Runden Dm – Em, jeder Akkord zwei Takte. */
const runden = (n: number) => jeTakt(...Array.from({ length: n }, () => RUNDE).flat())

const UNSICHER_TAKTE =
  'Die Akkordblätter ordnen Dm und Em dem Text zu, nicht Takten. Hier dauert jeder Akkord zwei Takte (8 Schläge) – das ergibt mit diesem Aufbau 148 Takte ≈ 4:14 Min. bei 140 BPM, passend zur Albumversion (4:14). Wie viele Runden ein Abschnitt hat, ist geschätzt: beim Hören mitzählen.'

export const LIED_505: Lied = {
  id: '505',
  titel: '505',
  lernIntro:
    'Ein Indie-Rock-Klassiker: „505" von den Arctic Monkeys. Der ganze Song besteht aus nur zwei offenen Griffen, Dm und Em, die sich alle zwei Takte abwechseln (Dm kennst du vom Schluss von Go K.K. Rider, Em aus Zombie). Die Kunst liegt im sauberen Wechsel und in der großen Steigerung von ganz leise bis ganz laut. In fünf Schritten zum ganzen Lied, plus Bonus: dieselbe Runde als Barré-Griff.',
  rechte: '„505" von Arctic Monkeys (Text und Musik: Alex Turner)',
  bpm: 140,
  uebeBpm: 80,
  tempi: [80, 100, 120, 140],
  anschlaege: ['ganze', 'viertel', 'rock'],
  quelle: {
    url: 'https://tabs.ultimate-guitar.com/tab/arctic-monkeys/505-tabs-499395',
    zusatz: 'Dm und Em übereinstimmend in weiteren Akkordblättern, Runden je Abschnitt geschätzt, Liedtext weggelassen.',
  },
  liedtext: { seite: 'Genius', url: 'https://genius.com/Arctic-monkeys-505-lyrics' },
  abschnitte: [
    {
      id: 'intro',
      name: 'Intro',
      teil: 1,
      takte: runden(2),
      tipp:
        'Die Orgel spielt die Runde allein: zwei Takte Dm, zwei Takte Em. Ein Anschlag pro Takt reicht („Ganze"), dann den Akkord ausklingen lassen. Zähl dazu „1 2 3 4, 2 2 3 4" – nach dem zweiten Takt kommt der Wechsel.',
      unsicher: 'Im Original beginnt nur die Orgel. Wie viele Runden sie allein spielt, beim Hören mitzählen.',
    },
    {
      id: 'strophe-1',
      name: 'Strophe 1 (leise)',
      teil: 1,
      takte: runden(4),
      tipp:
        'Leise: Ganze oder sanfte Viertel aus dem Handgelenk. Bei Dm nur die hohen Saiten anschlagen, bei Em alle sechs. Auf der 4 des zweiten Takts die Finger schon lösen.',
      unsicher: UNSICHER_TAKTE,
    },
    {
      id: 'strophe-2',
      name: 'Strophe 2 (leise)',
      teil: 1,
      takte: runden(4),
      tipp: 'Dieselbe Runde, weiter leise. Der Gesang wird eindringlicher – die Gitarre bleibt ruhig im Hintergrund.',
    },
    {
      id: 'strophe-3',
      name: 'Strophe 3 (leise)',
      teil: 1,
      takte: runden(4),
      tipp: 'Wie Strophe 2. Zähl die Runden mit, damit du nicht den Faden verlierst – die Akkorde ändern sich nie.',
    },
    {
      id: 'strophe-4',
      name: 'Strophe 4',
      teil: 1,
      takte: runden(4),
      tipp:
        'Die Zeilen vom Anfang kehren zurück. Langsam kräftiger werden: von den Ganzen zu ruhigen Vierteln.',
      unsicher: 'Ob hier noch eine Strophe kommt oder die Steigerung schon beginnt, unterscheidet sich je nach Zählweise – beim Hören prüfen.',
    },
    {
      id: 'steigerung',
      name: 'Steigerung',
      teil: 1,
      takte: runden(6),
      vorher: 'Ab hier wird es von Runde zu Runde lauter – das Tempo bleibt gleich!',
      tipp:
        'Schlagzeug und Gitarren bauen Spannung auf. Steigere dich mit: erst Viertel, dann kräftigere Viertel, in den letzten Runden Rock-Achtel ↓↓↓↓↓↓↓↓. Lauter heißt nicht schneller.',
      unsicher:
        'Wo genau Schlagzeug und E-Gitarren einsetzen und wie lang die Steigerung dauert, steht in keinem Akkordblatt – beim Hören mitzählen.',
    },
    {
      id: 'bridge',
      name: 'Bridge (laut)',
      teil: 1,
      takte: runden(4),
      tipp:
        'Der berühmte Ausbruch, bei dem Alex Turner fast schreit. Volle Rock-Achtel, tiefe Saiten betonen – bei Dm darf jetzt die leere A-Saite mitklingen. Wer den Bonus geübt hat: Dm und Em als Barré im 5. und 7. Bund klingen hier noch kräftiger.',
    },
    {
      id: 'schluss',
      name: 'Schlussteil (laut)',
      teil: 1,
      takte: runden(6),
      tipp: 'Die Band bleibt laut, du auch: Rock-Achtel weiterspielen und locker bleiben, damit der Arm bei 140 BPM nicht verkrampft.',
      unsicher: 'Wie der laute Teil nach der Bridge genau aufgeteilt ist, ist in den Akkordblättern nicht einheitlich – beim Hören mitzählen.',
    },
    {
      id: 'outro',
      name: 'Outro',
      teil: 1,
      takte: runden(3),
      tipp: 'Zurück zur Orgel: wieder leiser werden, Viertel oder Ganze. Zum Schluss den letzten Akkord ausklingen lassen. 🎸',
      unsicher: 'Wie der Song genau endet, steht in keinem Akkordblatt – nach Gehör.',
    },
  ],
}

/** Aufbau für Überblick und Spickzettel: Abschnitt und Runden Dm – Em (4 Takte je Runde). */
export const LIED_505_AUFBAU = LIED_505.abschnitte.map(a => ({
  name: a.name,
  runden: a.takte.length / RUNDE.length,
  takte: a.takte.length,
}))
