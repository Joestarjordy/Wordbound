import { CodexEntry, DifficultyLevel, PlayerProfile, WordEntry } from '../types/game';
import { CAMPAIGN_TOTAL_STAGES, DIFFICULTY_THRESHOLDS } from '../data/stages';

const STORAGE_KEY = 'wordbound_pixel_rpg_profile_v1';
const CODEX_RESET_KEY = 'wordbound_pixel_rpg_codex_reset_v1';

/** Returns the highest stage reachable sequentially from Stage 1 based on cleared bosses */
export function getHighestUnlockedCampaignStage(completedStages: number[] = []): number {
  const cleared = new Set(completedStages);
  let stage = 1;
  while (stage < CAMPAIGN_TOTAL_STAGES && cleared.has(stage)) {
    stage += 1;
  }
  return stage;
}

/** Stage 1 is unlocked once its realm tier is open; Stage N > 1 requires finishing Stage N-1 */
export function isCampaignStageUnlocked(
  profile: PlayerProfile,
  difficulty: DifficultyLevel,
  stageId: number
): boolean {
  if (!profile.unlockedDifficulties.includes(difficulty)) return false;
  if (stageId <= 1) return true;
  const completed = profile.campaignCompletedStages[difficulty] || [];
  return completed.includes(stageId - 1);
}

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
  campaignCompletedStages: {
    easy: [],
    medium: [],
    hard: [],
  },
  endlessBestWave: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  seenStoryIds: [],
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
    const completedByTier: Record<DifficultyLevel, number[]> = {
      easy: Array.isArray(parsed.campaignCompletedStages?.easy)
        ? parsed.campaignCompletedStages.easy
        : [],
      medium: Array.isArray(parsed.campaignCompletedStages?.medium)
        ? parsed.campaignCompletedStages.medium
        : [],
      hard: Array.isArray(parsed.campaignCompletedStages?.hard)
        ? parsed.campaignCompletedStages.hard
        : [],
    };

    const normalizeStageProgress = (tier: DifficultyLevel) => {
      const saved = parsed.stageProgress?.[tier];
      const completed = completedByTier[tier];
      const highestUnlocked = getHighestUnlockedCampaignStage(completed);
      const rawCurrent =
        typeof saved?.currentStage === 'number' ? saved.currentStage : 1;
      const isCurrentValid =
        rawCurrent >= 1 &&
        rawCurrent <= CAMPAIGN_TOTAL_STAGES &&
        (rawCurrent === 1 || completed.includes(rawCurrent - 1));
      return {
        currentStage: isCurrentValid ? rawCurrent : highestUnlocked,
        maxStageReached: highestUnlocked,
      };
    };

    const profile: PlayerProfile = {
      ...DEFAULT_PROFILE,
      ...parsed,
      totalPoints: initialPoints,
      stageProgress: {
        easy: normalizeStageProgress('easy'),
        medium: normalizeStageProgress('medium'),
        hard: normalizeStageProgress('hard'),
      },
      campaignCompletedStages: completedByTier,
      endlessBestWave: {
        ...DEFAULT_PROFILE.endlessBestWave,
        ...(parsed.endlessBestWave || {}),
      },
      seenStoryIds: Array.isArray(parsed.seenStoryIds) ? parsed.seenStoryIds : [],
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
