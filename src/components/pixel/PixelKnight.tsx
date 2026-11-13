import React, { useId } from 'react';
import { CharacterGender } from '../../types/game';
import { compilePixelGrid, CompiledRect, PixelLayer } from './sprites/pixelUtils';

interface PixelKnightProps {
  gender: CharacterGender;
  state: 'walk' | 'idle' | 'attack' | 'ultimate' | 'hurt' | 'victory' | 'defeat';
  size?: number;
  className?: string;
}

const OUTLINE = '#0d0a18';

// --- Shared Palettes ---
const MALE_PALETTE: Record<string, string> = {
  s: '#f1f5f9', // bright steel highlight
  a: '#94a3b8', // armor base silver
  d: '#475569', // armor mid shadow
  v: '#1e293b', // deep steel shadow
  c: '#3b82f6', // royal blue cape/crest base
  C: '#93c5fd', // royal blue highlight
  B: '#1d4ed8', // royal blue shadow
  t: '#fbbf24', // gold trim/buckle
  T: '#d97706', // gold shadow
  l: '#78350f', // leather belt/straps
  L: '#451a03', // leather dark
  f: '#fbd3b0', // skin highlight
  F: '#e5a97c', // skin shadow
  w: '#ffffff', // eye white / glint
  e: '#0284c7', // heroic eye iris
  k: '#0d0a18', // ink dark crease / brow
};

const FEMALE_PALETTE: Record<string, string> = {
  s: '#ffffff', // pearl steel highlight
  a: '#cbd5e1', // armor base pearl silver
  d: '#64748b', // armor mid shadow
  v: '#334155', // deep steel shadow
  c: '#ef476f', // crimson cloak/plume base
  C: '#fda4af', // crimson highlight
  B: '#be123c', // crimson shadow
  t: '#ffd166', // gold filigree highlight
  T: '#d97706', // gold shadow
  h: '#fbbf24', // golden hair highlight
  H: '#d97706', // hair mid
  y: '#92400e', // hair shadow
  l: '#78350f', // leather belt
  L: '#451a03', // leather dark
  f: '#fde2cc', // skin highlight
  F: '#eab58f', // skin shadow
  w: '#ffffff', // eye white / glint
  e: '#0d9488', // emerald-teal eye iris
  k: '#0d0a18', // ink dark crease / brow
};

// --- Cape Layers ---
function buildCapeSprites(p: Record<string, string>) {
  return {
    idle: compilePixelGrid(
      [
        '.....CCCcc',
        '....CCcccB',
        '...CCccBBB',
        '...CccBBBB',
        '..CccBBBB.',
        '..ccBBBB..',
        '.ccBBBB...',
        '.cBBBB....',
        '.BBBB.....',
        '..BB......',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 4, offsetY: 15 }
    ),
    walk: compilePixelGrid(
      [
        '......CCCcc',
        '....CCCcccB',
        '..CCCcccBBB',
        '.CCcccBBBB.',
        'CCccBBBB...',
        'ccBBBB.....',
        '.BBBB......',
        '..BB.......',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 1, offsetY: 15 }
    ),
    action: compilePixelGrid(
      [
        '.......CCCcc',
        '....CCCCcccB',
        '..CCCCcccBBB',
        'CCCcccBBBB..',
        '.ccBBBB.....',
        '..BBBB......',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 0, offsetY: 15 }
    ),
  };
}

// --- Boots & Greaves ---
function buildLegSprites(p: Record<string, string>) {
  return {
    left: compilePixelGrid(
      [
        '.dad.',
        '.sad.',
        '.dad.',
        '.dvd.',
        'sadd.',
        'aaddd',
        'ddddd',
        'vvvvv',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 14, offsetY: 26 }
    ),
    right: compilePixelGrid(
      [
        '.sad..',
        '.sad..',
        '.dad..',
        '.dvd..',
        'saadd.',
        'aaaddd',
        'dddddd',
        'vvvvvv',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 21, offsetY: 26 }
    ),
    kneel: compilePixelGrid(
      [
        '...sad..sad..',
        '...dad..aad..',
        '..saadd.dddd.',
        'vvvddd..vvvv.',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 12, offsetY: 30 }
    ),
  };
}

// --- Torso Breastplate ---
function buildTorsoSprite(p: Record<string, string>): CompiledRect[] {
  return compilePixelGrid(
    [
      '..ssaaaaaaas..',
      '.ssaaatttaaad.',
      '.saaaatTtaadd.',
      '.aaaattttaddd.',
      '.daaaatTtaadd.',
      '..dddddddddd..',
      '..llllTTllll..',
      '..LLLLtTLLLL..',
      '...ccBBBBcc...',
      '...cBBBBBBc...',
    ],
    p,
    { outlineColor: OUTLINE, offsetX: 13, offsetY: 16 }
  );
}

// --- Expressive Dan-the-Man Inspired Heads ---
function buildHeadSprites(p: Record<string, string>, isFemale: boolean) {
  if (isFemale) {
    return {
      normal: compilePixelGrid(
        [
          '.........ttt.......',
          '........tCCct......',
          '......sssstttss....',
          '.....ssaaaaaaaaas..',
          '..hhh.sattttttass..',
          '.hhHHsaakffffkaaas.',
          'hhHHyaakwfkffwkfaad',
          'hHHy..akwfkffwkfadd',
          '.Hy...akffFFFFffadd',
          '.y....aaffkkkkffadd',
          '......ddffffffffddd',
          '.......ddddddddddd.',
        ],
        p,
        { outlineColor: OUTLINE, offsetX: 9, offsetY: 4 }
      ),
      hurt: compilePixelGrid(
        [
          '.........ttt.......',
          '........tCCct......',
          '......sssstttss....',
          '.....ssaaaaaaaaas..',
          '..hhh.sattttttass..',
          '.hhHHsaakffffkaaas.',
          'hhHHyaakkkfkkfkfaad',
          'hHHy..akffFFFFffadd',
          '.Hy...akfFkkkkFfadd',
          '.y....ddffffffffddd',
          '.......ddddddddddd.',
        ],
        p,
        { outlineColor: OUTLINE, offsetX: 9, offsetY: 5 }
      ),
    };
  }

  return {
    normal: compilePixelGrid(
      [
        '........CCCCcc.....',
        '.......CCcccBBB....',
        '.....sssssssssss...',
        '....ssaaaaaaaaaas..',
        '.CCCsaatttttttaas..',
        'CCccsaakfffffkaaas.',
        '.BBB.aakwfkkfwkfaad',
        '.....aakwfkkfwkfadd',
        '.....aakffFFFFffadd',
        '.....ddaffkkkkffddd',
        '......dddddddddddd.',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 9, offsetY: 5 }
    ),
    hurt: compilePixelGrid(
      [
        '........CCCCcc.....',
        '.......CCcccBBB....',
        '.....sssssssssss...',
        '....ssaaaaaaaaaas..',
        '.CCCsaatttttttaas..',
        'CCccsaakfffffkaaas.',
        '.BBB.aakkfkffkkfaad',
        '.....aakffFFFFffadd',
        '.....aafFkkkkkFfadd',
        '.....ddddddddddddd.',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 9, offsetY: 6 }
    ),
  };
}

// --- Shield & Swords ---
function buildShieldSprite(p: Record<string, string>): CompiledRect[] {
  return compilePixelGrid(
    [
      '.sssssss.',
      'saaatttas',
      'saatTTtas',
      'saaatttas',
      'daaatTdad',
      '.daatdad.',
      '..dadad..',
      '...ddd...',
    ],
    p,
    { outlineColor: OUTLINE, offsetX: 9, offsetY: 18 }
  );
}

function buildSwordSprites(p: Record<string, string>) {
  return {
    idle: compilePixelGrid(
      [
        '..............www',
        '.............wsww',
        '............wssaw',
        '...........wsasw.',
        '..........wsasw..',
        '.........wsasw...',
        '........wsasw....',
        '.......wsasw.....',
        '......ttasw......',
        '.....tTttw.......',
        '...tTettt........',
        '..sslllt.........',
        '.ssallt..........',
        'saadd............',
        'dddd.............',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 25, offsetY: 5 }
    ),
    swing: compilePixelGrid(
      [
        '................www',
        '...............wsww',
        '..............wssaw',
        '.............wsasw.',
        '............wsasw..',
        '...........wsasw...',
        '..........wsasw....',
        '.........wsasw.....',
        '........wsasw......',
        '.......ttasw.......',
        '......tTttw........',
        '....tTettt.........',
        '..ssslllt..........',
        '.ssaaalt...........',
        'saadd..............',
        'dddd...............',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 25, offsetY: 3 }
    ),
    ultimateSword: compilePixelGrid(
      [
        '.................www',
        '................wcww',
        '...............wcwww',
        '..............wctcw.',
        '.............wctcw..',
        '............wctcw...',
        '...........wctcw....',
        '..........wctcw.....',
        '.........wctcw......',
        '.......ttTctw.......',
        '......tTTetw........',
        '....ttTettt.........',
        '...tTlllt...........',
        '..ssallt............',
        '.saadd..............',
        '.dddd...............',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 25, offsetY: 2 }
    ),
    victory: compilePixelGrid(
      [
        '..ww..',
        '.wsaw.',
        '.wsaw.',
        '.wsaw.',
        '.wsaw.',
        '.wsaw.',
        '.wsaw.',
        '.wsaw.',
        '.wsaw.',
        '.wsaw.',
        'ttett.',
        'tTTt..',
        '.ll...',
        'saad..',
        'dddd..',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 26, offsetY: 1 }
    ),
    defeat: compilePixelGrid(
      [
        '..tT..',
        '..ll..',
        'ttett.',
        '.wsaw.',
        '.wsaw.',
        '.wsaw.',
        '.ssad.',
      ],
      p,
      { outlineColor: OUTLINE, offsetX: 27, offsetY: 27 }
    ),
  };
}

// Pre-compile both gender sprite sets once at module load
const SPRITE_CACHE = {
  male: {
    cape: buildCapeSprites(MALE_PALETTE),
    legs: buildLegSprites(MALE_PALETTE),
    torso: buildTorsoSprite(MALE_PALETTE),
    head: buildHeadSprites(MALE_PALETTE, false),
    shield: buildShieldSprite(MALE_PALETTE),
    sword: buildSwordSprites(MALE_PALETTE),
  },
  female: {
    cape: buildCapeSprites(FEMALE_PALETTE),
    legs: buildLegSprites(FEMALE_PALETTE),
    torso: buildTorsoSprite(FEMALE_PALETTE),
    head: buildHeadSprites(FEMALE_PALETTE, true),
    shield: buildShieldSprite(FEMALE_PALETTE),
    sword: buildSwordSprites(FEMALE_PALETTE),
  },
};

export const PixelKnight: React.FC<PixelKnightProps> = ({
  gender,
  state,
  size = 120,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const victoryGlowId = `victoryGlow-${uid}`;
  const slashGradId = `slashGrad-${uid}`;

  const isFemale = gender === 'female';
  const sprites = isFemale ? SPRITE_CACHE.female : SPRITE_CACHE.male;

  let animClass = '';
  if (state === 'walk') animClass = 'animate-[knightWalk_0.6s_ease-in-out_infinite]';
  if (state === 'idle') animClass = 'animate-[knightIdle_2.4s_ease-in-out_infinite]';
  if (state === 'attack') animClass = 'animate-[knightSlash_0.65s_cubic-bezier(0.3,0,0.2,1)]';
  if (state === 'ultimate') animClass = 'animate-[knightUltimate_0.9s_cubic-bezier(0.16,1,0.3,1)]';
  if (state === 'hurt') animClass = 'animate-[knightHurt_0.35s_ease-in-out]';
  if (state === 'victory') animClass = 'animate-[knightVictory_1.5s_ease-in-out_infinite]';
  if (state === 'defeat') animClass = 'opacity-50 grayscale transition-all duration-500';

  const capeRects =
    state === 'walk'
      ? sprites.cape.walk
      : state === 'attack' || state === 'ultimate'
      ? sprites.cape.action
      : sprites.cape.idle;

  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${animClass} ${className}`}
      style={{ width: size, height: size }}
      aria-label={`${gender} Knight (${state})`}
    >
      <svg
        viewBox="0 0 40 40"
        width="100%"
        height="100%"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_12px_rgba(0,0,0,0.75)]"
        style={{ shapeRendering: 'crispEdges' }}
      >
        <defs>
          <linearGradient id={slashGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={victoryGlowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground Shadow */}
        <ellipse
          cx="20"
          cy="35"
          rx={state === 'defeat' ? 13 : 10}
          ry={state === 'defeat' ? 2.5 : 2.2}
          fill="#000000"
          opacity={state === 'walk' ? 0.45 : 0.4}
          className={state === 'walk' ? 'animate-[shadowWalk_0.6s_ease-in-out_infinite]' : ''}
          style={{ transformOrigin: '20px 35px' }}
        />

        {/* Ultimate Aura */}
        {state === 'ultimate' && (
          <g>
            <circle cx="20" cy="20" r="19" fill={`url(#${victoryGlowId})`} opacity="0.85" />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1"
              strokeDasharray="3,2"
            />
            <rect x="19" y="0" width="2" height="4" fill="#fef08a" />
            <rect x="1" y="14" width="3" height="2" fill="#38bdf8" />
            <rect x="36" y="14" width="3" height="2" fill="#38bdf8" />
          </g>
        )}

        {/* Flowing Cape */}
        {state !== 'defeat' && (
          <g
            className={state === 'walk' ? 'animate-[capeFlutter_0.5s_ease-in-out_infinite_alternate]' : ''}
            style={{ transformOrigin: '14px 16px' }}
          >
            <PixelLayer rects={capeRects} />
          </g>
        )}

        {/* Legs & Armored Sabatons */}
        {state === 'walk' ? (
          <g>
            <g
              className="animate-[legLeftWalk_0.6s_ease-in-out_infinite]"
              style={{ transformOrigin: '16px 26px' }}
            >
              <PixelLayer rects={sprites.legs.left} />
            </g>
            <g
              className="animate-[legRightWalk_0.6s_ease-in-out_infinite]"
              style={{ transformOrigin: '24px 26px' }}
            >
              <PixelLayer rects={sprites.legs.right} />
            </g>
          </g>
        ) : state === 'defeat' ? (
          <PixelLayer rects={sprites.legs.kneel} />
        ) : (
          <g>
            <PixelLayer rects={sprites.legs.left} />
            <PixelLayer rects={sprites.legs.right} />
          </g>
        )}

        {/* Torso Breastplate */}
        <g
          transform={state === 'defeat' ? 'translate(0, 4)' : undefined}
          className={state === 'walk' ? 'animate-[torsoWalk_0.6s_ease-in-out_infinite]' : ''}
          style={{ transformOrigin: '20px 22px' }}
        >
          <PixelLayer rects={sprites.torso} />
        </g>

        {/* Hero Head & Crest */}
        <g
          transform={state === 'defeat' ? 'translate(1, 5)' : undefined}
          className={state === 'walk' ? 'animate-[headBob_0.6s_ease-in-out_infinite]' : ''}
          style={{ transformOrigin: '20px 13px' }}
        >
          <PixelLayer rects={state === 'hurt' ? sprites.head.hurt : sprites.head.normal} />
        </g>

        {/* Shield (Left / Front Hip) */}
        {state !== 'defeat' && (
          <g transform={state === 'attack' ? 'translate(-2, 2) rotate(-8 13 22)' : undefined}>
            <g
              className={state === 'walk' ? 'animate-[shieldWalk_0.6s_ease-in-out_infinite]' : ''}
              style={{ transformOrigin: '13px 19px' }}
            >
              <PixelLayer rects={sprites.shield} />
            </g>
          </g>
        )}

        {/* Sword & Combat Slash FX */}
        {state === 'ultimate' ? (
          <g>
            <path
              d="M21,2 C43,4 48,20 40,37"
              fill="none"
              stroke="#fef08a"
              strokeWidth="5"
              strokeLinecap="square"
              className="animate-[slashArc_0.7s_ease-out_forwards]"
            />
            <path
              d="M24,5 C39,8 45,21 36,34"
              fill="none"
              stroke={`url(#${slashGradId})`}
              strokeWidth="3.5"
              strokeLinecap="square"
              className="animate-[slashArc_0.65s_ease-out_0.1s_forwards]"
            />
            <g
              className="animate-[swordSwing_0.75s_cubic-bezier(0.3,0,0.2,1)_forwards]"
              style={{ transformOrigin: '26px 16px' }}
            >
              <PixelLayer rects={sprites.sword.ultimateSword} />
            </g>
          </g>
        ) : state === 'attack' ? (
          <g>
            <path
              d="M23,4 C40,8 45,21 38,34"
              fill="none"
              stroke={`url(#${slashGradId})`}
              strokeWidth="3.5"
              strokeLinecap="square"
              className="animate-[slashArc_0.5s_ease-out_forwards]"
            />
            <g
              className="animate-[swordSwing_0.55s_cubic-bezier(0.3,0,0.2,1)_forwards]"
              style={{ transformOrigin: '26px 17px' }}
            >
              <PixelLayer rects={sprites.sword.swing} />
            </g>
          </g>
        ) : state === 'victory' ? (
          <g>
            <circle cx="28" cy="2" r="10" fill={`url(#${victoryGlowId})`} />
            <PixelLayer rects={sprites.sword.victory} />
            <g transform="translate(28, 1)" className="animate-spin" style={{ animationDuration: '4s' }}>
              <rect x="-4" y="-1" width="8" height="2" fill="#fef08a" />
              <rect x="-1" y="-4" width="2" height="8" fill="#fef08a" />
              <rect x="-1" y="-1" width="2" height="2" fill="#ffffff" />
            </g>
          </g>
        ) : state === 'defeat' ? (
          <PixelLayer rects={sprites.sword.defeat} />
        ) : (
          <g
            className={state === 'walk' ? 'animate-[swordWalk_0.6s_ease-in-out_infinite]' : ''}
            style={{ transformOrigin: '26px 18px' }}
          >
            <PixelLayer rects={sprites.sword.idle} />
          </g>
        )}
      </svg>
    </div>
  );
};
