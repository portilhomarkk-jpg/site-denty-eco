# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # start dev server
pnpm build    # production build
```

No test runner or lint script is configured.

## Architecture

Single-page React app (Vite + Tailwind v4) for the Denty Eco electric scooter store in Joinville, SC. Deployed on Vercel with a catch-all rewrite to `index.html`.

**Routing** is handled manually in `src/app/App.tsx` via `window.history.pushState` — there is no React Router. Three route groups:
- `/` → `HomePage` (landing page sections stacked vertically)
- `/admin` → `Login`, `/admin/dashboard` → `Dashboard` (protected by `AuthContext`)
- `/modelos/:id` → `ModelPage`

**Backend** is a Supabase Edge Function at `supabase/functions/server/`. The frontend calls it via `src/app/utils/api.ts`, which wraps `fetch` against the Edge Function URL. Supabase credentials live in `utils/supabase/info.tsx` (outside `src/`, aliased as `/utils/supabase/info`). Admin endpoints require either a valid Supabase session JWT or the `X-Admin-Secret` header; public endpoints use the anon key.

**Auth** (`src/app/contexts/AuthContext.tsx`) uses Supabase email/password auth. The `AuthProvider` wraps the whole app; `useAuth()` exposes `isAuthenticated`, `login`, and `logout`.

**Data model** — the `Model` interface (defined in `src/app/admin/Dashboard.tsx`) is the central entity: `{ id, name, description, detalhes, price, power, autonomy, speed, battery, batteryType, popular, available, colors: ColorVariant[] }`. Color variants each have `{ name, image }`.

**Image handling** — images are uploaded to Supabase Storage via `api.uploadImage()`. The `src/imports/` folder holds static assets bundled at build time. The `figma-asset-resolver` Vite plugin maps `figma:asset/<filename>` imports to `src/assets/`.

**UI components** — shadcn/ui components (Radix UI + Tailwind) live in `src/app/components/ui/`. The theme is defined via CSS custom properties in `src/styles/theme.css` and `default_shadcn_theme.css`. MUI is also installed but used only in the admin dashboard.

**SEO** — `src/app/components/SEO.tsx` and `LocalSEO.tsx` inject meta tags; `TrackingScripts.tsx` injects analytics/pixel scripts. These are configured from tracking data fetched via `api.getTracking()`.

## Key conventions

- Path alias `@` → `src/` (configured in `vite.config.ts`)
- The `react` and `react-dom` packages are listed as `peerDependencies` (required by the Figma Make toolchain) — do not move them to `dependencies`
- Both the `react()` and `tailwindcss()` Vite plugins must remain in `vite.config.ts` even if Tailwind is not actively used
- Admin panel is at `/admin` — credentials are managed in Supabase Auth (not hardcoded after initial setup)
