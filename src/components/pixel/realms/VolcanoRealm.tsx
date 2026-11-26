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

const VOLCANO_ASH_SPARKS: readonly [number, number, string, number?][] = [
  [18, 22, '#fdba74', 0.7], [46, 36, '#f97316', 0.65], [68, 16, '#fef08a', 0.65],
  [92, 42, '#fb923c', 0.6], [126, 20, '#fdba74', 0.7], [154, 34, '#f97316', 0.55],
  [180, 18, '#fef08a', 0.7], [256, 22, '#fb923c', 0.65], [284, 38, '#fdba74', 0.6],
  [306, 24, '#f97316', 0.65], [34, 54, '#fb923c', 0.5], [142, 56, '#fef08a', 0.45],
];

const VOLCANO_PEAKS: MountainPeak[] = [
  { x: 54, y: 50, baseY: 146, leftW: 68, rightW: 72 },
  { x: 174, y: 38, baseY: 146, leftW: 84, rightW: 88, lavaVein: true },
  { x: 292, y: 54, baseY: 146, leftW: 70, rightW: 72 },
  { x: 406, y: 42, baseY: 146, leftW: 82, rightW: 86 },
  { x: 528, y: 36, baseY: 146, leftW: 86, rightW: 90, lavaVein: true },
  { x: 616, y: 56, baseY: 146, leftW: 62, rightW: 66 },
];

export const VolcanoSky: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ shapeRendering: 'crispEdges' }}
  >
    <PixelDitherSky
      bands={[
        { y: 0, h: 24, color: '#140303' },
        { y: 24, h: 24, color: '#2b0707' },
        { y: 48, h: 26, color: '#4c0d0d' },
        { y: 74, h: 26, color: '#7c1712' },
        { y: 100, h: 26, color: '#b42c11' },
        { y: 126, h: 28, color: '#dc4c12' },
        { y: 154, h: 26, color: '#ea580c' },
      ]}
    />

    <StaticStarDust points={VOLCANO_ASH_SPARKS} />
    <PixelStar x={32} y={28} color="#fdba74" size={1} cross delay="0.3s" />
    <PixelStar x={114} y={22} color="#f97316" size={1} delay="1.1s" />
    <PixelStar x={164} y={38} color="#fef08a" size={1} cross delay="1.9s" />
    <PixelStar x={266} y={26} color="#fdba74" size={1} delay="1.4s" />

    <DetailedPixelMoon
      cx={224}
      cy={42}
      core="#fef08a"
      main="#f97316"
      mid="#ea580c"
      shade="#9a3412"
      crater="#c2410c"
      glow="#fb923c"
      eclipsed
    />
  </svg>
);

export const VolcanoClouds: React.FC = () => (
  <g opacity="0.78">
    {/* Ash clouds lit from BELOW by volcanic magma glow */}
    <DetailedPixelCloud
      x={20}
      y={14}
      rim="#78716c"
      light="#44403c"
      mid="#292524"
      shadow="#7c2d12"
      deep="#ea580c"
      scale={1.2}
    />
    <DetailedPixelCloud
      x={226}
      y={24}
      rim="#57534e"
      light="#292524"
      mid="#1c1917"
      shadow="#9a3412"
      deep="#f97316"
      scale={1.0}
      flip
    />
    <DetailedPixelCloud
      x={448}
      y={14}
      rim="#78716c"
      light="#44403c"
      mid="#292524"
      shadow="#7c2d12"
      deep="#ea580c"
      scale={1.15}
    />
  </g>
);

export const VolcanoFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {VOLCANO_PEAKS.map((peak, i) => (
      <PixelMountainPeak
        key={i}
        peak={peak}
        litColor="#9a3412"
        midColor={color}
        shadowColor="#140705"
      />
    ))}
    {/* Rising volcanic smoke plumes above active craters */}
    {[174, 528].map((vx) => (
      <g key={vx} fill="#292524" opacity="0.55">
        <rect x={vx - 6} y="24" width="12" height="10" />
        <rect x={vx - 12} y="14" width="18" height="10" />
        <rect x={vx - 18} y="4" width="24" height="10" opacity="0.7" />
        <rect x={vx - 2} y="30" width="5" height="4" fill="#f97316" opacity="0.7" />
      </g>
    ))}
    <PixelMistBand y={108} height={24} color="#ea580c" opacity="0.22" />
  </g>
);

export const VolcanoMidFar: React.FC = () => (
  <g>
    {/* Distant jagged basalt ridges */}
    <path
      d="M0 126 L44 108 L92 122 L152 104 L218 124 L288 106 L354 122 L426 102 L498 122 L568 106 L640 126 V160 H0 Z"
      fill="#1c0d0a"
    />

    {/* Distant Obsidian Forge Citadel silhouette at x=316 */}
    <g transform="translate(316 74)">
      <rect x="-26" y="18" width="52" height="42" fill="#170907" />
      <rect x="-24" y="18" width="10" height="42" fill="#2e130e" />
      {/* Jagged demonic horn towers */}
      <polygon points="-24,18 -30,-4 -14,18" fill="#170907" />
      <polygon points="24,18 30,-4 14,18" fill="#170907" />
      <polygon points="0,-14 -12,18 12,18" fill="#240e0a" />
      {/* Glowing molten foundry arches */}
      <rect x="-14" y="28" width="6" height="12" fill="#ea580c" />
      <rect x="-13" y="30" width="4" height="8" fill="#fef08a" />
      <rect x="8" y="28" width="6" height="12" fill="#ea580c" />
      <rect x="9" y="30" width="4" height="8" fill="#fef08a" />
      <rect x="-4" y="22" width="8" height="18" fill="#f97316" />
      <rect x="-2" y="25" width="4" height="12" fill="#fef08a" />
    </g>

    {/* Distant magma glow horizon */}
    <PixelMistBand y={132} height={18} color="#f97316" opacity="0.24" />
  </g>
);

export const VolcanoMidground: React.FC = () => (
  <g>
    {/* Faceted Hexagonal Basalt Spires with Firelit Edges & Glowing Magma Cracks */}
    {[
      { x: 64, h: 84 },
      { x: 168, h: 98 },
      { x: 318, h: 88 },
      { x: 432, h: 96 },
      { x: 564, h: 82 },
    ].map((col, i) => (
      <g key={i} transform={`translate(${col.x} 150)`}>
        {/* Stepped sub-column left & right */}
        <rect x="-24" y={-Math.round(col.h * 0.55)} width="12" height={Math.round(col.h * 0.55)} fill="#1c1917" />
        <rect x="-23" y={-Math.round(col.h * 0.55)} width="4" height={Math.round(col.h * 0.55)} fill="#44403c" />
        <rect x="12" y={-Math.round(col.h * 0.45)} width="12" height={Math.round(col.h * 0.45)} fill="#141110" />

        {/* Central hexagonal basalt pillar */}
        <polygon
          points={`-16,0 -16,${-col.h + 8} 0,${-col.h} 16,${-col.h + 8} 16,0`}
          fill="#0c0a09"
        />
        <polygon
          points={`-15,${-col.h + 8} 0,${-col.h + 1} 0,0 -15,0`}
          fill="#292524"
        />
        <polygon
          points={`-15,${-col.h + 8} -9,${-col.h + 5} -9,0 -15,0`}
          fill="#57534e"
        />
        <polygon
          points={`0,${-col.h + 1} 15,${-col.h + 8} 15,0 0,0`}
          fill="#1c1917"
        />
        {/* Warm magma rim reflection near base */}
        <rect x="-15" y="-14" width="3" height="14" fill="#ea580c" opacity="0.55" />
        {/* Jagged glowing lava fissure inside column */}
        <rect x="-1" y={-col.h + 14} width="2" height="18" fill="#ea580c" />
        <rect x="1" y={-col.h + 30} width="2" height="16" fill="#f97316" />
        <rect x="-1" y={-col.h + 44} width="2" height="20" fill="#ea580c" />
        <rect x="0" y={-col.h + 22} width="1" height="24" fill="#fef08a" />
      </g>
    ))}

    {/* Roaring Cascading Lavafalls from Overhanging Cliffs at x=240 and x=500 */}
    {[240, 500].map((lx) => (
      <g key={lx} transform={`translate(${lx} 150)`}>
        {/* Cliff overhang */}
        <rect x="-18" y="-68" width="36" height="12" fill="#1c1917" />
        <rect x="-16" y="-67" width="16" height="4" fill="#57534e" />
        {/* Outer orange magma torrent */}
        <rect x="-9" y="-58" width="18" height="58" fill="#c2410c" />
        <rect x="-7" y="-58" width="14" height="58" fill="#ea580c" />
        {/* Molten gold & white-hot inner stream */}
        <rect x="-4" y="-58" width="8" height="58" fill="#f59e0b" />
        <rect x="-2" y="-58" width="4" height="58" fill="#fef08a" />
        <rect x="-1" y="-52" width="2" height="18" fill="#ffffff" opacity="0.85" />
        <rect x="0" y="-26" width="2" height="16" fill="#ffffff" opacity="0.85" />
        {/* Cooled dark rock flecks tumbling in lava */}
        <rect x="-6" y="-42" width="3" height="4" fill="#451a03" />
        <rect x="3" y="-20" width="3" height="3" fill="#451a03" />
        {/* Bubbling magma splash pool & glow */}
        <rect x="-24" y="-5" width="48" height="7" fill="#ea580c" opacity="0.85" />
        <rect x="-16" y="-4" width="32" height="5" fill="#fbbf24" />
        <rect x="-10" y="-3" width="20" height="3" fill="#fef08a" />
        <rect x="-12" y="-9" width="3" height="3" fill="#fef08a" />
        <rect x="9" y="-11" width="3" height="3" fill="#fbbf24" />
      </g>
    ))}

    {/* Chained Iron Demonic Forge Brazier at x=374 */}
    <g transform="translate(374 150)">
      {/* Hanging chains */}
      <rect x="-16" y="-76" width="2" height="38" fill="#44403c" />
      <rect x="14" y="-76" width="2" height="38" fill="#44403c" />
      {/* Basalt pedestal & iron bowl */}
      <rect x="-18" y="-10" width="36" height="10" fill="#1c1917" />
      <rect x="-14" y="-36" width="28" height="26" fill="#0c0a09" />
      <rect x="-13" y="-35" width="26" height="24" fill="#292524" />
      <rect x="-13" y="-35" width="6" height="24" fill="#57534e" />
      {/* Forged iron bowl rim */}
      <rect x="-20" y="-41" width="40" height="6" fill="#1c1917" />
      <rect x="-19" y="-40" width="38" height="4" fill="#78350f" />
      <rect x="-18" y="-40" width="36" height="1" fill="#f59e0b" />
      {/* Stepped fire halo */}
      <rect x="-18" y="-66" width="36" height="26" fill="#f97316" opacity="0.18" />
      {/* Multi-tone pixel roaring flames */}
      <polygon points="0,-64 -14,-40 14,-40" fill="#dc2626" />
      <polygon points="-6,-56 -12,-40 -2,-40" fill="#ea580c" />
      <polygon points="7,-54 2,-40 12,-40" fill="#ea580c" />
      <polygon points="0,-58 -9,-40 9,-40" fill="#f97316" />
      <polygon points="0,-52 -5,-40 5,-40" fill="#fde047" />
      <rect x="-2" y="-46" width="4" height="6" fill="#ffffff" />
    </g>
  </g>
);

export const VolcanoGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    <rect x="0" y="148" width="640" height="6" fill={groundColor} />
    <rect x="0" y="148" width="640" height="2" fill="#f97316" opacity="0.65" />
    <rect x="0" y="152" width="640" height="28" fill={pathColor} />
    {/* Glowing magma channel beneath basalt slabs */}
    <rect x="0" y="160" width="640" height="8" fill="#c2410c" />
    <rect x="0" y="162" width="640" height="4" fill="#f97316" />
    <rect x="0" y="163" width="640" height="2" fill="#fef08a" />

    {/* Cracked Beveled Volcanic Basalt Slabs (16 x 40 = 640 exact) */}
    {Array.from({ length: 16 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 40 + 2} 153)`}>
        <rect x="0" y="0" width="36" height="25" fill="#1c1917" stroke="#0c0a09" strokeWidth="1" />
        {/* Warm firelit stone bevel */}
        <rect x="1" y="1" width="34" height="2" fill="#57534e" />
        <rect x="1" y="22" width="34" height="2" fill="#7c2d12" opacity="0.7" />
        {/* Jagged glowing lava cracks */}
        <rect x="4" y="10" width="12" height="2" fill="#ea580c" />
        <rect x="14" y="12" width="10" height="2" fill="#f97316" />
        <rect x="22" y="10" width="8" height="2" fill="#ea580c" />
        <rect x="10" y="11" width="8" height="1" fill="#fef08a" />
        {i % 2 === 0 && <rect x="18" y="4" width="2" height="6" fill="#f97316" opacity="0.85" />}
      </g>
    ))}
  </g>
);
