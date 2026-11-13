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
    className="absolute inset-y-0 left-0 realm-track flex pointer-events-none"
    style={{
      animation: `${animationName} ${duration} linear infinite`,
      animationPlayState: inCombat ? 'paused' : 'running',
      willChange: 'transform',
    }}
  >
    {[0, 1, 2, 3].map((tileIndex) => (
      <svg
        key={tileIndex}
        viewBox="0 0 640 180"
        preserveAspectRatio="none"
        className="realm-tile"
        aria-hidden={tileIndex > 0 || undefined}
        style={{ shapeRendering: 'crispEdges' }}
      >
        {children}
      </svg>
    ))}
  </div>
);

/** 4-point pixel star that twinkles using transform & opacity */
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
    <rect x={-size * 1.5} y={-0.5} width={size * 3} height={1} opacity="0.7" />
    <rect x={-0.5} y={-size * 1.5} width={1} height={size * 3} opacity="0.7" />
  </g>
);

/** Crisp pixel-stepped cloud cluster */
const PixelCloud: React.FC<{
  x: number;
  y: number;
  highlight: string;
  base: string;
  shadow: string;
  scale?: number;
}> = ({ x, y, highlight, base, shadow, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {/* Top crisp step */}
    <rect x="10" y="0" width="22" height="4" fill={highlight} />
    <rect x="6" y="4" width="32" height="4" fill={base} />
    <rect x="8" y="4" width="18" height="2" fill={highlight} />
    {/* Mid puff */}
    <rect x="0" y="8" width="46" height="5" fill={base} />
    <rect x="2" y="8" width="12" height="2" fill={highlight} />
    {/* Flat pixel bottom shadow */}
    <rect x="2" y="13" width="42" height="3" fill={shadow} />
  </g>
);

/** Stepped 16-bit Pixel Moon with craters */
const PixelMoon: React.FC<{
  cx: number;
  cy: number;
  main: string;
  shade: string;
  crater: string;
  glow: string;
  eclipsed?: boolean;
}> = ({ cx, cy, main, shade, crater, glow, eclipsed = false }) => (
  <g transform={`translate(${cx} ${cy})`}>
    {/* Stepped outer pixel aura */}
    <rect x="-24" y="-14" width="48" height="28" fill={glow} opacity="0.16" />
    <rect x="-18" y="-20" width="36" height="40" fill={glow} opacity="0.16" />
    <rect x="-20" y="-18" width="40" height="36" fill={glow} opacity="0.22" />
    {/* Moon Pixel Silhouette */}
    <rect x="-10" y="-16" width="20" height="32" fill={main} />
    <rect x="-14" y="-12" width="28" height="24" fill={main} />
    <rect x="-16" y="-8" width="32" height="16" fill={main} />
    {/* Right-side crescent shadow */}
    <rect x="4" y="-14" width="6" height="28" fill={shade} opacity="0.55" />
    <rect x="10" y="-10" width="4" height="20" fill={shade} opacity="0.65" />
    {eclipsed ? (
      <>
        {/* Dark core leaving glowing corona rim */}
        <rect x="-8" y="-12" width="16" height="24" fill="#090514" />
        <rect x="-12" y="-8" width="24" height="16" fill="#090514" />
      </>
    ) : (
      <>
        {/* Pixel Moon Craters */}
        <rect x="-8" y="-8" width="5" height="4" fill={crater} opacity="0.65" />
        <rect x="-7" y="-7" width="3" height="2" fill={shade} opacity="0.45" />
        <rect x="1" y="2" width="6" height="5" fill={crater} opacity="0.55" />
        <rect x="-4" y="6" width="4" height="3" fill={crater} opacity="0.5" />
      </>
    )}
  </g>
);

/** Sky horizon pixel dithering strips */
const PixelHorizonDither: React.FC<{ color: string; y?: number }> = ({ color, y = 136 }) => (
  <g fill={color} opacity="0.45">
    {Array.from({ length: 40 }).map((_, i) => (
      <React.Fragment key={i}>
        <rect x={i * 8} y={y} width="4" height="2" />
        <rect x={i * 8 + 4} y={y + 4} width="4" height="2" />
        <rect x={i * 8} y={y + 8} width="6" height="2" />
      </React.Fragment>
    ))}
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
        <stop offset="0%" stopColor="#041024" />
        <stop offset="45%" stopColor="#082f49" />
        <stop offset="78%" stopColor="#0d5750" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#forestSkyGrad)" />
    <PixelHorizonDither color="#042f2e" y={128} />
    <PixelMoon
      cx={222}
      cy={44}
      main="#fef08a"
      shade="#eab308"
      crater="#ca8a04"
      glow="#a7f3d0"
    />
    <PixelStar x={28} y={24} color="#fef08a" size={2} delay="0.2s" duration="2.8s" />
    <PixelStar x={74} y={44} color="#a7f3d0" size={2} delay="1.1s" duration="3.4s" />
    <PixelStar x={118} y={24} color="#fef08a" size={1.5} delay="1.8s" duration="2.5s" />
    <PixelStar x={162} y={40} color="#6ee7b7" size={2} delay="0.6s" duration="3.1s" />
    <PixelStar x={194} y={20} color="#fde68a" size={1.5} delay="2.2s" duration="3.8s" />
    <PixelStar x={256} y={32} color="#a7f3d0" size={2} delay="0.9s" duration="2.9s" />
    <PixelStar x={294} y={26} color="#fef08a" size={2} delay="1.5s" duration="3.2s" />
  </svg>
);

const ForestClouds: React.FC = () => (
  <g opacity="0.55">
    <PixelCloud x={30} y={24} highlight="#2dd4bf" base="#0f766e" shadow="#115e59" scale={1.1} />
    <PixelCloud x={190} y={16} highlight="#2dd4bf" base="#0d9488" shadow="#115e59" scale={0.95} />
    <PixelCloud x={370} y={28} highlight="#5eead4" base="#0f766e" shadow="#134e4a" scale={1.15} />
    <PixelCloud x={530} y={18} highlight="#2dd4bf" base="#0d9488" shadow="#115e59" scale={0.9} />
  </g>
);

const ForestFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {/* Distant pixel-stepped mountain ridge (starts & ends at y=108) */}
    <path
      d="M0 108 L40 80 L76 98 L120 64 L168 94 L216 58 L268 100 L320 70 L372 96 L424 62 L476 92 L528 56 L584 96 L640 108 V160 H0 Z"
      fill={color}
      opacity="0.9"
    />
    {/* Distant pine treeline ridge */}
    <path
      d="M0 124 L24 114 L48 124 L72 112 L96 124 L120 111 L144 124 L168 113 L192 124 L216 112 L240 124 L264 111 L288 124 L312 113 L336 124 L360 112 L384 124 L408 111 L432 124 L456 113 L480 124 L504 112 L528 124 L552 111 L576 124 L600 113 L624 124 L640 120 V160 H0 Z"
      fill="#052e2b"
    />
    {/* Elven Watchtower silhouette */}
    <g transform="translate(290 76)">
      <rect x="-6" y="6" width="12" height="44" fill="#042f2e" />
      <rect x="-8" y="4" width="16" height="4" fill="#064e3b" />
      <polygon points="0,-10 -8,4 8,4" fill="#065f46" />
      <rect x="-2" y="14" width="4" height="6" fill="#fef08a" opacity="0.9" />
      <rect x="-1" y="15" width="2" height="4" fill="#ffffff" />
    </g>
  </g>
);

const ForestMidground: React.FC = () => (
  <g>
    {/* Lush 16-bit Pixel Trees (dark ink outline + multi-shade clusters) */}
    {[
      { x: 45, h: 74, type: 'pine' as const },
      { x: 132, h: 80, type: 'oak' as const },
      { x: 225, h: 72, type: 'pine' as const },
      { x: 340, h: 84, type: 'oak' as const },
      { x: 445, h: 76, type: 'pine' as const },
      { x: 565, h: 82, type: 'oak' as const },
    ].map((tree, i) => (
      <g key={i} transform={`translate(${tree.x} 150)`}>
        {/* Outlined Trunk */}
        <rect x="-5" y={-tree.h + 22} width="10" height={tree.h - 20} fill="#1c0d04" />
        <rect x="-4" y={-tree.h + 22} width="8" height={tree.h - 20} fill="#451a03" />
        <rect x="-2" y={-tree.h + 24} width="3" height={tree.h - 24} fill="#78350f" />
        {/* Root flare */}
        <rect x="-7" y="-4" width="14" height="4" fill="#451a03" />
        {tree.type === 'pine' ? (
          <g>
            {/* Tiered pixel pine boughs with crisp dark backing */}
            <polygon points={`0,${-tree.h} -18,${-tree.h + 24} 18,${-tree.h + 24}`} fill="#052e16" />
            <polygon points={`0,${-tree.h + 1} -16,${-tree.h + 23} 16,${-tree.h + 23}`} fill="#065f46" />
            <polygon points={`0,${-tree.h + 2} -10,${-tree.h + 20} 6,${-tree.h + 20}`} fill="#10b981" />

            <polygon points={`0,${-tree.h + 15} -22,${-tree.h + 44} 22,${-tree.h + 44}`} fill="#052e16" />
            <polygon points={`0,${-tree.h + 16} -20,${-tree.h + 43} 20,${-tree.h + 43}`} fill="#047857" />
            <polygon points={`0,${-tree.h + 17} -12,${-tree.h + 38} 8,${-tree.h + 38}`} fill="#34d399" opacity="0.8" />

            <polygon points={`0,${-tree.h + 32} -26,${-tree.h + 62} 26,${-tree.h + 62}`} fill="#052e16" />
            <polygon points={`0,${-tree.h + 33} -24,${-tree.h + 61} 24,${-tree.h + 61}`} fill="#065f46" />
            <polygon points={`0,${-tree.h + 34} -14,${-tree.h + 56} 10,${-tree.h + 56}`} fill="#10b981" opacity="0.7" />
          </g>
        ) : (
          <g transform={`translate(0 ${-tree.h + 20})`}>
            {/* Stepped Pixel Oak Canopy (zero circles!) */}
            <rect x="-24" y="-12" width="48" height="26" fill="#052e16" />
            <rect x="-18" y="-20" width="36" height="40" fill="#052e16" />
            <rect x="-22" y="-10" width="44" height="22" fill="#065f46" />
            <rect x="-16" y="-18" width="32" height="34" fill="#047857" />
            <rect x="-14" y="-16" width="24" height="16" fill="#10b981" />
            <rect x="-10" y="-14" width="14" height="8" fill="#34d399" />
            {/* Hanging vines */}
            <rect x="-14" y="14" width="2" height="10" fill="#16a34a" />
            <rect x="10" y="14" width="2" height="13" fill="#15803d" />
          </g>
        )}
      </g>
    ))}

    {/* Ancient Runic Stone Shrine & Arch at x=190 */}
    <g transform="translate(190 150)">
      <rect x="-20" y="-50" width="10" height="50" fill="#0f172a" />
      <rect x="10" y="-50" width="10" height="50" fill="#0f172a" />
      <rect x="-19" y="-49" width="8" height="48" fill="#334155" />
      <rect x="11" y="-49" width="8" height="48" fill="#334155" />
      <rect x="-24" y="-58" width="48" height="9" fill="#1e293b" />
      <rect x="-22" y="-57" width="44" height="3" fill="#64748b" />
      {/* Glowing Emerald Runes */}
      <rect x="-17" y="-34" width="4" height="4" fill="#34d399" />
      <rect x="13" y="-38" width="4" height="4" fill="#34d399" />
      <rect x="-6" y="-55" width="12" height="4" fill="#6ee7b7" />
    </g>

    {/* Dan-the-Man Style Trail Signpost & Flickering Lantern at x=495 */}
    <g transform="translate(495 150)">
      <rect x="-3" y="-38" width="6" height="38" fill="#451a03" />
      <rect x="-2" y="-37" width="2" height="36" fill="#78350f" />
      {/* Arrow plank */}
      <polygon points="-14,-32 14,-32 19,-27 14,-22 -14,-22" fill="#92400e" stroke="#1c0d04" strokeWidth="1" />
      <rect x="-10" y="-29" width="20" height="2" fill="#fde68a" opacity="0.6" />
      {/* Glowing Lantern Hook */}
      <rect x="0" y="-42" width="12" height="3" fill="#1e293b" />
      <rect x="9" y="-39" width="2" height="4" fill="#64748b" />
      <rect x="6" y="-35" width="8" height="10" fill="#1e293b" />
      <rect x="7" y="-34" width="6" height="8" fill="#f59e0b" />
      <rect x="8" y="-32" width="4" height="4" fill="#fef08a" />
    </g>

    {/* Luminous Toadstools */}
    {[88, 268, 396, 595].map((mx, i) => (
      <g key={mx} transform={`translate(${mx} 150)`}>
        <rect x="-2" y="-5" width="4" height="5" fill="#fef3c7" />
        <rect x="-5" y="-9" width="10" height="4" fill={i % 2 === 0 ? '#06b6d4' : '#a855f7'} />
        <rect x="-3" y="-11" width="6" height="2" fill={i % 2 === 0 ? '#67e8f9' : '#e9d5ff'} />
      </g>
    ))}
  </g>
);

const ForestGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    {/* Lush Top Grass Overhang */}
    <rect x="0" y="148" width="640" height="6" fill={groundColor} />
    <rect x="0" y="148" width="640" height="2" fill="#4ade80" />
    {/* Earth Dirt Road */}
    <rect x="0" y="154" width="640" height="26" fill={pathColor} />
    <rect x="0" y="154" width="640" height="2" fill="#451a03" />
    {/* Pixel Cobblestones (16 x 40 = 640 exact) */}
    {Array.from({ length: 16 }).map((_, i) => {
      const x = i * 40;
      return (
        <g key={i} transform={`translate(${x} 157)`}>
          <rect x="2" y="0" width="14" height="7" fill="#374151" />
          <rect x="3" y="1" width="12" height="2" fill="#6b7280" />
          <rect x="20" y="3" width="16" height="8" fill="#374151" />
          <rect x="21" y="4" width="14" height="2" fill="#6b7280" />
          <rect x="8" y="12" width="18" height="7" fill="#1f2937" />
          <rect x="9" y="13" width="16" height="1" fill="#4b5563" />
        </g>
      );
    })}
    {/* Pixel Grass Tufts & Wildflowers (20 x 32 = 640 exact) */}
    {Array.from({ length: 20 }).map((_, i) => {
      const x = i * 32 + 6;
      const flower = i % 3 === 0 ? '#fef08a' : i % 3 === 1 ? '#38bdf8' : '#fb7185';
      return (
        <g key={i} transform={`translate(${x} 148)`}>
          <rect x="0" y="-4" width="2" height="4" fill="#22c55e" />
          <rect x="3" y="-6" width="2" height="6" fill="#4ade80" />
          <rect x="6" y="-3" width="2" height="3" fill="#15803d" />
          {i % 2 === 0 && <rect x="3" y="-8" width="2" height="2" fill={flower} />}
        </g>
      );
    })}
  </g>
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
              <stop offset="55%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#451a03" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#1e1b4b" />
              <stop offset="85%" stopColor="#3730a3" />
              <stop offset="100%" stopColor="#334155" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#ruinsSkyGrad)" />
      <PixelHorizonDither color={isQuarry ? '#27272a' : '#1e293b'} y={128} />
      {isQuarry ? (
        <g>
          <PixelMoon
            cx={222}
            cy={44}
            main="#e4e4e7"
            shade="#a1a1aa"
            crater="#71717a"
            glow="#cbd5e1"
          />
          {/* Shattered Orbital Debris */}
          <rect x="242" y="34" width="4" height="4" fill="#d4d4d8" />
          <rect x="246" y="44" width="3" height="2" fill="#a1a1aa" />
          <rect x="196" y="50" width="4" height="3" fill="#d4d4d8" />
        </g>
      ) : (
        <g>
          <PixelMoon
            cx={92}
            cy={44}
            main="#c4b5fd"
            shade="#8b5cf6"
            crater="#6d28d9"
            glow="#a78bfa"
          />
          <rect x="122" y="28" width="10" height="10" fill="#e0e7ff" opacity="0.75" />
          <rect x="124" y="26" width="6" height="14" fill="#e0e7ff" opacity="0.75" />
        </g>
      )}
      <PixelStar x={36} y={24} color="#fde047" size={1.5} delay="0.4s" />
      <PixelStar x={68} y={24} color="#e0e7ff" size={1.5} delay="1.6s" />
      <PixelStar x={158} y={28} color="#a5b4fc" size={2} delay="1.2s" />
      <PixelStar x={256} y={26} color="#fde047" size={1.5} delay="1.9s" />
      <PixelStar x={294} y={48} color="#e0e7ff" size={2} delay="0.8s" />
    </svg>
  );
};

const RuinsClouds: React.FC = () => (
  <g opacity="0.45">
    <PixelCloud x={40} y={26} highlight="#818cf8" base="#4338ca" shadow="#312e81" scale={1.1} />
    <PixelCloud x={250} y={18} highlight="#a5b4fc" base="#4f46e5" shadow="#312e81" scale={0.95} />
    <PixelCloud x={460} y={28} highlight="#818cf8" base="#4338ca" shadow="#312e81" scale={1.15} />
  </g>
);

const RuinsFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    <path
      d="M0 106 L36 74 L72 94 L112 60 L152 90 L196 54 L244 96 L292 66 L340 92 L388 58 L436 88 L484 52 L532 94 L584 64 L640 106 V160 H0 Z"
      fill={color}
    />
    {/* Ancient Aqueduct Viaduct Arches */}
    <g fill="#0f172a" opacity="0.85">
      <rect x="120" y="80" width="136" height="6" />
      {[126, 152, 178, 204, 230].map((x) => (
        <rect key={x} x={x} y="86" width="8" height="36" />
      ))}
      <rect x="420" y="76" width="136" height="6" />
      {[426, 452, 478, 504, 530].map((x) => (
        <rect key={x} x={x} y="82" width="8" height="40" />
      ))}
    </g>
  </g>
);

const RuinsMidground: React.FC = () => (
  <g>
    {/* Pixel Fluted Stone Pillars */}
    {[
      { x: 64, h: 84, broken: false },
      { x: 162, h: 52, broken: true },
      { x: 300, h: 88, broken: false },
      { x: 405, h: 46, broken: true },
      { x: 550, h: 80, broken: false },
    ].map((col, i) => (
      <g key={i} transform={`translate(${col.x} 150)`}>
        <rect x="-12" y="-8" width="24" height="8" fill="#1e293b" />
        <rect x="-10" y="-10" width="20" height="3" fill="#475569" />
        <rect x="-8" y={-col.h + 8} width="16" height={col.h - 18} fill="#334155" />
        <rect x="-6" y={-col.h + 8} width="4" height={col.h - 18} fill="#64748b" />
        <rect x="3" y={-col.h + 8} width="3" height={col.h - 18} fill="#1e293b" />
        {col.broken ? (
          <polygon points={`-8,${-col.h + 8} -2,${-col.h + 2} 3,${-col.h + 11} 8,${-col.h + 8}`} fill="#1e293b" />
        ) : (
          <g>
            <rect x="-12" y={-col.h} width="24" height="8" fill="#1e293b" />
            <rect x="-10" y={-col.h + 2} width="20" height="4" fill="#64748b" />
          </g>
        )}
        {/* Hanging moss vines */}
        <rect x="-5" y={-col.h + 12} width="2" height="16" fill="#15803d" />
      </g>
    ))}

    {/* Triumphal Archway at x=230 */}
    <g transform="translate(230 150)">
      <rect x="-26" y="-76" width="12" height="76" fill="#1e293b" />
      <rect x="14" y="-76" width="12" height="76" fill="#1e293b" />
      <rect x="-24" y="-76" width="4" height="76" fill="#475569" />
      <rect x="16" y="-76" width="4" height="76" fill="#475569" />
      <rect x="-30" y="-86" width="60" height="10" fill="#334155" />
      <rect x="-28" y="-84" width="56" height="3" fill="#64748b" />
      <rect x="-14" y="-66" width="28" height="6" fill="#0f172a" />
      <rect x="-8" y="-60" width="2" height="18" fill="#16a34a" />
    </g>

    {/* Floating Arcane Rune Crystal Altars at x=112 and x=485 */}
    {[112, 485].map((cx) => (
      <g key={cx} transform={`translate(${cx} 150)`}>
        <rect x="-10" y="-26" width="20" height="26" fill="#1e293b" />
        <rect x="-12" y="-28" width="24" height="4" fill="#475569" />
        {/* Pixel Diamond Mana Crystal */}
        <polygon points="0,-58 -8,-44 0,-32 8,-44" fill="#0284c7" />
        <polygon points="0,-56 -4,-44 0,-34 4,-44" fill="#38bdf8" />
        <rect x="-1" y="-50" width="2" height="10" fill="#e0f2fe" />
      </g>
    ))}

    {/* Fallen Knight Statue Pedestal at x=355 */}
    <g transform="translate(355 150)">
      <rect x="-14" y="-16" width="28" height="16" fill="#1e293b" />
      <rect x="-12" y="-14" width="24" height="3" fill="#64748b" />
      <rect x="-6" y="-54" width="12" height="38" fill="#475569" />
      <rect x="-5" y="-64" width="10" height="10" fill="#64748b" />
      <rect x="-3" y="-61" width="6" height="2" fill="#38bdf8" />
      <rect x="7" y="-52" width="3" height="40" fill="#94a3b8" />
      <rect x="4" y="-44" width="9" height="3" fill="#fbbf24" />
    </g>
  </g>
);

const RuinsGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    <rect x="0" y="148" width="640" height="6" fill={groundColor} />
    <rect x="0" y="152" width="640" height="28" fill={pathColor} />
    {/* Glowing Golden Rune Strip */}
    <rect x="0" y="162" width="640" height="3" fill="#d97706" />
    <rect x="0" y="163" width="640" height="1" fill="#fef08a" />
    {/* Chiseled Flagstone Blocks (20 x 32 = 640 exact) */}
    {Array.from({ length: 20 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 32} 152)`}>
        <rect x="0" y="0" width="31" height="28" fill="none" stroke="#18181b" strokeWidth="1" />
        <rect x="2" y="2" width="27" height="2" fill="#94a3b8" opacity="0.35" />
        {i % 3 === 0 && <rect x="6" y="8" width="8" height="2" fill="#18181b" />}
        {i % 4 === 1 && <rect x="26" y="1" width="2" height="4" fill="#84cc16" />}
      </g>
    ))}
  </g>
);

/* =========================================================================
   3. CRYPT BIOME: Forgotten Crypts, Dreadmire Sanctum & Abyssal Chasm
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
              <stop offset="55%" stopColor="#2e0854" />
              <stop offset="100%" stopColor="#170b2f" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#020617" />
              <stop offset="55%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#312e81" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#cryptSkyGrad)" />
      <PixelHorizonDither color="#1e1b4b" y={128} />
      <PixelMoon
        cx={220}
        cy={42}
        main="#e879f9"
        shade="#a855f7"
        crater="#7e22ce"
        glow="#c084fc"
        eclipsed
      />
      <path
        d="M0 44 Q80 18 160 40 T320 30 V66 Q240 48 160 62 T0 54 Z"
        fill="#a855f7"
        opacity="0.24"
        style={{ animation: 'auroraPulse 6s ease-in-out infinite' }}
      />
      <PixelStar x={34} y={28} color="#c084fc" size={1.5} delay="0.3s" />
      <PixelStar x={70} y={28} color="#c084fc" size={2} delay="0.5s" />
      <PixelStar x={118} y={44} color="#38bdf8" size={1.5} delay="1.5s" />
      <PixelStar x={176} y={24} color="#e879f9" size={2} delay="2.1s" />
      <PixelStar x={256} y={50} color="#c084fc" size={1.5} delay="1.0s" />
      <PixelStar x={290} y={32} color="#38bdf8" size={2} delay="1.8s" />
    </svg>
  );
};

const CryptClouds: React.FC = () => (
  <g opacity="0.45">
    <PixelCloud x={20} y={22} highlight="#c084fc" base="#581c87" shadow="#2e1065" scale={1.1} />
    <PixelCloud x={340} y={26} highlight="#22d3ee" base="#3b0764" shadow="#170b2f" scale={1.0} />
  </g>
);

const CryptFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    <path
      d="M0 108 L36 76 L72 96 L112 58 L156 92 L204 52 L252 94 L300 62 L352 90 L404 54 L456 88 L508 50 L560 94 L604 62 L640 108 V160 H0 Z"
      fill={color}
    />
    {[96, 212, 340, 472, 588].map((x) => (
      <g key={x} fill="#090514" opacity="0.95">
        <polygon points={`${x},40 ${x - 6},86 ${x + 6},86`} />
        <rect x={x - 1} y="30" width="2" height="12" fill="#c084fc" opacity="0.75" />
      </g>
    ))}
  </g>
);

const CryptMidground: React.FC = () => (
  <g>
    {/* Gothic Mausoleums at x=120 and x=460 */}
    {[120, 460].map((mx) => (
      <g key={mx} transform={`translate(${mx} 150)`}>
        <rect x="-28" y="-68" width="56" height="68" fill="#1e1b4b" stroke="#090514" strokeWidth="1" />
        <polygon points="0,-88 -32,-66 32,-66" fill="#312e81" />
        <rect x="-12" y="-42" width="24" height="42" fill="#020617" />
        <rect x="-8" y="-48" width="16" height="8" fill="#020617" />
        {/* Pixel Stained Rose Window */}
        <rect x="-6" y="-62" width="12" height="10" fill="#d946ef" />
        <rect x="-3" y="-59" width="6" height="4" fill="#fdf4ff" />
      </g>
    ))}

    {/* Wrought Iron Cemetery Gate at x=290 */}
    <g transform="translate(290 150)">
      <rect x="-26" y="-62" width="9" height="62" fill="#111827" />
      <rect x="17" y="-62" width="9" height="62" fill="#111827" />
      <polygon points="-21.5,-72 -28,-62 -15,-62" fill="#475569" />
      <polygon points="21.5,-72 15,-62 28,-62" fill="#475569" />
      {[-14, -7, 0, 7, 14].map((bx) => (
        <g key={bx}>
          <rect x={bx} y="-54" width="2" height="54" fill="#374151" />
          <rect x={bx - 1} y="-58" width="4" height="4" fill="#64748b" />
        </g>
      ))}
    </g>

    {/* Tombstones & Celtic Crosses */}
    {[
      { x: 42, type: 'cross' as const },
      { x: 205, type: 'tomb' as const },
      { x: 375, type: 'cross' as const },
      { x: 545, type: 'tomb' as const },
      { x: 612, type: 'cross' as const },
    ].map((marker, i) => (
      <g key={i} transform={`translate(${marker.x} 150)`}>
        {marker.type === 'cross' ? (
          <g fill="#334155">
            <rect x="-3" y="-36" width="6" height="36" />
            <rect x="-10" y="-28" width="20" height="5" />
            <rect x="-5" y="-32" width="10" height="12" fill="none" stroke="#475569" strokeWidth="2" />
          </g>
        ) : (
          <g fill="#1e293b">
            <rect x="-9" y="-28" width="18" height="28" />
            <rect x="-6" y="-32" width="12" height="4" />
            <rect x="-5" y="-22" width="10" height="2" fill="#64748b" />
          </g>
        )}
      </g>
    ))}

    {/* Spectral Hanging Cyan Lanterns */}
    {[180, 410].map((lx) => (
      <g key={lx} transform={`translate(${lx} 150)`}>
        <rect x="-2" y="-54" width="4" height="54" fill="#1f2937" />
        <rect x="-2" y="-57" width="14" height="3" fill="#374151" />
        <rect x="8" y="-54" width="1" height="7" fill="#9ca3af" />
        <rect x="5" y="-47" width="8" height="11" fill="#083344" />
        <rect x="6" y="-46" width="6" height="9" fill="#22d3ee" />
        <rect x="7" y="-44" width="4" height="5" fill="#ecfeff" />
      </g>
    ))}
  </g>
);

const CryptGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    <rect x="0" y="150" width="640" height="30" fill={groundColor} />
    <rect x="0" y="152" width="640" height="28" fill={pathColor} />
    {/* Crypt Obsidian Flagstones (20 x 32 = 640 exact) */}
    {Array.from({ length: 20 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 32} 153)`}>
        <rect x="1" y="0" width="30" height="25" fill="#110924" stroke="#240046" strokeWidth="1" />
        {i % 2 === 0 && <rect x="2" y="23" width="28" height="2" fill="#c084fc" opacity="0.7" />}
        {i % 3 === 1 && <rect x="29" y="2" width="2" height="20" fill="#22d3ee" opacity="0.55" />}
      </g>
    ))}
    {/* Low pixel ground fog */}
    <rect x="0" y="149" width="640" height="4" fill="#c084fc" opacity="0.22" />
  </g>
);

/* =========================================================================
   4. VOLCANO BIOME: Crimson Caldera & Solaris Pyre
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
        <stop offset="42%" stopColor="#450a0a" />
        <stop offset="75%" stopColor="#991b1b" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#volcanoSkyGrad)" />
    <PixelHorizonDither color="#c2410c" y={128} />
    <PixelMoon
      cx={222}
      cy={44}
      main="#f97316"
      shade="#ea580c"
      crater="#c2410c"
      glow="#fb923c"
      eclipsed
    />
    <PixelStar x={32} y={30} color="#fdba74" size={2} delay="0.3s" />
    <PixelStar x={74} y={34} color="#fdba74" size={2} delay="0.7s" />
    <PixelStar x={114} y={24} color="#f97316" size={1.5} delay="1.1s" />
    <PixelStar x={164} y={42} color="#fef08a" size={2} delay="1.9s" />
    <PixelStar x={262} y={28} color="#fdba74" size={1.5} delay="1.4s" />
  </svg>
);

const VolcanoClouds: React.FC = () => (
  <g opacity="0.6">
    <PixelCloud x={24} y={18} highlight="#57534e" base="#292524" shadow="#1c1917" scale={1.1} />
    <PixelCloud x={240} y={26} highlight="#78350f" base="#292524" shadow="#1c1917" scale={1.0} />
    <PixelCloud x={460} y={16} highlight="#57534e" base="#292524" shadow="#0c0a09" scale={1.15} />
  </g>
);

const VolcanoFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    <path
      d="M0 110 L42 78 L86 102 L134 62 L182 96 L236 52 L292 98 L348 66 L404 94 L460 54 L516 90 L576 52 L640 110 V160 H0 Z"
      fill={color}
    />
    {/* Glowing Lava Rivers */}
    <g stroke="#ea580c" strokeWidth="3" fill="none">
      <path d="M236 52 L240 76 L234 104 L238 134" />
      <path d="M576 52 L572 78 L578 104 L574 134" />
    </g>
    <g stroke="#fef08a" strokeWidth="1.5" fill="none">
      <path d="M236 52 L240 76 L234 104 L238 134" />
      <path d="M576 52 L572 78 L578 104 L574 134" />
    </g>
  </g>
);

const VolcanoMidground: React.FC = () => (
  <g>
    {/* Hexagonal Basalt Spires */}
    {[
      { x: 64, h: 78 },
      { x: 165, h: 92 },
      { x: 315, h: 84 },
      { x: 430, h: 94 },
      { x: 560, h: 76 },
    ].map((col, i) => (
      <g key={i} transform={`translate(${col.x} 150)`}>
        <polygon points={`-16,0 -16,${-col.h + 8} 0,${-col.h} 16,${-col.h + 8} 16,0`} fill="#1c1917" />
        <polygon points={`-15,${-col.h + 8} 0,${-col.h + 1} 0,0 -15,0`} fill="#292524" />
        <polygon points={`0,${-col.h + 1} 15,${-col.h + 8} 15,0 0,0`} fill="#44403c" />
        <rect x="-1" y={-col.h + 12} width="2" height={col.h - 22} fill="#ef4444" opacity="0.85" />
      </g>
    ))}

    {/* Lava Falls at x=240 and x=500 */}
    {[240, 500].map((lx) => (
      <g key={lx} transform={`translate(${lx} 150)`}>
        <rect x="-7" y="-58" width="14" height="58" fill="#ea580c" />
        <rect x="-4" y="-58" width="8" height="58" fill="#fbbf24" />
        <rect x="-2" y="-58" width="4" height="58" fill="#fef08a" />
        <rect x="-18" y="-3" width="36" height="6" fill="#ea580c" />
        <rect x="-12" y="-2" width="24" height="3" fill="#fef08a" />
      </g>
    ))}

    {/* Demonic Forge Brazier at x=370 */}
    <g transform="translate(370 150)">
      <rect x="-14" y="-34" width="28" height="34" fill="#292524" />
      <rect x="-18" y="-36" width="36" height="5" fill="#78350f" />
      <polygon points="0,-52 -8,-36 8,-36" fill="#f97316" />
      <polygon points="0,-46 -4,-36 4,-36" fill="#fef08a" />
    </g>
  </g>
);

const VolcanoGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    <rect x="0" y="148" width="640" height="6" fill={groundColor} />
    <rect x="0" y="152" width="640" height="28" fill={pathColor} />
    {/* Magma River Vein */}
    <rect x="0" y="162" width="640" height="4" fill="#ea580c" />
    <rect x="0" y="163" width="640" height="2" fill="#fef08a" />
    {/* Basalt Cracked Tiles (16 x 40 = 640 exact) */}
    {Array.from({ length: 16 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 40 + 4} 154)`}>
        <rect x="0" y="0" width="32" height="22" fill="#1c1917" stroke="#451a03" strokeWidth="1" />
        <rect x="4" y="9" width="12" height="2" fill="#f97316" />
        <rect x="14" y="11" width="10" height="2" fill="#fef08a" />
      </g>
    ))}
  </g>
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
        <stop offset="48%" stopColor="#1e1040" />
        <stop offset="80%" stopColor="#31105e" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>
    </defs>
    <rect width="320" height="180" fill="url(#citadelSkyGrad)" />
    <PixelHorizonDither color="#6d28d9" y={128} />
    <PixelMoon
      cx={208}
      cy={46}
      main="#fef08a"
      shade="#f472b6"
      crater="#ec4899"
      glow="#f0abfc"
    />
    <ellipse
      cx="208"
      cy="46"
      rx="38"
      ry="9"
      fill="none"
      stroke="#f0abfc"
      strokeWidth="2"
      opacity="0.85"
      transform="rotate(-14 208 46)"
    />
    <PixelStar x={32} y={24} color="#bfdbfe" size={2} delay="0.2s" />
    <PixelStar x={74} y={44} color="#fbcfe8" size={1.5} delay="1.4s" />
    <PixelStar x={116} y={24} color="#fef08a" size={2} delay="2.3s" />
    <PixelStar x={156} y={36} color="#a7f3d0" size={1.5} delay="0.9s" />
    <PixelStar x={256} y={30} color="#bfdbfe" size={2} delay="1.8s" />
    <PixelStar x={294} y={22} color="#fbcfe8" size={1.5} delay="0.6s" />
  </svg>
);

const CitadelClouds: React.FC = () => (
  <g opacity="0.5">
    <PixelCloud x={40} y={22} highlight="#f0abfc" base="#7e22ce" shadow="#4c1d95" scale={1.05} />
    <PixelCloud x={360} y={28} highlight="#93c5fd" base="#6d28d9" shadow="#3b0764" scale={1.1} />
  </g>
);

const CitadelFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    <path
      d="M0 106 L38 76 L76 96 L120 58 L168 92 L216 48 L272 96 L328 62 L384 92 L440 52 L496 88 L552 48 L600 94 L640 106 V160 H0 Z"
      fill={color}
    />
    {[116, 260, 412, 548].map((x) => (
      <g key={x} fill="#2e1065">
        <rect x={x - 7} y="54" width="14" height="46" />
        <polygon points={`${x},32 ${x - 9},54 ${x + 9},54`} fill="#d946ef" />
        <rect x={x - 2} y="62" width="4" height="8" fill="#fef08a" />
      </g>
    ))}
  </g>
);

const CitadelMidground: React.FC = () => (
  <g>
    {/* Royal Astral Cathedral Towers */}
    {[165, 470].map((px) => (
      <g key={px} transform={`translate(${px} 150)`}>
        <rect x="-30" y="-84" width="60" height="84" fill="#4c1d95" stroke="#1e1040" strokeWidth="1" />
        <polygon points="0,-110 -34,-82 34,-82" fill="#7e22ce" />
        <rect x="-10" y="-66" width="20" height="30" fill="#f0abfc" />
        <rect x="-6" y="-72" width="12" height="6" fill="#fef08a" />
        <rect x="-3" y="-54" width="6" height="6" fill="#ffffff" />
      </g>
    ))}

    {/* Levitating Obelisks */}
    {[75, 315, 575].map((mx) => (
      <g key={mx} transform={`translate(${mx} 150)`}>
        <rect x="-12" y="-12" width="24" height="12" fill="#78350f" />
        <rect x="-10" y="-16" width="20" height="4" fill="#f59e0b" />
        <polygon points="0,-66 -9,-46 0,-28 9,-46" fill="#c084fc" />
        <polygon points="0,-62 -4,-46 0,-32 4,-46" fill="#fdf4ff" />
        <rect x="-14" y="-47" width="28" height="2" fill="#f472b6" opacity="0.75" />
      </g>
    ))}

    {/* Royal Golden Balustrades */}
    {[240, 395].map((bx) => (
      <g key={bx} transform={`translate(${bx} 150)`}>
        <rect x="-24" y="-34" width="48" height="5" fill="#f59e0b" />
        {[-18, -9, 0, 9, 18].map((lx) => (
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
    <rect x="0" y="150" width="640" height="30" fill={groundColor} />
    <rect x="0" y="152" width="640" height="28" fill={pathColor} />
    <rect x="0" y="153" width="640" height="2" fill="#fbbf24" />
    <rect x="0" y="177" width="640" height="2" fill="#fbbf24" />
    {/* Embedded Gem Diamonds (20 x 32 = 640 exact) */}
    {Array.from({ length: 20 }).map((_, i) => {
      const gemColor = i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#f43f5e' : '#c084fc';
      return (
        <g key={i} transform={`translate(${i * 32 + 16} 165)`}>
          <polygon points="0,-4 4,0 0,4 -4,0" fill={gemColor} />
          <rect x="-1" y="-1" width="2" height="2" fill="#ffffff" />
        </g>
      );
    })}
  </g>
);

/* =========================================================================
   SHARED BIOME PIXEL PARTICLES
   ========================================================================= */

const PARTICLE_POSITIONS = [
  { x: '12%', y: '56%', d: '0s', dur: '4.1s' },
  { x: '27%', y: '66%', d: '1.3s', dur: '3.6s' },
  { x: '44%', y: '52%', d: '2.4s', dur: '4.4s' },
  { x: '62%', y: '68%', d: '0.7s', dur: '3.9s' },
  { x: '77%', y: '55%', d: '2.0s', dur: '3.5s' },
  { x: '91%', y: '62%', d: '1.6s', dur: '4.2s' },
];

const BiomeParticles: React.FC<{ biome: Stage['biome'] }> = ({ biome }) => {
  const cfg = {
    forest: { cls: 'w-1.5 h-1.5 bg-lime-300 shadow-[0_0_6px_#a3e635]', anim: 'fireflyDrift' },
    ruins: { cls: 'w-1 h-1 bg-amber-200 shadow-[0_0_5px_#fbbf24]', anim: 'fireflyDrift' },
    crypt: { cls: 'w-2 h-2 bg-cyan-300 shadow-[0_0_8px_#38bdf8]', anim: 'soulWispDrift' },
    volcano: { cls: 'w-1.5 h-1.5 bg-amber-400 shadow-[0_0_6px_#f97316]', anim: 'emberDrift' },
    citadel: { cls: 'w-1.5 h-1.5 bg-pink-300 shadow-[0_0_6px_#f472b6]', anim: 'stardustDrift' },
  }[biome];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLE_POSITIONS.map((p, i) => (
        <div
          key={i}
          className={`absolute ${cfg.cls}`}
          style={{
            left: p.x,
            top: p.y,
            animation: `${cfg.anim} ${p.dur} ease-in-out infinite`,
            animationDelay: p.d,
          }}
        />
      ))}
    </div>
  );
};

/* =========================================================================
   MAIN REALMBACKDROP COMPONENT
   ========================================================================= */

export const RealmBackdrop: React.FC<RealmBackdropProps> = ({ stage, inCombat }) => {
  const biome = stage.biome;
  const bg = stage.bgColors;

  return (
    <div className="realm-track-stage absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* LAYER 0: Deep Celestial & Sky */}
      <div className="absolute inset-0">
        {biome === 'forest' && <ForestSky />}
        {biome === 'ruins' && <RuinsSky stageId={stage.id} />}
        {biome === 'crypt' && <CryptSky stageId={stage.id} />}
        {biome === 'volcano' && <VolcanoSky />}
        {biome === 'citadel' && <CitadelSky />}
      </div>

      {/* LAYER 0.5: Drifting Pixel Clouds (All Biomes) */}
      <SeamlessTrack animationName="cloudDrift" duration="150s" inCombat={inCombat}>
        {biome === 'forest' && <ForestClouds />}
        {biome === 'ruins' && <RuinsClouds />}
        {biome === 'crypt' && <CryptClouds />}
        {biome === 'volcano' && <VolcanoClouds />}
        {biome === 'citadel' && <CitadelClouds />}
      </SeamlessTrack>

      {/* LAYER 1: Far Mountain & Horizon Silhouettes */}
      <SeamlessTrack animationName="parallaxFar" duration="76s" inCombat={inCombat}>
        {biome === 'forest' && <ForestFarMountains color={bg.farMountain} />}
        {biome === 'ruins' && <RuinsFarMountains color={bg.farMountain} />}
        {biome === 'crypt' && <CryptFarMountains color={bg.farMountain} />}
        {biome === 'volcano' && <VolcanoFarMountains color={bg.farMountain} />}
        {biome === 'citadel' && <CitadelFarMountains color={bg.farMountain} />}
      </SeamlessTrack>

      {/* LAYER 2: Midground Landmarks */}
      <SeamlessTrack animationName="parallaxMid" duration="30s" inCombat={inCombat}>
        {biome === 'forest' && <ForestMidground />}
        {biome === 'ruins' && <RuinsMidground />}
        {biome === 'crypt' && <CryptMidground />}
        {biome === 'volcano' && <VolcanoMidground />}
        {biome === 'citadel' && <CitadelMidground />}
      </SeamlessTrack>

      {/* LAYER 3: Foreground Ground & Road */}
      <SeamlessTrack animationName="parallaxGround" duration="8.4s" inCombat={inCombat}>
        {biome === 'forest' && <ForestGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'ruins' && <RuinsGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'crypt' && <CryptGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'volcano' && <VolcanoGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'citadel' && <CitadelGround groundColor={bg.ground} pathColor={bg.path} />}
      </SeamlessTrack>

      {/* LAYER 4: Ambient Biome Particles */}
      <BiomeParticles biome={biome} />

      {/* Vignette Contrast Band */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,transparent_25%,transparent_75%,rgba(0,0,0,0.52)_100%)] pointer-events-none" />
    </div>
  );
};
