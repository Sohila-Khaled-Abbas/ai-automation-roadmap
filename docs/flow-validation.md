# Learner Flow Validation

## Resource filters

The public learning library was exercised in the browser. The **All** filter displayed 19 entries. Selecting **Video** narrowed the collection to six video records, including the Gemini Notebook selections. The clear-filters control appeared after filtering. These results confirm that the client-side type filter is reading the persisted library data correctly.

Selecting **Notebook picks** reduced the collection to the two source-labeled Gemini Notebook videos. The contribution form rendered its project/resource selector, route-stage selector, optional URL field, and required title and description fields for a signed-in user. Attempting to send the empty form activated native required-field validation and did not create a submission record. The server contract is separately covered by Vitest input-validation tests; no synthetic learner submissions were seeded into production data.
