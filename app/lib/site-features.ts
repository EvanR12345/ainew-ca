/**
 * Site-wide feature switches.
 *
 * Advertising stays disabled during the publication-quality review. The
 * Google AdSense account meta tag remains in the document for ownership
 * verification, but no ad script or visible placement loads while `ads` is
 * false. If advertising is restored, Google AdSense is the only configured
 * provider.
 *
 * New articles require an individual evidence and originality review.
 */
export const SITE_FEATURES = {
  ads: false,
} as const;
