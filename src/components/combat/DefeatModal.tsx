import React from 'react';
import { WordEntry } from '../../types/game';
import { RotateCcw, BookOpen, AlertOctagon } from 'lucide-react';

interface DefeatModalProps {
  isOpen: boolean;
  targetWord: WordEntry;
  onRetry: () => void;
  onOpenCodex?: () => void;
}

export const DefeatModal: React.FC<DefeatModalProps> = ({
  isOpen,
  targetWord,
  onRetry,
  onOpenCodex,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-md bg-[#161426] border-4 border-rose-600 rounded-lg p-5 sm:p-6 shadow-[0_0_30px_rgba(225,29,72,0.5)] pixel-border-crimson text-center">
        {/* Skull / Defeat Icon */}
        <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center rounded-full bg-rose-950 border-2 border-rose-500 text-rose-400">
          <AlertOctagon className="w-8 h-8 animate-pulse" />
        </div>

        {/* Defeat Title */}
        <h2 className="text-xl sm:text-2xl font-pixel text-rose-400 tracking-wider mb-1">
          GAME OVER
        </h2>
        <p className="text-xs text-rose-200/80 mb-4 font-silkscreen">
          Your HP reached zero! The enemy struck you down.
        </p>

        {/* Learning Reveal Card */}
        <div className="bg-[#211d38] border-2 border-rose-500/50 rounded p-4 text-left mb-4 shadow-inner">
          <div className="text-[10px] text-amber-400 font-pixel uppercase tracking-widest mb-1 flex items-center justify-between">
            <span>REVEALED TARGET WORD</span>
            <span className="text-[9px] bg-rose-900/60 px-2 py-0.5 rounded text-rose-300">
              {targetWord.difficulty.toUpperCase()}
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-pixel text-2xl sm:text-3xl font-bold tracking-widest text-emerald-400">
              {targetWord.word}
            </span>
            <span className="text-xs text-gray-400 italic font-mono">
              ({targetWord.partOfSpeech})
            </span>
          </div>

          <p className="text-sm text-gray-200 mb-2 leading-relaxed">
            {targetWord.definition}
          </p>

          <div className="text-xs text-amber-200/90 border-l-2 border-amber-400 pl-2 italic">
            "{targetWord.example}"
          </div>
        </div>

        {/* Penalty & Forced Retry Explanation */}
        <div className="bg-rose-950/40 border border-rose-800/60 rounded px-3 py-2 text-xs text-rose-300 mb-5 text-left">
          <div className="font-pixel text-[10px] text-rose-400 mb-0.5 flex items-center gap-1">
            <span>⚠️ STAGE RESET PENALTY</span>
          </div>
          The stage restarts from the beginning with brand new random words for every enemy, including the boss. Clear it to move on!
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 pixel-btn bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-pixel text-xs py-3 px-4 rounded shadow-pixel cursor-pointer flex items-center justify-center gap-2 border border-rose-400 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            RETRY STAGE
          </button>

          {onOpenCodex && (
            <button
              type="button"
              onClick={onOpenCodex}
              className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-300 font-pixel text-[10px] py-2.5 px-3 rounded shadow-pixel border border-slate-600 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              VIEW CODEX
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
