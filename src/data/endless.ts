import { DifficultyLevel, Enemy, Stage } from '../types/game';
import { BOSS_ENEMIES, COMMON_ENEMIES } from './enemies';

interface EndlessRealmTheme {
  name: string;
  biome: Stage['biome'];
  description: string;
  bgColors: Stage['bgColors'];
}

const ENDLESS_THEMES: EndlessRealmTheme[] = [
  {
    name: 'Endless Wilds',
    biome: 'forest',
    description: 'Boundless twilight woods where every cracked word extends your survival.',
    bgColors: {
      skyTop: '#071a2f',
      skyBottom: '#155e75',
      farMountain: '#102a43',
      midLandscape: '#14532d',
      ground: '#166534',
      path: '#713f12',
    },
  },
  {
    name: 'Endless Ruins',
    biome: 'ruins',
    description: 'Ancient cliffside battlements echoing with forgotten vocabulary.',
    bgColors: {
      skyTop: '#172554',
      skyBottom: '#3730a3',
      farMountain: '#1e293b',
      midLandscape: '#334155',
      ground: '#475569',
      path: '#57534e',
    },
  },
  {
    name: 'Endless Catacombs',
    biome: 'crypt',
    description: 'Restless subterranean vaults teeming with endless spectral challengers.',
    bgColors: {
      skyTop: '#020617',
      skyBottom: '#312e81',
      farMountain: '#111827',
      midLandscape: '#1e1b4b',
      ground: '#1e293b',
      path: '#334155',
    },
  },
  {
    name: 'Endless Caldera',
    biome: 'volcano',
    description: 'Molten obsidian trails testing how long your lexicon can withstand the heat.',
    bgColors: {
      skyTop: '#1c0505',
      skyBottom: '#991b1b',
      farMountain: '#7c2d12',
      midLandscape: '#b91c1c',
      ground: '#431407',
      path: '#c2410c',
    },
  },
  {
    name: 'Endless Astral Spire',
    biome: 'citadel',
    description: 'The infinite lexicon expanse—survive wave after wave for vocabulary mastery.',
    bgColors: {
      skyTop: '#09052f',
      skyBottom: '#4338ca',
      farMountain: '#4c1d95',
      midLandscape: '#7e22ce',
      ground: '#2e1065',
      path: '#c026d3',
    },
  },
];

const COMMON_LIST = Object.values(COMMON_ENEMIES);
const BOSS_LIST = Object.values(BOSS_ENEMIES);

const ENDLESS_TIER_PREFIXES: Record<DifficultyLevel, string[]> = {
  easy: ['Wandering', 'Nimble', 'Wild', 'Restless'],
  medium: ['Seasoned', 'Runic', 'Fierce', 'Arcane'],
  hard: ['Abyssal', 'Apex', 'Mythic', 'Eternal'],
};

export function generateEndlessEnemy(
  wave: number,
  difficulty: DifficultyLevel,
  previousSpriteType?: Enemy['spriteType']
): Enemy {
  const isBossWave = wave % 5 === 0;
  const pool = isBossWave ? BOSS_LIST : COMMON_LIST;
  const filtered = previousSpriteType
    ? pool.filter((e) => e.spriteType !== previousSpriteType)
    : pool;
  const candidates = filtered.length > 0 ? filtered : pool;
  const base = candidates[Math.floor(Math.random() * candidates.length)];

  const diffScale = difficulty === 'easy' ? 1.0 : difficulty === 'medium' ? 1.18 : 1.35;
  const waveBonus = Math.min(220, (wave - 1) * (isBossWave ? 12 : 7));
  const scaledHp = Math.round(base.maxHp * diffScale) + waveBonus;

  const prefixes = ENDLESS_TIER_PREFIXES[difficulty];
  const prefix =
    !isBossWave && wave >= 6
      ? `${prefixes[wave % prefixes.length]} `
      : '';

  return {
    ...base,
    id: `endless_${difficulty}_w${wave}_${base.id}`,
    name: `${prefix}${base.name}`,
    maxHp: scaledHp,
    pointMultiplier: Number((base.pointMultiplier + Math.min(2.0, wave * 0.04)).toFixed(2)),
  };
}

export function getEndlessBackdropStage(
  wave: number,
  difficulty: DifficultyLevel,
  activeEnemy: Enemy
): Stage {
  const themeIdx = Math.floor((Math.max(1, wave) - 1) / 3) % ENDLESS_THEMES.length;
  const theme = ENDLESS_THEMES[themeIdx];

  return {
    id: wave,
    name: `${theme.name} (${difficulty.toUpperCase()})`,
    biome: theme.biome,
    description: theme.description,
    bgColors: theme.bgColors,
    encounters: [activeEnemy],
  };
}
