import React from 'react';
import { EnemySpellConfig } from '../../data/enemySpells';

interface EnemySpellFxProps {
  spell: EnemySpellConfig;
  enemySize: number;
}

const CAST_SPARKS = [
  { x: -18, y: -18, size: 5 },
  { x: -24, y: 14, size: 4 },
  { x: -10, y: -26, size: 4 },
  { x: -14, y: 24, size: 5 },
] as const;

export const EnemySpellFx: React.FC<EnemySpellFxProps> = ({ spell, enemySize }) => {
  const projSize = spell.isBossScale ? 64 : 46;
  const bottomOffset = Math.round(enemySize * 0.42);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-25"
      aria-hidden="true"
    >
      {/* Muzzle Flash & Casting Sparks at Caster's Front */}
      <div
        className="absolute -left-2"
        style={{ bottom: bottomOffset }}
      >
        <div className="relative w-0 h-0">
          <div
            className="fx-motion absolute -left-[22px] -top-[22px] w-[44px] h-[44px] border-2 animate-[spellChargePop_0.42s_ease-out_forwards]"
            style={{ borderColor: spell.secondary }}
          />
          {CAST_SPARKS.map((s, idx) => (
            <div
              key={idx}
              className="fx-motion absolute border border-[#0d0a18] animate-[sparkFly_0.38s_ease-out_forwards]"
              style={{
                width: s.size,
                height: s.size,
                backgroundColor: idx % 2 === 0 ? spell.core : spell.secondary,
                ['--sx' as string]: `${s.x}px`,
                ['--sy' as string]: `${s.y}px`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Flying Pixel-Art Spell Projectile (Enemy -> Knight) */}
      <div
        className="fx-motion absolute -left-6 animate-[spellFlyLeft_0.36s_cubic-bezier(0.2,0.8,0.3,1)_forwards]"
        style={{
          bottom: bottomOffset - Math.round(projSize * 0.45),
          width: projSize,
          height: projSize,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          shapeRendering="crispEdges"
          className="overflow-visible"
        >
          {spell.shape === 'fireball' && (
            <g>
              {/* Blazing Pixel Fireball Comet */}
              <path
                d="M4 9 H8 V7 H14 V9 H22 V11 H19 V13 H23 V15 H16 V17 H8 V15 H4 Z"
                fill="#0d0a18"
              />
              <path
                d="M5 10 H9 V8 H15 V10 H20 V12 H17 V14 H20 V15 H15 V16 H9 V14 H5 Z"
                fill={spell.primary}
              />
              <rect x="6" y="10" width="9" height="4" fill={spell.secondary} />
              <rect x="7" y="11" width="5" height="2" fill={spell.core} />
              <rect x="20" y="9" width="2" height="2" fill={spell.secondary} />
              <rect x="22" y="13" width="2" height="2" fill={spell.core} />
            </g>
          )}

          {spell.shape === 'orb' && (
            <g>
              {/* Swirling Arcane / Void Rune Sphere */}
              <rect x="7" y="5" width="10" height="14" fill="#0d0a18" />
              <rect x="5" y="7" width="14" height="10" fill="#0d0a18" />
              <rect x="8" y="6" width="8" height="12" fill={spell.primary} />
              <rect x="6" y="8" width="12" height="8" fill={spell.primary} />
              <rect x="8" y="8" width="8" height="8" fill={spell.secondary} />
              <rect x="10" y="10" width="4" height="4" fill={spell.core} />
              {/* Trailing Void Motes */}
              <rect x="19" y="7" width="3" height="2" fill={spell.secondary} />
              <rect x="21" y="12" width="3" height="2" fill={spell.core} />
              <rect x="18" y="16" width="3" height="2" fill={spell.primary} />
            </g>
          )}

          {spell.shape === 'bolt' && (
            <g>
              {/* Jagged Stepped Runic / Astral Lightning Lance */}
              <polygon
                points="1,12 8,7 10,10 16,6 17,10 23,9 18,15 16,13 10,17 9,14"
                fill={spell.primary}
                stroke="#0d0a18"
                strokeWidth="1.4"
              />
              <polygon
                points="3,12 9,9 11,11 16,8 17,11 21,11 16,14 14,12 9,15"
                fill={spell.secondary}
              />
              <rect x="5" y="11" width="8" height="2" fill={spell.core} />
              <rect x="14" y="10" width="5" height="2" fill={spell.core} />
            </g>
          )}

          {spell.shape === 'spores' && (
            <g>
              {/* Cluster of Toxic / Corrosive / Nature Orbs */}
              <rect x="3" y="9" width="8" height="8" fill="#0d0a18" />
              <rect x="4" y="10" width="6" height="6" fill={spell.primary} />
              <rect x="5" y="11" width="4" height="4" fill={spell.secondary} />
              <rect x="6" y="12" width="2" height="2" fill={spell.core} />

              <rect x="12" y="5" width="7" height="7" fill="#0d0a18" />
              <rect x="13" y="6" width="5" height="5" fill={spell.primary} />
              <rect x="14" y="7" width="3" height="3" fill={spell.secondary} />
              <rect x="15" y="7" width="1" height="1" fill={spell.core} />

              <rect x="13" y="13" width="6" height="6" fill="#0d0a18" />
              <rect x="14" y="14" width="4" height="4" fill={spell.primary} />
              <rect x="15" y="15" width="2" height="2" fill={spell.core} />

              <rect x="20" y="10" width="2" height="2" fill={spell.secondary} />
            </g>
          )}

          {spell.shape === 'wisp' && (
            <g>
              {/* Eerie Necrotic Spectral Skull-Flame Wisp */}
              <path
                d="M4 8 H12 V10 H21 V12 H17 V14 H22 V16 H12 V18 H4 V15 H2 V11 H4 Z"
                fill="#0d0a18"
              />
              <path
                d="M5 9 H12 V11 H19 V12 H15 V14 H19 V15 H12 V17 H5 V14 H3 V11 H5 Z"
                fill={spell.primary}
              />
              <rect x="5" y="10" width="7" height="5" fill={spell.secondary} />
              <rect x="6" y="11" width="2" height="2" fill="#0d0a18" />
              <rect x="9" y="11" width="2" height="2" fill="#0d0a18" />
              <rect x="6" y="11" width="1" height="1" fill={spell.core} />
              <rect x="9" y="11" width="1" height="1" fill={spell.core} />
              <rect x="13" y="12" width="5" height="2" fill={spell.core} />
            </g>
          )}

          {spell.shape === 'wave' && (
            <g>
              {/* Sweeping Crescent Dread Runeblade Energy Wave */}
              <path
                d="M15 2 H9 V5 H5 V9 H3 V15 H5 V19 H9 V22 H15 V19 H11 V16 H9 V8 H11 V5 H15 Z"
                fill="#0d0a18"
              />
              <path
                d="M13 3 H9 V6 H6 V10 H5 V14 H6 V18 H9 V21 H13 V18 H10 V15 H8 V9 H10 V6 H13 Z"
                fill={spell.primary}
              />
              <path
                d="M11 4 H9 V7 H7 V17 H9 V20 H11 V17 H9 V7 H11 Z"
                fill={spell.secondary}
              />
              <rect x="7" y="9" width="2" height="6" fill={spell.core} />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
