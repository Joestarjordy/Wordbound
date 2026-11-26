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

const RUINS_MICRO_STARS: readonly [number, number, string, number?][] = [
  [18, 14, '#e0e7ff', 0.65], [44, 28, '#fef08a', 0.6], [62, 12, '#c7d2fe', 0.7],
  [84, 34, '#e0e7ff', 0.5], [116, 16, '#ffffff', 0.75], [136, 36, '#a5b4fc', 0.55],
  [164, 14, '#fde68a', 0.65], [186, 26, '#e0e7ff', 0.6], [208, 12, '#ffffff', 0.7],
  [234, 32, '#c7d2fe', 0.55], [258, 18, '#fef08a', 0.65], [284, 28, '#e0e7ff', 0.6],
  [304, 14, '#a5b4fc', 0.7], [28, 46, '#c7d2fe', 0.45], [146, 48, '#fde68a', 0.4],
  [272, 46, '#e0e7ff', 0.45],
];

const RUINS_PEAKS: MountainPeak[] = [
  { x: 52, y: 50, baseY: 146, leftW: 68, rightW: 72, capHeight: 10 },
  { x: 162, y: 38, baseY: 146, leftW: 84, rightW: 82, capHeight: 14 },
  { x: 278, y: 56, baseY: 146, leftW: 70, rightW: 66 },
  { x: 386, y: 42, baseY: 146, leftW: 80, rightW: 86, capHeight: 12 },
  { x: 502, y: 54, baseY: 146, leftW: 72, rightW: 76 },
  { x: 604, y: 46, baseY: 146, leftW: 70, rightW: 74, capHeight: 11 },
];

export const RuinsSky: React.FC<{ stageId: number }> = ({ stageId }) => {
  const isQuarry = stageId % 2 === 0;
  return (
    <svg
      viewBox="0 0 320 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ shapeRendering: 'crispEdges' }}
    >
      <PixelDitherSky
        bands={
          isQuarry
            ? [
                { y: 0, h: 24, color: '#0c0a0d' },
                { y: 24, h: 24, color: '#1c191e' },
                { y: 48, h: 26, color: '#2e242c' },
                { y: 74, h: 26, color: '#472d28' },
                { y: 100, h: 26, color: '#6b3a24' },
                { y: 126, h: 28, color: '#78350f' },
                { y: 154, h: 26, color: '#451a03' },
              ]
            : [
                { y: 0, h: 24, color: '#080d1f' },
                { y: 24, h: 24, color: '#131738' },
                { y: 48, h: 26, color: '#1e1f52' },
                { y: 74, h: 26, color: '#2c296b' },
                { y: 100, h: 26, color: '#3b3478' },
                { y: 126, h: 28, color: '#473c7a' },
                { y: 154, h: 26, color: '#334155' },
              ]
        }
      />

      <StaticStarDust points={RUINS_MICRO_STARS} />
      <PixelStar x={36} y={22} color="#fde047" size={1} cross delay="0.4s" />
      <PixelStar x={158} y={26} color="#a5b4fc" size={1} cross delay="1.2s" />
      <PixelStar x={256} y={24} color="#fde047" size={1} cross delay="1.9s" />
      <PixelStar x={294} y={44} color="#e0e7ff" size={1} delay="0.8s" />

      {isQuarry ? (
        <g>
          <DetailedPixelMoon
            cx={224}
            cy={44}
            core="#fafafa"
            main="#e4e4e7"
            mid="#a1a1aa"
            shade="#52525b"
            crater="#71717a"
            glow="#f59e0b"
          />
          {/* Shattered floating moon fragments */}
          <rect x="246" y="32" width="5" height="4" fill="#d4d4d8" />
          <rect x="247" y="32" width="3" height="2" fill="#fafafa" />
          <rect x="251" y="42" width="4" height="3" fill="#a1a1aa" />
          <rect x="196" y="52" width="5" height="3" fill="#d4d4d8" />
          <rect x="200" y="28" width="3" height="2" fill="#e4e4e7" />
        </g>
      ) : (
        <g>
          <DetailedPixelMoon
            cx={94}
            cy={44}
            core="#f5f3ff"
            main="#c4b5fd"
            mid="#8b5cf6"
            shade="#5b21b6"
            crater="#6d28d9"
            glow="#a78bfa"
          />
          {/* Companion lesser twilight moon */}
          <rect x="128" y="28" width="8" height="8" fill="#e0e7ff" />
          <rect x="129" y="27" width="6" height="10" fill="#e0e7ff" />
          <rect x="127" y="29" width="10" height="6" fill="#e0e7ff" />
          <rect x="133" y="28" width="3" height="8" fill="#818cf8" opacity="0.65" />
        </g>
      )}
    </svg>
  );
};

export const RuinsClouds: React.FC = () => (
  <g opacity="0.62">
    <DetailedPixelCloud
      x={36}
      y={22}
      rim="#c7d2fe"
      light="#818cf8"
      mid="#4338ca"
      shadow="#312e81"
      deep="#1e1b4b"
      scale={1.15}
    />
    <DetailedPixelCloud
      x={244}
      y={14}
      rim="#e0e7ff"
      light="#a5b4fc"
      mid="#4f46e5"
      shadow="#312e81"
      deep="#1e1b4b"
      scale={0.95}
      flip
    />
    <DetailedPixelCloud
      x={452}
      y={26}
      rim="#c7d2fe"
      light="#818cf8"
      mid="#4338ca"
      shadow="#312e81"
      deep="#1e1b4b"
      scale={1.2}
    />
  </g>
);

export const RuinsFarMountains: React.FC<{ color: string }> = ({ color }) => (
  <g>
    {RUINS_PEAKS.map((peak, i) => (
      <PixelMountainPeak
        key={i}
        peak={peak}
        litColor="#818cf8"
        midColor={color}
        shadowColor="#0f172a"
        capLit="#cbd5e1"
        capShadow="#475569"
      />
    ))}
    {/* Distant ruined cliffside fortress silhouette */}
    <g transform="translate(162 32)" fill="#1e293b">
      <rect x="-12" y="0" width="6" height="18" />
      <rect x="-4" y="4" width="10" height="14" />
      <rect x="8" y="-3" width="6" height="21" />
      <rect x="-12" y="-2" width="2" height="2" />
      <rect x="-8" y="-2" width="2" height="2" />
      <rect x="8" y="-5" width="2" height="2" />
      <rect x="12" y="-5" width="2" height="2" />
      <rect x="10" y="3" width="2" height="4" fill="#fbbf24" opacity="0.8" />
    </g>
    <PixelMistBand y={110} height={22} color="#818cf8" opacity="0.16" />
  </g>
);

export const RuinsMidFar: React.FC = () => (
  <g>
    {/* Distant craggy foothills */}
    <path
      d="M0 128 L44 114 L96 124 L160 110 L232 122 L310 112 L384 126 L456 108 L534 122 L596 112 L640 128 V160 H0 Z"
      fill="#161d30"
    />

    {/* Ancient Broken Stone Aqueduct Viaducts */}
    {[
      { startX: 88, arches: 5, y: 78 },
      { startX: 404, arches: 5, y: 74 },
    ].map((aq, ai) => (
      <g key={ai} transform={`translate(${aq.startX} ${aq.y})`}>
        {/* Top aqueduct channel & sunlit stone rim */}
        <rect x="0" y="0" width={aq.arches * 28 + 8} height="8" fill="#1e293b" />
        <rect x="0" y="0" width={aq.arches * 28 + 8} height="2" fill="#64748b" />
        {/* Broken notch in middle span */}
        <rect x="64" y="0" width="12" height="4" fill="#0f172a" opacity="0.7" />
        {Array.from({ length: aq.arches + 1 }).map((_, pi) => {
          const px = pi * 28;
          return (
            <g key={pi}>
              <rect x={px} y="8" width="9" height="48" fill="#1e293b" />
              <rect x={px} y="8" width="3" height="48" fill="#475569" />
              {/* Arch spandrel */}
              {pi < aq.arches && (
                <>
                  <rect x={px + 9} y="8" width="19" height="4" fill="#1e293b" />
                  <rect x={px + 9} y="12" width="4" height="4" fill="#1e293b" />
                  <rect x={px + 24} y="12" width="4" height="4" fill="#1e293b" />
                </>
              )}
            </g>
          );
        })}
      </g>
    ))}

    <PixelMistBand y={132} height={18} color="#94a3b8" opacity="0.14" />
  </g>
);

export const RuinsMidground: React.FC = () => (
  <g>
    {/* Detailed Fluted Marble Columns (Intact & Shattered with Fallen Rubble) */}
    {[
      { x: 60, h: 88, broken: false },
      { x: 162, h: 52, broken: true },
      { x: 304, h: 92, broken: false },
      { x: 408, h: 48, broken: true },
      { x: 556, h: 84, broken: false },
    ].map((col, i) => (
      <g key={i} transform={`translate(${col.x} 150)`}>
        {/* Ground shadow */}
        <rect x="-18" y="-2" width="36" height="4" fill="#090d16" opacity="0.7" />
        {/* Stepped plinth base */}
        <rect x="-15" y="-8" width="30" height="8" fill="#0f172a" />
        <rect x="-14" y="-7" width="28" height="6" fill="#334155" />
        <rect x="-14" y="-7" width="28" height="2" fill="#94a3b8" />
        <rect x="-11" y="-12" width="22" height="5" fill="#1e293b" />
        <rect x="-10" y="-11" width="20" height="3" fill="#64748b" />

        {/* Fluted column shaft */}
        <rect x="-9" y={-col.h + 8} width="18" height={col.h - 20} fill="#0f172a" />
        <rect x="-8" y={-col.h + 8} width="16" height={col.h - 20} fill="#475569" />
        {/* Vertical fluting light/dark grooves */}
        <rect x="-7" y={-col.h + 8} width="3" height={col.h - 20} fill="#cbd5e1" />
        <rect x="-2" y={-col.h + 8} width="2" height={col.h - 20} fill="#94a3b8" />
        <rect x="2" y={-col.h + 8} width="2" height={col.h - 20} fill="#334155" />
        <rect x="5" y={-col.h + 8} width="3" height={col.h - 20} fill="#1e293b" />
        {/* Horizontal drum seams */}
        {[-24, -42, -60].map(
          (sy) =>
            sy > -col.h + 12 && (
              <rect key={sy} x="-8" y={sy} width="16" height="1" fill="#1e293b" />
            )
        )}

        {col.broken ? (
          <>
            {/* Jagged fractured top */}
            <polygon
              points={`-8,${-col.h + 8} -4,${-col.h + 1} 1,${-col.h + 10} 5,${-col.h + 4} 8,${-col.h + 8}`}
              fill="#64748b"
            />
            {/* Fallen column drum on the ground */}
            <rect x="14" y="-11" width="16" height="11" fill="#0f172a" />
            <rect x="15" y="-10" width="14" height="9" fill="#475569" />
            <rect x="15" y="-10" width="14" height="3" fill="#94a3b8" />
            <rect x="18" y="-11" width="6" height="2" fill="#22c55e" />
          </>
        ) : (
          <g>
            {/* Corinthian capital with scroll volutes */}
            <rect x="-14" y={-col.h} width="28" height="9" fill="#0f172a" />
            <rect x="-13" y={-col.h + 1} width="26" height="7" fill="#475569" />
            <rect x="-13" y={-col.h + 1} width="26" height="2" fill="#cbd5e1" />
            <rect x="-12" y={-col.h + 4} width="4" height="3" fill="#94a3b8" />
            <rect x="8" y={-col.h + 4} width="4" height="3" fill="#334155" />
          </g>
        )}

        {/* Cascading pixel moss & ivy */}
        <rect x="-7" y={-col.h + 11} width="4" height="3" fill="#15803d" />
        <rect x="-6" y={-col.h + 14} width="2" height="16" fill="#16a34a" />
        <rect x="-5" y={-col.h + 26} width="2" height="5" fill="#4ade80" />
      </g>
    ))}

    {/* Grand Ivy-Draped Triumphal Archway at x=232 */}
    <g transform="translate(232 150)">
      <rect x="-32" y="-82" width="16" height="82" fill="#0f172a" />
      <rect x="16" y="-82" width="16" height="82" fill="#0f172a" />
      <rect x="-31" y="-81" width="14" height="80" fill="#334155" />
      <rect x="17" y="-81" width="14" height="80" fill="#334155" />
      {/* Sunlit left stone bevels */}
      <rect x="-31" y="-81" width="4" height="80" fill="#94a3b8" />
      <rect x="17" y="-81" width="4" height="80" fill="#64748b" />
      {/* Individual ashlar block seams */}
      {[-68, -54, -40, -26, -12].map((by) => (
        <React.Fragment key={by}>
          <rect x="-31" y={by} width="14" height="1" fill="#1e293b" />
          <rect x="17" y={by} width="14" height="1" fill="#1e293b" />
        </React.Fragment>
      ))}
      {/* Arch cornice & entablature */}
      <rect x="-36" y="-94" width="72" height="13" fill="#0f172a" />
      <rect x="-35" y="-93" width="70" height="11" fill="#475569" />
      <rect x="-35" y="-93" width="70" height="3" fill="#cbd5e1" />
      <rect x="-33" y="-85" width="66" height="2" fill="#1e293b" />
      {/* Recessed inner arch shadow & keystone */}
      <rect x="-16" y="-80" width="32" height="10" fill="#1e293b" />
      <rect x="-12" y="-76" width="24" height="6" fill="#0b1120" />
      <rect x="-4" y="-82" width="8" height="10" fill="#94a3b8" />
      <rect x="-2" y="-80" width="4" height="6" fill="#fbbf24" opacity="0.7" />
      {/* Draped ivy tendrils */}
      <rect x="-20" y="-93" width="16" height="4" fill="#15803d" />
      <rect x="-14" y="-89" width="2" height="22" fill="#22c55e" />
      <rect x="-8" y="-89" width="2" height="14" fill="#16a34a" />
      <rect x="18" y="-93" width="12" height="3" fill="#15803d" />
      <rect x="22" y="-90" width="2" height="18" fill="#4ade80" />
    </g>

    {/* Levitating Arcane Mana Crystal Altars at x=112 and x=488 */}
    {[112, 488].map((cx) => (
      <g key={cx} transform={`translate(${cx} 150)`}>
        {/* Stepped carved altar plinth */}
        <rect x="-14" y="-8" width="28" height="8" fill="#1e293b" />
        <rect x="-11" y="-28" width="22" height="20" fill="#0f172a" />
        <rect x="-10" y="-27" width="20" height="19" fill="#334155" />
        <rect x="-10" y="-27" width="5" height="19" fill="#64748b" />
        <rect x="-13" y="-31" width="26" height="4" fill="#94a3b8" />
        <rect x="-3" y="-22" width="6" height="8" fill="#0284c7" />
        <rect x="-2" y="-20" width="4" height="4" fill="#7dd3fc" />
        {/* Stepped aura behind hovering crystal */}
        <rect x="-13" y="-60" width="26" height="24" fill="#38bdf8" opacity="0.14" />
        {/* Faceted Pixel Mana Crystal */}
        <polygon points="0,-66 -10,-48 0,-34 10,-48" fill="#0369a1" />
        <polygon points="0,-66 -10,-48 0,-46" fill="#38bdf8" />
        <polygon points="0,-64 -5,-48 0,-36 4,-48" fill="#0ea5e9" />
        <polygon points="0,-62 -3,-48 0,-44" fill="#e0f2fe" />
        {/* Orbiting crystal shards */}
        <rect x="-14" y="-52" width="2" height="4" fill="#7dd3fc" />
        <rect x="12" y="-44" width="2" height="4" fill="#bae6fd" />
      </g>
    ))}

    {/* Weathered Fallen Knight Monument at x=356 */}
    <g transform="translate(356 150)">
      <rect x="-18" y="-18" width="36" height="18" fill="#0f172a" />
      <rect x="-17" y="-17" width="34" height="16" fill="#334155" />
      <rect x="-17" y="-17" width="34" height="3" fill="#94a3b8" />
      <rect x="-12" y="-11" width="24" height="2" fill="#1e293b" />
      {/* Sculpted Knight Body & Cloak */}
      <rect x="-10" y="-56" width="20" height="39" fill="#1e293b" />
      <rect x="-8" y="-56" width="14" height="39" fill="#64748b" />
      <rect x="-8" y="-56" width="5" height="39" fill="#94a3b8" />
      {/* Helmet & glowing visor slit */}
      <rect x="-6" y="-68" width="12" height="12" fill="#475569" />
      <rect x="-6" y="-68" width="5" height="12" fill="#cbd5e1" />
      <rect x="-4" y="-64" width="8" height="2" fill="#38bdf8" />
      <rect x="-2" y="-73" width="4" height="5" fill="#94a3b8" />
      {/* Planted Stone Greatsword */}
      <rect x="8" y="-54" width="4" height="38" fill="#cbd5e1" />
      <rect x="10" y="-54" width="2" height="38" fill="#64748b" />
      <rect x="4" y="-48" width="12" height="3" fill="#f59e0b" />
      <rect x="9" y="-58" width="2" height="4" fill="#fbbf24" />
    </g>
  </g>
);

export const RuinsGround: React.FC<{ groundColor: string; pathColor: string }> = ({
  groundColor,
  pathColor,
}) => (
  <g>
    <rect x="0" y="148" width="640" height="6" fill={groundColor} />
    <rect x="0" y="148" width="640" height="2" fill="#94a3b8" opacity="0.55" />
    <rect x="0" y="152" width="640" height="28" fill={pathColor} />
    {/* Recessed glowing golden ley-line seam */}
    <rect x="0" y="162" width="640" height="5" fill="#451a03" />
    <rect x="0" y="163" width="640" height="3" fill="#d97706" />
    <rect x="0" y="164" width="640" height="1" fill="#fef08a" />

    {/* Chiseled Imperial Flagstones with bevels, cracks & moss (20 x 32 = 640 exact) */}
    {Array.from({ length: 20 }).map((_, i) => (
      <g key={i} transform={`translate(${i * 32} 152)`}>
        {/* Top course block */}
        <rect x="0" y="0" width="31" height="10" fill="none" stroke="#0f172a" strokeWidth="1" />
        <rect x="1" y="1" width="29" height="2" fill="#cbd5e1" opacity="0.32" />
        {/* Lower course block */}
        <rect x="0" y="15" width="31" height="13" fill="none" stroke="#0f172a" strokeWidth="1" />
        <rect x="1" y="16" width="29" height="2" fill="#94a3b8" opacity="0.25" />
        {/* Weathered cracks */}
        {i % 3 === 0 && (
          <>
            <rect x="8" y="4" width="6" height="1" fill="#0f172a" />
            <rect x="13" y="5" width="3" height="2" fill="#0f172a" />
          </>
        )}
        {/* Moss tufts growing in crevices */}
        {i % 2 === 1 && (
          <>
            <rect x="25" y="-2" width="5" height="3" fill="#15803d" />
            <rect x="26" y="-3" width="3" height="2" fill="#4ade80" />
          </>
        )}
        {/* Glowing rune dash along ley-line */}
        {i % 2 === 0 && <rect x="10" y="12" width="8" height="1" fill="#ffffff" opacity="0.7" />}
      </g>
    ))}
  </g>
);
