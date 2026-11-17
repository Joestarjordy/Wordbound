import { CompiledRect, PixelGrid } from './pixelUtils';

const OUTLINE = '#0d0a18';

export type BossSpriteKey =
  | 'boss_treant'
  | 'boss_ogre'
  | 'boss_lich'
  | 'boss_dragon'
  | 'boss_titan'
  | 'boss_deathknight'
  | 'boss_wyrm'
  | 'boss_phoenix'
  | 'boss_overlord';

function buildTreant(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Swept Back Bough & Hanging Forest Moss Vines
  g.line(41, 28, 53, 24, '#5c2b09', 4.6);
  g.line(53, 24, 58, 36, '#451a03', 3.4);
  g.poly([[58, 36], [62, 42], [57, 42]], '#713f12');
  g.line(51, 27, 51, 41, '#14532d', 1.6);
  g.line(48, 28, 48, 36, '#166534', 1.2);

  // Twisted Asymmetric Ancient Oak Trunk with Flared Root Talons & Deep Bark Fissures
  g.poly([
    [22, 16], [41, 17], [39, 28], [38, 36], [42, 46], [53, 56],
    [44, 59], [37, 49], [32, 47], [26, 49], [18, 59], [10, 57], [22, 45], [24, 36], [23, 28],
  ], '#5c2b09');
  g.poly([[23, 19], [33, 19], [32, 44], [24, 44]], '#713f12');
  g.line(25, 22, 24, 43, '#451a03', 1.2);
  g.line(29, 21, 30, 42, '#854d0e', 1.2);
  g.line(36, 23, 38, 43, '#451a03', 1.2);
  // Gnarled Root Anchor Claws gripping soil
  g.poly([[16, 54], [8, 58], [13, 60], [21, 56]], '#451a03');
  g.poly([[47, 54], [56, 58], [51, 60], [43, 56]], '#451a03');

  // Swept Jagged Oak Branches & Irregular Textured Canopy Clusters (natural oak silhouette)
  g.line(23, 18, 10, 8, '#451a03', 2.8);
  g.line(40, 18, 53, 8, '#451a03', 2.8);
  g.line(31, 15, 33, 4, '#5c2b09', 2.6);
  for (const [cx, cy, rx, ry, mid, hi, sh] of [
    [13, 17, 7, 5, '#14532d', '#166534', '#052e16'],
    [49, 18, 7, 5, '#14532d', '#166534', '#052e16'],
    [21, 13, 8, 6, '#166534', '#22c55e', '#14532d'],
    [41, 13, 8, 6, '#15803d', '#22c55e', '#14532d'],
    [31, 9, 9, 5, '#15803d', '#4ade80', '#14532d'],
    [19, 8, 6, 4, '#166534', '#22c55e', '#14532d'],
    [44, 9, 6, 4, '#14532d', '#15803d', '#052e16'],
    [9, 22, 4.5, 3.5, '#14532d', '#166534', '#052e16'],
    [53, 22, 4.5, 3.5, '#14532d', '#166534', '#052e16'],
  ] as const) {
    g.oval(cx, cy, rx, ry, mid, hi, sh);
  }
  // Subtle glowing forest spirit motes nestled inside oak leaves (small organic dots, not blocks)
  for (const [fx, fy] of [[15, 16], [23, 9], [33, 6], [42, 11], [49, 17]]) {
    g.set(fx, fy, '#fef08a');
    g.set(fx + 1, fy, '#fde047');
  }

  // Deep Craggy Bark Brow, Hollowed Emerald Eye Recesses & Split-Wood Jaw
  g.line(22, 23, 29, 26, '#451a03', 2.4);
  g.line(33, 26, 40, 23, '#451a03', 2.4);
  g.line(22, 24, 29, 26, OUTLINE, 1.4);
  g.line(33, 26, 40, 24, OUTLINE, 1.4);
  g.oval(26, 27, 2.5, 1.8, '#22c55e', '#bbf7d0', '#14532d');
  g.oval(36, 27, 2.5, 1.8, '#22c55e', '#bbf7d0', '#14532d');
  g.set(25, 27, '#ffffff');
  g.set(35, 27, '#ffffff');
  g.poly([[25, 31], [37, 31], [35, 35], [27, 35]], '#052e16');
  g.set(27, 32, '#a16207');
  g.set(31, 32, '#a16207');
  g.set(35, 32, '#a16207');
  g.oval(10, 28, 3, 2, '#14532d', '#166534');
  g.oval(53, 23, 3, 2, '#14532d', '#166534');

  // Glowing Heartwood Spirit Gem inside deep bark chest cavity
  g.oval(31.5, 40, 4.2, 4.4, '#052e16');
  g.poly([[31.5, 36], [34.5, 40], [31.5, 44], [28.5, 40]], '#d97706');
  g.oval(31.5, 40, 1.6, 1.8, '#fef08a', '#ffffff');

  // Massive Lead Root-Arm reaching forward left
  g.line(22, 27, 10, 30, '#713f12', 5.2);
  g.line(10, 30, 6, 40, '#5c2b09', 4);
  g.poly([[6, 40], [1, 45], [5, 45]], '#713f12');
  g.poly([[7, 40], [7, 46], [10, 44]], '#713f12');
  g.line(12, 32, 12, 42, '#166534', 1.6);

  return g.compile(OUTLINE);
}

function buildOgre(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Muscular Back Right Arm with Spiked Iron Gauntlet
  g.line(42, 26, 51, 32, '#7f1d1d', 5);
  g.line(51, 32, 53, 40, '#7f1d1d', 4.4);
  g.oval(53, 41, 4.2, 4.2, '#475569', '#94a3b8', '#1e293b');
  g.set(57, 41, '#e2e8f0');
  g.set(53, 45, '#e2e8f0');

  // Heavy Stance Legs + Spiked Iron War-Boots
  g.line(26, 42, 22, 53, '#b91c1c', 6);
  g.line(38, 42, 42, 53, '#7f1d1d', 6);
  g.rect(17, 52, 9, 7, '#5c2b09');
  g.rect(15, 56, 11, 3, '#451a03');
  g.rect(38, 52, 9, 7, '#451a03');
  g.rect(37, 56, 11, 3, '#292524');

  // Scarred Muscular Crimson Torso + Pectoral Recesses + Leather Harness + Iron-Buckle Kilt
  g.oval(32, 31, 13, 12, '#b91c1c', '#dc2626', '#7f1d1d');
  g.line(24, 27, 31, 29, '#7f1d1d', 1.6);
  g.line(32, 29, 39, 27, '#450a0a', 1.6);
  g.line(28, 33, 34, 35, '#991b1b', 1); // Battle scar
  g.line(23, 22, 35, 36, '#5c2b09', 2.4);
  g.set(27, 27, '#d97706');
  g.set(32, 32, '#d97706');
  g.rect(20, 39, 24, 4, '#451a03');
  g.oval(31, 41, 3.6, 3.4, '#94a3b8', '#cbd5e1', '#334155');
  g.set(30, 41, OUTLINE);
  g.set(32, 41, OUTLINE);
  g.poly([[20, 43], [44, 43], [43, 49], [37, 46], [31, 49], [25, 46], [21, 49]], '#5c2b09');

  // Fierce Warlord Ogre Head + Furrowed Brow Ridge + Snout Bridge + Asymmetric Jagged Tusks
  g.oval(31, 17, 9, 7.8, '#b91c1c', '#dc2626', '#7f1d1d');
  g.poly([[27, 9], [31, 5], [35, 9]], '#1e293b');
  g.line(25, 11, 20, 5, '#b45309', 3);
  g.line(20, 5, 23, 3, '#fef3c7', 2);
  g.line(37, 11, 42, 5, '#b45309', 3);
  g.line(42, 5, 39, 3, '#fef3c7', 2);
  g.line(23, 14, 29, 16, OUTLINE, 2.2);
  g.line(32, 16, 38, 14, OUTLINE, 2.2);
  g.eye(24, 16, '#fef08a', '#ffffff');
  g.eye(33, 16, '#fef08a', '#ffffff');
  g.rect(29, 18, 3, 2, '#991b1b'); // Broad flat ogre nose
  g.poly([[24, 21], [37, 21], [36, 24], [25, 24]], '#450a0a');
  g.poly([[24, 23], [26, 23], [25, 18]], '#fef9c3');
  g.poly([[34, 23], [36, 23], [35, 17]], '#fef9c3');

  // Spiked Iron Shoulder Pauldron + Enormous Left Arm swinging Morning-Star Club
  g.oval(21, 24, 5.2, 4.5, '#475569', '#94a3b8', '#1e293b');
  g.poly([[19, 20], [17, 15], [22, 19]], '#cbd5e1');
  g.line(20, 26, 11, 35, '#b91c1c', 5);
  g.oval(10, 36, 3.8, 3.8, '#dc2626');
  g.line(10, 38, 6, 12, '#5c2b09', 3.4);
  g.oval(6, 13, 5.8, 6.8, '#475569', '#94a3b8', '#1e293b');
  for (const [sx, sy] of [[0, 11], [0, 16], [12, 10], [12, 16], [6, 5]]) {
    g.rect(sx, sy, 2, 2, '#f8fafc');
  }

  return g.compile(OUTLINE);
}

function buildLich(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Gnarled Iron-and-Bone Phylactery Staff on Right
  g.line(52, 14, 52, 58, '#334155', 2.4);
  g.poly([[48, 14], [52, 17], [56, 14], [54, 8], [50, 8]], '#a8a29e');
  g.oval(52, 11, 2.8, 3.2, '#14b8a6', '#ccfbf1', '#0f766e');

  // Jagged Tattered Necromancer Cloak & Rotted Hem Strips
  g.poly([
    [18, 22], [45, 22], [51, 44], [47, 57], [41, 46], [36, 59],
    [31, 47], [26, 58], [21, 47], [15, 56], [13, 42],
  ], '#042f2e');
  g.poly([[21, 23], [42, 23], [46, 44], [39, 51], [31, 45], [23, 51], [17, 44]], '#0f766e');
  g.line(21, 24, 16, 48, '#2dd4bf', 1.2);
  g.line(42, 24, 47, 48, '#2dd4bf', 1.2);
  g.poly([[29, 37], [34, 37], [33, 50], [31.5, 47], [30, 50]], '#b45309');

  // High Spiked Archlich Collar & Ornate Bone Shoulder Pauldrons
  g.poly([[16, 23], [21, 13], [25, 22]], '#0f766e');
  g.poly([[38, 22], [42, 13], [47, 23]], '#0f766e');
  g.oval(20, 24, 4.8, 3.2, '#a8a29e', '#e7e5e4', '#57534e');
  g.oval(43, 24, 4.8, 3.2, '#a8a29e', '#e7e5e4', '#57534e');
  g.poly([[17, 22], [13, 18], [19, 20]], '#d97706');
  g.poly([[46, 22], [50, 18], [44, 20]], '#d97706');

  // Curved Anatomical Ribcage framing Swirling Cyan Soul Phylactery Core
  g.rect(25, 24, 13, 13, '#042f2e');
  for (const ry of [26, 29, 32, 35]) {
    g.line(24, ry, 29, ry + 1, '#e7e5e4', 1.3);
    g.line(39, ry, 34, ry + 1, '#a8a29e', 1.3);
  }
  g.oval(31.5, 30, 3.4, 3.8, '#14b8a6', '#ccfbf1', '#0f766e');

  // Tarnished Bronze Crown + Tapered Gaunt Archlich Skull (high cheekbones narrowing to chin!)
  g.oval(31, 13, 6.2, 5, '#e7e5e4', '#fef9c3', '#a8a29e');
  g.poly([[26, 15], [36, 15], [34, 21.5], [28, 21.5]], '#d6d3d1');
  g.poly([[25, 10], [26, 4], [28, 8], [31, 3], [34, 8], [36, 4], [37, 10]], '#d97706');
  g.line(26, 9, 36, 9, '#fbbf24', 1);
  g.rect(26, 12.5, 4, 3.5, OUTLINE);
  g.rect(32.5, 12.5, 4, 3.5, OUTLINE);
  g.set(27, 13.5, '#2dd4bf');
  g.set(28, 14.5, '#ccfbf1');
  g.set(34, 13.5, '#2dd4bf');
  g.set(35, 14.5, '#ccfbf1');
  g.rect(30, 16, 2, 2, OUTLINE);
  g.rect(28, 19, 6, 2.2, '#a8a29e');
  g.line(28, 20, 33, 20, OUTLINE, 1);

  // Clawed Skeletal Hands + Soul Fire Orb
  g.poly([[43, 25], [49, 29], [48, 34], [42, 30]], '#0f766e');
  g.line(48, 31, 52, 31, '#e7e5e4', 2);
  g.poly([[18, 25], [11, 29], [12, 34], [19, 30]], '#0f766e');
  g.line(11, 31, 7, 29, '#fef9c3', 1.6);
  g.line(11, 32, 7, 33, '#d6d3d1', 1.6);
  g.oval(6, 22, 4.6, 4.6, '#14b8a6', '#ccfbf1', '#0f766e', false);
  g.set(2, 16, '#ccfbf1', false);
  g.set(11, 16, '#2dd4bf', false);

  return g.compile(OUTLINE);
}

function buildDragon(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Sweeping Spiked Dragon Tail whipping up right
  g.poly([[39, 43], [50, 44], [58, 34], [60, 23], [55, 34], [41, 47]], '#9a3412');
  g.poly([[59, 24], [62, 19], [62, 26]], '#ea580c');
  g.set(53, 35, '#facc15');
  g.set(57, 29, '#facc15');

  // GIGANTIC Scalloped Volcanic Dragon Wing with Bone Fingers
  g.poly([
    [30, 29], [41, 4], [59, 7], [61, 19], [55, 21],
    [56, 29], [49, 28], [46, 35], [35, 34],
  ], '#9a3412');
  g.poly([[32, 27], [42, 8], [55, 11], [52, 25], [39, 30]], '#c2410c');
  g.line(30, 28, 41, 4, '#431407', 2.6);
  g.line(41, 4, 59, 7, '#431407', 2);
  g.line(36, 19, 60, 18, '#431407', 1.4);
  g.line(36, 25, 55, 28, '#431407', 1.4);
  g.set(40, 3, '#fef08a');

  // Far Legs (darker shaded)
  g.line(25, 42, 21, 56, '#7c2d12', 4);
  g.rect(18, 56, 5, 2.5, '#facc15');

  // Sculpted Muscular Dragon Body + Interlocking V-Notched Belly Scutes (NO awkward yellow patch!)
  g.oval(34, 38, 10.5, 8.8, '#c2410c', '#ea580c', '#9a3412');
  g.poly([[23, 33], [29, 33], [31, 46], [24, 44]], '#facc15');
  for (const by of [36, 39, 42]) {
    g.line(24, by, 30, by + 1, '#b45309', 1.2);
  }
  // Near Hind Haunch + Knee + Clawed Foot
  g.oval(40, 41, 6.2, 6.4, '#9a3412', '#c2410c', '#431407');
  g.line(41, 46, 38, 55, '#9a3412', 4.6);
  g.rect(34, 55, 7, 3, '#ea580c');
  g.set(33, 57, '#ffffff');
  g.set(36, 57, '#ffffff');
  // Near Front Foreleg angled powerfully forward
  g.line(28, 41, 24, 55, '#ea580c', 4.4);
  g.rect(20, 55, 7, 3, '#facc15');
  g.set(19, 57, '#ffffff');

  // S-Curved Muscular Dragon Neck + Dorsal Crest Spikes
  g.line(26, 34, 20, 19, '#c2410c', 7.6);
  g.line(22, 33, 18, 21, '#facc15', 2.8);
  g.poly([[23, 21], [28, 19], [26, 24]], '#facc15');
  g.poly([[25, 27], [30, 25], [28, 30]], '#facc15');

  // Curved Horns + Fierce Dragon Skull + Roaring Flame Breath
  g.line(22, 13, 28, 5, '#b45309', 2.8);
  g.line(28, 5, 33, 4, '#fef08a', 2);
  g.line(18, 13, 22, 6, '#b45309', 2);
  g.poly([[24, 14], [13, 13], [7, 16], [8, 20], [21, 20]], '#9a3412');
  g.poly([[21, 22], [9, 24], [11, 27], [22, 25]], '#c2410c');
  g.eye(14, 16, '#fef08a', '#ffffff');
  g.set(9, 20, '#ffffff');
  g.set(13, 20, '#ffffff');
  g.set(10, 24, '#ffffff');
  g.set(14, 24, '#ffffff');
  g.poly([[9, 20], [2, 18], [1, 23], [9, 23]], '#f97316', false);
  g.poly([[7, 20], [3, 20], [3, 22], [7, 22]], '#fef08a', false);

  return g.compile(OUTLINE);
}

function buildTitan(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Colossal Chiseled Stone & Rune War-Hammer gripped by Right Arm
  g.line(53, 17, 53, 57, '#334155', 3);
  g.poly([[45, 11], [61, 11], [59, 22], [47, 22]], '#475569');
  g.rect(48, 13, 10, 6, '#334155');
  g.poly([[53, 13], [56, 16], [53, 19], [50, 16]], '#38bdf8');
  g.line(43, 30, 52, 34, '#475569', 5.5);
  g.oval(53, 34, 4.2, 4.2, '#64748b');

  // Heavy Beveled Granite Pillar Legs & Moss-Draped Stone Sabatons
  g.poly([[19, 41], [29, 41], [28, 54], [18, 54]], '#475569');
  g.poly([[35, 41], [45, 41], [46, 54], [36, 54]], '#334155');
  g.rect(18, 46, 11, 3, '#64748b');
  g.rect(35, 46, 11, 3, '#475569');
  g.rect(17, 54, 12, 5, '#334155');
  g.rect(35, 54, 12, 5, '#1e293b');
  g.rect(19, 47, 4, 2, '#15803d');

  // Weathered Temple Granite Breastplate + Etched Cyan Fissures + Moss + Reactor Core
  g.poly([[17, 19], [47, 19], [44, 42], [20, 42]], '#475569');
  g.poly([[20, 21], [41, 21], [39, 36], [22, 36]], '#64748b');
  g.line(21, 22, 39, 22, '#94a3b8', 1.2); // Chiseled top bevel
  g.line(21, 23, 27, 28, '#38bdf8', 1); // Runic vein
  g.line(43, 23, 37, 28, '#38bdf8', 1);
  g.line(22, 34, 27, 38, '#1e293b', 1.2); // Stone crack
  g.poly([[32, 23], [38, 29], [32, 36], [26, 29]], OUTLINE);
  g.poly([[32, 24], [37, 29], [32, 35], [27, 29]], '#0284c7');
  g.oval(32, 29, 2.8, 3, '#38bdf8', '#e0f2fe');
  g.rect(20, 39, 24, 3.5, '#334155');
  g.rect(30, 39, 4, 3.5, '#38bdf8');
  g.poly([[38, 19], [45, 19], [44, 23], [40, 23]], '#15803d'); // Chest shoulder moss

  // Towering Craggy Rune-Carved Shoulder Crags
  g.poly([[10, 20], [17, 14], [24, 20], [22, 28], [12, 28]], '#64748b');
  g.poly([[40, 20], [47, 14], [54, 20], [52, 28], [42, 28]], '#475569');
  g.rect(14, 21, 6, 2, '#38bdf8');
  g.rect(44, 21, 6, 2, '#38bdf8');
  g.rect(12, 16, 4, 2, '#16a34a');

  // Chiseled Rough-Hewn Ancient Granite Head + Craggy Brow & Twin Runic Eye Recesses
  g.poly([[22, 19], [23, 8], [28, 5], [34, 5], [39, 8], [41, 19]], '#57534e');
  g.poly([[25, 8], [31, 6], [37, 8], [37, 11], [25, 11]], '#78716c');
  g.poly([[24, 10], [20, 5], [26, 9]], '#38bdf8');
  g.poly([[39, 10], [43, 5], [37, 9]], '#38bdf8');
  g.line(22, 12, 40, 12, '#1c1917', 1.8); // Deep craggy brow shadow
  g.rect(25, 13, 4.5, 2.5, OUTLINE);
  g.rect(33.5, 13, 4.5, 2.5, OUTLINE);
  g.set(26, 14, '#38bdf8');
  g.set(27, 14, '#e0f2fe');
  g.set(35, 14, '#38bdf8');
  g.set(36, 14, '#e0f2fe');
  g.poly([[27, 17], [36, 17], [34, 21], [29, 21]], '#44403c');

  // Colossal Forward Stone Crusher Arm & Jagged Boulder Wrecking-Fist
  g.line(15, 26, 9, 39, '#475569', 6.5);
  g.poly([[3, 36], [14, 35], [15, 46], [4, 47]], '#64748b');
  g.line(5, 40, 13, 40, OUTLINE, 1);
  g.line(5, 43, 13, 43, OUTLINE, 1);

  return g.compile(OUTLINE);
}

function buildDeathKnight(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Sweeping Tattered Violet War-Cape
  g.poly([[36, 20], [54, 27], [59, 49], [52, 56], [46, 49], [41, 57], [34, 48]], '#1e1b4b');
  g.poly([[37, 22], [51, 29], [54, 47], [44, 52], [36, 46]], '#312e81');
  g.line(38, 25, 53, 46, '#a855f7', 1.2);

  // Gothic Greaves & Pointed Sabatons
  g.line(25, 41, 22, 53, '#312e81', 5.2);
  g.line(36, 41, 39, 53, '#1e1b4b', 5.2);
  g.rect(17, 52, 9, 6, '#0f172a');
  g.rect(36, 52, 9, 6, '#0f172a');
  g.set(16, 56, '#a855f7');
  g.set(35, 56, '#a855f7');

  // Carved Runic Breastplate + Glowing V-Rune Sigil + Skull Belt
  g.poly([[21, 21], [41, 21], [39, 41], [23, 41]], '#312e81');
  g.poly([[24, 23], [37, 23], [36, 36], [25, 36]], '#475569');
  g.line(26, 25, 31, 31, '#e9d5ff', 1.4);
  g.line(35, 25, 31, 31, '#e9d5ff', 1.4);
  g.line(31, 31, 31, 35, '#a855f7', 1.5);
  g.rect(22, 38, 18, 3, '#0f172a');
  g.oval(31, 39.5, 2.5, 2.2, '#e9d5ff');

  // Jagged Spiked Obsidian Pauldrons
  g.oval(20, 22, 5.5, 4.2, '#312e81', '#4c1d95', '#0f172a');
  g.poly([[18, 18], [14, 12], [21, 18]], '#a855f7');
  g.oval(41, 22, 5.5, 4.2, '#1e1b4b', '#312e81', '#0f172a');
  g.poly([[42, 18], [47, 12], [39, 18]], '#a855f7');

  // Curved Ram-Horned Dread Greathelm + Skull Faceplate Visor + Glowing Eyes
  g.oval(31, 14, 6.8, 6.8, '#312e81', '#475569', '#0f172a');
  g.line(25, 10, 19, 4, '#a855f7', 2.4);
  g.line(19, 4, 24, 3, '#e9d5ff', 1.6);
  g.line(37, 10, 43, 4, '#a855f7', 2.4);
  g.line(43, 4, 38, 3, '#e9d5ff', 1.6);
  g.rect(24, 13, 12, 4, '#0f172a');
  g.eye(25, 14, '#e9d5ff', '#ffffff');
  g.eye(32, 14, '#e9d5ff', '#ffffff');

  // Gauntleted Arms gripping Enormous Notched Violet-Runeblade Greatsword
  g.line(21, 25, 15, 34, '#312e81', 3.8);
  g.line(39, 25, 26, 36, '#1e1b4b', 3.6);
  g.oval(14, 35, 2.8, 2.8, '#475569');
  g.oval(24, 36, 2.5, 2.5, '#64748b');
  g.line(17, 36, 4, 7, '#a855f7', 5);
  g.line(16, 35, 5, 8, '#e9d5ff', 2);
  g.set(10, 18, OUTLINE);
  g.set(7, 12, OUTLINE);
  g.line(12, 37, 21, 32, '#c084fc', 2.4);
  g.line(17, 36, 22, 43, '#4c1d95', 2.2);

  return g.compile(OUTLINE);
}

function buildWyrm(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Orbiting Cosmic Void Shard Crystals
  g.poly([[8, 9], [10, 12], [8, 15], [6, 12]], '#a5f3fc', false);
  g.poly([[54, 13], [56, 16], [54, 19], [52, 16]], '#a5f3fc', false);

  // TRUE Continuous Sinuous S-Curved Serpentine Leviathan Body (NO disconnected bead circles!)
  const spine: readonly [number, number][] = [
    [18, 20], [26, 22], [33, 27], [34, 35], [27, 43],
    [25, 50], [33, 53], [43, 50], [50, 42], [54, 33],
  ];
  for (let i = 0; i < spine.length - 1; i++) {
    const [x0, y0] = spine[i];
    const [x1, y1] = spine[i + 1];
    const thick = Math.max(4, 11.5 - i * 0.7);
    g.line(x0, y0, x1, y1, '#1e1b4b', thick);
  }
  // Glowing Cyan Belly Scutes smoothly layered along the lower curve of the serpent
  for (let i = 0; i < spine.length - 1; i++) {
    const [x0, y0] = spine[i];
    const [x1, y1] = spine[i + 1];
    const thick = Math.max(2, 5.2 - i * 0.35);
    g.line(x0 - 1, y0 + 2, x1 - 1, y1 + 2, '#06b6d4', thick);
    g.set(Math.round((x0 + x1) / 2), Math.round((y0 + y1) / 2 + 2), '#67e8f9');
  }

  // Swept Trident Leviathan Fin-Tail whipping up right
  g.poly([[53, 33], [58, 20], [62, 26], [59, 34], [55, 37]], '#06b6d4');
  g.line(54, 33, 59, 22, '#a5f3fc', 1.6);

  // Jagged Crystalline Dorsal Spine Fins down neck & back
  for (const [fx, fy] of [[21, 14], [28, 17], [35, 22], [38, 30], [49, 38]]) {
    g.poly([[fx - 2, fy + 3], [fx + 3, fy - 4], [fx + 4, fy + 4]], '#67e8f9');
  }

  // Fierce Horned Void-Leviathan Skull + Swept Void Horns + Fanged Jaws + Cosmic Breath
  g.line(18, 12, 25, 4, '#06b6d4', 2.8);
  g.line(25, 4, 29, 3, '#a5f3fc', 1.8);
  g.line(14, 12, 19, 6, '#06b6d4', 2);
  g.poly([[23, 13], [12, 12], [5, 16], [6, 20], [20, 20]], '#1e1b4b');
  g.line(12, 12, 21, 13, '#312e81', 1.6);
  g.poly([[20, 22], [7, 24], [10, 28], [22, 26]], '#312e81');
  g.eye(12, 15, '#67e8f9', '#ffffff');
  g.set(7, 20, '#ffffff');
  g.set(11, 20, '#ffffff');
  g.set(8, 24, '#ffffff');
  g.set(12, 24, '#ffffff');
  g.poly([[7, 20], [2, 19], [3, 22], [7, 22]], '#67e8f9', false);

  return g.compile(OUTLINE);
}

function buildPhoenix(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Cascading Swirling Crimson & Gold Flame-Tail Plumes
  g.poly([[26, 40], [38, 40], [45, 57], [38, 51], [32, 61], [27, 51], [20, 58]], '#dc2626');
  g.poly([[28, 41], [36, 41], [40, 55], [32, 57], [26, 54]], '#f97316');
  g.line(32, 41, 32, 59, '#fef08a', 2);

  // LEFT & RIGHT Majestic Layered Flame Wings (with Primary + Secondary Covert Feathers!)
  g.poly([[27, 25], [13, 9], [3, 13], [6, 23], [14, 30], [25, 31]], '#dc2626');
  g.poly([[25, 24], [14, 12], [6, 15], [10, 24], [22, 28]], '#fb923c');
  g.line(25, 23, 12, 11, '#fef08a', 2);
  for (const [fx, fy] of [[5, 16], [8, 21], [12, 26]]) {
    g.line(18, 21, fx, fy, OUTLINE, 1);
  }

  g.poly([[36, 25], [50, 9], [60, 13], [57, 23], [49, 30], [38, 31]], '#dc2626');
  g.poly([[38, 24], [49, 12], [57, 15], [53, 24], [41, 28]], '#fb923c');
  g.line(38, 23, 51, 11, '#fef08a', 2);
  for (const [fx, fy] of [[58, 16], [55, 21], [51, 26]]) {
    g.line(45, 21, fx, fy, OUTLINE, 1);
  }

  // Radiant Solar Firebird Chest Plumage
  g.oval(31.5, 30, 7.5, 11, '#fb923c', '#fef08a', '#dc2626');
  g.oval(31.5, 29, 4.2, 6.8, '#facc15', '#ffffff');

  // Swept Graceful Trailing Fire Crest Plumes + Raptor Head + Hooked Beak
  g.poly([[29, 12], [32, 4], [34, 10], [40, 3], [37, 11], [45, 7], [36, 15]], '#fef08a');
  g.line(34, 10, 41, 5, '#fb923c', 1.2);
  g.oval(31, 16, 5.5, 5.2, '#fb923c', '#fef08a', '#ea580c');
  g.poly([[26, 15], [18, 17], [20, 21], [26, 19]], '#facc15');
  g.set(18, 18, '#b45309');
  g.eye(27, 15, '#ffffff', '#dc2626');

  // Muscular Raptor Thighs & Sharp Hooked Golden Talons
  for (const tx of [25, 36]) {
    g.oval(tx, 39, 2.8, 3, '#ea580c', '#fb923c', '#dc2626');
    g.line(tx, 41, tx - 1, 46, '#facc15', 2);
    g.poly([[tx - 1, 46], [tx - 5, 49], [tx - 2, 50]], '#fef08a');
    g.poly([[tx, 46], [tx + 3, 49], [tx + 1, 50]], '#facc15');
  }

  return g.compile(OUTLINE);
}

function buildOverlord(): CompiledRect[] {
  const g = new PixelGrid(64, 64);
  // Crimson-Rose Cosmic Archon Halo Ring behind Shoulders (distinct from the Gold Crown!)
  g.oval(31, 20, 16, 16, '#f43f5e', undefined, undefined, false);
  g.oval(31, 20, 14, 14, OUTLINE, undefined, undefined, false);
  for (const [rx, ry] of [[31, 4], [15, 20], [47, 20]]) {
    g.rect(rx - 1, ry - 1, 3, 3, '#fda4af', false);
  }

  // Towering Twin-Crescent Astral Halberd wielded on Right
  g.line(54, 14, 54, 60, '#475569', 2.4);
  g.poly([[54, 4], [58, 10], [54, 18], [50, 10]], '#fbbf24');
  g.poly([[50, 10], [45, 14], [52, 16]], '#f43f5e');
  g.poly([[58, 10], [62, 14], [56, 16]], '#f43f5e');

  // Sweeping Jagged Imperial Cape & Arcane Levitation Aura below Greaves
  g.poly([[18, 25], [45, 25], [51, 54], [41, 58], [31, 52], [21, 58], [12, 53]], '#500724');
  g.poly([[21, 26], [42, 26], [44, 51], [31, 49], [19, 51]], '#831843');
  g.line(21, 26, 16, 52, '#f59e0b', 1.2);
  g.line(42, 26, 46, 52, '#f59e0b', 1.2);

  // Floating Imperial Armored Greaves + Golden Sabatons
  g.line(26, 43, 23, 55, '#500724', 4.6);
  g.line(37, 43, 40, 55, '#500724', 4.6);
  g.rect(20, 54, 6, 4, '#f59e0b');
  g.rect(37, 54, 6, 4, '#f59e0b');

  // Ornate Armored Breastplate + Crimson Rune Gem + Dark Crimson Tassets with Gold Trim
  g.poly([[21, 23], [42, 23], [40, 44], [23, 44]], '#831843');
  g.poly([[26, 24], [37, 24], [35, 39], [28, 39]], '#b45309');
  g.poly([[28, 26], [35, 26], [34, 37], [29, 37]], '#500724');
  g.oval(31.5, 31, 2.2, 2.6, '#f43f5e', '#fef08a');
  g.poly([[22, 41], [30, 41], [29, 48], [21, 46]], '#500724');
  g.line(21, 46, 29, 48, '#d97706', 1.2);
  g.poly([[33, 41], [41, 41], [42, 46], [34, 48]], '#500724');
  g.line(34, 48, 42, 46, '#d97706', 1.2);

  // Colossal Winged Golden Sovereign Pauldrons
  g.poly([[22, 24], [10, 19], [12, 27], [21, 29]], '#f59e0b');
  g.line(11, 20, 21, 25, '#fef08a', 1.4);
  g.poly([[41, 24], [53, 19], [51, 27], [42, 29]], '#f59e0b');
  g.line(42, 25, 52, 20, '#fef08a', 1.4);

  // Sculpted Horned Sovereign War-Helm & Sharp Crown (NOT a flat square face!)
  g.poly([[24, 21], [23, 12], [31, 8], [40, 12], [39, 21], [31, 23]], '#3b0764');
  g.poly([[23, 13], [21, 4], [27, 9], [31, 2], [35, 9], [41, 4], [39, 13]], '#d97706');
  g.line(23, 12, 39, 12, '#fbbf24', 1);
  // Swept Demon-Helm Cheek Plates & Angled Dark Visor Slit with Glowing Rose-Gold Eyes
  g.poly([[23, 13], [27, 13], [28, 21], [24, 20]], '#b45309');
  g.poly([[35, 13], [39, 13], [38, 20], [34, 21]], '#b45309');
  g.poly([[26, 14], [36, 14], [34, 19], [28, 19]], OUTLINE);
  g.line(27, 15, 30, 16, '#f43f5e', 1.4);
  g.line(32, 16, 35, 15, '#f43f5e', 1.4);
  g.set(29, 16, '#fef08a');
  g.set(33, 16, '#fef08a');

  // Right Arm gripping Halberd + Left Arm conjuring Open Illuminated Arcane Grimoire
  g.line(44, 27, 53, 31, '#831843', 3.4);
  g.oval(54, 31, 2, 2, '#d97706');
  g.line(19, 27, 13, 31, '#831843', 3.4);
  g.oval(12, 31, 2, 2, '#fbcfe8');
  g.poly([[3, 22], [8, 25], [8, 33], [3, 30]], '#78350f');
  g.poly([[4, 23], [8, 25], [8, 32], [4, 30]], '#fef3c7');
  g.poly([[8, 25], [13, 22], [13, 30], [8, 33]], '#78350f');
  g.poly([[8, 25], [12, 23], [12, 30], [8, 32]], '#fde68a');
  g.line(8, 25, 8, 33, '#500724', 1.2);
  g.set(5, 27, '#ec4899');
  g.set(10, 27, '#ec4899');
  g.set(8, 20, '#f43f5e', false);

  return g.compile(OUTLINE);
}

export const BOSS_ENEMY_SPRITES: Record<BossSpriteKey, CompiledRect[]> = {
  boss_treant: buildTreant(),
  boss_ogre: buildOgre(),
  boss_lich: buildLich(),
  boss_dragon: buildDragon(),
  boss_titan: buildTitan(),
  boss_deathknight: buildDeathKnight(),
  boss_wyrm: buildWyrm(),
  boss_phoenix: buildPhoenix(),
  boss_overlord: buildOverlord(),
};
