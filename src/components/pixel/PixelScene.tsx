import React from 'react';
import { CharacterGender, Enemy, Stage } from '../../types/game';
import { PixelKnight } from './PixelKnight';
import { PixelEnemy } from './PixelEnemy';
import { RealmBackdrop } from './RealmBackdrop';

const SPARKS = [
  { x: 44, y: -36, size: 6, color: '#fef08a' },
  { x: -42, y: -32, size: 5, color: '#ffffff' },
  { x: 52, y: 8, size: 6, color: '#fb923c' },
  { x: -50, y: 12, size: 5, color: '#fef08a' },
  { x: 26, y: 42, size: 5, color: '#ffffff' },
  { x: -24, y: 40, size: 6, color: '#fb923c' },
  { x: 10, y: -54, size: 5, color: '#fef08a' },
  { x: -12, y: 52, size: 5, color: '#fde047' },
] as const;

const KNIGHT_HURT_SPARKS = [
  { x: -40, y: -28, size: 6, color: '#fda4af' },
  { x: 38, y: -32, size: 5, color: '#ffffff' },
  { x: -46, y: 10, size: 6, color: '#f43f5e' },
  { x: 42, y: 14, size: 5, color: '#fda4af' },
  { x: -16, y: 40, size: 5, color: '#fb7185' },
  { x: 14, y: -44, size: 5, color: '#ffffff' },
] as const;

const WALK_DUST = [
  { left: '24%', delay: '0s', dx: '-14px', dy: '-6px', dx2: '-26px', dy2: '-12px', size: 6 },
  { left: '30%', delay: '0.22s', dx: '-10px', dy: '-9px', dx2: '-20px', dy2: '-16px', size: 5 },
  { left: '20%', delay: '0.45s', dx: '-16px', dy: '-5px', dx2: '-28px', dy2: '-10px', size: 4 },
] as const;

const VICTORY_STARS = [
  { left: '-12px', bottom: '68%', delay: '0s', color: '#fde047' },
  { left: '94%', bottom: '56%', delay: '0.28s', color: '#7dd3fc' },
  { left: '14%', bottom: '86%', delay: '0.52s', color: '#fef08a' },
  { left: '78%', bottom: '80%', delay: '0.75s', color: '#fde047' },
] as const;

interface PixelSceneProps {
  stage: Stage;
  currentEncounterIndex: number;
  totalEncounters: number;
  inCombat: boolean;
  knightGender: CharacterGender;
  knightState: 'walk' | 'idle' | 'attack' | 'ultimate' | 'hurt' | 'victory' | 'defeat';
  currentEnemy: Enemy | null;
  enemyState: 'idle' | 'attack' | 'block' | 'ultimate' | 'hurt' | 'defeated';
  cutInState?: 'knight' | 'enemy' | null;
  floatingText: { id: number; text: string; color: string; isCrit?: boolean }[];
  explorationProgress: number; // 0 to 100% walking to next encounter
  knightHp?: number;
  knightMaxHp?: number;
  enemyHp?: number;
  enemyMaxHp?: number;
}

export const PixelScene: React.FC<PixelSceneProps> = ({
  stage,
  currentEncounterIndex,
  totalEncounters,
  inCombat,
  knightGender,
  knightState,
  currentEnemy,
  enemyState,
  cutInState = null,
  floatingText,
  explorationProgress,
  knightHp = 200,
  knightMaxHp = 200,
  enemyHp,
  enemyMaxHp,
}) => {
  const isBossEncounter = currentEncounterIndex === totalEncounters - 1;
  const hasShake =
    knightState === 'hurt' ||
    enemyState === 'hurt' ||
    knightState === 'ultimate' ||
    enemyState === 'ultimate';

  const knightSize = inCombat ? 118 : 148;
  const enemySize = isBossEncounter ? (inCombat ? 154 : 188) : inCombat ? 112 : 138;
  const effectiveKnightHp = knightHp;
  const effectiveKnightMaxHp = knightMaxHp;
  const effectiveEnemyHp = enemyHp ?? currentEnemy?.maxHp ?? 100;
  const effectiveEnemyMaxHp = enemyMaxHp ?? currentEnemy?.maxHp ?? 100;

  const knightHpPercent = Math.max(0, Math.min(100, (effectiveKnightHp / effectiveKnightMaxHp) * 100));
  const enemyHpPercent = Math.max(0, Math.min(100, (effectiveEnemyHp / effectiveEnemyMaxHp) * 100));

  return (
    <div
      className={`relative w-full h-full flex-1 min-h-0 overflow-hidden pixel-border select-none bg-black transition-all duration-300 ${
        hasShake ? 'animate-[screenShake_0.35s_ease-out]' : ''
      }`}
    >
      <RealmBackdrop stage={stage} inCombat={inCombat} />

      {/* Stage Header & Progress Meter */}
      <div className="absolute top-2 left-3 right-3 flex items-center justify-between text-xs z-20">
        <div className="flex items-center gap-1.5 bg-black/80 px-2.5 py-1 rounded border border-amber-400/40 backdrop-blur-xs">
          <span className="text-amber-400 font-pixel text-[9px]">
            STAGE {stage.id}
            <span className="hidden sm:inline">: {stage.name.toUpperCase()}</span>
          </span>
          {isBossEncounter && inCombat && (
            <span className="bg-red-600 text-white font-pixel text-[8px] px-1.5 py-0.2 rounded animate-pulse">
              BOSS
            </span>
          )}
        </div>

        {/* Encounter Milestones Progress */}
        <div className="flex items-center gap-1 bg-black/80 px-2.5 py-1 rounded border border-slate-700 backdrop-blur-xs">
          <span className="text-gray-400 text-[9px] mr-1 hidden sm:inline">PATH:</span>
          {Array.from({ length: totalEncounters }).map((_, idx) => {
            const isCompleted = idx < currentEncounterIndex;
            const isCurrent = idx === currentEncounterIndex;
            const isBoss = idx === totalEncounters - 1;

            return (
              <div
                key={idx}
                className={`flex items-center justify-center w-4 h-4 rounded-xs text-[8px] font-pixel transition-all ${
                  isCompleted
                    ? 'bg-emerald-600 text-white border border-emerald-400'
                    : isCurrent
                    ? 'bg-amber-500 text-black border border-white scale-110 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    : isBoss
                    ? 'bg-red-950 text-red-400 border border-red-800'
                    : 'bg-slate-800 text-gray-500 border border-slate-700'
                }`}
                title={isBoss ? 'Stage Boss' : `Encounter ${idx + 1}`}
              >
                {isBoss ? '👑' : idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Auto-runner Walking Progress Bar */}
      {!inCombat && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full border border-sky-500/40">
            <span className="text-[9px] text-sky-300 font-pixel animate-pulse">
              ⚔️ PATROLLING REALM...
            </span>
            <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-600">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-amber-400 transition-all duration-300"
                style={{ width: `${explorationProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Full-scene flashes: white on enemy hit, red on knight hit, gold/crimson on ultimate */}
      {(enemyState === 'hurt' || enemyState === 'defeated') && (
        <div
          key={`flash-e-${enemyState}`}
          className="fx-motion absolute inset-0 bg-white pointer-events-none z-20 animate-[hitFlash_0.3s_ease-out_forwards]"
        />
      )}
      {knightState === 'ultimate' && (
        <div
          key="flash-k-ult"
          className="fx-motion absolute inset-0 bg-amber-300 pointer-events-none z-20 animate-[hitFlash_0.55s_ease-out_forwards]"
        />
      )}
      {knightState === 'hurt' && (
        <div
          key="flash-k"
          className="fx-motion absolute inset-0 bg-rose-600 pointer-events-none z-20 animate-[hitFlash_0.35s_ease-out_forwards]"
        />
      )}
      {enemyState === 'ultimate' && (
        <div
          key="flash-e-ult"
          className="fx-motion absolute inset-0 bg-fuchsia-600 pointer-events-none z-20 animate-[hitFlash_0.55s_ease-out_forwards]"
        />
      )}

      {/* Characters on Stage with HP Bars and Stats ABOVE Sprites */}
      <div className="absolute inset-0 flex items-end justify-between px-3 sm:px-[8vw] pb-2 pointer-events-none z-10 max-w-5xl mx-auto w-full">
        {/* Knight Character Column */}
        <div
          className={`relative transition-all duration-500 ease-out flex flex-col items-center ${
            inCombat ? 'translate-x-0' : 'translate-x-3 sm:translate-x-6'
          }`}
        >
          {/* Knight Stats & HP Bar ABOVE Knight Sprite */}
          <div className="flex flex-col items-center gap-0.5 mb-1 bg-black/85 px-2 py-1 rounded border border-sky-400/60 shadow-[0_2px_8px_rgba(0,0,0,0.8)] min-w-[92px] sm:min-w-[120px] transition-all">
            <span className="text-sky-300 font-pixel font-bold text-[8px] sm:text-[9px] whitespace-nowrap leading-tight">
              🛡️ KNIGHT
            </span>
            {/* HP Bar */}
            <div className="w-full h-1.5 sm:h-2 bg-slate-900 rounded-xs overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-emerald-400 transition-all duration-500 shadow-[0_0_6px_rgba(56,189,248,0.6)]"
                style={{ width: `${knightHpPercent}%` }}
              />
            </div>
            <span className="text-emerald-300 font-mono text-[8px] sm:text-[9px] whitespace-nowrap leading-tight">
              HP {effectiveKnightHp}/{effectiveKnightMaxHp}
            </span>
          </div>

          <PixelKnight
            gender={knightGender}
            state={knightState}
            size={knightSize}
            className="transition-transform"
          />

          {/* Footstep Pixel Dust on Walk */}
          {knightState === 'walk' && (
            <div className="absolute inset-x-0 bottom-1 h-8 pointer-events-none z-20" aria-hidden="true">
              {WALK_DUST.map((d, i) => (
                <div
                  key={i}
                  className="fx-motion absolute bottom-0 bg-stone-200/85 border border-[#0d0a18] animate-[dustPuff_0.68s_steps(4)_infinite]"
                  style={{
                    left: d.left,
                    width: d.size,
                    height: d.size,
                    animationDelay: d.delay,
                    ['--dx' as string]: d.dx,
                    ['--dy' as string]: d.dy,
                    ['--dx2' as string]: d.dx2,
                    ['--dy2' as string]: d.dy2,
                  }}
                />
              ))}
            </div>
          )}

          {/* Attack Dash Gust & Crescent Slash Wave */}
          {knightState === 'attack' && (
            <div key="knight-attack-fx" className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
              {/* Launch Dust & Speed Streaks */}
              {WALK_DUST.map((d, i) => (
                <div
                  key={i}
                  className="fx-motion absolute bottom-1 bg-amber-100/90 border border-[#0d0a18] animate-[dustPuff_0.38s_ease-out_forwards]"
                  style={{
                    left: d.left,
                    width: d.size + 1,
                    height: d.size + 1,
                    animationDelay: `${i * 0.04}s`,
                    ['--dx' as string]: d.dx,
                    ['--dy' as string]: d.dy,
                    ['--dx2' as string]: d.dx2,
                    ['--dy2' as string]: d.dy2,
                  }}
                />
              ))}
              {/* Pixel Crescent Sword Arc */}
              <svg
                width="76"
                height="76"
                viewBox="0 0 24 24"
                shapeRendering="crispEdges"
                className="fx-motion absolute -right-8 bottom-3 overflow-visible animate-[slashCrescent_0.34s_ease-out_forwards]"
                style={{ ['--rot' as string]: '-12deg' }}
              >
                <path
                  d="M7 2 H14 V4 H17 V7 H19 V14 H17 V18 H13 V21 H9 V19 H12 V16 H14 V9 H12 V5 H7 Z"
                  fill="#0d0a18"
                />
                <path
                  d="M9 3 H13 V5 H16 V8 H17 V14 H15 V17 H12 V19 H10 V17 H13 V14 H15 V8 H13 V5 H9 Z"
                  fill="#38bdf8"
                />
                <path
                  d="M11 4 H13 V6 H15 V9 H16 V13 H14 V16 H12 V14 H14 V9 H12 V6 H11 Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          )}

          {/* Knight Hurt Impact FX */}
          {knightState === 'hurt' && (
            <div
              key="knight-hurt-fx"
              className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-25"
              style={{ bottom: knightSize * 0.48 }}
              aria-hidden="true"
            >
              <div className="relative w-0 h-0">
                <svg
                  width="82"
                  height="82"
                  viewBox="-41 -41 82 82"
                  shapeRendering="crispEdges"
                  className="fx-motion absolute -left-[41px] -top-[41px] overflow-visible animate-[impactBurst_0.42s_ease-out_forwards]"
                >
                  <polygon
                    points="0,-36 8,-12 34,-14 14,4 22,30 0,14 -22,30 -14,4 -34,-14 -8,-12"
                    fill="#f43f5e"
                    stroke="#0d0a18"
                    strokeWidth="4"
                  />
                  <polygon
                    points="0,-24 5,-8 22,-9 9,3 15,20 0,9 -15,20 -9,3 -22,-9 -5,-8"
                    fill="#ffe4e6"
                  />
                </svg>
                {[38, -38].map((rot) => (
                  <div
                    key={rot}
                    className="fx-motion absolute -left-[36px] -top-[3px] w-[72px] h-[6px] bg-rose-200 border border-[#0d0a18] animate-[slashCross_0.38s_ease-out_forwards]"
                    style={{ ['--rot' as string]: `${rot}deg` }}
                  />
                ))}
                {KNIGHT_HURT_SPARKS.map((s, i) => (
                  <div
                    key={i}
                    className="fx-motion absolute border border-[#0d0a18] animate-[sparkFly_0.48s_ease-out_forwards]"
                    style={{
                      width: s.size,
                      height: s.size,
                      backgroundColor: s.color,
                      ['--sx' as string]: `${s.x}px`,
                      ['--sy' as string]: `${s.y}px`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Knight Victory Sparkles */}
          {knightState === 'victory' && (
            <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
              {VICTORY_STARS.map((v, i) => (
                <svg
                  key={i}
                  width="14"
                  height="14"
                  viewBox="0 0 7 7"
                  shapeRendering="crispEdges"
                  className="fx-motion absolute animate-[victorySparkRise_1.15s_steps(5)_infinite]"
                  style={{ left: v.left, bottom: v.bottom, animationDelay: v.delay }}
                >
                  <rect x="3" y="0" width="1" height="7" fill={v.color} />
                  <rect x="0" y="3" width="7" height="1" fill={v.color} />
                  <rect x="2" y="2" width="3" height="3" fill="#ffffff" />
                </svg>
              ))}
            </div>
          )}

          {/* Enemy Ultimate Impact FX on the Knight */}
          {enemyState === 'ultimate' && (
            <div
              key="enemy-ult-pillar"
              className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none z-25 flex flex-col items-center"
              aria-hidden="true"
            >
              {/* Crimson Abyssal Sky Pillar */}
              <div className="fx-motion w-16 sm:w-24 h-64 bg-gradient-to-t from-rose-600 via-fuchsia-500/90 to-transparent animate-[ultimateBeam_0.8s_ease-out_forwards]" />
              <div className="fx-motion absolute bottom-0 w-6 sm:w-8 h-64 bg-gradient-to-t from-white via-rose-200 to-transparent animate-[ultimateBeam_0.65s_ease-out_forwards]" />
              {/* Stepped Pixel Shockwave Frames */}
              <div className="fx-motion absolute bottom-4 w-28 h-28 border-4 border-rose-500 animate-[pixelRingPop_0.6s_ease-out_forwards]" />
              <div className="fx-motion absolute bottom-6 w-20 h-20 border-2 border-fuchsia-300 animate-[pixelRingPop_0.48s_ease-out_forwards]" />
              {/* Multi-angle Dark-Outlined Abyssal Slashes */}
              {[35, -35, 80, -80].map((rot) => (
                <div
                  key={rot}
                  className="fx-motion absolute bottom-10 -left-[55px] w-[110px] h-[6px] bg-rose-300 border border-[#0d0a18] animate-[slashCross_0.5s_ease-out_forwards]"
                  style={{ ['--rot' as string]: `${rot}deg` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating Combat Numbers / Hit text */}
        <div className="absolute inset-x-0 top-1/4 bottom-1/3 pointer-events-none flex items-center justify-center z-20 px-2">
          {floatingText.map((item) => (
            <div
              key={item.id}
              className={`absolute font-pixel animate-[floatUp_0.9s_ease-out_forwards] text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] max-w-[90%] leading-tight ${
                item.isCrit
                  ? 'text-sm sm:text-xl font-bold text-amber-300'
                  : 'text-xs sm:text-sm font-bold'
              }`}
              style={{ color: item.color }}
            >
              {item.text}
            </div>
          ))}
        </div>

        {/* Enemy Entity Column */}
        <div
          className={`relative transition-all duration-500 ease-out flex flex-col items-center ${
            inCombat
              ? 'opacity-100 translate-x-0 scale-100'
              : 'opacity-0 translate-x-14 scale-90'
          }`}
        >
          {currentEnemy && (
            <>
              {/* Enemy Stats & HP Bar ABOVE Enemy Sprite */}
              <div
                className="flex flex-col items-center gap-0.5 mb-1 bg-black/85 px-2 py-1 rounded border shadow-[0_2px_8px_rgba(0,0,0,0.8)] min-w-[92px] max-w-[42vw] sm:max-w-[200px] sm:min-w-[120px] transition-all"
                style={{ borderColor: currentEnemy.colorTheme }}
              >
                <span
                  className="font-pixel font-bold text-[8px] sm:text-[9px] text-center leading-tight break-words"
                  style={{ color: currentEnemy.colorTheme }}
                >
                  {isBossEncounter ? '👑 ' : '⚔️ '}
                  {currentEnemy.name.toUpperCase()}
                </span>
                {/* HP Bar */}
                <div className="w-full h-1.5 sm:h-2 bg-slate-900 rounded-xs overflow-hidden border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-600 transition-all duration-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                    style={{ width: `${enemyHpPercent}%` }}
                  />
                </div>
                <span className="text-rose-300 font-mono text-[8px] sm:text-[9px] whitespace-nowrap leading-tight">
                  HP {effectiveEnemyHp}/{effectiveEnemyMaxHp}
                </span>
              </div>

              <PixelEnemy enemy={currentEnemy} state={enemyState} size={enemySize} />

              {/* Enemy Attack Dash Streak */}
              {enemyState === 'attack' && (
                <div className="absolute inset-0 pointer-events-none z-20" aria-hidden="true">
                  <div
                    className="fx-motion absolute -left-8 bottom-8 w-16 h-2 bg-rose-400 border border-[#0d0a18] animate-[enemyDashStreak_0.4s_ease-out_forwards]"
                  />
                  <div
                    className="fx-motion absolute -left-6 bottom-5 w-12 h-1.5 bg-amber-200 border border-[#0d0a18] animate-[enemyDashStreak_0.44s_ease-out_forwards]"
                  />
                </div>
              )}

              {/* Knight Ultimate Finisher FX on the Enemy */}
              {knightState === 'ultimate' && (
                <div
                  key="knight-ult-pillar"
                  className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none z-25 flex flex-col items-center"
                  aria-hidden="true"
                >
                  {/* Golden/Cyan Excalibur Sky Beam Pillar */}
                  <div className="fx-motion w-20 sm:w-28 h-64 bg-gradient-to-t from-amber-300 via-sky-300/95 to-transparent animate-[ultimateBeam_0.8s_ease-out_forwards]" />
                  <div className="fx-motion absolute bottom-0 w-8 sm:w-10 h-64 bg-gradient-to-t from-white via-amber-100 to-transparent animate-[ultimateBeam_0.68s_ease-out_forwards]" />
                  {/* Celestial Stepped Pixel Shockwave Frames */}
                  <div className="fx-motion absolute bottom-6 w-32 h-32 border-4 border-amber-300 animate-[pixelRingPop_0.65s_ease-out_forwards]" />
                  <div className="fx-motion absolute bottom-8 w-24 h-24 border-2 border-sky-300 animate-[pixelRingPop_0.5s_ease-out_forwards]" />
                  {/* Starburst Dark-Outlined Slashes */}
                  {[25, -25, 65, -65, 0].map((rot) => (
                    <div
                      key={rot}
                      className="fx-motion absolute bottom-12 -left-[60px] w-[120px] h-[6px] bg-amber-100 border border-[#0d0a18] animate-[slashCross_0.5s_ease-out_forwards]"
                      style={{ ['--rot' as string]: `${rot}deg` }}
                    />
                  ))}
                  {SPARKS.map((s, i) => (
                    <div
                      key={i}
                      className="fx-motion absolute bottom-12 border border-[#0d0a18] animate-[sparkFly_0.65s_ease-out_forwards]"
                      style={{
                        width: s.size + 1,
                        height: s.size + 1,
                        backgroundColor: i % 2 === 0 ? '#7dd3fc' : '#fde047',
                        ['--sx' as string]: `${Math.round(s.x * 1.25)}px`,
                        ['--sy' as string]: `${Math.round(s.y * 1.25)}px`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Impact FX on the enemy when hit */}
              {(enemyState === 'hurt' || enemyState === 'defeated') && (
                <div
                  key={`impact-${enemyState}`}
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20"
                  style={{ bottom: enemySize * 0.5 - 8 }}
                  aria-hidden="true"
                >
                  <div className="relative w-0 h-0">
                    {/* Expanding Stepped Pixel Shockwave */}
                    <div className="fx-motion absolute -left-[34px] -top-[34px] w-[68px] h-[68px] border-2 border-amber-200 animate-[pixelRingPop_0.42s_ease-out_forwards]" />
                    {/* Dan the Man Style Layered Comic Starburst */}
                    <svg
                      width="94"
                      height="94"
                      viewBox="-47 -47 94 94"
                      shapeRendering="crispEdges"
                      className="fx-motion absolute -left-[47px] -top-[47px] overflow-visible animate-[impactBurst_0.45s_ease-out_forwards]"
                    >
                      <polygon
                        points="0,-42 9,-13 40,-15 15,5 25,36 0,17 -25,36 -15,5 -40,-15 -9,-13"
                        fill="#f97316"
                        stroke="#0d0a18"
                        strokeWidth="4"
                      />
                      <polygon
                        points="0,-30 6,-9 28,-10 10,3 17,25 0,11 -17,25 -10,3 -28,-10 -6,-9"
                        fill="#fef08a"
                      />
                      <polygon
                        points="0,-16 4,-5 15,-5 5,2 9,14 0,6 -9,14 -5,2 -15,-5 -4,-5"
                        fill="#ffffff"
                      />
                    </svg>
                    {/* Pixel Crescent Slash Overlay */}
                    <svg
                      width="68"
                      height="68"
                      viewBox="0 0 24 24"
                      shapeRendering="crispEdges"
                      className="fx-motion absolute -left-[34px] -top-[34px] overflow-visible animate-[slashCrescent_0.38s_ease-out_forwards]"
                      style={{ ['--rot' as string]: '-20deg' }}
                    >
                      <path
                        d="M5 4 H13 V6 H17 V10 H19 V16 H16 V20 H11 V18 H14 V15 H15 V10 H12 V7 H5 Z"
                        fill="#ffffff"
                        stroke="#0d0a18"
                        strokeWidth="1"
                      />
                    </svg>
                    {[45, -45].map((rot) => (
                      <div
                        key={rot}
                        className="fx-motion absolute -left-[42px] -top-[3px] w-[84px] h-[6px] bg-white border border-[#0d0a18] animate-[slashCross_0.4s_ease-out_forwards]"
                        style={{ ['--rot' as string]: `${rot}deg` }}
                      />
                    ))}
                    {SPARKS.map((s, i) => (
                      <div
                        key={i}
                        className="fx-motion absolute border border-[#0d0a18] animate-[sparkFly_0.52s_ease-out_forwards]"
                        style={{
                          width: s.size,
                          height: s.size,
                          backgroundColor: s.color,
                          ['--sx' as string]: `${s.x}px`,
                          ['--sy' as string]: `${s.y}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Block Shield Deflection FX on the enemy when blocking Knight's attack */}
              {enemyState === 'block' && (
                <div
                  key="block-fx"
                  className="absolute left-1/4 -translate-x-1/2 pointer-events-none z-20"
                  style={{ bottom: enemySize * 0.5 - 6 }}
                  aria-hidden="true"
                >
                  <div className="relative w-0 h-0">
                    <div
                      className="fx-motion absolute -left-[30px] -top-[30px] w-[60px] h-[60px] border-2 animate-[pixelRingPop_0.42s_ease-out_forwards]"
                      style={{ borderColor: isBossEncounter ? '#fb7185' : '#38bdf8' }}
                    />
                    <svg
                      width="84"
                      height="84"
                      viewBox="-42 -42 84 84"
                      shapeRendering="crispEdges"
                      className="fx-motion absolute -left-[42px] -top-[42px] overflow-visible animate-[shieldWardPop_0.45s_ease-out_forwards]"
                    >
                      {/* Hexagonal Runic Aegis Ward */}
                      <polygon
                        points="0,-34 30,-17 30,17 0,34 -30,17 -30,-17"
                        fill={isBossEncounter ? 'rgba(244,63,94,0.28)' : 'rgba(56,189,248,0.28)'}
                        stroke="#0d0a18"
                        strokeWidth="5"
                      />
                      <polygon
                        points="0,-34 30,-17 30,17 0,34 -30,17 -30,-17"
                        fill="none"
                        stroke={isBossEncounter ? '#fb7185' : '#38bdf8'}
                        strokeWidth="2.5"
                      />
                      <polygon
                        points="0,-22 19,-11 19,11 0,22 -19,11 -19,-11"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </svg>
                    {SPARKS.slice(0, 5).map((s, i) => (
                      <div
                        key={i}
                        className="fx-motion absolute w-2 h-2 bg-sky-300 border border-[#0d0a18] animate-[sparkFly_0.45s_ease-out_forwards]"
                        style={{
                          ['--sx' as string]: `${-Math.abs(s.x)}px`,
                          ['--sy' as string]: `${s.y}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* JRPG / Anime Skill Cut-In Banner Overlay */}
      {cutInState === 'knight' && (
        <div
          key="cutin-knight"
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden bg-slate-950/75 animate-[cutInBackdrop_0.85s_ease-out_forwards]"
          aria-hidden="true"
        >
          <div className="relative w-[112%] h-24 sm:h-28 bg-gradient-to-r from-sky-950 via-sky-600 to-amber-500 border-y-4 border-amber-200 flex items-center justify-between px-6 sm:px-14 overflow-hidden animate-[cutInSlideKnight_0.85s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            {/* Speed lines */}
            <div className="absolute inset-0 opacity-35 pointer-events-none animate-[speedLinesMove_0.35s_linear_infinite]">
              <div className="w-[160%] h-1.5 bg-white/80 my-2.5" />
              <div className="w-[160%] h-0.5 bg-amber-200 my-4 translate-x-8" />
              <div className="w-[160%] h-2 bg-sky-200/70 my-3 -translate-x-6" />
              <div className="w-[160%] h-1 bg-white/90 my-3.5 translate-x-4" />
            </div>

            {/* Close-up Knight Portrait */}
            <div className="relative z-10 flex items-center gap-3 sm:gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-sky-950/90 border-2 border-amber-300 flex items-center justify-center overflow-hidden shrink-0">
                <PixelKnight
                  gender={knightGender}
                  state="attack"
                  size={86}
                  className="scale-125 translate-y-2"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-pixel text-[8px] sm:text-[10px] text-amber-200 tracking-widest uppercase">
                  ⚡ FIRST-TRY PERFECT CRACK! ⚡
                </span>
                <span className="font-pixel text-sm sm:text-xl md:text-2xl text-white font-bold tracking-wider drop-shadow-[0_2px_0_#0284c7]">
                  AETHERIAL EXCALIBUR!
                </span>
                <span className="font-mono text-[9px] sm:text-xs text-sky-100 font-bold">
                  ULTIMATE SKILL UNLEASHED — INSTANT OBLITERATION
                </span>
              </div>
            </div>

            <div className="hidden sm:flex items-center justify-center text-3xl font-pixel text-amber-200 opacity-80">
              ✦⚔️✦
            </div>
          </div>
        </div>
      )}

      {cutInState === 'enemy' && currentEnemy && (
        <div
          key="cutin-enemy"
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden bg-black/80 animate-[cutInBackdrop_0.85s_ease-out_forwards]"
          aria-hidden="true"
        >
          <div className="relative w-[112%] h-24 sm:h-28 bg-gradient-to-l from-rose-950 via-red-700 to-fuchsia-900 border-y-4 border-rose-300 flex items-center justify-between px-6 sm:px-14 overflow-hidden animate-[cutInSlideEnemy_0.85s_cubic-bezier(0.16,1,0.3,1)_forwards]">
            {/* Speed lines */}
            <div className="absolute inset-0 opacity-35 pointer-events-none animate-[speedLinesMove_0.35s_linear_infinite]">
              <div className="w-[160%] h-1.5 bg-rose-200/80 my-2.5" />
              <div className="w-[160%] h-0.5 bg-fuchsia-300 my-4 -translate-x-8" />
              <div className="w-[160%] h-2 bg-red-300/70 my-3 translate-x-6" />
              <div className="w-[160%] h-1 bg-white/80 my-3.5 -translate-x-4" />
            </div>

            <div className="hidden sm:flex items-center justify-center text-3xl font-pixel text-rose-200 opacity-80">
              ☠️🔥☠️
            </div>

            {/* Close-up Enemy Portrait & Ultimate Callout */}
            <div className="relative z-10 flex items-center gap-3 sm:gap-5 ml-auto text-right">
              <div className="flex flex-col items-end">
                <span className="font-pixel text-[8px] sm:text-[10px] text-rose-200 tracking-widest uppercase">
                  💀 {currentEnemy.name.toUpperCase()} — FATAL RECKONING 💀
                </span>
                <span className="font-pixel text-sm sm:text-xl md:text-2xl text-white font-bold tracking-wider drop-shadow-[0_2px_0_#881337]">
                  ABYSSAL OBLITERATION!
                </span>
                <span className="font-mono text-[9px] sm:text-xs text-rose-100 font-bold">
                  ENEMY ULTIMATE SKILL — RUNE SHIELD SHATTERED
                </span>
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-950/90 border-2 border-rose-400 flex items-center justify-center overflow-hidden shrink-0">
                <PixelEnemy
                  enemy={currentEnemy}
                  state="attack"
                  size={84}
                  className="scale-125 translate-y-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtle CRT Scanlines */}
      <div className="absolute inset-0 scanlines opacity-35 pointer-events-none z-30" />
    </div>
  );
};
