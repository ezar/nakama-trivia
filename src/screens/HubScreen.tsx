import { motion } from 'framer-motion'
import { useProfileStore } from '../store/profileStore'
import { useGameStore } from '../store/gameStore'
import { useClaudeStore } from '../store/claudeStore'
import { CATEGORIES } from '../config/categories'
import { getRankForBerries, getNextRank, getRankProgress } from '../utils/rankHelpers'
import { buildRound } from '../engine/QuestionEngine'
import { CategoryId } from '../types'

export function HubScreen() {
  const profile = useProfileStore(s => s.getActiveProfile())
  const { startRound, setPhase, setGameMode, gameMode } = useGameStore()
  const { prefetch } = useClaudeStore()

  if (!profile) return null

  const rank = getRankForBerries(profile.berries)
  const nextRank = getNextRank(profile.berries)
  const progress = getRankProgress(profile.berries)

  const handleSelectCategory = async (categoryId: CategoryId) => {
    if (!profile.unlockedCategories.includes(categoryId)) return

    // Prefetch Claude questions in background
    prefetch(categoryId, 2, profile).catch(() => {})

    const localQuestions = buildRound(categoryId, profile)
    startRound(categoryId, localQuestions)
  }

  return (
    <div className="h-dvh flex flex-col bg-op-navy bg-ocean-pattern overflow-hidden">
      {/* Top bar */}
      <div className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{profile.avatar}</span>
            <div>
              <div className="font-pirata text-op-cream text-lg leading-tight">{profile.name}</div>
              <div className="text-op-parchment text-xs font-mono">{rank.emoji} {rank.label}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-pirata text-op-gold text-xl">{profile.berries.toLocaleString()}</div>
            <div className="text-op-parchment text-xs font-mono">berries 🍇</div>
          </div>
        </div>

        {/* Rank progress bar */}
        {nextRank && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono text-op-parchment/60">
              <span>{rank.label}</span>
              <span>{nextRank.label} — {nextRank.berries.toLocaleString()} 🍇</span>
            </div>
            <div className="h-1.5 bg-op-deep rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-op-gold rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Game mode toggle */}
      <div className="px-4 mb-3">
        <div className="flex gap-2 p-1 bg-op-ocean rounded-xl border border-white/5">
          {(['normal', 'survival'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setGameMode(mode)}
              className={`flex-1 py-2 rounded-lg text-sm font-mono transition-all ${
                gameMode === mode
                  ? 'bg-op-gold text-op-deep font-bold'
                  : 'text-op-parchment hover:text-op-cream'
              }`}
            >
              {mode === 'normal' ? '🌊 Normal' : '☠️ Survival'}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-4">
        <div className="text-op-parchment text-xs font-mono uppercase tracking-widest mb-2">
          — Choose your route —
        </div>

        {CATEGORIES.map((cat, i) => {
          const unlocked = profile.unlockedCategories.includes(cat.id)
          const stats = profile.categoryStats[cat.id]
          const accuracy = stats && stats.correct + stats.wrong > 0
            ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)
            : null

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: unlocked ? 0.97 : 1 }}
              onClick={() => handleSelectCategory(cat.id as CategoryId)}
              disabled={!unlocked}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                unlocked
                  ? `${cat.color} ${cat.borderColor} cursor-pointer`
                  : 'border-white/5 bg-op-deep/50 cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-pirata text-op-cream text-xl">{cat.name}</div>
                  <div className="text-op-parchment text-xs">{cat.description}</div>
                </div>
                {unlocked ? (
                  accuracy !== null ? (
                    <div className="text-right">
                      <div className="font-mono text-op-gold text-lg font-bold">{accuracy}%</div>
                      <div className="text-op-parchment text-xs">{stats!.correct + stats!.wrong} rounds</div>
                    </div>
                  ) : (
                    <div className="text-op-parchment/40 text-2xl">›</div>
                  )
                ) : (
                  <div className="text-op-parchment/40 text-xs font-mono">🔒 {cat.unlockedAt.toLocaleString()} 🍇</div>
                )}
              </div>
            </motion.button>
          )
        })}

        {/* Devil Fruit Encyclopedia */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: CATEGORIES.length * 0.07 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setPhase('devilfruit')}
          className="w-full p-4 rounded-xl border border-purple-500/30 bg-purple-900/10 hover:bg-purple-900/20 text-left cursor-pointer transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">📖</span>
            <div>
              <div className="font-pirata text-op-cream text-xl">Devil Fruit Encyclopedia</div>
              <div className="text-op-parchment text-xs">All Devil Fruits</div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Bottom nav */}
      <div className="flex border-t border-white/5 bg-op-ocean/80">
        <button onClick={() => setPhase('ranking')} className="flex-1 py-3 text-center text-op-parchment hover:text-op-gold transition-colors text-xl">
          🏆
        </button>
        <button onClick={() => setPhase('start')} className="flex-1 py-3 text-center text-op-parchment hover:text-op-gold transition-colors text-xl">
          👤
        </button>
      </div>
    </div>
  )
}
