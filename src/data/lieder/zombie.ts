import { jeTakt, type Lied } from '../songblatt'

// Zombie (The Cranberries, 1994) – Bonuslied außerhalb von Animal Crossing. Akkorde
// nach der Transkription von „Mikael Thunborg" auf Ultimate Guitar; Liedtext bewusst
// weggelassen. Tonart E-Moll, ca. 84 BPM (Tempo-Analysen 82–84), nur offene Griffe.
//
// Der ganze Song ist eine Schleife aus vier Akkorden: Em – C – G – D/F♯ (viele Blätter
// schreiben einfach D, manche Cmaj7 statt C). Die Blätter ordnen die Akkorde dem Text
// zu, nicht Takten; hier dauert jeder Akkord einen Takt. Mit den Runden unten ergibt das
// 108 Takte ≈ 5:09 Min. bei 84 BPM – passend zur Albumversion (5:06).
// Intro 4 Runden laut Thunborg, Zwischenspiel 2 und Solo 3 laut einer weiteren Transkription.

const SCHLEIFE = ['Em', 'C', 'G', 'D/F#']

/** `n` Runden der Schleife, jeder Akkord ein Takt. */
const runden = (n: number) => jeTakt(...Array.from({ length: n }, () => SCHLEIFE).flat())

const UNSICHER_TAKTE =
  'Die Akkordblätter ordnen die Akkorde dem Text zu, nicht Takten. Hier dauert jeder Akkord einen Takt (4 Schläge) – das passt zum langsamen Gesang und ergibt mit diesem Aufbau 108 Takte ≈ 5:09 Min. bei 84 BPM, nahe an der Albumversion (5:06). Wie oft die Schleife pro Abschnitt läuft, beim Hören mitzählen.'

export const ZOMBIE: Lied = {
  id: 'zombie',
  titel: 'Zombie',
  lernIntro:
    'Ein Bonuslied außerhalb von Animal Crossing: „Zombie" von The Cranberries. Nur vier offene Griffe (G und C kennst du schon aus dem Schluss von Go K.K. Rider) – und der ganze Song ist eine einzige Schleife. In fünf Schritten zum ganzen Lied, plus Bonus für den Klang des Originals.',
  rechte: '„Zombie" von The Cranberries (Text und Musik: Dolores O\'Riordan)',
  bpm: 84,
  uebeBpm: 60,
  tempi: [60, 70, 84],
  einfach: { 'D/F#': 'D' },
  ansichten: { einfach: 'Einfache Griffe (Em C G D)', original: 'Wie im Original (D/F♯)' },
  anschlaege: ['viertel', 'song', 'rock'],
  quelle: {
    autor: 'Mikael Thunborg',
    url: 'https://tabs.ultimate-guitar.com/tab/the-cranberries/zombie-chords-844902',
    zusatz: 'Runden von Zwischenspiel und Solo nach einer weiteren Transkription, Liedtext weggelassen.',
  },
  liedtext: { seite: 'Genius', url: 'https://genius.com/The-cranberries-zombie-lyrics' },
  abschnitte: [
    {
      id: 'intro',
      name: 'Intro',
      teil: 1,
      takte: runden(4),
      tipp:
        'Die Schleife Em – C – G – D, viermal. Erst spielt die Gitarre allein und ruhig – zupfen oder sanfte Viertel. Dann setzt die Band ein und es wird laut: kräftige Achtel abwärts.',
      tippOriginal:
        'Wie in der einfachen Ansicht, nur mit D/F♯ statt D: Der Bass läuft am Ende jeder Runde G → F♯ → E abwärts zurück zum Em.',
      unsicher: '4 Runden laut den meisten Akkordblättern. Wann genau die Band einsetzt, steht nicht im Blatt – beim Hören mitzählen.',
    },
    {
      id: 'strophe-1',
      name: 'Strophe (leise)',
      teil: 1,
      takte: runden(2),
      tipp:
        'Leise: sanfte Viertel-Abschläge oder Zupfen. Jeder Akkord dauert einen ganzen Takt – genug Zeit, den nächsten Griff vorzubereiten.',
      tippOriginal: 'Leise spielen. Cmaj7 statt C (Zeigefinger weg) passt gut zum ruhigen Klang – probier es aus.',
      unsicher: UNSICHER_TAKTE,
    },
    {
      id: 'vorrefrain-1',
      name: 'Vorrefrain',
      teil: 1,
      takte: runden(4),
      tipp:
        'Immer noch dieselbe Schleife. Lass es von Runde zu Runde etwas kräftiger werden – vom Viertel-Anschlag zum Song-Muster –, damit der Refrain richtig einschlägt.',
      tippOriginal: 'Gleiche Schleife mit D/F♯, langsam lauter werden.',
      unsicher: 'Manche Akkordblätter zählen diesen Teil noch zur Strophe. Wie viele Runden es genau sind, beim Hören mitzählen.',
    },
    {
      id: 'refrain-1',
      name: 'Refrain (laut)',
      teil: 1,
      takte: runden(2),
      tipp:
        'Jetzt laut: kräftige Achtel abwärts („Rock-Achtel") und die tiefen Saiten betonen. Die Griffe bleiben dieselben – nur die Schlaghand ändert sich.',
      tippOriginal: 'Laut, D/F♯ mit kräftigem Bass. Beim lauten Spielen nicht schneller werden.',
    },
    {
      id: 'zwischenspiel',
      name: 'Zwischenspiel (laut)',
      teil: 1,
      takte: runden(2),
      tipp: 'Ohne Gesang, die Band bleibt laut. In der letzten Runde zurücknehmen – danach kommt wieder die ruhige Strophe.',
      tippOriginal: 'Wie der Refrain.',
      unsicher: '2 Runden laut einer Transkription.',
    },
    {
      id: 'strophe-2',
      name: 'Strophe (leise)',
      teil: 1,
      takte: runden(2),
      tipp:
        'Wie die erste Strophe: plötzlich wieder leise. Genau dieser Sprung von laut zu leise macht den Song aus – trau dich, wirklich leise zu spielen.',
      tippOriginal: 'Wie die erste Strophe.',
    },
    {
      id: 'vorrefrain-2',
      name: 'Vorrefrain',
      teil: 1,
      takte: runden(4),
      tipp: 'Wie der erste Vorrefrain: Runde für Runde lauter werden.',
      tippOriginal: 'Wie der erste Vorrefrain.',
    },
    {
      id: 'refrain-2',
      name: 'Refrain (laut)',
      teil: 1,
      takte: runden(2),
      tipp: 'Wie der erste Refrain – danach geht es ohne Pause ins Solo, also laut bleiben.',
      tippOriginal: 'Wie der erste Refrain.',
    },
    {
      id: 'solo',
      name: 'Solo (laut)',
      teil: 1,
      takte: runden(3),
      tipp: 'Die Leadgitarre spielt ein Solo, du begleitest einfach laut weiter – wieder dieselbe Schleife.',
      tippOriginal: 'Wie der Refrain.',
      unsicher: '3 Runden laut einer Transkription; eine andere hat vor dem Solo zusätzlich zweimal Em – C.',
    },
    {
      id: 'outro',
      name: 'Outro',
      teil: 1,
      takte: runden(2),
      tipp: 'Noch einmal die Schleife wie im Refrain. Zum Schluss Em anschlagen und ausklingen lassen. 🎸',
      tippOriginal: 'Wie der Refrain – zum Schluss auf Em ausklingen lassen. 🎸',
      unsicher: 'Wie lang das Outro ist und wie der Song genau endet, ist in den Akkordblättern nicht einheitlich – nach Gehör.',
    },
  ],
}

/** Aufbau für Überblick und Spickzettel: Abschnitt und Runden der Schleife (4 Takte je Runde). */
export const ZOMBIE_AUFBAU = ZOMBIE.abschnitte.map(a => ({ name: a.name, runden: a.takte.length / SCHLEIFE.length, takte: a.takte.length }))
