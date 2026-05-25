import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CategoryId, Profile } from '../types'
import { RANKS } from '../config/ranks'
import { ACHIEVEMENTS, AchievementStats } from '../config/achievements'

function getRankForBerries(berries: number) {
  return [...RANKS].reverse().find(r => berries >= r.berries) ?? RANKS[0]!
}

function createEmptyProfile(name: string, avatar: string): Profile {
  return {
    id: crypto.randomUUID(),
    name: name.toUpperCase(),
    avatar,
    berries: 0,
    totalCorrect: 0,
    maxEverStreak: 0,
    dailyStreak: 0,
    lastDailyDate: null,
    unlockedCategories: ['characters', 'devilfruits'],
    achievements: [],
    createdAt: Date.now(),
    categoryStats: {},
    bestRoundScore: 0,
  }
}

function checkAchievements(profile: Profile, stats: Partial<AchievementStats>): string[] {
  const fullStats: AchievementStats = {
    totalCorrect: profile.totalCorrect,
    berries: profile.berries,
    maxEverStreak: profile.maxEverStreak,
    categoriesPlayed: Object.keys(profile.categoryStats),
    perfectRounds: 0,
    devilFruitQuizDone: false,
    ...stats,
  }

  return ACHIEVEMENTS
    .filter(a => !profile.achievements.includes(a.id) && a.condition(fullStats))
    .map(a => a.id)
}

interface ProfileState {
  profiles: Profile[]
  activeProfileId: string | null
  getActiveProfile: () => Profile | null
  createProfile: (name: string, avatar: string) => void
  setActiveProfile: (id: string) => void
  deleteProfile: (id: string) => void
  addBerries: (amount: number) => { newAchievements: string[]; newlyUnlocked: CategoryId[] }
  addCorrect: (count: number) => void
  updateMaxStreak: (streak: number) => void
  recordCategoryStats: (categoryId: CategoryId, correct: number, wrong: number) => void
  updateBestRoundScore: (score: number) => void
  grantAchievements: (ids: string[]) => void
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfileId: null,

      getActiveProfile: () => {
        const { profiles, activeProfileId } = get()
        return profiles.find(p => p.id === activeProfileId) ?? null
      },

      createProfile: (name, avatar) => {
        const profile = createEmptyProfile(name, avatar)
        set(s => ({
          profiles: [...s.profiles, profile],
          activeProfileId: profile.id,
        }))
      },

      setActiveProfile: (id) => set({ activeProfileId: id }),

      deleteProfile: (id) =>
        set(s => ({
          profiles: s.profiles.filter(p => p.id !== id),
          activeProfileId: s.activeProfileId === id
            ? (s.profiles.find(p => p.id !== id)?.id ?? null)
            : s.activeProfileId,
        })),

      addBerries: (amount) => {
        const profile = get().getActiveProfile()
        if (!profile) return { newAchievements: [], newlyUnlocked: [] }

        const newBerries = profile.berries + amount
        const newAchievements = checkAchievements({ ...profile, berries: newBerries }, { berries: newBerries })

        // Unlock categories based on berries
        const newlyUnlocked: CategoryId[] = []
        const unlockThresholds: [number, CategoryId][] = [
          [500, 'arcs'],
          [1500, 'bounties'],
          [3500, 'grandline'],
        ]
        for (const [threshold, catId] of unlockThresholds) {
          if (newBerries >= threshold && !profile.unlockedCategories.includes(catId)) {
            newlyUnlocked.push(catId)
          }
        }

        set(s => ({
          profiles: s.profiles.map(p =>
            p.id === profile.id
              ? {
                  ...p,
                  berries: newBerries,
                  achievements: [...p.achievements, ...newAchievements],
                  unlockedCategories: [...p.unlockedCategories, ...newlyUnlocked],
                }
              : p
          ),
        }))

        return { newAchievements, newlyUnlocked }
      },

      addCorrect: (count) => {
        const profile = get().getActiveProfile()
        if (!profile) return
        set(s => ({
          profiles: s.profiles.map(p =>
            p.id === profile.id ? { ...p, totalCorrect: p.totalCorrect + count } : p
          ),
        }))
      },

      updateMaxStreak: (streak) => {
        const profile = get().getActiveProfile()
        if (!profile || streak <= profile.maxEverStreak) return
        set(s => ({
          profiles: s.profiles.map(p =>
            p.id === profile.id ? { ...p, maxEverStreak: streak } : p
          ),
        }))
      },

      recordCategoryStats: (categoryId, correct, wrong) => {
        const profile = get().getActiveProfile()
        if (!profile) return
        set(s => ({
          profiles: s.profiles.map(p => {
            if (p.id !== profile.id) return p
            const prev = p.categoryStats[categoryId] ?? { correct: 0, wrong: 0 }
            return {
              ...p,
              categoryStats: {
                ...p.categoryStats,
                [categoryId]: {
                  correct: prev.correct + correct,
                  wrong: prev.wrong + wrong,
                },
              },
            }
          }),
        }))
      },

      updateBestRoundScore: (score) => {
        const profile = get().getActiveProfile()
        if (!profile || score <= (profile.bestRoundScore ?? 0)) return
        set(s => ({
          profiles: s.profiles.map(p =>
            p.id === profile.id ? { ...p, bestRoundScore: score } : p
          ),
        }))
      },

      grantAchievements: (ids) => {
        const profile = get().getActiveProfile()
        if (!profile || ids.length === 0) return
        set(s => ({
          profiles: s.profiles.map(p =>
            p.id === profile.id
              ? { ...p, achievements: [...new Set([...p.achievements, ...ids])] }
              : p
          ),
        }))
      },
    }),
    { name: 'op-trivia-profiles' }
  )
)
