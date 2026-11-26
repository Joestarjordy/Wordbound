# Wordbound

> **Every word is a weapon.** A 16-bit Pixel RPG meets Wordle vocabulary combat adventure built with React, TypeScript, Tailwind CSS, and Vite.

Play on GitHub Pages: **https://joestarjordy.github.io/Wordbound/**

---

## Features

### Two Game Modes
- **Campaign Mode (Story of Dominion)**:
  - Progress through **20 stages in every difficulty** (`Easy`, `Medium`, and `Hard` — **60 stages total**) across 4 story acts and 5 animated parallax biomes (`Forest`, `Ruins`, `Crypt`, `Volcano`, `Citadel`).
  - Driven by an insatiable hunger for power, defeat all 20 Sovereign Bosses in each realm.
- **Endless Mode (Vocabulary Survival)**:
  - Stage-free survival across **Easy**, **Medium**, and **Hard** vocabulary levels—all open immediately for practice.
  - Battle endless waves of enemies (with Boss waves every 5th round), rotating realm backdrops, and HP recovery after each victory (`+30 HP`, or `+60 HP` on a 1st-try finisher).

### Playable Knights & 1st-Try Elemental Sword Magic
Before entering a realm, choose your Knight on the Character Select screen:
- **Male Knight — *Inferno Excalibur* (Fire Sword Magic)**:
  - Cracking the target word on your **1st try** ignites his greatsword in solar flames, unleashing a fiery cut-in finisher that **burns enemies to ashes**.
- **Female Knight — *Glacial Excalibur* (Frost Sword Magic)**:
  - Cracking the target word on your **1st try** imbues her blade with arcane frost, unleashing an icy cut-in finisher that **freezes enemies solid**.

### Detailed 16-Bit Pixel Art & Combat Animations
- **13 Common Enemies** (`48×48` pixel grids) and **9 Stage Bosses** (`64×64` pixel grids) with species-calibrated combat proportions and responsive mobile/desktop scaling.
- **Melee & Caster Animations**: Armed melee fighters slash swords, daggers, hammers, and clubs; beasts swipe claws; mage enemies and bosses swing their staves to launch school-specific pixel spells.
- **Boss Runic Modifiers**: Face unique boss mechanics including *Soul Leech*, *Brutal Frenzy*, *Cinder Brand / Solar Nova*, *Astral Surge*, and *Lexicon Barrier*.

### Vocabulary Codex & 8-Bit Chiptune Audio
- **216 Curated Words** (`74` Easy, `76` Medium, `66` Hard) with definitions, parts of speech, and example sentences saved automatically to your local **Vocabulary Codex**.
- Built-in **Web Audio API** 8-bit chiptune BGM (`explore`, `combat`, `boss`) and retro SFX with BGM/SFX mute controls and automatic fullscreen support.

---

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS + custom CSS pixel keyframes
- **Icons & Motion**: `lucide-react`, `framer-motion`
- **Audio & Persistence**: Web Audio API synthesizer (`src/utils/sound.ts`) & `localStorage` (`src/utils/storage.ts`)

---

## Local Development

```bash
# Install dependencies
npm install

# Start the development server (http://localhost:5188/Wordbound/)
npm run dev

# Type-check and build for production
npm run build

# Preview the production build
npm run preview
```

---

## Project Structure

```text
src/
├── components/
│   ├── combat/      # Wordle grid, rune letter pool, victory & defeat modals
│   ├── layout/      # Intro, Main Menu, Character Select, Navbar, Exploration Console
│   ├── modals/      # Stage/Mode Select, Vocabulary Codex, Knight Profile
│   └── pixel/       # PixelKnight, PixelEnemy, EnemySpellFx, PixelScene, RealmBackdrop & sprites
├── data/            # Words, stages (20 per tier), endless generator, enemies, spells & scaling
├── types/           # TypeScript game interfaces
└── utils/           # 8-bit Web Audio synthesizer & localStorage persistence
```
