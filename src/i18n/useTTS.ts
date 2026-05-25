import { useCallback, useEffect, useRef, useState } from 'react'
import { useSettingsStore } from '../store/settingsStore'

export function useTTS() {
  const language = useSettingsStore(s => s.language)
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
  }, [])

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return

    if (window.speechSynthesis.speaking) {
      stop()
      return
    }

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'en' ? 'en-US' : 'es-ES'
    utterance.rate = 0.92
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    utteranceRef.current = utterance

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }, [language, stop])

  // Stop when component unmounts or question changes
  useEffect(() => () => { window.speechSynthesis?.cancel() }, [])

  return { speak, stop, speaking }
}
