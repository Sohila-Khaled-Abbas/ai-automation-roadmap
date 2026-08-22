import { ArrowRight, Check, Compass, LockKeyhole, Route, Sparkles } from "lucide-react";
import type { RoadmapModule } from "@/lib/roadmapData";
import { createRoadmapDiagramNodes } from "@/lib/roadmapDiagram";

type RoadmapPathMapProps = {
  modules: RoadmapModule[];
  activeModuleId: string;
  completedModuleIds: string[];
  resourceCounts: Record<string, number>;
  onSelect: (moduleId: string) => void;
};

const toneByModule: Record<RoadmapModule["tone"], { accent: string; wash: string; line: string }> = {
  amber: { accent: "#ffb0c2", wash: "rgba(255,176,194,.12)", line: "rgba(255,176,194,.48)" },
  mint: { accent: "#fff0dd", wash: "rgba(255,240,221,.1)", line: "rgba(255,240,221,.42)" },
  coral: { accent: "#ff7e9c", wash: "rgba(234,75,113,.18)", line: "rgba(234,75,113,.62)" },
};

const canvasPositions = [
  { left: "10%", top: "11%", x: 10, y: 12 },
  { left: "30%", top: "36%", x: 30, y: 38 },
  { left: "53%", top: "14%", x: 53, y: 15 },
  { left: "76%", top: "36%", x: 76, y: 38 },
  { left: "90%", top: "64%", x: 90, y: 66 },
  { left: "68%", top: "78%", x: 68, y: 80 },
  { left: "44%", top: "61%", x: 44, y: 63 },
  { left: "24%", top: "78%", x: 24, y: 80 },
  { left: "9%", top: "60%", x: 9, y: 62 },
];

const canvasPath = canvasPositions.map((point) => `${point.x} ${point.y}`).join(" L ");

export function RoadmapPathMap({ modules, activeModuleId, completedModuleIds, resourceCounts, onSelect }: RoadmapPathMapProps) {
  const diagramNodes = createRoadmapDiagramNodes(modules);
  const completedCount = completedModuleIds.length;
  const nextNode = diagramNodes.find((node) => !completedModuleIds.includes(node.id)) ?? diagramNodes.at(-1);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a090d] shadow-[0_28px_85px_rgba(0,0,0,.42)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_7%_11%,rgba(234,75,113,.24),transparent_25rem),radial-gradient(circle_at_87%_82%,rgba(255,180,197,.12),transparent_28rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.13] [background-image:linear-gradient(rgba(255,255,255,.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.38)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative border-b border-white/10 px-5 py-6 sm:px-7 lg:px-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mono text-[10px] font-bold uppercase tracking-[.19em] text-[#ffb4c5]">Route map · 09 checkpoints</p>
            <h2 className="display mt-3 text-4xl leading-[.88] tracking-[-.045em] text-white sm:text-5xl">Learn like a builder: <em className="text-[#ff9bb1]">follow the work.</em></h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#bbb5bd]">This is an original learning route, not a checklist. Every checkpoint supplies a focused skill target, a visible build proof, and the next capability it unlocks.</p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] text-left lg:min-w-[355px]">
            <div className="border-r border-white/10 px-4 py-3.5">
              <span className="mono block text-[8px] font-bold uppercase tracking-[.14em] text-[#8e8790]">Route proof</span>
              <strong className="mt-1 block text-lg text-white">{completedCount}<span className="ml-1 text-[11px] font-medium text-[#9d969f]">/ 9</span></strong>
            </div>
            <div className="border-r border-white/10 px-4 py-3.5">
              <span className="mono block text-[8px] font-bold uppercase tracking-[.14em] text-[#8e8790]">Cadence</span>
              <strong className="mt-1 block text-lg text-white">10<span className="ml-1 text-[11px] font-medium text-[#9d969f]">weeks</span></strong>
            </div>
            <div className="px-4 py-3.5">
              <span className="mono block text-[8px] font-bold uppercase tracking-[.14em] text-[#8e8790]">Next unlock</span>
              <strong className="mt-1 block truncate text-[11px] text-[#ffcfdb]">{nextNode?.label ?? "Capstone"}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="relative grid lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-black/20 p-5 lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex items-center gap-2 text-[#ffb4c5]"><Compass className="size-4" /><span className="mono text-[9px] font-bold uppercase tracking-[.16em]">Navigator</span></div>
          <p className="mt-3 text-sm leading-6 text-[#d0c9cf]">Choose a checkpoint to inspect the operating goal and collect the learning proof.</p>
          <div className="mt-6 hidden lg:block">
            {diagramNodes.map((node, index) => {
              const module = modules[index];
              const isActive = module.id === activeModuleId;
              const isComplete = completedModuleIds.includes(module.id);
              return (
                <button key={node.id} type="button" onClick={() => onSelect(node.id)} aria-current={isActive ? "step" : undefined} aria-controls="stage-detail" className={`group flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition ${isActive ? "border-[#ea4b71] bg-[#ea4b71]/10" : "border-transparent hover:border-white/30 hover:bg-white/[.045]"}`}>
                  <span className={`flex size-6 shrink-0 items-center justify-center rounded-md border text-[9px] font-extrabold ${isActive ? "border-[#ff9bb1] bg-[#ea4b71] text-white" : isComplete ? "border-[#ffcfdb] bg-[#ffcfdb] text-[#130f14]" : "border-white/15 bg-white/[.04] text-[#c9c1c8]"}`}>{isComplete && !isActive ? <Check className="size-3" strokeWidth={3} /> : node.routeNumber}</span>
                  <span className="min-w-0"><span className={`block truncate text-xs font-bold ${isActive ? "text-white" : "text-[#c6c0c7]"}`}>{node.label}</span><span className="mono mt-0.5 block text-[8px] uppercase tracking-[.1em] text-[#847d87]">{module.duration}</span></span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 rounded-xl border border-[#ea4b71]/25 bg-[#ea4b71]/10 p-4">
            <p className="mono text-[8px] font-bold uppercase tracking-[.14em] text-[#ffb4c5]">Map key</p>
            <p className="mt-2 text-xs leading-5 text-[#cfc1c7]">Solid checkpoints are complete. The pink coordinate is the stage in focus. Every other point is available to inspect.</p>
          </div>
        </aside>

        <figure className="relative min-h-[640px] overflow-hidden p-4 sm:p-7 lg:min-h-[690px] lg:p-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_49%_45%,rgba(234,75,113,.10),transparent_29rem)]" />
          <div className="relative hidden h-[570px] lg:block" aria-label="Connected nine-stage AI Automation learning roadmap">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d={`M ${canvasPath}`} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
              <path d={`M ${canvasPath}`} fill="none" stroke="url(#route-glow)" strokeWidth="1" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
              <path d="M 9 62 C 18 52, 19 25, 30 38" fill="none" stroke="rgba(255,180,197,.16)" strokeWidth=".75" strokeDasharray="1 4" vectorEffect="non-scaling-stroke" />
              <path d="M 44 63 C 53 70, 60 67, 68 80" fill="none" stroke="rgba(255,180,197,.16)" strokeWidth=".75" strokeDasharray="1 4" vectorEffect="non-scaling-stroke" />
              <defs>
                <linearGradient id="route-glow" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#fff0dd" />
                  <stop offset=".45" stopColor="#ea4b71" />
                  <stop offset="1" stopColor="#ffb0c2" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute left-[42%] top-[42%] flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/10 bg-[#100e13]/80 text-center shadow-[0_0_0_12px_rgba(10,9,13,.72)] backdrop-blur-sm">
              <Route className="size-5 text-[#ff9bb1]" />
              <span className="mono mt-2 text-[8px] font-bold uppercase tracking-[.17em] text-[#9c929c]">Build loop</span>
              <span className="mt-1 text-xs font-extrabold text-white">Observe → ship</span>
            </div>

            {diagramNodes.map((node, index) => {
              const module = modules[index];
              const tone = toneByModule[module.tone];
              const isActive = module.id === activeModuleId;
              const isComplete = completedModuleIds.includes(module.id);
              const position = canvasPositions[index];
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => onSelect(node.id)}
                  aria-current={isActive ? "step" : undefined}
                  aria-pressed={isActive}
                  aria-controls="stage-detail"
                  aria-label={`${node.routeNumber}. ${node.label}. ${isComplete ? "Completed." : "Available."} ${resourceCounts[node.id] ?? 0} learning resources.`}
                  className="group absolute z-10 w-[140px] -translate-x-1/2 -translate-y-1/2 text-left focus-visible:outline-none"
                  style={{ left: position.left, top: position.top }}
                >
                  <span className={`block rounded-2xl border px-3.5 py-3.5 transition duration-200 group-hover:-translate-y-1 ${isActive ? "border-[#ff9bb1] bg-[#24131b] shadow-[0_0_0_5px_rgba(234,75,113,.15),0_18px_34px_rgba(0,0,0,.3)" : "border-white/12 bg-[#121015]/92 hover:border-white/30"}`}>
                    <span className="flex items-center justify-between gap-2">
                      <span className="mono text-[9px] font-extrabold tracking-[.1em]" style={{ color: isActive ? "#ffb4c5" : tone.accent }}>{isComplete ? <span className="inline-flex items-center gap-1"><Check className="size-3" strokeWidth={3} /> DONE</span> : node.routeNumber}</span>
                      <span className={`flex size-5 items-center justify-center rounded-full border ${isActive ? "border-[#ff9bb1] bg-[#ea4b71] text-white" : "bg-black/20"}`} style={!isActive ? { borderColor: tone.line, color: tone.accent } : undefined}>{isActive ? <Sparkles className="size-3" /> : <LockKeyhole className="size-2.5" />}</span>
                    </span>
                    <span className={`mt-4 block text-sm font-extrabold leading-[1.02] ${isActive ? "text-white" : "text-[#f1e9ee]"}`}>{node.label}</span>
                    <span className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-2 mono text-[8px] uppercase tracking-[.1em] text-[#918894]"><span>{module.duration}</span><span>{resourceCounts[node.id] ?? 0} refs</span></span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative grid gap-2 lg:hidden" aria-label="Connected mobile AI Automation learning roadmap">
            {diagramNodes.map((node, index) => {
              const module = modules[index];
              const isActive = module.id === activeModuleId;
              const isComplete = completedModuleIds.includes(module.id);
              return (
                <div key={node.id} className="relative pl-12">
                  {index < diagramNodes.length - 1 && <span className="absolute bottom-[-10px] left-[19px] top-10 w-px bg-gradient-to-b from-[#ea4b71] to-white/10" aria-hidden="true" />}
                  <button type="button" onClick={() => onSelect(node.id)} aria-current={isActive ? "step" : undefined} aria-controls="stage-detail" className={`relative flex min-h-[68px] w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bb1] ${isActive ? "border-[#ea4b71] bg-[#24131b]" : "border-white/10 bg-white/[.035]"}`}>
                    <span className={`absolute -left-12 top-4 flex size-8 items-center justify-center rounded-lg border text-[9px] font-extrabold shadow-[0_0_0_4px_rgba(10,9,13,.96)] ${isActive ? "border-[#ff9bb1] bg-[#ea4b71] text-white" : isComplete ? "border-[#ffcfdb] bg-[#ffcfdb] text-[#0c0a0d]" : "border-white/15 bg-[#151217] text-[#e5d8df]"}`}>{isComplete && !isActive ? <Check className="size-3.5" strokeWidth={3} /> : node.routeNumber}</span>
                    <span><span className={`block text-sm font-extrabold ${isActive ? "text-[#ffcfdb]" : "text-white"}`}>{node.label}</span><span className="mt-1 block mono text-[9px] uppercase tracking-[.12em] text-[#8f858e]">{module.duration} · {resourceCounts[node.id] ?? 0} references</span></span>
                    <ArrowRight className={`size-4 shrink-0 ${isActive ? "text-[#ff9bb1]" : "text-[#817780]"}`} />
                  </button>
                </div>
              );
            })}
          </div>

          <figcaption className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 mono text-[9px] font-bold uppercase tracking-[.13em] text-[#89808a]">
            <span>Solid line: essential sequence · dotted curve: useful feedback loop</span>
            <span className="text-[#ffb4c5]">Select a coordinate to open its proof.</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
