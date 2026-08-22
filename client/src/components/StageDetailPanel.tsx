import { ArrowRight, Check, ExternalLink, Sparkles, Waypoints } from "lucide-react";
import type { RoadmapModule } from "@/lib/roadmapData";
import { getLearningSequenceGuide } from "@/lib/learningSequence";

type LearningResourcePreview = {
  id: number;
  title: string;
  description: string;
  url: string;
  provider: string;
  resourceType: string;
  effort: string;
  source: string;
};

type StageDetailPanelProps = {
  module: RoadmapModule;
  resources: LearningResourcePreview[];
  isComplete: boolean;
  onToggleComplete: () => void;
  onBrowseAll: () => void;
};

export function StageDetailPanel({ module, resources, isComplete, onToggleComplete, onBrowseAll }: StageDetailPanelProps) {
  const previewResources = resources.slice(0, 6);
  const sequenceGuide = getLearningSequenceGuide(module.id);
  return (
    <section id="stage-detail" className="scroll-mt-24 border-y border-white/10 bg-[#111117] py-12 sm:py-16">
      <div className="mx-auto grid max-w-[1480px] gap-8 px-5 sm:px-8 lg:grid-cols-[.86fr_1.14fr] lg:px-10">
        <div className="rounded-[1.75rem] border border-[#ea4b71]/35 bg-[#17131a] p-6 sm:p-8">
          <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">Selected stage · {module.route}</p>
          <h2 className="display mt-4 text-4xl leading-[.95] text-white sm:text-5xl">{module.title}</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#c5c5ce]">{module.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">{module.skills.map((skill) => <span key={skill} className="rounded-full border border-[#ea4b71]/30 bg-[#ea4b71]/10 px-3 py-1.5 text-xs font-bold text-[#ffb4c5]">{skill}</span>)}</div>
          <div className="mt-7 rounded-2xl border border-[#ea4b71]/25 bg-[#ea4b71]/[.06] p-4">
            <p className="mono text-[9px] font-bold uppercase tracking-[.14em] text-[#ffb4c5]">Learning handoff</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2"><div><p className="mono text-[8px] uppercase tracking-[.12em] text-[#a99da7]">Bring forward</p><p className="mt-1.5 text-xs font-semibold leading-5 text-white">{sequenceGuide.prerequisite}</p></div><div><p className="mono text-[8px] uppercase tracking-[.12em] text-[#a99da7]">New source focus</p><p className="mt-1.5 text-xs font-semibold leading-5 text-white">{sequenceGuide.sourceFocus}</p></div></div>
          </div>
          <div className="mt-7 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
            <div><p className="mono text-[10px] uppercase tracking-[.14em] text-[#ffb4c5]">Field deliverable</p><p className="mt-2 text-sm font-bold leading-6 text-white">{module.deliverable}</p></div>
            <div><p className="mono text-[10px] uppercase tracking-[.14em] text-[#ffb4c5]">Builder prompt</p><p className="mt-2 text-sm italic leading-6 text-[#c1c1cb]">“{module.prompt}”</p></div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-6">
            <button type="button" onClick={onToggleComplete} className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors ${isComplete ? "border border-[#ea4b71]/30 bg-[#ea4b71]/10 text-[#ffb4c5]" : "bg-[#ea4b71] text-white hover:bg-[#ff7795]"}`}>
              {isComplete ? <Check className="size-4" /> : <Waypoints className="size-4" />}{isComplete ? "Marked on this device" : "Mark complete on this device"}
            </button>
            <button type="button" onClick={onBrowseAll} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-extrabold text-white hover:border-[#ea4b71]/60">Browse stage resources <ArrowRight className="size-4" /></button>
          </div>
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-black/20 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">Curated for this stage</p><h3 className="display mt-2 text-3xl leading-none text-white">Learn with <em className="text-[#ff9bb1]">evidence.</em></h3></div><span className="flex size-10 items-center justify-center rounded-full border border-[#ea4b71]/35 bg-[#ea4b71]/10 text-[#ffb4c5]"><Sparkles className="size-4" /></span></div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {previewResources.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-white/10 bg-white/[.035] p-4 transition-colors hover:border-[#ea4b71]/60 hover:bg-white/[.06]"><span className="mono text-[9px] uppercase tracking-[.12em] text-[#ffb4c5]">{resource.resourceType} · {resource.effort}</span><span className="mt-2 flex gap-2 text-sm font-bold leading-5 text-white">{resource.title}<ExternalLink className="mt-0.5 size-3.5 shrink-0 text-[#ffb4c5]" /></span><span className="mt-2 block text-xs text-[#a6a6b1]">{resource.provider}</span></a>)}
            {previewResources.length === 0 && <p className="rounded-xl border border-dashed border-white/15 p-5 text-sm leading-6 text-[#b9b9c2]">Resources for this stage are loading. Select another stage or use the library search while the collection is prepared.</p>}
          </div>
          {resources.length > previewResources.length && <p className="mt-4 text-xs text-[#a6a6b1]">Showing 6 of {resources.length} stage resources. Use the full library to refine further.</p>}
        </div>
      </div>
    </section>
  );
}
