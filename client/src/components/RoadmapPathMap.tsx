import { ArrowRight, Check, Compass, GitBranch, Sparkles, Target, Wrench } from "lucide-react";
import type { RoadmapModule } from "@/lib/roadmapData";
import { createRoadmapDiagramNodes, createRoadmapMindMapBranches, type RoadmapMindMapBranch } from "@/lib/roadmapDiagram";

type RoadmapPathMapProps = {
  modules: RoadmapModule[];
  activeModuleId: string;
  completedModuleIds: string[];
  resourceCounts: Record<string, number>;
  onSelect: (moduleId: string) => void;
};

type CanvasPoint = { left: string; top: string; x: number; y: number };
type BranchOffset = Record<RoadmapMindMapBranch["kind"], { x: number; y: number }>;

const toneByModule: Record<RoadmapModule["tone"], { accent: string; wash: string; line: string }> = {
  amber: { accent: "#ffb0c2", wash: "rgba(255,176,194,.12)", line: "rgba(255,176,194,.48)" },
  mint: { accent: "#b6ead5", wash: "rgba(182,234,213,.11)", line: "rgba(182,234,213,.42)" },
  coral: { accent: "#ff7e9c", wash: "rgba(234,75,113,.18)", line: "rgba(234,75,113,.62)" },
};

const canvasPoints: CanvasPoint[] = [
  { left: "11%", top: "18%", x: 11, y: 19 },
  { left: "30%", top: "39%", x: 30, y: 40 },
  { left: "51%", top: "16%", x: 51, y: 17 },
  { left: "72%", top: "37%", x: 72, y: 38 },
  { left: "89%", top: "18%", x: 89, y: 19 },
  { left: "84%", top: "72%", x: 84, y: 72 },
  { left: "61%", top: "83%", x: 61, y: 83 },
  { left: "37%", top: "70%", x: 37, y: 70 },
  { left: "13%", top: "82%", x: 13, y: 82 },
];

const branchOffsets: BranchOffset[] = [
  { skill: { x: 6, y: -12 }, tool: { x: 15, y: 2 }, proof: { x: 4, y: 13 } },
  { skill: { x: -12, y: -6 }, tool: { x: 9, y: -12 }, proof: { x: 12, y: 12 } },
  { skill: { x: -2, y: -14 }, tool: { x: 15, y: -5 }, proof: { x: -13, y: 10 } },
  { skill: { x: 9, y: -12 }, tool: { x: -14, y: -8 }, proof: { x: 13, y: 11 } },
  { skill: { x: -11, y: -13 }, tool: { x: -18, y: 1 }, proof: { x: -12, y: 12 } },
  { skill: { x: -15, y: -11 }, tool: { x: -18, y: 4 }, proof: { x: -8, y: 13 } },
  { skill: { x: -1, y: -15 }, tool: { x: 14, y: -7 }, proof: { x: -13, y: 11 } },
  { skill: { x: 1, y: -14 }, tool: { x: -14, y: -4 }, proof: { x: 11, y: 13 } },
  { skill: { x: 11, y: -12 }, tool: { x: 15, y: 2 }, proof: { x: 12, y: 13 } },
];

const pathD = canvasPoints.map((point) => `${point.x} ${point.y}`).join(" L ");

function getBranchIcon(kind: "skill" | "tool" | "proof") {
  if (kind === "skill") return <Sparkles className="size-3" aria-hidden="true" />;
  if (kind === "tool") return <Wrench className="size-3" aria-hidden="true" />;
  return <Target className="size-3" aria-hidden="true" />;
}

export function RoadmapPathMap({ modules, activeModuleId, completedModuleIds, resourceCounts, onSelect }: RoadmapPathMapProps) {
  const diagramNodes = createRoadmapDiagramNodes(modules);
  const branches: RoadmapMindMapBranch[] = createRoadmapMindMapBranches(modules);
  const activeIndex = Math.max(0, modules.findIndex((module) => module.id === activeModuleId));
  const activeModule = modules[activeIndex] ?? modules[0];
  const activeBranches = branches.filter((branch) => branch.nodeId === activeModule?.id);
  const completedCount = completedModuleIds.length;
  const nextNode = diagramNodes.find((node) => !completedModuleIds.includes(node.id)) ?? diagramNodes.at(-1);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a090d] shadow-[0_28px_85px_rgba(0,0,0,.42)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_7%_11%,rgba(234,75,113,.24),transparent_25rem),radial-gradient(circle_at_87%_82%,rgba(182,234,213,.12),transparent_30rem)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[.13] [background-image:linear-gradient(rgba(255,255,255,.38)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.38)_1px,transparent_1px)] [background-size:42px_42px]" />

      <header className="relative border-b border-white/10 px-5 py-6 sm:px-7 lg:px-9">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl">
            <p className="mono text-[10px] font-bold uppercase tracking-[.19em] text-[#ffb4c5]">Roadmap mind map · 09 connected systems</p>
            <h2 className="display mt-3 text-4xl leading-[.88] tracking-[-.045em] text-white sm:text-5xl">See the route — then <em className="text-[#ff9bb1]">see what it unlocks.</em></h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#bbb5bd]">The learning spine follows a deliberate build order. Select any hub to reveal its immediate skill, tool, and proof branches without losing the wider automation system.</p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[.04] text-left xl:min-w-[385px]">
            <div className="border-r border-white/10 px-4 py-3.5"><span className="mono block text-[8px] font-bold uppercase tracking-[.14em] text-[#8e8790]">Proofs logged</span><strong className="mt-1 block text-lg text-white">{completedCount}<span className="ml-1 text-[11px] font-medium text-[#9d969f]">/ 9</span></strong></div>
            <div className="border-r border-white/10 px-4 py-3.5"><span className="mono block text-[8px] font-bold uppercase tracking-[.14em] text-[#8e8790]">Map depth</span><strong className="mt-1 block text-lg text-white">27<span className="ml-1 text-[11px] font-medium text-[#9d969f]">branches</span></strong></div>
            <div className="px-4 py-3.5"><span className="mono block text-[8px] font-bold uppercase tracking-[.14em] text-[#8e8790]">Next unlock</span><strong className="mt-1 block truncate text-[11px] text-[#ffcfdb]">{nextNode?.label ?? "Capstone"}</strong></div>
          </div>
        </div>
      </header>

      <div className="relative grid xl:grid-cols-[245px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-black/20 p-5 xl:border-b-0 xl:border-r xl:p-6">
          <div className="flex items-center gap-2 text-[#ffb4c5]"><GitBranch className="size-4" /><span className="mono text-[9px] font-bold uppercase tracking-[.16em]">Map navigator</span></div>
          <p className="mt-3 text-sm leading-6 text-[#d0c9cf]">The central line is the essential build sequence. Each hub grows three branches: what to learn, what to use, and what to prove.</p>
          <div className="mt-5 grid grid-cols-3 gap-2 xl:grid-cols-1">
            {([
              ["Skill", "A capability to practice", "#ffb0c2"],
              ["Tool", "A hands-on surface", "#b6ead5"],
              ["Proof", "Visible evidence", "#ff7e9c"],
            ] as const).map(([label, note, color]) => <div key={label} className="rounded-xl border border-white/10 bg-white/[.03] px-3 py-2.5"><span className="mono text-[8px] font-bold uppercase tracking-[.13em]" style={{ color }}>{label}</span><span className="mt-1 hidden text-[11px] leading-4 text-[#aaa1aa] xl:block">{note}</span></div>)}
          </div>
          <div className="mt-6 hidden xl:block">
            {diagramNodes.map((node, index) => {
              const module = modules[index];
              const isActive = module.id === activeModuleId;
              const isComplete = completedModuleIds.includes(module.id);
              return <button key={node.id} type="button" onClick={() => onSelect(node.id)} aria-current={isActive ? "step" : undefined} aria-controls="stage-detail" className={`group flex w-full items-center gap-3 border-l-2 px-3 py-2.5 text-left transition ${isActive ? "border-[#ea4b71] bg-[#ea4b71]/10" : "border-transparent hover:border-white/30 hover:bg-white/[.045]"}`}><span className={`flex size-6 shrink-0 items-center justify-center rounded-md border text-[9px] font-extrabold ${isActive ? "border-[#ff9bb1] bg-[#ea4b71] text-white" : isComplete ? "border-[#ffcfdb] bg-[#ffcfdb] text-[#130f14]" : "border-white/15 bg-white/[.04] text-[#c9c1c8]"}`}>{isComplete && !isActive ? <Check className="size-3" strokeWidth={3} /> : node.routeNumber}</span><span className="min-w-0"><span className={`block truncate text-xs font-bold ${isActive ? "text-white" : "text-[#c6c0c7]"}`}>{node.label}</span><span className="mono mt-0.5 block text-[8px] uppercase tracking-[.1em] text-[#847d87]">{module.duration}</span></span></button>;
            })}
          </div>
        </aside>

        <figure className="relative min-h-[720px] overflow-hidden p-4 sm:p-7 xl:min-h-[760px] xl:p-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_43%,rgba(234,75,113,.11),transparent_30rem)]" />
          <div className="relative hidden h-[640px] xl:block" aria-label="Connected nine-stage AI Automation roadmap mind map">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <path d={`M ${pathD}`} fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
              <path d={`M ${pathD}`} fill="none" stroke="url(#mind-map-glow)" strokeWidth="1" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
              {canvasPoints.map((point, index) => {
                const offsets = branchOffsets[index];
                return ([offsets.skill, offsets.tool, offsets.proof] as const).map((offset, branchIndex) => <line key={`${index}-${branchIndex}`} x1={point.x} y1={point.y} x2={point.x + offset.x} y2={point.y + offset.y} stroke="rgba(255,255,255,.16)" strokeWidth=".65" strokeDasharray="1 3" vectorEffect="non-scaling-stroke" />);
              })}
              <path d="M 30 40 C 39 44, 38 62, 37 70" fill="none" stroke="rgba(182,234,213,.24)" strokeWidth=".75" strokeDasharray="1 4" vectorEffect="non-scaling-stroke" />
              <path d="M 72 38 C 79 43, 88 55, 84 72" fill="none" stroke="rgba(255,176,194,.24)" strokeWidth=".75" strokeDasharray="1 4" vectorEffect="non-scaling-stroke" />
              <defs><linearGradient id="mind-map-glow" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#b6ead5" /><stop offset=".46" stopColor="#ea4b71" /><stop offset="1" stopColor="#ffb0c2" /></linearGradient></defs>
            </svg>

            <div className="absolute left-1/2 top-[46%] z-10 flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/10 bg-[#100e13]/90 text-center shadow-[0_0_0_12px_rgba(10,9,13,.72),0_22px_48px_rgba(0,0,0,.3)] backdrop-blur-sm"><Compass className="size-5 text-[#ff9bb1]" /><span className="mono mt-2 text-[8px] font-bold uppercase tracking-[.17em] text-[#9c929c]">The Data Tea</span><span className="mt-1 text-xs font-extrabold text-white">Observe → ship</span><span className="mt-1 text-[9px] text-[#b7adb6]">practice loop</span></div>

            {diagramNodes.map((node, index) => {
              const module = modules[index];
              const tone = toneByModule[module.tone];
              const isActive = module.id === activeModuleId;
              const isComplete = completedModuleIds.includes(module.id);
              const position = canvasPoints[index];
              const nodeBranches = branches.filter((branch) => branch.nodeId === node.id);
              return <div key={node.id}>
                <button type="button" onClick={() => onSelect(node.id)} aria-current={isActive ? "step" : undefined} aria-pressed={isActive} aria-controls="stage-detail" aria-label={`${node.routeNumber}. ${node.label}. ${isComplete ? "Completed." : "Available."} ${resourceCounts[node.id] ?? 0} learning resources.`} className="group absolute z-20 w-[148px] -translate-x-1/2 -translate-y-1/2 text-left focus-visible:outline-none" style={{ left: position.left, top: position.top }}><span className={`block rounded-2xl border px-3.5 py-3.5 transition duration-200 group-hover:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-[#ffb4c5] ${isActive ? "border-[#ff9bb1] bg-[#24131b] shadow-[0_0_0_5px_rgba(234,75,113,.15),0_18px_34px_rgba(0,0,0,.3)" : "border-white/12 bg-[#121015]/92 hover:border-white/30"}`}><span className="flex items-center justify-between gap-2"><span className="mono text-[9px] font-extrabold tracking-[.1em]" style={{ color: isActive ? "#ffb4c5" : tone.accent }}>{isComplete ? <span className="inline-flex items-center gap-1"><Check className="size-3" strokeWidth={3} /> DONE</span> : node.routeNumber}</span><span className={`flex size-5 items-center justify-center rounded-full border ${isActive ? "border-[#ff9bb1] bg-[#ea4b71] text-white" : "bg-black/20"}`} style={!isActive ? { borderColor: tone.line, color: tone.accent } : undefined}>{isActive ? <Sparkles className="size-3" /> : <GitBranch className="size-2.5" />}</span></span><span className={`mt-4 block text-sm font-extrabold leading-[1.02] ${isActive ? "text-white" : "text-[#f1e9ee]"}`}>{node.label}</span><span className="mt-2 flex items-center justify-between gap-2 border-t border-white/10 pt-2 mono text-[8px] uppercase tracking-[.1em] text-[#918894]"><span>{module.duration}</span><span>{resourceCounts[node.id] ?? 0} refs</span></span></span></button>
                {nodeBranches.map((branch) => {
                  const offset = branchOffsets[index][branch.kind];
                  const isVisible = isActive || index === activeIndex - 1 || index === activeIndex + 1;
                  return <span key={branch.id} className={`pointer-events-none absolute z-10 max-w-[118px] -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1.5 text-center transition duration-300 ${isVisible ? "border-white/15 bg-[#141217]/95 opacity-100" : "border-white/5 bg-[#141217]/65 opacity-45"}`} style={{ left: `calc(${position.left} + ${offset.x}%)`, top: `calc(${position.top} + ${offset.y}%)` }}><span className="flex items-center justify-center gap-1.5"><span style={{ color: tone.accent }}>{getBranchIcon(branch.kind)}</span><span className="mono text-[7px] font-bold uppercase tracking-[.1em] text-[#a79ca6]">{branch.kind}</span></span><span className="mt-1 block line-clamp-2 text-[9px] font-semibold leading-[1.15] text-[#ded5dc]">{branch.label}</span></span>;
                })}
              </div>;
            })}
          </div>

          <div className="relative grid gap-3 xl:hidden" aria-label="Mobile AI Automation roadmap mind map">
            <div className="rounded-2xl border border-[#ea4b71]/25 bg-[#ea4b71]/10 p-4"><span className="mono text-[9px] font-bold uppercase tracking-[.14em] text-[#ffb4c5]">Selected hub</span><div className="mt-2 flex items-center justify-between gap-3"><span className="text-lg font-extrabold text-white">{activeModule?.route}</span><span className="rounded-full bg-[#ea4b71] px-2 py-1 mono text-[8px] font-bold uppercase tracking-[.1em] text-white">{resourceCounts[activeModule?.id ?? ""] ?? 0} refs</span></div><div className="mt-3 flex flex-wrap gap-2">{activeBranches.map((branch) => <span key={branch.id} className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2.5 py-1.5 text-[10px] text-[#dfd6dd]"><span className="text-[#ffb4c5]">{getBranchIcon(branch.kind)}</span><span className="font-semibold">{branch.label}</span></span>)}</div></div>
            {diagramNodes.map((node, index) => {
              const module = modules[index];
              const isActive = module.id === activeModuleId;
              const isComplete = completedModuleIds.includes(module.id);
              return <div key={node.id} className="relative pl-12">{index < diagramNodes.length - 1 && <span className="absolute bottom-[-13px] left-[19px] top-10 w-px bg-gradient-to-b from-[#ea4b71] via-[#b6ead5]/55 to-white/10" aria-hidden="true" />}<button type="button" onClick={() => onSelect(node.id)} aria-current={isActive ? "step" : undefined} aria-controls="stage-detail" className={`relative flex min-h-[76px] w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff9bb1] ${isActive ? "border-[#ea4b71] bg-[#24131b]" : "border-white/10 bg-white/[.035]"}`}><span className={`absolute -left-12 top-5 flex size-8 items-center justify-center rounded-lg border text-[9px] font-extrabold shadow-[0_0_0_4px_rgba(10,9,13,.96)] ${isActive ? "border-[#ff9bb1] bg-[#ea4b71] text-white" : isComplete ? "border-[#ffcfdb] bg-[#ffcfdb] text-[#0c0a0d]" : "border-white/15 bg-[#151217] text-[#e5d8df]"}`}>{isComplete && !isActive ? <Check className="size-3.5" strokeWidth={3} /> : node.routeNumber}</span><span><span className={`block text-sm font-extrabold ${isActive ? "text-[#ffcfdb]" : "text-white"}`}>{node.label}</span><span className="mt-1 block mono text-[9px] uppercase tracking-[.12em] text-[#8f858e]">{module.duration} · {module.skills[0]} · {resourceCounts[node.id] ?? 0} references</span></span><ArrowRight className={`size-4 shrink-0 ${isActive ? "text-[#ff9bb1]" : "text-[#817780]"}`} /></button></div>;
            })}
          </div>

          <figcaption className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 mono text-[9px] font-bold uppercase tracking-[.13em] text-[#89808a]"><span>Solid spine: essential sequence · dotted rays: skill, tool, and proof branches</span><span className="text-[#ffb4c5]">Select a hub to bring its cluster forward.</span></figcaption>
        </figure>
      </div>
    </section>
  );
}
