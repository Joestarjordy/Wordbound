import React from 'react';
import { Enemy } from '../../types/game';

interface PixelEnemyProps {
  enemy: Enemy;
  state: 'idle' | 'attack' | 'block' | 'ultimate' | 'hurt' | 'defeated';
  size?: number;
  className?: string;
}

export const PixelEnemy: React.FC<PixelEnemyProps> = ({
  enemy,
  state,
  size,
  className = '',
}) => {
  const isBoss = enemy.type === 'boss';
  const effectiveSize = size || (isBoss ? 150 : 110);

  let animClass = '';
  if (state === 'idle') {
    animClass = isBoss ? 'animate-[bossFloat_3s_ease-in-out_infinite]' : 'animate-[enemyFloat_2.4s_ease-in-out_infinite]';
  } else if (state === 'attack') {
    animClass = 'animate-[enemyLunge_0.4s_cubic-bezier(0.16,1,0.3,1)]';
  } else if (state === 'block') {
    animClass = 'animate-[enemyBlock_0.45s_cubic-bezier(0.16,1,0.3,1)]';
  } else if (state === 'ultimate') {
    animClass = 'animate-[enemyUltimate_0.9s_cubic-bezier(0.16,1,0.3,1)]';
  } else if (state === 'hurt') {
    animClass = 'animate-[enemyHurt_0.35s_ease-in-out]';
  } else if (state === 'defeated') {
    animClass = 'animate-[enemyDissolve_0.9s_ease-out_forwards]';
  }

  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${animClass} ${className}`}
      style={{ width: effectiveSize, height: effectiveSize }}
      aria-label={`${enemy.name} (${state})`}
    >
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_10px_rgba(0,0,0,0.7)]"
        style={{ shapeRendering: 'crispEdges' }}
      >
        <defs>
          <radialGradient id="enemyAbyssGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#9333ea" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Shadow */}
        <ellipse
          cx="32"
          cy="60"
          rx={isBoss ? 20 : 14}
          ry={isBoss ? 5 : 3.5}
          fill="#000000"
          opacity="0.5"
        />

        {/* Abyssal Ultimate Aura */}
        {state === 'ultimate' && (
          <g>
            <circle cx="32" cy="32" r="30" fill="url(#enemyAbyssGlow)" />
            <circle
              cx="32"
              cy="32"
              r="25"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.5"
              strokeDasharray="5,3"
            />
            <polygon points="32,0 36,10 32,7 28,10" fill="#f43f5e" />
            <polygon points="4,22 12,26 8,30" fill="#a855f7" />
            <polygon points="60,22 52,26 56,30" fill="#a855f7" />
            <path
              d="M32,4 C6,10 -4,34 10,56"
              fill="none"
              stroke="#f43f5e"
              strokeWidth="6"
              strokeLinecap="round"
              className="animate-[slashArc_0.7s_ease-out_forwards]"
            />
          </g>
        )}

        {/* Specific Enemy Rendering */}
        {enemy.spriteType === 'goblin' && (
          <g>
            {/* Goblin Body */}
            <rect x="22" y="32" width="20" height="18" fill="#15803d" />
            <rect x="24" y="34" width="16" height="14" fill="#854d0e" /> {/* Leather vest */}
            {/* Legs */}
            <rect x="24" y="50" width="6" height="8" fill="#166534" />
            <rect x="34" y="50" width="6" height="8" fill="#166534" />
            {/* Head with big pointy ears */}
            <polygon points="12,24 22,26 20,32" fill="#22c55e" /> {/* Left ear */}
            <polygon points="52,24 42,26 44,32" fill="#22c55e" /> {/* Right ear */}
            <rect x="20" y="18" width="24" height="16" fill="#22c55e" rx="2" />
            {/* Mean Goblin Eyes */}
            <rect x="24" y="24" width="4" height="3" fill="#facc15" />
            <rect x="26" y="25" width="2" height="2" fill="#dc2626" />
            <rect x="36" y="24" width="4" height="3" fill="#facc15" />
            <rect x="36" y="25" width="2" height="2" fill="#dc2626" />
            {/* Jagged teeth */}
            <polygon points="26,30 28,34 30,30" fill="#f8fafc" />
            <polygon points="34,30 36,34 38,30" fill="#f8fafc" />
            {/* Dagger in hand */}
            <rect x="44" y="32" width="4" height="8" fill="#78350f" />
            <polygon points="46,24 44,32 48,32" fill="#94a3b8" />
          </g>
        )}

        {enemy.spriteType === 'bandit' && (
          <g>
            {/* Bandit Body & Hood */}
            <rect x="22" y="30" width="20" height="20" fill="#475569" />
            <rect x="20" y="26" width="24" height="6" fill="#dc2626" /> {/* Red scarf */}
            {/* Legs */}
            <rect x="24" y="50" width="6" height="9" fill="#1e293b" />
            <rect x="34" y="50" width="6" height="9" fill="#1e293b" />
            {/* Hood & Mask */}
            <polygon points="20,16 32,8 44,16 44,28 20,28" fill="#334155" />
            <rect x="24" y="20" width="16" height="4" fill="#0f172a" />
            {/* Shifty Eyes */}
            <rect x="26" y="21" width="3" height="2" fill="#e2e8f0" />
            <rect x="35" y="21" width="3" height="2" fill="#e2e8f0" />
            {/* Dual Daggers */}
            <rect x="14" y="34" width="3" height="14" fill="#94a3b8" />
            <rect x="47" y="34" width="3" height="14" fill="#94a3b8" />
          </g>
        )}

        {enemy.spriteType === 'skeleton' && (
          <g>
            {/* Ribcage */}
            <rect x="24" y="30" width="16" height="18" fill="#e2e8f0" />
            <rect x="27" y="32" width="10" height="3" fill="#0f172a" />
            <rect x="27" y="37" width="10" height="3" fill="#0f172a" />
            <rect x="27" y="42" width="10" height="3" fill="#0f172a" />
            {/* Legs */}
            <rect x="26" y="48" width="4" height="11" fill="#cbd5e1" />
            <rect x="34" y="48" width="4" height="11" fill="#cbd5e1" />
            {/* Skull */}
            <rect x="22" y="14" width="20" height="16" fill="#f8fafc" rx="3" />
            {/* Dark eye sockets with cursed red glow */}
            <rect x="26" y="20" width="4" height="5" fill="#0f172a" />
            <rect x="27" y="22" width="2" height="2" fill="#ef4444" />
            <rect x="34" y="20" width="4" height="5" fill="#0f172a" />
            <rect x="35" y="22" width="2" height="2" fill="#ef4444" />
            {/* Rusty cleaver */}
            <rect x="44" y="26" width="6" height="20" fill="#94a3b8" />
            <rect x="46" y="46" width="2" height="8" fill="#78350f" />
          </g>
        )}

        {enemy.spriteType === 'slime' && (
          <g>
            {/* Gelatinous Ooze Body */}
            <path
              d="M16,56 Q14,32 32,24 Q50,32 48,56 Q32,60 16,56 Z"
              fill="#a855f7"
            />
            {/* Inner glow highlight */}
            <ellipse cx="26" cy="36" rx="6" ry="4" fill="#d8b4fe" opacity="0.6" />
            {/* Big cute/creepy glossy eyes */}
            <circle cx="26" cy="42" r="4" fill="#f8fafc" />
            <circle cx="27" cy="42" r="2" fill="#4c1d95" />
            <circle cx="38" cy="42" r="4" fill="#f8fafc" />
            <circle cx="37" cy="42" r="2" fill="#4c1d95" />
          </g>
        )}

        {enemy.spriteType === 'wolf' && (
          <g>
            {/* Wolf Body */}
            <ellipse cx="32" cy="42" rx="18" ry="12" fill="#475569" />
            {/* Head & Snout */}
            <polygon points="12,34 26,24 26,44" fill="#334155" />
            <polygon points="20,18 25,24 17,26" fill="#1e293b" /> {/* Ear */}
            {/* Glowing Feral Eye */}
            <circle cx="20" cy="30" r="2" fill="#facc15" />
            {/* Legs */}
            <rect x="18" y="48" width="4" height="11" fill="#1e293b" />
            <rect x="25" y="48" width="4" height="11" fill="#334155" />
            <rect x="38" y="48" width="4" height="11" fill="#1e293b" />
            <rect x="44" y="48" width="4" height="11" fill="#334155" />
            {/* Tail */}
            <path d="M50,40 Q58,34 54,24" stroke="#475569" strokeWidth="4" fill="none" />
          </g>
        )}

        {enemy.spriteType === 'harpy' && (
          <g>
            {/* Wings */}
            <polygon points="6,20 22,34 14,46" fill="#38bdf8" />
            <polygon points="58,20 42,34 50,46" fill="#0284c7" />
            {/* Body & Claws */}
            <rect x="24" y="28" width="16" height="20" fill="#0369a1" />
            <polygon points="26,48 24,58 30,52" fill="#f59e0b" />
            <polygon points="38,48 40,58 34,52" fill="#f59e0b" />
            {/* Feathered Head */}
            <circle cx="32" cy="22" r="9" fill="#7dd3fc" />
            <polygon points="28,24 36,24 32,30" fill="#f59e0b" /> {/* Beak */}
            <circle cx="30" cy="20" r="1.5" fill="#0c4a6e" />
            <circle cx="34" cy="20" r="1.5" fill="#0c4a6e" />
          </g>
        )}

        {enemy.spriteType === 'golem' && (
          <g>
            {/* Massive Stone Torso */}
            <rect x="18" y="26" width="28" height="24" fill="#64748b" rx="2" />
            {/* Glowing Runic Lines */}
            <path d="M22,34 L32,42 L42,34" fill="none" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="32" cy="42" r="3" fill="#38bdf8" />
            {/* Stone Boulder Head */}
            <rect x="22" y="14" width="20" height="14" fill="#475569" rx="2" />
            <rect x="25" y="18" width="4" height="3" fill="#38bdf8" />
            <rect x="35" y="18" width="4" height="3" fill="#38bdf8" />
            {/* Heavy Pillar Legs */}
            <rect x="20" y="50" width="9" height="9" fill="#334155" />
            <rect x="35" y="50" width="9" height="9" fill="#334155" />
          </g>
        )}

        {/* --- STAGE BOSS SPRITES (Magnificent & Menacing) --- */}
        {enemy.spriteType === 'boss_ogre' && (
          <g>
            {/* Giant Ogre Chieftain */}
            <rect x="14" y="22" width="36" height="28" fill="#b91c1c" rx="4" />
            {/* Spiked Shoulder Armor */}
            <polygon points="12,18 16,10 20,20" fill="#f59e0b" />
            <polygon points="44,20 48,10 52,18" fill="#f59e0b" />
            {/* Horned Brow */}
            <rect x="18" y="10" width="28" height="16" fill="#991b1b" rx="3" />
            <polygon points="16,6 20,12 14,14" fill="#facc15" />
            <polygon points="48,6 44,12 50,14" fill="#facc15" />
            {/* Burning Fury Eyes */}
            <rect x="24" y="15" width="4" height="4" fill="#fef08a" />
            <rect x="36" y="15" width="4" height="4" fill="#fef08a" />
            {/* Giant Tusks */}
            <polygon points="26,26 28,20 30,26" fill="#f8fafc" />
            <polygon points="34,26 36,20 38,26" fill="#f8fafc" />
            {/* Colossal Warclub */}
            <rect x="48" y="14" width="8" height="36" fill="#78350f" rx="2" />
            <polygon points="44,12 52,4 60,12 52,20" fill="#475569" />
            {/* Pillar Legs */}
            <rect x="18" y="50" width="11" height="9" fill="#7f1d1d" />
            <rect x="35" y="50" width="11" height="9" fill="#7f1d1d" />
          </g>
        )}

        {enemy.spriteType === 'boss_dragon' && (
          <g>
            {/* Huge Wing Spans */}
            <polygon points="4,12 24,24 10,42" fill="#c2410c" />
            <polygon points="60,12 40,24 54,42" fill="#9a3412" />
            {/* Dragon Body */}
            <path d="M20,24 Q32,18 44,24 L42,50 Q32,54 22,50 Z" fill="#ea580c" />
            {/* Belly scales */}
            <path d="M26,30 L38,30 L35,46 L29,46 Z" fill="#facc15" />
            {/* Dragon Head with Horns */}
            <polygon points="22,12 32,4 42,12 38,24 26,24" fill="#ea580c" />
            <polygon points="22,10 16,0 26,6" fill="#78350f" />
            <polygon points="42,10 48,0 38,6" fill="#78350f" />
            {/* Fiery Slit Eyes */}
            <polygon points="27,15 30,13 29,18" fill="#fef08a" />
            <polygon points="37,15 34,13 35,18" fill="#fef08a" />
            {/* Smoke / Ember from nostrils */}
            <circle cx="32" cy="22" r="2" fill="#f97316" className="animate-ping" />
            {/* Claws */}
            <rect x="20" y="50" width="8" height="9" fill="#9a3412" />
            <rect x="36" y="50" width="8" height="9" fill="#9a3412" />
          </g>
        )}

        {enemy.spriteType === 'boss_deathknight' && (
          <g>
            {/* Obsidian Armor & Crown of Thorns */}
            <rect x="18" y="24" width="28" height="26" fill="#1e1b4b" rx="2" />
            {/* Glowing violet runes */}
            <path d="M24,32 L32,40 L40,32" fill="none" stroke="#c084fc" strokeWidth="2" />
            {/* Great Helm with Spikes */}
            <rect x="22" y="12" width="20" height="15" fill="#312e81" rx="2" />
            <polygon points="22,12 24,4 28,12" fill="#a855f7" />
            <polygon points="32,10 32,2 34,10" fill="#a855f7" />
            <polygon points="42,12 40,4 36,12" fill="#a855f7" />
            {/* Spectral Void Eyes */}
            <rect x="26" y="18" width="3" height="3" fill="#c084fc" />
            <rect x="35" y="18" width="3" height="3" fill="#c084fc" />
            {/* Cursed Soul Greatsword */}
            <rect x="46" y="6" width="6" height="42" fill="#6b21a8" rx="1" />
            <rect x="44" y="22" width="10" height="4" fill="#a855f7" />
            {/* Dark Tattered Cape */}
            <path d="M16,26 L8,48 L18,44 Z" fill="#0f172a" />
            {/* Heavy Greaves */}
            <rect x="22" y="50" width="8" height="9" fill="#0f172a" />
            <rect x="34" y="50" width="8" height="9" fill="#0f172a" />
          </g>
        )}

        {enemy.spriteType === 'boss_wyrm' && (
          <g>
            {/* Void Wyrm Serpentine coils */}
            <path
              d="M14,48 Q20,20 34,22 Q48,24 48,46 Q40,56 22,54 Z"
              fill="#1e1b4b"
              stroke="#06b6d4"
              strokeWidth="2"
            />
            {/* Luminous cosmic spines */}
            <polygon points="26,16 30,8 34,16" fill="#22d3ee" />
            <polygon points="40,18 46,10 44,22" fill="#22d3ee" />
            <polygon points="18,28 12,24 18,34" fill="#22d3ee" />
            {/* Star-devouring Maw */}
            <polygon points="26,30 38,30 32,40" fill="#083344" />
            <circle cx="32" cy="35" r="3" fill="#67e8f9" />
          </g>
        )}

        {enemy.spriteType === 'boss_overlord' && (
          <g>
            {/* The Eternal Wordbinder */}
            <circle cx="32" cy="32" r="26" fill="none" stroke="#ec4899" strokeWidth="1" strokeDasharray="3,3" />
            {/* Archon Robes */}
            <polygon points="22,26 42,26 48,54 16,54" fill="#831843" />
            {/* Golden Arcane Mantle */}
            <polygon points="18,22 32,32 46,22" fill="#f59e0b" />
            {/* Celestial Crown Mask */}
            <circle cx="32" cy="18" r="10" fill="#fbcfe8" />
            <polygon points="24,12 32,4 40,12" fill="#f43f5e" />
            {/* Glowing Third Eye */}
            <circle cx="32" cy="16" r="2.5" fill="#f43f5e" />
            <rect x="27" y="19" width="3" height="2" fill="#831843" />
            <rect x="34" y="19" width="3" height="2" fill="#831843" />
            {/* Floating Lexicon Grimoire */}
            <g transform="translate(44, 28) rotate(-15)">
              <rect x="0" y="0" width="14" height="18" fill="#f59e0b" rx="2" />
              <rect x="2" y="2" width="10" height="14" fill="#fef08a" />
              <line x1="4" y1="6" x2="10" y2="6" stroke="#831843" strokeWidth="1" />
              <line x1="4" y1="10" x2="10" y2="10" stroke="#831843" strokeWidth="1" />
            </g>
          </g>
        )}

        {/* Enemy / Boss Active Block Shield & Deflection Ward */}
        {state === 'block' && (
          <g transform="translate(10, 32)">
            <g className="animate-[shieldWardPop_0.45s_ease-out_forwards]">
              {/* Curved Aegis Energy Barrier Arc */}
              <path
                d="M2,-22 C-12,-10 -12,10 2,22"
                fill="none"
                stroke={isBoss ? '#f43f5e' : '#38bdf8'}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M-2,-18 C-14,-8 -14,8 -2,18"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Pixel Tower Shield raised in front of Enemy */}
              <polygon
                points="-2,-14 10,-14 10,4 4,14 -2,4"
                fill={isBoss ? '#4c0519' : '#1e293b'}
                stroke={isBoss ? '#fb7185' : '#7dd3fc'}
                strokeWidth="2"
              />
              {/* Shield Core Emblem */}
              <polygon
                points="4,-8 7,-2 4,6 1,-2"
                fill={isBoss ? '#facc15' : '#38bdf8'}
              />
              {/* Deflection Sparks */}
              <rect x="-10" y="-12" width="3" height="3" fill="#fef08a" />
              <rect x="-13" y="0" width="3" height="3" fill="#ffffff" />
              <rect x="-9" y="10" width="3" height="3" fill="#38bdf8" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
