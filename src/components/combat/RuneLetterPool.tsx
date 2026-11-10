import React from 'react';
import { GuessEvaluation, LetterState, LetterTile } from '../../types/game';
import { soundEngine } from '../../utils/sound';
import { Swords, RotateCcw, Delete } from 'lucide-react';

interface RuneLetterPoolProps {
  letterPool: LetterTile[];
  keyboardStatus: Record<string, LetterState>;
  evaluations?: GuessEvaluation[][];
  onSelectLetter: (letter: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onEnter: () => void;
  disabled?: boolean;
  canSubmit: boolean;
}

export const RuneLetterPool: React.FC<RuneLetterPoolProps> = ({
  letterPool,
  keyboardStatus,
  evaluations = [],
  onSelectLetter,
  onBackspace,
  onClear,
  onEnter,
  disabled = false,
  canSubmit,
}) => {
  const handleLetterClick = (letter: string) => {
    if (disabled) return;
    soundEngine.playKeyClick();
    onSelectLetter(letter);
  };

  // Track max occurrences of each letter marked 'correct' or 'present' across any guess
  // This ensures that if duplicate letter tiles exist in the pool (e.g. 'P' and 'P'),
  // only the exact number of instances actually cracked by the player turn green/yellow,
  // preventing the duplicate letter from accidentally spilling/leaking to green.
  const maxCorrectPerLetter: Record<string, number> = {};
  const maxPresentOrCorrectPerLetter: Record<string, number> = {};

  if (evaluations.length > 0) {
    evaluations.forEach((guessRow) => {
      const correctInRow: Record<string, number> = {};
      const presentOrCorrectInRow: Record<string, number> = {};

      guessRow.forEach(({ letter, state }) => {
        if (!letter) return;
        if (state === 'correct') {
          correctInRow[letter] = (correctInRow[letter] || 0) + 1;
          presentOrCorrectInRow[letter] = (presentOrCorrectInRow[letter] || 0) + 1;
        } else if (state === 'present') {
          presentOrCorrectInRow[letter] = (presentOrCorrectInRow[letter] || 0) + 1;
        }
      });

      Object.entries(correctInRow).forEach(([char, count]) => {
        maxCorrectPerLetter[char] = Math.max(maxCorrectPerLetter[char] || 0, count);
      });
      Object.entries(presentOrCorrectInRow).forEach(([char, count]) => {
        maxPresentOrCorrectPerLetter[char] = Math.max(
          maxPresentOrCorrectPerLetter[char] || 0,
          count
        );
      });
    });
  }

  // Counter to track which instance of a letter we are rendering (e.g. 1st 'P' vs 2nd 'P')
  const letterSeenCount: Record<string, number> = {};

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-1 sm:gap-1.5 select-none px-1">
      {/* Header */}
      <div className="hidden sm:flex w-full items-center justify-center text-[9px] sm:text-[10px] text-gray-400 font-pixel">
        <span className="text-amber-400/90 flex items-center gap-1">
          <span>✨ RUNE TILES</span>
          <span className="text-gray-500 hidden sm:inline">(Tap letters to fill placeholders)</span>
        </span>
      </div>

      {/* Clickable Letter Boxes (Aligned strictly in 1 single horizontal row, centered, no wrap) */}
      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 w-full max-w-lg mx-auto px-0.5">
        {letterPool.map((tile, idx) => {
          const char = tile.letter;
          letterSeenCount[char] = (letterSeenCount[char] || 0) + 1;
          const instanceIndex = letterSeenCount[char];

          let evalState: LetterState | undefined;
          if (evaluations.length > 0) {
            const maxCorrect = maxCorrectPerLetter[char] || 0;
            const maxPresentOrCorrect = maxPresentOrCorrectPerLetter[char] || 0;

            if (instanceIndex <= maxCorrect) {
              evalState = 'correct';
            } else if (instanceIndex <= maxPresentOrCorrect) {
              evalState = 'present';
            } else if (keyboardStatus[char] === 'absent') {
              evalState = 'absent';
            }
          } else {
            evalState = instanceIndex === 1 ? keyboardStatus[char] : undefined;
          }

          let tileStyle =
            'bg-gradient-to-b from-slate-700 to-slate-800 border-slate-600 text-white shadow-pixel-sm hover:border-amber-400 hover:scale-105 active:scale-95';

          if (evalState === 'correct') {
            tileStyle =
              'bg-gradient-to-b from-emerald-600 to-emerald-700 border-emerald-400 text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]';
          } else if (evalState === 'present') {
            tileStyle =
              'bg-gradient-to-b from-amber-500 to-amber-600 border-amber-300 text-black shadow-[0_0_8px_rgba(245,158,11,0.5)]';
          } else if (evalState === 'absent') {
            tileStyle =
              'bg-slate-900 border-slate-950 text-slate-500 opacity-40';
          }

          return (
            <button
              key={`${tile.id}-${idx}`}
              type="button"
              disabled={disabled}
              onClick={() => handleLetterClick(tile.letter)}
              className={`flex-1 min-w-0 max-w-[42px] aspect-square p-0 rounded-xs font-pixel text-xs sm:text-sm font-bold border-2 flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed ${tileStyle}`}
            >
              {tile.letter}
            </button>
          );
        })}
      </div>

      {/* Action Controls in Sequence: Clear, Backspace, Submit Attack (Centered) */}
      <div className="flex items-center justify-center gap-2 sm:gap-2.5 w-full max-w-sm sm:max-w-md mx-auto mt-1">
        <button
          type="button"
          onClick={() => {
            soundEngine.playKeyClick();
            onClear();
          }}
          disabled={disabled}
          className="pixel-btn flex-1 min-w-[70px] max-w-[100px] bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-600 py-1.5 sm:py-2 px-2 rounded-xs font-pixel text-[10px] sm:text-[11px] flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 whitespace-nowrap shadow-xs"
          title="Clear current guess"
        >
          <RotateCcw className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="whitespace-nowrap">CLEAR</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playKeyClick();
            onBackspace();
          }}
          disabled={disabled}
          className="pixel-btn flex-1 min-w-[70px] max-w-[100px] bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-600 py-1.5 sm:py-2 px-2 rounded-xs font-pixel text-[10px] sm:text-[11px] flex items-center justify-center gap-1 cursor-pointer disabled:opacity-40 whitespace-nowrap shadow-xs"
          title="Remove last letter"
        >
          <Delete className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="whitespace-nowrap">BACK</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (canSubmit) {
              onEnter();
            }
          }}
          disabled={disabled || !canSubmit}
          className={`pixel-btn flex-[1.4] min-w-[110px] max-w-[150px] py-1.5 sm:py-2 px-3 rounded-xs font-pixel text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
            canSubmit
              ? 'bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white border-emerald-400 shadow-pixel animate-pulse'
              : 'bg-slate-900 border-slate-700 text-gray-500 cursor-not-allowed opacity-50'
          }`}
          title="Submit guess to attack enemy"
        >
          <Swords className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="whitespace-nowrap">ATTACK</span>
        </button>
      </div>
    </div>
  );
};
