import React from 'react';
import { ChevronRight, Swords } from 'lucide-react';

interface IntroScreenProps {
  onContinue: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onContinue }) => {
  return (
    <main className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-[#0b0a14] text-gray-100 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(59,56,94,0.45),transparent_42%),linear-gradient(180deg,#17152d_0%,#0b0a14_72%)]" />
      <div className="absolute inset-0 scanlines opacity-45 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl text-center animate-[fadeIn_0.8s_ease-out]">
        <div className="mx-auto mb-5 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg bg-amber-400/15 border-2 border-amber-300 text-amber-300 shadow-[0_0_28px_rgba(255,209,102,0.35)] animate-pulse">
          <Swords className="w-8 h-8 sm:w-10 sm:h-10" />
        </div>

        <p className="font-pixel text-[9px] sm:text-xs tracking-[0.35em] text-sky-300 mb-4">
          A WORDLE PIXEL RPG ADVENTURE
        </p>
        <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-amber-300 tracking-wider drop-shadow-[4px_4px_0_#7c2d12]">
          WORDBOUND
        </h1>
        <p className="font-retro text-2xl sm:text-3xl text-gray-300 mt-3">
          Every word is a weapon.
        </p>

        <button
          type="button"
          onClick={onContinue}
          className="pixel-btn mt-10 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black border-2 border-amber-200 px-6 py-3 rounded font-pixel text-xs sm:text-sm shadow-pixel-gold cursor-pointer"
        >
          BEGIN ADVENTURE
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </main>
  );
};
