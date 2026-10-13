import { z } from 'astro/zod';

const hex = z
  .string()
  .regex(/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, 'Must be a hex colour like #f0f4fc or #00f3ff1a');

const slugSource = z
  .string()
  .regex(/^(\/|https?:\/\/).+\.(jpe?g|png|webp|avif|gif)$/, 'Must be a path from /public or an https image URL');

const urlField = z
  .string()
  .regex(/^(https?:\/\/|mailto:|tel:).+/, 'Must start with https://, mailto: or tel:');

const iconSchema = z.strictObject({
  name: z.string().describe("Iconify name in 'collection:name' form, rendered by astro-icon's <Icon>."),
  foreground: hex.optional().describe('Hex colour of the glyph. Omit to inherit the theme --foreground token.'),
  background: hex.optional().describe('Hex colour painted behind the icon. Omit for a transparent backdrop.')
});

const socialSchema = z
  .strictObject({
    icon: iconSchema,
    platform: z
      .enum([
        'github',
        'linkedin',
        'x',
        'twitter',
        'instagram',
        'tiktok',
        'youtube',
        'twitch',
        'discord',
        'telegram',
        'spotify',
        'soundcloud',
        'reddit',
        'facebook',
        'threads',
        'pinterest',
        'behance',
        'dribbble',
        'medium',
        'devto',
        'patreon',
        'kofi',
        'bluesky',
        'mastodon',
        'codeberg',
        'rss',
        'email'
      ])
      .optional()
      .describe('Network metadata. Supplies the brand colour and the fallback accessible label.'),
    url: urlField.describe('Full profile URL on that network. Email takes a mailto: address instead.'),
    label: z
      .string()
      .max(40)
      .optional()
      .describe('Accessible name for the link. Falls back to platform, then to a humanised icon name.')
  })
  .superRefine((value, ctx) => {
    if (value.platform === 'email' && !value.url.startsWith('mailto:')) {
      ctx.addIssue({ code: 'custom', path: ['url'], message: 'platform "email" requires a mailto: address' });
    }
    if (value.platform && value.platform !== 'email' && !value.url.startsWith('https://')) {
      ctx.addIssue({ code: 'custom', path: ['url'], message: `platform "${value.platform}" requires an https URL` });
    }
  });

const linkSchema = z.strictObject({
  icon: iconSchema.optional().describe('Optional accessory icon rendered beside the title.'),
  title: z.string().min(1).max(80).describe('Card headline. This is the first thing a visitor reads.'),
  url: urlField.describe('Card destination.'),
  description: z.string().max(140).optional().describe('Optional supporting line explaining what the visitor gets.'),
  badge: z.string().max(16).optional().describe("Short label pinned to the card, e.g. 'NEW' or 'FREE'."),
  highlight: z.boolean().default(false).describe('Renders the card in the theme accent colour to stand out.')
});

export const profileSchema = z.strictObject({
  $schema: z
    .string()
    .optional()
    .describe('Relative path to the JSON Schema this file follows. Purely for editor intellisense.'),
  name: z.string().min(1).max(50).describe('Display name shown under the avatar.'),
  bio: z.string().min(1).max(160).describe('Short one-liner, rendered centred under the name.'),
  avatar: slugSource.describe('Profile picture. Relative paths resolve from /public.'),
  avatarAlt: z
    .string()
    .max(120)
    .optional()
    .describe('Alternative text for the profile picture, read by screen readers.'),
  theme: z.enum(['ciberpunk']).default('ciberpunk').describe('Visual template for the profile.'),
  featured: z
    .strictObject({
      title: z.string().min(1).max(60).describe('Headline of the featured card.'),
      description: z.string().max(140).optional().describe('Supporting line giving context to the headline.'),
      url: urlField.describe('Where the card points to.'),
      image: slugSource.describe('Cover image for the featured card.'),
      cta: z.string().max(24).default('View more').describe('Label of the call-to-action button.')
    })
    .optional()
    .describe('Full-width card pinned above everything else. At most one per profile.'),
  socials: z
    .array(socialSchema)
    .max(15)
    .optional()
    .describe('Rendered as a horizontal row of icons below the profile.'),
  links: z
    .array(linkSchema)
    .min(1)
    .max(30)
    .describe('Link cards rendered as a vertical column.')
});

export type Profile = z.infer<typeof profileSchema>;
export type Social = z.infer<typeof socialSchema>;
export type Link = z.infer<typeof linkSchema>;
export type Icon = z.infer<typeof iconSchema>;
