import { ArrowRight, ExternalLink, ScanSearch } from "lucide-react";
import { caseStudyLenses } from "@/lib/caseStudyLenses";

type CaseStudyLensProps = {
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
};

export function CaseStudyLens({ activeModuleId, onSelectModule }: CaseStudyLensProps) {
  return (
    <section id="casebook" className="scroll-mt-16 border-y border-white/[.08] bg-[#171219] py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-7 border-b border-white/10 pb-9 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mono text-[10px] font-bold uppercase tracking-[.18em] text-[#ffb4c5]">Casebook lens</p>
            <h2 className="display mt-4 max-w-xl text-5xl leading-[.9] tracking-[-.045em] sm:text-6xl">Read a business story like an <em className="text-[#ff9bb1]">operator.</em></h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#c9c0ca]">These source-linked prompts turn official n8n business contexts into design practice. They are not claims about your future results; use them to identify triggers, boundaries, approvals, and evidence before you build.</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {caseStudyLenses.map((lens) => {
            const isActive = lens.moduleId === activeModuleId;
            return (
              <article key={lens.id} className={`flex min-h-[330px] flex-col rounded-[1.5rem] border p-6 transition duration-200 ${isActive ? "border-[#ea4b71]/70 bg-[#25151e] shadow-[0_20px_44px_rgba(0,0,0,.28)]" : "border-white/10 bg-white/[.035] hover:-translate-y-1 hover:border-[#ff9bb1]/45"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div><p className="mono text-[9px] font-bold uppercase tracking-[.14em] text-[#ffb4c5]">{lens.route}</p><p className="mt-2 text-xs font-bold text-white">{lens.organization}</p></div>
                  <span className="flex size-9 items-center justify-center rounded-xl border border-[#ea4b71]/35 bg-[#ea4b71]/10 text-[#ffb4c5]"><ScanSearch className="size-4" /></span>
                </div>
                <h3 className="display mt-7 text-3xl leading-[.93] tracking-[-.03em] text-white">{lens.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#c9c0ca]">{lens.focus}</p>
                <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-xs font-semibold text-[#e3dbe4]">{lens.prompts.map((prompt) => <li key={prompt} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#ff9bb1]" />{prompt}</li>)}</ul>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-5"><button type="button" onClick={() => onSelectModule(lens.moduleId)} className="inline-flex items-center gap-1 text-xs font-extrabold text-[#ffcfdb] hover:text-white">Open route stage <ArrowRight className="size-3.5" /></button><a href={lens.url} target="_blank" rel="noreferrer" className="flex size-8 items-center justify-center rounded-full border border-white/15 text-[#ffb4c5] transition hover:border-[#ff9bb1] hover:text-white" aria-label={`Open ${lens.source} in a new tab`}><ExternalLink className="size-3.5" /></a></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
