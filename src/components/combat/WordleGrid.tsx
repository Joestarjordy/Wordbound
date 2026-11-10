import React from 'react';
import { GuessEvaluation } from '../../types/game';

interface WordleGridProps {
  targetLength: number;
  guesses: string[];
  currentGuess: string;
  evaluations: GuessEvaluation[][];
  shakeRowIndex: number | null;
  currentRow: number;
  maxChances?: number;
  onRemoveLetterAt?: (index: number) => void;
}

export const WordleGrid: React.FC<WordleGridProps> = ({
  targetLength,
  guesses,
  currentGuess,
  evaluations,
  shakeRowIndex,
  currentRow,
  maxChances = 4,
  onRemoveLetterAt,
}) => {
  const rows = Array.from({ length: maxChances });
  // Fit by height (4 rows) and by width (cols + badge), clamped for tiny/huge screens
  const cellSize = `clamp(24px, min(5.4dvh, calc((100vw - 64px) / ${targetLength + 1} - 4px)), 46px)`;

  return (
    <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5 my-auto select-none w-full">
      {rows.map((_, rowIndex) => {
        const isCurrent = rowIndex === currentRow;
        const isPast = rowIndex < currentRow;
        const guess = isPast
          ? guesses[rowIndex] || ''
          : isCurrent
          ? currentGuess
          : '';
        const rowEvaluations = evaluations[rowIndex] || [];
        const isShaking = shakeRowIndex === rowIndex;

        return (
          <div
            key={rowIndex}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 transition-transform ${
              isShaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
            }`}
          >
            {/* Chance Counter Indicator Badge on left */}
            <div
              className={`w-4.5 h-4.5 sm:w-5 sm:h-5 flex items-center justify-center font-pixel text-[8px] sm:text-[9px] rounded-xs border shrink-0 ${
                isPast
                  ? 'bg-slate-900 text-gray-500 border-slate-800'
                  : isCurrent
                  ? 'bg-amber-400 text-black border-amber-300 font-bold animate-pulse'
                  : 'bg-slate-900/40 text-gray-600 border-slate-800'
              }`}
              title={`Attempt ${rowIndex + 1} of ${maxChances}`}
            >
              {rowIndex + 1}
            </div>

            {/* Letter Boxes / Placeholders */}
            {Array.from({ length: targetLength }).map((_, colIndex) => {
              const letter = guess[colIndex] || '';
              const evaluation = rowEvaluations[colIndex];
              const state = evaluation ? evaluation.state : 'empty';
              const isActiveSlot = isCurrent && colIndex === currentGuess.length;

              let bgStyle = 'bg-slate-900/90 border-slate-700/80 text-white';
              let flipAnim = '';

              if (state === 'correct') {
                bgStyle = 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.5)]';
                flipAnim = `animate-[flipIn_0.35s_ease-out_${colIndex * 90}ms_forwards]`;
              } else if (state === 'present') {
                bgStyle = 'bg-amber-500 border-amber-300 text-black shadow-[0_0_8px_rgba(245,158,11,0.4)]';
                flipAnim = `animate-[flipIn_0.35s_ease-out_${colIndex * 90}ms_forwards]`;
              } else if (state === 'absent') {
                bgStyle = 'bg-slate-800/90 border-slate-900 text-slate-400';
                flipAnim = `animate-[flipIn_0.35s_ease-out_${colIndex * 90}ms_forwards]`;
              } else if (isCurrent && letter) {
                // Filled slot in current attempt
                bgStyle = 'bg-slate-800 border-amber-400 text-amber-200 scale-105 shadow-[0_0_8px_rgba(251,191,36,0.3)] cursor-pointer hover:border-rose-400';
              } else if (isCurrent && isActiveSlot) {
                // Empty placeholder with active glow
                bgStyle = 'bg-slate-900/60 border-2 border-dashed border-sky-400/80 shadow-[0_0_6px_rgba(56,189,248,0.4)] text-sky-400';
              } else if (isCurrent) {
                // Inactive empty placeholder in current row
                bgStyle = 'bg-slate-900/40 border border-dashed border-slate-700 text-gray-600';
              } else {
                // Future row placeholder
                bgStyle = 'bg-slate-950/40 border border-slate-800/60 text-transparent';
              }

              return (
                <div
                  key={colIndex}
                  onClick={() => {
                    if (isCurrent && letter && onRemoveLetterAt) {
                      onRemoveLetterAt(colIndex);
                    }
                  }}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    fontSize: `calc(${cellSize} * 0.45)`,
                  }}
                  className={`flex items-center justify-center font-pixel font-bold border-2 transition-all duration-200 rounded-xs select-none relative ${bgStyle} ${flipAnim}`}
                >
                  {letter ? (
                    letter
                  ) : isCurrent ? (
                    <span className="text-[10px] sm:text-xs text-gray-500 font-silkscreen opacity-50">
                      _
                    </span>
                  ) : null}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
