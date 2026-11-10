import React from 'react';
import { CharacterGender } from '../../types/game';

interface PixelKnightProps {
  gender: CharacterGender;
  state: 'walk' | 'idle' | 'attack' | 'ultimate' | 'hurt' | 'victory' | 'defeat';
  size?: number;
  className?: string;
}

export const PixelKnight: React.FC<PixelKnightProps> = ({
  gender,
  state,
  size = 120,
  className = '',
}) => {
  const isFemale = gender === 'female';

  // State-specific animation styles with enhanced smoothness
  let animClass = '';
  if (state === 'walk') animClass = 'animate-[knightWalk_0.6s_ease-in-out_infinite]';
  if (state === 'idle') animClass = 'animate-[knightIdle_2.4s_ease-in-out_infinite]';
  if (state === 'attack') animClass = 'animate-[knightSlash_0.65s_cubic-bezier(0.3,0,0.2,1)]';
  if (state === 'ultimate') animClass = 'animate-[knightUltimate_0.9s_cubic-bezier(0.16,1,0.3,1)]';
  if (state === 'hurt') animClass = 'animate-[knightHurt_0.35s_ease-in-out]';
  if (state === 'victory') animClass = 'animate-[knightVictory_1.5s_ease-in-out_infinite]';
  if (state === 'defeat') animClass = 'opacity-50 grayscale transition-all duration-500';

  // Colors
  const armorColor = isFemale ? '#94a3b8' : '#64748b';
  const armorHighlight = isFemale ? '#f8fafc' : '#cbd5e1';
  const trimColor = isFemale ? '#ffd166' : '#60a5fa';
  const capeColor = isFemale ? '#ef476f' : '#2563eb';
  const hairColor = isFemale ? '#d97706' : '#475569';

  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${animClass} ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${gender} Knight (${state})`}
    >
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_12px_rgba(0,0,0,0.7)]"
        style={{ shapeRendering: 'crispEdges' }}
      >
        <defs>
          {/* Slashing blade gradient */}
          <linearGradient id="slashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* Victory glow */}
          <radialGradient id="victoryGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dynamic Shadow with scale on bob */}
        <ellipse
          cx="32"
          cy="60"
          rx={state === 'defeat' ? 16 : 14}
          ry={state === 'defeat' ? 4 : 3.5}
          fill="#000000"
          opacity={state === 'walk' ? 0.45 : 0.4}
          className={state === 'walk' ? 'animate-[shadowWalk_0.6s_ease-in-out_infinite]' : ''}
          style={{ transformOrigin: '32px 60px' }}
        />

        {/* Celestial Ultimate Aura Ring */}
        {state === 'ultimate' && (
          <g>
            <circle cx="32" cy="34" r="28" fill="url(#victoryGlow)" opacity="0.85" />
            <circle
              cx="32"
              cy="34"
              r="24"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="4,3"
            />
            <polygon points="32,1 35,9 32,7 29,9" fill="#fef08a" />
            <polygon points="8,22 15,25 11,28" fill="#38bdf8" />
            <polygon points="56,22 49,25 53,28" fill="#38bdf8" />
          </g>
        )}

        {/* Multi-layered flowing cape */}
        {state !== 'defeat' && (
          <g
            className={state === 'walk' ? 'animate-[capeFlutter_0.5s_ease-in-out_infinite_alternate]' : ''}
            style={{ transformOrigin: '21px 26px' }}
          >
            <path
              d={
                state === 'walk'
                  ? 'M21,26 L12,46 L18,49 L25,44 L24,28 Z'
                  : state === 'attack' || state === 'ultimate'
                  ? 'M21,26 L6,36 L15,42 L24,40 L24,28 Z'
                  : state === 'victory'
                  ? 'M21,26 L14,48 L22,46 L25,28 Z'
                  : 'M21,26 L15,48 L25,46 L25,28 Z'
              }
              fill={capeColor}
            />
            {/* Cape inner shadow fold */}
            <path
              d={
                state === 'walk'
                  ? 'M21,26 L15,45 L18,48 L22,27 Z'
                  : 'M21,26 L18,46 L20,47 L23,27 Z'
              }
              fill="#1e1b4b"
              opacity="0.3"
            />
          </g>
        )}

        {/* Legs & Sabatons (Boots) with animated steps */}
        {state === 'walk' ? (
          <g>
            {/* Left leg (front side) swinging forward */}
            <g
              className="animate-[legLeftWalk_0.6s_ease-in-out_infinite]"
              style={{ transformOrigin: '27.5px 46px' }}
            >
              <rect x="25" y="46" width="5" height="10" fill="#334155" />
              <rect x="23" y="54" width="8" height="5" fill="#1e293b" />
              <rect x="23" y="55" width="2" height="3" fill="#64748b" /> {/* Toe highlight */}
            </g>
            {/* Right leg (back side) swinging back */}
            <g
              className="animate-[legRightWalk_0.6s_ease-in-out_infinite]"
              style={{ transformOrigin: '36.5px 46px' }}
            >
              <rect x="34" y="45" width="5" height="10" fill="#475569" />
              <rect x="32" y="53" width="8" height="5" fill="#334155" />
            </g>
          </g>
        ) : state === 'defeat' ? (
          <g>
            {/* Kneeling down */}
            <rect x="24" y="50" width="16" height="5" fill="#334155" />
            <rect x="20" y="54" width="10" height="4" fill="#1e293b" />
            <rect x="34" y="53" width="7" height="4" fill="#1e293b" />
          </g>
        ) : (
          <g>
            <rect x="26" y="46" width="5" height="10" fill="#334155" />
            <rect x="24" y="54" width="8" height="5" fill="#1e293b" />
            <rect x="33" y="46" width="5" height="10" fill="#475569" />
            <rect x="32" y="54" width="8" height="5" fill="#334155" />
          </g>
        )}

        {/* Torso / Breastplate */}
        <g
          transform={state === 'defeat' ? 'translate(0, 4)' : ''}
          className={state === 'walk' ? 'animate-[torsoWalk_0.6s_ease-in-out_infinite]' : ''}
          style={{ transformOrigin: '32px 42px' }}
        >
          <rect x="24" y="26" width="16" height="20" fill={armorColor} rx="1" />
          <rect x="26" y="27" width="12" height="18" fill={armorHighlight} opacity="0.25" />
          
          {/* Armor Emblem / Heraldic Sigil */}
          <line x1="32" y1="28" x2="32" y2="44" stroke={trimColor} strokeWidth="2" />
          <line x1="26" y1="34" x2="38" y2="34" stroke={trimColor} strokeWidth="2" />
          <rect x="30" y="32" width="4" height="4" fill="#fef08a" opacity="0.8" />
          
          {/* Belt & Buckle */}
          <rect x="24" y="42" width="16" height="4" fill="#78350f" />
          <rect x="30" y="42" width="4" height="4" fill={trimColor} />
        </g>

        {/* Head / Helmet */}
        {state === 'defeat' ? (
          <g transform="translate(0, 8)">
            <rect x="25" y="14" width="14" height="14" fill={armorColor} rx="2" />
            <rect x="27" y="21" width="10" height="3" fill="#0f172a" />
          </g>
        ) : (
          <g
            className={state === 'walk' ? 'animate-[headBob_0.6s_ease-in-out_infinite]' : ''}
            style={{ transformOrigin: '32px 26px' }}
          >
            {/* Helm Base */}
            <rect x="25" y="12" width="14" height="14" fill={armorColor} rx="2" />
            <rect x="26" y="13" width="12" height="4" fill={armorHighlight} opacity="0.3" />
            
            {/* Visor Slit */}
            <rect x="27" y="17" width="11" height="3" fill="#0f172a" />
            
            {/* Glowing Hero Eyes (Blinks softly in idle) */}
            <rect x="29" y="18" width="2" height="1" fill="#38bdf8" className="animate-pulse" />
            <rect x="34" y="18" width="2" height="1" fill="#38bdf8" className="animate-pulse" />

            {/* Helmet Plume / Hair */}
            {isFemale ? (
              <g
                className={state === 'walk' ? 'animate-[plumeFlutter_0.5s_ease-in-out_infinite_alternate]' : ''}
                style={{ transformOrigin: '24px 16px' }}
              >
                {/* Flowing golden hair behind helm */}
                <path d="M24,16 L17,32 L24,28 Z" fill={hairColor} />
                <path d="M25,12 L32,5 L35,12 Z" fill="#ef476f" />
                <circle cx="32" cy="6" r="2" fill="#ffd166" />
              </g>
            ) : (
              <g
                className={state === 'walk' ? 'animate-[plumeFlutter_0.5s_ease-in-out_infinite_alternate]' : ''}
                style={{ transformOrigin: '26px 12px' }}
              >
                {/* Regal Knight Crest Plume with dynamic flutter */}
                <path d="M26,12 Q32,2 38,12 Z" fill="#2563eb" />
                <rect x="30" y="5" width="4" height="8" fill="#60a5fa" />
              </g>
            )}
          </g>
        )}

        {/* Shield (Left Arm) */}
        {state !== 'defeat' && (
          <g transform={state === 'attack' ? 'translate(-4, 3) rotate(-10)' : ''}>
            <g
              className={state === 'walk' ? 'animate-[shieldWalk_0.6s_ease-in-out_infinite]' : ''}
              style={{ transformOrigin: '20px 30px' }}
            >
              <path
                d="M16,28 L24,28 L24,42 L20,46 L16,42 Z"
                fill={armorColor}
                stroke="#0f172a"
                strokeWidth="1"
              />
              {/* Shield Emblem */}
              <path d="M18,30 L22,30 L20,35 Z" fill={trimColor} />
              <line x1="20" y1="30" x2="20" y2="41" stroke={trimColor} strokeWidth="1" />
              {/* Rim highlight */}
              <line x1="17" y1="29" x2="23" y2="29" stroke={armorHighlight} strokeWidth="1" opacity="0.5" />
            </g>
          </g>
        )}

        {/* Sword & Right Arm with Dynamic Actions */}
        {state === 'ultimate' ? (
          <g>
            {/* Dual Celestial Slash Arcs */}
            <path
              d="M28,2 C64,6 76,32 62,58"
              fill="none"
              stroke="#fef08a"
              strokeWidth="8"
              strokeLinecap="round"
              className="animate-[slashArc_0.7s_ease-out_forwards]"
            />
            <path
              d="M32,6 C58,10 68,32 56,54"
              fill="none"
              stroke="url(#slashGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              className="animate-[slashArc_0.65s_ease-out_0.1s_forwards]"
            />
            {/* Supercharged Excalibur Greatblade firmly anchored at shoulder */}
            <g transform="translate(38, 25)">
              <g
                className="animate-[swordSwing_0.75s_cubic-bezier(0.3,0,0.2,1)_forwards]"
                style={{ transformOrigin: '2.5px 4px' }}
              >
                <rect x="0" y="0" width="5" height="10" fill={armorColor} />
                {/* Winged Golden Crossguard */}
                <rect x="-6" y="8" width="17" height="4" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.5" />
                {/* Outer Azure Energy Blade */}
                <rect x="-1" y="12" width="7" height="36" fill="#38bdf8" opacity="0.8" />
                {/* Inner Solar Core Blade */}
                <rect x="1" y="12" width="3" height="34" fill="#fef08a" />
                <polygon points="-1,48 6,48 2.5,56" fill="#ffffff" />
              </g>
            </g>
          </g>
        ) : state === 'attack' ? (
          <g>
            {/* Slashing Motion Blur Arc */}
            <path
              d="M32,8 C56,12 66,32 58,54"
              fill="none"
              stroke="url(#slashGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              className="animate-[slashArc_0.5s_ease-out_forwards]"
            />
            {/* Knight sword swinging overhead -> forward */}
            <g transform="translate(38, 25)">
              <g
                className="animate-[swordSwing_0.55s_cubic-bezier(0.3,0,0.2,1)_forwards]"
                style={{ transformOrigin: '2.5px 4px' }}
              >
                <rect x="0" y="0" width="5" height="10" fill={armorColor} />
                <rect x="-4" y="9" width="13" height="3" fill="#ffd166" />
                <rect x="1" y="12" width="3" height="26" fill="#f8fafc" stroke="#94a3b8" />
                <polygon points="1,38 4,38 2.5,42" fill="#ffffff" />
              </g>
            </g>
          </g>
        ) : state === 'victory' ? (
          <g>
            {/* Radiant Victory Star Glow */}
            <circle cx="40" cy="8" r="16" fill="url(#victoryGlow)" />
            {/* Sword raised high */}
            <g transform="translate(39, 4)">
              <rect x="-2" y="18" width="5" height="10" fill={armorColor} />
              <rect x="-6" y="15" width="13" height="3" fill="#ffd166" />
              <rect x="-1" y="-6" width="3" height="22" fill="#f8fafc" stroke="#94a3b8" />
              {/* Gleaming Star Sparkle */}
              <g transform="translate(0, -8)" className="animate-spin" style={{ animationDuration: '4s' }}>
                <polygon points="0,-7 2,-2 7,0 2,2 0,7 -2,2 -7,0 -2,-2" fill="#fef08a" />
              </g>
            </g>
          </g>
        ) : state === 'defeat' ? (
          <g transform="translate(42, 54) rotate(80)">
            <rect x="-2" y="0" width="10" height="3" fill="#ffd166" />
            <rect x="2" y="3" width="3" height="16" fill="#cbd5e1" stroke="#64748b" />
          </g>
        ) : (
          <g transform="translate(38, 25)">
            <g
              className={state === 'walk' ? 'animate-[swordWalk_0.6s_ease-in-out_infinite]' : ''}
              style={{ transformOrigin: '2px 8px' }}
            >
              <rect x="0" y="4" width="5" height="10" fill={armorColor} />
              <rect x="-2" y="12" width="9" height="3" fill="#ffd166" />
              <rect x="1" y="15" width="3" height="18" fill="#f8fafc" stroke="#94a3b8" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
