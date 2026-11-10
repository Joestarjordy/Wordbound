import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CharacterGender,
  CombatState,
  DifficultyLevel,
  Enemy,
  PlayerProfile,
  Stage,
  WordEntry,
} from './types/game';
import {
  addWordToCodex,
  checkAndUnlockDifficulties,
  loadProfile,
  saveProfile,
} from './utils/storage';
import {
  generateLetterPool,
  evaluateGuess,
  getRandomWord,
  isValidGuess,
} from './data/words';
import { STAGES_BY_DIFFICULTY } from './data/stages';
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
import { IntroScreen } from './components/layout/IntroScreen';
import { MainMenu } from './components/layout/MainMenu';
import { Maximize } from 'lucide-react';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<'intro' | 'menu' | 'game'>('intro');

  // --- Player Profile State ---
  const [profile, setProfile] = useState<PlayerProfile>(() => loadProfile());

  // --- Exploration & Stage State ---
  const currentDiff = profile.currentDifficulty;
  const stagesForDiff = STAGES_BY_DIFFICULTY[currentDiff] || STAGES_BY_DIFFICULTY.easy;
  const currentStageId = profile.stageProgress[currentDiff]?.currentStage || 1;
  const currentStage: Stage =
    stagesForDiff.find((s) => s.id === currentStageId) || stagesForDiff[0];

  const [currentEncounterIndex, setCurrentEncounterIndex] = useState(0);
  const [explorationProgress, setExplorationProgress] = useState(0);
  const [inCombat, setInCombat] = useState(false);

  // --- Fullscreen State & Auto Fullscreen ---
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- Enhanced Animation States ---
  const [knightState, setKnightState] = useState<
    'walk' | 'idle' | 'attack' | 'ultimate' | 'hurt' | 'victory' | 'defeat'
  >('walk');
  const [enemyState, setEnemyState] = useState<
    'idle' | 'attack' | 'block' | 'ultimate' | 'hurt' | 'defeated'
  >('idle');
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

  // --- Audio State ---
  const [bgmMuted, setBgmMuted] = useState(profile.soundSettings.bgmMuted);
  const [sfxMuted, setSfxMuted] = useState(profile.soundSettings.sfxMuted);

  // Sync audio with soundEngine
  useEffect(() => {
    soundEngine.bgmMuted = bgmMuted;
    soundEngine.sfxMuted = sfxMuted;
  }, [bgmMuted, sfxMuted]);

  // Request fullscreen helper
  const enterFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
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

  // Automatic Fullscreen: Try immediately + trigger on very first interaction (click/tap) on desktop and mobile
  useEffect(() => {
    if (screen !== 'game') return;

    enterFullscreen();

    const handleFirstUserInteraction = () => {
      enterFullscreen();
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });
    window.addEventListener('keydown', handleFirstUserInteraction, { once: true });

    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      window.removeEventListener('keydown', handleFirstUserInteraction);
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
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
    (enemy: Enemy, forcedWord?: WordEntry) => {
      clearCombatTimers();
        const solvedWords = new Set([
          ...Object.keys(profile.codex),
          ...encounteredWordsRef.current,
        ]);
        const targetWord =
          forcedWord ||
          getRandomWord(profile.currentDifficulty, undefined, solvedWords);
        encounteredWordsRef.current.add(targetWord.word);
      const letterPool = generateLetterPool(targetWord.word, Math.max(10, targetWord.word.length + 5));

      setInCombat(true);
      setCutInState(null);
      setKnightState('idle');
      setEnemyState('idle');

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
        knightHp: 200,
        knightMaxHp: 200,
        shakeRowIndex: null,
        invalidMessage: null,
        lastDamage: null,
        earnedPoints: 0,
        maxChances: 4, // strictly 4 chances
      });

      soundEngine.startBgm('combat');
      spawnFloatingText(`ENCOUNTER: ${enemy.name.toUpperCase()}!`, enemy.colorTheme, true);
    },
    [clearCombatTimers, profile.currentDifficulty, profile.codex, spawnFloatingText]
  );

  // --- Auto-Walking AFK Loop ---
  useEffect(() => {
    if (screen !== 'game' || inCombat || isVictoryOpen || isDefeatOpen) return;

    setKnightState('walk');
    soundEngine.startBgm('explore');

    const stepInterval = window.setInterval(() => {
      setExplorationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepInterval);
          const enemy = currentStage.encounters[currentEncounterIndex];
          startCombat(enemy);
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
    inCombat,
    isVictoryOpen,
    isDefeatOpen,
    screen,
    currentStage,
    currentEncounterIndex,
    startCombat,
  ]);

  // --- Wordle Input Handling ---
  const handleChar = useCallback((char: string) => {
    setCombatState((prev) => {
      if (!prev || prev.status !== 'guessing') return prev;
      if (prev.currentGuess.length >= prev.targetWord.length) return prev;

      return {
        ...prev,
        currentGuess: prev.currentGuess + char.toUpperCase(),
        invalidMessage: null,
      };
    });
  }, []);

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

    // If the player misses the full word:
    // - 0 or 1 GREEN ('correct') tile -> Enemy/Boss BLOCKS & counters the Knight's attack (0 DMG)
    // - 2 or 3+ GREEN ('correct') tiles -> Knight's attack works and damages the enemy
    const isEnemyBlocked = !isCorrect && greenCount <= 1;

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
    }

    const nextEnemyHp = isCorrect ? 0 : Math.max(1, prev.enemyHp - damageDealt);
    const isFirstTryUltimate = isCorrect && attemptsUsed === 1;

    const isBoss = prev.enemy.type === 'boss';
    const knightDamage = prev.enemy.attack ?? 50;
    const hpAfterMiss = Math.max(0, prev.knightHp - knightDamage);
    const isFatalMiss = !isCorrect && (hpAfterMiss <= 0 || attemptsUsed >= prev.maxChances);

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
      };
    });

    // --- CASE 1: VICTORY ---
    if (isCorrect) {
      const earned = 500; // Strictly 500 PTS reward for winning the stage

      const finalizeVictory = () => {
        soundEngine.playVictoryFanfare();
        setKnightState('victory');

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

          const profWithPoints: PlayerProfile = {
            ...withCodex,
            totalPoints,
            stats: updatedStats,
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
        // 1st-Try Perfect Crack: Trigger Knight Skill Cut-in Banner -> Knight Ultimate Skill -> Victory
        setCutInState('knight');
        soundEngine.playUltimateCutIn('knight');

        scheduleCombatTimer(() => {
          setCutInState(null);
          setKnightState('ultimate');
          soundEngine.playUltimateImpact('knight');
        }, 800);

        scheduleCombatTimer(() => {
          setEnemyState('defeated');
          soundEngine.playHit();
          spawnFloatingText(
            `⚡ EXCALIBUR ULTIMATE! -${damageDealt} HP ⚡`,
            '#facc15',
            true
          );
          setCombatState((curr) => (curr ? { ...curr, enemyHp: 0 } : curr));
        }, 1150);

        scheduleCombatTimer(finalizeVictory, 1850);
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
        soundEngine.playBlock();
        spawnFloatingText('🛡️ BLOCKED! 0 DMG', '#38bdf8', true);
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

    // Non-fatal miss: Standard enemy counterattack (50 HP for regular enemies, 100 HP for bosses)
    scheduleCombatTimer(() => setEnemyState('attack'), 700);
    scheduleCombatTimer(() => {
      setKnightState('hurt');
      soundEngine.playHit();
      spawnFloatingText(
        isBoss ? `CRITICAL! -${knightDamage} HP` : `-${knightDamage} HP`,
        isBoss ? '#ef4444' : '#38bdf8',
        isBoss
      );
      setCombatState((curr) =>
        curr ? { ...curr, knightHp: Math.max(0, curr.knightHp - knightDamage) } : curr
      );
    }, 880);
    scheduleCombatTimer(() => {
      setEnemyState('idle');
      setKnightState('idle');
    }, 1300);
  }, [scheduleCombatTimer, spawnFloatingText]);

  // --- Resume Journey after Victory ---
  const handleVictoryContinue = useCallback(() => {
    clearCombatTimers();
    setCutInState(null);
    setIsVictoryOpen(false);
    setInCombat(false);
    setCombatState(null);
    setKnightState('walk');
    setEnemyState('idle');
    setExplorationProgress(0);

    const isLastEncounterOfStage = currentEncounterIndex >= currentStage.encounters.length - 1;

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
      spawnFloatingText(`STAGE ${currentStageId} COMPLETED! ADVANCING!`, '#10b981', true);
    } else {
      setCurrentEncounterIndex((prev) => prev + 1);
    }
  }, [
    clearCombatTimers,
    currentEncounterIndex,
    currentStage,
    currentStageId,
    currentDiff,
    stagesForDiff,
    spawnFloatingText,
  ]);

  // --- Retry Stage after Defeat ---
  const handleDefeatRetry = useCallback(() => {
    clearCombatTimers();
    setCutInState(null);
    setIsDefeatOpen(false);

    setCurrentEncounterIndex(0);
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
    const firstEnemy = currentStage.encounters[0];

    startCombat(firstEnemy, newWord);
  }, [
    clearCombatTimers,
    profile.currentDifficulty,
    profile.codex,
    combatState?.targetWord,
    currentStage,
    startCombat,
  ]);

  // --- Difficulty & Stage Selection ---
  const handleSelectDifficultyAndStage = useCallback(
    (diff: DifficultyLevel, stageId: number) => {
      clearCombatTimers();
      setCutInState(null);
      setInCombat(false);
      setCombatState(null);
      setIsVictoryOpen(false);
      setIsDefeatOpen(false);
      setCurrentEncounterIndex(0);
      setExplorationProgress(0);
      setKnightState('walk');

      setProfile((curr) => {
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

      spawnFloatingText(`ENTERED ${diff.toUpperCase()} REALM!`, '#38bdf8', true);
    },
    [clearCombatTimers, spawnFloatingText]
  );

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
        <IntroScreen onContinue={() => setScreen('menu')} />
      )}

      {screen === 'menu' && (
        <MainMenu
          profile={profile}
          onStartGame={() => {
            setIsCodexOpen(false);
            setIsStageSelectOpen(false);
            setIsProfileOpen(false);
            setScreen('game');
          }}
          onOpenCodex={() => setIsCodexOpen(true)}
          onOpenStageSelect={() => setIsStageSelectOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
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
            onSelectDifficultyAndStage={handleSelectDifficultyAndStage}
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
            stage={currentStage}
            currentEncounterIndex={currentEncounterIndex}
            totalEncounters={currentStage.encounters.length}
            inCombat={inCombat}
            knightGender={profile.gender}
            knightState={knightState}
            currentEnemy={combatState?.enemy || currentStage.encounters[currentEncounterIndex]}
            enemyState={enemyState}
            cutInState={cutInState}
            floatingText={floatingText}
            explorationProgress={explorationProgress}
            knightHp={combatState?.knightHp ?? 200}
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
              stage={currentStage}
              currentEncounterIndex={currentEncounterIndex}
              totalEncounters={currentStage.encounters.length}
              explorationProgress={explorationProgress}
              onOpenCodex={() => setIsCodexOpen(true)}
              onOpenStageSelect={() => setIsStageSelectOpen(true)}
              onOpenProfile={() => setIsProfileOpen(true)}
            />
          )}
        </section>
      </main>

      {/* Modals & Dialogs */}
      {isVictoryOpen && combatState && (
        <VictoryBanner
          isOpen={isVictoryOpen}
          targetWord={combatState.targetEntry}
          enemy={combatState.enemy}
          attemptsUsed={combatState.guesses.length}
          pointsEarned={combatState.earnedPoints}
          isBoss={combatState.enemy.type === 'boss'}
          onContinue={handleVictoryContinue}
        />
      )}

      {isDefeatOpen && combatState && (
        <DefeatModal
          isOpen={isDefeatOpen}
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
        onSelectDifficultyAndStage={handleSelectDifficultyAndStage}
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
