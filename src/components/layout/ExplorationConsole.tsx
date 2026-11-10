import React from 'react';
import { PlayerProfile, Stage } from '../../types/game';
import { PixelKnight } from '../pixel/PixelKnight';
import { PixelEnemy } from '../pixel/PixelEnemy';
import { Map, BookOpen, User, Flame, Compass, Eye, Shield } from 'lucide-react';
import { soundEngine } from '../../utils/sound';

interface ExplorationConsoleProps {
  profile: PlayerProfile;
  stage: Stage;
  currentEncounterIndex: number;
  totalEncounters: number;
  explorationProgress: number;
  onOpenCodex: () => void;
  onOpenStageSelect: () => void;
  onOpenProfile: () => void;
}

export const ExplorationConsole: React.FC<ExplorationConsoleProps> = ({
  profile,
  stage,
  currentEncounterIndex,
  totalEncounters,
  explorationProgress,
  onOpenCodex,
  onOpenStageSelect,
  onOpenProfile,
}) => {
  const upcomingEnemy = stage.encounters[currentEncounterIndex];
  const isBoss = currentEncounterIndex === totalEncounters - 1;
  const codexTotal = Object.keys(profile.codex).length;

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col justify-between select-none py-1 px-1 sm:px-2">
      {/* Top Strip: Patrol Tracker & Encounter Intel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#1b1932]/90 border border-slate-700/80 rounded-lg p-2 sm:p-2.5">
        {/* Patrol Progress Bar */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between text-[10px] font-pixel mb-1">
            <span className="text-amber-400 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
              PATROL PROGRESS
            </span>
            <span className="text-sky-300 font-mono">
              {Math.min(100, Math.floor(explorationProgress))}%
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-xs overflow-hidden border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400 transition-all duration-300 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              style={{ width: `${explorationProgress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[9px] text-gray-400 mt-1">
            <span>Encounter {currentEncounterIndex + 1} of {totalEncounters}</span>
            <span className="text-amber-300 font-pixel">
              {isBoss ? '👑 BOSS AHEAD' : '⚔️ ENEMY INCOMING'}
            </span>
          </div>
        </div>

        {/* Scout Intel Box */}
        {upcomingEnemy && (
          <div className="bg-slate-900/90 border border-slate-800 rounded p-1.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black/60 rounded border border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                <PixelEnemy enemy={upcomingEnemy} state="idle" size={38} />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1 min-w-0">
                  <Eye className="w-3 h-3 text-rose-400 shrink-0" />
                  <span className="text-[10px] font-pixel text-rose-300 whitespace-nowrap">
                    {upcomingEnemy.name.toUpperCase()}
                  </span>
                </div>
                <span className="text-[9px] text-gray-400 whitespace-nowrap">
                  {upcomingEnemy.title}
                </span>
              </div>
            </div>
            <span className="text-[9px] font-pixel text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-600/40 shrink-0">
              {upcomingEnemy.type.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Hero Stats Strip */}
      <div className="flex items-center justify-between bg-slate-900/70 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-gray-300 my-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            <PixelKnight gender={profile.gender} state="idle" size={32} />
          </div>
          <div className="flex items-baseline gap-1 text-[10px] font-pixel">
            <span className="text-sky-300">{profile.gender.toUpperCase()} KNIGHT</span>
            <span className="text-gray-500 hidden sm:inline">•</span>
            <span className="text-emerald-400 hidden sm:inline flex items-center gap-0.5">
              <Shield className="w-2.5 h-2.5 inline" /> 200/200 HP
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[10px] font-pixel">
          <span className="text-amber-300 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" /> {profile.stats.currentStreak} STREAK
          </span>
          <span className="text-gray-400">
            {profile.stats.battlesWon} WINS
          </span>
        </div>
      </div>

      {/* Action Buttons: Realms, Codex, Hero (No Truncation) */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => {
            soundEngine.playKeyClick();
            onOpenStageSelect();
          }}
          className="pixel-btn bg-gradient-to-r from-sky-900 to-indigo-900 hover:from-sky-800 hover:to-indigo-800 text-sky-200 border border-sky-500/60 py-2 sm:py-2.5 px-1.5 sm:px-2 rounded font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 shadow-pixel cursor-pointer"
        >
          <Map className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <span className="whitespace-nowrap">REALMS</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playKeyClick();
            onOpenCodex();
          }}
          className="pixel-btn bg-gradient-to-r from-amber-900 to-yellow-900 hover:from-amber-800 hover:to-yellow-800 text-amber-200 border border-amber-500/60 py-2 sm:py-2.5 px-1.5 sm:px-2 rounded font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 shadow-pixel cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="whitespace-nowrap">CODEX ({codexTotal})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEngine.playKeyClick();
            onOpenProfile();
          }}
          className="pixel-btn bg-gradient-to-r from-purple-900 to-slate-900 hover:from-purple-800 hover:to-slate-800 text-purple-200 border border-purple-500/60 py-2 sm:py-2.5 px-1.5 sm:px-2 rounded font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 shadow-pixel cursor-pointer"
        >
          <User className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="whitespace-nowrap">PROFILE</span>
        </button>
      </div>
    </div>
  );
};
