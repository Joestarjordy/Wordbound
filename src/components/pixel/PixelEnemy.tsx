import React, { useId } from 'react';
import { Enemy, EnemyAnimState } from '../../types/game';
import { PixelLayer } from './sprites/pixelUtils';
import { COMMON_ENEMY_SPRITES, CommonSpriteKey } from './sprites/commonEnemySprites';
import { BOSS_ENEMY_SPRITES, BossSpriteKey } from './sprites/bossEnemySprites';

interface PixelEnemyProps {
  enemy: Enemy;
  state: EnemyAnimState;
  size?: number;
  className?: string;
}

const BURN_FLAMES = [
  { x: 0.22, h: 0.34, delay: '0s', outer: '#dc2626', mid: '#f97316', core: '#fef08a' },
  { x: 0.48, h: 0.44, delay: '0.08s', outer: '#b91c1c', mid: '#fb923c', core: '#ffffff' },
  { x: 0.72, h: 0.32, delay: '0.16s', outer: '#dc2626', mid: '#f97316', core: '#fef08a' },
  { x: 0.36, h: 0.28, delay: '0.22s', outer: '#ea580c', mid: '#fbbf24', core: '#fef08a' },
] as const;

const FROST_SHARDS = [
  { x: 0.16, y: 0.24, fx: '-14px', fy: '-16px', fx2: '-22px', fy2: '-24px', delay: '0s' },
  { x: 0.82, y: 0.22, fx: '16px', fy: '-14px', fx2: '24px', fy2: '-22px', delay: '0.06s' },
  { x: 0.14, y: 0.68, fx: '-16px', fy: '10px', fx2: '-24px', fy2: '18px', delay: '0.12s' },
  { x: 0.84, y: 0.66, fx: '15px', fy: '12px', fx2: '24px', fy2: '20px', delay: '0.16s' },
  { x: 0.5, y: 0.12, fx: '4px', fy: '-18px', fx2: '8px', fy2: '-28px', delay: '0.1s' },
] as const;

function isBossSprite(spriteType: Enemy['spriteType']): spriteType is BossSpriteKey {
  return spriteType in BOSS_ENEMY_SPRITES;
}

export const PixelEnemy: React.FC<PixelEnemyProps> = ({
  enemy,
  state,
  size,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const abyssGlowId = `enemyAbyssGlow-${uid}`;
  const burnFilterId = `enemyBurnTint-${uid}`;
  const frostFilterId = `enemyFrostTint-${uid}`;

  const isBoss = enemy.type === 'boss';
  const effectiveSize = size || (isBoss ? 150 : 110);
  const { spriteType } = enemy;
  const useBossGrid = isBossSprite(spriteType);
  const vb = useBossGrid ? 64 : 48;

  const spriteRects = isBossSprite(spriteType)
    ? BOSS_ENEMY_SPRITES[spriteType]
    : COMMON_ENEMY_SPRITES[spriteType as CommonSpriteKey];

  let animClass = '';
  if (state === 'idle') {
    animClass = isBoss
      ? 'animate-[bossFloat_3s_ease-in-out_infinite]'
      : 'animate-[enemyFloat_2.4s_ease-in-out_infinite]';
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
  } else if (state === 'burned') {
    animClass = 'animate-[enemyBurnDeath_0.95s_ease-out_forwards]';
  } else if (state === 'frozen') {
    animClass = 'animate-[enemyFreezeDeath_0.95s_ease-out_forwards]';
  }

  const shadowCy = useBossGrid ? 59.5 : 44.5;
  const shadowCx = useBossGrid ? 32 : 24;

  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${animClass} ${className}`}
      style={{ width: effectiveSize, height: effectiveSize }}
      aria-label={`${enemy.name} (${state})`}
    >
      <svg
        viewBox={`0 0 ${vb} ${vb}`}
        width="100%"
        height="100%"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_12px_rgba(0,0,0,0.75)]"
        style={{ shapeRendering: 'crispEdges' }}
      >
        <defs>
          <radialGradient id={abyssGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#9333ea" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
          <filter id={burnFilterId}>
            <feColorMatrix
              type="matrix"
              values="0.55 0.35 0.1 0 0.08  0.14 0.12 0.04 0 0  0.03 0.03 0.03 0 0  0 0 0 1 0"
            />
          </filter>
          <filter id={frostFilterId}>
            <feColorMatrix
              type="matrix"
              values="0.35 0.35 0.25 0 0.12  0.4 0.55 0.45 0 0.32  0.55 0.75 0.95 0 0.45  0 0 0 1 0"
            />
          </filter>
        </defs>

        {/* Ground Shadow */}
        <ellipse
          cx={shadowCx}
          cy={shadowCy}
          rx={useBossGrid ? 22 : 14}
          ry={useBossGrid ? 3.8 : 2.8}
          fill={state === 'frozen' ? '#0284c7' : state === 'burned' ? '#7c2d12' : '#000000'}
          opacity="0.55"
        />

        {/* Abyssal Ultimate Aura */}
        {state === 'ultimate' && (
          <g>
            <circle cx={shadowCx} cy={shadowCx} r={useBossGrid ? 30 : 22} fill={`url(#${abyssGlowId})`} />
            <circle
              cx={shadowCx}
              cy={shadowCx}
              r={useBossGrid ? 26 : 19}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.5"
              strokeDasharray="4,3"
            />
            <rect x={shadowCx - 1} y={0} width="2" height="7" fill="#f43f5e" />
            <rect x={1} y={shadowCx - 5} width="5" height="2" fill="#a855f7" />
            <rect x={vb - 6} y={shadowCx - 5} width="5" height="2" fill="#a855f7" />
            <path
              d={`M${shadowCx},2 C${shadowCx - 22},12 ${shadowCx - 30},34 ${shadowCx - 16},${vb - 4}`}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="5"
              strokeLinecap="square"
              className="animate-[slashArc_0.7s_ease-out_forwards]"
            />
          </g>
        )}

        {/* Crisp Dan-the-Man Pixel Art Sprite (charred on burn, glacial cyan on freeze) */}
        <g
          filter={
            state === 'burned'
              ? `url(#${burnFilterId})`
              : state === 'frozen'
              ? `url(#${frostFilterId})`
              : undefined
          }
        >
          <PixelLayer rects={spriteRects} />
        </g>

        {/* Burned Death Overlay: Engulfing Pixel Flames & Rising Ash Embers */}
        {state === 'burned' && (
          <g>
            {BURN_FLAMES.map((f, idx) => {
              const fx = Math.round(vb * f.x);
              const fy = Math.round(vb * 0.78);
              const fh = Math.round(vb * f.h);
              return (
                <g
                  key={idx}
                  className="animate-[flameFlicker_0.45s_ease-in-out_infinite]"
                  style={{ animationDelay: f.delay, transformOrigin: `${fx}px ${fy}px` }}
                >
                  <polygon
                    points={`${fx - 5},${fy} ${fx - 3},${fy - fh * 0.6} ${fx},${fy - fh} ${fx + 4},${fy - fh * 0.55} ${fx + 5},${fy}`}
                    fill={f.outer}
                  />
                  <polygon
                    points={`${fx - 3},${fy} ${fx - 1},${fy - fh * 0.45} ${fx},${fy - fh * 0.78} ${fx + 2},${fy - fh * 0.4} ${fx + 3},${fy}`}
                    fill={f.mid}
                  />
                  <rect x={fx - 1} y={fy - fh * 0.45} width="2" height={Math.max(3, fh * 0.4)} fill={f.core} />
                </g>
              );
            })}
            {/* Scorched Glowing Ember Sparks */}
            <rect x={Math.round(vb * 0.28)} y={Math.round(vb * 0.25)} width="2" height="2" fill="#fef08a" />
            <rect x={Math.round(vb * 0.64)} y={Math.round(vb * 0.34)} width="2" height="2" fill="#fb923c" />
            <rect x={Math.round(vb * 0.45)} y={Math.round(vb * 0.16)} width="2" height="2" fill="#ffffff" />
          </g>
        )}

        {/* Frozen Death Overlay: Jagged Crystalline Ice Block Encasement & Frost Shards */}
        {state === 'frozen' && (
          <g
            className="animate-[iceCrystalPop_0.9s_ease-out_forwards]"
            style={{ transformOrigin: `${shadowCx}px ${vb * 0.55}px` }}
          >
            {/* Outer Ice Prison Facet */}
            <polygon
              points={`${vb * 0.18},${vb * 0.9} ${vb * 0.14},${vb * 0.36} ${vb * 0.3},${vb * 0.12} ${vb * 0.68},${vb * 0.1} ${vb * 0.86},${vb * 0.34} ${vb * 0.82},${vb * 0.9}`}
              fill="rgba(56,189,248,0.42)"
              stroke="#0d0a18"
              strokeWidth="1.4"
            />
            {/* Inner Ice Edge Rim */}
            <polygon
              points={`${vb * 0.22},${vb * 0.86} ${vb * 0.18},${vb * 0.38} ${vb * 0.32},${vb * 0.16} ${vb * 0.66},${vb * 0.14} ${vb * 0.82},${vb * 0.36} ${vb * 0.78},${vb * 0.86}`}
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="1.2"
            />
            {/* Diagonal Specular Ice Reflection Streaks */}
            <polygon
              points={`${vb * 0.25},${vb * 0.26} ${vb * 0.35},${vb * 0.2} ${vb * 0.28},${vb * 0.68} ${vb * 0.22},${vb * 0.62}`}
              fill="rgba(255,255,255,0.5)"
            />
            <polygon
              points={`${vb * 0.56},${vb * 0.2} ${vb * 0.64},${vb * 0.18} ${vb * 0.44},${vb * 0.78} ${vb * 0.38},${vb * 0.74}`}
              fill="rgba(224,242,254,0.35)"
            />
            {/* Jagged Frost Spikes at Base */}
            <polygon
              points={`${vb * 0.12},${vb * 0.92} ${vb * 0.2},${vb * 0.72} ${vb * 0.28},${vb * 0.92}`}
              fill="#7dd3fc"
              stroke="#0d0a18"
              strokeWidth="1"
            />
            <polygon
              points={`${vb * 0.72},${vb * 0.92} ${vb * 0.8},${vb * 0.7} ${vb * 0.88},${vb * 0.92}`}
              fill="#bae6fd"
              stroke="#0d0a18"
              strokeWidth="1"
            />
          </g>
        )}

        {/* Enemy / Boss Active Block Shield & Deflection Ward */}
        {state === 'block' && (
          <g transform={`translate(${useBossGrid ? 9 : 7}, ${useBossGrid ? 34 : 26}) scale(${useBossGrid ? 1.45 : 1.25})`}>
            <g className="animate-[shieldWardPop_0.45s_ease-out_forwards]">
              <path
                d="M2,-14 C-7,-7 -7,7 2,14"
                fill="none"
                stroke={isBoss ? '#f43f5e' : '#38bdf8'}
                strokeWidth="2.5"
                strokeLinecap="square"
              />
              <path
                d="M-1,-11 C-9,-5 -9,5 -1,11"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
              {/* Pixel Tower Shield */}
              <polygon
                points="-1,-9 7,-9 7,3 3,10 -1,3"
                fill={isBoss ? '#4c0519' : '#1e293b'}
                stroke={isBoss ? '#fb7185' : '#7dd3fc'}
                strokeWidth="1.5"
              />
              <polygon
                points="3,-5 5,-1 3,4 1,-1"
                fill={isBoss ? '#facc15' : '#38bdf8'}
              />
              <rect x="-7" y="-8" width="2" height="2" fill="#fef08a" />
              <rect x="-9" y="0" width="2" height="2" fill="#ffffff" />
              <rect x="-6" y="7" width="2" height="2" fill="#38bdf8" />
            </g>
          </g>
        )}
      </svg>

      {/* Detached Frost Shard Sparkles around Frozen Enemy */}
      {state === 'frozen' && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {FROST_SHARDS.map((s, i) => (
            <div
              key={i}
              className="fx-motion absolute w-2 h-2 bg-sky-200 border border-[#0d0a18] animate-[frostShardFloat_0.85s_ease-out_forwards]"
              style={{
                left: `${s.x * 100}%`,
                top: `${s.y * 100}%`,
                animationDelay: s.delay,
                ['--fx' as string]: s.fx,
                ['--fy' as string]: s.fy,
                ['--fx2' as string]: s.fx2,
                ['--fy2' as string]: s.fy2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
