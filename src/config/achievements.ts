export interface Achievement {
  id: string
  name: string
  description: string
  emoji: string
  condition: (stats: AchievementStats) => boolean
}

export interface AchievementStats {
  totalCorrect: number
  berries: number
  maxEverStreak: number
  categoriesPlayed: string[]
  perfectRounds: number
  devilFruitQuizDone: boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_correct',
    name: 'Primer Golpe',
    description: 'Primera respuesta correcta',
    emoji: '✊',
    condition: s => s.totalCorrect >= 1,
  },
  {
    id: 'streak_3',
    name: 'On Fire!',
    description: 'Racha de 3 respuestas correctas',
    emoji: '🔥',
    condition: s => s.maxEverStreak >= 3,
  },
  {
    id: 'streak_5',
    name: 'Gear Second!',
    description: 'Racha de 5 respuestas correctas',
    emoji: '⚡',
    condition: s => s.maxEverStreak >= 5,
  },
  {
    id: 'streak_10',
    name: 'Gear Third — Legendary!',
    description: 'Racha de 10 respuestas correctas',
    emoji: '👑',
    condition: s => s.maxEverStreak >= 10,
  },
  {
    id: 'perfect_round',
    name: 'Nakama Perfecto',
    description: 'Una ronda completa sin errores',
    emoji: '💎',
    condition: s => s.perfectRounds >= 1,
  },
  {
    id: 'all_categories',
    name: 'Gran Explorador',
    description: 'Jugar todas las categorías',
    emoji: '🗺️',
    condition: s => s.categoriesPlayed.length >= 5,
  },
  {
    id: 'berry_1000',
    name: 'Cazador de Berries',
    description: '1,000 berries acumulados',
    emoji: '💰',
    condition: s => s.berries >= 1000,
  },
  {
    id: 'berry_10000',
    name: 'Gran Línea',
    description: '10,000 berries acumulados',
    emoji: '🌊',
    condition: s => s.berries >= 10000,
  },
  {
    id: 'devilfruit_master',
    name: 'Maestro de Frutas',
    description: 'Completar el quiz de Frutas del Diablo',
    emoji: '🍎',
    condition: s => s.devilFruitQuizDone,
  },
]
