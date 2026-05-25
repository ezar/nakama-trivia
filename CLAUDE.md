# CLAUDE.md — One Piece Trivia Game

## Qué es esto

Juego de trivia de One Piece para César Ramos y sus hijos.
Arquitectura inspirada en ezar/nakama-words y ezar/nakama-math.

Lee el SPEC.md antes de tocar código.

## Arrancar

```bash
npm install
cp .env.example .env
# Edita .env y pon tu VITE_ANTHROPIC_API_KEY (opcional — el juego funciona sin ella con preguntas locales)
npm run dev
```

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS (paleta One Piece custom)
- Zustand 5 (persist middleware para progreso)
- framer-motion (AnimatePresence entre screens)
- Anthropic API directa desde el frontend (uso local)

## Arquitectura de navegación

App.tsx → AnimatePresence → screens por phase

```
phase: 'start' → StartScreen  (selección de perfil)
phase: 'hub'   → HubScreen    (mapa del Grand Line, selección de categoría)
phase: 'game'  → GameScreen   (trivia con timer y streak)
phase: 'result'→ ResultScreen (puntuación, berries, logros)
phase: 'ranking'→ RankingScreen (leaderboard local)
phase: 'devilfruit' → DevilFruitScreen (enciclopedia + quiz)
```

## Stores (Zustand)

- `gameStore.ts` — fase actual, pregunta actual, score, streak, lives
- `profileStore.ts` — perfiles, berries, ranks, logros, historial
- `settingsStore.ts` — sonido, idioma
- `claudeStore.ts` — caché de preguntas generadas, cola de preguntas pendientes

## QuestionEngine

`src/engine/QuestionEngine.ts` — dos modos:
1. **Local**: selecciona de `src/data/questions/` — funciona sin API
2. **Claude**: llama a Claude API para generar preguntas adaptadas al perfil

La lógica de selección: si hay VITE_ANTHROPIC_API_KEY, mezcla 60% local + 40% Claude.
Si no hay key, 100% local. Nunca bloquear el juego esperando API.

## Claude API

Modelo: `claude-sonnet-4-20250514`
Key: `VITE_ANTHROPIC_API_KEY` (solo con prefijo VITE_ para Vite)

Llamadas:
1. **Generar preguntas** (batch de 3-5 al iniciar ronda)
2. **Explicación de respuesta incorrecta** (1 llamada por fallo, max 80 palabras)
3. **Pregunta bonus difícil** (cuando racha ≥ 5)

## Paleta de colores (tailwind.config.ts)

```
op-navy: '#0A1628'        # fondo principal
op-ocean: '#0D2137'       # superficies
op-gold: '#F4C542'        # acento principal (berries, UI activo)
op-red: '#D63031'         # peligro, vidas, crew del Shanks
op-cyan: '#00B4D8'        # secundario, agua, Marine
op-cream: '#FFF5E4'       # texto principal
op-parchment: '#E8D5B7'   # texto secundario (como mapa antiguo)
```

## Categorías (worlds)

| ID | Emoji | Nombre | Preguntas locales |
|----|-------|--------|-------------------|
| `characters` | 🏴‍☠️ | Personajes | 40 |
| `arcs` | ⚔️ | Arcos | 30 |
| `devilfruits` | 🍎 | Frutas del Diablo | 35 |
| `bounties` | 💰 | Bounties | 25 |
| `grandline` | 🌊 | Grand Line | 20 |

## Ranks (config/ranks.ts — igual que nakama-words)

Cabin Boy → Sailor → Pirate → First Mate → Captain → Warlord → Emperor → Pirate King

## Orden de implementación

1. Scaffolding + tailwind config
2. Tipos compartidos (types.ts)
3. Data: questions/ + devilfruits.ts
4. Engine: QuestionEngine.ts
5. Stores: gameStore, profileStore, settingsStore, claudeStore
6. Screens: Start → Hub → Game → Result → Ranking → DevilFruit
7. Components: QuestionCard, OptionsGrid, TimerRing, StreakBanner, BerryCounter
8. Claude integration en claudeStore
9. Efectos de sonido (opcional)
10. Polish visual + animaciones

## Notas

- El juego funciona 100% offline con las preguntas locales
- La API key mejora la experiencia pero no es requerida
- Nunca commitear .env
- Preguntas en español
