import React, { useEffect, useState } from 'react';
import { DifficultyLevel, GameMode, PlayerProfile } from '../../types/game';
import {
  CAMPAIGN_TOTAL_STAGES,
  DIFFICULTY_THRESHOLDS,
  STAGES_BY_DIFFICULTY,
} from '../../data/stages';
import {
  Map,
  Lock,
  CheckCircle2,
  ChevronRight,
  X,
  Swords,
  Crown,
  Infinity as InfinityIcon,
} from 'lucide-react';
import { soundEngine } from '../../utils/sound';
import { isCampaignStageUnlocked } from '../../utils/storage';

interface StageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  gameMode: GameMode;
  onSelectDifficultyAndStage: (difficulty: DifficultyLevel, stageId: number) => void;
  onSelectEndlessDifficulty: (difficulty: DifficultyLevel) => void;
}

export const StageSelectModal: React.FC<StageSelectModalProps> = ({
  isOpen,
  onClose,
  profile,
  gameMode,
  onSelectDifficultyAndStage,
  onSelectEndlessDifficulty,
}) => {
  const [activeTabMode, setActiveTabMode] = useState<GameMode>(gameMode);
  const [selectedTier, setSelectedTier] = useState<DifficultyLevel>(profile.currentDifficulty);

  useEffect(() => {
    if (isOpen) {
      setActiveTabMode(gameMode);
      setSelectedTier(profile.currentDifficulty);
    }
  }, [isOpen, gameMode, profile.currentDifficulty]);

  if (!isOpen) return null;

  const currentDiff = profile.currentDifficulty;

  const handleSelectCampaignStage = (diff: DifficultyLevel, stageId: number) => {
    soundEngine.playKeyClick();
    onSelectDifficultyAndStage(diff, stageId);
    onClose();
  };

  const handleSelectEndlessTier = (diff: DifficultyLevel) => {
    soundEngine.playKeyClick();
    onSelectEndlessDifficulty(diff);
    onClose();
  };

  const tierMetaMap = {
    easy: {
      label: 'EASY',
      title: 'BOOK I: EASY REALM — COMMON VOCABULARY',
      desc: 'Common high-frequency English words. Defend the Frontier villages and recover the Crown of Dawn.',
      color: 'border-emerald-500/60 bg-emerald-950/20 text-emerald-400',
      badge: 'bg-emerald-900/60 text-emerald-300 border-emerald-500',
      tabActive: 'bg-emerald-900/80 border-emerald-400 text-emerald-200',
    },
    medium: {
      label: 'MEDIUM',
      title: 'BOOK II: MEDIUM REALM — ACADEMIC VOCABULARY',
      desc: 'Intermediate and academic vocabulary. Cross the cursed Heartlands to reclaim the Crown of Wisdom.',
      color: 'border-sky-500/60 bg-sky-950/20 text-sky-400',
      badge: 'bg-sky-900/60 text-sky-300 border-sky-500',
      tabActive: 'bg-sky-900/80 border-sky-400 text-sky-200',
    },
    hard: {
      label: 'HARD',
      title: 'BOOK III: HARD REALM — ARCANE VOCABULARY',
      desc: 'Advanced and arcane vocabulary. Storm the Astral Citadel, defeat Archon Vexalor, and save Aethelgard!',
      color: 'border-rose-500/60 bg-rose-950/20 text-rose-400',
      badge: 'bg-rose-900/60 text-rose-300 border-rose-500',
      tabActive: 'bg-rose-900/80 border-rose-400 text-rose-200',
    },
  } as const;

  const activeTierUnlocked = profile.unlockedDifficulties.includes(selectedTier);
  const activeTierThreshold = DIFFICULTY_THRESHOLDS[selectedTier];
  const activeStages = STAGES_BY_DIFFICULTY[selectedTier];
  const activeCurrentStageId = profile.stageProgress[selectedTier]?.currentStage || 1;
  const activeCleared = new Set(profile.campaignCompletedStages[selectedTier] || []);
  const activeMeta = tierMetaMap[selectedTier];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#141224] border-4 border-[#3b385e] rounded-lg shadow-[0_0_35px_rgba(0,0,0,0.9)] pixel-border flex flex-col overflow-hidden text-gray-200">
        {/* Header */}
        <div className="p-4 bg-[#1b1932] border-b-2 border-[#3b385e] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 border border-emerald-400 rounded text-emerald-400 shrink-0">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-lg font-pixel text-emerald-400">
                REALMS &amp; GAME MODES
              </h2>
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-silkscreen">
                Switch between 20-Stage Campaign Story or Endless Vocabulary Survival
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded border border-slate-600 cursor-pointer shrink-0"
            aria-label="Close Realm Map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-[#18162c] border-b border-[#2d2a4a]">
          <button
            type="button"
            onClick={() => {
              soundEngine.playKeyClick();
              setActiveTabMode('campaign');
            }}
            className={`pixel-btn py-2 px-3 rounded border font-pixel text-[9px] sm:text-[11px] flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTabMode === 'campaign'
                ? 'bg-amber-900/70 border-amber-400 text-amber-200 shadow-pixel-gold'
                : 'bg-slate-900 border-slate-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>CAMPAIGN (20 STAGES)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playKeyClick();
              setActiveTabMode('endless');
            }}
            className={`pixel-btn py-2 px-3 rounded border font-pixel text-[9px] sm:text-[11px] flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTabMode === 'endless'
                ? 'bg-sky-900/70 border-cyan-400 text-cyan-200 shadow-pixel'
                : 'bg-slate-900 border-slate-700 text-gray-400 hover:text-gray-200'
            }`}
          >
            <InfinityIcon className="w-3.5 h-3.5 text-cyan-300" />
            <span>ENDLESS SURVIVAL</span>
          </button>
        </div>

        {activeTabMode === 'campaign' ? (
          <>
            {/* Campaign Points & Difficulty Tier Selector */}
            <div className="px-4 py-2.5 bg-[#121024] border-b border-[#2d2a4a] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto">
                {(['easy', 'medium', 'hard'] as const).map((tier) => {
                  const unlocked = profile.unlockedDifficulties.includes(tier);
                  const cleared = profile.campaignCompletedStages[tier]?.length || 0;
                  const meta = tierMetaMap[tier];

                  return (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => {
                        soundEngine.playKeyClick();
                        setSelectedTier(tier);
                      }}
                      className={`px-2.5 py-1.5 rounded border font-pixel text-[9px] sm:text-[10px] cursor-pointer flex items-center justify-center gap-1 transition-all ${
                        selectedTier === tier
                          ? meta.tabActive
                          : 'bg-slate-900 border-slate-700 text-gray-400 hover:border-slate-500'
                      }`}
                    >
                      {!unlocked && <Lock className="w-3 h-3 text-amber-400" />}
                      <span>{meta.label}</span>
                      <span className="text-[8px] opacity-80">
                        ({cleared}/{CAMPAIGN_TOTAL_STAGES})
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="text-[10px] font-pixel text-amber-300 whitespace-nowrap">
                {profile.totalPoints.toLocaleString()} PTS
              </div>
            </div>

            {/* Active Difficulty 20-Stage Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className={`rounded-lg border-2 p-3.5 ${activeMeta.color}`}>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-pixel text-xs sm:text-sm font-bold">
                        {activeMeta.title}
                      </span>
                      {gameMode === 'campaign' && currentDiff === selectedTier && (
                        <span className="bg-amber-400 text-black font-pixel text-[8px] px-2 py-0.5 rounded font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300 mt-0.5">{activeMeta.desc}</p>
                    <p className="text-[10px] font-pixel text-amber-300 mt-1.5">
                      HEROIC QUEST: FREE ALL {CAMPAIGN_TOTAL_STAGES} GUARDIANS ({activeCleared.size}/{CAMPAIGN_TOTAL_STAGES} SAVED)
                    </p>
                    <p className="text-[10px] text-gray-400 font-silkscreen mt-0.5">
                      Defeat each stage&apos;s boss to unlock the next stage.
                    </p>
                  </div>

                  {!activeTierUnlocked ? (
                    <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded text-amber-400 border border-slate-700 shrink-0 font-pixel text-[9px]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{Math.max(0, activeTierThreshold - profile.totalPoints)} PTS NEEDED</span>
                    </div>
                  ) : (
                    <span
                      className={`text-[9px] font-pixel uppercase px-2 py-0.5 rounded border shrink-0 ${activeMeta.badge}`}
                    >
                      UNLOCKED
                    </span>
                  )}
                </div>

                {activeTierUnlocked ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {activeStages.map((stg) => {
                      const isStageUnlocked = isCampaignStageUnlocked(
                        profile,
                        selectedTier,
                        stg.id
                      );
                      const isCurrent =
                        isStageUnlocked &&
                        gameMode === 'campaign' &&
                        currentDiff === selectedTier &&
                        activeCurrentStageId === stg.id;
                      const isCleared = activeCleared.has(stg.id);
                      const bossEnemy = stg.encounters[stg.encounters.length - 1];

                      return (
                        <button
                          key={stg.id}
                          type="button"
                          disabled={!isStageUnlocked}
                          onClick={() => {
                            if (isStageUnlocked) {
                              handleSelectCampaignStage(selectedTier, stg.id);
                            }
                          }}
                          title={
                            isStageUnlocked
                              ? `Play Stage ${stg.id}: ${stg.name}`
                              : `Locked — Finish Stage ${stg.id - 1} first to unlock`
                          }
                          className={`text-left p-2.5 rounded border transition-all flex flex-col justify-between ${
                            !isStageUnlocked
                              ? 'bg-slate-950/75 border-slate-800/80 text-gray-500 cursor-not-allowed opacity-70'
                              : isCurrent
                              ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)] cursor-pointer'
                              : isCleared
                              ? 'bg-emerald-950/35 border-emerald-500/50 hover:border-emerald-400 cursor-pointer'
                              : 'bg-[#18162e] border-slate-700 hover:border-slate-500 cursor-pointer'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span
                                className={`font-pixel text-[9px] ${
                                  isStageUnlocked ? 'text-amber-300' : 'text-gray-500'
                                }`}
                              >
                                STAGE {stg.id}/{CAMPAIGN_TOTAL_STAGES}
                              </span>
                              {!isStageUnlocked ? (
                                <span className="text-[8px] font-pixel text-amber-400/80 flex items-center gap-0.5">
                                  <Lock className="w-3 h-3" /> LOCKED
                                </span>
                              ) : isCurrent ? (
                                <span className="text-[8px] font-pixel text-amber-300">HERE</span>
                              ) : isCleared ? (
                                <span className="text-[8px] font-pixel text-emerald-400 flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" /> SLAIN
                                </span>
                              ) : null}
                            </div>
                            <h4
                              className={`font-pixel text-[11px] mb-0.5 truncate ${
                                isStageUnlocked ? 'text-white' : 'text-gray-400'
                              }`}
                            >
                              {stg.name}
                            </h4>
                            {stg.chapter && (
                              <div
                                className={`text-[9px] font-silkscreen mb-1 ${
                                  isStageUnlocked ? 'text-sky-300/80' : 'text-gray-600'
                                }`}
                              >
                                {stg.chapter}
                              </div>
                            )}
                            <p
                              className={`text-[10px] line-clamp-2 ${
                                isStageUnlocked ? 'text-gray-400' : 'text-gray-500'
                              }`}
                            >
                              {stg.description}
                            </p>
                          </div>

                          <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-gray-400">
                            <span
                              className={`flex items-center gap-1 truncate pr-1 ${
                                isStageUnlocked ? 'text-rose-400' : 'text-gray-600'
                              }`}
                            >
                              <Swords className="w-3 h-3 shrink-0" />
                              <span className="truncate">{bossEnemy.name}</span>
                            </span>
                            {isStageUnlocked ? (
                              <span className="text-amber-400 flex items-center shrink-0">
                                PLAY <ChevronRight className="w-3 h-3 ml-0.5" />
                              </span>
                            ) : (
                              <span className="text-gray-500 flex items-center gap-0.5 font-pixel text-[8px] shrink-0">
                                <Lock className="w-2.5 h-2.5" />
                                STG {stg.id - 1}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 bg-black/40 rounded border border-slate-800 text-xs text-gray-400 flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      Earn {activeTierThreshold.toLocaleString()} total accumulated points to break the seal on the {selectedTier.toUpperCase()} Campaign Realm!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Endless Survival Mode Difficulty Picker (No Stages) */
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="rounded-lg border border-cyan-500/40 bg-sky-950/30 p-3 text-xs text-sky-100">
              <div className="font-pixel text-[10px] text-cyan-300 mb-1 flex items-center gap-1.5">
                <InfinityIcon className="w-4 h-4" />
                ENDLESS VOCABULARY SURVIVAL — NO STAGES
              </div>
              <p className="text-[11px] text-gray-300 font-silkscreen">
                Battle infinite waves of random monsters (with Boss waves every 5 rounds). Your HP carries across waves—crack words cleanly to restore HP (+30 HP, or +60 HP on a 1st-try Elemental Finisher) and sharpen your vocabulary!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(['easy', 'medium', 'hard'] as const).map((tier) => {
                const meta = tierMetaMap[tier];
                const bestWave = profile.endlessBestWave[tier] || 0;
                const isActive = gameMode === 'endless' && currentDiff === tier;

                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => handleSelectEndlessTier(tier)}
                    className={`text-left rounded-lg border-2 p-4 flex flex-col justify-between transition-all cursor-pointer ${
                      isActive
                        ? 'border-cyan-400 bg-sky-950/45 shadow-[0_0_16px_rgba(56,189,248,0.3)]'
                        : `${meta.color} hover:brightness-110`
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-pixel text-sm font-bold">{meta.label}</span>
                        {isActive && (
                          <span className="bg-cyan-400 text-black font-pixel text-[8px] px-1.5 py-0.5 rounded font-bold">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-300 leading-relaxed mb-3">
                        {meta.desc}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px] font-pixel">
                      <span className="text-amber-300">BEST: WAVE {bestWave}</span>
                      <span className="text-cyan-300 flex items-center">
                        PLAY <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
