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
    name: 'First Strike',
    description: 'First correct answer',
    emoji: '✊',
    condition: s => s.totalCorrect >= 1,
  },
  {
    id: 'streak_3',
    name: 'On Fire!',
    description: '3 correct answers in a row',
    emoji: '🔥',
    condition: s => s.maxEverStreak >= 3,
  },
  {
    id: 'streak_5',
    name: 'Gear Second!',
    description: '5 correct answers in a row',
    emoji: '⚡',
    condition: s => s.maxEverStreak >= 5,
  },
  {
    id: 'streak_10',
    name: 'Gear Third — Legendary!',
    description: '10 correct answers in a row',
    emoji: '👑',
    condition: s => s.maxEverStreak >= 10,
  },
  {
    id: 'perfect_round',
    name: 'Perfect Nakama',
    description: 'A complete round without any mistakes',
    emoji: '💎',
    condition: s => s.perfectRounds >= 1,
  },
  {
    id: 'all_categories',
    name: 'Grand Explorer',
    description: 'Play all categories',
    emoji: '🗺️',
    condition: s => s.categoriesPlayed.length >= 5,
  },
  {
    id: 'berry_1000',
    name: 'Berry Hunter',
    description: '1,000 berries collected',
    emoji: '💰',
    condition: s => s.berries >= 1000,
  },
  {
    id: 'berry_10000',
    name: 'Grand Line',
    description: '10,000 berries collected',
    emoji: '🌊',
    condition: s => s.berries >= 10000,
  },
  {
    id: 'devilfruit_master',
    name: 'Fruit Master',
    description: 'Complete the Devil Fruit quiz',
    emoji: '🍎',
    condition: s => s.devilFruitQuizDone,
  },
]
