import { Check, CircleDot, LockKeyhole, Route } from "lucide-react";
import type { RoadmapModule } from "@/lib/roadmapData";

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

const diagramLabelByModule: Record<string, string> = {
  prepare: "Prepare",
  orient: "Orient",
  connect: "Connect",
  orchestrate: "Build",
  shape: "Shape",
  augment: "Augment",
  operate: "Operate",
  agents: "Agents",
  capstone: "Capstone",
};

export function RoadmapPathMap({ modules, activeModuleId, completedModuleIds, resourceCounts, onSelect }: RoadmapPathMapProps) {
  return (
    <nav aria-label="AI Automation learning path" className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b10] p-4 shadow-[0_28px_80px_rgba(0,0,0,.35)] sm:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(234,75,113,.2),transparent_27rem),radial-gradient(circle_at_90%_86%,rgba(255,180,197,.1),transparent_24rem)]" />
      <div className="relative flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">Interactive learning map</p>
          <h2 className="display mt-2 text-3xl leading-none text-white sm:text-4xl">Find your next <em className="text-[#ff9bb1]">useful move.</em></h2>
        </div>
        <p className="max-w-xs text-xs leading-5 text-[#a6a6b1]">Choose a stage to open its skills, build outcome, and selected resources.</p>
      </div>

      <figure className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
        <div className="pointer-events-none absolute left-[8%] right-[8%] top-[3.35rem] hidden h-px bg-gradient-to-r from-[#ff9bb1]/20 via-[#ea4b71] to-[#ff9bb1]/20 md:block" aria-hidden="true" />
        <div className="relative grid grid-cols-3 gap-x-2 gap-y-4 md:grid-cols-9">
          {modules.map((module) => {
            const isActive = module.id === activeModuleId;
            const isDone = completedModuleIds.includes(module.id);
            const tone = toneByModule[module.tone];
            return (
              <button
                key={module.id}
                type="button"
                onClick={() => onSelect(module.id)}
                aria-current={isActive ? "step" : undefined}
                aria-controls="stage-detail"
                className="group z-10 flex min-h-20 flex-col items-center rounded-xl px-1 py-2 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bb1]"
              >
                <span className="flex size-10 items-center justify-center rounded-full border-2 text-[10px] font-extrabold shadow-[0_0_0_5px_rgba(4,5,6,.9)] transition-transform duration-200 group-hover:scale-110" style={{ borderColor: isActive ? "#ea4b71" : tone.line, background: isDone ? tone.accent : "#121216", color: isDone ? "#040506" : tone.accent }}>
                  {isDone ? <Check className="size-4" strokeWidth={3} /> : module.route.split(" ")[0]}
                </span>
                <span className={`mt-2 text-[10px] font-bold leading-3 ${isActive ? "text-white" : "text-[#b9b9c3]"}`}>{diagramLabelByModule[module.id] ?? module.title}</span>
              </button>
            );
          })}
        </div>
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 mono text-[9px] font-semibold uppercase tracking-[.14em] text-[#858590]">
          <span>Foundation → workflow craft → AI systems → operational proof</span>
          <span>9 connected capability checkpoints</span>
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
