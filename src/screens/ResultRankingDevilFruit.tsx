import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { useProfileStore } from '../store/profileStore'
import { ACHIEVEMENTS } from '../config/achievements'
import { DEVIL_FRUITS } from '../data/devilfruits'
import { getRankForBerries } from '../utils/rankHelpers'
import { CATEGORIES } from '../config/categories'
import { CategoryId, DevilFruitType } from '../types'
import { useState } from 'react'

// ─── ResultScreen ──────────────────────────────────────────────────────────────
export function ResultScreen() {
  const { lastResult, newAchievements, currentCategoryId, setPhase, startRound } = useGameStore()
  const profile = useProfileStore(s => s.getActiveProfile())
  const { buildRound: _ } = { buildRound: null }

  if (!lastResult || !profile) return null

  const { score, berriesEarned, maxStreak, correctCount, wrongCount, totalQuestions, perfectBonus, newlyUnlockedCategories } = lastResult
  const perfect = wrongCount === 0 && totalQuestions > 0

  return (
    <div className="h-dvh flex flex-col bg-op-navy bg-ocean-pattern overflow-y-auto">
      <div className="flex-1 px-4 pt-8 pb-4 space-y-5">
        {/* Header */}
        <div className="text-center">
          <div className="font-pirata text-4xl text-op-gold mb-1">
            {perfect ? '💎 ¡Perfecto!' : correctCount > wrongCount ? '⚡ ¡Bien hecho!' : '☠️ Sigue entrenando'}
          </div>
          <div className="text-op-parchment font-mono text-sm">
            {currentCategoryId ? CATEGORIES.find(c => c.id === currentCategoryId)?.name : ''}
          </div>
        </div>

        {/* Score card */}
        <div className="bg-op-ocean border border-op-gold/20 rounded-2xl p-5 space-y-4">
          <div className="flex justify-between">
            <div className="text-center flex-1">
              <div className="font-pirata text-op-gold text-3xl">{score.toLocaleString()}</div>
              <div className="text-op-parchment text-xs font-mono">puntos</div>
            </div>
            <div className="text-center flex-1">
              <div className="font-pirata text-op-cream text-3xl">+{berriesEarned.toLocaleString()}</div>
              <div className="text-op-parchment text-xs font-mono">🍇 berries</div>
            </div>
            <div className="text-center flex-1">
              <div className="font-pirata text-op-cyan text-3xl">×{maxStreak}</div>
              <div className="text-op-parchment text-xs font-mono">racha máx.</div>
            </div>
          </div>

          <div className="flex justify-between text-center">
            <div className="flex-1">
              <div className="text-op-green font-pirata text-2xl">{correctCount}</div>
              <div className="text-op-parchment text-xs">✓ correctas</div>
            </div>
            <div className="flex-1">
              <div className="text-op-red font-pirata text-2xl">{wrongCount}</div>
              <div className="text-op-parchment text-xs">✗ errores</div>
            </div>
            {perfectBonus > 0 && (
              <div className="flex-1">
                <div className="text-op-gold font-pirata text-2xl">+{perfectBonus}</div>
                <div className="text-op-parchment text-xs">bonus perfecto</div>
              </div>
            )}
          </div>
        </div>

        {/* Newly unlocked */}
        {newlyUnlockedCategories.length > 0 && (
          <div className="bg-op-gold/10 border border-op-gold/30 rounded-xl p-4">
            <div className="font-pirata text-op-gold text-lg mb-2">🔓 ¡Nueva ruta desbloqueada!</div>
            {newlyUnlockedCategories.map(catId => {
              const cat = CATEGORIES.find(c => c.id === catId)
              return cat ? (
                <div key={catId} className="text-op-cream font-body">{cat.emoji} {cat.name}</div>
              ) : null
            })}
          </div>
        )}

        {/* New achievements */}
        {newAchievements.length > 0 && (
          <div className="space-y-2">
            <div className="text-op-parchment text-xs font-mono uppercase tracking-widest">Logros desbloqueados</div>
            {newAchievements.map(id => {
              const ach = ACHIEVEMENTS.find(a => a.id === id)
              return ach ? (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-3 bg-op-ocean border border-op-gold/20 rounded-xl"
                >
                  <span className="text-2xl">{ach.emoji}</span>
                  <div>
                    <div className="font-pirata text-op-gold text-lg">{ach.name}</div>
                    <div className="text-op-parchment text-xs">{ach.description}</div>
                  </div>
                </motion.div>
              ) : null
            })}
          </div>
        )}

        {/* Profile berries */}
        <div className="text-center text-op-parchment font-mono text-sm">
          Total: <span className="text-op-gold font-pirata text-lg">{profile.berries.toLocaleString()}</span> 🍇
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-6 space-y-2">
        {currentCategoryId && (
          <button
            onClick={() => {
              const { buildRound } = require('../engine/QuestionEngine')
              startRound(currentCategoryId, buildRound(currentCategoryId, profile))
            }}
            className="w-full py-4 bg-op-gold text-op-deep font-pirata text-2xl rounded-xl hover:bg-op-gold-dim transition-colors"
          >
            ⚓ Otra ronda
          </button>
        )}
        <button
          onClick={() => setPhase('hub')}
          className="w-full py-3 border border-white/10 text-op-parchment font-pirata text-xl rounded-xl hover:bg-op-ocean transition-colors"
        >
          Elegir categoría
        </button>
      </div>
    </div>
  )
}

// ─── RankingScreen ─────────────────────────────────────────────────────────────
export function RankingScreen() {
  const { setPhase } = useGameStore()
  const { profiles } = useProfileStore()
  const sorted = [...profiles].sort((a, b) => b.berries - a.berries)

  return (
    <div className="h-dvh flex flex-col bg-op-navy bg-ocean-pattern">
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="font-pirata text-op-gold text-3xl">🏆 Ranking</div>
          <button onClick={() => setPhase('hub')} className="text-op-parchment hover:text-op-cream font-mono text-sm">← Volver</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
        {sorted.map((p, i) => {
          const rank = getRankForBerries(p.berries)
          return (
            <div key={p.id} className={`flex items-center gap-3 p-4 rounded-xl border ${
              i === 0 ? 'border-op-gold bg-op-gold/10' : 'border-white/5 bg-op-ocean'
            }`}>
              <div className="font-pirata text-2xl text-op-parchment/60 w-8 text-center">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`}
              </div>
              <span className="text-2xl">{p.avatar}</span>
              <div className="flex-1">
                <div className="font-pirata text-op-cream text-lg">{p.name}</div>
                <div className="text-op-parchment text-xs font-mono">{rank.emoji} {rank.label}</div>
              </div>
              <div className="text-right">
                <div className="font-pirata text-op-gold text-lg">{p.berries.toLocaleString()}</div>
                <div className="text-op-parchment text-xs font-mono">🍇</div>
              </div>
            </div>
          )
        })}

        {sorted.length === 0 && (
          <div className="text-center text-op-parchment/40 font-mono pt-20">
            Aún no hay piratas registrados
          </div>
        )}
      </div>
    </div>
  )
}

// ─── DevilFruitScreen ──────────────────────────────────────────────────────────
export function DevilFruitScreen() {
  const { setPhase } = useGameStore()
  const [filter, setFilter] = useState<DevilFruitType | 'all'>('all')
  const [search, setSearch] = useState('')

  const filtered = DEVIL_FRUITS.filter(f => {
    const matchType = filter === 'all' || f.type === filter
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.user.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  const TYPE_COLORS: Record<DevilFruitType, string> = {
    Logia: 'text-op-gold border-op-gold/40 bg-op-gold/10',
    Zoan: 'text-op-green border-op-green/40 bg-op-green/10',
    Paramecia: 'text-op-cyan border-op-cyan/40 bg-op-cyan/10',
  }

  return (
    <div className="h-dvh flex flex-col bg-op-navy bg-ocean-pattern">
      <div className="px-4 pt-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="font-pirata text-op-gold text-3xl">🍎 Frutas del Diablo</div>
          <button onClick={() => setPhase('hub')} className="text-op-parchment hover:text-op-cream font-mono text-sm">← Volver</button>
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar fruta o usuario..."
          className="w-full bg-op-ocean border border-white/10 rounded-xl px-4 py-2.5 text-op-cream font-body text-sm placeholder-op-parchment/40 focus:outline-none focus:border-op-gold/40 mb-3"
        />

        {/* Type filter */}
        <div className="flex gap-2">
          {(['all', 'Paramecia', 'Zoan', 'Logia'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                filter === t
                  ? t === 'all' ? 'bg-white/10 border-white/20 text-op-cream' : TYPE_COLORS[t as DevilFruitType]
                  : 'border-white/5 text-op-parchment/50 hover:border-white/10'
              }`}
            >
              {t === 'all' ? 'Todas' : t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-6">
        {filtered.map(fruit => (
          <div key={fruit.id} className="p-4 rounded-xl border border-white/5 bg-op-ocean space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-pirata text-op-cream text-lg leading-tight">
                  {fruit.emoji} {fruit.name}
                </div>
                <div className="text-op-parchment text-xs font-mono">Usuario: {fruit.user}</div>
              </div>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border flex-shrink-0 ${TYPE_COLORS[fruit.type]}`}>
                {fruit.type}
              </span>
            </div>
            <div className="text-op-parchment/80 text-sm">{fruit.power}</div>
            <div className="text-op-parchment/40 text-xs font-mono">Arco: {fruit.arc}</div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center text-op-parchment/40 font-mono pt-20">
            No se encontraron frutas
          </div>
        )}
      </div>
    </div>
  )
}
