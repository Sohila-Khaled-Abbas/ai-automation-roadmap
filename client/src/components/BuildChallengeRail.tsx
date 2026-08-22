import { ArrowRight, ExternalLink, Layers3, ShieldCheck } from "lucide-react";
import type { BuildChallenge } from "@/lib/roadmapData";

type BuildChallengeRailProps = {
  challenges: BuildChallenge[];
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
};

export function BuildChallengeRail({ challenges, activeModuleId, onSelectModule }: BuildChallengeRailProps) {
  return (
    <section id="builds" className="scroll-mt-16 bg-[#f4eee9] py-16 text-[#19171c] sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-7 border-b border-black/10 pb-9 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-[.18em] text-[#c92f55]">Build studio</p>
            <h2 className="display mt-4 max-w-xl text-5xl leading-[.9] tracking-[-.045em] sm:text-6xl">Projects that turn <em>skill</em> into proof.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#615c63]">Choose a project as you move through the route. Each challenge includes a clear operational outcome, the components to assemble, evidence to keep, and a public n8n template or guide for reference.</p>
        </div>

        <div className="mt-8 overflow-x-auto pb-3 [scrollbar-color:rgba(201,47,85,.55)_transparent] [scrollbar-width:thin]">
          <div className="grid min-w-max grid-flow-col auto-cols-[minmax(285px,1fr)] gap-3">
            {challenges.map((challenge) => {
              const isActive = challenge.moduleId === activeModuleId;
              return (
                <article key={challenge.id} className={`group flex min-h-[430px] flex-col rounded-[1.5rem] border p-5 transition duration-200 ${isActive ? "border-[#c92f55] bg-[#20141b] text-white shadow-[0_20px_42px_rgba(70,23,39,.22)]" : "border-black/10 bg-white hover:-translate-y-1 hover:border-[#c92f55]/45 hover:shadow-[0_16px_34px_rgba(40,28,33,.09)]"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className={`mono text-[9px] font-bold uppercase tracking-[.14em] ${isActive ? "text-[#ffb4c5]" : "text-[#c92f55]"}`}>{challenge.route}</p>
                        <p className={`mt-1 mono text-[8px] uppercase tracking-[.12em] ${isActive ? "text-[#b8a7ae]" : "text-[#888187]"}`}>{challenge.level}</p>
                    </div>
                    <span className={`flex size-8 items-center justify-center rounded-lg border ${isActive ? "border-[#ff9bb1]/45 bg-[#ea4b71] text-white" : "border-black/10 bg-[#f5e8ec] text-[#c92f55]"}`}><Layers3 className="size-4" /></span>
                  </div>
                  <h3 className={`display mt-8 text-3xl leading-[.93] tracking-[-.03em] ${isActive ? "text-white" : "text-[#201b20]"}`}>{challenge.title}</h3>
                  <p className={`mt-4 text-sm leading-6 ${isActive ? "text-[#d7c7cc]" : "text-[#655e65]"}`}>{challenge.summary}</p>
                  <ul className={`mt-6 space-y-2 border-t pt-5 text-xs font-semibold ${isActive ? "border-white/10 text-[#e9d8de]" : "border-black/10 text-[#39343a]"}`}>
                    {challenge.recipe.map((step) => <li key={step} className="flex gap-2"><span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${isActive ? "bg-[#ff9bb1]" : "bg-[#c92f55]"}`} />{step}</li>)}
                  </ul>
                    <div className={`mt-auto border-t pt-5 ${isActive ? "border-white/10" : "border-black/10"}`}>
                      <p className={`mono flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[.12em] ${isActive ? "text-[#ffb4c5]" : "text-[#c92f55]"}`}><ShieldCheck className="size-3" /> Keep this proof</p>
                      <p className={`mt-2 text-xs leading-5 ${isActive ? "text-[#d7c7cc]" : "text-[#655e65]"}`}>{challenge.proof}</p>
                      <p className={`mt-3 truncate mono text-[8px] uppercase tracking-[.1em] ${isActive ? "text-[#b8a7ae]" : "text-[#817780]"}`}>{challenge.provider ?? "n8n"} · {challenge.source ?? "Curated build reference"}</p>
                      <div className="mt-5 flex items-center justify-between gap-3">
                      <button type="button" onClick={() => onSelectModule(challenge.moduleId)} className={`inline-flex items-center gap-1 text-xs font-extrabold ${isActive ? "text-[#ffcfdb]" : "text-[#c92f55]"}`}>Open stage <ArrowRight className="size-3.5" /></button>
                      <a href={challenge.templateUrl} target="_blank" rel="noreferrer" aria-label={`${challenge.templateLabel} (opens in a new tab)`} className={`flex size-8 items-center justify-center rounded-full border transition ${isActive ? "border-white/15 text-[#ffb4c5] hover:border-[#ff9bb1] hover:text-white" : "border-black/10 text-[#c92f55] hover:border-[#c92f55]"}`}><ExternalLink className="size-3.5" /></a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <p className="mt-2 mono text-[9px] uppercase tracking-[.12em] text-[#7e747b]">Scroll horizontally to explore the full build sequence · external references open the official n8n source</p>
      </div>
    </section>
  );
}
