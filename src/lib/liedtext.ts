import { useCallback, useState } from 'react'

// Eigener Liedtext je Abschnitt im Songblatt. Die Lernseite selbst enthält keine
// Liedtexte (Urheberrecht) – wer mitlesen will, trägt den Text selbst ein. Er liegt nur
// im localStorage dieses Browsers, nie im Repository und nie auf der veröffentlichten Seite.
// Schlüssel wie bei lernseiten-ui „<art>:<Seitentitel>", damit lib/umzug.ts ihn bei einer
// Umbenennung mitnimmt. Inhalt: { [liedId]: { [abschnittId]: Text } }.

const schluessel = () => `liedtext:${(typeof document !== 'undefined' && document.title) || 'default'}`

type AlleTexte = Record<string, Record<string, string>>

function lesen(): AlleTexte {
  try {
    const roh = localStorage.getItem(schluessel())
    const daten: unknown = roh ? JSON.parse(roh) : null
    if (daten && typeof daten === 'object' && !Array.isArray(daten)) return daten as AlleTexte
  } catch {
    // Speicher nicht verfügbar oder ungültige Daten – dann eben ohne Texte
  }
  return {}
}

function speichern(liedId: string, texte: Record<string, string>) {
  try {
    const alle = lesen()
    if (Object.keys(texte).length) alle[liedId] = texte
    else delete alle[liedId]
    localStorage.setItem(schluessel(), JSON.stringify(alle))
  } catch {
    // z.B. privates Fenster – der Text gilt dann nur bis zum Neuladen
  }
}

/** Texte eines Lieds je Abschnitt und eine Funktion zum Setzen (leer = löschen). */
export function useLiedTexte(liedId: string) {
  const [texte, setTexte] = useState<Record<string, string>>(() => {
    const t = lesen()[liedId]
    return t && typeof t === 'object' ? t : {}
  })

  const setzen = useCallback(
    (abschnittId: string, text: string) => {
      const sauber = text.replace(/\s+$/, '')
      const aendern = (alt: Record<string, string>) => {
        const neu = { ...alt }
        if (sauber.trim()) neu[abschnittId] = sauber
        else delete neu[abschnittId]
        return neu
      }
      setTexte(aendern)
      // Vom gespeicherten Stand ausgehen, damit nichts aus anderen Tabs überschrieben wird
      speichern(liedId, aendern(lesen()[liedId] ?? {}))
    },
    [liedId],
  )

  return [texte, setzen] as const
}
