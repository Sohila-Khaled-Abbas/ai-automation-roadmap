# Roadmap Infographic Design Notes

## Purpose and Boundary

The AI Automation Path will use an **original connected-node learning diagram**. The design may adopt the general learning-path principle of visible, step-by-step progression, but it does not reproduce any external layout, assets, source code, or wording. Public roadmap catalogues demonstrate the broad utility of curated, topic-specific learning paths; this project applies that pattern to its existing nine-stage n8n-centered curriculum. [1]

## Applied Principles

| Principle | Applied design decision | Rationale |
|---|---|---|
| Ordered progression | Present the nine curriculum stages in a connected, numbered route from preparation to capstone. | The map communicates sequence and prerequisites at a glance. |
| Focused detail | Keep the selected stage visibly distinct and connect it to the pre-existing stage-detail panel. | Learners can move from overview to concrete outcomes and resources without losing context. |
| Predictable keyboard flow | Retain native buttons in curriculum reading order and clear, persistent focus treatment. | Keyboard interaction should follow the page’s logical reading order and make focus easy to locate. [2] |
| Distinct state cues | Differentiate selected, completed, and available checkpoints through more than color alone: route marker, outline, icon, label, and status text. | Focus and selection are separate concepts and must remain visually discernible. [2] |
| Motion restraint | Limit transitions to short opacity/transform feedback and preserve the existing reduced-motion override. | `prefers-reduced-motion` communicates that the user prefers non-essential motion to be minimized. [3] |

## Visual System

The diagram uses the product’s existing **n8n-pink, deep ink, warm-neutral, and pale-rose** tokens. The hero map becomes a deliberate “field route”: each stage has a strong numbered checkpoint, the active position has a pink halo and filled label, and a low-contrast segmented connector makes the sequence legible without overpowering resource content.

## Selected Implementation Shape

The desktop diagram uses a nine-stop **alternating upper/lower rail**, which gives every checkpoint enough space for its route number, stage label, duration, and resource count while retaining an unambiguous left-to-right sequence. The mobile layout changes to a vertical connected list with the same order and controls, rather than shrinking the desktop map until its labels become unreadable. The implementation is data-derived from `roadmapModules`, so route numbers, completion states, and resource counts remain aligned with the learner experience.

The optional AI feature is intentionally not part of this release. The associated Hugging Face assessment identifies a future, bounded “workflow brief reviewer” or “next-stage planner” as the appropriate scope only after a deployable credential and retention policy are chosen.

## Redesign Validation — August 2026

The redesigned route canvas was reviewed at **1440 × 1000** and **390 × 844**. Desktop preserves the non-linear connected nine-stage canvas, persistent route navigator, selected-stage detail, build studio, resource index, vault, and contribution route as a continuous learning instrument. Mobile replaces the wide canvas with a numbered vertical connection path; every stage remains selectable and the stage-detail handoff remains reachable. The horizontally scrollable build studio is intentionally retained on small screens so individual challenge cards stay readable rather than collapsing into an unreadable multi-column grid.

The review confirmed strong visual hierarchy, consistent dark-ink/pale-paper section transitions, visible progress states, and no apparent clipping. The existing n8n-pink palette was retained to respect the established product colors; public roadmap patterns informed information hierarchy and interaction only, not copied design assets or code.

## References

[1]: https://roadmap.sh/roadmaps "roadmap.sh — Developer Roadmaps"
[2]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/ "W3C ARIA APG — Developing a Keyboard Interface"
[3]: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion "MDN — prefers-reduced-motion"
