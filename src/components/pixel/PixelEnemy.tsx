import React, { useId } from 'react';
import { Enemy } from '../../types/game';
import { PixelLayer } from './sprites/pixelUtils';
import { COMMON_ENEMY_SPRITES, CommonSpriteKey } from './sprites/commonEnemySprites';
import { BOSS_ENEMY_SPRITES, BossSpriteKey } from './sprites/bossEnemySprites';

interface PixelEnemyProps {
  enemy: Enemy;
  state: 'idle' | 'attack' | 'block' | 'ultimate' | 'hurt' | 'defeated';
  size?: number;
  className?: string;
}

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

  const isBoss = enemy.type === 'boss';
  const effectiveSize = size || (isBoss ? 150 : 110);
  const { spriteType } = enemy;
  const useBossGrid = isBossSprite(spriteType);
  const vb = useBossGrid ? 44 : 36;

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
  }

  const shadowCy = useBossGrid ? 40.5 : 33;
  const shadowCx = useBossGrid ? 22 : 18;

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
        </defs>

        {/* Ground Shadow */}
        <ellipse
          cx={shadowCx}
          cy={shadowCy}
          rx={useBossGrid ? 16 : 11}
          ry={useBossGrid ? 3 : 2.3}
          fill="#000000"
          opacity="0.5"
        />

        {/* Abyssal Ultimate Aura */}
        {state === 'ultimate' && (
          <g>
            <circle cx={shadowCx} cy={shadowCx} r={useBossGrid ? 21 : 17} fill={`url(#${abyssGlowId})`} />
            <circle
              cx={shadowCx}
              cy={shadowCx}
              r={useBossGrid ? 18 : 14}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="1.2"
              strokeDasharray="3,2"
            />
            <rect x={shadowCx - 1} y={0} width="2" height="5" fill="#f43f5e" />
            <rect x={1} y={shadowCx - 4} width="4" height="2" fill="#a855f7" />
            <rect x={vb - 5} y={shadowCx - 4} width="4" height="2" fill="#a855f7" />
            <path
              d={`M${shadowCx},2 C${shadowCx - 16},8 ${shadowCx - 22},24 ${shadowCx - 12},${vb - 4}`}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="4"
              strokeLinecap="square"
              className="animate-[slashArc_0.7s_ease-out_forwards]"
            />
          </g>
        )}

        {/* Crisp Dan-the-Man Pixel Art Sprite */}
        <PixelLayer rects={spriteRects} />

        {/* Enemy / Boss Active Block Shield & Deflection Ward */}
        {state === 'block' && (
          <g transform={`translate(${useBossGrid ? 6 : 5}, ${useBossGrid ? 23 : 19})`}>
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
    </div>
  );
};
