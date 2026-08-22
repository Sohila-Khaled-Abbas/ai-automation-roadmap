# Learner Flow Validation

## Resource filters

The public learning library was exercised in the browser. The **All** filter displayed 19 entries. Selecting **Video** narrowed the collection to six video records, including the Gemini Notebook selections. The clear-filters control appeared after filtering. These results confirm that the client-side type filter is reading the persisted library data correctly.

Selecting **Notebook picks** reduced the collection to the two source-labeled Gemini Notebook videos. The contribution form rendered its project/resource selector, route-stage selector, optional URL field, and required title and description fields for a signed-in user. Attempting to send the empty form activated native required-field validation and did not create a submission record. The server contract is separately covered by Vitest input-validation tests; no synthetic learner submissions were seeded into production data.

## n8n Mastery catalogue library

After the August 2026 catalogue import, the authenticated browser view showed **256 curated resources** in both the hero metric and the library’s all-resources count. The expanded Orient module displayed imported Arabic `n8n with Karim` entries, including restaurant-order, fundamentals, and customer-service automation lessons. The rendered Agents section showed the Arabic AI Plus provider label and the search-link disclosure on imported cards, confirming that catalogue titles, providers, source provenance, and the transparent YouTube-search description reach the learner-facing experience.

The live library search for **“Ryan & Matt”** narrowed the public collection to **102** imported English catalogue videos and visibly retained the provider label on the result cards. Clearing the search and selecting **Templates** returned three cards: the two imported official technical templates (the production queue setup and n8n runner images) plus the pre-existing n8n workflow template library. This confirms that the search, reset, and type-filter controls operate against the imported data rather than a static UI fixture.
