import React from 'react';
import { Stage } from '../../types/game';
import { SeamlessTrack } from './realms/sharedPixelBackdrop';
import {
  ForestClouds,
  ForestFarMountains,
  ForestGround,
  ForestMidFar,
  ForestMidground,
  ForestSky,
} from './realms/ForestRealm';
import {
  RuinsClouds,
  RuinsFarMountains,
  RuinsGround,
  RuinsMidFar,
  RuinsMidground,
  RuinsSky,
} from './realms/RuinsRealm';
import {
  CryptClouds,
  CryptFarMountains,
  CryptGround,
  CryptMidFar,
  CryptMidground,
  CryptSky,
} from './realms/CryptRealm';
import {
  VolcanoClouds,
  VolcanoFarMountains,
  VolcanoGround,
  VolcanoMidFar,
  VolcanoMidground,
  VolcanoSky,
} from './realms/VolcanoRealm';
import {
  CitadelClouds,
  CitadelFarMountains,
  CitadelGround,
  CitadelMidFar,
  CitadelMidground,
  CitadelSky,
} from './realms/CitadelRealm';

interface RealmBackdropProps {
  stage: Stage;
  inCombat: boolean;
}

const PARTICLE_POSITIONS = [
  { x: '8%', y: '62%', d: '0s', dur: '4.1s', lg: false },
  { x: '19%', y: '50%', d: '1.1s', dur: '3.6s', lg: true },
  { x: '31%', y: '68%', d: '2.3s', dur: '4.5s', lg: false },
  { x: '44%', y: '54%', d: '0.6s', dur: '3.8s', lg: true },
  { x: '57%', y: '66%', d: '1.9s', dur: '4.2s', lg: false },
  { x: '68%', y: '48%', d: '2.8s', dur: '3.5s', lg: true },
  { x: '79%', y: '60%', d: '0.9s', dur: '4.3s', lg: false },
  { x: '90%', y: '54%', d: '1.5s', dur: '3.9s', lg: true },
] as const;

const BiomeParticles: React.FC<{ biome: Stage['biome'] }> = ({ biome }) => {
  const cfg = {
    forest: {
      sm: 'w-1 h-1 bg-lime-200',
      lg: 'w-1.5 h-1.5 bg-emerald-300',
      anim: 'fireflyDrift',
    },
    ruins: {
      sm: 'w-1 h-1 bg-amber-200',
      lg: 'w-1.5 h-1.5 bg-sky-300',
      anim: 'fireflyDrift',
    },
    crypt: {
      sm: 'w-1 h-1 bg-fuchsia-300',
      lg: 'w-1.5 h-1.5 bg-cyan-300',
      anim: 'soulWispDrift',
    },
    volcano: {
      sm: 'w-1 h-1 bg-amber-300',
      lg: 'w-1.5 h-1.5 bg-orange-500',
      anim: 'emberDrift',
    },
    citadel: {
      sm: 'w-1 h-1 bg-pink-200',
      lg: 'w-1.5 h-1.5 bg-amber-200',
      anim: 'stardustDrift',
    },
  }[biome];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {PARTICLE_POSITIONS.map((p, i) => (
        <div
          key={i}
          className={`absolute ${p.lg ? cfg.lg : cfg.sm}`}
          style={{
            left: p.x,
            top: p.y,
            animation: `${cfg.anim} ${p.dur} ease-in-out infinite`,
            animationDelay: p.d,
          }}
        />
      ))}
    </div>
  );
};

export const RealmBackdrop: React.FC<RealmBackdropProps> = ({ stage, inCombat }) => {
  const biome = stage.biome;
  const bg = stage.bgColors;

  return (
    <div className="realm-track-stage absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* LAYER 0: Dithered Celestial Pixel Sky, Stars & Moon/Planet */}
      <div className="absolute inset-0">
        {biome === 'forest' && <ForestSky />}
        {biome === 'ruins' && <RuinsSky stageId={stage.id} />}
        {biome === 'crypt' && <CryptSky stageId={stage.id} />}
        {biome === 'volcano' && <VolcanoSky />}
        {biome === 'citadel' && <CitadelSky />}
      </div>

      {/* LAYER 0.5: Drifting Multi-Tone Volumetric Pixel Clouds */}
      <SeamlessTrack animationName="cloudDrift" duration="150s" inCombat={inCombat}>
        {biome === 'forest' && <ForestClouds />}
        {biome === 'ruins' && <RuinsClouds />}
        {biome === 'crypt' && <CryptClouds />}
        {biome === 'volcano' && <VolcanoClouds />}
        {biome === 'citadel' && <CitadelClouds />}
      </SeamlessTrack>

      {/* LAYER 1: Distant Faceted Mountain Peaks & Horizon Landmarks */}
      <SeamlessTrack animationName="parallaxFar" duration="82s" inCombat={inCombat}>
        {biome === 'forest' && <ForestFarMountains color={bg.farMountain} />}
        {biome === 'ruins' && <RuinsFarMountains color={bg.farMountain} />}
        {biome === 'crypt' && <CryptFarMountains color={bg.farMountain} />}
        {biome === 'volcano' && <VolcanoFarMountains color={bg.farMountain} />}
        {biome === 'citadel' && <CitadelFarMountains color={bg.farMountain} />}
      </SeamlessTrack>

      {/* LAYER 1.5: Mid-Far Atmospheric Silhouettes (Waterfalls, Aqueducts, Abbeys, Forges, Sky-Bridges) */}
      <SeamlessTrack animationName="parallaxMidFar" duration="52s" inCombat={inCombat}>
        {biome === 'forest' && <ForestMidFar />}
        {biome === 'ruins' && <RuinsMidFar />}
        {biome === 'crypt' && <CryptMidFar />}
        {biome === 'volcano' && <VolcanoMidFar />}
        {biome === 'citadel' && <CitadelMidFar />}
      </SeamlessTrack>

      {/* LAYER 2: Detailed Midground Architecture, Trees & Shrines */}
      <SeamlessTrack animationName="parallaxMid" duration="28s" inCombat={inCombat}>
        {biome === 'forest' && <ForestMidground />}
        {biome === 'ruins' && <RuinsMidground />}
        {biome === 'crypt' && <CryptMidground />}
        {biome === 'volcano' && <VolcanoMidground />}
        {biome === 'citadel' && <CitadelMidground />}
      </SeamlessTrack>

      {/* LAYER 3: Detailed Foreground Terrain & Beveled Roadbed */}
      <SeamlessTrack animationName="parallaxGround" duration="8.4s" inCombat={inCombat}>
        {biome === 'forest' && <ForestGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'ruins' && <RuinsGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'crypt' && <CryptGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'volcano' && <VolcanoGround groundColor={bg.ground} pathColor={bg.path} />}
        {biome === 'citadel' && <CitadelGround groundColor={bg.ground} pathColor={bg.path} />}
      </SeamlessTrack>

      {/* LAYER 4: Ambient Biome Pixel Particles */}
      <BiomeParticles biome={biome} />

      {/* Subtle Atmospheric Contrast Vignette for Crisp Character Readability */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_0%,transparent_22%,transparent_76%,rgba(0,0,0,0.48)_100%)] pointer-events-none" />
    </div>
  );
};
