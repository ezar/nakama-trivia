export interface Rank {
  rank: number
  label: string
  berries: number
  emoji: string
}

export const RANKS: Rank[] = [
  { rank: 1, label: 'Cabin Boy',   berries: 0,      emoji: '⚓' },
  { rank: 2, label: 'Sailor',      berries: 500,    emoji: '🌊' },
  { rank: 3, label: 'Pirate',      berries: 1500,   emoji: '🏴‍☠️' },
  { rank: 4, label: 'First Mate',  berries: 3500,   emoji: '⚔️' },
  { rank: 5, label: 'Captain',     berries: 7000,   emoji: '☠️' },
  { rank: 6, label: 'Warlord',     berries: 15000,  emoji: '👑' },
  { rank: 7, label: 'Emperor',     berries: 30000,  emoji: '🔥' },
  { rank: 8, label: 'Pirate King', berries: 60000,  emoji: '💎' },
]
