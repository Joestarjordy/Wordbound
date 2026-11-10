import React, { useState, useMemo } from 'react';
import { CodexEntry, DifficultyLevel, PlayerProfile } from '../../types/game';
import { BookOpen, Search, X, Volume2, Sparkles, Filter, Calendar, ArrowDownAZ } from 'lucide-react';
import { soundEngine } from '../../utils/sound';

interface CodexModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: PlayerProfile;
}

export const CodexModal: React.FC<CodexModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | DifficultyLevel>('all');
  const [sortBy, setSortBy] = useState<'alpha' | 'date_desc' | 'date_asc'>('alpha');

  const codexList = useMemo(() => {
    return Object.values(profile.codex);
  }, [profile.codex]);

  const filteredWords = useMemo(() => {
    return codexList
      .filter((entry) => {
        const matchesSearch =
          entry.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDiff =
          difficultyFilter === 'all' || entry.difficulty === difficultyFilter;
        return matchesSearch && matchesDiff;
      })
      .sort((a, b) => {
        if (sortBy === 'alpha') {
          return a.word.localeCompare(b.word);
        } else if (sortBy === 'date_desc') {
          return b.unlockedAt - a.unlockedAt;
        } else {
          return a.unlockedAt - b.unlockedAt;
        }
      });
  }, [codexList, searchTerm, difficultyFilter, sortBy]);

  // Statistics
  const totalDiscovered = codexList.length;
  const easyCount = codexList.filter((e) => e.difficulty === 'easy').length;
  const mediumCount = codexList.filter((e) => e.difficulty === 'medium').length;
  const hardCount = codexList.filter((e) => e.difficulty === 'hard').length;

  const handleSpeak = (entry: CodexEntry) => {
    soundEngine.playUnlockSound();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(entry.word.toLowerCase());
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#141224] border-4 border-[#3b385e] rounded-lg shadow-[0_0_35px_rgba(0,0,0,0.9)] pixel-border flex flex-col overflow-hidden text-gray-200">
        {/* Header */}
        <div className="p-4 bg-[#1b1932] border-b-2 border-[#3b385e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/20 border border-amber-400 rounded text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-pixel text-amber-400">
                VOCABULARY CODEX
              </h2>
              <p className="text-[11px] text-gray-400 font-silkscreen">
                Your eternal archive of words discovered in combat
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-gray-400 hover:text-white rounded border border-slate-600 cursor-pointer"
            aria-label="Close Codex"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="bg-[#18162c] px-4 py-2.5 border-b border-[#2d2a4a] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400">TOTAL DISCOVERED</span>
            <span className="font-pixel text-amber-400 text-sm flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> {totalDiscovered} WORDS
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-400">EASY TIER</span>
            <span className="font-pixel text-white text-sm">{easyCount} words</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-sky-400">MEDIUM TIER</span>
            <span className="font-pixel text-white text-sm">{mediumCount} words</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-rose-400">HARD TIER</span>
            <span className="font-pixel text-white text-sm">{hardCount} words</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 bg-[#161429] border-b border-[#2d2a4a] flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between text-xs">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search words or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 font-mono"
            />
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded border border-slate-700">
            <Filter className="w-3.5 h-3.5 text-gray-400 ml-1 mr-0.5" />
            {(['all', 'easy', 'medium', 'hard'] as const).map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setDifficultyFilter(diff)}
                className={`px-2 py-1 rounded text-[10px] font-pixel uppercase transition-all ${
                  difficultyFilter === diff
                    ? 'bg-amber-400 text-black font-bold shadow-xs'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded border border-slate-700">
            <button
              type="button"
              onClick={() => setSortBy('alpha')}
              className={`p-1 rounded text-[10px] flex items-center gap-1 ${
                sortBy === 'alpha' ? 'bg-amber-400 text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
              title="Sort Alphabetically (A-Z)"
            >
              <ArrowDownAZ className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">A-Z</span>
            </button>
            <button
              type="button"
              onClick={() => setSortBy(sortBy === 'date_desc' ? 'date_asc' : 'date_desc')}
              className={`p-1 rounded text-[10px] flex items-center gap-1 ${
                sortBy !== 'alpha' ? 'bg-amber-400 text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
              title="Sort by Date"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {sortBy === 'date_desc' ? 'Newest' : 'Oldest'}
              </span>
            </button>
          </div>
        </div>

        {/* Word Cards List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredWords.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center text-gray-500">
              <BookOpen className="w-10 h-10 mb-2 opacity-40 text-amber-400" />
              <p className="font-pixel text-xs text-gray-400 mb-1">
                NO WORDS FOUND IN CODEX
              </p>
              <p className="text-[11px] text-gray-500 max-w-sm">
                Defeat monsters in Wordle Combat to permanently record words and their definitions here!
              </p>
            </div>
          ) : (
            filteredWords.map((entry) => {
              const diffColors = {
                easy: 'bg-emerald-950 text-emerald-300 border-emerald-600',
                medium: 'bg-sky-950 text-sky-300 border-sky-600',
                hard: 'bg-rose-950 text-rose-300 border-rose-600',
              }[entry.difficulty];

              return (
                <div
                  key={entry.word}
                  className="bg-[#1b1932] border-2 border-[#2d2a4a] hover:border-amber-400/50 rounded-lg p-3.5 transition-all shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-pixel text-xl sm:text-2xl font-bold tracking-widest text-emerald-400">
                        {entry.word}
                      </span>
                      <span className="text-xs text-gray-400 italic">
                        ({entry.partOfSpeech})
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSpeak(entry)}
                        className="p-1 hover:bg-slate-700 rounded text-gray-400 hover:text-amber-400 transition-colors"
                        title="Pronounce Word"
                        aria-label={`Pronounce ${entry.word}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] font-pixel uppercase px-2 py-0.5 rounded border ${diffColors}`}
                      >
                        {entry.difficulty}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-200 mb-2 leading-relaxed">
                    {entry.definition}
                  </p>

                  <div className="text-xs text-amber-200/80 border-l-2 border-amber-400/80 pl-2 mb-2 italic">
                    "{entry.example}"
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-[#2d2a4a]">
                    <span>
                      Best Score: <strong className="text-amber-400 font-pixel">{entry.fewestGuesses}</strong> / 5 attempts
                    </span>
                    <span>
                      Unlocked:{' '}
                      {new Date(entry.unlockedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
