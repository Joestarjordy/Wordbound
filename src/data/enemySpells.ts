import { Enemy } from '../types/game';

export type EnemySpellSchool =
  | 'fire'
  | 'void'
  | 'runic'
  | 'necrotic'
  | 'toxic'
  | 'nature'
  | 'solar';

export type EnemySpellShape =
  | 'fireball'
  | 'orb'
  | 'bolt'
  | 'spores'
  | 'wisp'
  | 'wave';

export interface EnemySpellConfig {
  school: EnemySpellSchool;
  label: string;
  primary: string;
  secondary: string;
  core: string;
  shape: EnemySpellShape;
  isBossScale?: boolean;
}

/**
 * Only enemies and bosses with innate magic, elemental, or arcane abilities
 * are listed here. Physical melee enemies (goblin, bandit, skeleton, wolf,
 * harpy, mimic, boss_ogre) intentionally remain melee-only.
 */
export const ENEMY_SPELLS: Partial<Record<Enemy['spriteType'], EnemySpellConfig>> = {
  // --- Magic Common Enemies ---
  slime: {
    school: 'toxic',
    label: 'Acid Glob',
    primary: '#7e22ce',
    secondary: '#c084fc',
    core: '#f3e8ff',
    shape: 'spores',
  },
  golem: {
    school: 'runic',
    label: 'Runic Bolt',
    primary: '#0284c7',
    secondary: '#38bdf8',
    core: '#e0f2fe',
    shape: 'bolt',
  },
  mushroom: {
    school: 'toxic',
    label: 'Spore Cloud',
    primary: '#4d7c0f',
    secondary: '#a3e635',
    core: '#ecfccb',
    shape: 'spores',
  },
  imp: {
    school: 'fire',
    label: 'Cinder Bolt',
    primary: '#dc2626',
    secondary: '#f97316',
    core: '#fef08a',
    shape: 'fireball',
  },
  wraith: {
    school: 'necrotic',
    label: 'Soul Wisp',
    primary: '#0f766e',
    secondary: '#2dd4bf',
    core: '#ccfbf1',
    shape: 'wisp',
  },
  drake: {
    school: 'fire',
    label: 'Magma Breath',
    primary: '#c2410c',
    secondary: '#fb923c',
    core: '#fef08a',
    shape: 'fireball',
  },
  cultist: {
    school: 'void',
    label: 'Void Orb',
    primary: '#7e22ce',
    secondary: '#e879f9',
    core: '#fae8ff',
    shape: 'orb',
  },

  // --- Magic Stage Bosses ---
  boss_treant: {
    school: 'nature',
    label: 'Bramble Pulse',
    primary: '#15803d',
    secondary: '#4ade80',
    core: '#fef08a',
    shape: 'spores',
    isBossScale: true,
  },
  boss_lich: {
    school: 'necrotic',
    label: 'Phylactery Blast',
    primary: '#0f766e',
    secondary: '#2dd4bf',
    core: '#ccfbf1',
    shape: 'wisp',
    isBossScale: true,
  },
  boss_dragon: {
    school: 'fire',
    label: 'Dragonfire Surge',
    primary: '#b91c1c',
    secondary: '#f97316',
    core: '#fef08a',
    shape: 'fireball',
    isBossScale: true,
  },
  boss_titan: {
    school: 'runic',
    label: 'Monolith Arc',
    primary: '#0369a1',
    secondary: '#38bdf8',
    core: '#e0f2fe',
    shape: 'bolt',
    isBossScale: true,
  },
  boss_deathknight: {
    school: 'void',
    label: 'Soulwave Slash',
    primary: '#4c1d95',
    secondary: '#a855f7',
    core: '#f3e8ff',
    shape: 'wave',
    isBossScale: true,
  },
  boss_wyrm: {
    school: 'runic',
    label: 'Astral Comet',
    primary: '#1e3a8a',
    secondary: '#06b6d4',
    core: '#cffafe',
    shape: 'bolt',
    isBossScale: true,
  },
  boss_phoenix: {
    school: 'solar',
    label: 'Solar Flare',
    primary: '#ea580c',
    secondary: '#facc15',
    core: '#ffffff',
    shape: 'fireball',
    isBossScale: true,
  },
  boss_overlord: {
    school: 'void',
    label: 'Lexicon Nova',
    primary: '#be123c',
    secondary: '#fbbf24',
    core: '#fff1f2',
    shape: 'orb',
    isBossScale: true,
  },
};

export function getEnemySpell(spriteType: Enemy['spriteType']): EnemySpellConfig | null {
  return ENEMY_SPELLS[spriteType] ?? null;
}
