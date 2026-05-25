import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Locale } from '../i18n/translations'

interface SettingsState {
  soundEnabled: boolean
  language: Locale
  toggleSound: () => void
  setLanguage: (lang: Locale) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      soundEnabled: true,
      language: 'en',
      toggleSound: () => set(s => ({ soundEnabled: !s.soundEnabled })),
      setLanguage: (language) => set({ language }),
    }),
    { name: 'op-trivia-settings' }
  )
)
