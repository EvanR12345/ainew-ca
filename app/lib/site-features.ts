/**
 * Site-wide feature switches.
 *
 * To restore advertising, change `ads` to `true` and redeploy. The existing
 * AdSense loader and Adsterra placements will become active again together.
 *
 * The ten fully prepared second-wave guides remain out of public routes,
 * feeds and the sitemap until `secondWaveGuides` is deliberately enabled.
 */
export const SITE_FEATURES = {
  ads: false,
  secondWaveGuides: false,
} as const;
