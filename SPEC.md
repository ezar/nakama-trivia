# One Piece Trivia — SPEC v1.0

## Visión

Juego de trivia de One Piece para jugar en familia (César + hijos).
Misma arquitectura que `nakama-words` y `nakama-math` del repo `ezar`.
Preguntas locales + generación dinámica via Claude API.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 + Vite + TypeScript |
| Estilos | Tailwind CSS (paleta custom One Piece) |
| Estado | Zustand 5 + persist middleware |
| Animaciones | framer-motion (AnimatePresence) |
| IA | Anthropic claude-sonnet-4-20250514 |
| Tests | Vitest |

---

## Fases de navegación

```
start → hub → game → result
                ↓
           devilfruit
                ↓
            ranking
```

### StartScreen
- Selección / creación de perfil (nombre + avatar emoji)
- Avatares: 🏴‍☠️ ☠️ 🦜 ⚓ 🌊 🗡️ 🔥 ⚡ (piratas)
- Persistido en localStorage via profileStore

### HubScreen
- Mapa visual del Grand Line (fondo oscuro oceánico)
- Cards de categorías como "islas" del mapa
- Muestra berries actuales, rank actual, racha diaria
- Acceso a DevilFruit Encyclopedia
- Acceso a Rankings

### GameScreen
- 8 preguntas por ronda (configurable)
- Timer: 12 segundos por pregunta
- 3 vidas (modo supervivencia) o modo normal (sin vidas)
- Streak visible con milestone banners (×3 🔥, ×5 ⚡ GEAR SECOND, ×10 👑 GEAR THIRD)
- Al fallar: Claude genera explicación breve (si hay API key)
- Al acertar en racha ≥5: siguiente pregunta más difícil

### ResultScreen
- Puntuación total
- Berries ganados
- Resumen correcto/incorrecto
- Nuevos logros desbloqueados
- Botón "Jugar otra ronda"

### RankingScreen
- Leaderboard local (todos los perfiles)
- Ordenado por berries totales
- Muestra rank actual de cada perfil

### DevilFruitScreen
- Enciclopedia de ~100 frutas del diablo
- Filtro por tipo: Paramecia / Zoan / Logia
- Mini-quiz: ¿Quién come esta fruta?
- Detalles: nombre, tipo, usuario, poder

---

## Categorías

```typescript
type CategoryId = 'characters' | 'arcs' | 'devilfruits' | 'bounties' | 'grandline'
```

| ID | Emoji | Nombre | Desc |
|----|-------|--------|------|
| characters | 🏴‍☠️ | Personajes | Nakama, marines, villanos, emperadores |
| arcs | ⚔️ | Arcos | Arcos principales de la historia |
| devilfruits | 🍎 | Frutas del Diablo | Tipos, poderes, usuarios |
| bounties | 💰 | Bounties | Recompensas de piratas y marines |
| grandline | 🌊 | Grand Line | Islas, geografía, logposes |

---

## Tipos principales

```typescript
// src/types.ts

export type CategoryId = 'characters' | 'arcs' | 'devilfruits' | 'bounties' | 'grandline'
export type Phase = 'start' | 'hub' | 'game' | 'result' | 'ranking' | 'devilfruit'
export type GameMode = 'normal' | 'survival'
export type DevilFruitType = 'Paramecia' | 'Zoan' | 'Logia'

export interface Question {
  id: string
  categoryId: CategoryId
  difficulty: 1 | 2 | 3         // 1=fácil, 2=medio, 3=difícil
  prompt: string                  // La pregunta
  options: string[]               // 4 opciones
  correctAnswer: string
  explanation?: string            // Dato curioso (generado por Claude o hardcoded)
  source: 'local' | 'claude'
}

export interface DevilFruit {
  id: string
  name: string
  type: DevilFruitType
  user: string
  power: string
  arc: string                     // Arco donde aparece
  emoji?: string
}

export interface Category {
  id: CategoryId
  emoji: string
  name: string
  description: string
  unlockedAt: number              // berries necesarios para desbloquear
  color: string                   // clase tailwind
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
  bestRoundScore?: number
}
```

---

## Sistema de preguntas

### Preguntas locales (`src/data/questions/`)

Un archivo por categoría con mínimo 20-40 preguntas.
Formato: `Question[]` exportado.

Seed questions son el fallback cuando no hay API key o la llamada falla.

### Preguntas Claude (`src/engine/ClaudeEngine.ts`)

**Cuándo se llama:**
- Al inicio de cada ronda: genera batch de 3-5 preguntas adicionales
- Cuando streak ≥ 5: solicita pregunta de dificultad 3
- Cuando jugador falla: solicita explicación de la respuesta correcta

**System prompt:**
```
Eres el generador de preguntas del juego One Piece Trivia.
Genera preguntas de trivia sobre One Piece en español.
Responde SIEMPRE en JSON válido.
```

**Prompt de generación:**
```
Genera {n} preguntas de trivia sobre One Piece de categoría "{category}" 
y dificultad {difficulty}/3.

El jugador tiene {correct} correctas y {wrong} incorrectas en esta categoría.
Evita preguntas similares a estas que ya vio: {recentPrompts}

Formato JSON:
[{
  "prompt": "¿...?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A",
  "explanation": "Dato curioso en 1-2 frases"
}]

Solo JSON, sin texto adicional.
```

**Prompt de explicación (al fallar):**
```
El jugador respondió "{userAnswer}" a la pregunta "{question}".
La respuesta correcta es "{correctAnswer}".
Explica por qué en máximo 60 palabras, en español, con entusiasmo de fan de One Piece.
Solo el texto, sin formato.
```

### claudeStore.ts

```typescript
interface ClaudeStore {
  cache: Record<string, Question[]>      // key: categoryId-difficulty
  pendingQueue: Question[]               // preguntas generadas esperando uso
  isGenerating: boolean
  lastError: string | null

  generateQuestions: (categoryId: CategoryId, difficulty: 1|2|3, n: number, profile: Profile) => Promise<Question[]>
  getExplanation: (question: Question, userAnswer: string) => Promise<string>
  prefetchForCategory: (categoryId: CategoryId, profile: Profile) => void
}
```

---

## Sistema de puntuación

```
Base por respuesta correcta: 100 pts
Bonus velocidad: (secondsLeft / 12) * 50 pts
Bonus streak ×3: +50 pts
Bonus streak ×5: +100 pts
Bonus streak ×10: +200 pts
Bonus ronda perfecta: +500 pts

Berries = floor(score / 10)
```

---

## Ranks (idéntico a nakama-words)

| Rank | Label | Berries |
|------|-------|---------|
| 1 | Cabin Boy | 0 |
| 2 | Sailor | 500 |
| 3 | Pirate | 1,500 |
| 4 | First Mate | 3,500 |
| 5 | Captain | 7,000 |
| 6 | Warlord | 15,000 |
| 7 | Emperor | 30,000 |
| 8 | Pirate King | 60,000 |

---

## Logros

| ID | Nombre | Condición |
|----|--------|-----------|
| first_correct | Primer Golpe | Primera respuesta correcta |
| streak_3 | On Fire! | Racha de 3 |
| streak_5 | Gear Second | Racha de 5 |
| streak_10 | Gear Third | Racha de 10 |
| perfect_round | Nakama Perfecto | Ronda sin errores |
| all_categories | Gran Explorador | Jugar todas las categorías |
| berry_1000 | Cazador de Berries | 1,000 berries acumulados |
| berry_10000 | Gran Línea | 10,000 berries acumulados |
| devilfruit_master | Maestro de Frutas | Completar quiz de Devil Fruits |

---

## Paleta de colores

```javascript
// tailwind.config.ts
colors: {
  'op-navy':     '#0A1628',   // fondo principal
  'op-ocean':    '#0D2137',   // superficies/cards
  'op-deep':     '#071020',   // sombras profundas
  'op-gold':     '#F4C542',   // acento: berries, UI activo
  'op-gold-dim': '#B8942E',   // gold oscurecido
  'op-red':      '#D63031',   // peligro, vidas, ataques
  'op-cyan':     '#00B4D8',   // agua, Marine, secundario
  'op-cream':    '#FFF5E4',   // texto principal
  'op-parchment':'#E8D5B7',   // texto secundario (pergamino)
  'op-wood':     '#8B6914',   // elementos de madera/barco
}
```

---

## Estructura de archivos

```
onepiece-trivia/
├── SPEC.md
├── CLAUDE.md
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── index.html
├── public/
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types.ts
    ├── index.css
    ├── config/
    │   ├── categories.ts        # Definición de categorías
    │   ├── ranks.ts             # Sistema de ranks (igual nakama-words)
    │   └── achievements.ts      # Definición de logros
    ├── data/
    │   ├── questions/
    │   │   ├── characters.ts    # 40 preguntas de personajes
    │   │   ├── arcs.ts          # 30 preguntas de arcos
    │   │   ├── devilfruits.ts   # 35 preguntas de frutas
    │   │   ├── bounties.ts      # 25 preguntas de bounties
    │   │   └── grandline.ts     # 20 preguntas del Grand Line
    │   └── devilfruits.ts       # Enciclopedia de frutas del diablo
    ├── engine/
    │   ├── QuestionEngine.ts    # Selección y mezcla de preguntas
    │   ├── ClaudeEngine.ts      # Llamadas a Claude API
    │   └── rng.ts               # RNG determinista (igual nakama-words)
    ├── store/
    │   ├── gameStore.ts
    │   ├── profileStore.ts
    │   ├── settingsStore.ts
    │   └── claudeStore.ts
    ├── screens/
    │   ├── StartScreen.tsx
    │   ├── HubScreen.tsx
    │   ├── GameScreen.tsx
    │   ├── ResultScreen.tsx
    │   ├── RankingScreen.tsx
    │   └── DevilFruitScreen.tsx
    ├── components/
    │   ├── QuestionCard.tsx
    │   ├── OptionsGrid.tsx
    │   ├── TimerRing.tsx
    │   ├── StreakBanner.tsx
    │   ├── BerryCounter.tsx
    │   ├── RankBadge.tsx
    │   ├── LivesDisplay.tsx
    │   ├── ExplanationPanel.tsx  # Panel con explicación de Claude
    │   └── ConfettiCanvas.tsx
    ├── utils/
    │   ├── rankHelpers.ts
    │   ├── scoreHelpers.ts
    │   └── haptics.ts
    └── i18n/
        └── translations.ts       # es/en (por defecto español)
```

---

## MVP v1.0

✅ 5 categorías con preguntas locales
✅ Flujo completo: Start → Hub → Game → Result
✅ Perfil con berries y ranks
✅ Sistema de streak con milestones
✅ Timer de 12 segundos
✅ Claude API para preguntas dinámicas (opcional)
✅ Explicaciones al fallar (con Claude)
✅ DevilFruit Encyclopedia
✅ Ranking local
✅ Logros básicos
✅ Persistencia localStorage

❌ (v2) Modo multijugador local (2 jugadores, mismo dispositivo)
❌ (v2) Daily challenge
❌ (v2) Sonidos y música
❌ (v2) Modo quiz inverso (imagen → nombre)
