import { Enemy } from '../types/game';

/**
 * Base combat display size (in px at 1.0x stage scale) for every enemy and boss,
 * calibrated against the armored Knight (`KNIGHT_BASE_COMBAT_SIZE = 114`, visible
 * standing height ~83px) so small creatures stay compact, humanoids match the Knight,
 * heavy monsters loom larger, and colossal bosses truly tower over the battlefield.
 */
export const KNIGHT_BASE_COMBAT_SIZE = 114;
export const KNIGHT_BASE_EXPLORE_SIZE = 136;

export const ENEMY_BASE_COMBAT_SIZE: Record<Enemy['spriteType'], number> = {
  // Small / squat monsters (shorter than the Knight)
  slime: 82,
  imp: 88,
  mimic: 88,
  goblin: 90,
  mushroom: 92,
  wolf: 96,

  // Humanoid / eye-level combatants (matching the Knight's stature)
  bandit: 106,
  skeleton: 108,
  harpy: 112,
  cultist: 112,
  wraith: 116,

  // Large heavy common monsters (clearly larger than humanoids)
  golem: 134,
  drake: 138,

  // Boss Warlords & Undead Sovereigns (~1.45x - 1.65x Knight height)
  boss_lich: 152,
  boss_deathknight: 156,
  boss_overlord: 164,
  boss_ogre: 166,

  // Colossal Mythic Bosses (~1.75x - 1.95x Knight height)
  boss_phoenix: 172,
  boss_treant: 180,
  boss_wyrm: 182,
  boss_titan: 186,
  boss_dragon: 190,
};

export function getEnemyBaseSize(spriteType: Enemy['spriteType']): number {
  return ENEMY_BASE_COMBAT_SIZE[spriteType];
}

export function getEnemyDisplaySize(
  spriteType: Enemy['spriteType'],
  inCombat: boolean,
  sceneScale: number
): number {
  const base = ENEMY_BASE_COMBAT_SIZE[spriteType];
  const exploreBoost = inCombat ? 1 : 1.08;
  return Math.round(base * exploreBoost * sceneScale);
}
