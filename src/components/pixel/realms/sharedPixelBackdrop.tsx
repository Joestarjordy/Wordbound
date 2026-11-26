import React from 'react';

export interface SeamlessTrackProps {
  animationName:
    | 'parallaxGround'
    | 'parallaxMid'
    | 'parallaxMidFar'
    | 'parallaxFar'
    | 'cloudDrift';
  duration: string;
  inCombat: boolean;
  children: React.ReactNode;
}

/**
 * Seamless 4-tile horizontal parallax strip (each SVG tile is 640x180 pixel grid).
 * Animates strictly via GPU-composited `transform: translate3d(...)`.
 */
export const SeamlessTrack: React.FC<SeamlessTrackProps> = ({
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

/**
 * Authentic 16-bit stepped pixel sky with Bayer-style horizontal dithering transitions
 * between color bands so skies feel painted on a real retro pixel canvas.
 */
export const PixelDitherSky: React.FC<{
  bands: { y: number; h: number; color: string }[];
  width?: number;
}> = ({ bands, width = 320 }) => {
  const cols = Math.ceil(width / 4);
  return (
    <g>
      {bands.map((band, idx) => {
        const nextBand = bands[idx + 1];
        const seamY = band.y + band.h;
        return (
          <React.Fragment key={idx}>
            <rect x="0" y={band.y} width={width} height={band.h} fill={band.color} />
            {nextBand && (
              <g fill={nextBand.color}>
                {Array.from({ length: cols }).map((_, c) => {
                  const x = c * 4;
                  return (
                    <React.Fragment key={c}>
                      {/* Sparse top dither */}
                      {c % 2 === 0 && <rect x={x} y={seamY - 4} width="2" height="1" />}
                      {/* Checkerboard mid dither */}
                      <rect x={x + 2} y={seamY - 3} width="2" height="1" />
                      <rect x={x} y={seamY - 2} width="2" height="1" />
                      {/* Dense lower dither */}
                      <rect x={x} y={seamY - 1} width="3" height="1" />
                    </React.Fragment>
                  );
                })}
              </g>
            )}
          </React.Fragment>
        );
      })}
    </g>
  );
};

/** Multi-scale twinkling 16-bit pixel starfield */
export const PixelStar: React.FC<{
  x: number;
  y: number;
  color: string;
  size?: number;
  delay?: string;
  duration?: string;
  cross?: boolean;
}> = ({ x, y, color, size = 1, delay = '0s', duration = '3.2s', cross = false }) => (
  <g
    transform={`translate(${x} ${y})`}
    fill={color}
    style={{
      animation: `starTwinkle ${duration} ease-in-out infinite`,
      animationDelay: delay,
      transformOrigin: `${x}px ${y}px`,
    }}
  >
    <rect x="0" y="0" width={size} height={size} />
    {cross && (
      <>
        <rect x={-size} y={0} width={size * 3} height={Math.max(1, size - 1)} opacity="0.7" />
        <rect x={0} y={-size} width={Math.max(1, size - 1)} height={size * 3} opacity="0.7" />
        <rect x={0} y={0} width={1} height={1} fill="#ffffff" />
      </>
    )}
  </g>
);

/** Static crisp micro-stars for realistic deep night sky density */
export const StaticStarDust: React.FC<{
  points: readonly [number, number, string, number?][];
}> = ({ points }) => (
  <g>
    {points.map(([x, y, fill, opacity = 0.7], i) => (
      <rect key={i} x={x} y={y} width="1" height="1" fill={fill} opacity={opacity} />
    ))}
  </g>
);

/**
 * Richly shaded 4-tone billowing cumulus pixel cloud with rim highlight,
 * lit billows, body midtone, shadowed belly, and wispy tail.
 */
export const DetailedPixelCloud: React.FC<{
  x: number;
  y: number;
  rim: string;
  light: string;
  mid: string;
  shadow: string;
  deep: string;
  scale?: number;
  flip?: boolean;
}> = ({ x, y, rim, light, mid, shadow, deep, scale = 1, flip = false }) => (
  <g
    transform={`translate(${x} ${y}) scale(${flip ? -scale : scale}, ${scale})`}
  >
    {/* Distant wispy left & right trails */}
    <rect x="-10" y="14" width="12" height="2" fill={shadow} opacity="0.6" />
    <rect x="66" y="13" width="14" height="2" fill={shadow} opacity="0.55" />
    <rect x="74" y="11" width="8" height="2" fill={mid} opacity="0.5" />

    {/* Deep shadowed underside */}
    <rect x="2" y="14" width="64" height="4" fill={deep} />
    <rect x="6" y="17" width="54" height="2" fill={deep} opacity="0.75" />

    {/* Shadowed lower billow */}
    <rect x="0" y="11" width="68" height="4" fill={shadow} />
    <rect x="4" y="9" width="58" height="4" fill={shadow} />

    {/* Main midtone cloud body (multi-dome cumulus silhouette) */}
    <rect x="2" y="9" width="60" height="4" fill={mid} />
    <rect x="8" y="6" width="46" height="5" fill={mid} />
    <rect x="16" y="3" width="24" height="5" fill={mid} />
    <rect x="38" y="5" width="14" height="5" fill={mid} />
    <rect x="6" y="7" width="12" height="4" fill={mid} />

    {/* Lit upper billows */}
    <rect x="17" y="2" width="20" height="4" fill={light} />
    <rect x="12" y="5" width="28" height="4" fill={light} />
    <rect x="39" y="4" width="11" height="4" fill={light} />
    <rect x="7" y="7" width="10" height="3" fill={light} />
    <rect x="22" y="8" width="16" height="2" fill={light} />
    <rect x="48" y="8" width="10" height="2" fill={light} />

    {/* Crisp sunlit / moonlit top rim pixels */}
    <rect x="20" y="1" width="13" height="2" fill={rim} />
    <rect x="14" y="4" width="8" height="2" fill={rim} />
    <rect x="41" y="3" width="7" height="2" fill={rim} />
    <rect x="9" y="6" width="5" height="1" fill={rim} />

    {/* Pixel dither speckles along belly transition */}
    <rect x="8" y="13" width="2" height="1" fill={mid} />
    <rect x="16" y="13" width="3" height="1" fill={mid} />
    <rect x="28" y="13" width="2" height="1" fill={mid} />
    <rect x="42" y="13" width="3" height="1" fill={mid} />
    <rect x="54" y="13" width="2" height="1" fill={mid} />
  </g>
);

/**
 * Detailed 16-bit Celestial Moon / Eclipse with stepped pixel aura,
 * realistic maria/craters, limb darkening, and optional eclipse corona.
 */
export const DetailedPixelMoon: React.FC<{
  cx: number;
  cy: number;
  core: string;
  main: string;
  mid: string;
  shade: string;
  crater: string;
  glow: string;
  eclipsed?: boolean;
  ringColor?: string;
}> = ({
  cx,
  cy,
  core,
  main,
  mid,
  shade,
  crater,
  glow,
  eclipsed = false,
  ringColor,
}) => (
  <g transform={`translate(${cx} ${cy})`}>
    {/* Concentric stepped atmospheric pixel halo */}
    <rect x="-34" y="-14" width="68" height="28" fill={glow} opacity="0.06" />
    <rect x="-28" y="-22" width="56" height="44" fill={glow} opacity="0.07" />
    <rect x="-24" y="-24" width="48" height="48" fill={glow} opacity="0.09" />
    <rect x="-22" y="-18" width="44" height="36" fill={glow} opacity="0.14" />
    <rect x="-18" y="-22" width="36" height="44" fill={glow} opacity="0.14" />

    {/* Optional back planetary ring */}
    {ringColor && (
      <g opacity="0.7" fill={ringColor}>
        <rect x="-36" y="-4" width="18" height="2" />
        <rect x="-32" y="-6" width="16" height="2" />
        <rect x="-26" y="-8" width="12" height="2" />
        <rect x="18" y="2" width="18" height="2" />
        <rect x="16" y="4" width="16" height="2" />
        <rect x="12" y="6" width="14" height="2" />
      </g>
    )}

    {/* High-res stepped circular moon disc (radius 18px) */}
    <rect x="-8" y="-18" width="16" height="36" fill={main} />
    <rect x="-12" y="-16" width="24" height="32" fill={main} />
    <rect x="-15" y="-13" width="30" height="26" fill={main} />
    <rect x="-17" y="-10" width="34" height="20" fill={main} />
    <rect x="-18" y="-6" width="36" height="12" fill={main} />

    {/* Bright sunlit upper-left crescent core */}
    <rect x="-14" y="-12" width="12" height="14" fill={core} opacity="0.75" />
    <rect x="-16" y="-8" width="8" height="10" fill={core} opacity="0.85" />
    <rect x="-10" y="-15" width="10" height="6" fill={core} opacity="0.7" />

    {/* Subtle mid-tone terminator */}
    <rect x="2" y="-16" width="8" height="32" fill={mid} opacity="0.45" />
    <rect x="8" y="-14" width="6" height="28" fill={shade} opacity="0.55" />
    <rect x="12" y="-10" width="5" height="20" fill={shade} opacity="0.72" />
    <rect x="15" y="-6" width="3" height="12" fill={shade} opacity="0.85" />

    {eclipsed ? (
      <>
        {/* Dark eclipsed moon body leaving blazing pixel corona */}
        <rect x="-7" y="-15" width="14" height="30" fill="#090412" />
        <rect x="-11" y="-13" width="22" height="26" fill="#090412" />
        <rect x="-14" y="-10" width="28" height="20" fill="#090412" />
        <rect x="-15" y="-6" width="30" height="12" fill="#090412" />
        {/* Inner corona flare spikes */}
        <rect x="-18" y="-2" width="3" height="4" fill={core} />
        <rect x="15" y="-1" width="3" height="3" fill={core} />
        <rect x="-2" y="-18" width="4" height="3" fill={core} />
        <rect x="-1" y="15" width="3" height="3" fill={main} />
        {/* Faint eclipse rim reflection */}
        <rect x="-12" y="-11" width="4" height="2" fill={mid} opacity="0.45" />
        <rect x="-13" y="-9" width="2" height="6" fill={mid} opacity="0.35" />
      </>
    ) : (
      <>
        {/* Detailed lunar maria & shaded pixel craters */}
        <rect x="-10" y="-10" width="7" height="5" fill={crater} opacity="0.45" />
        <rect x="-9" y="-9" width="5" height="3" fill={shade} opacity="0.4" />
        <rect x="-10" y="-10" width="5" height="1" fill={core} opacity="0.6" />

        <rect x="-3" y="-3" width="8" height="6" fill={crater} opacity="0.35" />
        <rect x="-1" y="-2" width="5" height="4" fill={shade} opacity="0.35" />

        <rect x="3" y="4" width="7" height="5" fill={crater} opacity="0.55" />
        <rect x="5" y="5" width="4" height="3" fill={shade} opacity="0.45" />

        <rect x="-9" y="5" width="5" height="4" fill={crater} opacity="0.42" />
        <rect x="-8" y="6" width="3" height="2" fill={shade} opacity="0.35" />

        <rect x="5" y="-10" width="4" height="3" fill={crater} opacity="0.5" />
        <rect x="-2" y="11" width="5" height="3" fill={crater} opacity="0.45" />
      </>
    )}

    {/* Optional front planetary ring crossing moon */}
    {ringColor && (
      <g fill={ringColor}>
        <rect x="-32" y="-2" width="16" height="2" opacity="0.9" />
        <rect x="-20" y="0" width="24" height="2" opacity="0.95" />
        <rect x="0" y="2" width="24" height="2" opacity="0.95" />
        <rect x="18" y="4" width="18" height="2" opacity="0.85" />
        <rect x="-14" y="0" width="12" height="1" fill="#ffffff" opacity="0.8" />
        <rect x="4" y="2" width="10" height="1" fill="#ffffff" opacity="0.7" />
      </g>
    )}
  </g>
);

/**
 * Organic craggy 16-bit Pixel Mountain with irregular rocky shoulders,
 * a winding central ridge separating moonlit/sunlit left faces from shadowed
 * right faces, cliff strata facets, and optional snow/crystal/lava details.
 * Automatically wraps across the 640px tile seam when near x=0 or x=640.
 */
export interface MountainPeak {
  x: number;
  y: number; // peak top y
  baseY: number;
  leftW: number;
  rightW: number;
  capHeight?: number;
  lavaVein?: boolean;
}

const SingleMountainPeak: React.FC<{
  peak: MountainPeak;
  offsetX?: number;
  litColor: string;
  midColor: string;
  shadowColor: string;
  capLit?: string;
  capShadow?: string;
  lavaVein?: boolean;
}> = ({
  peak,
  offsetX = 0,
  litColor,
  midColor,
  shadowColor,
  capLit,
  capShadow,
  lavaVein = false,
}) => {
  const x = peak.x + offsetX;
  const { y, baseY, leftW, rightW, capHeight = 0 } = peak;
  const h = baseY - y;
  const showLavaVein = lavaVein || Boolean(peak.lavaVein);

  // Irregular rocky shoulder points along left and right slopes
  const l1x = x - Math.round(leftW * 0.28);
  const l1y = y + Math.round(h * 0.34);
  const l2x = x - Math.round(leftW * 0.56);
  const l2y = y + Math.round(h * 0.52);
  const l3x = x - Math.round(leftW * 0.76);
  const l3y = y + Math.round(h * 0.78);

  const r1x = x + Math.round(rightW * 0.24);
  const r1y = y + Math.round(h * 0.3);
  const r2x = x + Math.round(rightW * 0.52);
  const r2y = y + Math.round(h * 0.56);
  const r3x = x + Math.round(rightW * 0.78);
  const r3y = y + Math.round(h * 0.76);

  // Winding central spine separating sunlit left face from shadowed right face
  const s1x = x - Math.round(leftW * 0.06);
  const s1y = y + Math.round(h * 0.28);
  const s2x = x + Math.round(rightW * 0.05);
  const s2y = y + Math.round(h * 0.56);
  const s3x = x - Math.round(leftW * 0.08);
  const s3y = y + Math.round(h * 0.8);
  const s4x = x + Math.round(rightW * 0.04);

  return (
    <g>
      {/* Full craggy mountain silhouette (shadowed right side base) */}
      <polygon
        points={`${x},${y} ${r1x},${r1y} ${r2x},${r2y} ${r3x},${r3y} ${x + rightW},${baseY} ${x - leftW},${baseY} ${l3x},${l3y} ${l2x},${l2y} ${l1x},${l1y}`}
        fill={shadowColor}
      />

      {/* Mid-tone faceted left slope bounded by natural winding spine */}
      <polygon
        points={`${x},${y} ${s1x},${s1y} ${s2x},${s2y} ${s3x},${s3y} ${s4x},${baseY} ${x - leftW},${baseY} ${l3x},${l3y} ${l2x},${l2y} ${l1x},${l1y}`}
        fill={midColor}
      />

      {/* Crisp moonlit / sunlit upper-left ridge facet */}
      <polygon
        points={`${x},${y} ${s1x},${s1y} ${x - Math.round(leftW * 0.22)},${y + Math.round(h * 0.46)} ${l2x},${l2y} ${l1x},${l1y}`}
        fill={litColor}
        opacity="0.72"
      />
      {/* Lower-left rocky shoulder highlight */}
      <polygon
        points={`${l2x},${l2y} ${x - Math.round(leftW * 0.34)},${y + Math.round(h * 0.66)} ${x - Math.round(leftW * 0.52)},${baseY} ${x - leftW},${baseY} ${l3x},${l3y}`}
        fill={litColor}
        opacity="0.38"
      />

      {/* Subtle rock buttress catch-light on upper-right shoulder */}
      <polygon
        points={`${r1x},${r1y} ${r2x},${r2y} ${x + Math.round(rightW * 0.28)},${y + Math.round(h * 0.6)} ${s2x},${s2y}`}
        fill={midColor}
        opacity="0.32"
      />

      {/* Optional Snow / Frost / Crystal Cap following ridge contour */}
      {capHeight > 0 && capLit && capShadow && (
        <g>
          <polygon
            points={`${x},${y} ${x + Math.round((rightW * capHeight) / h)},${y + capHeight} ${x + Math.round(rightW * 0.1)},${y + Math.round(capHeight * 0.72)} ${s1x},${Math.min(y + capHeight + 4, s1y)} ${x - Math.round(leftW * 0.16)},${y + Math.round(capHeight * 0.82)} ${x - Math.round((leftW * capHeight) / h)},${y + capHeight}`}
            fill={capShadow}
          />
          <polygon
            points={`${x},${y} ${s1x},${Math.min(y + capHeight + 3, s1y)} ${x - Math.round(leftW * 0.16)},${y + Math.round(capHeight * 0.82)} ${x - Math.round((leftW * capHeight) / h)},${y + capHeight}`}
            fill={capLit}
          />
        </g>
      )}

      {/* Optional Molten Lava Fissure descending peak */}
      {showLavaVein && (
        <g>
          <rect x={x - 2} y={y + 2} width="5" height="3" fill="#f97316" />
          <rect x={x - 1} y={y + 3} width="3" height="2" fill="#fef08a" />
          <path
            d={`M${x} ${y + 5} L${x + 3} ${y + 18} L${x - 2} ${y + 34} L${x + 4} ${y + 52} L${x + 1} ${baseY - 6}`}
            stroke="#ea580c"
            strokeWidth="3"
            fill="none"
          />
          <path
            d={`M${x} ${y + 5} L${x + 3} ${y + 18} L${x - 2} ${y + 34} L${x + 4} ${y + 52} L${x + 1} ${baseY - 6}`}
            stroke="#fde047"
            strokeWidth="1"
            fill="none"
          />
        </g>
      )}
    </g>
  );
};

export const PixelMountainPeak: React.FC<{
  peak: MountainPeak;
  litColor: string;
  midColor: string;
  shadowColor: string;
  capLit?: string;
  capShadow?: string;
  lavaVein?: boolean;
}> = (props) => {
  const { peak } = props;
  const crossesLeft = peak.x - peak.leftW < 0;
  const crossesRight = peak.x + peak.rightW > 640;

  return (
    <>
      <SingleMountainPeak {...props} offsetX={0} />
      {crossesLeft && <SingleMountainPeak {...props} offsetX={640} />}
      {crossesRight && <SingleMountainPeak {...props} offsetX={-640} />}
    </>
  );
};

/** Atmospheric horizontal pixel mist band to separate parallax depth planes */
export const PixelMistBand: React.FC<{
  y: number;
  height?: number;
  color: string;
  opacity?: number | string;
  width?: number;
}> = ({ y, height = 14, color, opacity = 0.28, width = 640 }) => (
  <g fill={color} opacity={opacity}>
    <rect x="0" y={y + 4} width={width} height={height} />
    {Array.from({ length: Math.ceil(width / 16) }).map((_, i) => (
      <React.Fragment key={i}>
        <rect x={i * 16} y={y + (i % 2 === 0 ? 2 : 3)} width="10" height="2" />
        <rect x={i * 16 + 6} y={y} width="6" height="2" opacity="0.6" />
      </React.Fragment>
    ))}
  </g>
);
