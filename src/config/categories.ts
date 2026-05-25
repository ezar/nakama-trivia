import { Category } from '../types'

export const CATEGORIES: Category[] = [
  {
    id: 'characters',
    emoji: '🏴‍☠️',
    name: 'Personajes',
    description: 'Nakama, marines, villanos y emperadores',
    unlockedAt: 0,
    color: 'bg-op-red/20 hover:bg-op-red/30',
    borderColor: 'border-op-red/40',
  },
  {
    id: 'devilfruits',
    emoji: '🍎',
    name: 'Frutas del Diablo',
    description: 'Tipos, poderes y usuarios',
    unlockedAt: 0,
    color: 'bg-purple-900/20 hover:bg-purple-900/30',
    borderColor: 'border-purple-500/40',
  },
  {
    id: 'arcs',
    emoji: '⚔️',
    name: 'Arcos',
    description: 'Los grandes arcos de la historia',
    unlockedAt: 500,
    color: 'bg-op-cyan/10 hover:bg-op-cyan/20',
    borderColor: 'border-op-cyan/40',
  },
  {
    id: 'bounties',
    emoji: '💰',
    name: 'Bounties',
    description: 'Las recompensas más grandes del mundo pirata',
    unlockedAt: 1500,
    color: 'bg-op-gold/10 hover:bg-op-gold/20',
    borderColor: 'border-op-gold/40',
  },
  {
    id: 'grandline',
    emoji: '🌊',
    name: 'Grand Line',
    description: 'Islas, geografía y secretos del mar más peligroso',
    unlockedAt: 3500,
    color: 'bg-op-cyan/10 hover:bg-op-cyan/20',
    borderColor: 'border-blue-500/40',
  },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
) as Record<string, Category>
