import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useProfileStore } from '../store/profileStore'
import { useClaudeStore } from '../store/claudeStore'

const QUESTION_DURATION = 12
const ADVANCE_DELAY = 1600

const STREAK_MILESTONES: Record<number, { label: string; color: string }> = {
  3:  { label: '🔥 ON FIRE!',               color: 'text-orange-400' },
  5:  { label: '⚡ GEAR SECOND!',            color: 'text-op-cyan' },
  10: { label: '👑 GEAR THIRD — LEGENDARY!', color: 'text-op-gold' },
}

export function GameScreen() {
  const {
    currentQuestion, currentQuestionIndex, questionQueue,
    score, streak, lives, gameMode, currentCategoryId,
    answerQuestion, loseLife, advanceQuestion, finishRound, pendingExplanation, setExplanation,
  } = useGameStore()

  const { addBerries, addCorrect, updateMaxStreak, recordCategoryStats, updateBestRoundScore } = useProfileStore()
  const profile = useProfileStore(s => s.getActiveProfile())
  const { explain } = useClaudeStore()

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION)
  const [showStreak, setShowStreak] = useState<string | null>(null)
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (advanceRef.current) clearTimeout(advanceRef.current)
  }, [])

  const doFinishRound = useCallback(() => {
    const { score, maxStreak, correctAnswers, wrongAnswers, questionQueue } = useGameStore.getState()
    const perfect = wrongAnswers.length === 0 && questionQueue.length > 0
    const perfectBonus = perfect ? 500 : 0

    if (profile && currentCategoryId) {
      const { newAchievements, newlyUnlocked } = addBerries(Math.floor((score + perfectBonus) / 10))
      addCorrect(correctAnswers.length)
      updateMaxStreak(maxStreak)
      recordCategoryStats(currentCategoryId, correctAnswers.length, wrongAnswers.length)
      updateBestRoundScore(score + perfectBonus)
      finishRound({ newAchievements, newlyUnlocked, perfectBonus, gameOver: false })
    }
  }, [profile, currentCategoryId, addBerries, addCorrect, updateMaxStreak, recordCategoryStats, updateBestRoundScore, finishRound])

  const handleAnswer = useCallback(async (answer: string) => {
    if (selectedAnswer !== null) return
    clearTimers()
    setSelectedAnswer(answer)

    const correct = answerQuestion(answer)
    setIsCorrect(correct)

    const newStreak = useGameStore.getState().streak
    const milestone = STREAK_MILESTONES[newStreak]
    if (milestone) {
      setShowStreak(milestone.label)
      setTimeout(() => setShowStreak(null), 1500)
    }

    // Get explanation for wrong answers
    if (!correct && currentQuestion) {
      setIsLoadingExplanation(true)
      const expl = await explain(currentQuestion, answer)
      setExplanation(expl)
      setIsLoadingExplanation(false)
    }

    advanceRef.current = setTimeout(() => {
      const { questionQueue, currentQuestionIndex } = useGameStore.getState()
      const isLast = currentQuestionIndex >= questionQueue.length - 1

      if (!correct && gameMode === 'survival') {
        const gameOver = loseLife()
        if (gameOver) {
          doFinishRound()
          return
        }
      }

      if (isLast) {
        doFinishRound()
      } else {
        setSelectedAnswer(null)
        setIsCorrect(null)
        setTimeLeft(QUESTION_DURATION)
        advanceQuestion()
      }
    }, correct ? ADVANCE_DELAY : ADVANCE_DELAY + (pendingExplanation ? 600 : 0))
  }, [selectedAnswer, currentQuestion, answerQuestion, advanceQuestion, clearTimers, gameMode, loseLife, doFinishRound, explain, setExplanation, pendingExplanation])

  // Timer
  useEffect(() => {
    if (!currentQuestion || selectedAnswer !== null) return
    setTimeLeft(QUESTION_DURATION)

    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          handleAnswer('__timeout__')
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearTimers()
  }, [currentQuestion?.id])

  if (!currentQuestion) return null

  const progress = (currentQuestionIndex) / questionQueue.length

  return (
    <div className="h-dvh flex flex-col bg-op-navy bg-ocean-pattern select-none">
      {/* Top bar */}
      <div className="px-4 pt-4 pb-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="font-pirata text-op-gold text-xl">{score.toLocaleString()} pts</div>
          <div className="font-mono text-op-parchment text-sm">
            {currentQuestionIndex + 1} / {questionQueue.length}
          </div>
          <div className="font-pirata text-op-cream text-xl">
            {gameMode === 'survival'
              ? Array.from({ length: 3 }, (_, i) => (
                  <span key={i} className={i < lives ? 'text-op-red' : 'text-white/10'}>♥</span>
                ))
              : streak > 0
              ? <span className="text-op-gold">×{streak} 🔥</span>
              : null
            }
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-op-deep rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${progress * 100}%` }}
            className="h-full bg-op-gold/60 rounded-full"
          />
        </div>

        {/* Timer bar */}
        <div className="h-1 bg-op-deep rounded-full overflow-hidden">
          <motion.div
            key={currentQuestion.id}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / QUESTION_DURATION) * 100}%` }}
            transition={{ duration: 1, ease: 'linear' }}
            className={`h-full rounded-full transition-colors ${
              timeLeft > 6 ? 'bg-op-cyan' : timeLeft > 3 ? 'bg-op-gold' : 'bg-op-red'
            }`}
          />
        </div>
      </div>

      {/* Streak milestone */}
      <AnimatePresence>
        {showStreak && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -20 }}
            className="absolute inset-x-0 top-20 z-10 text-center pointer-events-none"
          >
            <span className="font-pirata text-2xl text-op-gold text-shadow-gold">{showStreak}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question */}
      <div className="flex-1 flex flex-col px-4 pt-6 pb-2 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col"
          >
            {/* Difficulty badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-op-parchment/60 uppercase tracking-widest">
                {'⭐'.repeat(currentQuestion.difficulty)}
              </span>
              {currentQuestion.source === 'claude' && (
                <span className="text-xs font-mono text-op-cyan/60 uppercase tracking-widest">AI</span>
              )}
            </div>

            {/* Question text */}
            <div className="font-pirata text-op-cream text-2xl leading-snug mb-6 flex-1 flex items-center">
              {currentQuestion.prompt}
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              {currentQuestion.options.map((opt) => {
                let style = 'border-white/10 bg-op-ocean text-op-cream hover:border-op-gold/40'
                if (selectedAnswer !== null) {
                  if (opt === currentQuestion.correctAnswer) {
                    style = 'border-op-green bg-op-green/20 text-op-cream'
                  } else if (opt === selectedAnswer && !isCorrect) {
                    style = 'border-op-red bg-op-red/20 text-op-cream'
                  } else {
                    style = 'border-white/5 bg-op-deep text-op-parchment/40'
                  }
                }

                return (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: selectedAnswer === null ? 0.97 : 1 }}
                    onClick={() => handleAnswer(opt)}
                    disabled={selectedAnswer !== null}
                    className={`w-full p-4 rounded-xl border text-left font-body text-base transition-all ${style}`}
                  >
                    {opt}
                  </motion.button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {(pendingExplanation || isLoadingExplanation) && selectedAnswer && !isCorrect && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-xl bg-op-ocean border border-op-cyan/20 text-op-parchment text-sm leading-relaxed"
                >
                  {isLoadingExplanation ? (
                    <span className="text-op-parchment/40 animate-pulse">Cargando explicación...</span>
                  ) : pendingExplanation}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
