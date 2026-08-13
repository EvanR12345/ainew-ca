# First-wave external source audit

Audit date: 2026-08-13

## Scope and result

- 100 published long-form guides audited; the 10 held second-wave guides were intentionally excluded.
- 301 evidence-card citation placements checked.
- 77 unique external destinations checked after remediation.
- 0 broken destinations remain.
- 0 stale permanent redirects remain.
- 66 destinations returned a direct HTTP 200 response.
- 8 canonical primary-source pages are bot-protected and returned HTTP 403 to the automated checker: FNIGC and seven OpenAI pages. Each was independently verified as an indexed, current first-party page.
- 3 Nature article URLs completed the publisher's cookie/identity transit and returned HTTP 200. These are canonical article URLs, not stale citation redirects.

The existing `EVIDENCE & FURTHER READING` card structure is unchanged. This pass only updated source records and guide-to-source mappings.

## Broken destinations replaced

| Previous record | Audit result | Replacement |
| --- | --- | --- |
| Statistics Canada artificial-intelligence topic page | HTTP 500 | Statistics Canada primary study on AI adoption and productivity in Canadian firms |
| Mila `/en/research` | HTTP 404 | Mila core expertise, plus a specific language-and-image research page where required |
| CIHR `/e/53426.html` | HTTP 404 | Health Canada machine-learning medical-device guidance and WHO health-AI guidance |
| CISA generic AI topic page | HTTP 404 | Specific CISA secure-development, procurement and incident-collaboration guidance |

## Canonical redirects removed

The stored destinations for the Office of the Privacy Commissioner of Canada, Vector Institute, C2PA, OpenAI Evals, GenCast, Gemini Robotics and SynthID now point directly to their current canonical URLs.

## Weak citations strengthened

Broad research homepages were removed from the published 100-guide mappings where they did not directly support the article's claim. Notable replacements include:

- FNIGC OCAP guidance for Indigenous data sovereignty.
- Agriculture and Agri-Food Canada's strategic science plan for agricultural AI.
- OpenAI's model comparison, reasoning report, GPT-4o system card and image-generation guide for model-specific explainers.
- The original AlphaFold 3, GenCast, GNoME and AlphaProof publications for science coverage.
- Anthropic's sparse-autoencoder research, interpretability engineering report and Responsible Scaling Policy.
- Google DeepMind's Genie publication and model record for world models.
- NVIDIA's AI-factory, quantization, inference and robotics documentation instead of its generic AI landing page.
- GitHub's specific Copilot productivity study instead of the research index.

## Reproduction

Run:

```sh
npm run audit:sources
```

The command exits non-zero for a broken destination or a stale redirect. Bot-protection responses and Nature's publisher cookie transit are reported separately so they remain visible without being misclassified as broken citations.
