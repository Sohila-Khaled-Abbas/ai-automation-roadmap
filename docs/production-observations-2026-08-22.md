# Production Observations — 22 August 2026

## Scope

This note records a browser check after the expanded learning-process release. It separates visual-host availability from catalogue API availability so that release claims remain evidence-based.

| Surface | Observed result | What can be concluded | What cannot be concluded |
| --- | --- | --- | --- |
| `https://airoadmap-yzczrdqq.manus.space/` | Browser returned **Site under maintenance**. | The managed root UI was unavailable to public browser traffic at the time of checking. | The managed public roadmap UI cannot be treated as visually verified. |
| `https://airoadmap-yzczrdqq.manus.space/api/trpc/projects.list` with the expanded Vercel origin | `200`, scoped CORS header, **10** project records. | The managed catalogue API was reachable and authorized the Vercel release origin. | This alone does not prove the Vercel browser client rendered those cards. |
| `https://airoadmap-yzczrdqq.manus.space/api/trpc/resources.list` with the expanded Vercel origin | `200`, scoped CORS header, **270** resource records. | The managed catalogue API was reachable and authorized the Vercel release origin. | This alone does not prove the Vercel browser client rendered the resource library. |
| Expanded Vercel deployment root | `200`, expected document title, client bundle includes the managed catalogue host. | The static Vercel release and intended bridge configuration were present. | Interactive client hydration still requires a successful browser observation. |

## Release decision

The site’s data-plane evidence is positive: the Vercel bundle points at the public catalogue bridge and the bridge returns the persisted catalogue to the Vercel origin. The UI-plane evidence remains incomplete because the managed root was in maintenance mode and the connected browser session did not expose a hydrated Vercel page. Keep the live-browser checklist items open until those conditions change.

### Follow-up browser attempt

The latest Vercel deployment was opened again after the connected browser successfully rendered an unrelated public YouTube page. It returned the expected document title, but no interactive elements or hydrated page content were exposed and screenshot upload again failed. This isolates neither a browser-extension limitation nor a client-hydration issue conclusively; it does reinforce that no claim of end-to-end live Vercel card rendering should be made without stronger evidence.
