import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Crown,
  Flame,
  Infinity as InfinityIcon,
  Lock,
  Play,
  Snowflake,
  Sparkles,
  Swords,
} from 'lucide-react';
import {
  CharacterGender,
  DifficultyLevel,
  GameMode,
  KnightAnimState,
} from '../../types/game';
import { KNIGHT_SKILLS } from '../../data/knightSkills';
import { CAMPAIGN_TOTAL_STAGES, DIFFICULTY_THRESHOLDS } from '../../data/stages';
import { PixelKnight } from '../pixel/PixelKnight';
import { soundEngine } from '../../utils/sound';

interface CharacterSelectScreenProps {
  gameMode: GameMode;
  selectedGender: CharacterGender;
  selectedDifficulty: DifficultyLevel;
  unlockedDifficulties: DifficultyLevel[];
  campaignProgressLabel: string;
  endlessBestWave: number;
  onSelectGender: (gender: CharacterGender) => void;
  onSelectDifficulty: (diff: DifficultyLevel) => void;
  onConfirm: () => void;
  onBack: () => void;
}

const GENDERS: readonly CharacterGender[] = ['male', 'female'];
const DIFFICULTIES: readonly {
  id: DifficultyLevel;
  label: string;
  sub: string;
  activeClass: string;
}[] = [
  {
    id: 'easy',
    label: 'EASY',
    sub: 'Common Words',
    activeClass: 'bg-emerald-900/70 border-emerald-400 text-emerald-200',
  },
  {
    id: 'medium',
    label: 'MEDIUM',
    sub: 'Academic Words',
    activeClass: 'bg-sky-900/70 border-sky-400 text-sky-200',
  },
  {
    id: 'hard',
    label: 'HARD',
    sub: 'Arcane Words',
    activeClass: 'bg-rose-900/70 border-rose-400 text-rose-200',
  },
];

export const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({
  gameMode,
  selectedGender,
  selectedDifficulty,
  unlockedDifficulties,
  campaignProgressLabel,
  endlessBestWave,
  onSelectGender,
  onSelectDifficulty,
  onConfirm,
  onBack,
}) => {
  const [previewGender, setPreviewGender] = useState<CharacterGender | null>(null);
  const previewTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (previewTimerRef.current !== null) {
        window.clearTimeout(previewTimerRef.current);
      }
    };
  }, []);

  const triggerSkillPreview = (gender: CharacterGender) => {
    if (previewTimerRef.current !== null) {
      window.clearTimeout(previewTimerRef.current);
    }
    setPreviewGender(gender);
    if (gender === 'male') {
      soundEngine.playBurn();
    } else {
      soundEngine.playFreeze();
    }
    previewTimerRef.current = window.setTimeout(() => {
      setPreviewGender(null);
      previewTimerRef.current = null;
    }, 850);
  };

  const handleCardSelect = (gender: CharacterGender) => {
    soundEngine.playKeyClick();
    onSelectGender(gender);
  };

  const activeSkill = KNIGHT_SKILLS[selectedGender];
  const isCampaign = gameMode === 'campaign';

  return (
    <main className="relative min-h-screen min-h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#0b0a14] text-gray-100 flex items-center justify-center px-3 sm:px-6 py-5 sm:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(249,115,22,0.12),transparent_42%),radial-gradient(circle_at_75%_25%,rgba(56,189,248,0.14),transparent_42%),linear-gradient(180deg,#141224_0%,#0b0a14_82%)] pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-35 pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl animate-[popIn_0.35s_ease-out]">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            type="button"
            onClick={() => {
              soundEngine.playKeyClick();
              onBack();
            }}
            className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 px-3 py-1.5 rounded text-[9px] sm:text-[10px] font-pixel cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            BACK
          </button>

          <div
            className={`flex items-center gap-1.5 font-pixel text-[9px] sm:text-[10px] tracking-[0.16em] ${
              isCampaign ? 'text-amber-300' : 'text-cyan-300'
            }`}
          >
            {isCampaign ? <Crown className="w-4 h-4" /> : <InfinityIcon className="w-4 h-4" />}
            <span>{isCampaign ? 'CAMPAIGN MODE' : 'ENDLESS MODE'}</span>
          </div>
        </div>

        {/* Selection Panel */}
        <div className="pixel-border bg-[#141224]/95 rounded-lg p-4 sm:p-6">
          {/* Mode Lore & Objective Banner */}
          <div
            className={`rounded-lg border p-3 mb-4 text-left ${
              isCampaign
                ? 'bg-amber-950/35 border-amber-500/50'
                : 'bg-sky-950/35 border-cyan-500/50'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <span
                className={`font-pixel text-[10px] sm:text-xs flex items-center gap-1.5 ${
                  isCampaign ? 'text-amber-300' : 'text-cyan-300'
                }`}
              >
                <Swords className="w-3.5 h-3.5 shrink-0" />
                {isCampaign
                  ? 'STORY MISSION: CLAIM ALL BOSSES’ POWER'
                  : 'ENDLESS SURVIVAL: MASTER VOCABULARY'}
              </span>
              <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-black/50 text-gray-200 border border-slate-600">
                {isCampaign
                  ? campaignProgressLabel
                  : `BEST WAVE (${selectedDifficulty.toUpperCase()}): ${endlessBestWave}`}
              </span>
            </div>
            <p className="font-silkscreen text-[10px] sm:text-[11px] text-gray-300 leading-snug">
              {isCampaign
                ? `Driven by an insatiable hunger for power, march through all ${CAMPAIGN_TOTAL_STAGES} stages and conquer every Sovereign Boss.`
                : 'No stage limits—crack words continuously to heal, build streaks, and survive infinite waves!'}
            </p>
          </div>

          {/* Vocabulary Level Picker */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-pixel text-[9px] text-gray-400">
                {isCampaign ? 'CAMPAIGN REALM LEVEL' : 'ENDLESS VOCABULARY LEVEL'}
              </span>
              <span className="font-silkscreen text-[10px] text-gray-400">
                {isCampaign ? '20 Stages per Level' : 'All Levels Open for Practice'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DIFFICULTIES.map((d) => {
                const isLocked =
                  isCampaign && !unlockedDifficulties.includes(d.id);
                const isSelected = selectedDifficulty === d.id;

                return (
                  <button
                    key={d.id}
                    type="button"
                    disabled={isLocked}
                    onClick={() => {
                      soundEngine.playKeyClick();
                      onSelectDifficulty(d.id);
                    }}
                    className={`p-2 rounded border text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                      isLocked
                        ? 'bg-slate-900/50 border-slate-800 text-gray-500 cursor-not-allowed'
                        : isSelected
                        ? `${d.activeClass} cursor-pointer shadow-sm`
                        : 'bg-slate-900/80 border-slate-700 text-gray-300 hover:border-slate-500 cursor-pointer'
                    }`}
                  >
                    <div className="font-pixel text-[9px] sm:text-[10px] flex items-center justify-center gap-1">
                      {isLocked && <Lock className="w-3 h-3 text-amber-400" />}
                      <span>{d.label}</span>
                    </div>
                    <div className="font-silkscreen text-[9px] opacity-80 mt-0.5">
                      {isLocked ? `${DIFFICULTY_THRESHOLDS[d.id]} PTS` : d.sub}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-center mb-3 sm:mb-4">
            <h1 className="font-pixel text-sm sm:text-lg text-amber-300 tracking-wide mb-1">
              SELECT YOUR KNIGHT &amp; ELEMENTAL BLADE
            </h1>
            <p className="font-silkscreen text-[10px] sm:text-xs text-gray-300">
              Solve any word on your <span className="text-amber-300 font-bold">1st Try</span> to
              unleash your Knight&apos;s signature elemental sword magic!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
            {GENDERS.map((gender) => {
              const info = KNIGHT_SKILLS[gender];
              const isSelected = selectedGender === gender;
              const isFire = info.magicType === 'fire';
              const spriteState: KnightAnimState =
                previewGender === gender ? 'ultimate' : 'idle';

              return (
                <div
                  key={gender}
                  onClick={() => handleCardSelect(gender)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardSelect(gender);
                    }
                  }}
                  className={`relative rounded-lg border-2 p-3.5 sm:p-4 flex flex-col justify-between transition-all cursor-pointer focus:outline-none focus:ring-2 ${
                    isSelected
                      ? isFire
                        ? 'border-orange-400 bg-gradient-to-b from-orange-950/55 via-[#1b1932] to-red-950/40 shadow-[0_0_20px_rgba(249,115,22,0.35)] focus:ring-orange-300'
                        : 'border-sky-400 bg-gradient-to-b from-sky-950/55 via-[#1b1932] to-cyan-950/40 shadow-[0_0_20px_rgba(56,189,248,0.35)] focus:ring-sky-300'
                      : 'border-slate-700/90 bg-slate-900/70 hover:border-slate-500 focus:ring-amber-300'
                  }`}
                >
                  {/* Top Title & Selected Pill */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h2 className="font-pixel text-xs sm:text-sm text-white">
                        {info.title}
                      </h2>
                      <p
                        className={`font-silkscreen text-[10px] ${
                          isFire ? 'text-orange-300' : 'text-sky-300'
                        }`}
                      >
                        {info.archetype}
                      </p>
                    </div>
                    {isSelected && (
                      <span
                        className={`font-pixel text-[8px] px-2 py-0.5 rounded font-bold shrink-0 ${
                          isFire
                            ? 'bg-orange-400 text-black'
                            : 'bg-sky-400 text-black'
                        }`}
                      >
                        SELECTED
                      </span>
                    )}
                  </div>

                  {/* Knight Sprite Stage Preview */}
                  <div
                    className={`relative h-28 sm:h-32 rounded border flex items-center justify-center overflow-hidden mb-3 ${
                      isFire
                        ? 'bg-gradient-to-b from-[#231115] to-[#120b14] border-orange-500/40'
                        : 'bg-gradient-to-b from-[#0d1d2f] to-[#0b1020] border-sky-500/40'
                    }`}
                  >
                    <div
                      className={`absolute inset-x-8 bottom-3 h-4 rounded-full opacity-45 pointer-events-none ${
                        isFire ? 'bg-orange-500/40' : 'bg-cyan-400/40'
                      }`}
                    />
                    <PixelKnight gender={gender} state={spriteState} size={106} />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardSelect(gender);
                        triggerSkillPreview(gender);
                      }}
                      className={`pixel-btn absolute bottom-2 right-2 px-2 py-1 rounded text-[8px] font-pixel border cursor-pointer ${
                        isFire
                          ? 'bg-orange-950/90 hover:bg-orange-800 text-amber-200 border-orange-400'
                          : 'bg-sky-950/90 hover:bg-sky-800 text-cyan-100 border-sky-400'
                      }`}
                      aria-label={`Preview ${info.title} ${info.skillName} ability`}
                    >
                      <Sparkles className="w-2.5 h-2.5 mr-1" />
                      PREVIEW
                    </button>
                  </div>

                  {/* Elemental Sword Ability Box */}
                  <div
                    className={`rounded border p-2.5 text-left ${
                      isFire
                        ? 'bg-orange-950/45 border-orange-500/50'
                        : 'bg-sky-950/45 border-sky-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <span
                        className={`font-pixel text-[9px] sm:text-[10px] flex items-center gap-1 ${
                          isFire ? 'text-orange-300' : 'text-sky-300'
                        }`}
                      >
                        {isFire ? (
                          <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        ) : (
                          <Snowflake className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                        )}
                        {info.skillName}
                      </span>
                      <span className="font-pixel text-[7px] px-1.5 py-0.5 rounded bg-black/50 text-amber-300 border border-amber-400/40 shrink-0">
                        1ST TRY
                      </span>
                    </div>

                    <p className="font-silkscreen text-[10px] text-gray-200 leading-snug mb-1.5">
                      {info.shortDesc}
                    </p>

                    <div
                      className={`text-[9px] font-pixel flex items-center gap-1 ${
                        isFire ? 'text-rose-300' : 'text-cyan-200'
                      }`}
                    >
                      <span>FINISHER:</span>
                      <span>ENEMY {info.deathEffectLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Confirm & Enter Game */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#3b385e]">
            <div className="text-center sm:text-left">
              <div className="font-pixel text-[9px] text-gray-400">
                {isCampaign
                  ? `CAMPAIGN · ${selectedDifficulty.toUpperCase()} REALM`
                  : `ENDLESS · ${selectedDifficulty.toUpperCase()} VOCABULARY`}
              </div>
              <div
                className="font-pixel text-[10px] sm:text-xs"
                style={{ color: activeSkill.accentColor }}
              >
                {activeSkill.title} · {activeSkill.magicLabel}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEngine.playUnlockSound();
                onConfirm();
              }}
              className={`pixel-btn w-full sm:w-auto px-6 py-3 rounded font-pixel text-[10px] sm:text-xs text-white border cursor-pointer ${
                activeSkill.magicType === 'fire'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 border-amber-300 shadow-pixel-gold'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-sky-200 shadow-pixel'
              }`}
            >
              <Play className="w-4 h-4 mr-2" />
              {isCampaign ? 'BEGIN CAMPAIGN' : 'START ENDLESS'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
