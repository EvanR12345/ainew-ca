# Google-guided SEO improvements, 9 September 2026

## Sources and access limits

The supplied [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=en) was read, along with Google's [how Search works documentation](https://developers.google.com/search/docs/fundamentals/how-search-works), [title-link guidance](https://developers.google.com/search/docs/appearance/title-link) and [interstitial guidance](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials).

The supplied video is episode five of Google Search Central's series. Its first-party description identifies all four preceding episodes:

1. [Introducing How Search Works](https://goo.gle/496KkCt)
2. [How Google Search crawls pages](https://www.youtube.com/watch?v=JuK7NnfyEuc)
3. [How Google Search indexes pages](https://www.youtube.com/watch?v=pe-NSvBTg2o)
4. [How Google Search serves pages](https://www.youtube.com/watch?v=lgQazesEjO4)
5. [Anatomy of a Search Result](https://www.youtube.com/watch?v=IosyvXjQvlw)

The crawling, indexing and serving video IDs are also embedded in Google's written Search documentation. The introduction link above is the exact official short link from episode five's description; its redirect could not be resolved in this environment. YouTube's transcript endpoint returned an automated-query block. No claim is made that all five videos were watched or their full transcripts reviewed. The implementation uses the accessible current primary documentation; no third-party video recap was treated as authoritative.

## Applied changes

- Replaced mechanical title clipping with a distinct, written search title for each of the 15 reviewed articles. Complete on-page headlines and stable article URLs remain.
- Corrected homepage and topic descriptions to match the actual publication rather than promising trackers, fine-tuning or quantization coverage it does not provide.
- Preserved canonical URLs, crawlable links, the sitemap's 15-article collection, French noindex status and draft 404s.
- Restored large-image preview permission in page-level Googlebot metadata. Previously, page metadata replaced the layout's robots settings and lost that permission. This makes suitable previews possible; it does not guarantee a search feature.
- Stopped automatic language dialogs and preference-based arrival redirects. The existing FR control opens the optional choice; Escape still dismisses it and English remains the default.
- Sent only an article's slug and title to the Save button. Full article bodies were unnecessarily being serialized into listing pages.
- Corrected the transparency article's image description to match the actual illustration. Expanded CIRO source labels so readers can identify the organization without knowing the abbreviation.
- Removed unused meta-keywords output. No keyword stuffing, extra draft URLs, misleading schema or invented expertise was added.

## Verification

Both production builds, 12 rendered-HTML tests, TypeScript, scoped ESLint, originality and publication-gate audits passed. The static audit now checks all sitemap pages for unique titles and descriptions, one main heading, canonical agreement, indexability, internal destinations and fragment targets. It checked 37 pages and 3,068 internal link occurrences.

Measured uncompressed HTML sizes: homepage 136,003 to 113,044 bytes (16.9% smaller); Canada archive 105,826 to 65,892 bytes (37.7% smaller); transparency article 118,534 to 112,100 bytes (5.4% smaller). These are file-size measurements, not measured load-time, ranking or traffic gains.

Desktop browser checks at 1,363 pixels confirmed no initial dialog, no horizontal overflow, manual language dialog opening and Escape dismissal, plus working article saving. Mobile emulation is not exposed by the available browser surface; a separate mobile visual check remains outstanding.

## Work requiring account evidence

Search Console indexing, Google-selected canonicals, queries, impressions, manual actions and Core Web Vitals were not accessible in this task. No ranking, traffic or AdSense approval guarantee follows from passing these checks. Keep ads disabled pending approval, and assess actual search performance over time. The chosen newsroom email remains unchanged and its delivery setup still needs verification. No AdSense review was submitted.
