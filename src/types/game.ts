export type CharacterGender = 'male' | 'female';
export type CharacterClass = 'knight';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface WordEntry {
  word: string; // 4 to 8 uppercase letters
  definition: string;
  partOfSpeech: string;
  example: string;
  difficulty: DifficultyLevel;
}

export interface CodexEntry extends WordEntry {
  unlockedAt: number;
  timesEncountered: number;
  timesSolved: number;
  fewestGuesses: number;
}

export interface PlayerStats {
  battlesWon: number;
  battlesLost: number;
  totalGuesses: number;
  bossDefeats: number;
  currentStreak: number;
  highestStreak: number;
}

export interface PlayerProfile {
  characterClass: CharacterClass;
  gender: CharacterGender;
  totalPoints: number;
  unlockedDifficulties: DifficultyLevel[];
  currentDifficulty: DifficultyLevel;
  stageProgress: Record<DifficultyLevel, { currentStage: number; maxStageReached: number }>;
  codex: Record<string, CodexEntry>;
  stats: PlayerStats;
  soundSettings: {
    bgmMuted: boolean;
    sfxMuted: boolean;
    volume: number;
  };
}

export type EnemyType = 'minion' | 'bandit' | 'boss';

export interface Enemy {
  id: string;
  name: string;
  title: string;
  type: EnemyType;
  maxHp: number;
  attack: number; // 50 damage for all enemies and bosses
  spriteType: 
    | 'goblin' 
    | 'bandit' 
    | 'skeleton' 
    | 'slime' 
    | 'golem' 
    | 'wolf'
    | 'harpy'
    | 'boss_ogre' 
    | 'boss_dragon' 
    | 'boss_deathknight'
    | 'boss_wyrm'
    | 'boss_overlord';
  colorTheme: string;
  dialogue: string;
  pointMultiplier: number;
}

export interface Stage {
  id: number;
  name: string;
  biome: 'forest' | 'ruins' | 'volcano' | 'crypt' | 'citadel';
  description: string;
  encounters: Enemy[];
  bgColors: {
    skyTop: string;
    skyBottom: string;
    farMountain: string;
    midLandscape: string;
    ground: string;
    path: string;
  };
}

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface GuessEvaluation {
  letter: string;
  state: LetterState;
}

export interface LetterTile {
  id: string;
  letter: string;
  isUsed: boolean;
  state?: LetterState;
}

export type CombatStatus = 'idle' | 'guessing' | 'evaluating' | 'victory' | 'defeat';

export interface CombatState {
  targetWord: string;
  targetEntry: WordEntry;
  letterPool: LetterTile[];
  guesses: string[];
  currentGuess: string;
  evaluations: GuessEvaluation[][];
  keyboardStatus: Record<string, LetterState>;
  status: CombatStatus;
  enemy: Enemy;
  enemyHp: number;
  enemyMaxHp: number;
  knightHp: number;
  knightMaxHp: number;
  shakeRowIndex: number | null;
  invalidMessage: string | null;
  lastDamage: {
    target: 'enemy' | 'knight';
    amount: number;
    text: string;
    isCrit?: boolean;
  } | null;
  earnedPoints: number;
  maxChances: number; // 4 rows
}
