import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProfileStore } from '../store/profileStore'
import { useGameStore } from '../store/gameStore'
import { getRankForBerries } from '../utils/rankHelpers'

const AVATARS = ['🏴‍☠️', '☠️', '🦜', '⚓', '🌊', '🗡️', '🔥', '⚡', '🐉', '💀']

export function StartScreen() {
  const { profiles, createProfile, setActiveProfile, activeProfileId } = useProfileStore()
  const { setPhase } = useGameStore()
  const [selectedId, setSelectedId] = useState(activeProfileId ?? profiles[0]?.id ?? null)
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('🏴‍☠️')

  const handleCreate = () => {
    if (!name.trim()) return
    createProfile(name.trim(), avatar)
    setShowCreate(false)
    setName('')
  }

  const handleSail = () => {
    if (!selectedId) return
    setActiveProfile(selectedId)
    setPhase('hub')
  }

  return (
    <div className="h-dvh flex flex-col bg-op-navy bg-ocean-pattern overflow-hidden">
      {/* Header */}
      <div className="text-center pt-10 pb-4 px-6">
        <div className="font-pirata text-5xl text-op-gold text-shadow-gold mb-1">☠️ One Piece</div>
        <div className="font-pirata text-3xl text-op-cream mb-1">Trivia</div>
        <div className="text-op-parchment text-xs font-mono uppercase tracking-widest">Grand Line Edition</div>
      </div>

      {/* Profile list */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
        {profiles.map(p => {
          const rank = getRankForBerries(p.berries)
          const isSelected = p.id === selectedId
          return (
            <motion.div
              key={p.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedId(p.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-op-gold bg-op-gold/10'
                  : 'border-white/10 bg-op-ocean'
              }`}
            >
              <span className="text-3xl">{p.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="font-pirata text-op-cream text-lg truncate">{p.name}</div>
                <div className="text-op-parchment text-xs font-mono">
                  {rank.emoji} {rank.label} · {p.berries.toLocaleString()} 🍇
                </div>
              </div>
              {isSelected && <div className="text-op-gold text-xl">✓</div>}
            </motion.div>
          )
        })}

        {/* Create new */}
        <AnimatePresence>
          {showCreate ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl border border-op-gold/30 bg-op-ocean space-y-3"
            >
              <div className="flex flex-wrap gap-2 justify-center">
                {AVATARS.map(a => (
                  <button
                    key={a}
                    onClick={() => setAvatar(a)}
                    className={`text-2xl p-1.5 rounded-lg transition-all ${a === avatar ? 'bg-op-gold/20 scale-110' : 'hover:bg-white/5'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                placeholder="Nombre del pirata..."
                maxLength={16}
                className="w-full bg-op-deep border border-white/10 rounded-lg px-4 py-3 text-op-cream font-pirata text-lg placeholder-op-parchment/40 focus:outline-none focus:border-op-gold/50"
              />
              <div className="flex gap-2">
                <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 border border-white/10 rounded-lg text-op-parchment text-sm font-mono hover:bg-white/5 transition-colors">
                  Cancelar
                </button>
                <button onClick={handleCreate} disabled={!name.trim()} className="flex-1 py-2.5 bg-op-gold text-op-deep font-pirata text-lg rounded-lg hover:bg-op-gold-dim transition-colors disabled:opacity-30">
                  ¡Zarpar!
                </button>
              </div>
            </motion.div>
          ) : (
            <button
              onClick={() => setShowCreate(true)}
              className="w-full p-4 rounded-xl border border-dashed border-white/20 text-op-parchment hover:border-op-gold/40 hover:text-op-gold transition-colors text-sm font-mono"
            >
              + Nuevo pirata
            </button>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="p-4 space-y-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSail}
          disabled={!selectedId}
          className="w-full py-4 bg-op-gold text-op-deep font-pirata text-2xl rounded-xl shadow-lg hover:bg-op-gold-dim transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ⚓ ¡Al Grand Line!
        </motion.button>
      </div>
    </div>
  )
}
