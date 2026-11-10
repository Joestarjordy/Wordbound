import React from 'react';
import { Stage } from '../../types/game';

interface RealmBackdropProps {
  stage: Stage;
  inCombat: boolean;
}

interface SeamlessTrackProps {
  animationName: 'parallaxGround' | 'parallaxMid' | 'parallaxFar' | 'cloudDrift';
  duration: string;
  inCombat: boolean;
  children: React.ReactNode;
}

const SeamlessTrack: React.FC<SeamlessTrackProps> = ({
  animationName,
  duration,
  inCombat,
  children,
}) => (
  <div
    className="absolute inset-y-0 left-0 w-[200%] h-full flex pointer-events-none"
    style={{
      animation: `${animationName} ${duration} linear infinite`,
      animationPlayState: inCombat ? 'paused' : 'running',
      willChange: 'transform',
    }}
  >
    <svg
      viewBox="0 0 1000 180"
      preserveAspectRatio="none"
      className="w-1/2 h-full flex-shrink-0"
      style={{ shapeRendering: 'crispEdges' }}
    >
      {children}
    </svg>
    <svg
      viewBox="0 0 1000 180"
      preserveAspectRatio="none"
      className="w-1/2 h-full flex-shrink-0"
      aria-hidden="true"
      style={{ shapeRendering: 'crispEdges' }}
    >
      {children}
    </svg>
  </div>
);

const PixelStar: React.FC<{
  x: number;
  y: number;
  color: string;
  size?: number;
  delay?: string;
  duration?: string;
}> = ({ x, y, color, size = 2, delay = '0s', duration = '3s' }) => (
  <g
    transform={`translate(${x} ${y})`}
    fill={color}
    style={{
      animation: `starTwinkle ${duration} ease-in-out infinite`,
      animationDelay: delay,
      transformOrigin: `${x}px ${y}px`,
    }}
  >
    <rect x={-size / 2} y={-size / 2} width={size} height={size} />
    <rect x={-size * 1.5} y={-0.5} width={size * 3} height={1} opacity="0.65" />
    <rect x={-0.5} y={-size * 1.5} width={1} height={size * 3} opacity="0.65" />
  </g>
);

/* =========================================================================
   1. FOREST BIOME: Whispering Woods
   ========================================================================= */

const ForestSky: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ shapeRendering: 'crispEdges' }}
  >
    <defs>
      <linearGradient id="forestSkyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#051329" />
        <stop offset="45%" stopColor="#082f49" />
        <stop offset="75%" stopColor="#0d5750" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
      <radialGradient id="forestMoonHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.85" />
        <stop offset="45%" stopColor="#fef08a" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="180" fill="url(#forestSkyGrad)" />
    {/* Harvest Moon with Halo and Craters */}
    <circle cx="248" cy="42" r="32" fill="url(#forestMoonHalo)" />
    <circle cx="248" cy="42" r="18" fill="#fef08a" />
    <circle cx="244" cy="38" r="4" fill="#fde047" opacity="0.7" />
    <circle cx="254" cy="44" r="5" fill="#facc15" opacity="0.55" />
    <circle cx="250" cy="50" r="3" fill="#eab308" opacity="0.4" />
    {/* Twinkling Forest Constellations */}
    <PixelStar x={35} y={25} color="#fef08a" size={2} delay="0.2s" duration="2.8s" />
    <PixelStar x={78} y={48} color="#a7f3d0" size={2} delay="1.1s" duration="3.4s" />
    <PixelStar x={124} y={22} color="#fef08a" size={1.5} delay="1.8s" duration="2.5s" />
    <PixelStar x={172} y={38} color="#6ee7b7" size={2} delay="0.6s" duration="3.1s" />
    <PixelStar x={205} y={18} color="#fde68a" size={1.5} delay="2.2s" duration="3.8s" />
    <PixelStar x={295} y={32} color="#a7f3d0" size={2} delay="0.9s" duration="2.9s" />
  </svg>
);

const ForestClouds: React.FC = () => (
  <g fill="#0f766e" opacity="0.32">
    <path d="M40 32 Q65 18 95 32 Q125 18 155 32 Q175 42 165 50 Q135 56 75 52 Q45 52 40 32 Z" />
    <path d="M280 24 Q310 12 345 24 Q375 14 405 26 Q420 38 405 44 Q365 48 315 46 Q285 44 280 24 Z" />
    <path d="M540 35 Q570 20 605 35 Q635 22 665 35 Q680 46 665 52 Q625 56 575 54 Q545 52 540 35 Z" />
    <path d="M780 22 Q810 10 845 22 Q875 12 905 24 Q920 36 905 42 Q865 46 815 44 Q785 42 780 22 Z" />
  </g>
);

const ForestFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {/* Deepest Mountain Ridge (starts & ends at y=110) */}
    <path
      d="M0 110 L50 82 L90 102 L140 68 L195 98 L250 60 L310 104 L375 72 L430 100 L490 64 L550 96 L615 56 L680 102 L745 70 L810 98 L875 62 L940 92 L1000 110 V160 H0 Z"
      fill={color}
      opacity="0.85"
    />
    {/* Pine Ridge silhouettes along mountain foot */}
    <path
      d="M0 128 L35 118 L70 128 L105 116 L140 128 L175 115 L210 128 L245 114 L280 128 L315 116 L350 128 L385 114 L420 128 L455 116 L490 128 L525 114 L560 128 L595 116 L630 128 L665 114 L700 128 L735 116 L770 128 L805 114 L840 128 L875 116 L910 128 L945 114 L980 128 L1000 122 V160 H0 Z"
      fill="#062e2a"
      opacity="0.95"
    />
    {/* Distant ancient elven tower silhouette */}
    <g fill="#082725" opacity="0.9">
      <rect x="420" y="82" width="14" height="42" />
      <polygon points="427,62 420,82 434,82" />
      <rect x="425" y="92" width="4" height="6" fill="#fde68a" opacity="0.8" />
    </g>
  </g>
);

const ForestMidground: React.FC = () => (
  <g>
    {/* Ancient enchanted pines and oaks spanning 1000 units */}
    {[
      { x: 50, h: 72, type: 'pine' },
      { x: 155, h: 82, type: 'oak' },
      { x: 260, h: 76, type: 'pine' },
      { x: 385, h: 86, type: 'oak' },
      { x: 495, h: 74, type: 'pine' },
      { x: 610, h: 84, type: 'oak' },
      { x: 730, h: 78, type: 'pine' },
      { x: 850, h: 88, type: 'oak' },
      { x: 955, h: 72, type: 'pine' },
    ].map((tree, i) => (
      <g key={i} transform={`translate(${tree.x} 150)`}>
        {/* Trunk */}
        <rect x="-4" y={-tree.h + 20} width="8" height={tree.h - 18} fill="#271507" />
        <rect x="-2" y={-tree.h + 22} width="3" height={tree.h - 22} fill="#59310c" />
        {tree.type === 'pine' ? (
          /* Multi-tiered Pine Needles */
          <g>
            <polygon points={`0,${-tree.h} -26,${-tree.h + 30} 26,${-tree.h + 30}`} fill="#064e3b" />
            <polygon points={`0,${-tree.h + 18} -32,${-tree.h + 50} 32,${-tree.h + 50}`} fill="#047857" />
            <polygon points={`0,${-tree.h + 36} -38,${-tree.h + 68} 38,${-tree.h + 68}`} fill="#065f46" />
            {/* Highlights */}
            <polygon points={`0,${-tree.h + 2} -14,${-tree.h + 24} 14,${-tree.h + 24}`} fill="#10b981" opacity="0.75" />
            <polygon points={`0,${-tree.h + 20} -18,${-tree.h + 42} 18,${-tree.h + 42}`} fill="#10b981" opacity="0.7" />
          </g>
        ) : (
          /* Ancient Lush Oak Canopy */
          <g>
            <circle cx="0" cy={-tree.h + 16} r="32" fill="#064e3b" />
            <circle cx="-16" cy={-tree.h + 24} r="22" fill="#047857" />
            <circle cx="16" cy={-tree.h + 22} r="24" fill="#047857" />
            <circle cx="0" cy={-tree.h + 8} r="18" fill="#10b981" opacity="0.75" />
            <circle cx="-10" cy={-tree.h + 20} r="14" fill="#34d399" opacity="0.65" />
            {/* Hanging moss fronds */}
            <rect x="-18" y={-tree.h + 42} width="3" height="12" fill="#15803d" />
            <rect x="12" y={-tree.h + 40} width="3" height="15" fill="#15803d" />
          </g>
        )}
      </g>
    ))}

    {/* Ancient Druidic Stone Arch with Glowing Runes at x=320 */}
    <g transform="translate(320 150)">
      <rect x="-24" y="-55" width="10" height="55" fill="#1e293b" />
      <rect x="14" y="-55" width="10" height="55" fill="#1e293b" />
      <rect x="-28" y="-64" width="56" height="10" fill="#334155" />
      {/* Stone highlights */}
      <rect x="-22" y="-52" width="3" height="50" fill="#475569" />
      <rect x="16" y="-52" width="3" height="50" fill="#475569" />
      {/* Glowing emerald runes */}
      <rect x="-20" y="-36" width="4" height="4" fill="#34d399" />
      <rect x="18" y="-40" width="4" height="4" fill="#34d399" />
      <rect x="-5" y="-62" width="10" height="4" fill="#6ee7b7" />
    </g>

    {/* Forest Lantern Shrine at x=780 */}
    <g transform="translate(780 150)">
      <rect x="-8" y="-40" width="16" height="40" fill="#451a03" />
      <polygon points="0,-52 -16,-38 16,-38" fill="#78350f" />
      {/* Glowing Lantern */}
      <rect x="-5" y="-34" width="10" height="12" fill="#fef08a" opacity="0.9" />
      <rect x="-3" y="-32" width="6" height="8" fill="#ffffff" />
    </g>

    {/* Glowing Forest Mushrooms on tree roots */}
    {[
      { x: 145, c: '#06b6d4' },
      { x: 395, c: '#a855f7' },
      { x: 620, c: '#06b6d4' },
      { x: 860, c: '#a855f7' },
    ].map((shroom, i) => (
      <g key={i} transform={`translate(${shroom.x} 148)`}>
        <rect x="-1" y="-5" width="2" height="6" fill="#f8fafc" />
        <ellipse cx="0" cy="-6" rx="5" ry="3" fill={shroom.c} />
        <circle cx="0" cy="-6" r="1.5" fill="#ffffff" opacity="0.8" />
      </g>
    ))}
  </g>
);

const ForestGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    {/* Earth base layer */}
    <rect x="0" y="150" width="1000" height="30" fill={groundColor} />
    {/* Winding Cobblestone Road */}
    <path
      d="M0 153 Q125 151 250 154 T500 152 T750 154 T1000 153 V180 H0 Z"
      fill={pathColor}
    />
    {/* Shaded cobblestones across 1000 units */}
    {Array.from({ length: 42 }).map((_, i) => {
      const stoneX = (i * 24 + (i % 3) * 3) % 995;
      const stoneY = 155 + (i % 4) * 5;
      const stoneW = 10 + (i % 3) * 3;
      const stoneH = 4 + (i % 2) * 2;
      return (
        <g key={i} transform={`translate(${stoneX} ${stoneY})`}>
          <rect x="0" y="0" width={stoneW} height={stoneH} fill="#374151" rx="1" />
          <rect x="1" y="0" width={stoneW - 2} height="1" fill="#6b7280" />
          <rect x="1" y={stoneH - 1} width={stoneW - 2} height="1" fill="#1f2937" />
        </g>
      );
    })}
    {/* Grass tufts and roadside wildflowers */}
    {Array.from({ length: 30 }).map((_, i) => {
      const x = i * 33 + 7;
      const flowerColor = i % 3 === 0 ? '#fef08a' : i % 3 === 1 ? '#38bdf8' : '#fb7185';
      return (
        <g key={i} transform={`translate(${x} 150)`}>
          {/* Grass blade blades */}
          <rect x="-3" y="-5" width="2" height="6" fill="#22c55e" />
          <rect x="0" y="-7" width="2" height="8" fill="#4ade80" />
          <rect x="3" y="-4" width="2" height="5" fill="#16a34a" />
          {/* Dotted pixel flowers */}
          {i % 2 === 0 && <circle cx="1" cy="-8" r="1.5" fill={flowerColor} />}
        </g>
      );
    })}
  </g>
);

const ForestParticles: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { x: '12%', y: '58%', d: '0s', dur: '4.2s' },
      { x: '28%', y: '65%', d: '1.4s', dur: '3.8s' },
      { x: '45%', y: '52%', d: '2.5s', dur: '4.5s' },
      { x: '63%', y: '68%', d: '0.8s', dur: '4.0s' },
      { x: '78%', y: '56%', d: '2.1s', dur: '3.6s' },
      { x: '91%', y: '62%', d: '1.7s', dur: '4.4s' },
    ].map((p, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-lime-300 shadow-[0_0_8px_#a3e635]"
        style={{
          left: p.x,
          top: p.y,
          animation: `fireflyDrift ${p.dur} ease-in-out infinite`,
          animationDelay: p.d,
        }}
      />
    ))}
  </div>
);

/* =========================================================================
   2. RUINS BIOME: Outlaw Ridge & Titan's Quarry
   ========================================================================= */

const RuinsSky: React.FC<{ stageId: number }> = ({ stageId }) => {
  const isQuarry = stageId === 2;
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ shapeRendering: 'crispEdges' }}
    >
      <defs>
        <linearGradient id="ruinsSkyGrad" x1="0" y1="0" x2="0" y2="1">
          {isQuarry ? (
            <>
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="50%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#451a03" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="45%" stopColor="#1e1b4b" />
              <stop offset="80%" stopColor="#3730a3" />
              <stop offset="100%" stopColor="#334155" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#ruinsSkyGrad)" />
      {/* Twin Moons or Shattered Moon */}
      {isQuarry ? (
        <g>
          {/* Shattered ancient moon */}
          <circle cx="230" cy="40" r="16" fill="#d4d4d8" opacity="0.8" />
          <polygon points="216,36 226,30 220,44" fill="#a1a1aa" />
          {/* Orbiting fragments */}
          <rect x="252" y="32" width="3" height="3" fill="#e4e4e7" />
          <rect x="246" y="48" width="4" height="3" fill="#d4d4d8" />
          <rect x="210" y="46" width="3" height="2" fill="#a1a1aa" />
        </g>
      ) : (
        <g>
          {/* Twin Arcane Moons */}
          <circle cx="75" cy="42" r="16" fill="#c4b5fd" opacity="0.8" />
          <circle cx="70" cy="38" r="3" fill="#a78bfa" opacity="0.6" />
          <circle cx="112" cy="28" r="8" fill="#e0e7ff" opacity="0.65" />
        </g>
      )}
      {/* Constellations */}
      <PixelStar x={45} y={24} color="#fde047" size={1.5} delay="0.4s" />
      <PixelStar x={160} y={30} color="#a5b4fc" size={2} delay="1.2s" />
      <PixelStar x={275} y={26} color="#fde047" size={1.5} delay="1.9s" />
      <PixelStar x={295} y={54} color="#e0e7ff" size={2} delay="0.8s" />
    </svg>
  );
};

const RuinsFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {/* Jagged rocky bluffs spanning 1000 units (starts & ends at y=106) */}
    <path
      d="M0 106 L45 74 L85 96 L130 62 L180 92 L235 56 L290 98 L350 68 L410 94 L470 58 L530 90 L590 54 L650 96 L710 66 L770 92 L830 58 L890 88 L950 64 L1000 106 V160 H0 Z"
      fill={color}
    />
    {/* Ruined Colossal Aqueduct Arches spanning the horizon */}
    <g fill="#1e293b" opacity="0.85">
      <rect x="180" y="80" width="160" height="8" />
      {[190, 225, 260, 295, 330].map((x) => (
        <g key={x}>
          <rect x={x} y="88" width="8" height="35" />
          <path d={`M${x - 6} 88 Q${x + 4} 76 ${x + 14} 88 Z`} />
        </g>
      ))}
      <rect x="680" y="76" width="180" height="8" />
      {[690, 725, 760, 795, 830].map((x) => (
        <g key={x}>
          <rect x={x} y="84" width="8" height="38" />
          <path d={`M${x - 6} 84 Q${x + 4} 72 ${x + 14} 84 Z`} />
        </g>
      ))}
    </g>
  </g>
);

const RuinsMidground: React.FC = () => (
  <g>
    {/* Ancient fluted Corinthian pillars and broken columns */}
    {[
      { x: 90, h: 88, broken: false },
      { x: 230, h: 54, broken: true },
      { x: 420, h: 92, broken: false },
      { x: 570, h: 48, broken: true },
      { x: 740, h: 86, broken: false },
      { x: 890, h: 60, broken: true },
    ].map((col, i) => (
      <g key={i} transform={`translate(${col.x} 150)`}>
        {/* Column Base */}
        <rect x="-14" y="-8" width="28" height="8" fill="#334155" />
        <rect x="-12" y="-12" width="24" height="4" fill="#475569" />
        {/* Column Shaft */}
        <rect x="-9" y={-col.h + 8} width="18" height={col.h - 20} fill="#475569" />
        <rect x="-6" y={-col.h + 8} width="4" height={col.h - 20} fill="#64748b" />
        <rect x="2" y={-col.h + 8} width="4" height={col.h - 20} fill="#334155" />
        {/* Capital */}
        {col.broken ? (
          /* Jagged crack top */
          <polygon points={`-9,${-col.h + 8} -3,${-col.h + 2} 4,${-col.h + 12} 9,${-col.h + 8}`} fill="#334155" />
        ) : (
          /* Ornate carved capital */
          <g>
            <rect x="-14" y={-col.h} width="28" height="8" fill="#334155" />
            <rect x="-11" y={-col.h + 4} width="22" height="4" fill="#64748b" />
          </g>
        )}
      </g>
    ))}

    {/* Crumbling Triumphal Archway at x=340 */}
    <g transform="translate(340 150)">
      <rect x="-35" y="-80" width="16" height="80" fill="#334155" />
      <rect x="19" y="-80" width="16" height="80" fill="#334155" />
      <rect x="-42" y="-92" width="84" height="12" fill="#475569" />
      {/* Arch vault */}
      <path d="M-19 -50 Q0 -75 19 -50" stroke="#1e293b" strokeWidth="6" fill="none" />
      {/* Hanging ivy vines */}
      <rect x="-12" y="-55" width="3" height="22" fill="#15803d" />
      <rect x="8" y="-58" width="3" height="18" fill="#16a34a" />
    </g>

    {/* Colossal Warrior Statue at x=660 */}
    <g transform="translate(660 150)">
      {/* Pedestal */}
      <rect x="-16" y="-20" width="32" height="20" fill="#334155" />
      <rect x="-14" y="-18" width="28" height="4" fill="#64748b" />
      {/* Statue Body */}
      <rect x="-8" y="-62" width="16" height="42" fill="#475569" />
      <circle cx="0" cy="-68" r="8" fill="#64748b" />
      {/* Sword resting point down */}
      <rect x="9" y="-60" width="3" height="48" fill="#94a3b8" />
      <rect x="5" y="-52" width="11" height="3" fill="#cbd5e1" />
    </g>

    {/* Floating Arcane Mana Crystals at x=170 and x=820 */}
    {[170, 820].map((cx) => (
      <g key={cx} transform={`translate(${cx} 150)`}>
        {/* Stone Altar */}
        <rect x="-12" y="-30" width="24" height="30" fill="#334155" />
        <polygon points="0,-28 -14,-32 14,-32" fill="#64748b" />
        {/* Levitating Crystal */}
        <polygon points="0,-60 -8,-45 0,-34 8,-45" fill="#38bdf8" opacity="0.9" />
        <polygon points="0,-58 -4,-45 0,-36 4,-45" fill="#e0f2fe" opacity="0.8" />
        {/* Glow Ring */}
        <circle cx="0" cy="-45" r="12" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
      </g>
    ))}
  </g>
);

const RuinsGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    {/* Earth / rubble foundation */}
    <rect x="0" y="150" width="1000" height="30" fill={groundColor} />
    {/* Ancient Roman Paved Flagstones */}
    <rect x="0" y="152" width="1000" height="28" fill={pathColor} />
    {/* Inlaid gold central rune path */}
    <rect x="0" y="162" width="1000" height="3" fill="#f59e0b" opacity="0.65" />
    <rect x="0" y="163" width="1000" height="1" fill="#fef08a" opacity="0.9" />
    {/* Large cracked stone tiles */}
    {Array.from({ length: 36 }).map((_, i) => {
      const x = i * 28;
      return (
        <g key={i} transform={`translate(${x} 152)`}>
          <rect x="0" y="0" width="27" height="28" fill="none" stroke="#1f2937" strokeWidth="1" />
          {/* Subtle stone highlights */}
          <rect x="2" y="2" width="23" height="1" fill="#71717a" opacity="0.5" />
          {/* Random stone cracks */}
          {i % 3 === 0 && (
            <path d="M4 8 L10 14 L18 12" stroke="#18181b" strokeWidth="1" fill="none" />
          )}
          {/* Weeds in cracks */}
          {i % 4 === 1 && (
            <rect x="24" y="2" width="2" height="5" fill="#84cc16" />
          )}
        </g>
      );
    })}
  </g>
);

/* =========================================================================
   3. CRYPT BIOME: Forgotten Crypts & Abyssal Chasm
   ========================================================================= */

const CryptSky: React.FC<{ stageId: number }> = ({ stageId }) => {
  const isAbyss = stageId === 1;
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ shapeRendering: 'crispEdges' }}
    >
      <defs>
        <linearGradient id="cryptSkyGrad" x1="0" y1="0" x2="0" y2="1">
          {isAbyss ? (
            <>
              <stop offset="0%" stopColor="#02000a" />
              <stop offset="50%" stopColor="#2e0854" />
              <stop offset="100%" stopColor="#170b2f" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#020617" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#312e81" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#cryptSkyGrad)" />
      {/* Abyssal Eclipsed Moon with Violet Corona */}
      <circle cx="230" cy="38" r="28" fill="#c084fc" opacity="0.25" />
      <circle cx="230" cy="38" r="16" fill="#090514" />
      <circle cx="230" cy="38" r="15" fill="none" stroke="#e879f9" strokeWidth="1.5" opacity="0.75" />
      {/* Shimmering Phantom Aurora Veil */}
      <path
        d="M0 45 Q80 15 160 40 T320 30 V70 Q240 50 160 65 T0 55 Z"
        fill="#a855f7"
        opacity="0.28"
        style={{ animation: 'auroraPulse 6s ease-in-out infinite' }}
      />
      {/* Constellations */}
      <PixelStar x={55} y={28} color="#c084fc" size={2} delay="0.5s" />
      <PixelStar x={120} y={44} color="#38bdf8" size={1.5} delay="1.5s" />
      <PixelStar x={185} y={22} color="#e879f9" size={2} delay="2.1s" />
      <PixelStar x={285} y={48} color="#c084fc" size={1.5} delay="1.0s" />
    </svg>
  );
};

const CryptFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {/* Jagged gothic mausoleum & jagged bluffs horizon (starts & ends at y=108) */}
    <path
      d="M0 108 L40 76 L80 98 L125 58 L175 92 L225 52 L280 96 L340 64 L400 92 L460 54 L520 88 L580 50 L640 94 L700 62 L760 90 L820 56 L880 88 L940 60 L1000 108 V160 H0 Z"
      fill={color}
    />
    {/* Distant gothic cemetery spires */}
    {[130, 275, 430, 595, 755, 915].map((x) => (
      <g key={x} fill="#090514" opacity="0.95">
        <polygon points={`${x},40 ${x - 6},85 ${x + 6},85`} />
        <rect x={x - 1} y="32" width="2" height="12" fill="#c084fc" opacity="0.7" />
      </g>
    ))}
  </g>
);

const CryptMidground: React.FC = () => (
  <g>
    {/* Gothic Mausoleums at x=190 and x=720 */}
    {[190, 720].map((mx) => (
      <g key={mx} transform={`translate(${mx} 150)`}>
        {/* Tomb Structure */}
        <rect x="-32" y="-72" width="64" height="72" fill="#1e1b4b" />
        <polygon points="0,-92 -36,-70 36,-70" fill="#312e81" />
        {/* Gothic Arched Entrance */}
        <path d="M-14 0 V-42 Q0 -54 14 -42 V0 Z" fill="#020617" />
        {/* Rose Stained Glass Window with Violet Glow */}
        <circle cx="0" cy="-60" r="8" fill="#d946ef" opacity="0.85" />
        <circle cx="0" cy="-60" r="4" fill="#fdf4ff" />
      </g>
    ))}

    {/* Wrought Iron Cemetery Gates with Gargoyles at x=440 */}
    <g transform="translate(440 150)">
      <rect x="-30" y="-65" width="10" height="65" fill="#111827" />
      <rect x="20" y="-65" width="10" height="65" fill="#111827" />
      {/* Gargoyle finials */}
      <polygon points="-25,-75 -32,-65 -18,-65" fill="#475569" />
      <polygon points="25,-75 18,-65 32,-65" fill="#475569" />
      {/* Iron bars */}
      {[-16, -8, 0, 8, 16].map((bx) => (
        <g key={bx}>
          <rect x={bx} y="-55" width="2" height="55" fill="#374151" />
          <polygon points={`${bx + 1},-60 ${bx - 2},-54 ${bx + 4},-54`} fill="#64748b" />
        </g>
      ))}
    </g>

    {/* Celtic Crosses and Weathered Tombstones */}
    {[
      { x: 75, type: 'cross' },
      { x: 310, type: 'tomb' },
      { x: 570, type: 'cross' },
      { x: 860, type: 'tomb' },
      { x: 960, type: 'cross' },
    ].map((marker, i) => (
      <g key={i} transform={`translate(${marker.x} 150)`}>
        {marker.type === 'cross' ? (
          <g fill="#334155">
            <rect x="-3" y="-38" width="6" height="38" />
            <rect x="-11" y="-30" width="22" height="6" />
            <circle cx="0" cy="-27" r="7" fill="none" stroke="#475569" strokeWidth="2" />
          </g>
        ) : (
          <g fill="#1e293b">
            <path d="M-10 0 V-28 Q0 -36 10 -28 V0 Z" />
            <rect x="-6" y="-20" width="12" height="2" fill="#475569" />
          </g>
        )}
      </g>
    ))}

    {/* Spectral Hanging Iron Lanterns with Cyan Ghost Flames */}
    {[260, 620].map((lx) => (
      <g key={lx} transform={`translate(${lx} 150)`}>
        <rect x="-2" y="-55" width="4" height="55" fill="#1f2937" />
        <rect x="-2" y="-58" width="16" height="3" fill="#374151" />
        {/* Hanging Lantern */}
        <rect x="10" y="-55" width="1" height="8" fill="#9ca3af" />
        <rect x="6" y="-47" width="9" height="12" fill="#22d3ee" opacity="0.85" />
        <rect x="8" y="-45" width="5" height="8" fill="#ffffff" />
      </g>
    ))}
  </g>
);

const CryptGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    {/* Dark obsidian earth foundation */}
    <rect x="0" y="150" width="1000" height="30" fill={groundColor} />
    {/* Crypt Flagstones */}
    <rect x="0" y="152" width="1000" height="28" fill={pathColor} />
    {/* Hexagonal and irregular paving blocks */}
    {Array.from({ length: 38 }).map((_, i) => {
      const x = i * 26 + 3;
      return (
        <g key={i} transform={`translate(${x} 153)`}>
          <rect x="0" y="0" width="24" height="25" fill="#110924" stroke="#240046" strokeWidth="1" />
          {/* Eerie glowing purple moss in stone joints */}
          {i % 2 === 0 && (
            <rect x="1" y="23" width="22" height="2" fill="#c084fc" opacity="0.75" />
          )}
          {i % 4 === 1 && (
            <rect x="23" y="1" width="2" height="22" fill="#22d3ee" opacity="0.5" />
          )}
        </g>
      );
    })}
    {/* Low rolling spectral ground mist */}
    <path
      d="M0 151 Q125 146 250 152 T500 148 T750 153 T1000 150 V158 H0 Z"
      fill="#c084fc"
      opacity="0.25"
    />
  </g>
);

const CryptParticles: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { x: '18%', y: '62%', d: '0.2s', dur: '5.2s' },
      { x: '35%', y: '58%', d: '1.8s', dur: '4.8s' },
      { x: '52%', y: '66%', d: '0.9s', dur: '5.5s' },
      { x: '71%', y: '54%', d: '2.4s', dur: '4.6s' },
      { x: '86%', y: '64%', d: '1.3s', dur: '5.0s' },
    ].map((p, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_#38bdf8]"
        style={{
          left: p.x,
          top: p.y,
          animation: `soulWispDrift ${p.dur} ease-in-out infinite`,
          animationDelay: p.d,
        }}
      />
    ))}
  </div>
);

/* =========================================================================
   4. VOLCANO BIOME: Crimson Caldera
   ========================================================================= */

const VolcanoSky: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ shapeRendering: 'crispEdges' }}
  >
    <defs>
      <linearGradient id="volcanoSkyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1a0505" />
        <stop offset="40%" stopColor="#450a0a" />
        <stop offset="70%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <radialGradient id="bloodMoonGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ea580c" stopOpacity="0.9" />
        <stop offset="50%" stopColor="#dc2626" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="180" fill="url(#volcanoSkyGrad)" />
    {/* Blood Eclipse Moon with Solar Flame Corona */}
    <circle cx="245" cy="38" r="30" fill="url(#bloodMoonGlow)" />
    <circle cx="245" cy="38" r="16" fill="#1c0505" />
    <circle cx="245" cy="38" r="15" fill="none" stroke="#f97316" strokeWidth="2" opacity="0.85" />
    {/* Billowing Ash Clouds */}
    <path
      d="M10 25 Q40 10 75 22 Q110 8 145 25 Q170 38 150 48 Q110 52 70 48 Q30 48 10 25 Z"
      fill="#292524"
      opacity="0.45"
    />
    <path
      d="M180 18 Q215 5 250 18 Q285 8 315 22 Q325 35 305 42 Q265 46 220 44 Q190 40 180 18 Z"
      fill="#1c1917"
      opacity="0.5"
    />
    {/* Constellations and sparks */}
    <PixelStar x={35} y={32} color="#fdba74" size={2} delay="0.3s" />
    <PixelStar x={105} y={18} color="#f97316" size={1.5} delay="1.1s" />
    <PixelStar x={165} y={42} color="#fef08a" size={2} delay="1.9s" />
  </svg>
);

const VolcanoFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {/* Smoking Volcanic Peaks & Calderas (starts & ends at y=110) */}
    <path
      d="M0 110 L45 78 L90 104 L140 64 L190 98 L245 54 L305 100 L370 66 L435 98 L495 56 L560 92 L620 50 L685 98 L745 64 L810 96 L870 54 L935 88 L1000 110 V160 H0 Z"
      fill={color}
    />
    {/* Glowing Orange Lava Rivers cascading down the peaks */}
    <g stroke="#f97316" strokeWidth="3" fill="none" opacity="0.85">
      <path d="M245 54 L248 76 L242 102 L246 130" />
      <path d="M620 50 L624 72 L618 96 L622 128" />
      <path d="M870 54 L866 78 L872 104 L868 132" />
    </g>
    <g stroke="#fef08a" strokeWidth="1.5" fill="none" opacity="0.9">
      <path d="M245 54 L248 76 L242 102 L246 130" />
      <path d="M620 50 L624 72 L618 96 L622 128" />
      <path d="M870 54 L866 78 L872 104 L868 132" />
    </g>
  </g>
);

const VolcanoMidground: React.FC = () => (
  <g>
    {/* Giant Hexagonal Basalt Columns & Obsidian Spires */}
    {[
      { x: 90, h: 78 },
      { x: 230, h: 92 },
      { x: 440, h: 84 },
      { x: 620, h: 96 },
      { x: 790, h: 76 },
      { x: 920, h: 88 },
    ].map((col, i) => (
      <g key={i} transform={`translate(${col.x} 150)`}>
        <polygon
          points={`-18,0 -18,${-col.h + 8} 0,${-col.h} 18,${-col.h + 8} 18,0`}
          fill="#1c1917"
        />
        {/* Shaded facets */}
        <polygon
          points={`-18,${-col.h + 8} 0,${-col.h} 0,0 -18,0`}
          fill="#292524"
        />
        <polygon
          points={`0,${-col.h} 18,${-col.h + 8} 18,0 0,0`}
          fill="#44403c"
        />
        {/* Glowing thermal veins */}
        <line x1="0" y1={-col.h + 12} x2="0" y2="-10" stroke="#ef4444" strokeWidth="2" opacity="0.75" />
      </g>
    ))}

    {/* Lava Cascades into Magma Basins at x=340 and x=730 */}
    {[340, 730].map((lx) => (
      <g key={lx} transform={`translate(${lx} 150)`}>
        {/* Lava Fall stream */}
        <rect x="-8" y="-60" width="16" height="60" fill="#ea580c" />
        <rect x="-4" y="-60" width="8" height="60" fill="#fbbf24" />
        <rect x="-2" y="-60" width="4" height="60" fill="#fef08a" />
        {/* Boiling Magma Pool */}
        <ellipse cx="0" cy="0" rx="22" ry="6" fill="#ea580c" />
        <ellipse cx="0" cy="0" rx="14" ry="4" fill="#fef08a" />
      </g>
    ))}

    {/* Scorched Demonic Forge Altar at x=530 */}
    <g transform="translate(530 150)">
      <rect x="-16" y="-35" width="32" height="35" fill="#292524" />
      <polygon points="0,-45 -20,-32 20,-32" fill="#78350f" />
      {/* Roaring Forge Fire */}
      <polygon points="0,-52 -8,-35 8,-35" fill="#f97316" />
      <polygon points="0,-48 -4,-35 4,-35" fill="#fef08a" />
    </g>
  </g>
);

const VolcanoGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    {/* Scorched basalt foundation */}
    <rect x="0" y="150" width="1000" height="30" fill={groundColor} />
    {/* Hardened Lava Path */}
    <rect x="0" y="152" width="1000" height="28" fill={pathColor} />
    {/* Active glowing magma veins across the path */}
    <path
      d="M0 160 Q120 158 240 162 T480 159 T720 163 T1000 160"
      stroke="#ea580c"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M0 160 Q120 158 240 162 T480 159 T720 163 T1000 160"
      stroke="#fef08a"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Glowing cracks */}
    {Array.from({ length: 30 }).map((_, i) => {
      const x = i * 33 + 12;
      return (
        <g key={i} transform={`translate(${x} 154)`}>
          <rect x="0" y="0" width="22" height="22" fill="#1c1917" rx="2" />
          <path d="M2 11 L10 16 L20 8" stroke="#f97316" strokeWidth="1.5" fill="none" />
          <rect x="8" y="14" width="3" height="3" fill="#fef08a" />
        </g>
      );
    })}
  </g>
);

const VolcanoParticles: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { x: '14%', y: '65%', d: '0.1s', dur: '3.2s' },
      { x: '32%', y: '72%', d: '1.2s', dur: '2.8s' },
      { x: '50%', y: '58%', d: '2.1s', dur: '3.5s' },
      { x: '68%', y: '68%', d: '0.7s', dur: '3.0s' },
      { x: '84%', y: '62%', d: '1.8s', dur: '2.9s' },
    ].map((p, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f97316]"
        style={{
          left: p.x,
          top: p.y,
          animation: `emberDrift ${p.dur} ease-in-out infinite`,
          animationDelay: p.d,
        }}
      />
    ))}
  </div>
);

/* =========================================================================
   5. CITADEL BIOME: Citadel of the Wordbinder
   ========================================================================= */

const CitadelSky: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ shapeRendering: 'crispEdges' }}
  >
    <defs>
      <linearGradient id="citadelSkyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#030014" />
        <stop offset="45%" stopColor="#1e1040" />
        <stop offset="75%" stopColor="#31105e" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>
      <radialGradient id="astralSphereGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
        <stop offset="40%" stopColor="#f472b6" stopOpacity="0.6" />
        <stop offset="70%" stopColor="#818cf8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="320" height="180" fill="url(#citadelSkyGrad)" />
    {/* Celestial Singularity Sphere with Multi-colored Rings */}
    <circle cx="160" cy="38" r="32" fill="url(#astralSphereGlow)" />
    <circle cx="160" cy="38" r="14" fill="#fef08a" />
    {/* Cosmic Planetary Ring */}
    <ellipse
      cx="160"
      cy="38"
      rx="38"
      ry="10"
      fill="none"
      stroke="#f0abfc"
      strokeWidth="2"
      opacity="0.8"
      transform="rotate(-15 160 38)"
    />
    {/* Twinkling Constellations */}
    <PixelStar x={35} y={26} color="#bfdbfe" size={2} delay="0.2s" />
    <PixelStar x={85} y={48} color="#fbcfe8" size={1.5} delay="1.4s" />
    <PixelStar x={120} y={22} color="#fef08a" size={2} delay="2.3s" />
    <PixelStar x={215} y={24} color="#a7f3d0" size={1.5} delay="0.9s" />
    <PixelStar x={265} y={46} color="#bfdbfe" size={2} delay="1.8s" />
    <PixelStar x={295} y={22} color="#fbcfe8" size={1.5} delay="0.6s" />
  </svg>
);

const CitadelFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {/* Floating celestial sky islands and distant spires (starts & ends at y=106) */}
    <path
      d="M0 106 L40 76 L80 98 L130 58 L180 92 L230 48 L290 96 L350 62 L410 94 L470 52 L530 88 L590 46 L650 94 L710 60 L770 90 L830 54 L890 88 L950 58 L1000 106 V160 H0 Z"
      fill={color}
    />
    {/* Distant palace spires with golden roofs */}
    {[130, 290, 470, 650, 830].map((x) => (
      <g key={x} fill="#2e1065">
        <rect x={x - 8} y="55" width="16" height="45" />
        <polygon points={`${x},32 ${x - 10},55 ${x + 10},55`} fill="#d946ef" />
        <rect x={x - 2} y="62" width="4" height="8" fill="#fef08a" />
      </g>
    ))}
  </g>
);

const CitadelMidground: React.FC = () => (
  <g>
    {/* High Gothic-Astral Palace Towers at x=250 and x=720 */}
    {[250, 720].map((px) => (
      <g key={px} transform={`translate(${px} 150)`}>
        {/* Tower Body */}
        <rect x="-35" y="-88" width="70" height="88" fill="#4c1d95" />
        <polygon points="0,-115 -38,-86 38,-86" fill="#7e22ce" />
        {/* Rose Lancet Windows with Golden Glow */}
        <path d="M-12 -65 V-35 H12 V-65 Z" fill="#f0abfc" opacity="0.9" />
        <path d="M-12 -65 Q0 -75 12 -65" fill="#fef08a" />
        <circle cx="0" cy="-50" r="4" fill="#ffffff" />
      </g>
    ))}

    {/* Levitating Crystalline Rune Monoliths at x=110, 480, 860 */}
    {[110, 480, 860].map((mx) => (
      <g key={mx} transform={`translate(${mx} 150)`}>
        {/* Golden Base */}
        <rect x="-14" y="-12" width="28" height="12" fill="#78350f" />
        <rect x="-10" y="-16" width="20" height="4" fill="#f59e0b" />
        {/* Hovering Obelisk Crystal */}
        <polygon points="0,-68 -10,-48 0,-28 10,-48" fill="#c084fc" opacity="0.9" />
        <polygon points="0,-65 -5,-48 0,-32 5,-48" fill="#fdf4ff" opacity="0.85" />
        {/* Floating astral ring */}
        <ellipse cx="0" cy="-48" rx="16" ry="4" fill="none" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="3,2" />
      </g>
    ))}

    {/* Golden Royal Balustrade Arches */}
    {[360, 600].map((bx) => (
      <g key={bx} transform={`translate(${bx} 150)`}>
        <rect x="-25" y="-35" width="50" height="6" fill="#f59e0b" />
        {[-20, -10, 0, 10, 20].map((lx) => (
          <rect key={lx} x={lx - 1} y="-29" width="3" height="29" fill="#ffd166" />
        ))}
      </g>
    ))}
  </g>
);

const CitadelGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    {/* Royal indigo foundation */}
    <rect x="0" y="150" width="1000" height="30" fill={groundColor} />
    {/* Polished Midnight Marble Terrace */}
    <rect x="0" y="152" width="1000" height="28" fill={pathColor} />
    {/* Inlaid Gold Filigree Borders */}
    <rect x="0" y="153" width="1000" height="2" fill="#fbbf24" />
    <rect x="0" y="177" width="1000" height="2" fill="#fbbf24" />
    {/* Embedded star gems (sapphires, rubies, amethysts) */}
    {Array.from({ length: 32 }).map((_, i) => {
      const x = i * 31 + 10;
      const gemColor = i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#f43f5e' : '#c084fc';
      return (
        <g key={i} transform={`translate(${x} 165)`}>
          <polygon points="0,-4 4,0 0,4 -4,0" fill={gemColor} />
          <circle cx="0" cy="0" r="1" fill="#ffffff" />
        </g>
      );
    })}
  </g>
);

const CitadelParticles: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { x: '16%', y: '56%', d: '0.2s', dur: '4.0s' },
      { x: '36%', y: '64%', d: '1.5s', dur: '3.6s' },
      { x: '54%', y: '52%', d: '2.4s', dur: '4.2s' },
      { x: '72%', y: '68%', d: '0.9s', dur: '3.8s' },
      { x: '88%', y: '60%', d: '1.7s', dur: '4.4s' },
    ].map((p, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 rounded-full bg-pink-300 shadow-[0_0_8px_#f472b6]"
        style={{
          left: p.x,
          top: p.y,
          animation: `stardustDrift ${p.dur} ease-in-out infinite`,
          animationDelay: p.d,
        }}
      />
    ))}
  </div>
);

/* =========================================================================
   MAIN REALMBACKDROP COMPONENT
   ========================================================================= */

export const RealmBackdrop: React.FC<RealmBackdropProps> = ({ stage, inCombat }) => {
  const biome = stage.biome;
  const bg = stage.bgColors;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* LAYER 0: Deep Celestial & Sky (Fixed or subtle pulse, preserves aspect ratio) */}
      <div className="absolute inset-0">
        {biome === 'forest' && <ForestSky />}
        {biome === 'ruins' && <RuinsSky stageId={stage.id} />}
        {biome === 'crypt' && <CryptSky stageId={stage.id} />}
        {biome === 'volcano' && <VolcanoSky />}
        {biome === 'citadel' && <CitadelSky />}
      </div>

      {/* LAYER 0.5: High Drifting Clouds (Slow Parallax Drift, 68s) */}
      <SeamlessTrack animationName="cloudDrift" duration="68s" inCombat={inCombat}>
        {biome === 'forest' && <ForestClouds />}
      </SeamlessTrack>

      {/* LAYER 1: Far Mountain / Silhouette Ridge (Parallax Far, 32s) */}
      <SeamlessTrack animationName="parallaxFar" duration="32s" inCombat={inCombat}>
        {biome === 'forest' && <ForestFarMountains color={bg.farMountain} />}
        {biome === 'ruins' && <RuinsFarMountains color={bg.farMountain} />}
        {biome === 'crypt' && <CryptFarMountains color={bg.farMountain} />}
        {biome === 'volcano' && <VolcanoFarMountains color={bg.farMountain} />}
        {biome === 'citadel' && <CitadelFarMountains color={bg.farMountain} />}
      </SeamlessTrack>

      {/* LAYER 2: Midground Scenery (Parallax Mid, 12s) */}
      <SeamlessTrack animationName="parallaxMid" duration="12s" inCombat={inCombat}>
        {biome === 'forest' && <ForestMidground />}
        {biome === 'ruins' && <RuinsMidground />}
        {biome === 'crypt' && <CryptMidground />}
        {biome === 'volcano' && <VolcanoMidground />}
        {biome === 'citadel' && <CitadelMidground />}
      </SeamlessTrack>

      {/* LAYER 3: Foreground Ground & Road Track (Parallax Ground, 2.4s) */}
      <SeamlessTrack animationName="parallaxGround" duration="2.4s" inCombat={inCombat}>
        {biome === 'forest' && <ForestGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'ruins' && <RuinsGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'crypt' && <CryptGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'volcano' && <VolcanoGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'citadel' && <CitadelGround groundColor={bg.ground} pathColor={bg.path} />}
      </SeamlessTrack>

      {/* LAYER 4: Ambient Floating Particles (Fireflies, Embers, Soul Wisps, Stardust) */}
      {biome === 'forest' && <ForestParticles />}
      {biome === 'crypt' && <CryptParticles />}
      {biome === 'volcano' && <VolcanoParticles />}
      {biome === 'citadel' && <CitadelParticles />}

      {/* Vignette & Ambient Atmosphere Gradients (Top & Bottom subtle contrast) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,transparent_25%,transparent_75%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
    </div>
  );
};
