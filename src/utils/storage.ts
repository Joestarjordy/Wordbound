import { CodexEntry, DifficultyLevel, PlayerProfile, WordEntry } from '../types/game';
import { DIFFICULTY_THRESHOLDS } from '../data/stages';

const STORAGE_KEY = 'wordbound_pixel_rpg_profile_v1';
const CODEX_RESET_KEY = 'wordbound_pixel_rpg_codex_reset_v1';

export const DEFAULT_PROFILE: PlayerProfile = {
  characterClass: 'knight',
  gender: 'male',
  totalPoints: 500,
  unlockedDifficulties: ['easy'],
  currentDifficulty: 'easy',
  stageProgress: {
    easy: { currentStage: 1, maxStageReached: 1 },
    medium: { currentStage: 1, maxStageReached: 1 },
    hard: { currentStage: 1, maxStageReached: 1 },
  },
  codex: {},
  stats: {
    battlesWon: 0,
    battlesLost: 0,
    totalGuesses: 0,
    bossDefeats: 0,
    currentStreak: 0,
    highestStreak: 0,
  },
  soundSettings: {
    bgmMuted: false,
    sfxMuted: false,
    volume: 0.6,
  },
};

export function loadProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CODEX_RESET_KEY, 'complete');
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw);
    const initialPoints =
      typeof parsed.totalPoints === 'number'
        ? parsed.totalPoints === 0 && (!parsed.stats?.battlesWon || parsed.stats.battlesWon === 0)
          ? 500
          : parsed.totalPoints
        : 500;
    const profile: PlayerProfile = {
      ...DEFAULT_PROFILE,
      ...parsed,
      totalPoints: initialPoints,
      stageProgress: {
        ...DEFAULT_PROFILE.stageProgress,
        ...(parsed.stageProgress || {}),
      },
      stats: {
        ...DEFAULT_PROFILE.stats,
        ...(parsed.stats || {}),
      },
      soundSettings: {
        ...DEFAULT_PROFILE.soundSettings,
        ...(parsed.soundSettings || {}),
      },
      codex: parsed.codex || {},
    };

    if (localStorage.getItem(CODEX_RESET_KEY) !== 'complete') {
      profile.codex = {};
      localStorage.setItem(CODEX_RESET_KEY, 'complete');
      saveProfile(profile);
    }

    return profile;
  } catch (e) {
    console.error('Failed to load player profile from localStorage:', e);
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: PlayerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save player profile to localStorage:', e);
  }
}

export function checkAndUnlockDifficulties(profile: PlayerProfile): {
  profile: PlayerProfile;
  newlyUnlocked: DifficultyLevel[];
} {
  const currentUnlocked = new Set<DifficultyLevel>(profile.unlockedDifficulties);
  const newlyUnlocked: DifficultyLevel[] = [];

  const tiers: DifficultyLevel[] = ['easy', 'medium', 'hard'];
  for (const tier of tiers) {
    if (!currentUnlocked.has(tier)) {
      const required = DIFFICULTY_THRESHOLDS[tier];
      if (profile.totalPoints >= required) {
        currentUnlocked.add(tier);
        newlyUnlocked.push(tier);
      }
    }
  }

  const updated: PlayerProfile = {
    ...profile,
    unlockedDifficulties: Array.from(currentUnlocked),
  };

  return { profile: updated, newlyUnlocked };
}

export function addWordToCodex(
  profile: PlayerProfile,
  entry: WordEntry,
  guessCount: number
): PlayerProfile {
  const key = entry.word.toUpperCase();
  const existing = profile.codex[key];

  const now = Date.now();
  const updatedEntry: CodexEntry = existing
    ? {
        ...existing,
        timesEncountered: existing.timesEncountered + 1,
        timesSolved: existing.timesSolved + 1,
        fewestGuesses: Math.min(existing.fewestGuesses, guessCount),
      }
    : {
        ...entry,
        unlockedAt: now,
        timesEncountered: 1,
        timesSolved: 1,
        fewestGuesses: guessCount,
      };

  const updated: PlayerProfile = {
    ...profile,
    codex: {
      ...profile.codex,
      [key]: updatedEntry,
    },
  };

  saveProfile(updated);
  return updated;
}
