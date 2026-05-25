import { Category } from '../types'

export const CATEGORIES: Category[] = [
  {
    id: 'characters',
    emoji: '🏴‍☠️',
    name: 'Characters',
    description: 'Nakama, marines, villains and emperors',
    unlockedAt: 0,
    color: 'bg-op-red/20 hover:bg-op-red/30',
    borderColor: 'border-op-red/40',
  },
  {
    id: 'devilfruits',
    emoji: '🍎',
    name: 'Devil Fruits',
    description: 'Types, powers and users',
    unlockedAt: 0,
    color: 'bg-purple-900/20 hover:bg-purple-900/30',
    borderColor: 'border-purple-500/40',
  },
  {
    id: 'arcs',
    emoji: '⚔️',
    name: 'Story Arcs',
    description: 'The great arcs of the story',
    unlockedAt: 500,
    color: 'bg-op-cyan/10 hover:bg-op-cyan/20',
    borderColor: 'border-op-cyan/40',
  },
  {
    id: 'bounties',
    emoji: '💰',
    name: 'Bounties',
    description: 'The biggest bounties in the pirate world',
    unlockedAt: 1500,
    color: 'bg-op-gold/10 hover:bg-op-gold/20',
    borderColor: 'border-op-gold/40',
  },
  {
    id: 'grandline',
    emoji: '🌊',
    name: 'Grand Line',
    description: 'Islands, geography and secrets of the most dangerous sea',
    unlockedAt: 3500,
    color: 'bg-op-cyan/10 hover:bg-op-cyan/20',
    borderColor: 'border-blue-500/40',
  },
]

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map(c => [c.id, c])
) as Record<string, Category>
