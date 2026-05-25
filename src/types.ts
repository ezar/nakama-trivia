export type CategoryId = 'characters' | 'arcs' | 'devilfruits' | 'bounties' | 'grandline'
export type Phase = 'start' | 'hub' | 'game' | 'result' | 'ranking' | 'devilfruit'
export type GameMode = 'normal' | 'survival'
export type DevilFruitType = 'Paramecia' | 'Zoan' | 'Logia'

export interface Question {
  id: string
  categoryId: CategoryId
  difficulty: 1 | 2 | 3
  prompt: string
  options: string[]
  correctAnswer: string
  explanation?: string
  source: 'local' | 'claude'
}

export interface DevilFruit {
  id: string
  name: string
  type: DevilFruitType
  user: string
  power: string
  arc: string
  emoji: string
}

export interface Category {
  id: CategoryId
  emoji: string
  name: string
  description: string
  unlockedAt: number
  color: string
  borderColor: string
}

export interface RoundResult {
  score: number
  berriesEarned: number
  maxStreak: number
  correctCount: number
  wrongCount: number
  totalQuestions: number
  perfectBonus: number
  gameOver: boolean
  newlyUnlockedCategories: CategoryId[]
}

export interface Profile {
  id: string
  name: string
  avatar: string
  berries: number
  totalCorrect: number
  maxEverStreak: number
  dailyStreak: number
  lastDailyDate: string | null
  unlockedCategories: CategoryId[]
  achievements: string[]
  createdAt: number
  categoryStats: Partial<Record<CategoryId, { correct: number; wrong: number }>>
  bestRoundScore: number
}
