# Second-wave guide audit

Verified: 2026-08-13

Status: prepared, not public. `SITE_FEATURES.secondWaveGuides` remains `false`, so these guides stay out of routes, feeds and the sitemap until an intentional release build.

## Editorial verification

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

Each guide has three hand-picked links into the published 100-guide collection. The links cover the nearest practical framework, a risk or evaluation companion, and one adjacent deep dive. They are stored as editorial relationships rather than generated at request time, so they remain stable and reviewable.

## Release checklist

1. Confirm the intended batch date in `secondWavePublicationDate`.
2. Set `secondWaveGuides` to `true` in `app/lib/site-features.ts`.
3. Run `npm test` and `npm run build`.
4. Review the ten guide URLs in the production build, then deploy.
5. Submit the updated sitemap only after the public pages return HTTP 200.
