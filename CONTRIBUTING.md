# Contributing to RootTree

Thanks for helping out. This is an early project and the bar for a contribution
is low — if something is wrong or missing, a Pull Request is a legitimate way to
say so.

There's more than one way to help, and they don't all take the same effort:

- **Add your profile** — one JSON file and one image
- **Add a template** — a tokens file, a component, two small edits
- **Add a field to the schema** — one edit and one command
- **Build the UI** — the most obvious gap in the project right now

---

## Setup

```sh
git clone https://github.com/fiedri/RootTree.git
cd RootTree
pnpm install
pnpm dev
```

Node 22.12+ and pnpm. Before you open any Pull Request, both of these must pass:

```sh
pnpm check   # types
pnpm build   # validates every profile against the schema
```

`pnpm build` is the real gate. If a profile violates the schema it fails with
the exact field path and the build stops — that is by design, not a bug.

---

## Adding your profile

This is the easy one. You don't need to understand any of the code.

**1. Fork the repo and create your profile file.**

Profiles live in one folder, one JSON file each, and **the filename is your URL**
— `ana.json` becomes `/ana`. Copy the example profile that ships with the repo,
rename it to your username, and edit it.

Keep the `$schema` field at the top pointing at the JSON Schema. It's what gives
you completion and inline documentation in your editor:

```json
{
  "$schema": "../../../schemas/profiles.schema.json",
  "name": "Your Name",
  "bio": "One line about you.",
  "avatar": "/avatars/ana.jpg",
  "theme": "ciberpunk",
  "links": [{ "title": "My site", "url": "https://example.com" }]
}
```

Only `name`, `bio`, `avatar`, `theme` and at least one `links` entry are
required. The README documents every field in detail — start there.

**2. Add your picture.**

Drop it in the avatars folder and point the `avatar` field at it. Keep it under
a few hundred KB; it's loaded on every page view.

**3. Check it locally.**

```sh
pnpm dev
```

Visit `localhost:4321/<tu-usuario>`. If it renders, you're done.

**4. Open a Pull Request.**

That's it. If someone else is hosting this repo, your profile goes live with
their next deploy — no setup on your side.

---

## Adding a template

A template is a design direction: a set of design tokens plus the component that
draws the profile with them.

**1. Create the template folder.**

Make a new folder under the templates directory, named in lowercase, matching
your theme name. Inside, a token stylesheet:

```css
html[data-template='minimal'] {
  --background: #ffffff;
  --foreground: #111111;
  --primary: #2563eb;
  --radius: 0.5rem;
}
```

Declare plain custom properties on the selector, and only on that selector. The
name must match the theme name exactly.

**2. Write the component.**

An Astro component that takes the profile and renders it. Write it against the
token names — `bg-background`, `text-foreground`, `text-primary` — never against
a specific template's colours. That's the whole point: a component written once
has to work with every template.

**3. Wire it up in two places.**

- Import your token stylesheet from the global stylesheet, next to the other
  templates' imports.
- Add your theme name to the `theme` enum in the profile schema.

**4. Regenerate and verify.**

```sh
pnpm gen:schema   # regenerates types and the JSON Schema after the enum change
pnpm check
pnpm build
```

Then set `"theme": "minimal"` in your own profile and look at it in the browser.

### Token naming rules

This is the part that bites people, so read it once:

- **Tokens are generic.** `--background`, `--primary`, `--foreground`,
  `--border`. Never `--minimal-background` or `--cyber-primary`. The template is
  chosen by which selector matches, not by the variable name.
- **Every template must define the same token names.** A component can assume
  `--primary` exists because every template provides it. A template that invents
  a token nobody else has breaks components that assume it.
- **Don't reuse a Tailwind namespace name.** Tailwind owns `--font-*` and
  `--text-*`. If a token shares one of those names, the theme mapping produces a
  self-referencing custom property and it silently breaks. That is why the type
  tokens are named `--family-*`, `--fs-*`, `--lh-*` and `--ls-*`.
- **Ship your fonts with the template** if it needs specific ones. Don't link
  out to a font CDN.

---

## Adding a field to the profile schema

The schema is the single source of truth. Adding a field there gives you the
TypeScript type, the JSON Schema and the build-time validation in one shot.

**1. Edit the profile schema.**

Use `.describe()` on every field — that string becomes the inline documentation
in contributors' editors, which is often the only documentation anyone reads.

```ts
myField: z.string().max(50).optional().describe('What this field does.'),
```

**2. Regenerate.**

```sh
pnpm gen:schema
```

**3. Verify.**

`pnpm check` for the types, and confirm the JSON Schema in the schemas folder
now documents the field.

**4. Update the README** if the field is user-facing.

A note on how fields get added safely: never add validation in two places. If you
find yourself reaching for a second validator alongside the schema, add the rule
to the schema instead — two sources of truth will eventually disagree, and when
they do, the disagreement is silent.

---

## Adding an icon collection

Icons come from [Iconify](https://iconify.design). Only the collections the
project bundles are available.

```sh
pnpm add -D @iconify-json/<collection>
```

Then add the collection to the icon include list in the Astro config. Bundle only
what you use — every icon in a collection lands in the build.

---

## Conventions

- **Commits** follow conventional format: `feat(templates): add minimal theme`.
- **Don't document file paths.** Structure here changes as the project moves, and
  a README that lists directories goes stale fast. Describe what a thing *is* and
  what it *does*, not where it lives. Where an exact path is genuinely needed for
  a task, mention it once and keep it next to the instruction.
- **Document behaviour, not implementation.** "A profile that breaks the schema
  fails the build with the field path" stays true across refactors. "The
  validation happens in `scripts/validate.mjs`" does not.
- **No comments that restate the code.** If a block needs explanation, the
  problem is usually naming.

---

## Reporting bugs

Open an issue with what you did, what you expected, and what happened — plus the
profile JSON that triggered it if relevant. A profile that breaks the schema
gives a very precise error; pasting that in is the fastest path to a fix.