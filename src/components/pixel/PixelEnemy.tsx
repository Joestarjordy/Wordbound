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

        {enemy.spriteType === 'mushroom' && (
          <g>
            {/* Floating Toxic Spores */}
            <rect x="12" y="16" width="3" height="3" fill="#bef264" />
            <rect x="50" y="20" width="2.5" height="2.5" fill="#a3e635" />
            <rect x="16" y="34" width="2" height="2" fill="#bef264" />
            {/* Mushroom Stalk Body */}
            <rect x="24" y="32" width="16" height="20" fill="#fef3c7" rx="3" />
            <rect x="24" y="32" width="16" height="4" fill="#fde68a" />
            {/* Stubby Root Feet */}
            <rect x="23" y="51" width="7" height="7" fill="#d97706" rx="1" />
            <rect x="34" y="51" width="7" height="7" fill="#d97706" rx="1" />
            {/* Stubby Spore Arms */}
            <rect x="17" y="36" width="7" height="5" fill="#fde68a" rx="1" />
            <rect x="40" y="36" width="7" height="5" fill="#fde68a" rx="1" />
            {/* Giant Luminous Toadstool Cap */}
            <path d="M12,33 Q12,12 32,12 Q52,12 52,33 Z" fill="#65a30d" />
            <rect x="10" y="30" width="44" height="4" fill="#4d7c0f" rx="2" />
            {/* Glowing Spots on Cap */}
            <rect x="20" y="18" width="5" height="5" fill="#ecfccb" rx="1" />
            <rect x="36" y="16" width="6" height="6" fill="#bef264" rx="1" />
            <rect x="29" y="23" width="4" height="4" fill="#ecfccb" rx="1" />
            <rect x="15" y="25" width="4" height="4" fill="#bef264" rx="1" />
            <rect x="44" y="24" width="4" height="4" fill="#ecfccb" rx="1" />
            {/* Glowing Mischievous Eyes */}
            <rect x="26" y="38" width="3" height="4" fill="#1e1b4b" />
            <rect x="35" y="38" width="3" height="4" fill="#1e1b4b" />
            <rect x="26" y="38" width="1.5" height="1.5" fill="#a3e635" />
            <rect x="35" y="38" width="1.5" height="1.5" fill="#a3e635" />
          </g>
        )}

        {enemy.spriteType === 'imp' && (
          <g>
            {/* Bat-like Leathery Wings */}
            <polygon points="10,20 24,28 14,38" fill="#881337" />
            <polygon points="54,20 40,28 50,38" fill="#881337" />
            {/* Barbed Devil Tail */}
            <path d="M38,44 Q52,46 52,34" fill="none" stroke="#e11d48" strokeWidth="2.5" />
            <polygon points="52,31 56,35 49,35" fill="#fb7185" />
            {/* Crimson Imp Torso */}
            <rect x="24" y="28" width="16" height="18" fill="#e11d48" rx="2" />
            <rect x="27" y="31" width="10" height="10" fill="#f43f5e" />
            {/* Imp Head & Curved Horns */}
            <rect x="22" y="15" width="20" height="14" fill="#f43f5e" rx="2" />
            <polygon points="22,16 16,7 26,14" fill="#fef08a" />
            <polygon points="42,16 48,7 38,14" fill="#fef08a" />
            {/* Pointed Ears */}
            <polygon points="22,19 15,18 22,23" fill="#e11d48" />
            <polygon points="42,19 49,18 42,23" fill="#e11d48" />
            {/* Fiery Yellow Eyes & Fanged Grin */}
            <rect x="25" y="20" width="4" height="3" fill="#fef08a" />
            <rect x="35" y="20" width="4" height="3" fill="#fef08a" />
            <rect x="27" y="25" width="10" height="2" fill="#4c0519" />
            <polygon points="28,25 29,28 30,25" fill="#ffffff" />
            <polygon points="34,25 35,28 36,25" fill="#ffffff" />
            {/* Hellfire Pitchfork */}
            <rect x="14" y="16" width="2.5" height="34" fill="#78350f" />
            <polygon points="11,16 19,16 15,8" fill="#fb923c" />
            <rect x="11" y="11" width="2" height="6" fill="#fef08a" />
            <rect x="17" y="11" width="2" height="6" fill="#fef08a" />
            {/* Cloven Hooves */}
            <rect x="25" y="46" width="5" height="11" fill="#9f1239" />
            <rect x="34" y="46" width="5" height="11" fill="#9f1239" />
          </g>
        )}

        {enemy.spriteType === 'mimic' && (
          <g>
            {/* Lower Wooden Chest Base */}
            <rect x="14" y="34" width="36" height="22" fill="#78350f" rx="2" />
            <rect x="14" y="34" width="36" height="4" fill="#f59e0b" />
            <rect x="14" y="52" width="36" height="4" fill="#f59e0b" />
            <rect x="14" y="34" width="4" height="22" fill="#f59e0b" />
            <rect x="46" y="34" width="4" height="22" fill="#f59e0b" />
            {/* Cavernous Dark Maw Inside */}
            <rect x="17" y="22" width="30" height="14" fill="#3b0764" />
            {/* Upper Hinged Chest Lid (Tilted Open) */}
            <path d="M12,24 Q32,8 52,24 Z" fill="#92400e" stroke="#f59e0b" strokeWidth="2.5" />
            <rect x="29" y="20" width="6" height="6" fill="#fef08a" rx="1" />
            {/* Razor Fangs (Top & Bottom) */}
            <polygon points="19,24 22,31 25,24" fill="#f8fafc" />
            <polygon points="26,24 29,31 32,24" fill="#f8fafc" />
            <polygon points="33,24 36,31 39,24" fill="#f8fafc" />
            <polygon points="40,24 43,31 45,24" fill="#f8fafc" />
            <polygon points="21,35 24,29 27,35" fill="#f8fafc" />
            <polygon points="37,35 40,29 43,35" fill="#f8fafc" />
            {/* Whipping Purple Monster Tongue */}
            <path d="M30,34 Q18,42 10,34 Q16,28 26,32" fill="#ec4899" />
            {/* Glowing Predatory Eyes Inside the Maw */}
            <rect x="23" y="25" width="3.5" height="3.5" fill="#ef4444" />
            <rect x="37" y="25" width="3.5" height="3.5" fill="#ef4444" />
          </g>
        )}

        {enemy.spriteType === 'wraith' && (
          <g>
            {/* Ethereal Soul Orbs */}
            <circle cx="12" cy="24" r="3" fill="#5eead4" opacity="0.85" />
            <circle cx="52" cy="18" r="2.5" fill="#2dd4bf" opacity="0.85" />
            {/* Tattered Spectral Shroud */}
            <path
              d="M20,16 Q32,8 44,16 L50,48 L42,42 L36,54 L30,44 L24,54 L16,44 Z"
              fill="#0f766e"
            />
            <path
              d="M23,18 Q32,12 41,18 L45,44 L36,48 L28,42 L20,46 Z"
              fill="#115e59"
            />
            {/* Void Hood Hollow */}
            <polygon points="24,24 32,14 40,24 38,34 26,34" fill="#042f2e" />
            {/* Glowing Cyan Banshee Eyes */}
            <rect x="27" y="22" width="3.5" height="3.5" fill="#5eead4" />
            <rect x="33.5" y="22" width="3.5" height="3.5" fill="#5eead4" />
            {/* Spectral Lantern / Scythe Blade */}
            <path d="M16,12 Q6,18 12,32 Q15,22 20,20 Z" fill="#99f6e4" />
            <rect x="18" y="14" width="2.5" height="38" fill="#134e4a" />
          </g>
        )}

        {enemy.spriteType === 'drake' && (
          <g>
            {/* Spiked Wyvern Wings */}
            <polygon points="8,18 24,28 12,42" fill="#9a3412" />
            <polygon points="56,18 40,28 52,42" fill="#7c2d12" />
            {/* Armored Obsidian Body */}
            <rect x="21" y="26" width="22" height="22" fill="#431407" rx="3" />
            {/* Glowing Magma Core Chest Plates */}
            <rect x="25" y="29" width="14" height="4" fill="#f97316" />
            <rect x="26" y="35" width="12" height="4" fill="#fb923c" />
            <rect x="27" y="41" width="10" height="4" fill="#facc15" />
            {/* Horned Drake Snout & Crest */}
            <polygon points="20,16 32,10 44,16 40,27 24,27" fill="#7c2d12" />
            <polygon points="29,12 32,3 35,12" fill="#f97316" />
            <polygon points="21,15 15,8 24,13" fill="#fdba74" />
            <polygon points="43,15 49,8 40,13" fill="#fdba74" />
            {/* Molten Eyes */}
            <rect x="25" y="18" width="4" height="3" fill="#fef08a" />
            <rect x="35" y="18" width="4" height="3" fill="#fef08a" />
            {/* Taloned Legs */}
            <rect x="22" y="48" width="7" height="10" fill="#431407" />
            <rect x="35" y="48" width="7" height="10" fill="#431407" />
            <polygon points="20,58 24,54 26,58" fill="#f97316" />
            <polygon points="34,58 38,54 40,58" fill="#f97316" />
          </g>
        )}

        {enemy.spriteType === 'cultist' && (
          <g>
            {/* Floating Forbidden Halo */}
            <circle cx="32" cy="18" r="14" fill="none" stroke="#e879f9" strokeWidth="1.5" strokeDasharray="3,2" />
            {/* Inquisitor Velvet Robes */}
            <polygon points="22,26 42,26 48,56 16,56" fill="#4a044e" />
            <polygon points="27,26 37,26 39,56 25,56" fill="#701a75" />
            {/* Golden Runic Stole */}
            <rect x="25" y="26" width="3" height="24" fill="#facc15" />
            <rect x="36" y="26" width="3" height="24" fill="#facc15" />
            {/* Pointed Hood & Shadowed Visage */}
            <polygon points="20,26 32,7 44,26" fill="#581c87" />
            <rect x="25" y="17" width="14" height="9" fill="#090d16" rx="1" />
            {/* Three Glowing Astral Eyes */}
            <rect x="27" y="21" width="3" height="2.5" fill="#f0abfc" />
            <rect x="34" y="21" width="3" height="2.5" fill="#f0abfc" />
            <circle cx="32" cy="18" r="2" fill="#facc15" />
            {/* Levitating Void Grimoire & Orb */}
            <circle cx="14" cy="30" r="4" fill="#c084fc" />
            <circle cx="14" cy="30" r="2" fill="#faf5ff" />
          </g>
        )}

        {/* --- STAGE BOSS SPRITES (Magnificent & Menacing) --- */}
        {enemy.spriteType === 'boss_treant' && (
          <g>
            {/* Lush Ancient Canopy Crown */}
            <circle cx="20" cy="14" r="9" fill="#15803d" />
            <circle cx="44" cy="14" r="9" fill="#15803d" />
            <circle cx="32" cy="10" r="11" fill="#16a34a" />
            {/* Glowing Golden Amber Sap Fruits */}
            <rect x="18" y="12" width="3" height="3" fill="#bef264" />
            <rect x="31" y="7" width="3" height="3" fill="#fef08a" />
            <rect x="43" y="13" width="3" height="3" fill="#bef264" />
            {/* Antler Branch Horns */}
            <path d="M18,22 L8,12 M12,16 L14,10" stroke="#713f12" strokeWidth="3" strokeLinecap="round" />
            <path d="M46,22 L56,12 M52,16 L50,10" stroke="#713f12" strokeWidth="3" strokeLinecap="round" />
            {/* Colossal Gnarled Bark Trunk */}
            <rect x="16" y="18" width="32" height="32" fill="#713f12" rx="3" />
            <rect x="20" y="20" width="24" height="28" fill="#854d0e" />
            {/* Glowing Emerald Eyes & Hollow Bark Maw */}
            <polygon points="22,25 29,27 24,30" fill="#4ade80" />
            <polygon points="42,25 35,27 40,30" fill="#4ade80" />
            <polygon points="24,36 28,33 32,36 36,33 40,36 38,42 26,42" fill="#14532d" />
            <circle cx="32" cy="39" r="2.5" fill="#22c55e" />
            {/* Massive Root Tendril Legs */}
            <polygon points="16,50 10,59 26,59 28,50" fill="#422006" />
            <polygon points="48,50 54,59 38,59 36,50" fill="#422006" />
          </g>
        )}

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

        {enemy.spriteType === 'boss_lich' && (
          <g>
            {/* Necrotic Rune Halo */}
            <circle cx="32" cy="26" r="24" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4,3" />
            {/* Sovereign Ossuary Robes & Pauldrons */}
            <polygon points="18,24 46,24 52,55 12,55" fill="#134e4a" />
            <polygon points="24,24 40,24 44,55 20,55" fill="#0f766e" />
            <polygon points="10,20 24,24 14,32" fill="#cbd5e1" />
            <polygon points="54,20 40,24 50,32" fill="#cbd5e1" />
            {/* Ribcage & Glowing Soul Phylactery */}
            <rect x="26" y="30" width="12" height="3" fill="#e2e8f0" />
            <rect x="27" y="36" width="10" height="3" fill="#e2e8f0" />
            <polygon points="32,28 36,34 32,40 28,34" fill="#5eead4" />
            {/* Crowned Lich Skull */}
            <rect x="23" y="12" width="18" height="14" fill="#f1f5f9" rx="2" />
            <polygon points="22,12 25,3 29,12 32,2 35,12 39,3 42,12" fill="#facc15" />
            {/* Blazing Cyan Eye Sockets */}
            <rect x="26" y="16" width="4" height="4" fill="#042f2e" />
            <rect x="34" y="16" width="4" height="4" fill="#042f2e" />
            <rect x="27" y="17" width="2.5" height="2.5" fill="#2dd4bf" />
            <rect x="34.5" y="17" width="2.5" height="2.5" fill="#2dd4bf" />
            {/* Staff of the Undying */}
            <rect x="50" y="10" width="3" height="45" fill="#475569" />
            <circle cx="51.5" cy="9" r="5" fill="#14b8a6" />
            <circle cx="51.5" cy="9" r="2.5" fill="#ccfbf1" />
          </g>
        )}

        {enemy.spriteType === 'boss_titan' && (
          <g>
            {/* Floating Monolith Shoulder Pillars */}
            <rect x="8" y="16" width="10" height="22" fill="#334155" rx="2" stroke="#38bdf8" strokeWidth="1" />
            <rect x="46" y="16" width="10" height="22" fill="#334155" rx="2" stroke="#38bdf8" strokeWidth="1" />
            {/* Colossal Granite Torso */}
            <polygon points="16,20 48,20 44,50 20,50" fill="#475569" />
            <polygon points="20,22 44,22 40,46 24,46" fill="#64748b" />
            {/* Glowing Aegis Core & Runic Circuitry */}
            <polygon points="32,26 39,34 32,42 25,34" fill="#0284c7" stroke="#bae6fd" strokeWidth="1.5" />
            <line x1="20" y1="34" x2="25" y2="34" stroke="#38bdf8" strokeWidth="2" />
            <line x1="39" y1="34" x2="44" y2="34" stroke="#38bdf8" strokeWidth="2" />
            {/* Crowned Monolith Head */}
            <rect x="23" y="8" width="18" height="13" fill="#334155" rx="1" />
            <polygon points="23,8 32,2 41,8" fill="#38bdf8" />
            {/* Visor Slit Eye */}
            <rect x="25" y="13" width="14" height="3.5" fill="#7dd3fc" />
            <rect x="30" y="13" width="4" height="3.5" fill="#ffffff" />
            {/* Heavy Stone Legs */}
            <rect x="19" y="50" width="10" height="9" fill="#1e293b" />
            <rect x="35" y="50" width="10" height="9" fill="#1e293b" />
          </g>
        )}

        {enemy.spriteType === 'boss_phoenix' && (
          <g>
            {/* Solar Halo Ring */}
            <circle cx="32" cy="26" r="24" fill="none" stroke="#facc15" strokeWidth="1.5" strokeDasharray="5,2" />
            {/* Blazing Grand Wingspan */}
            <polygon points="2,10 24,24 6,34 18,40 8,48 26,38" fill="#ea580c" />
            <polygon points="62,10 40,24 58,34 46,40 56,48 38,38" fill="#ea580c" />
            <polygon points="6,14 24,26 12,34" fill="#facc15" />
            <polygon points="58,14 40,26 52,34" fill="#facc15" />
            {/* Celestial Sunbird Body */}
            <polygon points="24,22 40,22 38,46 26,46" fill="#f97316" />
            <polygon points="27,25 37,25 35,43 29,43" fill="#fef08a" />
            {/* Radiant Tail Plumes */}
            <polygon points="26,46 20,59 30,50 32,60 34,50 44,59 38,46" fill="#ef4444" />
            {/* Phoenix Crest & Golden Beak */}
            <circle cx="32" cy="17" r="7" fill="#fb923c" />
            <polygon points="28,11 30,2 32,9 34,2 36,11" fill="#fef08a" />
            <polygon points="29,18 35,18 32,24" fill="#ffffff" />
            <rect x="27" y="15" width="3" height="2.5" fill="#fef08a" />
            <rect x="34" y="15" width="3" height="2.5" fill="#fef08a" />
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
