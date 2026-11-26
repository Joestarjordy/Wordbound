import { CharacterGender, DifficultyLevel, Enemy } from '../types/game';

export type StorySpeaker = 'narrator' | 'knight' | 'elder' | 'boss';

export interface StoryDialogueLine {
  speaker: StorySpeaker;
  speakerName: string;
  text: string;
  bossSpriteType?: Enemy['spriteType'];
}

export interface StoryChapter {
  id: string;
  difficulty: DifficultyLevel;
  /** Stage number that triggers this scene, or 'epilogue' after beating Stage 20 */
  triggerStage: number | 'epilogue';
  bookLabel: string;
  title: string;
  subtitle: string;
  lines: StoryDialogueLine[];
}

function knightTitle(gender: CharacterGender): string {
  return gender === 'male' ? 'Sir Ignis (Pyreblade)' : 'Lady Glacia (Frostblade)';
}

function bladeName(gender: CharacterGender): string {
  return gender === 'male' ? 'Solar Pyreblade' : 'Glacial Frostblade';
}

export function getCampaignStoryChapter(
  difficulty: DifficultyLevel,
  triggerStage: number | 'epilogue',
  gender: CharacterGender
): StoryChapter | null {
  const hero = knightTitle(gender);
  const blade = bladeName(gender);

  const chapters: StoryChapter[] = [
    // ==================== BOOK I: EASY REALM ====================
    {
      id: 'easy_stage_1',
      difficulty: 'easy',
      triggerStage: 1,
      bookLabel: 'BOOK I · ACT I · THE SHATTERED LEXICON',
      title: 'Dawn of the Wordbound Quest',
      subtitle: 'Stage 1 — Whispering Woods',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'For centuries, the Grand Lexicon shone above the kingdom of Aethelgard, weaving peace, light, and wisdom into every valley.',
        },
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'Brave Knight! Archon Vexalor has shattered the Grand Lexicon into three Realm Crowns! His dark creatures have overrun the woods and driven our ancient guardians mad.',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: `Do not despair, Elder. With my ${blade} and the power of every true word, I will drive back the shadow and save Aethelgard!`,
        },
      ],
    },
    {
      id: 'easy_stage_6',
      difficulty: 'easy',
      triggerStage: 6,
      bookLabel: 'BOOK I · ACT II · MARCH OF COURAGE',
      title: 'Smoke Beyond the Border',
      subtitle: 'Stage 6 — Ashen Foothills',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'With the frontier woods and border watchtowers freed, villagers emerge from hiding—cheering the lone knight marching toward the dark horizon.',
        },
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'Ahead lie the Ashen Foothills and Sunken Ossuary. Vexalor’s ember wyverns and cursed captains guard the road to the First Lexicon Crown.',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'Let them bring fire and bone. No innocent soul will live in fear while my sword still stands!',
        },
      ],
    },
    {
      id: 'easy_stage_11',
      difficulty: 'easy',
      triggerStage: 11,
      bookLabel: 'BOOK I · ACT III · LIGHT IN THE BARROWS',
      title: 'Whispers of the First Shard',
      subtitle: 'Stage 11 — Moonlit Barrow',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'Half the frontier now breathes free again. Beneath the silver mist of the Moonlit Barrow, a faint golden pulse answers the Knight’s blade.',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'I can feel the First Lexicon Shard calling from beyond these monoliths! Hold strong, Aethelgard—hope is returning.',
        },
      ],
    },
    {
      id: 'easy_stage_16',
      difficulty: 'easy',
      triggerStage: 16,
      bookLabel: 'BOOK I · ACT IV · GATES OF THE INITIATE',
      title: 'The Outer Seals Tremble',
      subtitle: 'Stage 16 — Catacomb of Echoes',
      lines: [
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'You have reached the inner seals of the Frontier Fortress! Five of Vexalor’s fiercest commanders bar the way to Sovereign Valerius.',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'Every word I have mastered lends strength to my strike. Open the gates—the First Crown comes home today!',
        },
      ],
    },
    {
      id: 'easy_stage_20',
      difficulty: 'easy',
      triggerStage: 20,
      bookLabel: 'BOOK I · FINAL SHOWDOWN',
      title: 'Throne of the Initiate',
      subtitle: 'Stage 20 — Frontier Boss Battle',
      lines: [
        {
          speaker: 'boss',
          speakerName: 'Sovereign Valerius',
          bossSpriteType: 'boss_overlord',
          text: 'So the little champion of Aethelgard crossed nineteen realms to challenge me! The First Lexicon Crown belongs to Archon Vexalor’s legion!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: `Your darkness ends here, Valerius! By the light of my ${blade}, I reclaim the First Crown for the people!`,
        },
      ],
    },
    {
      id: 'easy_epilogue',
      difficulty: 'easy',
      triggerStage: 'epilogue',
      bookLabel: 'BOOK I · EPILOGUE · FRONTIER SAVED',
      title: 'The First Crown Restored!',
      subtitle: 'Easy Campaign Complete',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'Sovereign Valerius falls! Sunlight breaks over Whispering Woods and the Frontier villages ring their bells in triumph.',
        },
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'Magnificent work, hero! The First Lexicon Crown shines whole again—but the blazing Heartlands of the Medium Realm still cry out for rescue!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'Then our quest continues. Forward to the Medium Realm—until the entire world is free!',
        },
      ],
    },

    // ==================== BOOK II: MEDIUM REALM ====================
    {
      id: 'medium_stage_1',
      difficulty: 'medium',
      triggerStage: 1,
      bookLabel: 'BOOK II · ACT I · THE BLAZING HEARTLANDS',
      title: 'Into the Crimson Caldera',
      subtitle: 'Stage 1 — Crimson Caldera',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'Guided by the restored First Crown, the brave Knight crosses into the Heartlands—once a land of scholars and grand libraries, now scorched by volcanic monsters.',
        },
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'Beware, hero! Ignis the Scourge and Colossus Kronos have been twisted by Vexalor’s spells. Break the curse over these twenty realms!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: `Even through fire and iron, my ${blade} will not falter. I will free the Heartlands!`,
        },
      ],
    },
    {
      id: 'medium_stage_6',
      difficulty: 'medium',
      triggerStage: 6,
      bookLabel: 'BOOK II · ACT II · SHADOWS OF EMPIRE',
      title: 'The Awakened Tombs',
      subtitle: 'Stage 6 — Crypt of Forgotten Kings',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'Having quelled the Caldera and broken the Bloodaxe raiders, the Knight reaches the ancient royal necropolis where Vexalor’s dark runes disturb the sleeping kings.',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'Noble kings of old, forgive my steel—I will shatter the necromancer’s chains and grant you peace!',
        },
      ],
    },
    {
      id: 'medium_stage_11',
      difficulty: 'medium',
      triggerStage: 11,
      bookLabel: 'BOOK II · ACT III · SCHOLARS’ LEGACY',
      title: 'Ruins of the Grand Academy',
      subtitle: 'Stage 11 — Ruin of the Archmages',
      lines: [
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'These collapsed towers once housed Aethelgard’s greatest scholars. Their surviving tomes reveal where High Archon Maelis hides the Second Lexicon Crown!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'Their wisdom will not be lost to monsters. Every word we rescue lights the road to the High Spire!',
        },
      ],
    },
    {
      id: 'medium_stage_16',
      difficulty: 'medium',
      triggerStage: 16,
      bookLabel: 'BOOK II · ACT IV · ASCENT TO THE SPIRE',
      title: 'Storming the Sky Parapets',
      subtitle: 'Stage 16 — Sunbaked Spire',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'Far above the clouds, the violet towers of High Archon Maelis pierce the sky. Only the spire’s elite guardians stand between the Knight and the Second Crown.',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'The Heartlands have suffered long enough. Raise the banner—we take the Spire!',
        },
      ],
    },
    {
      id: 'medium_stage_20',
      difficulty: 'medium',
      triggerStage: 20,
      bookLabel: 'BOOK II · FINAL SHOWDOWN',
      title: 'High Spire of Dominion',
      subtitle: 'Stage 20 — Heartlands Boss Battle',
      lines: [
        {
          speaker: 'boss',
          speakerName: 'High Archon Maelis',
          bossSpriteType: 'boss_overlord',
          text: 'Impossible! You purified the Caldera, broke the Titans, and climbed my Spire?! No mortal lexicon can withstand the Second Crown!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'Words belong to all who dream and learn—not to tyrants! Prepare yourself, Maelis!',
        },
      ],
    },
    {
      id: 'medium_epilogue',
      difficulty: 'medium',
      triggerStage: 'epilogue',
      bookLabel: 'BOOK II · EPILOGUE · HEARTLANDS LIBERATED',
      title: 'The Second Crown Shines!',
      subtitle: 'Medium Campaign Complete',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'High Archon Maelis is vanquished! The ash clouds part, cool rain heals the Caldera, and two of the three Lexicon Crowns blaze together in harmony.',
        },
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'Only one final stronghold remains—the Astral Citadel of the Hard Realm, where Archon Vexalor himself awaits. The fate of the world rests with you, brave Knight!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'I will face Vexalor in the stars and bring the dawn back to Aethelgard!',
        },
      ],
    },

    // ==================== BOOK III: HARD REALM ====================
    {
      id: 'hard_stage_1',
      difficulty: 'hard',
      triggerStage: 1,
      bookLabel: 'BOOK III · ACT I · EDGE OF OBLIVION',
      title: 'Crossing the Abyssal Chasm',
      subtitle: 'Stage 1 — Abyssal Chasm',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'At the roof of the world lies the Astral Realm, where Archon Vexalor weaves a final silence spell to erase language and hope forever.',
        },
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'Cosmic wyrms, undying solar phoenixes, and Vexalor’s dark vanguard guard this realm. Stay courageous—every kingdom beneath the sky is praying for you!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: `With two Crowns at my heart and my ${blade} in hand, I step into the abyss. Aethelgard will be saved!`,
        },
      ],
    },
    {
      id: 'hard_stage_6',
      difficulty: 'hard',
      triggerStage: 6,
      bookLabel: 'BOOK III · ACT II · REALM OF CINDERS',
      title: 'The Starless Gauntlet',
      subtitle: 'Stage 6 — Cathedral of Bone',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'Even the Abyssal Chasm could not slow the Knight’s stride. Through cathedrals of bone and seas of starfire, the hero’s courage inspires fallen spirits to break free.',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'Each monster defeated weakens Vexalor’s grip on the sky. Keep pushing forward!',
        },
      ],
    },
    {
      id: 'hard_stage_11',
      difficulty: 'hard',
      triggerStage: 11,
      bookLabel: 'BOOK III · ACT III · CHAMPIONS OF OLD',
      title: 'Echoes of Past Heroes',
      subtitle: 'Stage 11 — Barrow of Legends',
      lines: [
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'Here lie the legends who fought darkness ages ago. Free their spirits from Vexalor’s curse, and their blessing will carry you to the Citadel gates!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'I honor every hero who came before me. Together, we will end this nightmare!',
        },
      ],
    },
    {
      id: 'hard_stage_16',
      difficulty: 'hard',
      triggerStage: 16,
      bookLabel: 'BOOK III · ACT IV · FINAL APPROACH',
      title: 'Beneath the Grand Citadel',
      subtitle: 'Stage 16 — Pillars of Creation',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'The floating Citadel of the Wordbinder looms directly overhead. Four mythic guardians block the celestial bridge to Archon Vexalor’s throne.',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'We have come too far to turn back now. For every village, every story, and every living voice—charge!',
        },
      ],
    },
    {
      id: 'hard_stage_20',
      difficulty: 'hard',
      triggerStage: 20,
      bookLabel: 'BOOK III · GRAND FINALE',
      title: 'Citadel of the Wordbinder',
      subtitle: 'Stage 20 — Final Battle for Aethelgard',
      lines: [
        {
          speaker: 'boss',
          speakerName: 'Archon Vexalor',
          bossSpriteType: 'boss_overlord',
          text: 'At last, the lone Wordbound Knight stands in my Citadel! You fought across sixty realms—yet when I silence your final word, the world shall fall into eternal night!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: `So long as brave hearts dare to speak, darkness will NEVER silence this world! Feel the true power of my ${blade}, Vexalor!`,
        },
      ],
    },
    {
      id: 'hard_epilogue',
      difficulty: 'hard',
      triggerStage: 'epilogue',
      bookLabel: 'GRAND EPILOGUE · SAVIOR OF AETHELGARD',
      title: 'The Grand Lexicon Reborn!',
      subtitle: 'Campaign Story Complete',
      lines: [
        {
          speaker: 'narrator',
          speakerName: 'Chronicle of Aethelgard',
          text: 'With one radiant final strike, Archon Vexalor’s dark spell shatters across the heavens! The three Crowns reunite into the blazing Grand Lexicon above Aethelgard.',
        },
        {
          speaker: 'elder',
          speakerName: 'Elder Aurelia',
          text: 'You did it, brave Knight! The corrupted guardians are healed, the evil creatures have fled into shadow, and peace has returned to every corner of the realm!',
        },
        {
          speaker: 'knight',
          speakerName: hero,
          text: 'Aethelgard is safe at last. May our words forever shine as a shield against the dark!',
        },
      ],
    },
  ];

  return (
    chapters.find(
      (c) => c.difficulty === difficulty && c.triggerStage === triggerStage
    ) ?? null
  );
}

/** Finds the latest story chapter at or before the current stage so the player can replay it anytime */
export function getLatestStoryChapterForStage(
  difficulty: DifficultyLevel,
  stageId: number,
  gender: CharacterGender
): StoryChapter | null {
  const milestones = [20, 16, 11, 6, 1];
  const milestone = milestones.find((m) => stageId >= m) ?? 1;
  return getCampaignStoryChapter(difficulty, milestone, gender);
}
