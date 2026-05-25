import { Question, CategoryId } from '../../types'
import { characterQuestions } from './characters'
import { devilfruitQuestions } from './devilfruits'
import { arcQuestions, bountyQuestions, grandlineQuestions } from './arcs-bounties-grandline'

export const ALL_QUESTIONS: Record<CategoryId, Question[]> = {
  characters: characterQuestions,
  devilfruits: devilfruitQuestions,
  arcs: arcQuestions,
  bounties: bountyQuestions,
  grandline: grandlineQuestions,
}
