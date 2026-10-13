import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

import { profileSchema } from './schemas/profile';

export const collections = {
  profiles: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/data/profiles' }),
    schema: profileSchema
  })
};