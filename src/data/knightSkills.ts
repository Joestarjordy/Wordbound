import { CharacterGender } from '../types/game';

export interface KnightSkillInfo {
  gender: CharacterGender;
  title: string;
  archetype: string;
  armorDesc: string;
  skillName: string;
  magicType: 'fire' | 'frost';
  magicLabel: string;
  shortDesc: string;
  deathEffectLabel: string;
  cutInSubtitle: string;
  accentColor: string;
}

export const KNIGHT_SKILLS: Record<CharacterGender, KnightSkillInfo> = {
  male: {
    gender: 'male',
    title: 'MALE KNIGHT',
    archetype: 'Pyreblade Vanguard',
    armorDesc: 'Silver Plate & Royal Blue Cape',
    skillName: 'INFERNO EXCALIBUR',
    magicType: 'fire',
    magicLabel: 'Fire Sword Magic',
    shortDesc:
      'Crack a word on your 1st try to ignite your blade in solar fire and burn enemies to ashes.',
    deathEffectLabel: 'BURNED TO ASHES',
    cutInSubtitle: 'FIRE SWORD MAGIC — INCINERATED TO ASHES',
    accentColor: '#fb923c',
  },
  female: {
    gender: 'female',
    title: 'FEMALE KNIGHT',
    archetype: 'Frostblade Valkyrie',
    armorDesc: 'Gold Filigree & Crimson Cloak',
    skillName: 'GLACIAL EXCALIBUR',
    magicType: 'frost',
    magicLabel: 'Frost Sword Magic',
    shortDesc:
      'Crack a word on your 1st try to imbue your blade with arcane frost and freeze enemies solid.',
    deathEffectLabel: 'FROZEN SOLID',
    cutInSubtitle: 'FROST SWORD MAGIC — SHATTERED IN ICE',
    accentColor: '#38bdf8',
  },
};
