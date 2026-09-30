# Standard AdSense installation — 30 September 2026

## Scope and reason

The publisher authorized a revenue-focused advertising implementation. The public site has regular HTML pages and no AMP counterpart. Installed Google’s standard asynchronous AdSense loader for publisher `ca-pub-4610762209559364` once in the rendered head of the home page and all 16 public article pages, excluding search, trust pages, unpublished articles and missing routes from the loader, and preserving the existing seller declaration and account meta tag. Creating AMP duplicates has no demonstrated revenue benefit in the available site evidence; no AMP pages or AMP ad elements were added.

Updated About, Privacy, Terms, Editorial Policy and the AI New Desk profile to describe the installed advertising integration. The Privacy page now discloses Google and third-party advertising cookies, page/IP/browser information, personalization limits and external privacy choices. Original article publication and revision dates are unchanged.

## Official sources checked

- Google code placement: https://support.google.com/adsense/answer/9274516
- Auto ads configuration: https://support.google.com/adsense/answer/9261307
- Required privacy disclosures: https://support.google.com/adsense/answer/1348695
- Google partner-site data use: https://policies.google.com/technologies/partner-sites
- Google-certified CMP requirements: https://support.google.com/adsense/answer/13554116

## Validation and boundaries

Rendered tests check that the exact publisher script appears once in the head of both the home page and an article, with async loading and anonymous cross-origin mode. Competing Adsterra/popunder code remains absent. The tests also check that privacy, search and a missing article route contain no ad loader. The 19-test suite passed. The static deployment build passed. The search-quality audit verified 38 sitemap URLs, 16 public articles, no generated draft routes, 38 unique titles/descriptions and 2,740 internal links. An additional HTML inspection verified the loader exactly once in the head of all 17 monetized pages and absent from the other generated HTML. The owner-only mirror build is performed by the publication workflow; its returned build/deployment status is the evidence for that separate release.

Installing the loader does not establish that Google approved the site, Auto ads is switched on, ads were served, or revenue increased. No ad click, impression, RPM, income or comparison result is fabricated. No publisher ads are clicked during verification.

No authenticated AdSense account capability was available. Account-side items remain unverified: site eligibility, Auto ads enablement and format settings, regional Privacy & messaging configuration, Google-certified consent messages where required, and revenue reports. Privacy disclosure alone is not a substitute for the required certified CMP. These require account access before personalized advertising can be considered ready in the regions covered by Google’s requirement. The code does not claim or simulate consent.

Next revenue evaluation requires actual AdSense reporting, using revenue and viewability alongside reading/navigation usability. The September performance export is historical search data, not an ad revenue baseline. No revenue-maximizing format or ad-load setting was selected without that evidence.
