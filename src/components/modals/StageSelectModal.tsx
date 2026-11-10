import React from 'react';
import { DifficultyLevel, PlayerProfile } from '../../types/game';
import { DIFFICULTY_THRESHOLDS, STAGES_BY_DIFFICULTY } from '../../data/stages';
import { Map, Lock, CheckCircle2, ChevronRight, X, Swords } from 'lucide-react';
import { soundEngine } from '../../utils/sound';

interface StageSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onSelectDifficultyAndStage: (difficulty: DifficultyLevel, stageId: number) => void;
}

export const StageSelectModal: React.FC<StageSelectModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSelectDifficultyAndStage,
}) => {
  if (!isOpen) return null;

  const currentDiff = profile.currentDifficulty;

  const handleSelect = (diff: DifficultyLevel, stageId: number) => {
    soundEngine.playKeyClick();
    onSelectDifficultyAndStage(diff, stageId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#141224] border-4 border-[#3b385e] rounded-lg shadow-[0_0_35px_rgba(0,0,0,0.9)] pixel-border flex flex-col overflow-hidden text-gray-200">
        {/* Header */}
        <div className="p-4 bg-[#1b1932] border-b-2 border-[#3b385e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 border border-emerald-400 rounded text-emerald-400">
              <Map className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-pixel text-emerald-400">
                STAGE & DIFFICULTY REALMS
              </h2>
              <p className="text-[11px] text-gray-400 font-silkscreen">
                Switch freely between unlocked realms or farm points in Easy
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded border border-slate-600 cursor-pointer"
            aria-label="Close Realm Map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Accumulated Points Progress Strip */}
        <div className="bg-[#18162c] px-4 py-3 border-b border-[#2d2a4a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
          <div>
            <span className="text-[10px] text-gray-400 font-pixel">YOUR ACCUMULATED POINTS:</span>
            <div className="font-pixel text-amber-400 text-base sm:text-lg">
              {profile.totalPoints.toLocaleString()} PTS
            </div>
          </div>

          {/* Unlock milestones overview */}
          <div className="flex items-center gap-2 text-[10px]">
            <div className="bg-slate-900 px-2 py-1 rounded border border-emerald-500/50 text-emerald-300">
              Easy: Unlocked
            </div>
            <div
              className={`px-2 py-1 rounded border ${
                profile.unlockedDifficulties.includes('medium')
                  ? 'bg-slate-900 border-sky-500/50 text-sky-300'
                  : 'bg-slate-900/40 border-slate-700 text-gray-500'
              }`}
            >
              Medium: {DIFFICULTY_THRESHOLDS.medium} PTS
            </div>
            <div
              className={`px-2 py-1 rounded border ${
                profile.unlockedDifficulties.includes('hard')
                  ? 'bg-slate-900 border-rose-500/50 text-rose-300'
                  : 'bg-slate-900/40 border-slate-700 text-gray-500'
              }`}
            >
              Hard: {DIFFICULTY_THRESHOLDS.hard} PTS
            </div>
          </div>
        </div>

        {/* Realm Tiers & Stages Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {(['easy', 'medium', 'hard'] as const).map((tier) => {
            const isUnlocked = profile.unlockedDifficulties.includes(tier);
            const threshold = DIFFICULTY_THRESHOLDS[tier];
            const stages = STAGES_BY_DIFFICULTY[tier];
            const currentStageId = profile.stageProgress[tier]?.currentStage || 1;
            const isCurrentTier = currentDiff === tier;

            const tierMeta = {
              easy: {
                title: 'EASY REALM - COMMON VOCABULARY',
                desc: 'Common high-frequency English words. Ideal for warming up, farming points, and steady progression.',
                color: 'border-emerald-500/60 bg-emerald-950/20 text-emerald-400',
                badge: 'bg-emerald-900/60 text-emerald-300 border-emerald-500',
              },
              medium: {
                title: 'MEDIUM REALM - ACADEMIC VOCABULARY',
                desc: 'Intermediate and academic vocabulary. Fiercer monsters and cunning bosses await.',
                color: 'border-sky-500/60 bg-sky-950/20 text-sky-400',
                badge: 'bg-sky-900/60 text-sky-300 border-sky-500',
              },
              hard: {
                title: 'HARD REALM - OBSCURE & SPECIALIZED VOCABULARY',
                desc: 'Obscure, archaic, and arcane 5-letter vocabulary. High risk, colossal point rewards!',
                color: 'border-rose-500/60 bg-rose-950/20 text-rose-400',
                badge: 'bg-rose-900/60 text-rose-300 border-rose-500',
              },
            }[tier];

            return (
              <div
                key={tier}
                className={`rounded-lg border-2 p-3.5 transition-all ${
                  isUnlocked
                    ? `${tierMeta.color} shadow-sm`
                    : 'border-slate-800 bg-slate-900/40 opacity-70'
                }`}
              >
                {/* Realm Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-sm sm:text-base font-bold">
                        {tierMeta.title}
                      </span>
                      {isCurrentTier && (
                        <span className="bg-amber-400 text-black font-pixel text-[9px] px-2 py-0.5 rounded font-bold">
                          ACTIVE REALM
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{tierMeta.desc}</p>
                  </div>

                  {!isUnlocked ? (
                    <div className="flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded text-xs text-amber-400 border border-slate-700 shrink-0 font-pixel text-[10px]">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{threshold - profile.totalPoints} PTS TO UNLOCK</span>
                    </div>
                  ) : (
                    <span
                      className={`text-[9px] font-pixel uppercase px-2 py-0.5 rounded border shrink-0 ${tierMeta.badge}`}
                    >
                      UNLOCKED
                    </span>
                  )}
                </div>

                {/* Stages List within this Difficulty */}
                {isUnlocked ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mt-3">
                    {stages.map((stg) => {
                      const isSelected = isCurrentTier && currentStageId === stg.id;
                      const bossEnemy = stg.encounters[stg.encounters.length - 1];

                      return (
                        <button
                          key={stg.id}
                          type="button"
                          onClick={() => handleSelect(tier, stg.id)}
                          className={`text-left p-2.5 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                              : 'bg-[#18162e] border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-pixel text-[10px] text-amber-300">
                                STAGE {stg.id}
                              </span>
                              {isSelected && (
                                <span className="text-[9px] font-pixel text-emerald-400 flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" /> HERE
                                </span>
                              )}
                            </div>
                            <h4 className="font-pixel text-xs text-white mb-1 truncate">
                              {stg.name}
                            </h4>
                            <p className="text-[11px] text-gray-400 line-clamp-2">
                              {stg.description}
                            </p>
                          </div>

                          <div className="mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-gray-400">
                            <span className="flex items-center gap-1 text-rose-400">
                              <Swords className="w-3 h-3" />
                              <span>Boss: {bossEnemy.name.split(' ')[0]}</span>
                            </span>
                            <span className="text-amber-400 flex items-center">
                              PLAY <ChevronRight className="w-3 h-3 ml-0.5" />
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-2 p-3 bg-black/40 rounded border border-slate-800 text-xs text-gray-400 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>
                      Earn {threshold} total accumulated points from Easy mode to break the seal on this realm!
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
