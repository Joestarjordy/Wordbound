# Copilot Instructions

## Project overview

Wordbound Pixel RPG is a client-side Vite application built with React 18 and strict TypeScript. It combines a pixel-art exploration scene with Wordle-style vocabulary combat: the player travels through staged encounters, solves a target word, and earns points and codex entries.

## Build and validation commands

Run commands from the repository root:

```bash
npm run dev
npm run build
npm run preview
```

- `npm run dev` starts the Vite development server on port `5188` when available.
- `npm run build` runs the TypeScript compiler and then creates the production Vite bundle. This is the primary validation command.
- `npm run preview` serves the built bundle locally.
- There is currently no test runner, single-test command, or lint script configured in `package.json`.

## Architecture

- `src/App.tsx` is the gameplay coordinator. It owns profile, stage/encounter, exploration, combat, animation, modal, audio, and fullscreen state, and wires callbacks between the rendered sections.
- The main screen is split into a `Navbar`, a top `PixelScene`, and a bottom deck that switches between `ExplorationConsole` and `CombatOverlay`.
- `src/components/layout` contains the persistent HUD and exploration controls.
- `src/components/pixel` renders the SVG/CSS pixel-art knight, enemies, scene, combat animations, floating damage text, and stage background.
- `src/components/combat` contains the Wordle grid, rune letter pool, combat overlay, victory banner, and defeat modal.
- `src/components/modals` contains the codex, profile, and realm/stage selection dialogs.
- `src/data` is the content layer: `words.ts` provides the vocabulary pool and Wordle helpers, while `enemies.ts` and `stages.ts` define encounters, rewards, difficulty thresholds, and visual stage themes.
- `src/types/game.ts` is the shared domain model for profiles, stages, enemies, words, letter tiles, evaluations, and combat state.
- `src/utils/storage.ts` handles the versioned `localStorage` profile, default-profile merging, codex updates, persistence, and difficulty unlock checks.
- `src/utils/sound.ts` provides the singleton Web Audio API sound engine for sound effects and looping exploration/combat chiptune audio.
- `src/main.tsx` mounts the app and imports the global stylesheet. `src/index.css` contains Tailwind layers plus the pixel borders, CRT scanlines, scene animations, combat animations, and reduced-motion override.

## Repository-specific conventions

- Keep game rules and content in the existing data/type/utils modules rather than embedding new datasets or domain logic in presentation components.
- Treat `App.tsx` as the source of truth for transitions between exploration, combat, victory, defeat, stage progression, and profile updates. Child components should receive state and callbacks through typed props.
- Use the existing `CombatState` and Wordle helpers (`generateLetterPool`, `evaluateGuess`, `isValidGuess`, and `getRandomWord`) when changing combat input or evaluation behavior.
- Profile mutations must preserve the default-profile merge behavior and be persisted through the helpers in `src/utils/storage.ts`; codex and progression updates should not bypass `saveProfile`.
- Browser-only behavior is intentional: fullscreen listeners and timers are created in effects with cleanup, and combat animation/audio sequencing uses the timer management in `App.tsx`.
- Sound effects and background music go through the shared `soundEngine`; respect its BGM/SFX mute state instead of creating separate audio systems.
- Use the existing Tailwind pixel vocabulary (`font-pixel`, `font-silkscreen`, `font-retro`, `pixel-*` colors/shadows) and the animation names in `src/index.css` for UI and scene changes.
- Preserve the mobile/fullscreen layout assumptions: the root app uses `100dvh`, the world occupies the flexible upper area, and the combat/exploration deck is the fixed lower section.
- Static browser assets should follow Vite’s public-asset convention and use `import.meta.env.BASE_URL` when files are added under `public/`.
- TypeScript is strict with `noUnusedLocals`, `noUnusedParameters`, and `noFallthroughCasesInSwitch`; keep new code fully typed and remove unused imports.
