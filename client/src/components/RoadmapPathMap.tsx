import { ArrowDownRight, Check, CircleDot, LockKeyhole, Route, Sparkles } from "lucide-react";
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
  amber: { accent: "#ff9bb1", wash: "rgba(234,75,113,.13)", line: "rgba(234,75,113,.58)" },
  mint: { accent: "#ffcfdb", wash: "rgba(255,180,197,.11)", line: "rgba(255,180,197,.48)" },
  coral: { accent: "#ea4b71", wash: "rgba(201,47,85,.17)", line: "rgba(201,47,85,.64)" },
};

const nodeCoordinates = [
  { left: "5%", top: "38px", y: 70 },
  { left: "16.25%", top: "218px", y: 250 },
  { left: "27.5%", top: "38px", y: 70 },
  { left: "38.75%", top: "218px", y: 250 },
  { left: "50%", top: "38px", y: 70 },
  { left: "61.25%", top: "218px", y: 250 },
  { left: "72.5%", top: "38px", y: 70 },
  { left: "83.75%", top: "218px", y: 250 },
  { left: "95%", top: "38px", y: 70 },
];

const diagramPath = nodeCoordinates.map((point) => `${Number.parseFloat(point.left)} ${point.y}`).join(" L ");

export function RoadmapPathMap({ modules, activeModuleId, completedModuleIds, resourceCounts, onSelect }: RoadmapPathMapProps) {
  const diagramNodes = createRoadmapDiagramNodes(modules);
  const completeCount = completedModuleIds.length;

  return (
    <nav aria-label="AI Automation learning path" className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b10] p-4 shadow-[0_28px_80px_rgba(0,0,0,.35)] sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_7%,rgba(234,75,113,.25),transparent_25rem),radial-gradient(circle_at_90%_92%,rgba(255,180,197,.13),transparent_24rem)]" />

      <div className="relative flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">The Data Tea · visual learning route</p>
          <h2 className="display mt-2 text-3xl leading-none text-white sm:text-4xl">Build capability in a <em className="text-[#ff9bb1]">visible sequence.</em></h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#b9b9c3]">Follow the connected checkpoints from a deliberate practice system to a portfolio-ready automation. Select any stop to open its outcome, practice prompt, and curated resources.</p>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 text-left lg:min-w-[240px]">
          <div className="bg-[#111116] px-4 py-3">
            <span className="mono block text-[9px] uppercase tracking-[.15em] text-[#858590]">Route status</span>
            <span className="mt-1 block text-xl font-extrabold text-white">{completeCount}<span className="ml-1 text-xs font-medium text-[#858590]">/ 9 done</span></span>
          </div>
          <div className="bg-[#111116] px-4 py-3">
            <span className="mono block text-[9px] uppercase tracking-[.15em] text-[#858590]">Map logic</span>
            <span className="mt-1 flex items-center gap-1.5 text-xs font-bold text-[#ffcfdb]"><ArrowDownRight className="size-3.5" /> Start → prove</span>
          </div>
        </div>
      </div>

      <figure className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,.055),rgba(255,255,255,.015))] p-3 sm:p-5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff9bb1] to-transparent opacity-60" />
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg border border-[#ea4b71]/50 bg-[#ea4b71]/15 text-[#ff9bb1]"><Sparkles className="size-3.5" /></span>
            <div>
              <p className="text-xs font-extrabold text-white">AI Automation Path</p>
              <p className="mono mt-0.5 text-[9px] uppercase tracking-[.14em] text-[#858590]">9 capability checkpoints · 10-week builder track</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mono text-[9px] uppercase tracking-[.12em] text-[#a6a6b1]" aria-label="Roadmap legend">
            <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full border border-[#ffcfdb] bg-[#111116]" /> Available</span>
            <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-[#ff9bb1]" /> Completed</span>
            <span className="inline-flex items-center gap-1.5"><i className="size-2 rounded-full bg-[#ea4b71] shadow-[0_0_0_3px_rgba(234,75,113,.2)]" /> In focus</span>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto pb-2 [scrollbar-color:rgba(255,155,177,.55)_transparent] [scrollbar-width:thin]">
          <div className="relative hidden h-[344px] min-w-[980px] md:block" aria-label="Connected nine-stage learning infographic">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 320" preserveAspectRatio="none" aria-hidden="true">
              <path d={`M ${diagramPath}`} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <path d={`M ${diagramPath}`} fill="none" stroke="url(#roadmap-pink-path)" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
              <defs>
                <linearGradient id="roadmap-pink-path" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#ffcfdb" />
                  <stop offset="0.48" stopColor="#ea4b71" />
                  <stop offset="1" stopColor="#ff9bb1" />
                </linearGradient>
              </defs>
            </svg>

            {diagramNodes.map((node, index) => {
              const module = modules[index];
              const tone = toneByModule[module.tone];
              const isActive = module.id === activeModuleId;
              const isDone = completedModuleIds.includes(module.id);
              const position = nodeCoordinates[index];
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => onSelect(node.id)}
                  aria-current={isActive ? "step" : undefined}
                  aria-pressed={isActive}
                  aria-controls="stage-detail"
                  aria-label={`${node.routeNumber}. ${node.label}. ${isDone ? "Completed." : "Available."} ${resourceCounts[node.id] ?? 0} learning resources.`}
                  className="group absolute z-10 w-28 -translate-x-1/2 text-center focus-visible:outline-none"
                  style={{ left: position.left, top: position.top }}
                >
                  <span className={`relative mx-auto flex size-16 items-center justify-center rounded-[1.25rem] border text-xs font-extrabold transition duration-200 group-hover:-translate-y-1 ${isActive ? "border-[#ff9bb1] bg-[#ea4b71] text-[#0b0b10] shadow-[0_0_0_6px_rgba(234,75,113,.16),0_14px_30px_rgba(234,75,113,.28)]" : "bg-[#111116] shadow-[0_0_0_5px_rgba(11,11,16,.96)]"}`} style={!isActive ? { borderColor: tone.line, color: isDone ? "#0b0b10" : tone.accent, background: isDone ? tone.accent : "#111116" } : undefined}>
                    {isDone && !isActive ? <Check className="size-5" strokeWidth={3} /> : node.routeNumber}
                    {isActive && <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full border border-[#0b0b10] bg-[#ffcfdb] text-[#0b0b10]"><CircleDot className="size-3" /></span>}
                  </span>
                  <span className={`mt-3 block text-xs font-extrabold transition ${isActive ? "text-[#ffcfdb]" : "text-white group-hover:text-[#ffcfdb]"}`}>{node.label}</span>
                  <span className="mt-1 block mono text-[8px] font-semibold uppercase tracking-[.12em] text-[#858590]">{module.duration}</span>
                  <span className="mt-2 inline-flex rounded-full border border-white/10 bg-black/20 px-2 py-1 mono text-[8px] uppercase tracking-[.1em] text-[#b9b9c3]">{resourceCounts[node.id] ?? 0} links</span>
                </button>
              );
            })}
          </div>

          <div className="relative grid gap-2 md:hidden" aria-label="AI Automation Path mobile sequence">
            {diagramNodes.map((node, index) => {
              const module = modules[index];
              const tone = toneByModule[module.tone];
              const isActive = module.id === activeModuleId;
              const isDone = completedModuleIds.includes(module.id);
              return (
                <div key={node.id} className="relative pl-12">
                  {!node.isTerminal && <span className="absolute bottom-[-10px] left-[19px] top-10 w-px bg-gradient-to-b from-[#ea4b71] to-white/10" aria-hidden="true" />}
                  <button
                    type="button"
                    onClick={() => onSelect(node.id)}
                    aria-current={isActive ? "step" : undefined}
                    aria-pressed={isActive}
                    aria-controls="stage-detail"
                    className={`relative flex min-h-14 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bb1] ${isActive ? "border-[#ea4b71] bg-[#19131b]" : "border-white/10 bg-white/[.035]"}`}
                  >
                    <span className="absolute -left-12 top-3 flex size-8 items-center justify-center rounded-lg border text-[9px] font-extrabold shadow-[0_0_0_4px_rgba(11,11,16,.95)]" style={{ borderColor: isActive ? "#ff9bb1" : tone.line, color: isDone || isActive ? "#0b0b10" : tone.accent, background: isActive ? "#ea4b71" : isDone ? tone.accent : "#111116" }}>{isDone && !isActive ? <Check className="size-3.5" strokeWidth={3} /> : node.routeNumber}</span>
                    <span>
                      <span className={`block text-sm font-extrabold ${isActive ? "text-[#ffcfdb]" : "text-white"}`}>{node.label}</span>
                      <span className="mt-0.5 block mono text-[9px] uppercase tracking-[.12em] text-[#858590]">{module.duration} · {resourceCounts[node.id] ?? 0} links</span>
                    </span>
                    <ArrowDownRight className={`size-4 shrink-0 ${isActive ? "text-[#ff9bb1]" : "text-[#858590]"}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <figcaption className="relative mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 mono text-[9px] font-semibold uppercase tracking-[.14em] text-[#858590]">
          <span>Start with a safe practice system. End with operational proof.</span>
          <span className="text-[#ffb4c5]">Select a checkpoint to inspect the route.</span>
        </figcaption>
      </figure>

      <div className="relative mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module, index) => {
          const isActive = module.id === activeModuleId;
          const isDone = completedModuleIds.includes(module.id);
          const tone = toneByModule[module.tone];
          const hasPrerequisite = index > 0;
          return (
            <div key={module.id} className="relative">
              {hasPrerequisite && <span className="absolute -top-3 left-8 hidden h-3 border-l border-dashed border-white/25 md:block xl:hidden" aria-hidden="true" />}
              <button
                type="button"
                onClick={() => onSelect(module.id)}
                aria-current={isActive ? "step" : undefined}
                aria-pressed={isActive}
                aria-controls="stage-detail"
                aria-label={`${module.route}: ${module.title}. ${resourceCounts[module.id] ?? 0} learning resources.`}
                className={`group relative flex min-h-[156px] w-full flex-col rounded-2xl border p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bb1] ${isActive ? "border-[#ea4b71] bg-[#19131b] shadow-[0_0_0_1px_rgba(234,75,113,.26),0_18px_36px_rgba(0,0,0,.26)]" : "border-white/10 bg-white/[.035] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[.06]"}`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 mono text-[10px] font-semibold uppercase tracking-[.14em]" style={{ color: tone.accent }}>
                    <span className="flex size-5 items-center justify-center rounded-full border" style={{ borderColor: tone.line, background: isDone ? tone.accent : tone.wash, color: isDone ? "#040506" : tone.accent }}>
                      {isDone ? <Check className="size-3" strokeWidth={3} /> : <CircleDot className="size-3" />}
                    </span>
                    {module.route}
                  </span>
                  <span className="mono text-[9px] uppercase tracking-[.12em] text-[#858590]">{module.duration}</span>
                </span>
                <span className="mt-5 text-lg font-extrabold leading-[1.05] text-white sm:text-xl">{module.title}</span>
                <span className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#a6a6b1]">
                  <span className="inline-flex items-center gap-1.5">{hasPrerequisite ? <LockKeyhole className="size-3 text-[#ff9bb1]" /> : <Route className="size-3 text-[#ff9bb1]" />}{hasPrerequisite ? "Builds on prior stage" : "Start here"}</span>
                  <span>{resourceCounts[module.id] ?? 0} links</span>
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
