import React from 'react';
import { BookOpen, Map, Play, Swords, User } from 'lucide-react';
import { PlayerProfile } from '../../types/game';

interface MainMenuProps {
  profile: PlayerProfile;
  onStartGame: () => void;
  onOpenCodex: () => void;
  onOpenStageSelect: () => void;
  onOpenProfile: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  profile,
  onStartGame,
  onOpenCodex,
  onOpenStageSelect,
  onOpenProfile,
}) => {
  return (
    <main className="relative min-h-screen min-h-[100dvh] overflow-hidden bg-[#0b0a14] text-gray-100 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(17,138,178,0.2),transparent_38%),linear-gradient(180deg,#141224_0%,#0b0a14_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1b1932]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-35 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md text-center animate-[popIn_0.45s_ease-out]">
        <div className="flex items-center justify-center gap-2 mb-3 text-amber-300">
          <Swords className="w-5 h-5" />
          <span className="font-pixel text-[10px] tracking-[0.25em]">WORDBOUND</span>
          <Swords className="w-5 h-5" />
        </div>

        <div className="pixel-border bg-[#141224]/95 rounded-lg p-5 sm:p-7">
          <p className="font-retro text-xl text-gray-300 mb-1">Welcome back, knight.</p>
          <p className="font-pixel text-[10px] text-sky-300 mb-6">
            {profile.totalPoints.toLocaleString()} POINTS · {Object.keys(profile.codex).length} CODEX WORDS
          </p>

          <button
            type="button"
            onClick={onStartGame}
            className="pixel-btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border border-emerald-300 py-3 rounded font-pixel text-xs shadow-pixel-green cursor-pointer"
          >
            <Play className="w-4 h-4 mr-2" />
            ENTER THE REALM
          </button>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <button
              type="button"
              onClick={onOpenStageSelect}
              className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 py-2 px-1 rounded text-[9px] font-pixel cursor-pointer"
            >
              <Map className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              REALMS
            </button>
            <button
              type="button"
              onClick={onOpenCodex}
              className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 py-2 px-1 rounded text-[9px] font-pixel cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-amber-400" />
              CODEX
            </button>
            <button
              type="button"
              onClick={onOpenProfile}
              className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 py-2 px-1 rounded text-[9px] font-pixel cursor-pointer"
            >
              <User className="w-3.5 h-3.5 mr-1 text-sky-400" />
              PROFILE
            </button>
          </div>

          <p className="font-silkscreen text-[10px] text-gray-500 mt-6">
            Crack words. Defeat monsters. Master every realm.
          </p>
        </div>
      </div>
    </main>
  );
};
