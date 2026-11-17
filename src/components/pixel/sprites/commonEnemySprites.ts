import { CompiledRect, PixelGrid } from './pixelUtils';

const OUTLINE = '#0d0a18';

export type CommonSpriteKey =
  | 'goblin'
  | 'bandit'
  | 'skeleton'
  | 'slime'
  | 'wolf'
  | 'harpy'
  | 'golem'
  | 'mushroom'
  | 'imp'
  | 'mimic'
  | 'wraith'
  | 'drake'
  | 'cultist';

function buildGoblin(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Swept pointed goblin ears (far & near with inner cartilage ridge)
  g.poly([[16, 13], [8, 9], [15, 17]], '#14532d');
  g.poly([[27, 13], [40, 6], [38, 12], [28, 18]], '#16a34a');
  g.line(29, 13, 37, 9, '#fda4af', 1);
  g.line(30, 15, 36, 12, '#15803d', 1);

  // Back buckler shield (3/4 angled oak + hammered iron rim & boss)
  g.oval(37, 26, 5.2, 6.6, '#78350f', '#92400e', '#451a03');
  g.oval(36.5, 26, 3.8, 5.1, '#5c2b09', '#78350f', '#451a03');
  g.line(35, 22, 35, 30, '#451a03', 1);
  g.oval(36.5, 26, 1.9, 2.3, '#64748b', '#cbd5e1', '#334155');
  g.set(37, 21, '#fbbf24');
  g.set(37, 31, '#fbbf24');

  // Sculpted Goblin Cranium + Brow Ridge + Hooked Nose + Jagged Fanged Grin
  g.oval(22, 14, 6.6, 6, '#16a34a', '#4ade80', '#14532d');
  g.poly([[17, 9], [19, 4], [22, 7], [25, 3], [27, 8], [29, 6], [28, 10]], '#1e293b');
  g.line(19, 5, 21, 8, '#475569', 1);
  g.poly([[16, 14], [10, 16], [15, 17.5]], '#22c55e');
  g.set(12, 15, '#4ade80');
  g.line(16, 12, 20, 13, OUTLINE, 1);
  g.line(22, 13, 26, 12, OUTLINE, 1);
  g.eye(17, 14, '#fef08a', '#dc2626');
  g.eye(23, 14, '#fef08a', '#dc2626');
  g.rect(16, 18, 8, 2, OUTLINE);
  g.set(17, 18, '#fef3c7');
  g.set(19, 19, '#e2e8f0');
  g.set(22, 18, '#fef3c7');

  // Stitched Boiled-Leather Jerkin, Bandolier & Tattered Loincloth
  g.poly([[18, 20], [29, 20], [30, 31], [18, 31]], '#78350f');
  g.poly([[19, 21], [25, 21], [25, 28], [19, 28]], '#92400e');
  g.line(19, 20, 29, 29, '#451a03', 2);
  g.set(22, 23, '#fbbf24');
  g.set(25, 26, '#fbbf24');
  g.rect(18, 30, 12, 2, '#451a03');
  g.rect(21, 29, 3, 4, '#d97706');
  g.poly([[18, 32], [30, 32], [29, 36], [24, 34], [20, 36]], '#14532d');

  // Muscular Bent Legs, Leather Shin Wraps & Clawed Boots
  g.line(20, 34, 16, 40, '#16a34a', 3.4);
  g.line(28, 34, 30, 40, '#14532d', 3.4);
  g.rect(13, 40, 6, 4, '#78350f');
  g.rect(12, 42, 7, 2, '#451a03');
  g.rect(28, 40, 6, 4, '#5c2b09');
  g.rect(27, 42, 7, 2, '#451a03');
  g.set(12, 43, '#4ade80');
  g.set(27, 43, '#22c55e');

  // Lead Arm + Leather Wristguard + Jagged Goblin Scimitar (beveled blade + bloodied notch)
  g.line(19, 22, 12, 27, '#22c55e', 2.8);
  g.rect(11, 25, 3, 2, '#78350f');
  g.oval(11, 27, 2, 2, '#4ade80');
  g.poly([[10, 26], [6, 19], [4, 10], [7, 7], [10, 11], [8, 19], [12, 25]], '#64748b');
  g.line(5, 10, 7, 19, '#f1f5f9', 1.2);
  g.set(7, 8, '#ffffff');
  g.set(6, 15, '#991b1b');
  g.line(8, 24, 13, 27, '#d97706', 1.6);
  g.line(11, 27, 12, 30, '#451a03', 1.6);

  return g.compile(OUTLINE);
}

function buildBandit(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Billowing Weathered Cloak & Crimson Scarf Tails
  g.poly([[27, 17], [38, 22], [43, 35], [36, 40], [29, 36]], '#1e293b');
  g.line(30, 22, 39, 36, '#334155', 1.2);
  g.line(32, 28, 35, 38, '#0f172a', 1);
  g.poly([[27, 15], [40, 12], [36, 17]], '#991b1b');
  g.poly([[27, 16], [38, 19], [34, 21]], '#dc2626');

  // Sharp Peaked Assassin Hood + Shadowed Brow + Crimson Mask
  g.poly([[16, 14], [19, 5], [29, 5], [33, 10], [29, 17]], '#1e293b');
  g.poly([[19, 7], [27, 6], [29, 11], [20, 10]], '#334155');
  g.oval(22, 13, 5.2, 5, '#0f172a', '#1e293b', '#090d16');
  g.rect(17, 10, 9, 4, '#090d16');
  g.eye(17, 12, '#fef08a', '#ffffff');
  g.eye(23, 12, '#fef08a', '#ffffff');
  g.poly([[16, 14], [27, 14], [26, 19], [18, 19]], '#991b1b');
  g.line(18, 15, 25, 15, '#dc2626', 1.2);
  g.line(19, 17, 24, 17, '#7f1d1d', 1);

  // Layered Leather Cuirass + Shoulder Guards + Buckled Bandolier
  g.poly([[17, 19], [29, 19], [30, 31], [17, 31]], '#334155');
  g.poly([[18, 20], [26, 20], [25, 27], [18, 27]], '#475569');
  g.oval(17, 21, 2.8, 2.2, '#78350f', '#92400e', '#451a03');
  g.line(18, 20, 28, 30, '#78350f', 2.2);
  g.set(20, 22, '#fbbf24');
  g.set(23, 25, '#fbbf24');
  g.set(26, 28, '#fbbf24');
  g.rect(17, 29, 13, 2.5, '#451a03');
  g.rect(21, 29, 3, 3, '#d97706');

  // Dynamic Lunge Trousers + Strapped Knee Pads + Cuffed Boots
  g.line(19, 31, 14, 39, '#1e293b', 3.8);
  g.line(27, 31, 31, 39, '#0f172a', 3.8);
  g.oval(16, 36, 2, 1.6, '#475569');
  g.oval(29, 36, 2, 1.6, '#334155');
  g.rect(11, 38, 6, 6, '#78350f');
  g.line(11, 39, 16, 39, '#92400e', 1);
  g.rect(10, 42, 7, 2, '#451a03');
  g.rect(29, 38, 6, 6, '#5c2b09');
  g.rect(28, 42, 7, 2, '#451a03');

  // Back Arm + Leather Bracer + Reversed Dirk
  g.line(29, 21, 35, 26, '#334155', 2.6);
  g.rect(34, 24, 3, 3, '#78350f');
  g.oval(36, 26, 1.8, 1.8, '#e5a97c');
  g.poly([[36, 25], [43, 17], [39, 27]], '#cbd5e1');
  g.set(42, 18, '#ffffff');
  g.rect(35, 24, 2, 3, '#d97706');

  // Lead Arm + Leather Bracer + Forward Steel Dagger
  g.line(18, 21, 12, 26, '#475569', 2.8);
  g.rect(11, 24, 3, 3, '#78350f');
  g.oval(11, 26, 1.9, 1.9, '#fbd3b0');
  g.poly([[10, 25], [2, 20], [3, 23], [9, 27]], '#94a3b8');
  g.line(3, 21, 9, 25, '#f8fafc', 1.2);
  g.rect(9, 24, 2, 4, '#d97706');

  return g.compile(OUTLINE);
}

function buildSkeleton(): CompiledRect[] {
  const g = new PixelGrid(48, 48);

  // Ragged Legionnaire Crimson Cloak billowing behind right shoulder (deep shadow near leg)
  g.poly([[27, 18], [38, 22], [43, 35], [38, 39], [34, 34], [29, 38], [26, 31]], '#450a0a');
  g.poly([[29, 20], [37, 23], [40, 33], [32, 33]], '#991b1b');
  g.line(32, 22, 39, 33, '#7f1d1d', 1);

  // Back Shield Arm + 3/4 Angled Battered Round Iron-Rim Legion Shield
  g.line(28, 21, 34, 26, '#a8a29e', 2);
  g.oval(37, 26, 6.2, 7.6, '#475569', '#94a3b8', '#1e293b');
  g.oval(36.2, 26, 4.6, 5.9, '#7f1d1d', '#991b1b', '#450a0a');
  g.line(34, 21, 38, 25, '#334155', 1); // Battle dent/crack
  g.oval(36, 26, 2.2, 2.6, '#94a3b8', '#e2e8f0', '#334155');
  g.set(36, 21, '#d97706');
  g.set(36, 31, '#d97706');

  // Dynamic 3/4 Lunging Skeletal Legs (Femur -> Patella -> Tibia) + Rusted Iron Greaves & Sabatons
  // Back right leg braced behind
  g.line(26, 32, 30, 37, '#a8a29e', 2.2);
  g.oval(30, 37, 1.8, 1.8, '#d6d3d1');
  g.line(30, 38, 31, 41, '#78716c', 2);
  g.poly([[28, 40], [34, 40], [34, 44], [27, 44]], '#334155');
  g.rect(27, 42, 7, 2, '#1e293b');

  // Lead left leg stepped forward in dynamic knee-bend lunge
  g.line(19, 32, 14, 37, '#e7e5e4', 2.4);
  g.oval(14, 37, 2, 1.8, '#fef9c3');
  g.poly([[12, 38], [18, 38], [17, 44], [11, 44]], '#475569');
  g.line(13, 39, 13, 43, '#94a3b8', 1.2);
  g.rect(10, 42, 7, 2, '#1e293b');

  // Sculpted Iliac Pelvis Bone + Leather War Belt + Ragged Legion Tabard Tatter (NO cartoon shorts!)
  g.poly([[17, 29], [28, 29], [27, 33], [24, 31], [21, 33], [18, 32]], '#d6d3d1');
  g.rect(17, 28, 12, 2, '#451a03');
  g.rect(20, 28, 3, 2.4, '#d97706');
  g.poly([[18, 30], [24, 30], [23, 36], [20, 34], [17, 36]], '#7f1d1d');
  g.line(19, 31, 19, 35, '#991b1b', 1);

  // 3/4 Tilted Spine, Hollowed Chest Void, Sternum, Clavicles & Curved Anatomical Ribcage
  g.poly([[17, 19], [28, 20], [27, 29], [17, 29]], '#0f172a');
  g.line(23, 18, 24, 29, '#78716c', 2.2); // Thoracic spine behind
  g.line(20, 20, 20, 27, '#d6d3d1', 1.8); // Sternum bone
  // Clavicles sweeping across upper chest
  g.line(15, 19, 20, 20, '#fef9c3', 1.4);
  g.line(21, 20, 28, 19, '#d6d3d1', 1.4);
  // 4 pairs of curved 3/4 ribs wrapping left-to-right around hollow cavity
  for (const [ry, rxL, rxR] of [[21, 16, 27], [23, 16, 27], [25, 17, 26], [27, 18, 25]]) {
    g.line(rxL, ry, 20, ry + 1, '#fef9c3', 1.2);
    g.line(21, ry + 1, rxR, ry, '#a8a29e', 1.2);
  }
  // Diagonal rusted leather sword-belt strap across ribs
  g.line(26, 20, 18, 28, '#5c2b09', 1.6);

  // Battered Iron Legionnaire Pauldrons (Lead spiked + Back smaller)
  g.poly([[14, 20], [18, 18], [20, 22], [15, 23]], '#64748b');
  g.line(15, 19, 18, 19, '#cbd5e1', 1);
  g.oval(28, 21, 2.8, 2.2, '#475569', '#94a3b8', '#1e293b');

  // 3/4 Anatomical Skull + Zygomatic Cheekbone + Jaw + Cracked Iron Spangenhelm with Crimson Crest
  // Cervical spine neck
  g.rect(21, 17, 3, 3, '#a8a29e');
  // Cranium angled left
  g.oval(21.5, 11.5, 5.4, 5.2, '#e7e5e4', '#fef9c3', '#a8a29e');
  // Prominent brow ridge & sunken dark orbital eye sockets with eerie crimson embers
  g.rect(16, 10, 4, 3.5, OUTLINE);
  g.rect(22, 10, 3.5, 3.5, OUTLINE);
  g.set(17, 11, '#ef4444');
  g.set(18, 12, '#fef08a');
  g.set(23, 11, '#ef4444');
  g.set(24, 12, '#fef08a');
  // Triangular dark nasal cavity + cheekbone highlight
  g.poly([[19, 13], [21, 13], [20, 15]], OUTLINE);
  g.set(22, 14, '#fef9c3');
  // Sculpted hinged mandible & distinct teeth
  g.poly([[17, 15], [24, 15], [23, 18.5], [18, 18.5]], '#d6d3d1');
  g.line(17, 16, 23, 16, OUTLINE, 1);
  for (const tx of [17, 19, 21, 23]) g.set(tx, 16, '#fef9c3');

  // Cracked Iron Legionnaire Spangenhelm & Ragged Crimson Horsehair Crest
  g.poly([[15, 10], [17, 5], [22, 4], [27, 6], [28, 11], [23, 10], [16, 10]], '#475569');
  g.line(16, 9, 27, 9, '#94a3b8', 1.2); // Brow rim band
  g.rect(19, 8, 2, 4, '#64748b'); // Iron nasal guard bar
  g.set(24, 7, '#0f172a'); // Battle dent crack
  // Swept ragged crimson plume crest curving back
  g.poly([[20, 4], [23, 1], [30, 3], [32, 8], [26, 6]], '#991b1b');
  g.line(22, 3, 29, 5, '#dc2626', 1.2);

  // Lead Bony Sword Arm + Rusted Bracer + Chipped Iron Legionnaire Gladius
  g.line(16, 21, 11, 26, '#d6d3d1', 2);
  g.oval(13, 24, 1.4, 1.4, '#fef9c3');
  g.rect(9, 25, 3, 2.5, '#475569');
  g.oval(9, 27, 1.8, 1.8, '#e7e5e4');
  // Beveled notched broadsword angled aggressively forward-up
  g.poly([[9, 26], [3, 11], [1, 8], [5, 10], [11, 25]], '#94a3b8');
  g.line(2, 9, 9, 25, '#f8fafc', 1.2);
  g.set(4, 15, OUTLINE); // Battle notch
  g.set(6, 19, '#991b1b'); // Dry crimson stain
  g.line(6, 25, 12, 27, '#d97706', 1.6); // Brass crossguard
  g.line(10, 27, 12, 30, '#451a03', 1.6); // Leather grip
  g.set(12, 30, '#d97706'); // Pommel

  return g.compile(OUTLINE);
}

function buildSlime(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Suspended Toxic Spore/Acid Droplets
  g.oval(10, 12, 1.6, 1.8, '#9333ea', '#e9d5ff', '#581c87', false);
  g.oval(37, 10, 1.4, 1.6, '#9333ea', '#e9d5ff', '#581c87', false);

  // Spreading Corrosive Puddle Base + Crawling Gel Pseudopods
  g.oval(24, 41, 18, 3.2, '#4c1d95', '#7e22ce', '#2e1065');
  g.oval(10, 41, 5, 2.6, '#581c87', '#9333ea', '#2e1065');
  g.oval(38, 41, 5, 2.6, '#581c87', '#9333ea', '#2e1065');

  // Deep Translucent Layered Ooze Dome (Dark abyssal outer -> translucent mid -> glowing deep core)
  g.poly([
    [9, 41], [8, 31], [11, 22], [17, 16], [26, 15], [34, 19], [39, 29], [39, 41],
  ], '#6b21a8');
  g.oval(23, 29, 13, 11, '#7e22ce', '#a855f7', '#4c1d95');
  g.oval(24, 31, 9.5, 8, '#3b0764', '#581c87', '#1e1b4b');

  // Dissolved Adventurer Skull + Floating Femur + Broken Sword Blade cleanly INSIDE Gel Core
  g.oval(24, 24, 3.6, 3.2, '#94a3b8', '#cbd5e1', '#475569');
  g.set(22, 24, '#3b0764');
  g.set(25, 24, '#3b0764');
  g.set(23, 26, '#475569');
  g.line(15, 31, 20, 29, '#94a3b8', 1.4); // Rib bone
  g.line(29, 25, 34, 30, '#cbd5e1', 1.5); // Dissolved blade inside dome
  g.line(31, 23, 34, 26, '#b45309', 1.4); // Hilt inside dome

  // Eerie Bioluminescent Ooze Eyes peering deep from the shadowed core
  g.oval(17, 32, 2.3, 1.9, '#f59e0b', '#fef08a', '#b45309');
  g.set(16, 32, '#0d0a18');
  g.set(17, 31, '#ffffff');
  g.oval(29, 32, 2.3, 1.9, '#f59e0b', '#fef08a', '#b45309');
  g.set(28, 32, '#0d0a18');
  g.set(29, 31, '#ffffff');

  // Viscous Dripping Caustic Maw Crest + Wet Specular Jelly Highlight Rim
  g.poly([[16, 36], [30, 36], [28, 40], [24, 38], [19, 40]], '#1e1b4b');
  g.poly([[18, 36], [20, 36], [19, 38]], '#c084fc');
  g.poly([[23, 36], [25, 36], [24, 39]], '#e9d5ff');
  g.poly([[27, 36], [29, 36], [28, 38]], '#c084fc');
  // Crisp liquid specular highlights hugging top-left gel curve
  g.poly([[11, 26], [13, 20], [19, 17], [17, 20], [13, 24]], '#e9d5ff');
  g.set(15, 19, '#ffffff');
  g.set(17, 18, '#ffffff');
  g.line(34, 23, 37, 31, '#9333ea', 1.4);

  return g.compile(OUTLINE);
}

function buildWolf(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Bushy Tapered Silver-Tipped Tail sweeping right
  g.poly([[34, 24], [43, 15], [45, 19], [41, 27], [34, 28]], '#334155');
  g.poly([[39, 18], [44, 15], [45, 19], [42, 22]], '#cbd5e1');
  g.line(36, 24, 43, 17, '#475569', 1.2);

  // Far Legs (darker shaded silhouette depth)
  g.line(21, 31, 23, 38, '#1e293b', 3);
  g.line(23, 38, 21, 43, '#1e293b', 2.4);
  g.rect(19, 42, 4, 2, '#cbd5e1');
  g.line(33, 30, 36, 37, '#1e293b', 3.2);
  g.line(36, 37, 34, 43, '#1e293b', 2.4);
  g.rect(32, 42, 4, 2, '#cbd5e1');

  // Lean Muscular Wolf Torso + Dark Spine Fur Ridge
  g.poly([[17, 21], [29, 22], [35, 24], [35, 31], [28, 32], [18, 31]], '#475569');
  g.line(18, 22, 33, 24, '#334155', 2);
  g.line(20, 30, 30, 31, '#94a3b8', 1);

  // Near Hind Thigh + Hock + Razor Claws
  g.oval(31, 28, 4.6, 5.2, '#475569', '#64748b', '#1e293b');
  g.line(32, 32, 34, 37, '#475569', 3);
  g.line(34, 37, 30, 43, '#334155', 2.5);
  g.rect(28, 42, 4, 2, '#e2e8f0');
  g.set(27, 43, '#ffffff');

  // Near Front Foreleg Lunging Forward
  g.line(19, 29, 14, 36, '#64748b', 3.2);
  g.line(14, 36, 11, 43, '#475569', 2.6);
  g.rect(9, 42, 4, 2, '#f8fafc');
  g.set(8, 43, '#ffffff');

  // Shaggy Layered Wolf Ruff & Neck Mane
  g.poly([[12, 18], [21, 18], [24, 26], [19, 32], [14, 28]], '#64748b');
  g.poly([[14, 20], [19, 20], [21, 26], [16, 29]], '#94a3b8');
  g.line(15, 25, 19, 30, '#475569', 1);

  // Sculpted Wolf Head, Pointed Ears, Elongated Snout, Fangs & Scowl
  g.poly([[12, 15], [14, 8], [17, 14]], '#475569');
  g.poly([[15, 14], [18, 7], [21, 15]], '#64748b');
  g.set(18, 10, '#fda4af');
  g.oval(14, 17, 5.5, 4.5, '#64748b', '#94a3b8', '#334155');
  g.poly([[11, 16], [4, 18], [4, 20], [12, 20]], '#64748b');
  g.rect(3, 18, 2.5, 2, OUTLINE);
  g.poly([[12, 20], [6, 21], [8, 24], [14, 23]], '#991b1b');
  g.poly([[12, 22], [5, 23], [7, 25], [15, 24]], '#475569');
  g.set(6, 20, '#ffffff');
  g.set(9, 20, '#ffffff');
  g.set(7, 23, '#ffffff');
  g.set(10, 23, '#ffffff');
  g.line(10, 15, 14, 16, OUTLINE, 1);
  g.eye(11, 17, '#facc15', '#ffffff');

  return g.compile(OUTLINE);
}

function buildHarpy(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Swooping Layered Storm-Slate & Cobalt Harpy Wing with Individual Primary Pinions
  g.poly([[23, 21], [35, 8], [45, 7], [42, 17], [36, 25], [27, 27]], '#0f172a');
  g.poly([[24, 19], [34, 8], [43, 6], [40, 14], [35, 20], [26, 23]], '#0369a1');
  g.poly([[24, 19], [31, 11], [37, 10], [34, 16], [26, 20]], '#38bdf8');
  g.line(25, 18, 41, 7, '#bae6fd', 1.4);
  for (const [fx, fy] of [[43, 10], [41, 14], [39, 18], [37, 22]]) {
    g.line(31, 17, fx, fy, OUTLINE, 1);
  }
  // Fanned Storm Tail Feathers
  g.poly([[23, 28], [34, 34], [30, 39], [21, 33]], '#0369a1');
  g.line(24, 30, 32, 35, '#7dd3fc', 1);

  // Swept Feathered Crest Plumes + Fierce Angular Predator Face + Hooked Keratin Beak
  g.poly([[15, 11], [20, 5], [27, 6], [24, 10], [29, 10], [23, 13]], '#0284c7');
  g.line(17, 9, 25, 7, '#7dd3fc', 1.2);
  g.line(20, 10, 27, 10, '#38bdf8', 1);
  g.oval(17, 13, 4.4, 4.4, '#e5a97c', '#fbd3b0', '#b45309');
  g.poly([[13, 12], [7, 14], [9, 17], [13, 16]], '#d97706');
  g.set(7, 15, '#78350f');
  g.set(9, 14, '#fef08a');
  g.line(12, 11, 16, 12, OUTLINE, 1);
  g.eye(13, 13, '#ef4444', '#ffffff');

  // Feathered Shoulder Mantle + Leather Harness Torso
  g.poly([[15, 19], [25, 19], [24, 28], [16, 28]], '#0369a1');
  g.oval(19.5, 21, 3.2, 2.8, '#e5a97c', '#fbd3b0');
  g.line(16, 20, 24, 26, '#78350f', 1.6);
  g.line(16, 25, 24, 25, '#451a03', 1.8);

  // Feathered Wing-Arm + Hooked Wing Claws
  g.line(16, 19, 9, 25, '#0284c7', 3);
  g.line(12, 22, 7, 25, '#38bdf8', 1.2);
  g.poly([[10, 24], [5, 23], [6, 27], [10, 27]], '#d97706');
  g.set(4, 23, '#f8fafc');
  g.set(5, 26, '#f8fafc');

  // Plumed Raptor Thighs + Scaled Avian Shins + Curved Obsidian Talons
  g.poly([[16, 28], [20, 28], [18, 35], [14, 34]], '#0369a1');
  g.poly([[21, 28], [26, 28], [25, 35], [21, 35]], '#0f172a');
  for (const tx of [14, 23]) {
    g.line(tx + 1, 35, tx, 39, '#92400e', 2);
    g.poly([[tx, 39], [tx - 4, 41], [tx - 2, 43]], '#d97706');
    g.poly([[tx + 1, 39], [tx + 1, 43], [tx + 3, 42]], '#d97706');
    g.set(tx - 4, 42, '#f8fafc');
    g.set(tx + 2, 43, '#f8fafc');
  }

  return g.compile(OUTLINE);
}

function buildGolem(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Craggy Back Boulder Arm & Hanging Moss
  g.poly([[32, 16], [40, 15], [42, 23], [34, 24]], '#475569');
  g.line(37, 23, 39, 32, '#334155', 5.2);
  g.poly([[35, 31], [43, 30], [44, 37], [37, 38]], '#334155');
  g.line(36, 33, 42, 33, '#1e293b', 1);

  // Chiseled Interlocking Granite Slab Torso + Etched Cyan Rune Core + Cracks + Moss
  g.poly([[13, 14], [34, 15], [32, 32], [15, 32]], '#475569');
  g.poly([[15, 16], [28, 16], [26, 25], [16, 25]], '#64748b');
  g.line(16, 17, 27, 17, '#94a3b8', 1.2); // Bevel top edge
  g.line(16, 25, 20, 29, '#1e293b', 1.2); // Deep granite crack
  g.line(27, 24, 31, 28, '#1e293b', 1);
  // Glowing Embedded Cyan Rune Crystal
  g.poly([[22, 18], [26, 22], [22, 27], [18, 22]], OUTLINE);
  g.poly([[22, 19], [25, 22], [22, 26], [19, 22]], '#0284c7');
  g.oval(22, 22, 1.6, 2, '#38bdf8', '#e0f2fe');
  // Natural Creeping Moss Clumps on right shoulder/chest
  g.poly([[27, 14], [33, 14], [34, 18], [29, 18]], '#15803d');
  g.set(29, 15, '#22c55e');
  g.set(32, 16, '#4ade80');

  // Sculpted Craggy Stone Monolith Head with Chiseled Crest & Twin Glowing Runic Eyes
  g.poly([[15, 15], [16, 7], [20, 4], [25, 4], [29, 7], [30, 15]], '#57534e');
  g.poly([[17, 7], [21, 5], [25, 5], [27, 9], [17, 9]], '#78716c');
  g.line(15, 10, 29, 10, '#1e293b', 1.6); // Heavy craggy stone brow overhang
  g.rect(17, 11, 3, 2, OUTLINE);
  g.rect(23, 11, 3, 2, OUTLINE);
  g.set(18, 11, '#38bdf8');
  g.set(19, 11, '#e0f2fe');
  g.set(24, 11, '#38bdf8');
  g.set(25, 11, '#e0f2fe');
  g.line(18, 14, 26, 14, '#292524', 1); // Carved stone jaw fissure

  // Heavy Layered Granite Waist & Pillar Legs
  g.poly([[15, 30], [32, 30], [31, 34], [16, 34]], '#334155');
  g.set(22, 31, '#38bdf8');
  g.set(23, 32, '#e0f2fe');
  g.poly([[15, 34], [21, 34], [20, 41], [14, 41]], '#57534e');
  g.poly([[25, 34], [31, 34], [31, 41], [26, 41]], '#44403c');
  g.poly([[12, 40], [21, 40], [21, 44], [11, 44]], '#292524');
  g.poly([[24, 40], [33, 40], [34, 44], [24, 44]], '#1c1917');
  g.line(13, 37, 20, 37, '#78716c', 1.2);

  // Massive Jagged Lead Boulder Shoulder + Rough-Hewn Stone Wrecking-Fist
  g.poly([[6, 18], [12, 12], [18, 15], [19, 22], [11, 24], [7, 22]], '#78716c');
  g.poly([[8, 17], [13, 13], [17, 16], [11, 20]], '#a8a29e');
  g.line(10, 17, 15, 22, '#292524', 1); // Crag crack
  g.rect(10, 13, 3, 2, '#16a34a'); // Shoulder moss patch
  g.line(11, 22, 7, 30, '#57534e', 5.2);
  g.poly([[3, 29], [11, 28], [12, 36], [4, 37]], '#78716c');
  g.line(4, 31, 10, 31, OUTLINE, 1);
  g.line(4, 34, 10, 34, OUTLINE, 1);

  return g.compile(OUTLINE);
}

function buildMushroom(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Drifting Toxic Spore Motes
  g.rect(6, 11, 2, 2, '#a3e635', false);
  g.rect(39, 9, 2, 2, '#bef264', false);
  g.rect(42, 18, 1.5, 1.5, '#ecfccb', false);

  // Back Mycelial Arm holding Gnarled Wooden Branch Spore-Club
  g.line(30, 27, 38, 28, '#d6d3d1', 2.8);
  g.line(38, 32, 41, 15, '#5c2b09', 2.8);
  g.oval(41, 14, 3.2, 3.2, '#4d7c0f', '#84cc16', '#365314');

  // Striated Fibrous Fungal Stalk Body + Shredded Mossy Veil Collar
  g.poly([[18, 22], [29, 22], [32, 35], [29, 41], [17, 41], [15, 35]], '#e7e5e4');
  g.poly([[18, 22], [24, 22], [23, 40], [17, 40]], '#fef3c7');
  // Vertical fibrous stem striations
  g.line(20, 29, 19, 39, '#d6d3d1', 1);
  g.line(26, 29, 27, 39, '#a8a29e', 1);
  // Mossy torn fungal annulus skirt
  g.poly([[15, 30], [32, 30], [33, 35], [28, 33], [24, 36], [19, 33], [14, 35]], '#365314');
  g.line(16, 30, 31, 30, '#4d7c0f', 1.4);

  // Gnarled Split-Root Feet gripping floor
  g.poly([[15, 40], [21, 40], [21, 44], [12, 44], [14, 42]], '#a8a29e');
  g.poly([[25, 40], [31, 40], [34, 44], [25, 44], [26, 42]], '#78716c');

  // Unsettling Recessed Eye Hollows & Cracked Bark Mouth peering out under cap gills (no visor bar!)
  g.oval(18, 24, 2.2, 1.5, '#1e1b4b');
  g.oval(24.5, 24, 2.2, 1.5, '#1e1b4b');
  g.set(18, 24, '#bef264');
  g.set(17, 24, '#ef4444');
  g.set(24, 24, '#bef264');
  g.set(25, 24, '#ef4444');
  g.line(18, 28, 24, 28, OUTLINE, 1.2);

  // Layered Organic Spotted Toadstool Cap with Dark Radial Underside Gills
  g.oval(22, 20, 14.5, 3.6, '#d6d3d1', '#fef3c7', '#78716c');
  for (let gx = 10; gx <= 34; gx += 3) {
    g.line(22, 19, gx, 22, '#57534e', 1);
  }
  g.poly([[6, 19], [9, 10], [16, 6], [27, 6], [35, 11], [37, 19], [22, 18]], '#365314');
  g.poly([[9, 16], [13, 9], [22, 7], [30, 10], [33, 16]], '#4d7c0f');
  g.poly([[12, 13], [17, 8], [24, 8], [28, 12]], '#84cc16');
  // Warty raised fungal spots
  g.oval(14, 13, 2.2, 1.8, '#bef264', '#ecfccb', '#65a30d');
  g.oval(22, 10, 2.6, 2, '#bef264', '#ecfccb', '#65a30d');
  g.oval(29, 14, 2, 1.6, '#bef264', '#ecfccb', '#65a30d');

  // Lead Fibrous Arm & Moss-Clawed Fist
  g.line(16, 27, 9, 30, '#e7e5e4', 3.2);
  g.oval(8, 30, 2.8, 2.6, '#a8a29e', '#fef3c7', '#57534e');

  return g.compile(OUTLINE);
}

function buildImp(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Whip-like Barbed Spade Tail
  g.line(29, 32, 38, 30, '#9f1239', 2);
  g.line(38, 30, 42, 22, '#be123c', 1.6);
  g.poly([[42, 22], [39, 18], [45, 18]], '#f43f5e');

  // Scalloped Leathery Bat Wings with Wing Bone Finger Struts & Claw Thumb
  g.poly([[25, 20], [37, 7], [45, 14], [41, 23], [32, 27]], '#881337');
  g.poly([[26, 20], [36, 10], [42, 15], [36, 23]], '#be123c');
  g.line(25, 20, 37, 7, '#4c0519', 2);
  g.set(37, 6, '#fef3c7'); // Wing thumb claw
  g.line(31, 17, 42, 16, '#4c0519', 1.2);
  g.line(30, 21, 39, 23, '#4c0519', 1.2);

  // Hunched Digitigrade Goat Legs + Dark Cloven Hooves (dynamic gargoyle crouch!)
  g.line(20, 30, 15, 35, '#e11d48', 3);
  g.line(15, 35, 18, 41, '#9f1239', 2.4);
  g.rect(15, 41, 4, 3, '#1e293b');
  g.line(27, 30, 32, 35, '#be123c', 3);
  g.line(32, 35, 29, 41, '#881337', 2.4);
  g.rect(26, 41, 4, 3, '#1e293b');

  // Lean Muscular Crimson Torso + Glowing Magma Chest Fissures
  g.poly([[18, 19], [28, 19], [29, 31], [19, 31]], '#be123c');
  g.oval(23, 24, 4.2, 4.8, '#e11d48', '#f43f5e', '#881337');
  g.line(20, 23, 25, 23, '#881337', 1);
  g.line(21, 26, 25, 26, '#881337', 1);
  g.set(23, 24, '#f97316');

  // Fierce Swept-Horned Gargoyle Devil Head + Pointed Ears + Fangs
  g.poly([[16, 12], [26, 12], [25, 19], [20, 21], [16, 18]], '#e11d48');
  g.poly([[25, 13], [32, 10], [27, 16]], '#be123c');
  // Swept striated ram horns
  g.line(18, 12, 15, 6, '#d97706', 2.2);
  g.line(15, 6, 18, 5, '#fef08a', 1.4);
  g.line(23, 12, 27, 5, '#d97706', 2.2);
  g.line(27, 5, 30, 6, '#fef08a', 1.4);
  g.line(16, 14, 20, 15, OUTLINE, 1);
  g.line(21, 15, 25, 14, OUTLINE, 1);
  g.eye(17, 15, '#fef08a', '#ffffff');
  g.eye(22, 15, '#fef08a', '#ffffff');
  g.poly([[17, 18], [23, 18], [22, 20], [18, 20]], OUTLINE);
  g.set(18, 18, '#ffffff');
  g.set(22, 18, '#ffffff');

  // Back Arm casting Cinder Fireball + Front Arm thrusting Forged Iron Hell-Trident
  g.line(28, 21, 34, 24, '#be123c', 2.4);
  g.oval(36, 24, 2.4, 2.4, '#f97316', '#fef08a', '#dc2626', false);
  g.line(18, 22, 11, 26, '#e11d48', 2.6);
  g.oval(11, 26, 1.8, 1.8, '#f43f5e');
  // Diagonal Dark-Iron Hell-Trident
  g.line(13, 39, 7, 12, '#334155', 2);
  g.line(4, 14, 11, 12, '#64748b', 2);
  g.line(4, 14, 2, 7, '#f97316', 1.5);
  g.line(7, 12, 5, 5, '#fef08a', 1.6);
  g.line(10, 12, 9, 6, '#f97316', 1.5);

  return g.compile(OUTLINE);
}

function buildMimic(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Gnarled Chitinous Spider-Tendril Legs with Jointed Claws
  g.line(16, 37, 11, 41, '#451a03', 2.6);
  g.line(11, 41, 10, 44, '#292524', 2);
  g.line(22, 38, 19, 44, '#451a03', 2.4);
  g.line(31, 38, 34, 44, '#292524', 2.4);
  g.line(38, 35, 43, 40, '#451a03', 2.6);
  g.line(43, 40, 42, 44, '#292524', 2);

  // 3/4 Heavy Oak Treasure Chest Body with Dark Wood Planks & Riveted Brass Bands
  g.poly([[14, 28], [32, 28], [32, 39], [14, 39]], '#78350f');
  g.poly([[32, 28], [41, 24], [41, 35], [32, 39]], '#451a03');
  g.line(16, 32, 30, 32, '#5c2b09', 1);
  g.line(16, 35, 30, 35, '#5c2b09', 1);
  g.rect(14, 28, 18, 2, '#d97706');
  g.rect(14, 37, 18, 2, '#d97706');
  g.rect(14, 28, 2, 11, '#d97706');
  g.rect(30, 28, 2, 11, '#d97706');
  g.line(32, 28, 41, 24, '#b45309', 2);
  g.rect(21, 29, 5, 6, '#fbbf24');
  g.set(23, 31, OUTLINE);
  g.set(23, 32, OUTLINE);

  // Deep Dark Maw + Wet Crimson Gums + Arched Lid snapped open
  g.poly([[13, 21], [35, 18], [40, 24], [32, 28], [14, 28]], OUTLINE);
  g.line(15, 27, 31, 27, '#881337', 1.4);
  g.poly([[13, 18], [17, 10], [34, 8], [39, 13], [36, 19]], '#78350f');
  g.poly([[17, 10], [26, 8], [34, 8], [31, 13], [16, 14]], '#92400e');
  g.line(13, 18, 36, 19, '#d97706', 2);
  g.line(18, 10, 20, 18, '#d97706', 1.8);
  g.line(29, 9, 31, 18, '#d97706', 1.8);

  // Clustered Eldritch Crimson Eyes + Serrated Ivory Fangs
  g.eye(19, 20, '#ef4444', '#fef08a');
  g.eye(26, 19, '#ef4444', '#fef08a');
  g.set(30, 21, '#dc2626');
  for (const tx of [15, 19, 23, 27, 31]) {
    g.poly([[tx, 19], [tx + 2, 19], [tx + 1, 23]], '#fef9c3');
    g.poly([[tx, 28], [tx + 2, 28], [tx + 1, 25]], '#e7e5e4');
  }

  // Coiled Wet Barbed Magenta Tongue lashing LEFT
  g.poly([[23, 24], [14, 24], [7, 26], [3, 30], [7, 32], [12, 29], [20, 27]], '#be185d');
  g.line(16, 25, 6, 29, '#f9a8d4', 1.2);
  g.set(6, 33, '#fbcfe8');

  return g.compile(OUTLINE);
}

function buildWraith(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Tattered Floating Spectral Shroud + Shredded Wisps
  g.poly([[18, 17], [30, 17], [36, 34], [32, 43], [28, 35], [24, 44], [20, 35], [16, 42], [14, 33]], '#0f766e');
  g.poly([[20, 20], [28, 20], [31, 33], [26, 40], [23, 33], [19, 38]], '#042f2e');
  g.line(19, 19, 16, 36, '#2dd4bf', 1.4);
  g.line(29, 19, 34, 34, '#2dd4bf', 1.2);
  // Spectral Soul Lantern suspended from waist chain
  g.oval(32, 28, 2, 2.6, '#5eead4', '#ffffff', '#0f766e');

  // Peaked Reaper Hood + Gaunt Half-Skull Visage inside Void Shadow
  g.poly([[15, 16], [19, 6], [28, 5], [32, 12], [29, 18]], '#0f766e');
  g.poly([[19, 8], [26, 7], [29, 11]], '#14b8a6');
  g.oval(22, 13, 4.5, 4.6, '#042f2e');
  // Subtle ghostly skull bridge & cheekbones inside hood shadow
  g.oval(21, 14, 2.8, 3, '#0f172a');
  g.eye(18, 13, '#5eead4', '#ffffff');
  g.eye(23, 13, '#5eead4', '#ffffff');
  g.set(20, 16, '#99f6e4');
  g.set(22, 16, '#99f6e4');

  // Weathered Iron Pauldrons + Gaunt Skeletal Hands gripping Soul Scythe
  g.oval(17, 19, 3.8, 2.5, '#334155', '#64748b', '#0f172a');
  g.oval(29, 19, 3.8, 2.5, '#334155', '#64748b', '#0f172a');
  g.line(10, 11, 35, 38, '#334155', 2);
  g.line(10, 11, 34, 38, '#64748b', 1);
  g.oval(18, 22, 2.2, 2, '#cbd5e1');
  g.oval(26, 28, 2.2, 2, '#94a3b8');
  g.poly([[13, 9], [5, 12], [2, 18], [5, 25], [8, 17], [13, 13]], '#14b8a6');
  g.poly([[12, 10], [6, 13], [4, 19], [6, 23], [7, 16], [12, 12]], '#99f6e4');
  g.line(4, 14, 3, 21, '#ffffff', 1);

  return g.compile(OUTLINE);
}

function buildDrake(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Spiked Volcanic Tail
  g.poly([[29, 31], [38, 30], [43, 22], [44, 17], [40, 26], [30, 34]], '#7c2d12');
  g.poly([[42, 18], [45, 14], [46, 19]], '#f97316');

  // Scalloped Crimson Volcanic Wing with Veined Membrane & Thumb Claw
  g.poly([[24, 21], [31, 6], [42, 8], [44, 17], [38, 21], [34, 24], [27, 25]], '#9a3412');
  g.poly([[25, 20], [32, 9], [39, 11], [35, 20]], '#ea580c');
  g.line(23, 21, 31, 6, '#431407', 2);
  g.line(31, 6, 42, 8, '#431407', 1.5);
  g.line(27, 16, 43, 15, '#431407', 1);
  g.set(30, 5, '#fef08a');

  // Muscular Hind & Fore Legs with Ivory Talons
  g.oval(30, 31, 4.5, 4.8, '#9a3412', '#ea580c', '#431407');
  g.line(31, 35, 29, 41, '#7c2d12', 3);
  g.rect(26, 41, 5, 2, '#ea580c');
  g.set(25, 42, '#fef9c3');
  g.line(19, 31, 16, 41, '#c2410c', 3.2);
  g.rect(13, 41, 5, 2, '#ea580c');
  g.set(12, 42, '#fef9c3');

  // Plated Chest & Segmented Armored Belly Scutes
  g.oval(24, 28, 7.5, 6.2, '#9a3412', '#c2410c', '#431407');
  g.poly([[18, 25], [22, 33], [28, 33], [26, 26]], '#ea580c');
  g.line(20, 28, 26, 28, '#fde047', 1);
  g.line(21, 31, 27, 31, '#fde047', 1);

  // Curved Scaly Neck + Horned Armored Wyvern Skull + Flame Breath
  g.line(18, 26, 15, 16, '#9a3412', 5.2);
  g.line(16, 25, 14, 17, '#ea580c', 2);
  g.line(17, 11, 21, 5, '#d97706', 2);
  g.line(21, 5, 24, 4, '#fef08a', 1.4);
  g.line(14, 11, 17, 6, '#d97706', 1.6);
  g.poly([[19, 12], [10, 12], [5, 14], [6, 17], [17, 17]], '#9a3412');
  g.line(10, 12, 18, 12, '#ea580c', 1.2);
  g.poly([[16, 19], [7, 20], [9, 22], [17, 21]], '#c2410c');
  g.set(7, 17, '#ffffff');
  g.set(10, 17, '#ffffff');
  g.set(8, 20, '#ffffff');
  g.eye(11, 14, '#fef08a', '#ffffff');
  g.poly([[7, 17], [2, 16], [1, 19], [7, 19]], '#f97316', false);
  g.set(3, 17, '#fef08a', false);

  return g.compile(OUTLINE);
}

function buildCultist(): CompiledRect[] {
  const g = new PixelGrid(48, 48);
  // Gnarled Iron-Bound Warlock Staff + Caged Amethyst Focus
  g.line(38, 13, 38, 44, '#334155', 2);
  g.line(35, 12, 38, 14, '#d97706', 1.4);
  g.line(41, 12, 38, 14, '#d97706', 1.4);
  g.poly([[38, 5], [41, 9], [38, 12], [35, 9]], '#a855f7');
  g.set(37, 8, '#ffffff');

  // 3/4 Draped Dark-Plum & Charcoal Cultist Robes with Asymmetric Tabard (NO flat yellow +!)
  g.poly([[17, 18], [30, 18], [35, 42], [13, 42]], '#2e1065');
  g.poly([[18, 19], [28, 19], [31, 41], [16, 41]], '#581c87');
  // Draped cloth shadow folds
  g.line(18, 23, 15, 40, '#1e1b4b', 1.4);
  g.line(28, 23, 31, 40, '#1e1b4b', 1.4);
  // Draped Diagonal Crimson-and-Gold Rune Stole + Waist Cord (no flat + cross!)
  g.poly([[20, 20], [25, 20], [21, 40], [17, 40]], '#7f1d1d');
  g.line(20, 21, 17, 39, '#d97706', 1);
  g.line(25, 21, 21, 39, '#d97706', 1);
  g.rect(17, 28, 12, 1.8, '#92400e');
  g.rect(20, 28, 2.5, 2.2, '#fbbf24');
  // Boot tips peeking naturally under hem
  g.rect(16, 42, 5, 2, '#090d16');
  g.rect(26, 42, 5, 2, '#090d16');

  // Armored Dark-Iron Shoulder Mantle & Gold Ritual Collar
  g.poly([[14, 17], [31, 17], [29, 22], [16, 22]], '#334155');
  g.line(15, 18, 30, 18, '#d97706', 1.4);

  // Peaked Asymmetric Cultist Hood + Deep Shadowed Cowl + Glowing Arcane Eyes
  g.poly([[16, 16], [19, 6], [26, 6], [30, 12], [28, 17]], '#2e1065');
  g.poly([[18, 8], [24, 7], [27, 11]], '#581c87');
  g.line(16, 15, 19, 7, '#d97706', 1);
  g.oval(22, 13, 4.2, 4.2, '#090d16');
  g.line(19, 15, 24, 15, '#475569', 1.2); // Subtle dark skull jaw shadow
  g.eye(18, 12.5, '#e879f9', '#ffffff');
  g.eye(23, 12.5, '#e879f9', '#ffffff');

  // Sleeves & Gauntleted Hands gripping Staff + Channeling Arcane Void Orb
  g.line(29, 20, 36, 24, '#581c87', 3);
  g.oval(37, 24, 1.8, 1.8, '#94a3b8');
  g.line(16, 20, 10, 23, '#581c87', 3.2);
  g.oval(9, 23, 2, 2, '#cbd5e1');
  g.oval(6, 18, 3.4, 3.4, '#a855f7', '#faf5ff', '#581c87', false);
  g.set(2, 14, '#e879f9', false);
  g.set(10, 14, '#e879f9', false);

  return g.compile(OUTLINE);
}

export const COMMON_ENEMY_SPRITES: Record<CommonSpriteKey, CompiledRect[]> = {
  goblin: buildGoblin(),
  bandit: buildBandit(),
  skeleton: buildSkeleton(),
  slime: buildSlime(),
  wolf: buildWolf(),
  harpy: buildHarpy(),
  golem: buildGolem(),
  mushroom: buildMushroom(),
  imp: buildImp(),
  mimic: buildMimic(),
  wraith: buildWraith(),
  drake: buildDrake(),
  cultist: buildCultist(),
};
