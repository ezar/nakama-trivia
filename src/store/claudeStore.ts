import { create } from 'zustand'
import { Question, CategoryId, Profile } from '../types'
import { generateQuestions, getExplanation, hasApiKey } from '../engine/ClaudeEngine'

interface ClaudeState {
  cache: Partial<Record<string, Question[]>>
  isGenerating: boolean
  lastError: string | null
  apiEnabled: boolean

  prefetch: (categoryId: CategoryId, difficulty: 1 | 2 | 3, profile: Profile) => Promise<Question[]>
  explain: (question: Question, userAnswer: string) => Promise<string>
  clearError: () => void
}

function cacheKey(categoryId: CategoryId, difficulty: number) {
  return `${categoryId}-${difficulty}`
}

export const useClaudeStore = create<ClaudeState>()((set, get) => ({
  cache: {},
  isGenerating: false,
  lastError: null,
  apiEnabled: hasApiKey(),

  prefetch: async (categoryId, difficulty, profile) => {
    if (!hasApiKey()) return []

    const key = cacheKey(categoryId, difficulty)
    const cached = get().cache[key]
    if (cached && cached.length >= 3) return cached

    set({ isGenerating: true, lastError: null })
    try {
      const questions = await generateQuestions(categoryId, difficulty, 5, profile)
      set(s => ({
        cache: { ...s.cache, [key]: questions },
        isGenerating: false,
      }))
      return questions
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error al generar preguntas'
      set({ isGenerating: false, lastError: msg })
      return []
    }
  },

  explain: async (question, userAnswer) => {
    if (!hasApiKey()) return question.explanation ?? 'La respuesta correcta es: ' + question.correctAnswer
    try {
      return await getExplanation(question, userAnswer)
    } catch {
      return question.explanation ?? 'La respuesta correcta es: ' + question.correctAnswer
    }
  },

  clearError: () => set({ lastError: null }),
}))
