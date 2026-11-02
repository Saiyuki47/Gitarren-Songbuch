// Begriffe zum Auswendiglernen — kompakte Definitionen, die für sich allein
// „abfragbar" sind: Begriff lesen → Definition aufsagen können. Reiner Text.

export interface Begriff {
  begriff: string
  definition: string
  /** Optionale Eselsbrücke / Kurzform zum Einprägen. */
  merke?: string
}

export interface BegriffGruppe {
  titel: string
  begriffe: Begriff[]
}

export const begriffGruppen: BegriffGruppe[] = [
  {
    titel: 'Die Gitarre',
    begriffe: [
      {
        begriff: 'Saitennummerierung',
        definition: 'Die Saiten werden von der dünnsten (1, hohes e) zur dicksten (6, tiefes E) gezählt.',
        merke: 'Saite 1 ist die, die beim Halten am nächsten zum Boden liegt.',
      },
      {
        begriff: 'Bund',
        definition: 'Abschnitt des Griffbretts zwischen zwei Bundstäbchen. Jeder Bund erhöht den Ton um einen Halbton.',
      },
      {
        begriff: 'Sattel',
        definition: 'Die Kerbleiste am Ende des Griffbretts (Richtung Kopf), über die die Saiten laufen. Im Griffbild die dicke Linie oben.',
      },
      {
        begriff: 'Leersaite',
        definition: 'Eine Saite, die angeschlagen wird, ohne dass ein Finger sie greift. Im Griffbild mit ○ markiert.',
      },
      {
        begriff: 'Plektrum',
        definition: 'Kleines Plättchen zum Anschlagen der Saiten. Dünne Plektren (ca. 0,5–0,7 mm) sind für Akkordbegleitung angenehm.',
      },
    ],
  },
  {
    titel: 'Akkorde',
    begriffe: [
      {
        begriff: 'Akkord',
        definition: 'Mindestens drei verschiedene Töne, die gleichzeitig erklingen.',
      },
      {
        begriff: 'Dur / Moll',
        definition: 'Dur-Akkorde klingen hell und fröhlich, Moll-Akkorde dunkler und trauriger. Sie unterscheiden sich nur in der Terz (einem Ton).',
        merke: 'Moll wird mit kleinem „m" geschrieben: Am, Em, Dm.',
      },
      {
        begriff: 'Septakkord',
        definition: 'Dreiklang plus kleine Septime (z.B. G7). Klingt spannungsreich und löst sich gern in den Akkord eine Quinte tiefer auf (G7 → C).',
      },
      {
        begriff: 'Major-Septakkord (maj7)',
        definition: 'Dur-Dreiklang plus große Septime – ein Halbton unter dem Grundton, z.B. Emaj7 = E – G♯ – H – D♯. Klingt weich und verträumt statt spannungsreich, wie in Blue Hair.',
        merke: 'maj7 = große Septime (½ Ton unter dem Grundton), 7 = kleine Septime (1 Ton darunter).',
      },
      {
        begriff: 'sus-Akkord (sus2, sus4)',
        definition: 'Akkord, bei dem die Terz durch die Sekunde (sus2) oder die Quarte (sus4) ersetzt ist. Er ist weder Dur noch Moll und klingt offen und schwebend – z.B. B7sus2 in Blue Hair oder E♭7sus2 in K.K. Cruisin\'.',
        merke: 'sus = „suspended": Die Terz ist ausgesetzt.',
      },
      {
        begriff: 'Offener Akkord',
        definition: 'Akkord in den ersten Bünden, der Leersaiten enthält – z.B. C, G, D, Am, Em.',
      },
      {
        begriff: 'Barré',
        definition: 'Griff, bei dem ein Finger (meist der Zeigefinger) mehrere Saiten in einem Bund gleichzeitig herunterdrückt, z.B. beim F-Dur.',
      },
      {
        begriff: 'Ankerfinger',
        definition: 'Finger, der bei einem Akkordwechsel an derselben Stelle liegen bleibt, weil er in beiden Griffen gleich ist.',
      },
      {
        begriff: 'Barré-Form',
        definition: 'Ein offener Griff (E, Em, A, Am), den man mit dem Zeigefinger als Barré den Hals hinaufschiebt. Die Form bestimmt Dur/Moll, der Bund den Grundton.',
        merke: 'Em-Form im 4. Bund = G♯m.',
      },
      {
        begriff: 'Mini-Barré',
        definition: 'Barré über nur zwei bis vier Saiten statt über alle sechs – z.B. bei E♭7sus2 im 1. Bund.',
      },
      {
        begriff: 'Enharmonische Verwechslung',
        definition: 'Ein Ton mit zwei Namen, z.B. G♯ = A♭. Auf der Gitarre ist es derselbe Bund – G♯7 und A♭7 sind derselbe Griff.',
        merke: '♯ = einen Halbton höher, ♭ = einen Halbton tiefer.',
      },
      {
        begriff: 'Slash-Akkord',
        definition: 'Akkord mit einem anderen Basston als seinem Grundton, geschrieben „Akkord/Basston". D/F♯ ist ein D-Dur-Akkord mit F♯ als tiefstem Ton – so entstehen Basslinien wie G → F♯ → E in Zombie.',
        merke: 'Links vom Strich der Akkord, rechts der Bass.',
      },
      {
        begriff: 'Halbton',
        definition: 'Kleinster Tonschritt auf der Gitarre – genau ein Bund. Zwölf Halbtöne ergeben eine Oktave.',
      },
      {
        begriff: 'Griffbild',
        definition: 'Diagramm, das zeigt, welche Saite in welchem Bund mit welchem Finger gegriffen wird.',
      },
    ],
  },
  {
    titel: 'Rhythmus',
    begriffe: [
      {
        begriff: 'BPM',
        definition: 'Beats per Minute – Schläge pro Minute, das Maß für das Tempo. 60 BPM = ein Schlag pro Sekunde.',
      },
      {
        begriff: 'Takt',
        definition: 'Gruppe von Schlägen, die sich wiederholt. Im 4/4-Takt zählt man „1 2 3 4".',
      },
      {
        begriff: 'Abschlag / Aufschlag',
        definition: 'Abschlag (↓) = Plektrum bewegt sich Richtung Boden; Aufschlag (↑) = Richtung Decke.',
      },
      {
        begriff: 'Schlagmuster',
        definition: 'Feste Abfolge von Ab-, Auf- und Luftschlägen, die pro Takt wiederholt wird, z.B. ↓ – ↓ ↑ – ↑ ↓ ↑.',
      },
      {
        begriff: 'Luftschlag',
        definition: 'Die Schlaghand macht die Bewegung, verfehlt aber absichtlich die Saiten – so bleibt das Pendel im Takt.',
      },
      {
        begriff: 'D/U-Schreibweise (z.B. DDU UDU)',
        definition: 'Kurzschrift für Schlagmuster, wie sie viele Video-Tutorials einblenden: D = Down (Abschlag ↓), U = Up (Aufschlag ↑). „DDU UDU" in 505 ist ↓ – ↓ ↑ – ↑ ↓ ↑ – die Lücke steht für den Luftschlag auf der 3.',
        merke: 'DDU UDU = das Song-Muster aus Go K.K. Rider.',
      },
      {
        begriff: 'Swing / Shuffle',
        definition: 'Achtel werden ungleich gespielt: die erste lang, die zweite kurz (ca. 2 : 1). Klingt hüpfend.',
        merke: '„Dum-da Dum-da" statt „ta-ta ta-ta".',
      },
      {
        begriff: 'Backbeat',
        definition: 'Betonung der Schläge 2 und 4 im 4/4-Takt – typisch für Pop und Rock.',
      },
      {
        begriff: 'Dynamik',
        definition: 'Die Lautstärke und ihre Veränderung im Song. Bei Zombie sind die Strophen leise und die Refrains laut, bei 505 wechseln einzelne Abschläge und das volle Schlagmuster – mit denselben Griffen, nur anders angeschlagen.',
        merke: 'Leiser heißt nicht langsamer.',
      },
      {
        begriff: 'Palm Muting',
        definition: 'Der Handballen der Schlaghand liegt leicht auf den Saiten am Steg und dämpft sie – der Klang wird kurz und gedämpft.',
      },
    ],
  },
  {
    titel: 'Songaufbau',
    begriffe: [
      {
        begriff: 'Intro',
        definition: 'Einleitung eines Songs, bevor die eigentliche Melodie bzw. der Gesang beginnt.',
      },
      {
        begriff: 'Strophe (Verse)',
        definition: 'Abschnitt, der sich musikalisch wiederholt, meist mit wechselndem Text.',
      },
      {
        begriff: 'Refrain (Chorus)',
        definition: 'Der wiederkehrende, eingängigste Teil eines Songs.',
      },
      {
        begriff: 'Vorrefrain (Pre-Chorus)',
        definition: 'Überleitung zwischen Strophe und Refrain, die Spannung aufbaut. Wird oft von Runde zu Runde lauter.',
      },
      {
        begriff: 'Bridge',
        definition: 'Kontrastierender Zwischenteil, der meist nur einmal vorkommt und zurück zum Refrain führt.',
      },
      {
        begriff: 'Break',
        definition: 'Kurzer Teil, in dem die Begleitung zurückgenommen wird oder aussetzt. In 505 wird im Break nur einmal pro Akkord angeschlagen – danach zieht der Song zum Schluss noch einmal an.',
      },
      {
        begriff: 'Transponieren',
        definition: 'Einen Song in eine andere Tonart verschieben – alle Akkorde wandern um dieselbe Anzahl Halbtöne.',
      },
      {
        begriff: 'Tonartwechsel (Modulation)',
        definition: 'Der Song wechselt mitten drin in eine andere Tonart. Bei Go K.K. Rider geht es gegen Ende einen Halbton höher (G♯-Moll → A-Moll).',
        merke: 'Bei Go K.K. Rider wird es danach leichter: fast nur offene Griffe.',
      },
      {
        begriff: 'Andalusische Kadenz',
        definition: 'Absteigende Akkordfolge Moll – eine Stufe tiefer – noch eine tiefer – Dur/Sept, z.B. G♯m – F♯ – E – D♯7. Bildet das Intro von Go K.K. Rider.',
      },
      {
        begriff: 'Dorisch',
        definition: 'Kirchentonart, die nach Moll klingt, aber eine große Sexte hat. D-Dorisch = D – E – F – G – A – H – C: dieselben Töne wie C-Dur, nur mit D als Grundton. Typisch ist der Wechsel vom Moll-Grundakkord zum Moll-Akkord einen Ganzton höher – wie Dm – Em in 505 (das H in Em ist die große Sexte von D).',
        merke: 'Dorisch = Moll mit einem hellen Farbtupfer (große Sexte).',
      },
    ],
  },
]
