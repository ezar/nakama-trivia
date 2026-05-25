export type Locale = 'en' | 'es'

const en = {
  // ── Start ────────────────────────────────────────────────────────
  start: {
    subtitle: 'Grand Line Edition',
    pirateName: 'Pirate name...',
    cancel: 'Cancel',
    setSail: 'Set Sail!',
    newPirate: '+ New pirate',
    cta: '⚓ To the Grand Line!',
  },
  // ── Hub ─────────────────────────────────────────────────────────
  hub: {
    berries: 'berries 🍇',
    normal: '🌊 Normal',
    survival: '☠️ Survival',
    chooseRoute: '— Choose your route —',
    rounds: 'rounds',
    encyclopediaTitle: 'Devil Fruit Encyclopedia',
    encyclopediaSub: 'All Devil Fruits',
  },
  // ── Game ────────────────────────────────────────────────────────
  game: {
    pts: 'pts',
    loadingExplanation: 'Loading explanation...',
  },
  // ── Result ──────────────────────────────────────────────────────
  result: {
    perfect: '💎 Perfect!',
    wellDone: '⚡ Well done!',
    keepTraining: '☠️ Keep training',
    points: 'points',
    berries: '🍇 Berries',
    maxStreak: 'max streak',
    correct: '✓ correct',
    wrong: '✗ wrong',
    perfectBonus: 'perfect bonus',
    newRoute: '🔓 New route unlocked!',
    achievements: 'Achievements unlocked',
    total: 'Total:',
    playAgain: '⚓ Play Again',
    chooseCategory: 'Choose Category',
  },
  // ── Ranking ─────────────────────────────────────────────────────
  ranking: {
    title: '🏆 Rankings',
    back: '← Back',
    empty: 'No pirates registered yet',
  },
  // ── Devil Fruits ────────────────────────────────────────────────
  devilFruits: {
    title: '🍎 Devil Fruits',
    back: '← Back',
    searchPlaceholder: 'Search fruit or user...',
    all: 'All',
    user: 'User:',
    arc: 'Arc:',
    noResults: 'No fruits found',
  },
  // ── Categories ──────────────────────────────────────────────────
  categories: {
    characters:  { name: 'Characters',  description: 'Nakama, marines, villains and emperors' },
    devilfruits: { name: 'Devil Fruits', description: 'Types, powers and users' },
    arcs:        { name: 'Story Arcs',   description: 'The great arcs of the story' },
    bounties:    { name: 'Bounties',     description: 'The biggest bounties in the pirate world' },
    grandline:   { name: 'Grand Line',   description: 'Islands, geography and secrets of the most dangerous sea' },
  },
  // ── Achievements ────────────────────────────────────────────────
  achievements: {
    first_correct:     { name: 'First Strike',           description: 'First correct answer' },
    streak_3:          { name: 'On Fire!',                description: '3 correct answers in a row' },
    streak_5:          { name: 'Gear Second!',            description: '5 correct answers in a row' },
    streak_10:         { name: 'Gear Third — Legendary!', description: '10 correct answers in a row' },
    perfect_round:     { name: 'Perfect Nakama',          description: 'A complete round without any mistakes' },
    all_categories:    { name: 'Grand Explorer',          description: 'Play all categories' },
    berry_1000:        { name: 'Berry Hunter',            description: '1,000 berries collected' },
    berry_10000:       { name: 'Grand Line',              description: '10,000 berries collected' },
    devilfruit_master: { name: 'Fruit Master',            description: 'Complete the Devil Fruit quiz' },
  },
  // ── Ranks ────────────────────────────────────────────────────────
  ranks: {
    'Cabin Boy':   'Cabin Boy',
    'Sailor':      'Sailor',
    'Pirate':      'Pirate',
    'First Mate':  'First Mate',
    'Captain':     'Captain',
    'Warlord':     'Warlord',
    'Emperor':     'Emperor',
    'Pirate King': 'Pirate King',
  } as Record<string, string>,
}

const es: typeof en = {
  start: {
    subtitle: 'Edición Grand Line',
    pirateName: 'Nombre del pirata...',
    cancel: 'Cancelar',
    setSail: '¡Zarpar!',
    newPirate: '+ Nuevo pirata',
    cta: '⚓ ¡Al Grand Line!',
  },
  hub: {
    berries: 'berries 🍇',
    normal: '🌊 Normal',
    survival: '☠️ Supervivencia',
    chooseRoute: '— Elige tu ruta —',
    rounds: 'partidas',
    encyclopediaTitle: 'Enciclopedia de Frutas',
    encyclopediaSub: 'Todas las Frutas del Diablo',
  },
  game: {
    pts: 'pts',
    loadingExplanation: 'Cargando explicación...',
  },
  result: {
    perfect: '💎 ¡Perfecto!',
    wellDone: '⚡ ¡Bien hecho!',
    keepTraining: '☠️ Sigue entrenando',
    points: 'puntos',
    berries: '🍇 berries',
    maxStreak: 'racha máx.',
    correct: '✓ correctas',
    wrong: '✗ errores',
    perfectBonus: 'bonus perfecto',
    newRoute: '🔓 ¡Nueva ruta desbloqueada!',
    achievements: 'Logros desbloqueados',
    total: 'Total:',
    playAgain: '⚓ Otra ronda',
    chooseCategory: 'Elegir categoría',
  },
  ranking: {
    title: '🏆 Ranking',
    back: '← Volver',
    empty: 'Aún no hay piratas registrados',
  },
  devilFruits: {
    title: '🍎 Frutas del Diablo',
    back: '← Volver',
    searchPlaceholder: 'Buscar fruta o usuario...',
    all: 'Todas',
    user: 'Usuario:',
    arc: 'Arco:',
    noResults: 'No se encontraron frutas',
  },
  categories: {
    characters:  { name: 'Personajes',        description: 'Nakama, marines, villanos y emperadores' },
    devilfruits: { name: 'Frutas del Diablo',  description: 'Tipos, poderes y usuarios' },
    arcs:        { name: 'Arcos',              description: 'Los grandes arcos de la historia' },
    bounties:    { name: 'Bounties',           description: 'Las recompensas más grandes del mundo pirata' },
    grandline:   { name: 'Grand Line',         description: 'Islas, geografía y secretos del mar más peligroso' },
  },
  achievements: {
    first_correct:     { name: 'Primer Golpe',            description: 'Primera respuesta correcta' },
    streak_3:          { name: 'On Fire!',                 description: 'Racha de 3 respuestas correctas' },
    streak_5:          { name: 'Gear Second!',             description: 'Racha de 5 respuestas correctas' },
    streak_10:         { name: 'Gear Third — ¡Legendario!', description: 'Racha de 10 respuestas correctas' },
    perfect_round:     { name: 'Nakama Perfecto',          description: 'Una ronda completa sin errores' },
    all_categories:    { name: 'Gran Explorador',          description: 'Jugar todas las categorías' },
    berry_1000:        { name: 'Cazador de Berries',       description: '1,000 berries acumulados' },
    berry_10000:       { name: 'Gran Línea',               description: '10,000 berries acumulados' },
    devilfruit_master: { name: 'Maestro de Frutas',        description: 'Completar el quiz de Frutas del Diablo' },
  },
  ranks: {
    'Cabin Boy':   'Grumete',
    'Sailor':      'Marinero',
    'Pirate':      'Pirata',
    'First Mate':  'Primer Oficial',
    'Captain':     'Capitán',
    'Warlord':     'Corsario',
    'Emperor':     'Emperador',
    'Pirate King': 'Rey de los Piratas',
  },
}

export const translations: Record<Locale, typeof en> = { en, es }
