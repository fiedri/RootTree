# RootTree

Static Astro link-in-bio. A profile is one JSON file and its filename is its URL.

## Commands

- `pnpm` only (lockfile is `pnpm-lock.yaml`). Node >= 22.12.
- Dev server: `pnpm astro dev --background` — plain `pnpm dev` blocks the shell. Manage it with `astro dev status | logs | stop`.
- `astro dev --force` clears the content-layer cache. Use it after changing how profiles are loaded; the content layer does not reliably hot-reload.
- `pnpm check` is the **only** quality gate (type-check). No linter, no formatter, no test runner, no CI.
- `pnpm build` is also the profile validator: a malformed JSON profile fails the build with the offending field path. Run `pnpm check` then `pnpm build` before opening a PR — nothing does it for you.
- `pnpm gen:schema` — run after **any** edit to `src/schemas/profile.ts`. Syncs Astro types, copies the generated JSON Schema out of gitignored `.astro/collections/` into the committed `schemas/`, and verifies every profile's `$schema` pointer resolves (exits 1 if not).

## Architecture

**The schema is the single source of truth.** `src/schemas/profile.ts` defines every field once; the TS types, the editor JSON Schema and the build-time validation all derive from it. Adding a field = edit that file + `pnpm gen:schema`.

- Zod comes from `astro/zod` (bundled with astro). Do **not** add `zod` to `package.json`.
- Every object is a `strictObject` — an unknown key in a profile file fails the build.
- `src/data/profiles/*.json` → content collection `profiles` (`src/content.config.ts`, glob loader). The filename becomes `entry.id` → route param. There is deliberately no `username` field.
- `avatar` / `featured.image` validate the path *format* only, not that the file exists. A missing image builds fine and 404s.

**Theming** — tokens are plain custom properties scoped to `html[data-template='<name>']`; `src/styles/global.css` maps them onto Tailwind's namespaces. Adding a template = new `src/templates/<name>/token.css` + import it in `global.css` + add the name to the `theme` enum in the schema.

- `@theme inline` is mandatory. Without it, utilities pin to `:root` and ignore the template selector.
- Tailwind owns `--font-*` / `--text-*`. Type tokens are named `--family-*`, `--fs-*`, `--lh-*`, `--ls-*` on purpose: a name clash makes `@theme inline` emit a self-referencing property.
- Fonts are self-hosted in `public/fonts/` with `@font-face` inside `token.css`. Do not add CDN links.

## Current state — alpha

- **UI is not built.** `src/pages/[profile].astro` dumps raw JSON into a `<pre>`.
- `src/templates/ciberpunk/CiberPunk.astro` is a dead stub: never imported anywhere, and it uses `import { Layout } from "../../layouts/Layout.astro"`, which is not a valid named export. `Layout.astro` renders `data-template={profile.theme}` onto `<html>`.
- Only one profile ships: `src/data/profiles/fiedri.json`. README still talks about an `ana.json` example that does not exist.
- `pnpm check` reports one standing hint (unused `Welcome` import in `src/pages/index.astro`) that is not worth chasing.

## Conventions

- Path aliases in `tsconfig.json`: `@/*` → `src/`, plus `@components/*` and `@utils/*` (the `src/utils` directory does not exist). New code should use `@/`.
- Only `simple-icons` and `lucide` icons are bundled — see the `include` list in `astro.config.mjs`. A new collection needs `pnpm add -D @iconify-json/<name>` **and** an entry in that list.
- `DESIGN.md` is the cybernetic HUD design system spec (zero radius, glow-only depth, no drop shadows). `token.css` is its implementation — read it before adding visual tokens.
- `README.md` is the user-facing contract. The profile JSON format is documented there; update it whenever the schema changes.
- Commits: conventional format, Spanish subject (`feat(profiles): añadir perfiles y tema ciberpunk`).