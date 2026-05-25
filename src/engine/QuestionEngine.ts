import { Question, CategoryId, Profile } from '../types'
import { ALL_QUESTIONS } from '../data/questions/index'
import { shuffleArray } from './rng'

const ROUND_SIZE = 8

export function buildRound(
  categoryId: CategoryId,
  profile: Profile,
  rng = Math.random,
  extraQuestions: Question[] = [],
): Question[] {
  const pool = [...ALL_QUESTIONS[categoryId], ...extraQuestions]
  const stats = profile.categoryStats[categoryId]

  if (!stats || stats.correct + stats.wrong < 5) {
    // New player: mix of difficulty 1 and 2
    const easy = pool.filter(q => q.difficulty === 1)
    const medium = pool.filter(q => q.difficulty === 2)
    const selected = [
      ...shuffleArray(easy, rng).slice(0, 5),
      ...shuffleArray(medium, rng).slice(0, 3),
    ]
    return shuffleArray(selected, rng).slice(0, ROUND_SIZE)
  }

  const accuracy = stats.correct / (stats.correct + stats.wrong)

  // Adapt difficulty based on accuracy
  let diff1Count = 2, diff2Count = 4, diff3Count = 2
  if (accuracy > 0.8) { diff1Count = 0; diff2Count = 3; diff3Count = 5 }
  else if (accuracy < 0.5) { diff1Count = 5; diff2Count = 3; diff3Count = 0 }

  const d1 = shuffleArray(pool.filter(q => q.difficulty === 1), rng).slice(0, diff1Count)
  const d2 = shuffleArray(pool.filter(q => q.difficulty === 2), rng).slice(0, diff2Count)
  const d3 = shuffleArray(pool.filter(q => q.difficulty === 3), rng).slice(0, diff3Count)

  const selected = shuffleArray([...d1, ...d2, ...d3], rng).slice(0, ROUND_SIZE)

  // Fill up if not enough
  if (selected.length < ROUND_SIZE) {
    const remaining = shuffleArray(pool.filter(q => !selected.find(s => s.id === q.id)), rng)
    selected.push(...remaining.slice(0, ROUND_SIZE - selected.length))
  }

  return selected
}

export function shuffleOptions(question: Question, rng = Math.random): Question {
  return {
    ...question,
    options: shuffleArray(question.options, rng),
  }
}
