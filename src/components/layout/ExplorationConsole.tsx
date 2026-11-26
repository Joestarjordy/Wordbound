import React from 'react';
import { Enemy, GameMode, PlayerProfile, Stage } from '../../types/game';
import { KNIGHT_SKILLS } from '../../data/knightSkills';
import { CAMPAIGN_TOTAL_STAGES } from '../../data/stages';
import { PixelKnight } from '../pixel/PixelKnight';
import { PixelEnemy } from '../pixel/PixelEnemy';
import { Map, BookOpen, Flame, Compass, Eye, Shield, ScrollText } from 'lucide-react';
import { soundEngine } from '../../utils/sound';

interface ExplorationConsoleProps {
  profile: PlayerProfile;
  gameMode: GameMode;
  stage: Stage;
  upcomingEnemy: Enemy | null;
  currentEncounterIndex: number;
  totalEncounters: number;
  endlessWave: number;
  endlessBestWave: number;
  knightHp: number;
  explorationProgress: number;
  onOpenCodex: () => void;
  onOpenStageSelect: () => void;
  onOpenProfile: () => void;
  onOpenStory?: () => void;
}

export const ExplorationConsole: React.FC<ExplorationConsoleProps> = ({
  profile,
  gameMode,
  stage,
  upcomingEnemy,
  currentEncounterIndex,
  totalEncounters,
  endlessWave,
  endlessBestWave,
  knightHp,
  explorationProgress,
  onOpenCodex,
  onOpenStageSelect,
  onOpenProfile,
  onOpenStory,
}) => {
  const isEndless = gameMode === 'endless';
  const isBoss = isEndless
    ? upcomingEnemy?.type === 'boss'
    : currentEncounterIndex === totalEncounters - 1;
  const codexTotal = Object.keys(profile.codex).length;
  const knightSkill = KNIGHT_SKILLS[profile.gender];
  const isFireKnight = knightSkill.magicType === 'fire';
  const wavesUntilBoss = 5 - (endlessWave % 5);

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
            <span>
              {isEndless
                ? `Wave ${endlessWave} · Best W${endlessBestWave}`
                : `Stage ${stage.id}/${CAMPAIGN_TOTAL_STAGES} · Enc ${currentEncounterIndex + 1}/${totalEncounters}`}
            </span>
            <span className="text-amber-300 font-pixel">
              {isBoss
                ? '👑 BOSS AHEAD'
                : isEndless
                ? `BOSS IN ${wavesUntilBoss}W`
                : '⚔️ ENEMY INCOMING'}
            </span>
          </div>
          {!isEndless && (stage.storyBeat || onOpenStory) && (
            <div className="flex items-center justify-between gap-2 mt-1">
              {stage.storyBeat && (
                <p
                  className="text-[9px] text-amber-200/80 font-silkscreen truncate"
                  title={stage.storyBeat}
                >
                  {stage.storyBeat}
                </p>
              )}
              {onOpenStory && (
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playKeyClick();
                    onOpenStory();
                  }}
                  className="shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-500/50 font-pixel text-[8px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                  title="Replay the current Act's heroic story cutscene"
                >
                  <ScrollText className="w-2.5 h-2.5" />
                  <span>STORY</span>
                </button>
              )}
            </div>
          )}
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
              <Shield className="w-2.5 h-2.5 inline" /> {knightHp}/200 HP
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
          className={`pixel-btn border py-2 sm:py-2.5 px-1.5 sm:px-2 rounded font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-1.5 shadow-pixel cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
            isFireKnight
              ? 'bg-gradient-to-r from-orange-950 to-red-950 hover:from-orange-900 hover:to-red-900 text-amber-200 border-orange-500/70'
              : 'bg-gradient-to-r from-sky-950 to-cyan-950 hover:from-sky-900 hover:to-cyan-900 text-sky-200 border-sky-400/70'
          }`}
          title={`${knightSkill.title} Profile (${knightSkill.magicLabel})`}
        >
          <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center overflow-hidden shrink-0">
            <PixelKnight gender={profile.gender} state="idle" size={22} />
          </span>
          <span className="whitespace-nowrap">PROFILE</span>
        </button>
      </div>
    </div>
  );
};
