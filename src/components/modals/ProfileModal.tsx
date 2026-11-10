import React from 'react';
import { CharacterGender, PlayerProfile } from '../../types/game';
import { PixelKnight } from '../pixel/PixelKnight';
import { User, Trophy, Award, Flame, RefreshCw, X } from 'lucide-react';
import { soundEngine } from '../../utils/sound';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
  onChangeGender: (gender: CharacterGender) => void;
  onResetSave: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onChangeGender,
  onResetSave,
}) => {
  if (!isOpen) return null;

  const totalBattles = profile.stats.battlesWon + profile.stats.battlesLost;
  const winRate = totalBattles > 0 ? Math.round((profile.stats.battlesWon / totalBattles) * 100) : 0;
  const codexTotal = Object.keys(profile.codex).length;

  const handleGenderToggle = (gender: CharacterGender) => {
    soundEngine.playKeyClick();
    onChangeGender(gender);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all game progress? This cannot be undone!')) {
      onResetSave();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-[#141224] border-4 border-[#3b385e] rounded-lg shadow-[0_0_35px_rgba(0,0,0,0.9)] pixel-border flex flex-col overflow-hidden text-gray-200">
        {/* Header */}
        <div className="p-4 bg-[#1b1932] border-b-2 border-[#3b385e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-sky-500/20 border border-sky-400 rounded text-sky-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-pixel text-sky-400">
                PLAYER PROFILE & CUSTOMIZATION
              </h2>
              <p className="text-[11px] text-gray-400 font-silkscreen">
                Manage your Knight's sprite, gender, and battle records
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded border border-slate-600 cursor-pointer"
            aria-label="Close Profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Character Gender Customization Card */}
          <div className="bg-[#1b1932] border-2 border-[#3b385e] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-pixel text-xs text-amber-300">
                CHARACTER CLASS: KNIGHT
              </span>
              <span className="text-[10px] text-gray-400">SELECT GENDER</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Male Knight Option */}
              <button
                type="button"
                onClick={() => handleGenderToggle('male')}
                className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  profile.gender === 'male'
                    ? 'border-sky-400 bg-sky-950/40 shadow-[0_0_15px_rgba(56,189,248,0.4)]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-600'
                }`}
              >
                <div className="h-24 flex items-center justify-center">
                  <PixelKnight gender="male" state="idle" size={90} />
                </div>
                <div className="text-center">
                  <div className="font-pixel text-xs text-white">MALE KNIGHT</div>
                  <div className="text-[10px] text-sky-300">Silver Plate & Royal Blue Cape</div>
                </div>
                {profile.gender === 'male' && (
                  <span className="bg-sky-500 text-black font-pixel text-[9px] px-2 py-0.5 rounded font-bold">
                    SELECTED
                  </span>
                )}
              </button>

              {/* Female Knight Option */}
              <button
                type="button"
                onClick={() => handleGenderToggle('female')}
                className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
                  profile.gender === 'female'
                    ? 'border-rose-400 bg-rose-950/40 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-600'
                }`}
              >
                <div className="h-24 flex items-center justify-center">
                  <PixelKnight gender="female" state="idle" size={90} />
                </div>
                <div className="text-center">
                  <div className="font-pixel text-xs text-white">FEMALE KNIGHT</div>
                  <div className="text-[10px] text-rose-300">Gold Filigree & Crimson Cloak</div>
                </div>
                {profile.gender === 'female' && (
                  <span className="bg-rose-500 text-white font-pixel text-[9px] px-2 py-0.5 rounded font-bold">
                    SELECTED
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="bg-[#1b1932] border-2 border-[#3b385e] rounded-lg p-4">
            <h3 className="font-pixel text-xs text-amber-400 mb-3 flex items-center gap-1.5">
              <Trophy className="w-4 h-4" /> ADVENTURER RECORDS
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 flex flex-col">
                <span className="text-[10px] text-gray-400">TOTAL POINTS</span>
                <span className="font-pixel text-amber-400 text-base">
                  {profile.totalPoints.toLocaleString()}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 flex flex-col">
                <span className="text-[10px] text-gray-400">WORDS IN CODEX</span>
                <span className="font-pixel text-emerald-400 text-base">
                  {codexTotal}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 flex flex-col">
                <span className="text-[10px] text-gray-400">VICTORIES</span>
                <span className="font-pixel text-sky-400 text-base">
                  {profile.stats.battlesWon} WINS
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 flex flex-col">
                <span className="text-[10px] text-gray-400">WIN RATE</span>
                <span className="font-pixel text-white text-base">
                  {winRate}%
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 flex flex-col">
                <span className="text-[10px] text-gray-400">WIN STREAK</span>
                <span className="font-pixel text-amber-300 text-base flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> {profile.stats.currentStreak}
                </span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800 flex flex-col">
                <span className="text-[10px] text-gray-400">BOSSES SLAIN</span>
                <span className="font-pixel text-rose-400 text-base flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> {profile.stats.bossDefeats}
                </span>
              </div>
            </div>
          </div>

          {/* Unlocked Difficulty Realms Status */}
          <div className="bg-[#1b1932] border-2 border-[#3b385e] rounded-lg p-3 text-xs">
            <span className="text-[10px] text-gray-400 font-pixel block mb-2">
              REALM PROGRESS PER DIFFICULTY:
            </span>
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex justify-between items-center bg-slate-900 px-3 py-1.5 rounded">
                <span className="text-emerald-400 font-pixel text-[10px]">EASY:</span>
                <span className="text-gray-300">Stage {profile.stageProgress.easy.currentStage}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 px-3 py-1.5 rounded">
                <span className="text-sky-400 font-pixel text-[10px]">MEDIUM:</span>
                <span className="text-gray-300">
                  {profile.unlockedDifficulties.includes('medium')
                    ? `Stage ${profile.stageProgress.medium.currentStage}`
                    : 'Locked (Requires 800 PTS)'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-slate-900 px-3 py-1.5 rounded">
                <span className="text-rose-400 font-pixel text-[10px]">HARD:</span>
                <span className="text-gray-300">
                  {profile.unlockedDifficulties.includes('hard')
                    ? `Stage ${profile.stageProgress.hard.currentStage}`
                    : 'Locked (Requires 2,500 PTS)'}
                </span>
              </div>
            </div>
          </div>

          {/* Reset Save Button */}
          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 p-2 rounded hover:bg-rose-950/40 border border-transparent hover:border-rose-900 transition-all cursor-pointer font-silkscreen"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Game Save Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
