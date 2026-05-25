import { Question, CategoryId, Profile } from '../types'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined
const MODEL = 'claude-sonnet-4-20250514'
const BASE_URL = 'https://api.anthropic.com/v1/messages'

const SYSTEM = `You are the question generator for One Piece Trivia.
Generate trivia questions about One Piece in English.
ALWAYS respond in valid JSON with no extra text or backticks.`

export function hasApiKey(): boolean {
  return !!API_KEY && API_KEY.startsWith('sk-ant')
}

async function callClaude(prompt: string): Promise<string> {
  if (!hasApiKey()) throw new Error('No API key')

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY!,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      system: SYSTEM,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) throw new Error(`API error: ${res.status}`)
  const data = await res.json()
  return data.content.filter((b: { type: string }) => b.type === 'text').map((b: { text: string }) => b.text).join('')
}

const CATEGORY_NAMES: Record<CategoryId, string> = {
  characters: 'characters (Straw Hats, marines, villains, emperors)',
  arcs: 'story arcs (Alabasta, Marineford, Dressrosa, Wano, etc.)',
  devilfruits: 'Devil Fruits (types, powers, users)',
  bounties: 'bounties of pirates and marines',
  grandline: 'Grand Line geography (islands, routes, seas)',
}

export async function generateQuestions(
  categoryId: CategoryId,
  difficulty: 1 | 2 | 3,
  count: number,
  profile: Profile,
): Promise<Question[]> {
  const stats = profile.categoryStats[categoryId]
  const statsStr = stats
    ? `The player has ${stats.correct} correct and ${stats.wrong} incorrect in this category.`
    : 'The player is new to this category.'

  const prompt = `Generate exactly ${count} One Piece trivia questions for the category "${CATEGORY_NAMES[categoryId]}" at difficulty ${difficulty}/3 (${difficulty === 1 ? 'easy' : difficulty === 2 ? 'medium' : 'hard'}).

${statsStr}

Each question must have 4 options and exactly one correct answer.
Include a fun fact or brief explanation in the "explanation" field.

Return ONLY this JSON (no extra text):
[
  {
    "prompt": "...?",
    "options": ["option A", "option B", "option C", "option D"],
    "correctAnswer": "option A",
    "explanation": "Brief 1-2 sentence explanation with fan enthusiasm."
  }
]`

  const text = await callClaude(prompt)
  const clean = text.replace(/```json|```/g, '').trim()
  const parsed = JSON.parse(clean) as Array<{
    prompt: string
    options: string[]
    correctAnswer: string
    explanation?: string
  }>

  return parsed.map((q, i) => ({
    id: `claude-${categoryId}-${difficulty}-${Date.now()}-${i}`,
    categoryId,
    difficulty,
    prompt: q.prompt,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    source: 'claude' as const,
  }))
}

export async function getExplanation(
  question: Question,
  userAnswer: string,
): Promise<string> {
  const prompt = `A One Piece Trivia player answered "${userAnswer}" to the question: "${question.prompt}"
The correct answer is: "${question.correctAnswer}"

Explain in at most 60 words why that is the correct answer.
Use One Piece fan enthusiasm. Plain text only, no formatting or intro.`

  return callClaude(prompt)
}
