# Global Rules - Jordy (web developer)

> Applies to every project. Project-specific facts belong in that project's `AGENTS.md`.
> Read the project's `AGENTS.md` first, if it exists, before changing anything.

## Working style
- Reply in clear English. Keep answers concise.
- If a request is ambiguous, ask a short question instead of guessing.
- Make small, targeted changes. Do not rewrite or reformat files you were not asked to touch.
- Commit small with clear messages. **Push only when asked.**
- Never commit secrets, `.env`, `.env.local`, `node_modules`, `.next`, or build output. Assume repos may be public.

## Default web stack (unless the project says otherwise)
- Next.js (App Router) or Vite, React, TypeScript (strict, no `any`).
- Tailwind CSS, `clsx` + `tailwind-merge`, `lucide-react` icons.
- `framer-motion` for UI motion. Three.js via `@react-three/fiber` + `@react-three/drei` for 3D.
- Add a dependency only if existing ones cannot do the job. Prefer maintained, mainstream packages.

## Next.js (App Router) conventions
- **Server Components (RSC) by default:** Only add `'use client'` at the leaf component level when using React hooks, browser APIs, event listeners, `framer-motion`, or `@react-three/fiber`.
- **Next.js 15+ Async APIs:** Always `await` dynamic route `params`, `searchParams`, `cookies()`, and `headers()` in Server Components, Route Handlers, and `generateMetadata`.
- **Built-in Optimizations:** Use `next/image` (with explicit dimensions or `fill` + `sizes`), `next/link`, and `next/font` instead of raw HTML equivalents unless inside a Vite project.
- **3D & Browser-Only Libraries:** Load `@react-three/fiber` canvases or heavy browser-dependent modules using `next/dynamic` with `{ ssr: false }` to prevent SSR/hydration mismatches.
- **Data Mutations & Secrets:** Prefer Server Actions or Route Handlers (`app/api/.../route.ts`) for backend logic. Keep private keys strictly on the server; only prefix safe, public variables with `NEXT_PUBLIC_`.

## Code quality
- Hooks: complete dependency arrays. Fix dependency problems; do not silence them with `eslint-disable`.
- Every `addEventListener`, `setTimeout`, `setInterval` and subscription needs a cleanup.
- Content and copy live in data files, not scattered through JSX. Split components that grow large or repeat.
- Accessibility: semantic elements, `aria-label` on icon-only buttons, visible focus, enough contrast.
- Mobile-first: check ~375px, ~768px and desktop. Every interactive element needs hover and focus states.
- Respect `prefers-reduced-motion` for looping animation.

## Performance
- Animate only `transform` and `opacity`. Avoid animating `filter: blur()`, large blurred layers, or big `box-shadow`s.
- Do not put transforms, filters or perspective on an ancestor of `position: fixed` elements.
- Mount heavy trees (3D scenes) while something opaque covers them, not mid-animation.
- Three.js: use `InstancedMesh` for repeated objects, cap pixel ratio at 2, dispose imperatively created objects.

## Deployment & asset gotchas
- **Vite:** Reference `public/` files with `import.meta.env.BASE_URL + 'file'`, never a bare `/file`.
- **Next.js:** Reference `public/` files with a leading slash (`/file`) via `next/image` or standard paths (respect `basePath` in `next.config` if configured).
- **GitHub Pages (Vite / Next.js Static Export):** A repo named `<user>.github.io` is served at the root; any other repo is served under `/<repo>/` and needs a matching Vite `base` or Next.js `basePath` + `output: 'export'`.
- **Vercel (Next.js):** Ensure dynamic routes, caching, and edge/serverless functions build cleanly without static export overrides unless requested.

## Windows / PowerShell
- Read and write source files as explicit UTF-8 without BOM. Plain `Get-Content`/`Set-Content` can corrupt characters like `—`, `·`, `↗`.
- Prefer targeted edits over whole-file regex replacement. After scripted edits, check `git diff --stat` for surprising line counts.

## API calls (only when a project makes them)
- Log with tags: `[API REQ]` method + URL + params, `[API RES]` URL + status + data, `[API ERR]` URL + message + stack.
- Never log tokens, passwords, keys or private user data.
- Wrap calls in `try...catch` and show a readable error state in the UI.

## Definition of done - before saying "finished"
1. Type-check passes (`npx tsc --noEmit`; for Next.js, ensure `.next/types` are valid or run `npx next typegen` if applicable).
2. Production build succeeds (`npm run build`).
3. `git diff --stat` shows only the files you meant to change.
4. If the UI changed, state honestly whether you viewed it in a browser and at which widths. **Never claim a visual result you did not see.**
5. Listeners, timers and effects you added have cleanup.