import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CharacterGender,
  CombatState,
  DifficultyLevel,
  Enemy,
  EnemyAnimState,
  GameMode,
  KnightAnimState,
  LetterTile,
  PlayerProfile,
  Stage,
  WordEntry,
} from './types/game';
import { KNIGHT_SKILLS } from './data/knightSkills';
import { getEnemySpell } from './data/enemySpells';
import {
  addWordToCodex,
  checkAndUnlockDifficulties,
  getHighestUnlockedCampaignStage,
  isCampaignStageUnlocked,
  loadProfile,
  saveProfile,
} from './utils/storage';
import {
  generateLetterPool,
  evaluateGuess,
  getRandomWord,
  isValidGuess,
} from './data/words';
import { CAMPAIGN_TOTAL_STAGES, STAGES_BY_DIFFICULTY } from './data/stages';
import {
  StoryChapter,
  getCampaignStoryChapter,
  getLatestStoryChapterForStage,
} from './data/campaignStory';
import { generateEndlessEnemy, getEndlessBackdropStage } from './data/endless';
import { soundEngine } from './utils/sound';
import { Navbar } from './components/layout/Navbar';
import { PixelScene } from './components/pixel/PixelScene';
import { CombatOverlay } from './components/combat/CombatOverlay';
import { ExplorationConsole } from './components/layout/ExplorationConsole';
import { VictoryBanner } from './components/combat/VictoryBanner';
import { DefeatModal } from './components/combat/DefeatModal';
import { CodexModal } from './components/modals/CodexModal';
import { StageSelectModal } from './components/modals/StageSelectModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { StoryCutsceneModal } from './components/modals/StoryCutsceneModal';
import { IntroScreen } from './components/layout/IntroScreen';
import { MainMenu } from './components/layout/MainMenu';
import { CharacterSelectScreen } from './components/layout/CharacterSelectScreen';
import { Maximize } from 'lucide-react';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<'intro' | 'menu' | 'character-select' | 'game'>('intro');
  const [gameMode, setGameMode] = useState<GameMode>('campaign');

  // --- Player Profile State ---
  const [profile, setProfile] = useState<PlayerProfile>(() => loadProfile());

  // --- Exploration, Campaign Stage & Endless Wave State ---
  const currentDiff = profile.currentDifficulty;
  const stagesForDiff = STAGES_BY_DIFFICULTY[currentDiff] || STAGES_BY_DIFFICULTY.easy;
  const currentStageId = profile.stageProgress[currentDiff]?.currentStage || 1;
  const currentCampaignStage: Stage =
    stagesForDiff.find((s) => s.id === currentStageId) || stagesForDiff[0];

  const [currentEncounterIndex, setCurrentEncounterIndex] = useState(0);
  const [endlessWave, setEndlessWave] = useState(1);
  const [endlessKnightHp, setEndlessKnightHp] = useState(200);
  const [endlessEnemy, setEndlessEnemy] = useState<Enemy>(() =>
    generateEndlessEnemy(1, profile.currentDifficulty)
  );
  const [lastEndlessHeal, setLastEndlessHeal] = useState(0);
  const [justCompletedCampaignTier, setJustCompletedCampaignTier] = useState(false);

  const activeStage: Stage =
    gameMode === 'endless'
      ? getEndlessBackdropStage(endlessWave, currentDiff, endlessEnemy)
      : currentCampaignStage;

  const upcomingEnemy: Enemy =
    gameMode === 'endless'
      ? endlessEnemy
      : currentCampaignStage.encounters[currentEncounterIndex] || currentCampaignStage.encounters[0];

  const [explorationProgress, setExplorationProgress] = useState(0);
  const [inCombat, setInCombat] = useState(false);

  // --- Fullscreen State & Auto Fullscreen ---
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- Enhanced Animation States ---
  const [knightState, setKnightState] = useState<KnightAnimState>('walk');
  const [enemyState, setEnemyState] = useState<EnemyAnimState>('idle');
  const [cutInState, setCutInState] = useState<'knight' | 'enemy' | null>(null);
  const [floatingText, setFloatingText] = useState<
    { id: number; text: string; color: string; isCrit?: boolean }[]
  >([]);
  const combatTimersRef = useRef<number[]>([]);
  const encounteredWordsRef = useRef<Set<string>>(new Set());

  // --- Combat Engine State ---
  const [combatState, setCombatState] = useState<CombatState | null>(null);
  const combatStateRef = useRef<CombatState | null>(null);
  combatStateRef.current = combatState;

  // --- Modals State ---
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isDefeatOpen, setIsDefeatOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isStageSelectOpen, setIsStageSelectOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeStoryChapter, setActiveStoryChapter] = useState<StoryChapter | null>(null);

  // --- Audio State ---
  const [bgmMuted, setBgmMuted] = useState(profile.soundSettings.bgmMuted);
  const [sfxMuted, setSfxMuted] = useState(profile.soundSettings.sfxMuted);

  // Sync audio with soundEngine
  useEffect(() => {
    soundEngine.bgmMuted = bgmMuted;
    soundEngine.sfxMuted = sfxMuted;
  }, [bgmMuted, sfxMuted]);

  // Request fullscreen helper (must be called directly from a user gesture when possible)
  const enterFullscreen = useCallback(() => {
    const doc = document as Document & { webkitFullscreenElement?: Element | null };
    if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
      const docEl = document.documentElement as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen().catch(() => {});
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      }
    }
  }, []);

  // Track fullscreen state across all screens
  useEffect(() => {
    const onFsChange = () => {
      const doc = document as Document & { webkitFullscreenElement?: Element | null };
      setIsFullscreen(Boolean(doc.fullscreenElement || doc.webkitFullscreenElement));
    };

    onFsChange();
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
    };
  }, []);

  // Fallback fullscreen attempt when entering the game screen if not already fullscreen
  useEffect(() => {
    if (screen !== 'game') return;

    enterFullscreen();

    const handleFirstUserInteraction = () => {
      enterFullscreen();
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
    };
  }, [enterFullscreen, screen]);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      enterFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  }, [enterFullscreen]);

  const clearCombatTimers = useCallback(() => {
    combatTimersRef.current.forEach((t) => window.clearTimeout(t));
    combatTimersRef.current = [];
  }, []);

  const scheduleCombatTimer = useCallback((fn: () => void, delayMs: number) => {
    const id = window.setTimeout(fn, delayMs);
    combatTimersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    return () => {
      combatTimersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  // Floating text helper with automatic cleanup
  const spawnFloatingText = useCallback(
    (text: string, color: string, isCrit = false) => {
      const id = Date.now() + Math.random();
      setFloatingText((prev) => [...prev, { id, text, color, isCrit }]);
      scheduleCombatTimer(() => {
        setFloatingText((prev) => prev.filter((item) => item.id !== id));
      }, 900);
    },
    [scheduleCombatTimer]
  );

  // --- Start Combat with Encounter Enemy ---
  const startCombat = useCallback(
    (enemy: Enemy, forcedWord?: WordEntry, startingKnightHp?: number) => {
      clearCombatTimers();
      const solvedWords = new Set([
        ...Object.keys(profile.codex),
        ...encounteredWordsRef.current,
      ]);
      const targetWord =
        forcedWord ||
        getRandomWord(profile.currentDifficulty, undefined, solvedWords);
      encounteredWordsRef.current.add(targetWord.word);

      const targetLetters = new Set(targetWord.word.toUpperCase().split(''));
      const letterPool = generateLetterPool(targetWord.word, Math.max(10, targetWord.word.length + 5));

      // Apply boss-specific runic tile modifiers
      let scorchedTileId: string | undefined;
      let astralTileId: string | undefined;

      if (enemy.type === 'boss' && enemy.bossModifier) {
        if (enemy.bossModifier.type === 'scorched') {
          // Ignis the Dragon: 1 distractor rune is scorched with dragonfire
          const distractorTiles = letterPool.filter((t) => !targetLetters.has(t.letter));
          if (distractorTiles.length > 0) {
            const chosen = distractorTiles[Math.floor(Math.random() * distractorTiles.length)];
            chosen.isScorched = true;
            scorchedTileId = chosen.id;
          }
        } else if (enemy.bossModifier.type === 'astral_rune') {
          // Nidhogg Voidwyrm: 1 rune is celestial and deals x2 damage
          const targetTiles = letterPool.filter((t) => targetLetters.has(t.letter));
          if (targetTiles.length > 0) {
            const chosen = targetTiles[Math.floor(Math.random() * targetTiles.length)];
            chosen.isAstral = true;
            astralTileId = chosen.id;
          }
        }
      }

      setInCombat(true);
      setCutInState(null);
      setKnightState('idle');
      setEnemyState('idle');

      const initialKnightHp =
        typeof startingKnightHp === 'number'
          ? startingKnightHp
          : gameMode === 'endless'
          ? endlessKnightHp
          : 200;

      setCombatState({
        targetWord: targetWord.word,
        targetEntry: targetWord,
        letterPool,
        guesses: [],
        currentGuess: '',
        evaluations: [],
        keyboardStatus: {},
        status: 'guessing',
        enemy,
        enemyHp: enemy.maxHp,
        enemyMaxHp: enemy.maxHp,
        knightHp: initialKnightHp,
        knightMaxHp: 200,
        shakeRowIndex: null,
        invalidMessage: null,
        lastDamage: null,
        earnedPoints: 0,
        maxChances: 4, // strictly 4 chances
        bossEnrageBonus: 0,
        scorchedTileId,
        astralTileId,
      });

      soundEngine.startBgm(enemy.type === 'boss' ? 'boss' : 'combat');
      spawnFloatingText(
        gameMode === 'endless'
          ? `WAVE ${endlessWave}: ${enemy.name.toUpperCase()}!`
          : `ENCOUNTER: ${enemy.name.toUpperCase()}!`,
        enemy.colorTheme,
        true
      );
    },
    [
      clearCombatTimers,
      endlessKnightHp,
      endlessWave,
      gameMode,
      profile.codex,
      profile.currentDifficulty,
      spawnFloatingText,
    ]
  );

  // --- Campaign Story Cutscene Trigger & Completion ---
  useEffect(() => {
    if (
      screen !== 'game' ||
      gameMode !== 'campaign' ||
      inCombat ||
      isVictoryOpen ||
      isDefeatOpen ||
      isStageSelectOpen ||
      isCodexOpen ||
      isProfileOpen ||
      activeStoryChapter !== null ||
      currentEncounterIndex !== 0
    ) {
      return;
    }

    const chapter = getLatestStoryChapterForStage(currentDiff, currentStageId, profile.gender);
    if (chapter && !profile.seenStoryIds.includes(chapter.id)) {
      setActiveStoryChapter(chapter);
    }
  }, [
    activeStoryChapter,
    currentDiff,
    currentEncounterIndex,
    currentStageId,
    gameMode,
    inCombat,
    isCodexOpen,
    isDefeatOpen,
    isProfileOpen,
    isStageSelectOpen,
    isVictoryOpen,
    profile.gender,
    profile.seenStoryIds,
    screen,
  ]);

  const handleCompleteStoryChapter = useCallback(() => {
    const completedId = activeStoryChapter?.id;
    setActiveStoryChapter(null);
    if (completedId) {
      setProfile((currProf) => {
        if (currProf.seenStoryIds.includes(completedId)) return currProf;
        const updated: PlayerProfile = {
          ...currProf,
          seenStoryIds: [...currProf.seenStoryIds, completedId],
        };
        saveProfile(updated);
        return updated;
      });
    }
  }, [activeStoryChapter]);

  const handleOpenCurrentStory = useCallback(() => {
    const chapter = getLatestStoryChapterForStage(currentDiff, currentStageId, profile.gender);
    if (chapter) {
      setActiveStoryChapter(chapter);
    }
  }, [currentDiff, currentStageId, profile.gender]);

  // --- Auto-Walking AFK Loop ---
  useEffect(() => {
    if (
      screen !== 'game' ||
      inCombat ||
      isVictoryOpen ||
      isDefeatOpen ||
      activeStoryChapter !== null
    ) {
      return;
    }

    setKnightState('walk');
    soundEngine.startBgm('explore');

    const stepInterval = window.setInterval(() => {
      setExplorationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepInterval);
          startCombat(upcomingEnemy);
          return 100;
        }
        if (Math.floor(prev) % 25 === 0) {
          soundEngine.playFootstep();
        }
        return prev + 4;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
    };
  }, [
    activeStoryChapter,
    inCombat,
    isVictoryOpen,
    isDefeatOpen,
    screen,
    upcomingEnemy,
    startCombat,
  ]);

  // --- Wordle Input Handling ---
  const handleChar = useCallback(
    (char: string, tile?: LetterTile) => {
      // Scorched rune trap recoil (Ignis the Dragon)
      if (tile?.isScorched) {
        soundEngine.playBurn();
        spawnFloatingText('🔥 -10 BURN!', '#f97316', true);
        setCombatState((prev) => {
          if (!prev) return prev;
          const newHp = Math.max(1, prev.knightHp - 10);
          return {
            ...prev,
            knightHp: newHp,
          };
        });
        setKnightState('hurt');
        scheduleCombatTimer(() => {
          setKnightState('idle');
        }, 400);
      }

      setCombatState((prev) => {
        if (!prev || prev.status !== 'guessing') return prev;
        if (prev.currentGuess.length >= prev.targetWord.length) return prev;

        return {
          ...prev,
          currentGuess: prev.currentGuess + char.toUpperCase(),
          invalidMessage: null,
        };
      });
    },
    [scheduleCombatTimer, spawnFloatingText]
  );

  const handleBackspace = useCallback(() => {
    setCombatState((prev) => {
      if (!prev || prev.status !== 'guessing' || prev.currentGuess.length === 0) {
        return prev;
      }
      return {
        ...prev,
        currentGuess: prev.currentGuess.slice(0, -1),
        invalidMessage: null,
      };
    });
  }, []);

  const handleClear = useCallback(() => {
    setCombatState((prev) => {
      if (!prev || prev.status !== 'guessing') return prev;
      return {
        ...prev,
        currentGuess: '',
        invalidMessage: null,
      };
    });
  }, []);

  const handleRemoveLetterAt = useCallback((index: number) => {
    setCombatState((prev) => {
      if (!prev || prev.status !== 'guessing') return prev;
      const g = prev.currentGuess;
      if (index < 0 || index >= g.length) return prev;
      const next = g.slice(0, index) + g.slice(index + 1);
      return {
        ...prev,
        currentGuess: next,
        invalidMessage: null,
      };
    });
  }, []);

  // --- Submit Wordle Guess & Turn-Based Combat Logic ---
  const handleEnter = useCallback(() => {
    const prev = combatStateRef.current;
    if (!prev || prev.status !== 'guessing') return;

    const guess = prev.currentGuess.trim().toUpperCase();
    const targetLen = prev.targetWord.length;

    // Validate length
    if (guess.length !== targetLen) {
      soundEngine.playTileResult('absent');
      setCombatState((curr) =>
        curr
          ? {
              ...curr,
              shakeRowIndex: curr.guesses.length,
              invalidMessage: `Fill all ${targetLen} placeholders!`,
            }
          : curr
      );
      return;
    }

    // Validate characters
    if (!isValidGuess(guess, targetLen)) {
      soundEngine.playTileResult('absent');
      setCombatState((curr) =>
        curr
          ? {
              ...curr,
              shakeRowIndex: curr.guesses.length,
              invalidMessage: 'Not a valid alphabet word!',
            }
          : curr
      );
      return;
    }

    // Evaluate guess with Wordle rules
    const evalResult = evaluateGuess(guess, prev.targetWord);
    const isCorrect = guess === prev.targetWord;

    // Update keyboard letter evaluation hierarchy (correct > present > absent)
    const nextKeyboard = { ...prev.keyboardStatus };
    evalResult.forEach(({ letter, state }) => {
      const current = nextKeyboard[letter];
      if (state === 'correct') {
        nextKeyboard[letter] = 'correct';
      } else if (state === 'present' && current !== 'correct') {
        nextKeyboard[letter] = 'present';
      } else if (!current) {
        nextKeyboard[letter] = 'absent';
      }
    });

    // Sound feedback for guess result
    evalResult.forEach((_, i) => {
      scheduleCombatTimer(() => {
        soundEngine.playTileFlip(i);
      }, i * 70);
    });

    scheduleCombatTimer(() => {
      soundEngine.playTileResult(isCorrect ? 'correct' : 'present');
    }, 350);

    // --- Combat Action Calculation ---
    const newGuesses = [...prev.guesses, guess];
    const newEvaluations = [...prev.evaluations, evalResult];
    const attemptsUsed = newGuesses.length;

    const greenCount = evalResult.filter((e) => e.state === 'correct').length;
    const yellowCount = evalResult.filter((e) => e.state === 'present').length;

    const isBoss = prev.enemy.type === 'boss';
    const isBarrierBoss = prev.enemy.bossModifier?.type === 'barrier';
    const minGreensRequired = isBarrierBoss ? 3 : 2;

    // If the player misses the full word:
    // - 0 or 1 GREEN ('correct') tile -> Enemy/Boss BLOCKS & counters the Knight's attack (0 DMG)
    // - 2 or 3+ GREEN ('correct') tiles -> Knight's attack works and damages the enemy
    // - Archon Vexalor (Barrier Boss) requires at least 3 GREEN tiles to pierce!
    const isEnemyBlocked = !isCorrect && greenCount < minGreensRequired;

    let damageDealt = 0;
    if (isCorrect) {
      damageDealt = prev.enemyHp;
    } else if (isEnemyBlocked) {
      damageDealt = 0;
    } else {
      damageDealt = Math.min(
        Math.max(0, prev.enemyHp - 1),
        greenCount * 30 + yellowCount * 15
      );

      // Astral rune bonus damage (Nidhogg Voidwyrm)
      const astralTile = prev.letterPool.find((t) => t.isAstral);
      if (astralTile && evalResult.some((e) => e.letter === astralTile.letter && e.state === 'correct')) {
        damageDealt = Math.min(prev.enemyHp - 1, damageDealt * 2);
        soundEngine.playAstralCrit();
        scheduleCombatTimer(() => {
          spawnFloatingText('⭐ ASTRAL CRIT x2!', '#22d3ee', true);
        }, 320);
      }
    }

    let nextEnemyHp = isCorrect ? 0 : Math.max(1, prev.enemyHp - damageDealt);

    // Malakor Soul Leech: counters steal +25 HP back
    if (isEnemyBlocked && prev.enemy.bossModifier?.type === 'soul_leech') {
      nextEnemyHp = Math.min(prev.enemyMaxHp, nextEnemyHp + 25);
      scheduleCombatTimer(() => {
        spawnFloatingText('💀 +25 SOUL LEECH!', '#a855f7', true);
      }, 520);
    }

    const isFirstTryUltimate = isCorrect && attemptsUsed === 1;

    // Gorgok Brutal Frenzy (+10 ATK per missed attempt)
    const enrageBonus = prev.bossEnrageBonus || 0;
    const knightDamage = (prev.enemy.attack ?? 50) + enrageBonus;
    const hpAfterMiss = Math.max(0, prev.knightHp - knightDamage);
    const isFatalMiss = !isCorrect && (hpAfterMiss <= 0 || attemptsUsed >= prev.maxChances);

    let nextEnrageBonus = enrageBonus;
    if (!isCorrect && prev.enemy.bossModifier?.type === 'frenzy') {
      nextEnrageBonus += 10;
      scheduleCombatTimer(() => {
        spawnFloatingText('💥 GORGOK ENRAGES! (+10 ATK)', '#ef4444', true);
      }, 500);
    }

    // Immediately commit the guess submission and enemy HP deduction to combat state
    setCombatState((curr) => {
      if (!curr) return null;
      return {
        ...curr,
        guesses: newGuesses,
        evaluations: newEvaluations,
        keyboardStatus: nextKeyboard,
        currentGuess: '',
        enemyHp: isCorrect && !isFirstTryUltimate ? 0 : nextEnemyHp,
        status: isCorrect ? 'victory' : isFatalMiss ? 'defeat' : 'guessing',
        earnedPoints: isCorrect ? 500 : 0,
        shakeRowIndex: null,
        invalidMessage: null,
        bossEnrageBonus: nextEnrageBonus,
      };
    });

    // --- CASE 1: VICTORY ---
    if (isCorrect) {
      const earned = 500; // Strictly 500 PTS reward for winning the stage

      const finalizeVictory = () => {
        soundEngine.playVictoryFanfare();
        setKnightState('victory');

        if (gameMode === 'endless') {
          const healAmount = attemptsUsed === 1 ? 60 : 30;
          const remainingHp = combatStateRef.current?.knightHp ?? endlessKnightHp;
          const restoredHp = Math.min(200, remainingHp + healAmount);
          const actualHeal = Math.max(0, restoredHp - remainingHp);
          setEndlessKnightHp(restoredHp);
          setLastEndlessHeal(actualHeal);
          setJustCompletedCampaignTier(false);
        } else {
          const isFinalStageBoss =
            prev.enemy.type === 'boss' && currentStageId === CAMPAIGN_TOTAL_STAGES;
          setJustCompletedCampaignTier(isFinalStageBoss);
          setLastEndlessHeal(0);
        }

        setProfile((currentProf) => {
          const withCodex = addWordToCodex(currentProf, prev.targetEntry, attemptsUsed);
          const totalPoints = withCodex.totalPoints + earned;

          const updatedStats = {
            ...withCodex.stats,
            battlesWon: withCodex.stats.battlesWon + 1,
            totalGuesses: withCodex.stats.totalGuesses + attemptsUsed,
            bossDefeats:
              prev.enemy.type === 'boss'
                ? withCodex.stats.bossDefeats + 1
                : withCodex.stats.bossDefeats,
            currentStreak: withCodex.stats.currentStreak + 1,
            highestStreak: Math.max(
              withCodex.stats.highestStreak,
              withCodex.stats.currentStreak + 1
            ),
          };

          const prevCompleted = withCodex.campaignCompletedStages[currentDiff] || [];
          const nextCompletedForDiff =
            gameMode === 'campaign' &&
            prev.enemy.type === 'boss' &&
            !prevCompleted.includes(currentStageId)
              ? [...prevCompleted, currentStageId].sort((a, b) => a - b)
              : prevCompleted;

          const nextEndlessBest =
            gameMode === 'endless'
              ? Math.max(withCodex.endlessBestWave[currentDiff] || 0, endlessWave)
              : withCodex.endlessBestWave[currentDiff] || 0;

          const profWithPoints: PlayerProfile = {
            ...withCodex,
            totalPoints,
            stats: updatedStats,
            stageProgress: {
              ...withCodex.stageProgress,
              [currentDiff]: {
                ...withCodex.stageProgress[currentDiff],
                maxStageReached: Math.max(
                  withCodex.stageProgress[currentDiff]?.maxStageReached || 1,
                  getHighestUnlockedCampaignStage(nextCompletedForDiff)
                ),
              },
            },
            campaignCompletedStages: {
              ...withCodex.campaignCompletedStages,
              [currentDiff]: nextCompletedForDiff,
            },
            endlessBestWave: {
              ...withCodex.endlessBestWave,
              [currentDiff]: nextEndlessBest,
            },
          };

          const { profile: checkedProf, newlyUnlocked } =
            checkAndUnlockDifficulties(profWithPoints);

          if (newlyUnlocked.length > 0) {
            soundEngine.playUnlockSound();
            spawnFloatingText(
              `NEW REALM UNLOCKED: ${newlyUnlocked.join(', ').toUpperCase()}!`,
              '#38bdf8',
              true
            );
          }

          saveProfile(checkedProf);
          return checkedProf;
        });

        setIsVictoryOpen(true);
      };

      if (isFirstTryUltimate) {
        // 1st-Try Perfect Crack: Trigger Elemental Knight Skill Cut-in -> Fire (Male) or Frost (Female) Ultimate -> Burned/Frozen Death
        const activeSkill = KNIGHT_SKILLS[profile.gender];
        const isFire = activeSkill.magicType === 'fire';

        setCutInState('knight');
        soundEngine.playUltimateCutIn('knight');

        scheduleCombatTimer(() => {
          setCutInState(null);
          setKnightState('ultimate');
          soundEngine.playUltimateImpact('knight');
        }, 800);

        scheduleCombatTimer(() => {
          setEnemyState(isFire ? 'burned' : 'frozen');
          if (isFire) {
            soundEngine.playBurn();
          } else {
            soundEngine.playFreeze();
          }
          soundEngine.playHit();
          spawnFloatingText(
            isFire
              ? `🔥 ${activeSkill.skillName}! BURNED! -${damageDealt} HP 🔥`
              : `❄️ ${activeSkill.skillName}! FROZEN! -${damageDealt} HP ❄️`,
            activeSkill.accentColor,
            true
          );
          setCombatState((curr) => (curr ? { ...curr, enemyHp: 0 } : curr));
        }, 1150);

        scheduleCombatTimer(finalizeVictory, 2100);
      } else {
        // Normal Crack (Attempts 2–4): Standard slash attack -> Victory
        setKnightState('attack');
        soundEngine.playSlash();

        scheduleCombatTimer(() => {
          setEnemyState('defeated');
          soundEngine.playHit();
          spawnFloatingText(`CRITICAL HIT! -${damageDealt} HP`, '#facc15', true);
          setCombatState((curr) => (curr ? { ...curr, enemyHp: 0 } : curr));
        }, 280);

        scheduleCombatTimer(finalizeVictory, 750);
      }
      return;
    }

    // --- CASE 2: MISS (Knight attacks first: Enemy BLOCKS if <=1 letter cracked, or takes damage if 2-3+ cracked) ---
    setKnightState('attack');
    soundEngine.playSlash();

    scheduleCombatTimer(() => {
      if (isEnemyBlocked) {
        setEnemyState('block');
        if (isBarrierBoss && greenCount === 2) {
          soundEngine.playBarrierBlock();
          spawnFloatingText('👑 LEXICON BARRIER BLOCKED!', '#ec4899', true);
        } else {
          soundEngine.playBlock();
          spawnFloatingText('🛡️ BLOCKED! 0 DMG', '#38bdf8', true);
        }
      } else {
        setEnemyState('hurt');
        soundEngine.playHit();
        spawnFloatingText(`-${damageDealt} HP`, '#ef4444', false);
      }
    }, 260);

    scheduleCombatTimer(() => {
      setEnemyState('idle');
      setKnightState('idle');
    }, 640);

    if (isFatalMiss) {
      // Player missed until 4th try or HP reached 0 -> Enemy triggers Skill Cut-in & Ultimate Finisher!
      scheduleCombatTimer(() => {
        setCutInState('enemy');
        soundEngine.playUltimateCutIn('enemy');
      }, 660);

      scheduleCombatTimer(() => {
        setCutInState(null);
        setEnemyState('ultimate');
        soundEngine.playUltimateImpact('enemy');
      }, 1480);

      scheduleCombatTimer(() => {
        setKnightState('hurt');
        soundEngine.playHit();
        spawnFloatingText(
          isBoss
            ? `💀 CRITICAL BOSS STRIKE! -${knightDamage} HP 💀`
            : `💀 FATAL STRIKE! -${knightDamage} HP 💀`,
          '#f43f5e',
          true
        );
        setCombatState((curr) =>
          curr ? { ...curr, knightHp: Math.max(0, curr.knightHp - knightDamage) } : curr
        );
      }, 1820);

      scheduleCombatTimer(() => {
        setEnemyState('idle');
        setKnightState('defeat');
        soundEngine.playDefeatSound();

        setProfile((currentProf) => {
          const updated: PlayerProfile = {
            ...currentProf,
            stats: {
              ...currentProf.stats,
              battlesLost: currentProf.stats.battlesLost + 1,
              totalGuesses: currentProf.stats.totalGuesses + attemptsUsed,
              currentStreak: 0,
            },
          };
          saveProfile(updated);
          return updated;
        });

        setIsDefeatOpen(true);
      }, 2450);
      return;
    }

    // Non-fatal miss: Standard enemy counterattack (magic spell for casters, physical lunge for melee)
    const counterSpell = getEnemySpell(prev.enemy.spriteType);
    scheduleCombatTimer(() => {
      setEnemyState('attack');
      if (counterSpell) {
        soundEngine.playEnemySpell(counterSpell.school);
      }
    }, 700);
    scheduleCombatTimer(() => {
      setKnightState('hurt');
      soundEngine.playHit();
      spawnFloatingText(
        counterSpell
          ? `✦ ${counterSpell.label.toUpperCase()}! -${knightDamage} HP`
          : isBoss
          ? `CRITICAL! -${knightDamage} HP`
          : `-${knightDamage} HP`,
        counterSpell ? counterSpell.secondary : isBoss ? '#ef4444' : '#38bdf8',
        isBoss || Boolean(counterSpell)
      );
      setCombatState((curr) => {
        if (!curr) return null;
        const newHp = Math.max(0, curr.knightHp - knightDamage);
        if (newHp <= 50 && newHp > 0) {
          soundEngine.startBgm(isBoss ? 'boss' : 'combat', true);
        }
        return { ...curr, knightHp: newHp };
      });
    }, 880);
    scheduleCombatTimer(() => {
      setEnemyState('idle');
      setKnightState('idle');
    }, 1300);
  }, [
    currentDiff,
    currentStageId,
    endlessKnightHp,
    endlessWave,
    gameMode,
    profile.gender,
    scheduleCombatTimer,
    spawnFloatingText,
  ]);

  // --- Resume Journey after Victory ---
  const handleVictoryContinue = useCallback(() => {
    const wasCampaignFinale = justCompletedCampaignTier;
    clearCombatTimers();
    setCutInState(null);
    setIsVictoryOpen(false);
    setInCombat(false);
    setCombatState(null);
    setKnightState('walk');
    setEnemyState('idle');
    setExplorationProgress(0);
    setJustCompletedCampaignTier(false);

    if (gameMode === 'endless') {
      const nextWave = endlessWave + 1;
      setEndlessWave(nextWave);
      setEndlessEnemy(generateEndlessEnemy(nextWave, currentDiff, endlessEnemy.spriteType));
      spawnFloatingText(`SURVIVED! APPROACHING WAVE ${nextWave}`, '#38bdf8', true);
      return;
    }

    const isLastEncounterOfStage =
      currentEncounterIndex >= currentCampaignStage.encounters.length - 1;

    if (isLastEncounterOfStage) {
      const nextStageId = currentStageId + 1;
      const hasNextStage = stagesForDiff.some((s) => s.id === nextStageId);
      const targetStageId = hasNextStage ? nextStageId : 1;

      setProfile((curr) => {
        const updatedProgress = {
          ...curr.stageProgress,
          [currentDiff]: {
            currentStage: targetStageId,
            maxStageReached: Math.max(
              curr.stageProgress[currentDiff]?.maxStageReached || 1,
              targetStageId
            ),
          },
        };
        const updated = { ...curr, stageProgress: updatedProgress };
        saveProfile(updated);
        return updated;
      });

      setCurrentEncounterIndex(0);

      if (wasCampaignFinale || !hasNextStage) {
        const epilogue = getCampaignStoryChapter(currentDiff, 'epilogue', profile.gender);
        if (epilogue) {
          setActiveStoryChapter(epilogue);
        }
      }

      spawnFloatingText(
        hasNextStage
          ? `STAGE ${currentStageId} SAVED! ENTERING STAGE ${targetStageId}!`
          : `ALL ${CAMPAIGN_TOTAL_STAGES} GUARDIANS FREED! REALM SAVED!`,
        '#10b981',
        true
      );
    } else {
      setCurrentEncounterIndex((prev) => prev + 1);
    }
  }, [
    clearCombatTimers,
    currentCampaignStage,
    currentDiff,
    currentEncounterIndex,
    currentStageId,
    endlessEnemy.spriteType,
    endlessWave,
    gameMode,
    justCompletedCampaignTier,
    profile.gender,
    spawnFloatingText,
    stagesForDiff,
  ]);

  // --- Retry Stage (Campaign) or Restart Run (Endless) after Defeat ---
  const handleDefeatRetry = useCallback(() => {
    clearCombatTimers();
    setCutInState(null);
    setIsDefeatOpen(false);
    setExplorationProgress(0);

    const usedWords = new Set([
      ...Object.keys(profile.codex),
      ...encounteredWordsRef.current,
    ]);
    const newWord = getRandomWord(
      profile.currentDifficulty,
      combatState?.targetWord,
      usedWords
    );

    if (gameMode === 'endless') {
      const freshEnemy = generateEndlessEnemy(1, profile.currentDifficulty);
      setEndlessWave(1);
      setEndlessKnightHp(200);
      setEndlessEnemy(freshEnemy);
      setLastEndlessHeal(0);
      startCombat(freshEnemy, newWord, 200);
      return;
    }

    setCurrentEncounterIndex(0);
    const firstEnemy = currentCampaignStage.encounters[0];
    startCombat(firstEnemy, newWord, 200);
  }, [
    clearCombatTimers,
    combatState?.targetWord,
    currentCampaignStage,
    gameMode,
    profile.codex,
    profile.currentDifficulty,
    startCombat,
  ]);

  // --- Campaign Difficulty & Stage Selection ---
  const handleSelectDifficultyAndStage = useCallback(
    (diff: DifficultyLevel, stageId: number) => {
      if (!isCampaignStageUnlocked(profile, diff, stageId)) {
        spawnFloatingText(`CLEAR STAGE ${stageId - 1} FIRST TO UNLOCK!`, '#f43f5e', true);
        return;
      }

      clearCombatTimers();
      setCutInState(null);
      setGameMode('campaign');
      setInCombat(false);
      setCombatState(null);
      setIsVictoryOpen(false);
      setIsDefeatOpen(false);
      setCurrentEncounterIndex(0);
      setExplorationProgress(0);
      setKnightState('walk');
      setEnemyState('idle');

      setProfile((curr) => {
        if (!isCampaignStageUnlocked(curr, diff, stageId)) return curr;
        const updated = {
          ...curr,
          currentDifficulty: diff,
          stageProgress: {
            ...curr.stageProgress,
            [diff]: {
              ...curr.stageProgress[diff],
              currentStage: stageId,
            },
          },
        };
        saveProfile(updated);
        return updated;
      });

      spawnFloatingText(`CAMPAIGN: ${diff.toUpperCase()} STAGE ${stageId}!`, '#f59e0b', true);
    },
    [clearCombatTimers, profile, spawnFloatingText]
  );

  // --- Endless Mode Difficulty Selection ---
  const handleSelectEndlessDifficulty = useCallback(
    (diff: DifficultyLevel) => {
      clearCombatTimers();
      setCutInState(null);
      setGameMode('endless');
      setInCombat(false);
      setCombatState(null);
      setIsVictoryOpen(false);
      setIsDefeatOpen(false);
      setEndlessWave(1);
      setEndlessKnightHp(200);
      setEndlessEnemy(generateEndlessEnemy(1, diff));
      setLastEndlessHeal(0);
      setExplorationProgress(0);
      setKnightState('walk');
      setEnemyState('idle');

      setProfile((curr) => {
        const updated = { ...curr, currentDifficulty: diff };
        saveProfile(updated);
        return updated;
      });

      spawnFloatingText(`ENDLESS SURVIVAL: ${diff.toUpperCase()}!`, '#38bdf8', true);
    },
    [clearCombatTimers, spawnFloatingText]
  );

  // --- Select Difficulty on Character Select Screen ---
  const handleSelectDifficultyOnly = useCallback((diff: DifficultyLevel) => {
    setProfile((curr) => {
      const updated = { ...curr, currentDifficulty: diff };
      saveProfile(updated);
      return updated;
    });
  }, []);

  // --- Confirm Hero & Launch Selected Mode ---
  const handleConfirmCharacterSelect = useCallback(() => {
    clearCombatTimers();
    setCutInState(null);
    setInCombat(false);
    setCombatState(null);
    setIsVictoryOpen(false);
    setIsDefeatOpen(false);
    setExplorationProgress(0);
    setKnightState('walk');
    setEnemyState('idle');

    if (gameMode === 'endless') {
      setActiveStoryChapter(null);
      setEndlessWave(1);
      setEndlessKnightHp(200);
      setEndlessEnemy(generateEndlessEnemy(1, profile.currentDifficulty));
      setLastEndlessHeal(0);
    } else {
      // Ensure Campaign stays on an unlocked difficulty
      const safeDiff = profile.unlockedDifficulties.includes(profile.currentDifficulty)
        ? profile.currentDifficulty
        : 'easy';
      if (safeDiff !== profile.currentDifficulty) {
        setProfile((curr) => {
          const updated = { ...curr, currentDifficulty: safeDiff };
          saveProfile(updated);
          return updated;
        });
      }
      setCurrentEncounterIndex(0);

      const targetStageId = profile.stageProgress[safeDiff]?.currentStage || 1;
      const chapter = getLatestStoryChapterForStage(safeDiff, targetStageId, profile.gender);
      if (chapter && !profile.seenStoryIds.includes(chapter.id)) {
        setActiveStoryChapter(chapter);
        setKnightState('idle');
      } else {
        setActiveStoryChapter(null);
      }
    }

    setScreen('game');
  }, [
    clearCombatTimers,
    gameMode,
    profile.currentDifficulty,
    profile.gender,
    profile.seenStoryIds,
    profile.stageProgress,
    profile.unlockedDifficulties,
  ]);

  // --- Return to Main Menu from Gameplay ---
  const handleReturnToMenu = useCallback(() => {
    clearCombatTimers();
    soundEngine.stopBgm();
    setCutInState(null);
    setInCombat(false);
    setCombatState(null);
    setIsVictoryOpen(false);
    setIsDefeatOpen(false);
    setActiveStoryChapter(null);
    setScreen('menu');
  }, [clearCombatTimers]);

  // --- Gender Customization ---
  const handleChangeGender = useCallback((gender: CharacterGender) => {
    setProfile((curr) => {
      const updated = { ...curr, gender };
      saveProfile(updated);
      return updated;
    });
  }, []);

  // --- Reset Save ---
  const handleResetSave = useCallback(() => {
    clearCombatTimers();
    setCutInState(null);
    localStorage.clear();
    encounteredWordsRef.current.clear();
    const fresh = loadProfile();
    setProfile(fresh);
    setCurrentEncounterIndex(0);
    setEndlessWave(1);
    setEndlessKnightHp(200);
    setEndlessEnemy(generateEndlessEnemy(1, fresh.currentDifficulty));
    setLastEndlessHeal(0);
    setJustCompletedCampaignTier(false);
    setActiveStoryChapter(null);
    setExplorationProgress(0);
    setInCombat(false);
    setCombatState(null);
  }, [clearCombatTimers]);

  // --- Audio Toggles ---
  const handleToggleBgm = useCallback(() => {
    const isMuted = soundEngine.toggleBgm();
    setBgmMuted(isMuted);
    setProfile((curr) => {
      const updated = {
        ...curr,
        soundSettings: { ...curr.soundSettings, bgmMuted: isMuted },
      };
      saveProfile(updated);
      return updated;
    });
  }, []);

  const handleToggleSfx = useCallback(() => {
    const isMuted = soundEngine.toggleSfx();
    setSfxMuted(isMuted);
    setProfile((curr) => {
      const updated = {
        ...curr,
        soundSettings: { ...curr.soundSettings, sfxMuted: isMuted },
      };
      saveProfile(updated);
      return updated;
    });
  }, []);

  return (
    <>
      {screen === 'intro' && (
        <IntroScreen
          onContinue={() => {
            enterFullscreen();
            setScreen('menu');
          }}
        />
      )}

      {screen === 'menu' && (
        <MainMenu
          profile={profile}
          onSelectMode={(mode) => {
            setGameMode(mode);
            if (
              mode === 'campaign' &&
              !profile.unlockedDifficulties.includes(profile.currentDifficulty)
            ) {
              handleSelectDifficultyOnly('easy');
            }
            setIsCodexOpen(false);
            setIsStageSelectOpen(false);
            setIsProfileOpen(false);
            setScreen('character-select');
          }}
          onOpenCodex={() => setIsCodexOpen(true)}
          onOpenStageSelect={() => setIsStageSelectOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      )}

      {screen === 'character-select' && (
        <CharacterSelectScreen
          gameMode={gameMode}
          selectedGender={profile.gender}
          selectedDifficulty={profile.currentDifficulty}
          unlockedDifficulties={profile.unlockedDifficulties}
          campaignProgressLabel={`STAGE ${currentStageId}/${CAMPAIGN_TOTAL_STAGES} · ${(profile.campaignCompletedStages[currentDiff] || []).length}/${CAMPAIGN_TOTAL_STAGES} BOSSES`}
          endlessBestWave={profile.endlessBestWave[currentDiff] || 0}
          onSelectGender={handleChangeGender}
          onSelectDifficulty={handleSelectDifficultyOnly}
          onConfirm={handleConfirmCharacterSelect}
          onBack={() => setScreen('menu')}
        />
      )}

      {screen !== 'game' && (
        <>
          <CodexModal
            isOpen={isCodexOpen}
            onClose={() => setIsCodexOpen(false)}
            profile={profile}
          />
          <StageSelectModal
            isOpen={isStageSelectOpen}
            onClose={() => setIsStageSelectOpen(false)}
            profile={profile}
            gameMode={gameMode}
            onSelectDifficultyAndStage={(diff, stageId) => {
              handleSelectDifficultyAndStage(diff, stageId);
              setScreen('character-select');
            }}
            onSelectEndlessDifficulty={(diff) => {
              handleSelectEndlessDifficulty(diff);
              setScreen('character-select');
            }}
          />
          <ProfileModal
            isOpen={isProfileOpen}
            onClose={() => setIsProfileOpen(false)}
            profile={profile}
            onChangeGender={handleChangeGender}
            onResetSave={handleResetSave}
          />
        </>
      )}

      {screen === 'game' && (
    <div className="h-screen h-[100dvh] max-h-screen w-full bg-[#0b0a14] text-slate-100 flex flex-col justify-between overflow-hidden select-none relative">
      {/* 1. Sleek Top Navigation HUD Bar */}
      <Navbar
        profile={profile}
        gameMode={gameMode}
        onReturnToMenu={handleReturnToMenu}
        onOpenCodex={() => setIsCodexOpen(true)}
        onOpenStageSelect={() => setIsStageSelectOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        bgmMuted={bgmMuted}
        sfxMuted={sfxMuted}
        onToggleBgm={handleToggleBgm}
        onToggleSfx={handleToggleSfx}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Subtle Auto-Fullscreen Prompt Banner (disappears once in fullscreen or tapped) */}
      {!isFullscreen && (
        <div
          onClick={handleToggleFullscreen}
          className="absolute top-13 left-1/2 -translate-x-1/2 z-30 bg-amber-500/90 hover:bg-amber-400 text-black px-3 py-1 rounded font-pixel text-[9px] sm:text-[10px] shadow-pixel border border-white flex items-center gap-1.5 cursor-pointer animate-pulse"
        >
          <Maximize className="w-3.5 h-3.5" />
          <span>TAP ANYWHERE TO PLAY FULLSCREEN</span>
        </div>
      )}

      {/* 2. Main Full-Screen Layout: Top Game World + Dedicated Bottom Battle Deck */}
      <main className="flex-1 w-full flex flex-col justify-between overflow-hidden min-h-0">
        {/* TOP PART: Expansive Full-Screen Pixel World */}
        <div className="w-full flex-1 min-h-0 relative overflow-hidden bg-black flex flex-col">
          <PixelScene
            gameMode={gameMode}
            stage={activeStage}
            currentEncounterIndex={currentEncounterIndex}
            totalEncounters={activeStage.encounters.length}
            endlessWave={endlessWave}
            endlessBestWave={profile.endlessBestWave[currentDiff] || 0}
            inCombat={inCombat}
            knightGender={profile.gender}
            knightState={knightState}
            currentEnemy={combatState?.enemy || upcomingEnemy}
            enemyState={enemyState}
            cutInState={cutInState}
            floatingText={floatingText}
            explorationProgress={explorationProgress}
            knightHp={combatState?.knightHp ?? (gameMode === 'endless' ? endlessKnightHp : 200)}
            knightMaxHp={combatState?.knightMaxHp ?? 200}
            enemyHp={combatState?.enemyHp}
            enemyMaxHp={combatState?.enemyMaxHp}
          />
        </div>

        {/* BOTTOM PART: Dedicated space for the Wordle boxes content & controls */}
        <section className="w-full shrink-0 border-t-4 border-[#3b385e] bg-[#121020] shadow-[0_-10px_25px_rgba(0,0,0,0.85)] z-20 flex flex-col justify-between overflow-x-hidden overflow-y-auto p-2 sm:p-2.5 h-[56dvh] sm:h-[48dvh] md:h-[44dvh] max-h-[460px]">
          {inCombat && combatState ? (
            <CombatOverlay
              combatState={combatState}
              onChar={handleChar}
              onEnter={handleEnter}
              onBackspace={handleBackspace}
              onClear={handleClear}
              onRemoveLetterAt={handleRemoveLetterAt}
              disabled={combatState.status !== 'guessing'}
            />
          ) : (
            <ExplorationConsole
              profile={profile}
              gameMode={gameMode}
              stage={activeStage}
              upcomingEnemy={upcomingEnemy}
              currentEncounterIndex={currentEncounterIndex}
              totalEncounters={activeStage.encounters.length}
              endlessWave={endlessWave}
              endlessBestWave={profile.endlessBestWave[currentDiff] || 0}
              knightHp={gameMode === 'endless' ? endlessKnightHp : 200}
              explorationProgress={explorationProgress}
              onOpenCodex={() => setIsCodexOpen(true)}
              onOpenStageSelect={() => setIsStageSelectOpen(true)}
              onOpenProfile={() => setIsProfileOpen(true)}
              onOpenStory={gameMode === 'campaign' ? handleOpenCurrentStory : undefined}
            />
          )}
        </section>
      </main>

      {/* Modals & Dialogs */}
      <StoryCutsceneModal
        chapter={activeStoryChapter}
        knightGender={profile.gender}
        onComplete={handleCompleteStoryChapter}
      />

      {isVictoryOpen && combatState && (
        <VictoryBanner
          isOpen={isVictoryOpen}
          gameMode={gameMode}
          difficulty={currentDiff}
          targetWord={combatState.targetEntry}
          enemy={combatState.enemy}
          knightGender={profile.gender}
          attemptsUsed={combatState.guesses.length}
          pointsEarned={combatState.earnedPoints}
          isBoss={combatState.enemy.type === 'boss'}
          endlessWave={endlessWave}
          endlessHeal={lastEndlessHeal}
          isCampaignFinale={justCompletedCampaignTier}
          onContinue={handleVictoryContinue}
        />
      )}

      {isDefeatOpen && combatState && (
        <DefeatModal
          isOpen={isDefeatOpen}
          gameMode={gameMode}
          endlessWave={endlessWave}
          endlessBestWave={profile.endlessBestWave[currentDiff] || 0}
          targetWord={combatState.targetEntry}
          onRetry={handleDefeatRetry}
          onOpenCodex={() => setIsCodexOpen(true)}
        />
      )}

      <CodexModal
        isOpen={isCodexOpen}
        onClose={() => setIsCodexOpen(false)}
        profile={profile}
      />

      <StageSelectModal
        isOpen={isStageSelectOpen}
        onClose={() => setIsStageSelectOpen(false)}
        profile={profile}
        gameMode={gameMode}
        onSelectDifficultyAndStage={handleSelectDifficultyAndStage}
        onSelectEndlessDifficulty={handleSelectEndlessDifficulty}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onChangeGender={handleChangeGender}
        onResetSave={handleResetSave}
      />
    </div>
      )}
    </>
  );
};

export default App;
