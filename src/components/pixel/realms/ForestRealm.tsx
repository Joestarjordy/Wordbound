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

const FOREST_MICRO_STARS: readonly [number, number, string, number?][] = [
  [14, 12, '#e2e8f0', 0.65], [38, 34, '#a7f3d0', 0.55], [52, 16, '#fef08a', 0.7],
  [66, 28, '#cbd5e1', 0.5], [88, 12, '#ffffff', 0.75], [104, 38, '#a7f3d0', 0.5],
  [126, 18, '#fef9c3', 0.65], [142, 30, '#e2e8f0', 0.55], [156, 10, '#ffffff', 0.7],
  [174, 24, '#6ee7b7', 0.6], [190, 14, '#fef08a', 0.7], [202, 34, '#cbd5e1', 0.5],
  [254, 14, '#ffffff', 0.75], [272, 22, '#a7f3d0', 0.6], [286, 40, '#fef9c3', 0.55],
  [306, 16, '#e2e8f0', 0.7], [312, 32, '#6ee7b7', 0.5], [24, 52, '#a7f3d0', 0.4],
  [96, 54, '#e2e8f0', 0.4], [148, 50, '#fef08a', 0.4], [268, 52, '#cbd5e1', 0.4],
];

const FOREST_PEAKS: MountainPeak[] = [
  { x: 48, y: 54, baseY: 146, leftW: 66, rightW: 72, capHeight: 16 },
  { x: 158, y: 40, baseY: 146, leftW: 82, rightW: 86, capHeight: 22 },
  { x: 274, y: 58, baseY: 146, leftW: 68, rightW: 68, capHeight: 14 },
  { x: 378, y: 36, baseY: 146, leftW: 84, rightW: 90, capHeight: 24 },
  { x: 492, y: 52, baseY: 146, leftW: 72, rightW: 74, capHeight: 17 },
  { x: 594, y: 44, baseY: 146, leftW: 74, rightW: 78, capHeight: 20 },
];

export const ForestSky: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ shapeRendering: 'crispEdges' }}
  >
    <PixelDitherSky
      bands={[
        { y: 0, h: 24, color: '#030d1e' },
        { y: 24, h: 24, color: '#061a33' },
        { y: 48, h: 26, color: '#0a2b46' },
        { y: 74, h: 26, color: '#0d404f' },
        { y: 100, h: 26, color: '#115452' },
        { y: 126, h: 28, color: '#156652' },
        { y: 154, h: 26, color: '#134e3a' },
      ]}
    />

    {/* Subtle diagonal moonlight shafts from the upper-right moon */}
    <polygon points="224,42 150,150 176,150 236,48" fill="#a7f3d0" opacity="0.06" />
    <polygon points="232,48 188,150 210,150 244,52" fill="#fef08a" opacity="0.05" />

    <StaticStarDust points={FOREST_MICRO_STARS} />
    <PixelStar x={28} y={22} color="#fef08a" size={1} cross delay="0.2s" duration="2.9s" />
    <PixelStar x={74} y={42} color="#a7f3d0" size={1} cross delay="1.1s" duration="3.5s" />
    <PixelStar x={118} y={24} color="#fef9c3" size={1} delay="1.8s" duration="2.6s" />
    <PixelStar x={164} y={36} color="#6ee7b7" size={1} cross delay="0.6s" duration="3.2s" />
    <PixelStar x={262} y={28} color="#fef08a" size={1} cross delay="0.9s" duration="3.0s" />
    <PixelStar x={296} y={22} color="#a7f3d0" size={1} delay="1.5s" duration="3.4s" />

    <DetailedPixelMoon
      cx={224}
      cy={42}
      core="#fefce8"
      main="#fef08a"
      mid="#eab308"
      shade="#a16207"
      crater="#ca8a04"
      glow="#a7f3d0"
    />
  </svg>
);

export const ForestClouds: React.FC = () => (
  <g opacity="0.72">
    <DetailedPixelCloud
      x={24}
      y={20}
      rim="#99f6e4"
      light="#2dd4bf"
      mid="#0f766e"
      shadow="#115e59"
      deep="#042f2e"
      scale={1.15}
    />
    <DetailedPixelCloud
      x={196}
      y={12}
      rim="#ccfbf1"
      light="#5eead4"
      mid="#0d9488"
      shadow="#115e59"
      deep="#042f2e"
      scale={0.95}
      flip
    />
    <DetailedPixelCloud
      x={354}
      y={24}
      rim="#99f6e4"
      light="#2dd4bf"
      mid="#0f766e"
      shadow="#134e4a"
      deep="#042f2e"
      scale={1.2}
    />
    <DetailedPixelCloud
      x={534}
      y={15}
      rim="#ccfbf1"
      light="#5eead4"
      mid="#0d9488"
      shadow="#115e59"
      deep="#042f2e"
      scale={0.9}
    />
  </g>
);

export const ForestFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {FOREST_PEAKS.map((peak, i) => (
      <PixelMountainPeak
        key={i}
        peak={peak}
        litColor="#2dd4bf"
        midColor={color}
        shadowColor="#07222b"
        capLit="#e2f8f5"
        capShadow="#64a6a3"
      />
    ))}
    {/* Atmospheric valley haze separating peaks from mid-far woods */}
    <PixelMistBand y={108} height={24} color="#2dd4bf" opacity="0.18" />
  </g>
);

export const ForestMidFar: React.FC = () => (
  <g>
    {/* Distant layered misty pine treeline across full 640px */}
    <rect x="0" y="120" width="640" height="40" fill="#062925" />
    {Array.from({ length: 32 }).map((_, i) => {
      const x = i * 20;
      const h = 16 + ((i * 7) % 14);
      const topY = 122 - h;
      return (
        <g key={i}>
          <polygon points={`${x + 10},${topY} ${x - 2},128 ${x + 22},128`} fill="#062925" />
          <polygon points={`${x + 10},${topY} ${x + 2},124 ${x + 12},124`} fill="#0f4c45" />
          <polygon points={`${x + 10},${topY + 6} ${x},128 ${x + 10},128`} fill="#0d3d37" />
        </g>
      );
    })}

    {/* Distant Rocky Waterfall Cliff at x=438 */}
    <g transform="translate(438 82)">
      <polygon points="-28,64 -20,8 22,4 32,64" fill="#0f2930" />
      <polygon points="-20,8 -4,6 -8,64 -28,64" fill="#1e4047" />
      {/* Cascading pixel water stream */}
      <rect x="-4" y="6" width="12" height="58" fill="#0ea5e9" opacity="0.7" />
      <rect x="-2" y="6" width="6" height="58" fill="#7dd3fc" opacity="0.8" />
      <rect x="0" y="10" width="2" height="16" fill="#f0f9ff" />
      <rect x="2" y="30" width="2" height="18" fill="#f0f9ff" />
      <rect x="-1" y="50" width="3" height="10" fill="#e0f2fe" />
      {/* Waterfall base spray mist */}
      <rect x="-14" y="58" width="32" height="6" fill="#bae6fd" opacity="0.45" />
      <rect x="-8" y="55" width="20" height="4" fill="#e0f2fe" opacity="0.55" />
    </g>

    {/* Distant Elven Timber & Stone Watchtower at x=196 */}
    <g transform="translate(196 68)">
      {/* Stone base & wooden spire */}
      <rect x="-10" y="22" width="20" height="48" fill="#0b2829" />
      <rect x="-8" y="22" width="7" height="48" fill="#164e4d" />
      {/* Brick accents */}
      <rect x="-7" y="30" width="4" height="2" fill="#2dd4bf" opacity="0.25" />
      <rect x="1" y="40" width="5" height="2" fill="#041b1c" />
      {/* Watch balcony */}
      <rect x="-14" y="18" width="28" height="5" fill="#113b3a" />
      <rect x="-14" y="16" width="4" height="3" fill="#1d5f5b" />
      <rect x="-2" y="16" width="4" height="3" fill="#1d5f5b" />
      <rect x="10" y="16" width="4" height="3" fill="#1d5f5b" />
      {/* Stepped conical roof */}
      <polygon points="0,-6 -13,18 13,18" fill="#064e3b" />
      <polygon points="0,-6 -13,18 -1,18" fill="#0f766e" />
      <rect x="-1" y="-11" width="2" height="6" fill="#5eead4" />
      {/* Warm lit beacon windows */}
      <rect x="-4" y="26" width="8" height="8" fill="#041b1c" />
      <rect x="-3" y="27" width="6" height="6" fill="#f59e0b" />
      <rect x="-2" y="28" width="4" height="4" fill="#fef08a" />
      <rect x="-2" y="42" width="4" height="6" fill="#fbbf24" opacity="0.85" />
    </g>

    {/* Ground-hugging forest fog bank */}
    <PixelMistBand y={132} height={18} color="#5eead4" opacity="0.16" />
  </g>
);

/** Richly shaded pixel-art gnarled oak tree with 5-tone leaf clusters & textured bark */
const DetailedOakTree: React.FC<{ x: number; scale?: number }> = ({ x, scale = 1 }) => (
  <g transform={`translate(${x} 150) scale(${scale})`}>
    {/* Cast ground shadow */}
    <rect x="-26" y="-2" width="52" height="4" fill="#021c14" opacity="0.65" />

    {/* Spreading roots & gnarled trunk with dark ink outline */}
    <rect x="-13" y="-6" width="26" height="6" fill="#140803" />
    <rect x="-11" y="-5" width="22" height="5" fill="#3f1a08" />
    <rect x="-9" y="-4" width="8" height="4" fill="#6b2f10" />
    <rect x="-8" y="-62" width="16" height="58" fill="#140803" />
    <rect x="-7" y="-62" width="14" height="57" fill="#451a03" />
    {/* Directional moonlight bark highlights & grooves */}
    <rect x="-6" y="-60" width="5" height="55" fill="#78350f" />
    <rect x="-5" y="-56" width="2" height="48" fill="#92400e" />
    <rect x="2" y="-54" width="2" height="16" fill="#290f02" />
    <rect x="-1" y="-34" width="2" height="18" fill="#290f02" />
    <rect x="4" y="-60" width="3" height="55" fill="#260d02" />
    {/* Visible branches reaching into canopy */}
    <polygon points="-6,-46 -18,-58 -14,-61 -4,-50" fill="#451a03" />
    <polygon points="5,-48 18,-58 14,-62 4,-52" fill="#2b0f03" />

    {/* Layered Pixel Leaf Clusters (5 shades from deep shadow to moonlight rim) */}
    <g transform="translate(0 -72)">
      {/* Deep dark foliage backing */}
      <rect x="-32" y="-8" width="64" height="24" fill="#032215" />
      <rect x="-26" y="-18" width="52" height="38" fill="#032215" />
      <rect x="-16" y="-26" width="32" height="46" fill="#032215" />

      {/* Deep forest shadow tier */}
      <rect x="-30" y="-6" width="60" height="20" fill="#064e3b" />
      <rect x="-24" y="-16" width="48" height="32" fill="#064e3b" />
      <rect x="-14" y="-24" width="28" height="38" fill="#064e3b" />

      {/* Mid-emerald foliage clusters */}
      <rect x="-27" y="-8" width="22" height="14" fill="#047857" />
      <rect x="-14" y="-20" width="28" height="18" fill="#047857" />
      <rect x="8" y="-10" width="18" height="14" fill="#047857" />
      <rect x="-18" y="4" width="20" height="10" fill="#047857" />
      <rect x="2" y="2" width="16" height="10" fill="#065f46" />

      {/* Lit verdant foliage clusters (upper-left moonlight direction) */}
      <rect x="-24" y="-10" width="14" height="8" fill="#10b981" />
      <rect x="-12" y="-21" width="18" height="10" fill="#10b981" />
      <rect x="4" y="-12" width="12" height="7" fill="#10b981" />
      <rect x="-16" y="0" width="12" height="6" fill="#10b981" />

      {/* Crisp moonlit specular leaf tips */}
      <rect x="-10" y="-22" width="10" height="3" fill="#34d399" />
      <rect x="-22" y="-11" width="8" height="3" fill="#34d399" />
      <rect x="-6" y="-14" width="6" height="2" fill="#6ee7b7" />
      <rect x="6" y="-13" width="6" height="2" fill="#34d399" />
      <rect x="-18" y="-2" width="4" height="2" fill="#6ee7b7" />

      {/* Hanging mossy pixel vines */}
      <rect x="-22" y="14" width="2" height="12" fill="#059669" />
      <rect x="-21" y="24" width="2" height="6" fill="#34d399" />
      <rect x="16" y="13" width="2" height="16" fill="#047857" />
      <rect x="17" y="26" width="2" height="5" fill="#10b981" />
      <rect x="-6" y="16" width="2" height="9" fill="#059669" />
    </g>
  </g>
);

/** Richly tiered alpine conifer with jagged needle boughs & bark texture */
const DetailedPineTree: React.FC<{ x: number; height: number }> = ({ x, height }) => (
  <g transform={`translate(${x} 150)`}>
    <rect x="-18" y="-2" width="36" height="4" fill="#021c14" opacity="0.6" />
    <rect x="-5" y={-height + 24} width="10" height={height - 22} fill="#170903" />
    <rect x="-4" y={-height + 24} width="8" height={height - 22} fill="#451a03" />
    <rect x="-3" y={-height + 26} width="3" height={height - 26} fill="#78350f" />

    {[
      { yOff: 0, w: 16, h: 22 },
      { yOff: 14, w: 22, h: 24 },
      { yOff: 30, w: 28, h: 26 },
      { yOff: 46, w: 32, h: 24 },
    ].map((tier, idx) => {
      const top = -height + tier.yOff;
      const bot = top + tier.h;
      return (
        <g key={idx}>
          {/* Dark needle outline */}
          <polygon points={`0,${top - 1} ${-tier.w - 1},${bot + 1} ${tier.w + 1},${bot + 1}`} fill="#021f13" />
          {/* Shadowed right half */}
          <polygon points={`0,${top} ${-tier.w},${bot} ${tier.w},${bot}`} fill="#064e3b" />
          {/* Mid-tone left & center bough */}
          <polygon points={`0,${top} ${-tier.w},${bot} ${Math.round(tier.w * 0.25)},${bot}`} fill="#047857" />
          {/* Moonlit left needle edge */}
          <polygon points={`0,${top + 1} ${-tier.w + 2},${bot - 1} ${-Math.round(tier.w * 0.35)},${bot - 2}`} fill="#10b981" />
          {/* Crisp pixel needle tips */}
          <rect x={-tier.w + 3} y={bot - 3} width="4" height="2" fill="#34d399" />
          <rect x={-Math.round(tier.w * 0.45)} y={bot - 5} width="4" height="2" fill="#6ee7b7" />
          <rect x={Math.round(tier.w * 0.35)} y={bot - 3} width="4" height="2" fill="#065f46" />
        </g>
      );
    })}
  </g>
);

export const ForestMidground: React.FC = () => (
  <g>
    <DetailedPineTree x={42} height={82} />
    <DetailedOakTree x={132} scale={1.02} />
    <DetailedPineTree x={256} height={78} />
    <DetailedOakTree x={358} scale={1.08} />
    <DetailedPineTree x={452} height={84} />
    <DetailedOakTree x={576} scale={1.0} />

    {/* Overgrown Ancient Runic Stone Sanctuary Arch at x=198 */}
    <g transform="translate(198 150)">
      {/* Stone pillars with individual masonry courses */}
      <rect x="-24" y="-56" width="12" height="56" fill="#0f172a" />
      <rect x="12" y="-56" width="12" height="56" fill="#0f172a" />
      <rect x="-23" y="-55" width="10" height="54" fill="#334155" />
      <rect x="13" y="-55" width="10" height="54" fill="#334155" />
      {/* Left-edge moonlight bevel */}
      <rect x="-23" y="-55" width="3" height="54" fill="#64748b" />
      <rect x="13" y="-55" width="3" height="54" fill="#64748b" />
      {/* Masonry joint lines */}
      {[-44, -32, -20, -10].map((my) => (
        <React.Fragment key={my}>
          <rect x="-23" y={my} width="10" height="1" fill="#1e293b" />
          <rect x="13" y={my} width="10" height="1" fill="#1e293b" />
        </React.Fragment>
      ))}
      {/* Carved lintel cap & keystone */}
      <rect x="-28" y="-66" width="56" height="11" fill="#0f172a" />
      <rect x="-27" y="-65" width="54" height="9" fill="#334155" />
      <rect x="-27" y="-65" width="54" height="3" fill="#94a3b8" />
      <rect x="-7" y="-69" width="14" height="6" fill="#475569" />
      {/* Lush hanging moss & vines */}
      <rect x="-26" y="-66" width="16" height="3" fill="#15803d" />
      <rect x="-24" y="-66" width="10" height="2" fill="#4ade80" />
      <rect x="-18" y="-63" width="2" height="12" fill="#16a34a" />
      <rect x="14" y="-66" width="12" height="3" fill="#15803d" />
      <rect x="18" y="-63" width="2" height="15" fill="#22c55e" />
      {/* Glowing Emerald Sanctuary Runes */}
      <rect x="-19" y="-40" width="4" height="6" fill="#065f46" />
      <rect x="-18" y="-39" width="2" height="4" fill="#34d399" />
      <rect x="17" y="-34" width="4" height="6" fill="#065f46" />
      <rect x="18" y="-33" width="2" height="4" fill="#34d399" />
      <rect x="-8" y="-61" width="16" height="3" fill="#34d399" />
      <rect x="-4" y="-61" width="8" height="2" fill="#d1fae5" />
      {/* Offering stone bowl */}
      <rect x="-6" y="-12" width="12" height="12" fill="#1e293b" />
      <rect x="-8" y="-15" width="16" height="3" fill="#475569" />
      <rect x="-4" y="-17" width="8" height="2" fill="#34d399" />
      <rect x="-2" y="-19" width="4" height="2" fill="#d1fae5" />
    </g>

    {/* Woodland Trail Signpost, Mossy Boulder & Glowing Lantern at x=506 */}
    <g transform="translate(506 150)">
      {/* Mossy boulder beside post */}
      <rect x="-22" y="-12" width="18" height="12" fill="#1e293b" />
      <rect x="-20" y="-14" width="14" height="12" fill="#475569" />
      <rect x="-19" y="-14" width="10" height="3" fill="#22c55e" />
      <rect x="-17" y="-15" width="6" height="2" fill="#4ade80" />

      {/* Wood-grained signpost */}
      <rect x="-4" y="-44" width="8" height="44" fill="#1c0d04" />
      <rect x="-3" y="-43" width="6" height="42" fill="#5c280b" />
      <rect x="-2" y="-42" width="2" height="40" fill="#92400e" />
      {/* Weathered arrow plank */}
      <polygon
        points="-16,-35 16,-35 22,-29 16,-23 -16,-23"
        fill="#78350f"
        stroke="#1c0d04"
        strokeWidth="1"
      />
      <rect x="-14" y="-34" width="28" height="2" fill="#b45309" />
      <rect x="-11" y="-30" width="18" height="2" fill="#fde68a" opacity="0.7" />
      {/* Iron Lantern Bracket & Warm Glow */}
      <rect x="0" y="-48" width="15" height="3" fill="#1e293b" />
      <rect x="11" y="-45" width="2" height="5" fill="#64748b" />
      {/* Stepped pixel lantern light halo */}
      <rect x="2" y="-43" width="20" height="20" fill="#f59e0b" opacity="0.16" />
      <rect x="5" y="-40" width="14" height="14" fill="#fde047" opacity="0.22" />
      {/* Lantern housing */}
      <rect x="7" y="-40" width="10" height="12" fill="#0f172a" />
      <rect x="8" y="-39" width="8" height="10" fill="#f59e0b" />
      <rect x="9" y="-37" width="6" height="6" fill="#fef08a" />
      <rect x="11" y="-35" width="2" height="3" fill="#ffffff" />
      <rect x="6" y="-41" width="12" height="2" fill="#334155" />
      <rect x="6" y="-28" width="12" height="2" fill="#334155" />
    </g>

    {/* Lush Undergrowth Bushes & Bioluminescent Toadstools */}
    {[86, 294, 412, 616].map((bx, i) => (
      <g key={bx} transform={`translate(${bx} 150)`}>
        {/* Bush cluster */}
        <rect x="-14" y="-11" width="28" height="11" fill="#052e16" />
        <rect x="-10" y="-15" width="20" height="15" fill="#065f46" />
        <rect x="-12" y="-10" width="16" height="7" fill="#047857" />
        <rect x="-8" y="-14" width="10" height="4" fill="#10b981" />
        <rect x="-6" y="-14" width="4" height="2" fill="#34d399" />
        {/* Luminous mushrooms beside bush */}
        <rect x="14" y="-6" width="3" height="6" fill="#fef3c7" />
        <rect x="11" y="-10" width="9" height="4" fill={i % 2 === 0 ? '#06b6d4' : '#a855f7'} />
        <rect x="13" y="-12" width="5" height="2" fill={i % 2 === 0 ? '#67e8f9' : '#e9d5ff'} />
        <rect x="14" y="-9" width="2" height="1" fill="#ffffff" />
      </g>
    ))}
  </g>
);

export const ForestGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    {/* Mossy grass verge overhang */}
    <rect x="0" y="148" width="640" height="8" fill={groundColor} />
    <rect x="0" y="148" width="640" height="3" fill="#16a34a" />
    <rect x="0" y="148" width="640" height="1" fill="#4ade80" />
    {/* Earth roadbed & shadowed lip */}
    <rect x="0" y="155" width="640" height="25" fill={pathColor} />
    <rect x="0" y="155" width="640" height="2" fill="#1c0d04" />
    <rect x="0" y="175" width="640" height="5" fill="#120905" opacity="0.55" />

    {/* Varied beveled pixel cobblestones with mortar & pebbles (16 x 40 = 640 exact) */}
    {Array.from({ length: 16 }).map((_, i) => {
      const x = i * 40;
      const alt = i % 2 === 0;
      return (
        <g key={i} transform={`translate(${x} 158)`}>
          {/* Row 1 cobbles */}
          <rect x="1" y="0" width="16" height="7" fill="#1e293b" />
          <rect x="2" y="1" width="14" height="5" fill="#475569" />
          <rect x="2" y="1" width="12" height="2" fill="#94a3b8" opacity="0.7" />

          <rect x="19" y="1" width="19" height="7" fill="#1e293b" />
          <rect x="20" y="2" width="17" height="5" fill="#334155" />
          <rect x="20" y="2" width="14" height="2" fill="#64748b" opacity="0.75" />

          {/* Row 2 staggered cobbles */}
          <rect x={alt ? 7 : 4} y="9" width="18" height="8" fill="#0f172a" />
          <rect x={alt ? 8 : 5} y="10" width="16" height="6" fill="#334155" />
          <rect x={alt ? 8 : 5} y="10" width="14" height="1" fill="#64748b" />

          <rect x={alt ? 27 : 24} y="10" width="12" height="7" fill="#0f172a" />
          <rect x={alt ? 28 : 25} y="11" width="10" height="5" fill="#1e293b" />
          <rect x={alt ? 28 : 25} y="11" width="8" height="1" fill="#475569" />

          {/* Tiny moss crevices & pebbles */}
          {i % 3 === 0 && <rect x="16" y="1" width="3" height="3" fill="#22c55e" />}
          {i % 2 === 1 && <rect x="2" y="12" width="3" height="2" fill="#78350f" />}
        </g>
      );
    })}

    {/* Varied grass blades, ferns & wildflowers along verge (20 x 32 = 640 exact) */}
    {Array.from({ length: 20 }).map((_, i) => {
      const x = i * 32 + 4;
      const flower =
        i % 4 === 0 ? '#fef08a' : i % 4 === 1 ? '#38bdf8' : i % 4 === 2 ? '#fb7185' : '#e9d5ff';
      return (
        <g key={i} transform={`translate(${x} 148)`}>
          <rect x="0" y="-4" width="2" height="5" fill="#15803d" />
          <rect x="3" y="-7" width="2" height="8" fill="#22c55e" />
          <rect x="4" y="-7" width="1" height="3" fill="#86efac" />
          <rect x="6" y="-5" width="2" height="6" fill="#16a34a" />
          <rect x="9" y="-3" width="2" height="4" fill="#15803d" />
          {i % 2 === 0 && (
            <>
              <rect x="2" y="-9" width="3" height="2" fill={flower} />
              <rect x="3" y="-10" width="1" height="1" fill="#ffffff" />
            </>
          )}
        </g>
      );
    })}
  </g>
);
