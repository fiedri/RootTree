/**
 * Copies the JSON Schema Astro generates for a content collection out of the
 * gitignored `.astro/` directory and into `schemas/`, where it can be committed,
 * published, and referenced by profile files through their `$schema` field.
 *
 * Run `astro sync` first — see `pnpm gen:schema`.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const profilesDir = resolve(root, 'src/data/profiles');

const COLLECTIONS = ['profiles'];

let failed = false;

for (const name of COLLECTIONS) {
  const source = resolve(root, '.astro/collections', `${name}.schema.json`);
  const target = resolve(root, 'schemas', `${name}.schema.json`);

  if (!existsSync(source)) {
    console.error(`Missing ${source}\nRun: astro sync`);
    failed = true;
    continue;
  }

  const generated = readFileSync(source, 'utf8');
  const previous = existsSync(target) ? readFileSync(target, 'utf8') : null;

  writeFileSync(target, generated);
  console.log(
    previous === generated
      ? `schemas/${name}.schema.json — unchanged`
      : `schemas/${name}.schema.json — ${previous ? 'updated' : 'created'}`
  );
}

/**
 * A profile's `$schema` is a relative pointer the editor follows for
 * intellisense. Nothing in the build reads it, so a stale path fails silently
 * and just loses the autocomplete. Verify each one actually resolves.
 */
if (existsSync(profilesDir)) {
  for (const file of readdirSync(profilesDir).filter((f) => f.endsWith('.json'))) {
    const filePath = resolve(profilesDir, file);
    let declared;

    try {
      declared = JSON.parse(readFileSync(filePath, 'utf8')).$schema;
    } catch {
      continue; // malformed JSON is the collection's job to report, not ours
    }

    if (typeof declared !== 'string') continue;

    const target = resolve(dirname(filePath), declared);
    if (existsSync(target)) continue;

    failed = true;
    console.error(
      `src/data/profiles/${file}: $schema points to "${declared}"\n` +
        `  resolves to ${relative(root, target)}, which does not exist`
    );
  }
}

if (failed) process.exit(1);