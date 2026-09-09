# Second-wave guide audit

> Historical planning record, superseded September 9, 2026. These ten guides remain drafts. The source notes below do not establish current claim accuracy, originality or completed human editorial review. They are not publication approval.

Verified: 2026-08-13

Status: prepared, not public. `SITE_FEATURES.secondWaveGuides` remains `false`, so these guides stay out of routes, feeds and the sitemap until an intentional release build.

## Historical source notes

| Guide | Primary evidence checked | Editorial boundary |
| --- | --- | --- |
| AI, Copyright and Canadian Creators | ISED's generative-AI copyright consultation; Canadian Intellectual Property Office copyright overview; C2PA specification | Distinguishes policy questions, current copyright basics and provenance technology. Does not present provenance as proof of ownership or legal advice. |
| From AI Anxiety to a Local Job-Transition Playbook | Statistics Canada's occupational-exposure study; Statistics Canada's 2026 workplace-AI study; Canada's AI for All strategy | Treats exposure as task-level evidence rather than a forecast that a job will disappear. Separates observed workplace use from policy promises. |
| Can an AI Know When It Is Wrong? | Guo et al., *On Calibration of Modern Neural Networks*; NIST AI RMF; OpenAI evaluation guidance | Defines calibration against observed outcomes. Does not equate fluent language, self-reported confidence or aggregate accuracy with reliable uncertainty. |
| Mixture-of-Experts Models | Switch Transformer paper; Mixtral technical report; NIST AI RMF | Uses original architecture reports for routing and active-parameter claims. Avoids implying sparse activation removes memory, networking or serving costs. |
| Synthetic Data | Nature's model-collapse paper; NIST Generative AI Profile; Hugging Face dataset-card documentation | Separates the documented recursive-training failure mode from broader claims about all synthetic data. Keeps privacy and representativeness as properties to test. |
| Use AI in a Job Search Without Sounding Invented | Office of the Privacy Commissioner of Canada's 2026 HR-AI remarks; NIST AI RMF; OECD AI Principles | Keeps advice focused on truthful candidate-owned evidence. Does not promise hiring outcomes or infer employer rules that have not been published. |
| AI Travel Planning | Government of Canada travel advisories; NIST Generative AI Profile; OpenAI agent guide | Uses the government advisory as the volatile source of record. Treats AI itineraries as drafts and requires first-party verification for bookings, access and safety. |
| AI Sales Research | Government of Canada CASL consent guidance; Office of the Privacy Commissioner of Canada; Microsoft Work Trend Index | Separates lawful consent and privacy duties from workflow advice. Rejects sensitive inference and fabricated familiarity. |
| A Permission Ladder for Personal AI Automation | OWASP Excessive Agency; OpenAI agent guide; Anthropic agent engineering guide | Grounds the ladder in least privilege, bounded tools, human approval and reversibility. Does not imply a successful trial justifies broad account authority. |
| AI and Neuroscience | Nature Neuroscience semantic-decoder study; NIH BRAIN NeuroAI roadmap; Office of the Privacy Commissioner of Canada | Reports participant-specific decoding and its generalization/cooperation limits. Avoids “mind reading” claims and treats inferred neural information as sensitive. |

## Collection-link plan

The original plan assigned three links per guide into what was then described as a published 100-guide collection. Most of those articles are now intentionally unpublished; every proposed link must be checked against the current public eligibility gate. The links cover the nearest practical framework, a risk or evaluation companion, and one adjacent deep dive. They are stored as editorial relationships rather than generated at request time, so they remain stable and reviewable.

## Current release requirements

1. Leave `SITE_FEATURES.secondWaveGuides` false while any guide is unfinished. Enabling the switch is not an editorial review.
2. Review each candidate separately: verify current primary sources and the exact claims they support, replace weak citations, remove template prose, and add a useful original contribution appropriate to the subject.
3. Record what was actually checked. Do not describe an automated URL response or an AI rewrite as a human editorial review or a tested product result.
4. Check all internal links against publicly eligible articles. Review title-specific imagery and rendered desktop and mobile pages.
5. Set `evidenceStatus`, `originalityStatus` and `searchEligible` only when their requirements have actually been met. Preserve `app/lib/search-quality.ts`; never bypass it to release a batch.
6. Run the production builds, rendered tests, source, originality, search-quality and legacy audits. Resolve failures or explicitly record access limitations; do not count a blocked source as verified by HTTP status alone.
7. Review the exact proposed source commit before any authorized deployment. Recheck public routes, sitemap and exclusion of remaining drafts after deployment.

See [the September 2026 review](adsense-fundamental-review-2026-09-09.md) for the distinction between technical eligibility and editorial value.
