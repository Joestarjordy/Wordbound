import React from 'react';
import { BookOpen, Crown, Infinity as InfinityIcon, Map, Swords } from 'lucide-react';
import { GameMode, PlayerProfile } from '../../types/game';
import { KNIGHT_SKILLS } from '../../data/knightSkills';
import { CAMPAIGN_TOTAL_STAGES } from '../../data/stages';
import { PixelKnight } from '../pixel/PixelKnight';
import { soundEngine } from '../../utils/sound';

interface MainMenuProps {
  profile: PlayerProfile;
  onSelectMode: (mode: GameMode) => void;
  onOpenCodex: () => void;
  onOpenStageSelect: () => void;
  onOpenProfile: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  profile,
  onSelectMode,
  onOpenCodex,
  onOpenStageSelect,
  onOpenProfile,
}) => {
  const knightSkill = KNIGHT_SKILLS[profile.gender];
  const isFireKnight = knightSkill.magicType === 'fire';

  const currentDiff = profile.currentDifficulty;
  const campaignClearedCount =
    profile.campaignCompletedStages[currentDiff]?.length || 0;
  const totalBossesCleared =
    (profile.campaignCompletedStages.easy?.length || 0) +
    (profile.campaignCompletedStages.medium?.length || 0) +
    (profile.campaignCompletedStages.hard?.length || 0);
  const highestEndlessWave = Math.max(
    profile.endlessBestWave.easy || 0,
    profile.endlessBestWave.medium || 0,
    profile.endlessBestWave.hard || 0
  );

  return (
    <main className="relative min-h-screen min-h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#0b0a14] text-gray-100 flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(17,138,178,0.2),transparent_38%),linear-gradient(180deg,#141224_0%,#0b0a14_78%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#1b1932]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 scanlines opacity-35 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg text-center animate-[popIn_0.45s_ease-out]">
        <div className="flex items-center justify-center gap-2 mb-3 text-amber-300">
          <Swords className="w-5 h-5" />
          <span className="font-pixel text-[10px] tracking-[0.25em]">WORDBOUND</span>
          <Swords className="w-5 h-5" />
        </div>

        <div className="pixel-border bg-[#141224]/95 rounded-lg p-5 sm:p-6">
          <p className="font-retro text-xl text-gray-300 mb-1">Welcome back, knight.</p>
          <p className="font-pixel text-[10px] text-sky-300 mb-5">
            {profile.totalPoints.toLocaleString()} POINTS · {Object.keys(profile.codex).length} CODEX WORDS
          </p>

          {/* Two Primary Game Modes */}
          <div className="space-y-3 text-left">
            {/* Campaign Mode Button */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playKeyClick();
                onSelectMode('campaign');
              }}
              className="pixel-btn w-full bg-gradient-to-r from-amber-950/90 via-orange-900/75 to-rose-950/85 hover:from-amber-900 hover:via-orange-800 hover:to-rose-900 text-white border-2 border-amber-400/80 p-3.5 rounded-lg shadow-pixel-gold cursor-pointer flex flex-col items-stretch text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-pixel text-xs sm:text-sm text-amber-300 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                  CAMPAIGN MODE
                </span>
                <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-black/50 border border-amber-400/50 text-amber-200 shrink-0">
                  {campaignClearedCount}/{CAMPAIGN_TOTAL_STAGES} {currentDiff.toUpperCase()}
                </span>
              </div>
              <p className="font-silkscreen text-[10px] sm:text-[11px] text-amber-100/90 leading-snug">
                Story of Dominion: Hungry for ultimate power, conquer all 20 stages and defeat every Sovereign Boss across Easy, Medium &amp; Hard.
              </p>
              <div className="mt-2 text-[9px] font-pixel text-orange-300 flex items-center justify-between">
                <span>TOTAL BOSSES SLAIN: {totalBossesCleared}/60</span>
                <span className="text-amber-200">PLAY STORY →</span>
              </div>
            </button>

            {/* Endless Mode Button */}
            <button
              type="button"
              onClick={() => {
                soundEngine.playKeyClick();
                onSelectMode('endless');
              }}
              className="pixel-btn w-full bg-gradient-to-r from-sky-950/90 via-indigo-950/80 to-purple-950/85 hover:from-sky-900 hover:via-indigo-900 hover:to-purple-900 text-white border-2 border-sky-400/80 p-3.5 rounded-lg shadow-pixel cursor-pointer flex flex-col items-stretch text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-pixel text-xs sm:text-sm text-sky-300 flex items-center gap-1.5">
                  <InfinityIcon className="w-4 h-4 text-cyan-300 shrink-0" />
                  ENDLESS MODE
                </span>
                <span className="font-pixel text-[8px] px-2 py-0.5 rounded bg-black/50 border border-sky-400/50 text-cyan-200 shrink-0">
                  BEST WAVE: {highestEndlessWave}
                </span>
              </div>
              <p className="font-silkscreen text-[10px] sm:text-[11px] text-sky-100/90 leading-snug">
                Vocabulary Survival: No stages—pick Easy, Medium, or Hard and crack endless words to survive as long as you can!
              </p>
              <div className="mt-2 text-[9px] font-pixel text-cyan-300 flex items-center justify-between">
                <span>ALL 3 VOCAB LEVELS OPEN</span>
                <span className="text-sky-200">SURVIVE →</span>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            <button
              type="button"
              onClick={onOpenStageSelect}
              className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 py-2 px-1 rounded text-[9px] font-pixel cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <Map className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              REALMS
            </button>
            <button
              type="button"
              onClick={onOpenCodex}
              className="pixel-btn bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-600 py-2 px-1 rounded text-[9px] font-pixel cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-amber-400" />
              CODEX
            </button>
            <button
              type="button"
              onClick={onOpenProfile}
              className={`pixel-btn border py-2 px-1 rounded text-[9px] font-pixel cursor-pointer flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                isFireKnight
                  ? 'bg-orange-950/70 hover:bg-orange-900/70 text-amber-200 border-orange-500/60'
                  : 'bg-sky-950/70 hover:bg-sky-900/70 text-sky-200 border-sky-500/60'
              }`}
              title={`${knightSkill.title} Profile (${knightSkill.magicLabel})`}
            >
              <span className="w-4 h-4 flex items-center justify-center overflow-hidden shrink-0">
                <PixelKnight gender={profile.gender} state="idle" size={20} />
              </span>
              <span>PROFILE</span>
            </button>
          </div>

          <p className="font-silkscreen text-[10px] text-gray-500 mt-5">
            Crack words. Defeat bosses. Claim absolute power.
          </p>
        </div>
      </div>
    </main>
  );
};
