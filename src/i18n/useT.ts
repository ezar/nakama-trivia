import { useSettingsStore } from '../store/settingsStore'
import { translations } from './translations'

export function useT() {
  const lang = useSettingsStore(s => s.language)
  return translations[lang]
}
