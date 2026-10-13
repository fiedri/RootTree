# RootTree

**A link-in-bio that costs nothing and belongs to you.**

[![Astro](https://img.shields.io/badge/Astro-7.3-ff5d01.svg?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-39ff14.svg?style=flat-square)](#license)
![Status: alpha](https://img.shields.io/badge/status-alpha-ff007f.svg?style=flat-square)

Linktree costs $5–24/month. Bento costs more. For a community, a dev, a musician,
a small studio, that's real money every year just to host twelve hyperlinks and
a profile picture.

RootTree is the alternative: **a static Astro site where your whole profile is
one JSON file.**

There are two ways to use it, and both cost nothing:

- **Fork it and host it yourself.** Add one JSON file with your details, deploy
  the fork to Vercel, Netlify, Cloudflare Pages, or any web server. Every one of
  those free tiers is far more than a link page needs.
- **Contribute your profile here.** Fork it, add your profile as a Pull Request,
  and let whoever maintains the deployment host it for you.

Either way your data is a file you can read, diff and migrate at any time. No
account, no vendor, no subscription, no lock-in.

---

## Status

This is an **alpha**. The data layer is solid; the UI is not built yet.

**Done**

- Profile schema, validated at build time with Zod via Astro Content Collections
- Auto-generated TypeScript types and JSON Schema — intellisense when editing your JSON
- Per-social and per-link icons (any [Iconify](https://iconify.design) icon) with independent foreground/background colours
- Theming system with one template (`ciberpunk`) built on CSS custom properties
- One static route per profile, generated from the filename
- Full documentation of the JSON format, below

**Not built yet**

- The actual UI. Profiles currently render as a raw JSON dump; the template
  component that draws them is still an empty stub.
- Click tracking / analytics
- OG images and social meta tags
- A profile editor — right now you write JSON by hand, which is the point, but it is still a manual process
- More templates (there is exactly one)
- CI on pull requests — validation runs locally via `pnpm check` and `pnpm build`

If you want to contribute, the UI is the obvious place to start.

---

## Quick start

Requires **Node 22.12+** and **pnpm**.

```sh
git clone https://github.com/fiedri/RootTree.git
cd RootTree
pnpm install
```

Profiles live in a single folder, one JSON file each. **The filename is your
URL** — `ana.json` becomes `/ana`. There is no `username` field inside the file
on purpose; one source of truth.

Copy the example profile that ships with the repo, rename it to your username,
and edit it. Drop your picture in the avatars folder and point the profile's
`avatar` field at it.

Then:

```sh
pnpm dev      # http://localhost:4321/ana
pnpm build    # static output in dist/
```

Happy with it? Either open a Pull Request to contribute the profile, or deploy
the fork yourself — see [Deploy](#deploy).

---

## Writing a profile

A profile is one JSON file. This is a complete, valid example:

```json
{
  "$schema": "../../../schemas/profiles.schema.json",
  "name": "Ana Rivera",
  "bio": "Sound designer. Field recordings, modular synths, and long walks.",
  "avatar": "/avatars/ana.jpg",
  "avatarAlt": "Ana smiling in front of a modular rack",
  "theme": "ciberpunk",
  "featured": {
    "title": "Free sample library",
    "description": "120 field recordings from the Patagonian coast, CC0.",
    "url": "https://ana.fm/samples",
    "image": "/featured/samples.jpg",
    "cta": "Download"
  },
  "socials": [
    { "icon": { "name": "simple-icons:bandcamp" }, "url": "https://ana.fm" },
    { "icon": { "name": "simple-icons:instagram", "foreground": "#ff007f" }, "url": "https://instagram.com/ana" },
    {
      "icon": { "name": "lucide:mail", "foreground": "#39ff14", "background": "#131322" },
      "platform": "email",
      "label": "Email",
      "url": "mailto:hola@ana.fm"
    }
  ],
  "links": [
    {
      "icon": { "name": "lucide:music", "foreground": "#00f3ff" },
      "title": "Latest album",
      "description": "Six tracks, recorded in one room.",
      "url": "https://ana.fm/album/tidal",
      "badge": "NEW",
      "highlight": true
    },
    { "title": "Booking", "url": "mailto:bookings@ana.fm" }
  ]
}
```

### Top level

| Field | Required | Notes |
| --- | --- | --- |
| `$schema` | no | Relative path to the JSON Schema. Purely for editor intellisense. |
| `name` | **yes** | Display name, max 50 chars. |
| `bio` | **yes** | One-liner under the name, max 160 chars. |
| `avatar` | **yes** | Path from `/public`, or an `https` image URL. |
| `avatarAlt` | no | Alt text for screen readers. Strongly encouraged. |
| `theme` | **yes** | Currently only `"ciberpunk"`. Defaults to it. |
| `featured` | no | One full-width card pinned above everything. |
| `socials` | no | Horizontal row of icons. Max 15. |
| `links` | **yes** | Vertical column of cards. 1 to 30. |

### `featured`

At most one per profile. `title`, `url` and `image` are required; `description`
and `cta` are optional (`cta` defaults to `"View more"`).

### `socials[]`

Each entry needs `icon` and `url`. `platform` is optional metadata used for the
brand colour and as the fallback accessible label — if you set
`platform: "email"`, the `url` must be a `mailto:` address.

### `links[]`

Each entry needs `title` and `url`. Everything else is optional.

### `icon`

Shared by `socials` and `links`, so both render through the same component.

| Field | Required | Notes |
| --- | --- | --- |
| `name` | **yes** | Iconify name in `collection:name` form. |
| `foreground` | no | Hex colour of the glyph. Falls back to `--foreground`. |
| `background` | no | Hex colour behind the icon. Falls back to transparent. |

Colours accept 3, 4, 6 or 8 hex digits — `#fff`, `#ffff`, `#ffffff`,
`#ffffff80`. Anything else (`red`, `rgb(0,0,0)`, `#12345`) fails validation.

Icons come from [Iconify](https://iconify.design). Only the collections listed in
`astro.config.mjs` are bundled; today that's `simple-icons` (brand logos) and
`lucide` (generic glyphs). To use another collection:

```sh
pnpm add -D @iconify-json/<collection>
```

then add it to the icon include list in the Astro config.

### Editor support

Point your editor at the generated JSON Schema and you get completion, inline
documentation and instant validation. In VS Code the `$schema` field in the
profile already does this — keep it.

---

## Theming

A template is a folder containing two things: a stylesheet of design tokens and
the component that draws the profile.

The tokens are plain custom properties, scoped to a single attribute selector so
that swapping templates only changes which selector matches:

```css
html[data-template='ciberpunk'] {
  --background: #0a0a12;
  --primary: #00f3ff;
  --foreground: #f0f4fc;
  --radius: 0;
}
```

The global stylesheet maps those onto Tailwind's namespaces with
`@theme inline`, which is what makes `bg-background` or `text-primary` resolve
per template instead of being pinned to `:root`:

```css
@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
}
```

Switching templates is a one-word change in your profile (`"theme": "..."`),
which the layout renders as `data-template` on `<html>`.

> **One gotcha worth knowing:** Tailwind owns the `--font-*` and `--text-*`
> namespaces. If a token in `token.css` shares a name with one of them,
> `@theme inline` produces a self-referencing custom property. That is why the
> type tokens are named `--family-*`, `--fs-*`, `--lh-*` and `--ls-*`.

---

## Commands

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Static build into `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm check` | Type-check `.astro` and `.ts` files |
| `pnpm sync` | Regenerate content collection types |
| `pnpm gen:schema` | Sync, then copy the generated JSON Schema into the schemas folder |

After changing how profiles are loaded, **restart the dev server** — the content
layer does not always resync on hot reload.

---

## Deploy

RootTree compiles to fully static HTML, so you can deploy it anywhere that
serves a folder. Fork the repository and pick whichever fits:

- **[Vercel](https://vercel.com)** — import the fork, zero config
- **[Cloudflare Pages](https://pages.cloudflare.com)** — connect the repo, build
  command `pnpm build`, output directory `dist`
- **[Netlify](https://www.netlify.com)** — connect the repo, build command
  `pnpm build`, publish directory `dist`
- **Any web server** — `pnpm build` writes plain HTML to `dist/`, point nginx at it

Every one of these has a free tier sized well beyond what a link page needs.

If you deploy under a subpath, set the base path so assets resolve:

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://your-domain.com',
  base: '/RootTree',
  // ...
});
```

---

## Contributing your profile

If someone else is already hosting this repo, you can skip the deploy entirely
and just contribute your profile:

1. Fork this repository.
2. Add a JSON file named after you — `tu-usuario.json` — to the profiles folder,
   using the bundled example profile as a starting point.
3. Add your picture to the avatars folder and point the profile's `avatar` field
   at it.
4. Open a Pull Request.

Once merged, it's part of whatever deployment the maintainers run — no setup on
your side. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

Before you open it, make sure it builds:

```sh
pnpm check   # types
pnpm build   # validates your JSON against the schema; fails loudly if a field is wrong
```

A malformed profile fails the build with the exact path of the offending field,
so it can't slip through. (There's no CI runner on this repo yet — running
`pnpm build` locally is what keeps a broken profile out of the queue.)

---

## Architecture

RootTree has four layers. Each one only knows about the one below it.

**1. The schema — single source of truth.**
One file defines every field of a profile. Everything else is derived from it:
the TypeScript types components use, and the JSON Schema editors read. Nothing
is defined twice, so the types and the schema cannot drift apart. Change a field
in one place and both follow.

**2. Profiles — plain JSON.**
A folder of profile files, one per person. Each file's name is its URL. This is
the only place a user's data lives, and it is plain text you can read, diff and
migrate. Images go in the static assets folder and are referenced by path.

**3. The content collection.**
Profiles are registered with Astro as a content collection. This is the layer
that glues everything together: it reads the JSON files, hands each one to the
schema for validation, and generates one static route per profile at build time.
A profile that breaks the schema fails the build with the exact field path,
rather than rendering a broken page in production.

**4. Templates and theming.**
Each template owns a set of design tokens. The layout renders the profile's
`theme` field as an attribute on the root element, so the tokens that apply are
decided by a CSS selector rather than by branching in code. Components are
written once against the token names and never mention a specific template.

### Why it is built this way

The schema being the only place a field is defined is the load-bearing decision.
When a field is added there is exactly one file to edit, and the editor hints,
the build-time validation and the component types all pick it up at once. The
alternative — a JSON Schema for documentation and a separate validation library
in code — is the kind of setup that silently disagrees with itself six months
later.

---

## Roadmap

- [ ] Build the actual UI — profile header, social row, link cards
- [ ] Add a `minimal` and a `brutalist` template
- [ ] OG image generation per profile
- [ ] A `create-profile` CLI so you don't hand-write the first JSON
- [ ] View counters, optional and privacy-respecting

---

## License

MIT — see [LICENSE](LICENSE).

Fork it, deploy it, rebrand it. That's what the MIT is for.

---

Built with [Astro](https://astro.build), [Tailwind CSS v4](https://tailwindcss.com),
[Zod](https://zod.dev) and [Iconify](https://iconify.design).