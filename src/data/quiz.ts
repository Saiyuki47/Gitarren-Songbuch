import type { QuizFrage } from 'lernseiten-ui'

// Quizfragen zu den Lernschritten. `quelle` = Lernschritt (dient auch als Filter-Chip).
// Fragetypen: single, multi, zuordnung, reihenfolge, kategorien, eingabe, wahrfalsch.
export const quizFragen: QuizFrage[] = [
  // ── Schritt 1: Vorbereitung ─────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Welche Saite ist die „1. Saite" der Gitarre?',
    optionen: [
      { text: 'Die dünnste, hohe e-Saite' },
      { text: 'Die dickste, tiefe E-Saite', warumFalsch: 'Die tiefe E-Saite ist die 6. Saite – gezählt wird von der dünnsten aus.' },
      { text: 'Die A-Saite', warumFalsch: 'Die A-Saite ist die 5. Saite.' },
      { text: 'Die Saite, die am nächsten zum Kopf liegt', warumFalsch: 'Alle Saiten laufen zum Kopf – die Nummer hängt von der Dicke ab.' },
    ],
    richtige: 0,
    erklaerung: 'Gezählt wird von der dünnsten (1, hohes e) zur dicksten (6, tiefes E) Saite.',
    quelle: 'Schritt 1: Vorbereitung',
  },
  {
    art: 'reihenfolge',
    frage: 'Bring die Töne der Standardstimmung in die richtige Reihenfolge – von der dicksten zur dünnsten Saite.',
    schritte: ['E (tief)', 'A', 'D', 'G', 'H', 'e (hoch)'],
    erklaerung: 'E – A – D – G – H – e. Merksatz: „Eine Alte Dame Geht Heute Einkaufen".',
    quelle: 'Schritt 1: Vorbereitung',
  },
  {
    art: 'single',
    frage: 'Welcher Ton klingt auf der tiefen E-Saite im 4. Bund?',
    optionen: [
      { text: 'G♯' },
      { text: 'G', warumFalsch: 'G ist der 3. Bund: E → F → F♯ → G.' },
      { text: 'A', warumFalsch: 'A ist der 5. Bund – deshalb klingt er wie die leere A-Saite.' },
      { text: 'F♯', warumFalsch: 'F♯ ist der 2. Bund.' },
    ],
    richtige: 0,
    erklaerung: 'Jeder Bund ist ein Halbton: E → F (1) → F♯ (2) → G (3) → G♯ (4). G♯ ist der Grundton von Go K.K. Rider – deshalb liegt das Barré von G♯m im 4. Bund.',
    quelle: 'Schritt 1: Vorbereitung',
  },

  // ── Schritt 2: Griffe ohne Barré ────────────────────────────────────────
  {
    art: 'zuordnung',
    frage: 'Ordne jedem Griff seine Kurzschrift zu (von tiefem E nach hohem e).',
    paare: [
      { begriff: 'E', ziel: '022100' },
      { begriff: 'A', ziel: 'x02220' },
      { begriff: 'D♯7', ziel: 'xx1323' },
      { begriff: 'Am', ziel: 'x02210' },
      { begriff: 'E7', ziel: '020100' },
    ],
    erklaerung: 'x = nicht anschlagen, 0 = Leersaite, Zahl = Bund. D♯7 hat keine einzige Leersaite – deshalb klingen nur die vier gegriffenen Saiten.',
    quelle: 'Schritt 2: Griffe ohne Barré',
  },
  {
    art: 'kategorien',
    frage: 'Welche Akkorde gehören zum ersten Teil (G♯-Moll), welche zum Schluss nach dem Tonartwechsel (A-Moll)?',
    kategorien: ['Erster Teil (G♯-Moll)', 'Schluss (A-Moll)'],
    items: [
      { text: 'E', kategorie: 'Erster Teil (G♯-Moll)' },
      { text: 'A', kategorie: 'Erster Teil (G♯-Moll)' },
      { text: 'D♯7', kategorie: 'Erster Teil (G♯-Moll)' },
      { text: 'G♯m', kategorie: 'Erster Teil (G♯-Moll)' },
      { text: 'Am', kategorie: 'Schluss (A-Moll)' },
      { text: 'G', kategorie: 'Schluss (A-Moll)' },
      { text: 'Dm', kategorie: 'Schluss (A-Moll)' },
      { text: 'E7', kategorie: 'Schluss (A-Moll)' },
    ],
    erklaerung: 'Der Schluss liegt einen Halbton höher: Aus G♯m wird Am, aus D♯7 wird E7. In A-Moll sind fast alle Griffe offen.',
    quelle: 'Schritt 2: Griffe ohne Barré',
  },

  // ── Schritt 3: Rhythmus ─────────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Im Muster ↓ – ↓ ↑ – ↑ ↓ ↑ (Achtel): Auf welchen Zählzeiten liegen die Aufschläge?',
    optionen: [
      { text: '„2 und", „3 und", „4 und"' },
      { text: '1, 2, 3', warumFalsch: 'Auf den Zahlen liegen immer Abschläge.' },
      { text: '„1 und", „2 und", „3 und"', warumFalsch: 'Auf „1 und" liegt ein Luftschlag (–).' },
      { text: 'Nur auf der 4', warumFalsch: 'Die 4 ist ein Abschlag.' },
    ],
    richtige: 0,
    erklaerung: 'Zählweise: 1 (↓) und (–) 2 (↓) und (↑) 3 (–) und (↑) 4 (↓) und (↑). Auf der 3 ist eine Lücke – perfekt für Akkordwechsel mitten im Takt.',
    quelle: 'Schritt 3: Rhythmus',
  },
  {
    art: 'wahrfalsch',
    frage: 'Markiere jede Aussage als wahr oder falsch.',
    aussagen: [
      { text: 'Bei einem Luftschlag bewegt sich die Schlaghand weiter, trifft aber die Saiten nicht.', wahr: true },
      { text: 'Bei geswingten Achteln sind beide Achtel gleich lang.', wahr: false, warum: 'Beim Swing ist die erste Achtel lang, die zweite kurz (ca. 2 : 1).' },
      { text: 'Bei 120 BPM kommen zwei Schläge pro Sekunde.', wahr: true },
      { text: 'Der Song steht im 3/4-Takt.', wahr: false, warum: 'Es ist ein 4/4-Takt: „1 2 3 4".' },
    ],
    erklaerung: 'Luftschläge halten das Pendel im Takt, Swing ist „lang-kurz", 120 BPM = 2 Schläge/Sekunde, 4/4-Takt.',
    quelle: 'Schritt 3: Rhythmus',
  },

  // ── Schritt 4: Barré ────────────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Was macht der Zeigefinger bei einem Barré-Griff?',
    optionen: [
      { text: 'Er liegt quer über den Saiten und ersetzt den Sattel – die Griffform darüber wird verschiebbar' },
      { text: 'Er drückt nur die tiefe E-Saite', warumFalsch: 'Beim Barré drückt er mehrere Saiten gleichzeitig – bei der E-Form alle sechs.' },
      { text: 'Er dämpft alle Saiten ab, damit es perkussiv klingt', warumFalsch: 'Beim Barré sollen die Saiten unter dem Zeigefinger klar klingen.' },
      { text: 'Er liegt immer im 1. Bund', warumFalsch: 'Das Barré kann in jedem Bund liegen – bei G♯m im 4., bei F♯ im 2.' },
    ],
    richtige: 0,
    erklaerung: 'Mit Barré wird aus einer offenen Form (E, Em, E7, A, Am …) ein verschiebbarer Griff: Die Form bestimmt Dur, Moll oder Sept, der Bund den Grundton.',
    quelle: 'Schritt 4: Barré',
  },
  {
    art: 'kategorien',
    frage: 'Welche Akkorde aus Go K.K. Rider brauchen ein Barré?',
    kategorien: ['Ohne Barré', 'Barré-Griff'],
    items: [
      { text: 'E', kategorie: 'Ohne Barré' },
      { text: 'A', kategorie: 'Ohne Barré' },
      { text: 'D♯7', kategorie: 'Ohne Barré' },
      { text: 'Am', kategorie: 'Ohne Barré' },
      { text: 'G♯m', kategorie: 'Barré-Griff' },
      { text: 'F♯', kategorie: 'Barré-Griff' },
      { text: 'C♯m', kategorie: 'Barré-Griff' },
      { text: 'B (H)', kategorie: 'Barré-Griff' },
    ],
    erklaerung: 'E, A und Am sind offene Griffe mit Leersaiten; D♯7 hat zwar keine Leersaite, aber auch kein Barré. G♯m, F♯, C♯m und B brauchen den Zeigefinger als Barré.',
    quelle: 'Schritt 4: Barré',
  },
  {
    art: 'zuordnung',
    frage: 'Aus welcher Form und in welchem Bund entsteht der Barré-Akkord?',
    paare: [
      { begriff: 'F♯', ziel: 'E-Form, 2. Bund' },
      { begriff: 'G♯m', ziel: 'Em-Form, 4. Bund' },
      { begriff: 'B (H)', ziel: 'A-Form, 2. Bund' },
      { begriff: 'C♯m', ziel: 'Am-Form, 4. Bund' },
    ],
    erklaerung: 'Die Form bestimmt Dur/Moll, der Bund des Zeigefingers den Grundton: E + 2 Halbtöne = F♯, E + 4 = G♯, A + 2 = B, A + 4 = C♯.',
    quelle: 'Schritt 4: Barré',
  },
  {
    art: 'eingabe',
    frage: 'Du greifst die E-Form mit Barré im 2. Bund. Welcher Akkord klingt?',
    loesungen: ['F♯', 'F#', 'Fis', 'F♯-Dur', 'F#-Dur', 'Fis-Dur'],
    platzhalter: 'Akkordname',
    erklaerung: 'E + 2 Halbtöne: E → F → F♯. Deshalb liegt F♯ im 2. Bund – und F (ein Halbton tiefer) im 1.',
    quelle: 'Schritt 4: Barré',
  },

  // ── Schritt 5: Akkordwechsel ────────────────────────────────────────────
  {
    art: 'single',
    frage: 'Was bleibt beim Wechsel F♯ ↔ B liegen?',
    optionen: [
      { text: 'Der Zeigefinger als Barré im 2. Bund' },
      { text: 'Der Ringfinger auf der A-Saite', warumFalsch: 'Bei F♯ drückt der Ringfinger die A-Saite im 4. Bund, bei B die G-Saite.' },
      { text: 'Der kleine Finger auf der D-Saite', warumFalsch: 'Bei B liegt der kleine Finger auf der H-Saite – die D-Saite drückt der Mittelfinger.' },
      { text: 'Nichts – alle Finger wechseln', warumFalsch: 'Beide Griffe haben ihr Barré im 2. Bund – der Zeigefinger bleibt liegen.' },
    ],
    richtige: 0,
    erklaerung: 'F♯ = 244322 (E-Form), B = x24442 (A-Form): Beide haben das Barré im 2. Bund. Dasselbe gilt für G♯m ↔ C♯m im 4. Bund.',
    quelle: 'Schritt 5: Akkordwechsel',
  },
  {
    art: 'single',
    frage: 'Im Akkordblatt stehen in einer Zeile zwei Akkorde, z.B. „C♯m D♯7". Wie lange klingt jeder davon?',
    optionen: [
      { text: 'Zwei Schläge – jeder bekommt einen halben Takt' },
      { text: 'Vier Schläge – jeder einen ganzen Takt', warumFalsch: 'Eine Zeile ist ein Takt; zwei Akkorde teilen ihn sich.' },
      { text: 'Einen Schlag', warumFalsch: 'Dann blieben zwei Schläge im Takt übrig.' },
      { text: 'Das ist beliebig', warumFalsch: 'Der Wechsel muss auf der 3 passieren, sonst passt es nicht zur Melodie.' },
    ],
    richtige: 0,
    erklaerung: 'Im 4/4-Takt: Akkord 1 auf „1 2", Akkord 2 auf „3 4".',
    quelle: 'Schritt 5: Akkordwechsel',
  },
  {
    art: 'multi',
    frage: 'Was hilft gegen stockende Akkordwechsel?',
    optionen: [
      { text: 'Finger (oder das Barré) liegen lassen, wenn sie in beiden Griffen gleich sind' },
      { text: 'Den Wechsel schon auf der letzten Zählzeit vorbereiten' },
      { text: 'Die Schlaghand weiterpendeln lassen, auch wenn der Griff noch nicht sitzt' },
      { text: 'Die Schlaghand anhalten, bis der neue Griff perfekt sitzt', warumFalsch: 'Dann bricht der Rhythmus jedes Mal ab. Besser: weiterschlagen, notfalls kurz Leersaiten klingen lassen.' },
    ],
    richtige: [0, 1, 2],
    erklaerung: 'Das Timing hat Vorrang vor dem perfekten Griff: Der Rhythmus läuft weiter, die Greifhand holt auf.',
    quelle: 'Schritt 5: Akkordwechsel',
  },

  // ── Schritt 6: Song ─────────────────────────────────────────────────────
  {
    art: 'eingabe',
    frage: 'Das Originaltempo liegt bei etwa 150 BPM. Welches Tempo sind 60 % davon?',
    loesungen: ['90'],
    toleranz: 2,
    platzhalter: 'BPM',
    erklaerung: '150 × 0,6 = 90 BPM. Ganz am Anfang darfst du noch langsamer starten (die Seite schlägt 70 vor); klappt es 3× fehlerfrei, steigerst du um 5 BPM.',
    quelle: 'Schritt 6: Song',
  },
  {
    art: 'single',
    frage: 'Nach der Pfeif-Strophe geht der Song einen Halbton höher in A-Moll weiter. Was ändert sich für die Greifhand?',
    optionen: [
      { text: 'Ab hier fast nur offene Griffe (Am, G, C, Dm, E7, A7) – nur F und A♯ sind Barrés' },
      { text: 'Nichts – du spielst dieselben Griffe weiter', warumFalsch: 'Ohne Kapodaster brauchst du neue Griffe: Alles liegt einen Halbton höher.' },
      { text: 'Alle Barrés wandern einen Bund Richtung Sattel', warumFalsch: 'Höher heißt einen Bund Richtung Korpus – und die meisten Griffe werden ohnehin offen.' },
      { text: 'Ab hier kommen nur noch Barré-Griffe', warumFalsch: 'Im Gegenteil: A-Moll liegt bequem in den offenen Griffen.' },
    ],
    richtige: 0,
    erklaerung: 'G♯-Moll braucht auf der Gitarre viel Barré, A-Moll liegt dagegen in den offenen Griffen. Der schwerste Teil des Songs ist deshalb der erste.',
    quelle: 'Schritt 6: Song',
  },
  {
    art: 'reihenfolge',
    frage: 'Bring die Schritte zum Erarbeiten des Songs in eine sinnvolle Reihenfolge.',
    schritte: [
      'Songblatt kennenlernen',
      'Aufbau beim Hören mitzählen',
      'Intro, Strophe und Refrain einzeln bei 70 BPM üben',
      'Übergänge und Bridge üben',
      'Den Tonartwechsel nach A-Moll üben',
      'Mit ca. 150 BPM zum Original mitspielen',
    ],
    erklaerung: 'Erst verstehen (Blatt, Aufbau), dann in kleinen Teilen üben, dann zusammensetzen und zum Schluss das Tempo steigern.',
    quelle: 'Schritt 6: Song',
  },

  // ── K.K. Cruisin' ──────────────────────────────────────────────────────
  {
    art: 'zuordnung',
    frage: "K.K. Cruisin': Welche Form steckt in welchem Akkord?",
    paare: [
      { begriff: 'B♭7', ziel: 'A7-Form, Barré im 1. Bund' },
      { begriff: 'A♭7', ziel: 'E7-Form, Barré im 4. Bund' },
      { begriff: 'G♭7', ziel: 'E7-Form, Barré im 2. Bund' },
      { begriff: 'E♭7sus2', ziel: 'Mini-Barré im 1. Bund' },
      { begriff: 'B7', ziel: 'Offener Griff ohne Barré' },
    ],
    erklaerung: 'A♭7 ist derselbe Griff wie G♯7 aus Go K.K. Rider – zwei Namen für denselben Klang.',
    quelle: "K.K. Cruisin'",
  },
  {
    art: 'reihenfolge',
    frage: "Bring die Cruisin'-Schleife in die richtige Reihenfolge.",
    schritte: ['B7', 'B♭7', 'E♭7sus2', 'A♭7'],
    erklaerung: 'B7 → B♭7 → E♭7sus2 → A♭7 (jedes zweite Mal G♭7 statt A♭7). Nach dem Tonartwechsel: C7 → B7 → E7sus2 → A7/G7.',
    quelle: "K.K. Cruisin'",
  },
  {
    art: 'wahrfalsch',
    frage: "Markiere jede Aussage über K.K. Cruisin' als wahr oder falsch.",
    aussagen: [
      { text: 'Fast der ganze Song besteht aus einer Schleife von vier Akkorden.', wahr: true },
      { text: 'Der zweite Refrain beginnt mit einer Pause (N.C.).', wahr: true },
      { text: 'Nach dem Tonartwechsel kommen nur noch offene Griffe.', wahr: true },
      { text: 'A♭7 und G♯7 sind verschiedene Griffe.', wahr: false, warum: 'Es sind zwei Namen für denselben Ton – der Griff 464544 ist identisch.' },
      { text: 'Beim Wechsel B♭7 → E♭7sus2 muss der Zeigefinger den Bund wechseln.', wahr: false, warum: 'Beide haben ihr Barré im 1. Bund – der Zeigefinger bleibt liegen.' },
    ],
    erklaerung: 'Die Schleife B7 – B♭7 – E♭7sus2 – A♭7/G♭7 trägt den Song, Refrain 2 startet mit einer Pause, und nach dem Tonartwechsel wird es leichter: nur offene Griffe.',
    quelle: "K.K. Cruisin'",
  },

  // ── Zombie ─────────────────────────────────────────────────────────────
  {
    art: 'reihenfolge',
    frage: 'Bring die Zombie-Schleife in die richtige Reihenfolge.',
    schritte: ['Em', 'C', 'G', 'D'],
    erklaerung: 'Em → C → G → D, jeder Akkord einen Takt – und das den ganzen Song lang. Im Original klingt statt D meist D/F♯.',
    quelle: 'Zombie',
  },
  {
    art: 'single',
    frage: 'Was ändert sich bei Zombie zwischen leiser Strophe und lautem Refrain?',
    optionen: [
      { text: 'Nur der Anschlag – Griffe und Tempo bleiben gleich' },
      { text: 'Das Tempo wird schneller', warumFalsch: 'Leiser oder lauter heißt nicht langsamer oder schneller – beim Klick bleiben.' },
      { text: 'Es kommen andere Griffe dazu', warumFalsch: 'Der ganze Song bleibt die Schleife Em – C – G – D.' },
      { text: 'Die Gitarre wird anders gestimmt', warumFalsch: 'Die Stimmung bleibt E – A – D – G – H – e.' },
    ],
    richtige: 0,
    erklaerung: 'Zombie lebt von der Dynamik: Strophen mit sanften Viertel-Abschlägen oder Zupfen, Refrains mit kräftigen Rock-Achteln – über dieselben vier Griffe im selben Tempo.',
    quelle: 'Zombie',
  },
  {
    art: 'wahrfalsch',
    frage: 'Markiere jede Aussage über Zombie als wahr oder falsch.',
    aussagen: [
      { text: 'Bei D/F♯ ist F♯ der tiefste Ton.', wahr: true },
      { text: 'Am lautesten wird es in den Strophen.', wahr: false, warum: 'Die Strophen sind leise, laut wird es im Refrain (und im Solo).' },
      { text: 'Zombie ist schneller als Go K.K. Rider.', wahr: false, warum: 'Zombie läuft mit ca. 84 BPM, Go K.K. Rider mit ca. 150 BPM.' },
      { text: 'Aus C wird Cmaj7, wenn der Zeigefinger die H-Saite freigibt.', wahr: true },
    ],
    erklaerung: 'D/F♯ = D mit F♯ im Bass (Basslinie G → F♯ → E), leise Strophen und laute Refrains, ruhiges Tempo um 84 BPM, Cmaj7 = C mit leerer H-Saite.',
    quelle: 'Zombie',
  },

  // ── Blue Hair ──────────────────────────────────────────────────────────
  {
    art: 'reihenfolge',
    frage: 'Bring den ersten Durchgang von Blue Hair in die richtige Reihenfolge.',
    schritte: ['Intro', 'Strophe', 'Refrain', 'Zwischenspiel'],
    erklaerung: 'Intro, Strophe und Zwischenspiel sind Emaj7 – Amaj7, nur der Refrain ist F♯m – B7sus2. Der Block Strophe – Refrain – Zwischenspiel kommt dreimal, danach das Trompetensolo.',
    quelle: 'Blue Hair',
  },
  {
    art: 'zuordnung',
    frage: 'Blue Hair: Welcher Griff gehört zu welchem Akkord?',
    paare: [
      { begriff: 'Emaj7', ziel: '021100 – offen, alle sechs Saiten' },
      { begriff: 'Amaj7', ziel: 'x02120 – offen, tiefe E-Saite still' },
      { begriff: 'F♯m', ziel: '244222 – Em-Form, Barré im 2. Bund' },
      { begriff: 'B7sus2', ziel: 'x24222 – Barré im 2. Bund ab der A-Saite' },
    ],
    erklaerung: 'Strophe offen, Refrain mit Barré im 2. Bund. F♯m und B7sus2 unterscheiden sich nur auf den zwei tiefen Saiten – der Zeigefinger bleibt liegen.',
    quelle: 'Blue Hair',
  },
  {
    art: 'wahrfalsch',
    frage: 'Markiere jede Aussage über Blue Hair als wahr oder falsch.',
    aussagen: [
      { text: 'Emaj7 ist E-Dur, bei dem der Ton auf der D-Saite einen Bund tiefer liegt.', wahr: true },
      { text: 'Beim Wechsel F♯m → B7sus2 muss der Zeigefinger den Bund wechseln.', wahr: false, warum: 'Beide haben ihr Barré im 2. Bund – der Zeigefinger bleibt liegen.' },
      { text: 'Im Schlagmuster aus dem Akkordblatt ist die 4 ein Luftschlag.', wahr: true },
      { text: 'Blue Hair ist langsamer als Zombie.', wahr: false, warum: 'Blue Hair läuft mit ca. 136 BPM, Zombie mit ca. 84 BPM.' },
    ],
    erklaerung: 'Emaj7 = E-Dur mit D♯ statt E auf der D-Saite, der Refrain bleibt mit beiden Barrés im 2. Bund, und das Muster ↓ – ↓ ↑ – ↑ – ↑ lässt den Abschlag auf der 4 aus.',
    quelle: 'Blue Hair',
  },

  // ── 505 ────────────────────────────────────────────────────────────────
  {
    art: 'zuordnung',
    frage: '505: Welcher Griff gehört zu welchem Akkord?',
    paare: [
      { begriff: 'Dm', ziel: 'xx0231 – offen, nur die hohen Saiten' },
      { begriff: 'Em', ziel: '022000 – offen, alle sechs Saiten' },
      { begriff: 'Dm (Barré)', ziel: 'x57765 – Am-Form im 5. Bund' },
      { begriff: 'Em (Barré)', ziel: 'x79987 – Am-Form im 7. Bund' },
    ],
    erklaerung: 'Der ganze Song ist Dm – Em. Offen gegriffen ändern sich alle Finger, als Barré (Am-Form) rutscht dieselbe Handform nur zwei Bünde weiter.',
    quelle: '505',
  },
  {
    art: 'reihenfolge',
    frage: 'Bring diese Teile von 505 (wie im Video) in die richtige Reihenfolge.',
    schritte: ['Intro', 'Strophe 1', 'Strophe 2', 'Break', 'Strophe 3', 'Outro'],
    erklaerung: 'Nach dem Intro, nach Strophe 2 und nach Strophe 3 kommt jeweils ein Refrain. Alle Teile sind Dm – Em, jeder Akkord zwei Takte.',
    quelle: '505',
  },
  {
    art: 'kategorien',
    frage: 'Welche Teile spielt das Video mit einem Abschlag pro Akkord, welche mit DDU UDU?',
    kategorien: ['Ein Abschlag pro Akkord', 'DDU UDU'],
    items: [
      { text: 'Intro', kategorie: 'Ein Abschlag pro Akkord' },
      { text: 'Erster Refrain', kategorie: 'Ein Abschlag pro Akkord' },
      { text: 'Break', kategorie: 'Ein Abschlag pro Akkord' },
      { text: 'Schluss', kategorie: 'Ein Abschlag pro Akkord' },
      { text: 'Strophe 1', kategorie: 'DDU UDU' },
      { text: 'Strophe 3', kategorie: 'DDU UDU' },
      { text: 'Letzter Refrain', kategorie: 'DDU UDU' },
      { text: 'Outro', kategorie: 'DDU UDU' },
    ],
    erklaerung: 'Einzelschläge („DOWN") nur am Anfang, im Break und ganz am Ende – sonst läuft DDU UDU, zweimal pro Akkord.',
    quelle: '505',
  },
  {
    art: 'wahrfalsch',
    frage: 'Markiere jede Aussage über 505 als wahr oder falsch.',
    aussagen: [
      { text: 'Im Video wird DDU UDU zweimal pro Akkord gespielt.', wahr: true },
      { text: 'DDU UDU ist dasselbe Muster wie das Song-Muster aus Go K.K. Rider.', wahr: true },
      { text: 'Greifst du Em mit Zeige- und Mittelfinger, bleibt der Mittelfinger beim Wechsel von Dm im 2. Bund.', wahr: true },
      { text: 'Ab der dritten Strophe wird das Video langsamer.', wahr: false, warum: 'Schneller: etwa 122 statt 112 BPM („strum faster").' },
    ],
    erklaerung: 'DDU UDU = ↓ – ↓↑ – ↑ ↓↑, zweimal pro Akkord – ab Strophe 3 etwas schneller. Beim Wechsel hilft der Mittelfinger, der im 2. Bund nur eine Saite weiterrutscht.',
    quelle: '505',
  },
]
