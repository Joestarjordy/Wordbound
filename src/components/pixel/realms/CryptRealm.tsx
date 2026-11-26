import React from 'react';
import {
  DetailedPixelCloud,
  DetailedPixelMoon,
  MountainPeak,
  PixelDitherSky,
  PixelMistBand,
  PixelMountainPeak,
  PixelStar,
  StaticStarDust,
} from './sharedPixelBackdrop';

const CRYPT_MICRO_STARS: readonly [number, number, string, number?][] = [
  [16, 12, '#e879f9', 0.65], [38, 28, '#c084fc', 0.55], [56, 14, '#e0f2fe', 0.7],
  [82, 34, '#a855f7', 0.5], [106, 18, '#ffffff', 0.7], [134, 26, '#38bdf8', 0.6],
  [158, 12, '#f0abfc', 0.7], [182, 36, '#c084fc', 0.5], [250, 16, '#e0f2fe', 0.7],
  [272, 32, '#e879f9', 0.6], [296, 14, '#38bdf8', 0.65], [310, 38, '#c084fc', 0.5],
  [24, 48, '#a855f7', 0.4], [146, 46, '#38bdf8', 0.45], [282, 50, '#e879f9', 0.4],
];

const CRYPT_BACK_PEAKS: MountainPeak[] = [
  { x: 102, y: 42, baseY: 146, leftW: 92, rightW: 96 },
  { x: 320, y: 36, baseY: 146, leftW: 104, rightW: 108 },
  { x: 544, y: 40, baseY: 146, leftW: 96, rightW: 98 },
];

const CRYPT_PEAKS: MountainPeak[] = [
  { x: 48, y: 60, baseY: 146, leftW: 72, rightW: 76, capHeight: 11 },
  { x: 162, y: 50, baseY: 146, leftW: 82, rightW: 84, capHeight: 14 },
  { x: 274, y: 64, baseY: 146, leftW: 74, rightW: 72, capHeight: 10 },
  { x: 392, y: 48, baseY: 146, leftW: 86, rightW: 86, capHeight: 15 },
  { x: 504, y: 58, baseY: 146, leftW: 78, rightW: 78, capHeight: 12 },
  { x: 602, y: 54, baseY: 146, leftW: 72, rightW: 74, capHeight: 12 },
];

export const CryptSky: React.FC<{ stageId: number }> = ({ stageId }) => {
  const isAbyss = stageId % 2 === 1;
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ shapeRendering: 'crispEdges' }}
    >
      <PixelDitherSky
        bands={
          isAbyss
            ? [
                { y: 0, h: 24, color: '#03000a' },
                { y: 24, h: 24, color: '#0d041f' },
                { y: 48, h: 26, color: '#1b0738' },
                { y: 74, h: 26, color: '#2b0b52' },
                { y: 100, h: 26, color: '#391463' },
                { y: 126, h: 28, color: '#271247' },
                { y: 154, h: 26, color: '#140926' },
              ]
            : [
                { y: 0, h: 24, color: '#020617' },
                { y: 24, h: 24, color: '#0b112e' },
                { y: 48, h: 26, color: '#171a47' },
                { y: 74, h: 26, color: '#232361' },
                { y: 100, h: 26, color: '#2e2b75' },
                { y: 126, h: 28, color: '#26235e' },
                { y: 154, h: 26, color: '#151438' },
              ]
        }
      />

      {/* Stepped pixel spectral aurora ribbon */}
      <g style={{ animation: 'auroraPulse 6s ease-in-out infinite' }}>
        <path
          d="M0 44 Q72 22 152 40 T320 28 V52 Q240 42 156 54 T0 52 Z"
          fill="#a855f7"
          opacity="0.22"
        />
        <path
          d="M0 48 Q84 30 168 46 T320 34 V44 Q236 38 164 49 T0 51 Z"
          fill="#22d3ee"
          opacity="0.14"
        />
      </g>

      <StaticStarDust points={CRYPT_MICRO_STARS} />
      <PixelStar x={34} y={26} color="#c084fc" size={1} cross delay="0.3s" />
      <PixelStar x={70} y={24} color="#e879f9" size={1} cross delay="0.8s" />
      <PixelStar x={118} y={40} color="#38bdf8" size={1} delay="1.5s" />
      <PixelStar x={176} y={22} color="#e879f9" size={1} cross delay="2.1s" />
      <PixelStar x={290} y={30} color="#38bdf8" size={1} cross delay="1.8s" />

      <DetailedPixelMoon
        cx={222}
        cy={42}
        core="#fdf4ff"
        main="#e879f9"
        mid="#a855f7"
        shade="#6b21a8"
        crater="#7e22ce"
        glow="#c084fc"
        eclipsed
      />
    </svg>
  );
};

export const CryptClouds: React.FC = () => (
  <g opacity="0.65">
    <DetailedPixelCloud
      x={24}
      y={18}
      rim="#e879f9"
      light="#9333ea"
      mid="#581c87"
      shadow="#3b0764"
      deep="#170529"
      scale={1.15}
    />
    <DetailedPixelCloud
      x={230}
      y={28}
      rim="#67e8f9"
      light="#6366f1"
      mid="#3730a3"
      shadow="#1e1b4b"
      deep="#0c0a24"
      scale={0.9}
      flip
    />
    <DetailedPixelCloud
      x={430}
      y={20}
      rim="#d8b4fe"
      light="#7e22ce"
      mid="#4c1d95"
      shadow="#2e1065"
      deep="#140529"
      scale={1.1}
    />
  </g>
);

export const CryptFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {/* Distant hazy highland range behind the main peaks for deep atmospheric perspective */}
    <g opacity="0.65">
      {CRYPT_BACK_PEAKS.map((peak, i) => (
        <PixelMountainPeak
          key={`back-${i}`}
          peak={peak}
          litColor="#3b2866"
          midColor="#1e123b"
          shadowColor="#0b061a"
        />
      ))}
    </g>

    {/* Soft lunar mist separating the far highland range from the nearer crags */}
    <PixelMistBand y={96} height={22} color="#8b5cf6" opacity="0.14" />

    {/* Main Moonlit Barrow craggy mountain ridge with silver-misted crests */}
    {CRYPT_PEAKS.map((peak, i) => (
      <PixelMountainPeak
        key={i}
        peak={peak}
        litColor="#5b438c"
        midColor={color}
        shadowColor="#0c061a"
        capLit="#a5b4fc"
        capShadow="#3d2c63"
      />
    ))}

    <PixelMistBand y={112} height={22} color="#a855f7" opacity="0.18" />
  </g>
);

export const CryptMidFar: React.FC = () => (
  <g>
    {/* Distant haunted hills & abbey silhouettes */}
    <path
      d="M0 128 L52 114 L118 126 L192 108 L268 124 L344 112 L428 126 L512 110 L588 124 L640 128 V160 H0 Z"
      fill="#100824"
    />
    {/* Distant ruined cathedral abbey at x=336 */}
    <g transform="translate(336 74)">
      <rect x="-24" y="16" width="48" height="44" fill="#130a2b" />
      <rect x="-22" y="16" width="8" height="44" fill="#22134a" />
      <polygon points="-16,-8 -24,16 -8,16" fill="#1e1042" />
      <polygon points="16,-6 8,16 24,16" fill="#1e1042" />
      <polygon points="0,-16 -10,16 10,16" fill="#271454" />
      {/* Glowing spectral nave windows */}
      <rect x="-4" y="24" width="8" height="14" fill="#a855f7" opacity="0.7" />
      <rect x="-2" y="26" width="4" height="10" fill="#f0abfc" />
      <rect x="-18" y="26" width="4" height="10" fill="#22d3ee" opacity="0.75" />
      <rect x="14" y="26" width="4" height="10" fill="#22d3ee" opacity="0.75" />
    </g>

    {/* Distant dead gnarled cypress trees */}
    {[64, 186, 468, 590].map((tx) => (
      <g key={tx} transform={`translate(${tx} 136)`} fill="#0c061c">
        <rect x="-3" y="-36" width="6" height="36" />
        <polygon points="-3,-28 -16,-38 -13,-40 -2,-31" />
        <polygon points="3,-24 15,-34 12,-36 2,-27" />
        <polygon points="-2,-34 -10,-46 -8,-47 0,-36" />
        <polygon points="2,-32 10,-44 8,-45 0,-35" />
      </g>
    ))}

    <PixelMistBand y={132} height={18} color="#22d3ee" opacity="0.14" />
  </g>
);

export const CryptMidground: React.FC = () => (
  <g>
    {/* Detailed Stone-Brick Gothic Mausoleums at x=118 and x=466 */}
    {[118, 466].map((mx) => (
      <g key={mx} transform={`translate(${mx} 150)`}>
        <rect x="-36" y="-2" width="72" height="4" fill="#05020d" opacity="0.75" />
        {/* Main stone crypt body */}
        <rect x="-32" y="-74" width="64" height="74" fill="#090514" />
        <rect x="-31" y="-73" width="62" height="72" fill="#1e1b4b" />
        {/* Moonlit left facade wall & pilasters */}
        <rect x="-31" y="-73" width="12" height="72" fill="#312e81" />
        <rect x="-31" y="-73" width="3" height="72" fill="#6366f1" opacity="0.55" />
        <rect x="24" y="-73" width="7" height="72" fill="#141133" />
        {/* Individual stone course seams */}
        {[-60, -48, -36, -24, -12].map((by) => (
          <rect key={by} x="-31" y={by} width="62" height="1" fill="#0f0c29" />
        ))}
        {/* Pitched Gothic Slate Roof & Finial */}
        <polygon points="0,-98 -36,-72 36,-72" fill="#090514" />
        <polygon points="0,-96 -34,-73 34,-73" fill="#2e1065" />
        <polygon points="0,-96 -34,-73 -1,-73" fill="#4c1d95" />
        <rect x="-1" y="-106" width="2" height="10" fill="#a855f7" />
        <rect x="-4" y="-103" width="8" height="2" fill="#c084fc" />
        {/* Recessed Iron-Barred Crypt Door */}
        <rect x="-14" y="-44" width="28" height="44" fill="#03000a" />
        <rect x="-10" y="-50" width="20" height="8" fill="#03000a" />
        <rect x="-14" y="-44" width="2" height="44" fill="#475569" />
        <rect x="12" y="-44" width="2" height="44" fill="#475569" />
        {[-8, -2, 4, 9].map((barX) => (
          <rect key={barX} x={barX} y="-44" width="1" height="44" fill="#334155" />
        ))}
        {/* Illuminated Stained-Glass Rose Window */}
        <rect x="-8" y="-68" width="16" height="14" fill="#090514" />
        <rect x="-7" y="-67" width="14" height="12" fill="#a21caf" />
        <rect x="-5" y="-65" width="10" height="8" fill="#e879f9" />
        <rect x="-3" y="-63" width="6" height="4" fill="#fdf4ff" />
        {/* Pixel tracery cross over rose window */}
        <rect x="-7" y="-62" width="14" height="1" fill="#1e1b4b" />
        <rect x="-1" y="-67" width="2" height="12" fill="#1e1b4b" />
      </g>
    ))}

    {/* Ornate Wrought-Iron Cemetery Gate at x=292 */}
    <g transform="translate(292 150)">
      {/* Twin masonry gate pillars */}
      <rect x="-30" y="-68" width="12" height="68" fill="#090514" />
      <rect x="18" y="-68" width="12" height="68" fill="#090514" />
      <rect x="-29" y="-67" width="10" height="66" fill="#1e293b" />
      <rect x="19" y="-67" width="10" height="66" fill="#1e293b" />
      <rect x="-29" y="-67" width="3" height="66" fill="#475569" />
      <rect x="19" y="-67" width="3" height="66" fill="#475569" />
      {/* Carved pillar finials */}
      <polygon points="-24,-79 -31,-68 -17,-68" fill="#475569" />
      <polygon points="24,-79 17,-68 31,-68" fill="#475569" />
      {/* Arched iron header & scrollwork */}
      <rect x="-18" y="-60" width="36" height="3" fill="#334155" />
      <rect x="-12" y="-66" width="24" height="3" fill="#475569" />
      <rect x="-4" y="-70" width="8" height="4" fill="#64748b" />
      <rect x="-18" y="-22" width="36" height="2" fill="#334155" />
      {/* Spear-tipped iron bars */}
      {[-14, -8, -2, 4, 10, 15].map((bx) => (
        <g key={bx}>
          <rect x={bx} y="-58" width="2" height="58" fill="#1f2937" />
          <rect x={bx} y="-58" width="1" height="58" fill="#475569" />
          <rect x={bx - 1} y="-62" width="4" height="4" fill="#94a3b8" />
        </g>
      ))}
    </g>

    {/* Weathered Tombstones & Ornate Celtic Crosses */}
    {[
      { x: 38, type: 'cross' as const },
      { x: 212, type: 'tomb' as const },
      { x: 374, type: 'cross' as const },
      { x: 548, type: 'tomb' as const },
      { x: 612, type: 'cross' as const },
    ].map((marker, i) => (
      <g key={i} transform={`translate(${marker.x} 150)`}>
        <rect x="-12" y="-2" width="24" height="3" fill="#05020d" opacity="0.65" />
        {marker.type === 'cross' ? (
          <g>
            <rect x="-8" y="-5" width="16" height="5" fill="#1e293b" />
            <rect x="-4" y="-40" width="8" height="36" fill="#0f172a" />
            <rect x="-3" y="-39" width="6" height="34" fill="#334155" />
            <rect x="-3" y="-39" width="2" height="34" fill="#64748b" />
            <rect x="-12" y="-31" width="24" height="6" fill="#0f172a" />
            <rect x="-11" y="-30" width="22" height="4" fill="#475569" />
            <rect x="-6" y="-34" width="12" height="12" fill="none" stroke="#64748b" strokeWidth="2" />
            <rect x="-2" y="-29" width="4" height="2" fill="#a855f7" opacity="0.7" />
          </g>
        ) : (
          <g>
            <rect x="-11" y="-32" width="22" height="32" fill="#0f172a" />
            <rect x="-10" y="-31" width="20" height="30" fill="#1e293b" />
            <rect x="-10" y="-31" width="4" height="30" fill="#475569" />
            <rect x="-7" y="-36" width="14" height="5" fill="#334155" />
            <rect x="-5" y="-24" width="10" height="2" fill="#64748b" />
            <rect x="-6" y="-19" width="12" height="2" fill="#475569" />
            <rect x="-4" y="-14" width="8" height="2" fill="#475569" />
            {/* Moss patch on weathered stone */}
            <rect x="4" y="-33" width="4" height="3" fill="#15803d" />
          </g>
        )}
      </g>
    ))}

    {/* Spectral Cyan Wrought-Iron Hanging Lanterns */}
    {[180, 408].map((lx) => (
      <g key={lx} transform={`translate(${lx} 150)`}>
        <rect x="-3" y="-58" width="6" height="58" fill="#0f172a" />
        <rect x="-2" y="-57" width="3" height="56" fill="#334155" />
        <rect x="-2" y="-61" width="16" height="3" fill="#475569" />
        <rect x="10" y="-58" width="2" height="7" fill="#94a3b8" />
        {/* Stepped spectral cyan pixel aura */}
        <rect x="0" y="-53" width="22" height="22" fill="#22d3ee" opacity="0.16" />
        <rect x="3" y="-50" width="16" height="16" fill="#67e8f9" opacity="0.22" />
        {/* Lantern frame */}
        <rect x="6" y="-51" width="10" height="13" fill="#083344" />
        <rect x="7" y="-50" width="8" height="11" fill="#06b6d4" />
        <rect x="8" y="-48" width="6" height="7" fill="#67e8f9" />
        <rect x="10" y="-46" width="2" height="3" fill="#ffffff" />
        <rect x="5" y="-52" width="12" height="2" fill="#334155" />
        <rect x="5" y="-38" width="12" height="2" fill="#334155" />
      </g>
    ))}
  </g>
);

export const CryptGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    <rect x="0" y="149" width="640" height="31" fill={groundColor} />
    <rect x="0" y="152" width="640" height="28" fill={pathColor} />
    {/* Obsidian Crypt Flagstones with Glowing Soul-Fissure Seams (20 x 32 = 640 exact) */}
    {Array.from({ length: 20 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 32} 153)`}>
        <rect x="1" y="0" width="30" height="12" fill="#130a26" stroke="#06020f" strokeWidth="1" />
        <rect x="2" y="1" width="28" height="2" fill="#4c1d95" opacity="0.45" />
        <rect x="1" y="13" width="30" height="13" fill="#0d061c" stroke="#06020f" strokeWidth="1" />
        <rect x="2" y="14" width="28" height="1" fill="#3b0764" opacity="0.55" />
        {/* Glowing arcane soul cracks */}
        {i % 2 === 0 && <rect x="3" y="12" width="26" height="1" fill="#c084fc" opacity="0.75" />}
        {i % 3 === 1 && <rect x="30" y="2" width="2" height="22" fill="#22d3ee" opacity="0.6" />}
        {i % 4 === 0 && <rect x="10" y="5" width="7" height="1" fill="#e879f9" opacity="0.5" />}
      </g>
    ))}
    {/* Drifting eerie ground mist strip */}
    <PixelMistBand y={144} height={6} color="#c084fc" opacity="0.22" />
  </g>
);
