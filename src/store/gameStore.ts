import { create } from 'zustand'
import { CategoryId, Phase, GameMode, Question, RoundResult } from '../types'

export interface GameState {
  phase: Phase
  gameMode: GameMode
  currentCategoryId: CategoryId | null
  questionQueue: Question[]
  currentQuestionIndex: number
  currentQuestion: Question | null
  score: number
  streak: number
  maxStreak: number
  lives: number
  correctAnswers: Question[]
  wrongAnswers: Question[]
  lastResult: RoundResult | null
  newAchievements: string[]
  pendingExplanation: string | null

  setPhase: (phase: Phase) => void
  setGameMode: (mode: GameMode) => void
  startRound: (categoryId: CategoryId, questions: Question[]) => void
  answerQuestion: (answer: string) => boolean
  loseLife: () => boolean
  advanceQuestion: () => void
  setExplanation: (text: string | null) => void
  finishRound: (opts: { newAchievements: string[]; newlyUnlocked: CategoryId[]; perfectBonus: number; gameOver?: boolean }) => void
  resetRound: () => void
  setNewAchievements: (ids: string[]) => void
}

export const useGameStore = create<GameState>()((set, get) => ({
  phase: 'start',
  gameMode: 'normal',
  currentCategoryId: null,
  questionQueue: [],
  currentQuestionIndex: 0,
  currentQuestion: null,
  score: 0,
  streak: 0,
  maxStreak: 0,
  lives: 3,
  correctAnswers: [],
  wrongAnswers: [],
  lastResult: null,
  newAchievements: [],
  pendingExplanation: null,

  setPhase: (phase) => set({ phase }),
  setGameMode: (gameMode) => set({ gameMode }),
  setExplanation: (text) => set({ pendingExplanation: text }),
  setNewAchievements: (ids) => set({ newAchievements: ids }),

  startRound: (categoryId, questions) => {
    set({
      currentCategoryId: categoryId,
      questionQueue: questions,
      currentQuestionIndex: 0,
      currentQuestion: questions[0] ?? null,
      score: 0,
      streak: 0,
      maxStreak: 0,
      lives: get().gameMode === 'survival' ? 3 : Infinity,
      correctAnswers: [],
      wrongAnswers: [],
      lastResult: null,
      pendingExplanation: null,
      phase: 'game',
    })
  },

  answerQuestion: (answer) => {
    const { currentQuestion, streak, maxStreak, score, correctAnswers, wrongAnswers } = get()
    if (!currentQuestion) return false

    const correct = answer === currentQuestion.correctAnswer

    let streakBonus = 0
    const newStreak = correct ? streak + 1 : 0
    if (correct) {
      if (newStreak === 3) streakBonus = 50
      else if (newStreak === 5) streakBonus = 100
      else if (newStreak >= 10) streakBonus = 200
    }

    const newScore = correct ? score + 100 + streakBonus : score
    const newMaxStreak = Math.max(maxStreak, newStreak)

    set({
      score: newScore,
      streak: newStreak,
      maxStreak: newMaxStreak,
      correctAnswers: correct ? [...correctAnswers, currentQuestion] : correctAnswers,
      wrongAnswers: correct ? wrongAnswers : [...wrongAnswers, currentQuestion],
    })

    return correct
  },

  loseLife: () => {
    const { lives } = get()
    const newLives = lives - 1
    set({ lives: newLives })
    return newLives <= 0
  },

  advanceQuestion: () => {
    const { currentQuestionIndex, questionQueue } = get()
    const nextIndex = currentQuestionIndex + 1
    set({
      currentQuestionIndex: nextIndex,
      currentQuestion: questionQueue[nextIndex] ?? null,
      pendingExplanation: null,
    })
  },

  finishRound: ({ newAchievements, newlyUnlocked, perfectBonus, gameOver = false }) => {
    const { score, maxStreak, correctAnswers, wrongAnswers, questionQueue } = get()
    const berriesEarned = Math.floor((score + perfectBonus) / 10)

    set({
      lastResult: {
        score,
        berriesEarned,
        maxStreak,
        correctCount: correctAnswers.length,
        wrongCount: wrongAnswers.length,
        totalQuestions: questionQueue.length,
        perfectBonus,
        gameOver,
        newlyUnlockedCategories: newlyUnlocked,
      },
      newAchievements,
      phase: 'result',
    })
  },

  resetRound: () => set({
    questionQueue: [],
    currentQuestionIndex: 0,
    currentQuestion: null,
    score: 0,
    streak: 0,
    maxStreak: 0,
    correctAnswers: [],
    wrongAnswers: [],
    pendingExplanation: null,
  }),
}))
