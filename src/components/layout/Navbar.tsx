import React from 'react';
import { DifficultyLevel, PlayerProfile } from '../../types/game';
import {
  BookOpen,
  Map,
  User,
  Volume2,
  VolumeX,
  Sparkles,
  Swords,
  Maximize,
  Minimize,
} from 'lucide-react';
import { soundEngine } from '../../utils/sound';

interface NavbarProps {
  profile: PlayerProfile;
  onOpenCodex: () => void;
  onOpenStageSelect: () => void;
  onOpenProfile: () => void;
  bgmMuted: boolean;
  sfxMuted: boolean;
  onToggleBgm: () => void;
  onToggleSfx: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenCodex,
  onOpenStageSelect,
  onOpenProfile,
  bgmMuted,
  sfxMuted,
  onToggleBgm,
  onToggleSfx,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const codexCount = Object.keys(profile.codex).length;

  const diffBadges: Record<DifficultyLevel, { text: string; style: string }> = {
    easy: { text: 'EASY', style: 'bg-emerald-950 text-emerald-300 border-emerald-500' },
    medium: { text: 'MEDIUM', style: 'bg-sky-950 text-sky-300 border-sky-500' },
    hard: { text: 'HARD', style: 'bg-rose-950 text-rose-300 border-rose-500' },
  };

  const badge = diffBadges[profile.currentDifficulty];

  return (
    <header className="w-full bg-[#141224]/95 border-b-2 border-[#3b385e] px-2.5 sm:px-4 py-1.5 flex items-center justify-between select-none z-40 backdrop-blur-md shrink-0 h-11 sm:h-12">
      {/* Brand & Difficulty */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xs bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)] shrink-0">
          <Swords className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
          <h1 className="font-pixel text-[11px] sm:text-xs text-amber-400 tracking-wider whitespace-nowrap">
            WORDBOUND
          </h1>
          <span className={`px-1.5 py-0.2 rounded border text-[8px] font-pixel font-bold whitespace-nowrap ${badge.style}`}>
            {badge.text}
          </span>
        </div>
      </div>

      {/* Points & Action Controls Bar */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Points Pill */}
        <div
          onClick={onOpenProfile}
          className="bg-slate-900/90 border border-amber-400/50 hover:border-amber-400 px-1.5 sm:px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer shadow-xs transition-all whitespace-nowrap shrink-0"
          title="Total Accumulated Points (Click to view Profile)"
        >
          <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="font-pixel text-amber-300 text-[9px] sm:text-xs whitespace-nowrap">
            {profile.totalPoints.toLocaleString()}
          </span>
        </div>

        {/* Realms / Stage Select Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playKeyClick();
            onOpenStageSelect();
          }}
          className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 px-2 py-1 rounded text-[10px] font-pixel flex items-center gap-1 cursor-pointer"
          title="Select Stages & Difficulty"
        >
          <Map className="w-3 h-3 text-emerald-400" />
          <span className="hidden sm:inline">REALMS</span>
        </button>

        {/* Codex Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playKeyClick();
            onOpenCodex();
          }}
          className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 px-2 py-1 rounded text-[10px] font-pixel flex items-center gap-1 cursor-pointer relative"
          title="Vocabulary Codex"
        >
          <BookOpen className="w-3 h-3 text-amber-400" />
          <span className="hidden sm:inline">CODEX</span>
          <span className="bg-amber-500 text-black text-[8px] font-bold px-1 rounded-full">
            {codexCount}
          </span>
        </button>

        {/* Knight Profile */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playKeyClick();
            onOpenProfile();
          }}
          className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 p-1 sm:px-2 sm:py-1 rounded text-[10px] font-pixel flex items-center gap-1 cursor-pointer"
          title="Knight Profile & Gender Switch"
        >
          <User className="w-3 h-3 text-sky-400" />
          <span className="hidden md:inline">HERO</span>
        </button>

        {/* Audio Toggles */}
        <div className="flex items-center gap-0.5 bg-slate-900 border border-slate-700 rounded p-0.5">
          <button
            type="button"
            onClick={onToggleBgm}
            className={`p-1 rounded transition-colors ${
              bgmMuted ? 'text-gray-500 hover:text-gray-400' : 'text-amber-400 hover:text-amber-300'
            }`}
            title={bgmMuted ? 'Unmute BGM Music' : 'Mute BGM Music'}
          >
            {bgmMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </button>
          <button
            type="button"
            onClick={onToggleSfx}
            className={`px-1 py-0.5 rounded text-[8px] font-pixel transition-colors ${
              sfxMuted ? 'text-gray-500 hover:text-gray-400 line-through' : 'text-emerald-400 hover:text-emerald-300'
            }`}
            title={sfxMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            SFX
          </button>
        </div>

        {/* Fullscreen Toggle Button */}
        <button
          type="button"
          onClick={onToggleFullscreen}
          className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white border border-slate-600 p-1 sm:p-1.5 rounded text-[10px] cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? <Minimize className="w-3 h-3" /> : <Maximize className="w-3 h-3" />}
        </button>
      </div>
    </header>
  );
};
