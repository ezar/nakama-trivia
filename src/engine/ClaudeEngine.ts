import { Question, CategoryId, Profile } from '../types'

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined
const MODEL = 'claude-sonnet-4-20250514'
const BASE_URL = 'https://api.anthropic.com/v1/messages'

const SYSTEM = `Eres el generador de preguntas del juego One Piece Trivia.
Genera preguntas de trivia sobre One Piece en español.
Responde SIEMPRE en JSON válido sin texto adicional ni backticks.`

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
  characters: 'personajes (Mugiwara, marines, villanos, emperadores)',
  arcs: 'arcos de la historia (Alabasta, Marineford, Dressrosa, Wano, etc.)',
  devilfruits: 'Frutas del Diablo (tipos, poderes, usuarios)',
  bounties: 'recompensas (bounties) de piratas y marines',
  grandline: 'geografía del Grand Line (islas, rutas, mares)',
}

export async function generateQuestions(
  categoryId: CategoryId,
  difficulty: 1 | 2 | 3,
  count: number,
  profile: Profile,
): Promise<Question[]> {
  const stats = profile.categoryStats[categoryId]
  const statsStr = stats
    ? `El jugador tiene ${stats.correct} correctas y ${stats.wrong} incorrectas en esta categoría.`
    : 'El jugador es nuevo en esta categoría.'

  const prompt = `Genera exactamente ${count} preguntas de trivia sobre One Piece de la categoría "${CATEGORY_NAMES[categoryId]}" y dificultad ${difficulty}/3 (${difficulty === 1 ? 'fácil' : difficulty === 2 ? 'medio' : 'difícil'}).

${statsStr}

Cada pregunta debe tener 4 opciones y una sola respuesta correcta.
Incluye un dato curioso o explicación breve en el campo "explanation".

Devuelve SOLO este JSON (sin texto adicional):
[
  {
    "prompt": "¿...?",
    "options": ["opción A", "opción B", "opción C", "opción D"],
    "correctAnswer": "opción A",
    "explanation": "Explicación breve en 1-2 frases con entusiasmo de fan."
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
  const prompt = `El jugador de One Piece Trivia respondió "${userAnswer}" a la pregunta: "${question.prompt}"
La respuesta correcta es: "${question.correctAnswer}"

Explica en máximo 60 palabras por qué la respuesta correcta es esa. 
Usa entusiasmo de fan de One Piece. Solo el texto, sin formato ni intro.`

  return callClaude(prompt)
}
