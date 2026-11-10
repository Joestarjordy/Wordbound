import React from 'react';
import { Enemy, WordEntry } from '../../types/game';
import { Award, BookCheck, ArrowRight, Sparkles } from 'lucide-react';

interface VictoryBannerProps {
  isOpen: boolean;
  targetWord: WordEntry;
  enemy: Enemy;
  attemptsUsed: number;
  pointsEarned: number;
  isBoss: boolean;
  onContinue: () => void;
}

export const VictoryBanner: React.FC<VictoryBannerProps> = ({
  isOpen,
  targetWord,
  enemy,
  attemptsUsed,
  pointsEarned,
  isBoss,
  onContinue,
}) => {
  if (!isOpen) return null;

  // Attempt praise rank
  let praise = 'GREAT VICTORY!';
  if (attemptsUsed === 1) praise = 'GENIUS! 1-SHOT CRITICAL!';
  else if (attemptsUsed === 2) praise = 'MASTERFUL TACTICS!';
  else if (attemptsUsed === 3) praise = 'HEROIC STRIKE!';
  else if (attemptsUsed === 4) praise = 'CLOSE COMBAT WIN!';
  else praise = 'CLUTCH SURVIVAL!';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]">
      <div className="relative w-full max-w-md bg-[#131b2e] border-4 border-amber-400 rounded-lg p-5 sm:p-6 shadow-[0_0_35px_rgba(251,191,36,0.5)] pixel-border-gold text-center">
        {/* Victory Trophy / Crest */}
        <div className="w-14 h-14 mx-auto mb-2 flex items-center justify-center rounded-full bg-amber-950/80 border-2 border-amber-400 text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.6)]">
          <Award className="w-8 h-8 animate-bounce-gentle" />
        </div>

        {/* Victory Title */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-amber-300 font-pixel mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{praise}</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="text-xl sm:text-2xl font-pixel text-amber-400 tracking-wider mb-3">
          {enemy.name.toUpperCase()} DEFEATED!
        </h2>

        {/* Word Learnt & Added to Codex */}
        <div className="bg-[#1b2540] border-2 border-amber-400/40 rounded p-4 text-left mb-4 shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-amber-300 font-pixel mb-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <BookCheck className="w-3.5 h-3.5" />
              ADDED TO VOCABULARY CODEX
            </span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-gray-300 uppercase">
              {targetWord.difficulty}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="font-pixel text-2xl sm:text-3xl font-bold tracking-widest text-emerald-400">
              {targetWord.word}
            </span>
            <span className="text-xs text-gray-400 italic font-mono">
              ({targetWord.partOfSpeech})
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-200 mb-2 leading-relaxed">
            {targetWord.definition}
          </p>

          <div className="text-xs text-amber-200/90 border-l-2 border-amber-400 pl-2 italic">
            "{targetWord.example}"
          </div>
        </div>

        {/* Points Reward Breakdown */}
        <div className="bg-slate-900/80 border border-amber-400/30 rounded p-3 text-xs mb-5">
          <div className="flex justify-between items-center text-gray-300 mb-1">
            <span>Attempts Used:</span>
            <span className="font-pixel text-amber-300">{attemptsUsed} / 4</span>
          </div>
          <div className="flex justify-between items-center text-gray-300 mb-1">
            <span>Attempt Speed Bonus:</span>
            <span className="font-pixel text-emerald-400">
              +{Math.max(50, (6 - attemptsUsed) * 100)} PTS
            </span>
          </div>
          {isBoss && (
            <div className="flex justify-between items-center text-rose-400 mb-1">
              <span>Boss Slayer Multiplier:</span>
              <span className="font-pixel">x{enemy.pointMultiplier.toFixed(1)}</span>
            </div>
          )}
          <div className="pt-2 border-t border-slate-700 flex justify-between items-center font-pixel text-sm">
            <span className="text-amber-400">REWARD EARNED:</span>
            <span className="text-amber-300 text-base sm:text-lg">+{pointsEarned} PTS</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="button"
          onClick={onContinue}
          className="w-full pixel-btn bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-pixel text-xs py-3 px-4 rounded shadow-pixel cursor-pointer flex items-center justify-center gap-2 border border-emerald-400 active:scale-95 transition-all"
        >
          <span>RESUME AUTO-JOURNEY</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
