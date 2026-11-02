import { jeTakt, type Lied } from '../songblatt'

// 505 (Arctic Monkeys, 2007) – letztes Lied auf „Favourite Worst Nightmare", Tonart D-Moll
// bzw. D-Dorisch (Em statt E°). Gespielt wie im Video-Tutorial „505 - Arctic Monkeys (Guitar
// Tutorial) No Capo! Easy Chords For Beginner!" von Dee Must auf YouTube; Liedtext bewusst
// weggelassen. Ohne Kapodaster: nur Dm und Em, beide offen.
//
// Das Video blendet zu jedem Teil die Akkorde und unten rechts den Anschlag ein:
// „DOWN" = einmal abschlagen und klingen lassen, „DDU UDU" = ↓ – ↓↑ – ↑ ↓↑ (dasselbe wie
// das Song-Muster), laut Video zweimal pro Akkord. Jeder Akkord dauert also zwei Takte.
// Gemessen am Video (Akkordwechsel per Tonanalyse): mit DDU UDU ein Wechsel etwa alle
// 4,3 s ≈ 112 BPM, ab der dritten Strophe („strum faster") alle 3,9 s ≈ 122 BPM. Die
// Studioaufnahme ist schneller (ca. 140 BPM laut Spotify-Daten über SongBPM).
//
// Die Abschnitts-IDs stammen aus dem ersten Aufbau dieser Seite (nach der Studioaufnahme)
// und gehören zu denselben Textzeilen – so bleiben selbst eingetragene Texte
// (lib/liedtext.ts) am richtigen Abschnitt, auch wenn die Namen jetzt dem Video folgen.

/** Video-Tempo der Teile mit DDU UDU. */
const VIDEO_BPM = 112
/** Ab Strophe 3 im Video schneller (≈ 122 BPM) – als Faktor, damit er auch beim Üben passt. */
const SCHNELLER = 122 / VIDEO_BPM

/** `n` Runden Dm – Em, jeder Akkord zwei Takte. */
const runden = (n: number) => jeTakt(...Array.from({ length: n }, () => ['Dm', 'Dm', 'Em', 'Em']).flat())

export const LIED_505: Lied = {
  id: '505',
  titel: '505',
  lernIntro:
    'Ein Indie-Rock-Klassiker: „505" von den Arctic Monkeys – mit nur zwei offenen Griffen, Dm und Em, ganz ohne Barré. Gelernt wird es wie im Video-Tutorial von Dee Must: erst ein Abschlag pro Akkord, dann das Schlagmuster DDU UDU, zweimal pro Akkord, und ab der dritten Strophe etwas schneller. In fünf Schritten zum ganzen Lied, plus Bonus: dieselbe Runde als Barré-Griff.',
  rechte: '„505" von Arctic Monkeys (Text und Musik: Alex Turner)',
  bpm: VIDEO_BPM,
  uebeBpm: 80,
  tempi: [80, 100, VIDEO_BPM],
  anschlaege: ['einzeln', 'song'],
  quelle: {
    autor: 'Dee Must',
    url: 'https://www.youtube.com/watch?v=d8CR8fSTm-Y',
    zusatz: 'Liedtext weggelassen.',
    video: true,
  },
  liedtext: { seite: 'Genius', url: 'https://genius.com/Arctic-monkeys-505-lyrics' },
  abschnitte: [
    {
      id: 'intro',
      name: 'Intro',
      teil: 1,
      takte: runden(2),
      anschlag: 'einzeln',
      tipp:
        'Dm – Em – Dm – Em, jeden Akkord nur einmal abwärts anschlagen und zwei Takte klingen lassen (im Video „DOWN"). Zähl „1 2 3 4, 2 2 3 4" – auf die nächste 1 kommt der nächste Akkord.',
      unsicher:
        'Im Video laufen Intro und erster Refrain etwas freier und flotter (ein Akkord alle 3½–4 Sekunden). Erst mit dem Schlagmuster in Strophe 1 pendelt sich das Tempo bei etwa 112 BPM ein. Zum Üben gilt überall: zwei Takte pro Akkord.',
    },
    {
      id: 'strophe-1',
      name: 'Refrain',
      teil: 1,
      takte: runden(4),
      anschlag: 'einzeln',
      tipp:
        'Der Gesang setzt ein – und du bleibst bei einem Abschlag pro Akkord. Achtmal wechseln: Dm, Em, Dm, Em … So bleibt viel Platz für die Stimme.',
      unsicher:
        'Im Video gehört dieser Teil zur ersten Strophe. Weil genau diese Zeilen (mit dem Songtitel) später zweimal wiederkommen, heißt er hier Refrain.',
    },
    {
      id: 'strophe-2',
      name: 'Strophe 1',
      teil: 1,
      takte: runden(4),
      anschlag: 'song',
      vorher: 'Ab hier das Schlagmuster DDU UDU (↓ – ↓↑ – ↑ ↓↑) – zweimal pro Akkord.',
      tipp:
        'Jetzt läuft das Muster durch: zweimal DDU UDU auf Dm, zweimal auf Em. Umgreifen auf dem letzten Aufschlag (4+) – die Hand geht da ohnehin nach oben, und Leersaiten dürfen kurz mitklingen.',
    },
    {
      id: 'strophe-3',
      name: 'Strophe 2',
      teil: 1,
      takte: runden(4),
      anschlag: 'song',
      tipp: 'Wie Strophe 1: achtmal wechseln, je zweimal DDU UDU. Nach dem letzten Em geht es ohne Pause in den Refrain.',
    },
    {
      id: 'strophe-4',
      name: 'Refrain',
      teil: 1,
      takte: runden(4),
      anschlag: 'song',
      tipp: 'Dieselben Akkorde wie im ersten Refrain, jetzt aber mit DDU UDU – dadurch klingt er voller.',
    },
    {
      id: 'steigerung',
      name: 'Break',
      teil: 1,
      takte: runden(2),
      anschlag: 'einzeln',
      vorher: 'Break: wieder nur einmal pro Akkord abschlagen.',
      tipp:
        'Dm – Em – Dm – Em wie im Intro: je ein Abschlag, zwei Takte klingen lassen. Im Video heißt der Teil „Break" (gesprochen „build-up") – hier sammelt sich die Spannung für den Schluss.',
    },
    {
      id: 'bridge',
      name: 'Strophe 3',
      teil: 1,
      takte: runden(4),
      anschlag: 'song',
      tempo: SCHNELLER,
      vorher:
        'Ab hier schneller: Im Video geht das Tempo von etwa 112 auf 122 BPM hoch („strum faster"). Beim Mitspielen zieht der Klick automatisch mit an.',
      tipp: 'Wieder DDU UDU, zweimal pro Akkord – nur zügiger. Bleib locker im Handgelenk; wenn es hakt, lieber kleinere Bewegungen als mehr Kraft.',
    },
    {
      id: 'schluss',
      name: 'Refrain',
      teil: 1,
      takte: runden(4),
      anschlag: 'song',
      tempo: SCHNELLER,
      tipp: 'Der letzte Refrain im schnelleren Tempo – dieselben acht Wechsel Dm, Em … wie in den anderen Refrains.',
    },
    {
      id: 'outro',
      name: 'Outro',
      teil: 1,
      takte: runden(2),
      anschlag: 'song',
      tempo: SCHNELLER,
      tipp: 'Noch zwei Runden Dm – Em mit DDU UDU, ohne Gesang.',
    },
    {
      id: 'ende',
      name: 'Schluss',
      teil: 1,
      takte: runden(1),
      anschlag: 'einzeln',
      tempo: SCHNELLER,
      tipp: 'Zum Schluss wie am Anfang: Dm einmal abschlagen, dann Em – und ausklingen lassen. 🎸',
    },
  ],
}

/** Aufbau für Überblick und Spickzettel: Abschnitt, Länge in Takten, Anschlag und Tempo laut Video. */
export const LIED_505_AUFBAU = LIED_505.abschnitte.map(a => ({
  name: a.name,
  takte: a.takte.length,
  anschlag: a.anschlag === 'einzeln' ? '↓ einmal pro Akkord' : 'DDU UDU, 2× pro Akkord',
  schneller: a.tempo !== undefined,
}))
