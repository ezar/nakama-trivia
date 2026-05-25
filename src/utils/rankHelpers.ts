import { RANKS, Rank } from '../config/ranks'

export function getRankForBerries(berries: number): Rank {
  return [...RANKS].reverse().find(r => berries >= r.berries) ?? RANKS[0]!
}

export function getNextRank(berries: number): Rank | null {
  return RANKS.find(r => r.berries > berries) ?? null
}

export function getRankProgress(berries: number): number {
  const current = getRankForBerries(berries)
  const next = getNextRank(berries)
  if (!next) return 1
  const range = next.berries - current.berries
  const progress = berries - current.berries
  return Math.min(progress / range, 1)
}
