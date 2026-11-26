import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Crown,
  ScrollText,
  Sparkles,
  Swords,
} from 'lucide-react';
import { CharacterGender, Enemy } from '../../types/game';
import { StoryChapter } from '../../data/campaignStory';
import { BOSS_ENEMIES } from '../../data/enemies';
import { PixelKnight } from '../pixel/PixelKnight';
import { PixelEnemy } from '../pixel/PixelEnemy';
import { soundEngine } from '../../utils/sound';

interface StoryCutsceneModalProps {
  chapter: StoryChapter | null;
  knightGender: CharacterGender;
  onComplete: () => void;
}

function getBossPreviewEnemy(spriteType?: Enemy['spriteType']): Enemy {
  if (spriteType && spriteType in BOSS_ENEMIES) {
    return BOSS_ENEMIES[spriteType];
  }
  return BOSS_ENEMIES.boss_overlord;
}

export const StoryCutsceneModal: React.FC<StoryCutsceneModalProps> = ({
  chapter,
  knightGender,
  onComplete,
}) => {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    setLineIndex(0);
  }, [chapter?.id]);

  const totalLines = chapter ? chapter.lines.length : 0;
  const isLastLine = lineIndex >= totalLines - 1;

  useEffect(() => {
    if (!chapter) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        soundEngine.playKeyClick();
        if (lineIndex < chapter.lines.length - 1) {
          setLineIndex((prev) => prev + 1);
        } else {
          onComplete();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        soundEngine.playKeyClick();
        onComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [chapter, lineIndex, onComplete]);

  if (!chapter) return null;

  const currentLine = chapter.lines[lineIndex] || chapter.lines[0];
  const isEpilogue = chapter.triggerStage === 'epilogue';

  const speakerStyles = {
    narrator: {
      badge: 'bg-amber-950/90 border-amber-400 text-amber-300',
      frame: 'border-amber-400/60 bg-gradient-to-b from-amber-950/60 to-slate-950',
    },
    elder: {
      badge: 'bg-emerald-950/90 border-emerald-400 text-emerald-300',
      frame: 'border-emerald-400/60 bg-gradient-to-b from-emerald-950/60 to-slate-950',
    },
    knight: {
      badge:
        knightGender === 'male'
          ? 'bg-orange-950/90 border-orange-400 text-orange-300'
          : 'bg-sky-950/90 border-sky-400 text-sky-300',
      frame:
        knightGender === 'male'
          ? 'border-orange-400/70 bg-gradient-to-b from-orange-950/55 to-slate-950'
          : 'border-sky-400/70 bg-gradient-to-b from-sky-950/55 to-slate-950',
    },
    boss: {
      badge: 'bg-rose-950/90 border-rose-500 text-rose-300',
      frame: 'border-rose-500/70 bg-gradient-to-b from-rose-950/60 to-slate-950',
    },
  }[currentLine.speaker];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={`Story chapter: ${chapter.title}`}
    >
      <div className="relative w-full max-w-xl bg-[#131124] border-4 border-amber-400/80 rounded-lg shadow-[0_0_40px_rgba(251,191,36,0.28)] pixel-border-gold overflow-hidden text-gray-100">
        {/* Chapter Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-[#1d1936] via-[#261f42] to-[#1d1936] border-b-2 border-amber-400/40 flex items-start justify-between gap-2">
          <div>
            <div className="font-pixel text-[8px] sm:text-[9px] text-amber-300 tracking-wider flex items-center gap-1.5">
              {isEpilogue ? (
                <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              ) : (
                <ScrollText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              )}
              <span>{chapter.bookLabel}</span>
            </div>
            <h2 className="font-pixel text-sm sm:text-base text-white mt-1">
              {chapter.title}
            </h2>
            <p className="font-silkscreen text-[10px] text-sky-300">
              {chapter.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              soundEngine.playKeyClick();
              onComplete();
            }}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 font-pixel text-[8px] text-gray-300 hover:text-white cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            SKIP
          </button>
        </div>

        {/* JRPG Dialogue Stage */}
        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4">
            {/* Pixel Speaker Portrait */}
            <div
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-lg border-2 flex items-center justify-center overflow-hidden shrink-0 ${speakerStyles.frame}`}
            >
              {currentLine.speaker === 'knight' && (
                <PixelKnight gender={knightGender} state="idle" size={96} />
              )}
              {currentLine.speaker === 'boss' && (
                <PixelEnemy
                  enemy={getBossPreviewEnemy(currentLine.bossSpriteType)}
                  state="idle"
                  size={96}
                />
              )}
              {currentLine.speaker === 'narrator' && (
                <div className="flex flex-col items-center gap-1 text-amber-300">
                  <BookOpen className="w-10 h-10" />
                  <span className="font-pixel text-[7px] text-amber-200/80">LORE</span>
                </div>
              )}
              {currentLine.speaker === 'elder' && (
                <div className="flex flex-col items-center gap-1 text-emerald-300">
                  <Sparkles className="w-10 h-10" />
                  <span className="font-pixel text-[7px] text-emerald-200/80">SAGE</span>
                </div>
              )}
            </div>

            {/* Dialogue Text Box */}
            <div className="flex-1 flex flex-col justify-between bg-[#1a1830] border-2 border-[#3b385e] rounded-lg p-3.5 min-h-[112px] w-full">
              <div>
                <span
                  className={`inline-block font-pixel text-[9px] px-2 py-0.5 rounded border mb-2 ${speakerStyles.badge}`}
                >
                  {currentLine.speakerName.toUpperCase()}
                </span>
                <p className="font-silkscreen text-xs sm:text-sm text-gray-100 leading-relaxed">
                  {currentLine.text}
                </p>
              </div>

              {/* Page Progress Dots */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-700/60">
                <div className="flex items-center gap-1.5">
                  {chapter.lines.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === lineIndex
                          ? 'w-5 bg-amber-400'
                          : idx < lineIndex
                          ? 'w-2 bg-emerald-400'
                          : 'w-2 bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-pixel text-[8px] text-gray-400">
                  {lineIndex + 1} / {totalLines}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-4 flex items-center justify-between gap-2">
            <button
              type="button"
              disabled={lineIndex === 0}
              onClick={() => {
                soundEngine.playKeyClick();
                setLineIndex((prev) => Math.max(0, prev - 1));
              }}
              className={`pixel-btn px-3 py-2 rounded border font-pixel text-[9px] flex items-center gap-1 ${
                lineIndex === 0
                  ? 'bg-slate-900/50 border-slate-800 text-gray-600 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-gray-200 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              PREV
            </button>

            <button
              type="button"
              onClick={() => {
                soundEngine.playKeyClick();
                if (!isLastLine) {
                  setLineIndex((prev) => prev + 1);
                } else {
                  onComplete();
                }
              }}
              className={`pixel-btn px-5 py-2.5 rounded border font-pixel text-[10px] sm:text-xs text-white cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                isLastLine
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-emerald-300 shadow-pixel-green'
                  : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 border-amber-300 shadow-pixel-gold'
              }`}
            >
              {isLastLine ? (
                <>
                  <Swords className="w-3.5 h-3.5" />
                  <span>{isEpilogue ? 'CONTINUE JOURNEY' : 'ONWARD TO BATTLE'}</span>
                </>
              ) : (
                <>
                  <span>NEXT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
