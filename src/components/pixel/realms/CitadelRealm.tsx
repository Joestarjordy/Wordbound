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

const CITADEL_MICRO_STARS: readonly [number, number, string, number?][] = [
  [8, 12, '#cbd5e1', 0.7], [16, 28, '#93c5fd', 0.65], [26, 8, '#ffffff', 0.8],
  [36, 36, '#c7d2fe', 0.55], [44, 18, '#fef3c7', 0.7], [54, 46, '#93c5fd', 0.5],
  [64, 14, '#e2e8f0', 0.75], [72, 30, '#e9d5ff', 0.6], [84, 10, '#ffffff', 0.85],
  [92, 42, '#bae6fd', 0.5], [102, 22, '#f1f5f9', 0.7], [112, 12, '#fef3c7', 0.75],
  [124, 34, '#93c5fd', 0.65], [134, 18, '#e2e8f0', 0.7], [146, 44, '#c7d2fe', 0.5],
  [158, 14, '#ffffff', 0.8], [168, 28, '#e9d5ff', 0.6], [178, 10, '#bae6fd', 0.75],
  [242, 14, '#cbd5e1', 0.75], [254, 32, '#93c5fd', 0.65], [266, 18, '#ffffff', 0.8],
  [276, 42, '#fef3c7', 0.55], [286, 12, '#e2e8f0', 0.75], [298, 26, '#c7d2fe', 0.65],
  [308, 16, '#bae6fd', 0.7], [314, 40, '#ffffff', 0.55], [22, 52, '#93c5fd', 0.45],
  [78, 54, '#c7d2fe', 0.4], [138, 52, '#e2e8f0', 0.45], [262, 52, '#bae6fd', 0.45],
  // Milky Way dust clusters across upper-left to center sky
  [18, 60, '#818cf8', 0.35], [30, 54, '#a5b4fc', 0.4], [48, 44, '#c7d2fe', 0.45],
  [62, 38, '#93c5fd', 0.45], [80, 26, '#e0e7ff', 0.5], [98, 18, '#a5b4fc', 0.45],
  [118, 8, '#c7d2fe', 0.4], [40, 50, '#c084fc', 0.35], [70, 32, '#818cf8', 0.4],
  [90, 20, '#93c5fd', 0.45], [108, 14, '#e0e7ff', 0.45], [128, 6, '#a5b4fc', 0.4],
];

const CITADEL_BACK_PEAKS: MountainPeak[] = [
  { x: 96, y: 40, baseY: 146, leftW: 94, rightW: 98 },
  { x: 318, y: 34, baseY: 146, leftW: 106, rightW: 110 },
  { x: 540, y: 38, baseY: 146, leftW: 98, rightW: 100 },
];

const CITADEL_PEAKS: MountainPeak[] = [
  { x: 46, y: 60, baseY: 146, leftW: 72, rightW: 76, capHeight: 12 },
  { x: 160, y: 48, baseY: 146, leftW: 84, rightW: 86, capHeight: 16 },
  { x: 276, y: 62, baseY: 146, leftW: 74, rightW: 74, capHeight: 11 },
  { x: 392, y: 46, baseY: 146, leftW: 86, rightW: 88, capHeight: 17 },
  { x: 506, y: 58, baseY: 146, leftW: 78, rightW: 78, capHeight: 13 },
  { x: 602, y: 52, baseY: 146, leftW: 72, rightW: 74, capHeight: 14 },
];

export const CitadelSky: React.FC = () => (
  <svg
    viewBox="0 0 320 180"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ shapeRendering: 'crispEdges' }}
  >
    <PixelDitherSky
      bands={[
        { y: 0, h: 24, color: '#030512' },
        { y: 24, h: 24, color: '#080c24' },
        { y: 48, h: 26, color: '#101538' },
        { y: 74, h: 26, color: '#191d4c' },
        { y: 100, h: 26, color: '#24245e' },
        { y: 126, h: 28, color: '#2e2a6b' },
        { y: 154, h: 26, color: '#221d4d' },
      ]}
    />

    {/* Organic dithered pixel cosmic nebula clouds (soft layered starlight mist) */}
    <g opacity="0.22">
      <rect x="12" y="54" width="38" height="10" fill="#4f46e5" />
      <rect x="28" y="44" width="46" height="12" fill="#6366f1" />
      <rect x="52" y="32" width="48" height="12" fill="#4f46e5" />
      <rect x="78" y="20" width="44" height="12" fill="#6366f1" />
      <rect x="96" y="10" width="38" height="10" fill="#818cf8" />
      <rect x="42" y="40" width="32" height="6" fill="#93c5fd" opacity="0.65" />
      <rect x="72" y="24" width="28" height="6" fill="#c7d2fe" opacity="0.6" />
      <rect x="24" y="50" width="22" height="4" fill="#818cf8" opacity="0.6" />
    </g>

    {/* Subtle high-altitude celestial rift tear shimmering in the upper-left cosmos */}
    <g opacity="0.65" style={{ animation: 'auroraPulse 7s ease-in-out infinite' }}>
      <rect x="74" y="22" width="28" height="2" fill="#38bdf8" opacity="0.25" />
      <rect x="80" y="24" width="34" height="3" fill="#818cf8" opacity="0.3" />
      <rect x="86" y="25" width="22" height="1" fill="#e0f2fe" opacity="0.7" />
      <rect x="94" y="23" width="8" height="1" fill="#ffffff" opacity="0.8" />
    </g>

    <StaticStarDust points={CITADEL_MICRO_STARS} />
    <PixelStar x={32} y={22} color="#bfdbfe" size={1} cross delay="0.2s" />
    <PixelStar x={74} y={40} color="#e0e7ff" size={1} delay="1.4s" />
    <PixelStar x={116} y={22} color="#fef3c7" size={1} cross delay="2.3s" />
    <PixelStar x={156} y={34} color="#bae6fd" size={1} delay="0.9s" />
    <PixelStar x={262} y={24} color="#bfdbfe" size={1} cross delay="1.8s" />
    <PixelStar x={294} y={20} color="#e0e7ff" size={1} cross delay="0.6s" />

    {/* Realistic Silver-Alabaster Ringed Celestial Planet */}
    <DetailedPixelMoon
      cx={214}
      cy={44}
      core="#f8fafc"
      main="#cbd5e1"
      mid="#818cf8"
      shade="#312e81"
      crater="#64748b"
      glow="#93c5fd"
      ringColor="#c7d2fe"
    />
  </svg>
);

export const CitadelClouds: React.FC = () => (
  <g opacity="0.58">
    <DetailedPixelCloud
      x={32}
      y={20}
      rim="#e0e7ff"
      light="#94a3b8"
      mid="#475569"
      shadow="#312e81"
      deep="#17163b"
      scale={1.15}
    />
    <DetailedPixelCloud
      x={248}
      y={14}
      rim="#dbeafe"
      light="#93c5fd"
      mid="#4338ca"
      shadow="#1e1b4b"
      deep="#0f102e"
      scale={0.95}
      flip
    />
    <DetailedPixelCloud
      x={452}
      y={24}
      rim="#e2e8f0"
      light="#818cf8"
      mid="#3730a3"
      shadow="#1e1b4b"
      deep="#0f102e"
      scale={1.1}
    />
  </g>
);

export const CitadelFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {/* Distant hazy cosmic range behind foreground peaks */}
    <g opacity="0.6">
      {CITADEL_BACK_PEAKS.map((peak, i) => (
        <PixelMountainPeak
          key={`back-${i}`}
          peak={peak}
          litColor="#3b3575"
          midColor="#1b1840"
          shadowColor="#0b0920"
        />
      ))}
    </g>

    <PixelMistBand y={96} height={20} color="#6366f1" opacity="0.14" />

    {/* Craggy moonlit slate-indigo astral peaks with pale silver snow/frost crests */}
    {CITADEL_PEAKS.map((peak, i) => (
      <PixelMountainPeak
        key={i}
        peak={peak}
        litColor="#5b5494"
        midColor={color}
        shadowColor="#0d0b22"
        capLit="#cbd5e1"
        capShadow="#47417a"
      />
    ))}

    {/* Realistic Floating Shattered Sky-Crags with Ruined Stone Obelisks & Debris */}
    {[116, 342, 548].map((ix, idx) => (
      <g key={ix} transform={`translate(${ix} ${idx % 2 === 0 ? 50 : 42})`}>
        {/* Asymmetric stratified rocky floating islet */}
        <polygon points="-22,0 24,0 16,8 8,14 1,22 -6,12 -15,9" fill="#171430" />
        <polygon points="-22,0 2,0 1,22 -6,12 -15,9" fill="#312b5c" />
        <polygon points="-22,0 -8,0 -11,8 -15,9" fill="#64748b" />
        <rect x="-22" y="-2" width="46" height="3" fill="#475569" />
        <rect x="-20" y="-2" width="24" height="1" fill="#cbd5e1" />
        {/* Weathered ruined marble spire perched on crag */}
        <rect x="-7" y="-20" width="14" height="18" fill="#1e1b4b" />
        <rect x="-6" y="-19" width="5" height="17" fill="#64748b" />
        <rect x="-1" y="-19" width="7" height="17" fill="#334155" />
        <polygon points="0,-31 -8,-20 8,-20" fill="#334155" />
        <polygon points="0,-31 -8,-20 0,-20" fill="#94a3b8" />
        <rect x="-2" y="-14" width="4" height="6" fill="#7dd3fc" opacity="0.85" />
        {/* Faint tumbling pebble debris suspended beneath islet */}
        <rect x="-12" y="16" width="3" height="2" fill="#475569" />
        <rect x="8" y="18" width="4" height="2" fill="#334155" />
        <rect x="-2" y="25" width="2" height="3" fill="#64748b" />
        {/* Thin starlight trickle */}
        <rect x="10" y="1" width="1" height="28" fill="#93c5fd" opacity="0.45" />
      </g>
    ))}

    <PixelMistBand y={112} height={22} color="#818cf8" opacity="0.16" />
  </g>
);

export const CitadelMidFar: React.FC = () => (
  <g>
    {/* Distant Astral Highland Horizon & Gothic Stone Sky-Bridge */}
    <rect x="0" y="124" width="640" height="36" fill="#121029" />
    {/* Graceful stone aqueduct / sky-bridge spanning horizon */}
    <rect x="0" y="102" width="640" height="6" fill="#1e1c3d" />
    <rect x="0" y="102" width="640" height="1" fill="#94a3b8" opacity="0.55" />
    <rect x="0" y="107" width="640" height="1" fill="#0d0b22" />
    {Array.from({ length: 16 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 40} 108)`}>
        <rect x="0" y="0" width="9" height="34" fill="#191636" />
        <rect x="0" y="0" width="2" height="34" fill="#475569" opacity="0.7" />
        <rect x="9" y="0" width="31" height="4" fill="#191636" />
        <rect x="9" y="4" width="5" height="4" fill="#191636" />
        <rect x="35" y="4" width="5" height="4" fill="#191636" />
      </g>
    ))}

    {/* Distant Gothic Citadel Spire Silhouettes with Warm & Starlight Windows */}
    {[84, 256, 424, 586].map((sx, idx) => (
      <g key={sx} transform={`translate(${sx} 64)`}>
        <rect x="-12" y="14" width="24" height="54" fill="#171533" />
        <rect x="-12" y="14" width="6" height="54" fill="#334155" opacity="0.85" />
        {/* Battlement crenellations */}
        <rect x="-13" y="11" width="4" height="3" fill="#475569" />
        <rect x="-2" y="11" width="4" height="3" fill="#334155" />
        <rect x="9" y="11" width="4" height="3" fill="#1e1b4b" />
        {/* Steep slate-blue cathedral roof */}
        <polygon points="0,-12 -13,12 13,12" fill="#1e293b" />
        <polygon points="0,-12 -13,12 0,12" fill="#475569" />
        <rect x="-1" y="-17" width="2" height="6" fill="#cbd5e1" />
        {/* Tall narrow lit lancet windows */}
        <rect x="-5" y="22" width="3" height="10" fill={idx % 2 === 0 ? '#7dd3fc' : '#fde68a'} opacity="0.75" />
        <rect x="2" y="22" width="3" height="10" fill={idx % 2 === 0 ? '#7dd3fc' : '#fde68a'} opacity="0.65" />
        <rect x="-2" y="38" width="4" height="8" fill="#93c5fd" opacity="0.55" />
      </g>
    ))}

    <PixelMistBand y={132} height={18} color="#818cf8" opacity="0.16" />
  </g>
);

export const CitadelMidground: React.FC = () => (
  <g>
    {/* Grand Astral Riftgate Dimensional Archway at x=320 (Centerpiece Landmark) */}
    <g transform="translate(320 150)">
      {/* Ground cast shadow */}
      <rect x="-52" y="-2" width="104" height="4" fill="#070614" opacity="0.75" />

      {/* Outer carved stone Riftgate piers with ashlar courses */}
      <rect x="-44" y="-88" width="16" height="88" fill="#0d0b1e" />
      <rect x="28" y="-88" width="16" height="88" fill="#0d0b1e" />
      <rect x="-43" y="-87" width="14" height="86" fill="#2e2a4a" />
      <rect x="29" y="-87" width="14" height="86" fill="#25213d" />
      {/* Moonlit left bevels */}
      <rect x="-43" y="-87" width="4" height="86" fill="#64748b" />
      <rect x="-43" y="-87" width="2" height="86" fill="#94a3b8" />
      <rect x="29" y="-87" width="3" height="86" fill="#475569" />
      {/* Stepped stone plinth bases */}
      <rect x="-48" y="-10" width="24" height="10" fill="#1e1b33" />
      <rect x="-48" y="-10" width="24" height="2" fill="#94a3b8" />
      <rect x="24" y="-10" width="24" height="10" fill="#1e1b33" />
      <rect x="24" y="-10" width="24" height="2" fill="#64748b" />
      {/* Individual stone block joints & faint inlaid runes */}
      {[-74, -60, -46, -32, -18].map((by) => (
        <React.Fragment key={by}>
          <rect x="-43" y={by} width="14" height="1" fill="#151229" />
          <rect x="29" y={by} width="14" height="1" fill="#151229" />
        </React.Fragment>
      ))}
      <rect x="-37" y="-56" width="3" height="8" fill="#38bdf8" opacity="0.75" />
      <rect x="-36" y="-54" width="1" height="4" fill="#e0f2fe" />
      <rect x="34" y="-56" width="3" height="8" fill="#38bdf8" opacity="0.75" />
      <rect x="35" y="-54" width="1" height="4" fill="#e0f2fe" />

      {/* Arched Gothic Stone Crown & Floating Shattered Keystone Segments */}
      <rect x="-48" y="-98" width="96" height="11" fill="#0d0b1e" />
      <rect x="-47" y="-97" width="94" height="9" fill="#334155" />
      <rect x="-47" y="-97" width="94" height="2" fill="#cbd5e1" />
      <rect x="-45" y="-91" width="90" height="2" fill="#b4822c" opacity="0.85" />
      {/* Fractured hovering stone crown blocks */}
      <polygon points="0,-116 -14,-100 14,-100" fill="#1e293b" />
      <polygon points="0,-115 -12,-101 0,-101" fill="#64748b" />
      <rect x="-3" y="-109" width="6" height="6" fill="#38bdf8" />
      <rect x="-1" y="-107" width="2" height="2" fill="#ffffff" />
      <rect x="-26" y="-108" width="6" height="4" fill="#475569" />
      <rect x="20" y="-109" width="7" height="4" fill="#334155" />

      {/* Dimensional Astral Rift Swirling Inside the Archway */}
      <rect x="-28" y="-86" width="56" height="86" fill="#09071a" opacity="0.88" />
      {/* Concentric stepped cosmic rift energy layers */}
      <rect x="-24" y="-80" width="48" height="76" fill="#1e1b4b" opacity="0.7" />
      <rect x="-20" y="-74" width="40" height="66" fill="#312e81" opacity="0.6" />
      <rect x="-15" y="-66" width="30" height="52" fill="#0369a1" opacity="0.48" />
      <rect x="-10" y="-58" width="20" height="38" fill="#38bdf8" opacity="0.35" />
      <rect x="-5" y="-48" width="10" height="20" fill="#c7d2fe" opacity="0.55" />
      <rect x="-2" y="-42" width="4" height="10" fill="#ffffff" opacity="0.75" />
      {/* Pixel dimensional sparks & floating arch shadow */}
      <rect x="-18" y="-68" width="2" height="2" fill="#bae6fd" />
      <rect x="15" y="-62" width="2" height="2" fill="#c084fc" />
      <rect x="-14" y="-26" width="2" height="2" fill="#e0f2fe" />
      <rect x="12" y="-32" width="2" height="2" fill="#7dd3fc" />
      <rect x="-28" y="-86" width="56" height="4" fill="#0d0b1e" />
    </g>

    {/* Realistic Dark Slate-Marble Gothic Cathedral Towers at x=122 and x=520 */}
    {[122, 520].map((px) => (
      <g key={px} transform={`translate(${px} 150)`}>
        <rect x="-38" y="-2" width="76" height="4" fill="#070614" opacity="0.7" />
        {/* Stone flying buttresses */}
        <polygon points="-28,-54 -38,-14 -28,-14" fill="#1e1b33" />
        <polygon points="28,-54 38,-14 28,-14" fill="#171429" />
        <rect x="-38" y="-24" width="10" height="24" fill="#2e2a4a" />
        <rect x="-38" y="-24" width="3" height="24" fill="#64748b" />
        <rect x="28" y="-24" width="10" height="24" fill="#201d38" />

        {/* Main carved slate-marble tower body */}
        <rect x="-30" y="-90" width="60" height="90" fill="#0d0b1e" />
        <rect x="-29" y="-89" width="58" height="88" fill="#252242" />
        {/* Moonlit left corner pilaster & weathered bevels */}
        <rect x="-29" y="-89" width="10" height="88" fill="#3b3763" />
        <rect x="-29" y="-89" width="3" height="88" fill="#94a3b8" />
        <rect x="20" y="-89" width="9" height="88" fill="#17152e" />
        {/* Subtle aged antique-bronze cornices */}
        <rect x="-30" y="-89" width="60" height="2" fill="#b4822c" />
        <rect x="-30" y="-40" width="60" height="2" fill="#926722" />
        <rect x="-30" y="-10" width="60" height="2" fill="#926722" />
        {/* Masonry stone courses */}
        {[-74, -58, -26].map((by) => (
          <rect key={by} x="-29" y={by} width="58" height="1" fill="#141229" />
        ))}

        {/* Steep Slate-Blue Gothic Spire Roof */}
        <polygon points="0,-122 -34,-88 34,-88" fill="#0d0b1e" />
        <polygon points="0,-120 -32,-89 32,-89" fill="#1e293b" />
        <polygon points="0,-120 -32,-89 0,-89" fill="#334155" />
        <polygon points="0,-120 -16,-89 -8,-89" fill="#64748b" opacity="0.65" />
        <rect x="-1" y="-131" width="2" height="11" fill="#cbd5e1" />
        <rect x="-4" y="-126" width="8" height="2" fill="#d4a24c" />

        {/* Recessed Mullioned Gothic Stained-Glass Lancet Window */}
        <rect x="-11" y="-76" width="22" height="38" fill="#0d0b1e" />
        <rect x="-9" y="-74" width="18" height="34" fill="#1e3a8a" />
        <rect x="-7" y="-79" width="14" height="7" fill="#334155" />
        <rect x="-7" y="-72" width="14" height="30" fill="#38bdf8" opacity="0.7" />
        <rect x="-4" y="-68" width="8" height="22" fill="#bae6fd" opacity="0.85" />
        <rect x="-2" y="-62" width="4" height="12" fill="#fef3c7" opacity="0.9" />
        {/* Stone tracery mullions */}
        <rect x="-1" y="-74" width="2" height="34" fill="#1e1b33" />
        <rect x="-9" y="-61" width="18" height="2" fill="#1e1b33" />
        <rect x="-9" y="-49" width="18" height="2" fill="#1e1b33" />
      </g>
    ))}

    {/* Fractured Floating Runic Monoliths at x=42 and x=604 */}
    {[42, 604].map((mx) => (
      <g key={mx} transform={`translate(${mx} 150)`}>
        <rect x="-14" y="-10" width="28" height="10" fill="#171429" />
        <rect x="-13" y="-9" width="26" height="8" fill="#2e2a4a" />
        <rect x="-13" y="-9" width="26" height="2" fill="#64748b" />
        {/* Lower stone monolith half */}
        <rect x="-8" y="-32" width="16" height="22" fill="#1e1b33" />
        <rect x="-7" y="-31" width="6" height="20" fill="#475569" />
        <rect x="-1" y="-31" width="8" height="20" fill="#2e2a4a" />
        {/* Arcane cyan rift gap holding upper fractured stone aloft */}
        <rect x="-10" y="-38" width="20" height="4" fill="#38bdf8" opacity="0.22" />
        <rect x="-5" y="-37" width="10" height="2" fill="#7dd3fc" opacity="0.85" />
        {/* Hovering upper monolith crystal-tipped cap */}
        <polygon points="0,-70 -9,-42 9,-42" fill="#1e1b33" />
        <polygon points="0,-68 -8,-43 0,-43" fill="#64748b" />
        <polygon points="0,-68 0,-43 8,-43" fill="#2e2a4a" />
        <rect x="-1" y="-58" width="2" height="10" fill="#7dd3fc" />
        <rect x="-13" y="-46" width="2" height="2" fill="#bae6fd" />
        <rect x="11" y="-52" width="2" height="2" fill="#93c5fd" />
      </g>
    ))}

    {/* Weathered Dark-Marble Parapet Balustrades & Starlight Lanterns at x=216 and x=424 */}
    {[216, 424].map((bx) => (
      <g key={bx} transform={`translate(${bx} 150)`}>
        {/* Carved stone rail cap & antique bronze inlay */}
        <rect x="-32" y="-34" width="64" height="6" fill="#0d0b1e" />
        <rect x="-31" y="-33" width="62" height="4" fill="#475569" />
        <rect x="-31" y="-33" width="62" height="1" fill="#cbd5e1" />
        <rect x="-31" y="-29" width="62" height="1" fill="#b4822c" opacity="0.75" />
        {/* Base curb */}
        <rect x="-30" y="-7" width="60" height="7" fill="#1e1b33" />
        <rect x="-30" y="-7" width="60" height="2" fill="#475569" />
        {/* Carved stone balusters */}
        {[-22, -11, 0, 11, 22].map((lx) => (
          <g key={lx}>
            <rect x={lx - 2} y="-28" width="5" height="21" fill="#252242" />
            <rect x={lx - 2} y="-28" width="2" height="21" fill="#64748b" />
            <rect x={lx - 3} y="-19" width="7" height="3" fill="#475569" />
          </g>
        ))}
        {/* Starlight crystal brazier post in center */}
        <rect x="-5" y="-42" width="10" height="8" fill="#1e293b" />
        <rect x="-7" y="-49" width="14" height="14" fill="#38bdf8" opacity="0.16" />
        <polygon points="0,-52 -4,-45 0,-41 4,-45" fill="#38bdf8" />
        <rect x="-1" y="-47" width="2" height="3" fill="#ffffff" />
      </g>
    ))}
  </g>
);

export const CitadelGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    {/* Weathered dark slate-marble verge & causeway */}
    <rect x="0" y="149" width="640" height="31" fill={groundColor} />
    <rect x="0" y="152" width="640" height="28" fill={pathColor} />
    {/* Subtle antique-gold stone trim strips */}
    <rect x="0" y="152" width="640" height="2" fill="#78531b" />
    <rect x="0" y="152" width="640" height="1" fill="#d4a24c" opacity="0.75" />
    <rect x="0" y="177" width="640" height="2" fill="#5c3e14" />

    {/* Chiseled Dark Astral Marble Flagstones with Hairline Cracks & Subtle Runes (20 x 32 = 640 exact) */}
    {Array.from({ length: 20 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 32} 154)`}>
        {/* Upper marble slab */}
        <rect x="0" y="0" width="31" height="11" fill="none" stroke="#0d0b1e" strokeWidth="1" />
        <rect x="1" y="1" width="29" height="2" fill="#94a3b8" opacity="0.22" />
        {/* Lower staggered slab */}
        <rect x="0" y="12" width="31" height="11" fill="#16132b" opacity="0.55" stroke="#0d0b1e" strokeWidth="1" />
        <rect x="1" y="13" width="29" height="1" fill="#64748b" opacity="0.25" />
        {/* Occasional subtle weathered stone cracks */}
        {i % 3 === 0 && (
          <>
            <rect x="7" y="4" width="6" height="1" fill="#0b0917" />
            <rect x="12" y="5" width="3" height="2" fill="#0b0917" />
          </>
        )}
        {/* Delicate recessed astral ley-line rune every 2nd slab */}
        {i % 2 === 0 && (
          <g transform="translate(16 11)">
            <rect x="-4" y="-1" width="8" height="2" fill="#38bdf8" opacity="0.32" />
            <rect x="-1" y="-2" width="2" height="4" fill="#7dd3fc" opacity="0.55" />
            <rect x="-1" y="-1" width="2" height="2" fill="#e0f2fe" opacity="0.75" />
          </g>
        )}
      </g>
    ))}
  </g>
);
