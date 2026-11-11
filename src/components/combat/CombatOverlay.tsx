import React, { useEffect } from 'react';
import { CombatState, LetterTile } from '../../types/game';
import { WordleGrid } from './WordleGrid';
import { RuneLetterPool } from './RuneLetterPool';
import { Swords, AlertCircle, Heart } from 'lucide-react';

interface CombatOverlayProps {
  combatState: CombatState;
  onChar: (char: string, tile?: LetterTile) => void;
  onEnter: () => void;
  onBackspace: () => void;
  onClear: () => void;
  onRemoveLetterAt: (index: number) => void;
  disabled?: boolean;
}

export const CombatOverlay: React.FC<CombatOverlayProps> = ({
  combatState,
  onChar,
  onEnter,
  onBackspace,
  onClear,
  onRemoveLetterAt,
  disabled = false,
}) => {
  const {
    targetWord,
    guesses,
    currentGuess,
    evaluations,
    keyboardStatus,
    letterPool,
    shakeRowIndex,
    invalidMessage,
    status,
    maxChances,
  } = combatState;

  const targetLength = targetWord.length;
  const currentRow = guesses.length;
  const chancesLeft = maxChances - currentRow;
  const canSubmit = currentGuess.length === targetLength;

  // Physical Keyboard Listener
  useEffect(() => {
    if (disabled || status !== 'guessing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        onEnter();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        onBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClear();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        onChar(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [disabled, status, onChar, onEnter, onBackspace, onClear]);

  return (
    <div className="w-full h-full max-w-lg mx-auto flex flex-col justify-between items-center select-none animate-[popIn_0.3s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden px-1">
      {/* 1. Header Strip: Chances Left + Target Length (Centered) */}
      <div className="w-full shrink-0 flex flex-col items-center gap-1">
        <div className="w-full flex items-center justify-between sm:justify-center sm:gap-6 px-3 py-1 bg-black/60 rounded border border-slate-800 text-[9px] sm:text-[10px] font-pixel text-gray-300">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-gray-400">CHANCES:</span>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: maxChances }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-3.5 h-3.5 transition-all ${
                    i < chancesLeft
                      ? 'text-rose-500 fill-rose-500 scale-100'
                      : 'text-slate-700 fill-slate-800 scale-90'
                  }`}
                />
              ))}
            </div>
            <span className="text-rose-400 font-mono ml-0.5 font-bold">
              {chancesLeft}/{maxChances}
            </span>
          </div>

          <div className="flex items-center gap-1 text-amber-300 whitespace-nowrap">
            <Swords className="w-3 h-3 text-amber-400 shrink-0" />
            <span>
              <span className="hidden sm:inline">CRACK THE </span>
              {targetLength}-LETTER WORD
            </span>
          </div>
        </div>

        {/* Boss Runic Modifier Header Badge */}
        {combatState.enemy.type === 'boss' && combatState.enemy.bossModifier && (
          <div className="w-full flex items-center justify-between px-2.5 py-1 bg-red-950/80 border border-amber-500/50 rounded text-[8px] sm:text-[9px] font-pixel shadow-[0_0_8px_rgba(245,158,11,0.25)]">
            <span className="text-amber-400 font-bold flex items-center gap-1 shrink-0">
              <span>{combatState.enemy.bossModifier.icon}</span>
              <span>{combatState.enemy.bossModifier.badge}</span>
            </span>
            <span className="text-gray-300 text-[8px] truncate ml-1 sm:ml-2">
              {combatState.enemy.bossModifier.description}
            </span>
          </div>
        )}

        {/* Invalid word / alert message */}
        {invalidMessage && (
          <div className="bg-rose-950/95 border border-rose-500 text-rose-200 px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-pixel flex items-center gap-1.5 animate-bounce shadow-md">
            <AlertCircle className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="whitespace-nowrap">{invalidMessage}</span>
          </div>
        )}
      </div>

      {/* 2. Wordle Grid Boxes: 4 Rows with Placeholders (Centered) */}
      <div className="w-full flex items-center justify-center my-auto shrink-0">
        <WordleGrid
          targetLength={targetLength}
          guesses={guesses}
          currentGuess={currentGuess}
          evaluations={evaluations}
          shakeRowIndex={shakeRowIndex}
          currentRow={currentRow}
          maxChances={maxChances}
          onRemoveLetterAt={onRemoveLetterAt}
        />
      </div>

      {/* 3. Letters & 4. Buttons in Sequence (Centered) */}
      <div className="w-full shrink-0 flex flex-col items-center">
        <RuneLetterPool
          letterPool={letterPool}
          keyboardStatus={keyboardStatus}
          evaluations={evaluations}
          onSelectLetter={onChar}
          onBackspace={onBackspace}
          onClear={onClear}
          onEnter={onEnter}
          disabled={disabled || status !== 'guessing'}
          canSubmit={canSubmit}
        />
      </div>
    </div>
  );
};
