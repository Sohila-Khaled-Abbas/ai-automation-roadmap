/**
 * The Data Tea AI Automation Path: public learning discovery with browser-local route progress
 * and source-backed project ideas, resources, and contribution guidance.
 */
import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowRight, BookOpen, ClipboardList, Compass, Download, ExternalLink, Github, Menu, Printer, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";
import { BuildChallengeRail } from "@/components/BuildChallengeRail";
import { CaseStudyLens } from "@/components/CaseStudyLens";
import { RoadmapPathMap } from "@/components/RoadmapPathMap";
import { StageDetailPanel } from "@/components/StageDetailPanel";
import { normalizeLocalProgress, toggleLocalProgress } from "@/lib/localRoadmapProgress";
import { trpc } from "@/lib/trpc";
import { filterLibraryView, visibleLibraryResources } from "@/lib/libraryView";
import { type ResourceFilterValue } from "@/lib/resourceFilters";
import { roadmapModules } from "@/lib/roadmapData";
import { toBuildChallenges, type PersistedRoadmapProject } from "@/lib/projectView";

type LearningResource = {
  id: number;
  moduleId: string;
  title: string;
  description: string;
  url: string;
  provider: string;
  resourceType: "course" | "guide" | "template" | "reference" | "video";
  effort: string;
  source: string;
};

type ResourceFilter = ResourceFilterValue;

const RESOURCE_BATCH_SIZE = 12;
const LOCAL_PROGRESS_KEY = "the-data-tea-roadmap-progress-v1";
const GITHUB_CONTENT_PROPOSAL_URL = "https://github.com/Sohila-Khaled-Abbas/ai-automation-roadmap/issues/new?template=content_proposal.md";
const resourceFilters: Array<{ id: ResourceFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "video", label: "Video" },
  { id: "guide", label: "Guides" },
  { id: "notebook", label: "Notebook" },
  { id: "course", label: "Courses" },
  { id: "template", label: "Templates" },
  { id: "reference", label: "References" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [activeModuleId, setActiveModuleId] = useState("orient");
  const [completeIds, setCompleteIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return normalizeLocalProgress(JSON.parse(window.localStorage.getItem(LOCAL_PROGRESS_KEY) ?? "[]"), roadmapModules.map((module) => module.id));
    } catch {
      return [];
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourceQuery, setResourceQuery] = useState("");
  const [resourceFilter, setResourceFilter] = useState<ResourceFilter>("all");
  const [libraryStage, setLibraryStage] = useState("all");
  const [resourceLimit, setResourceLimit] = useState(RESOURCE_BATCH_SIZE);
  const learningResources = trpc.resources.list.useQuery();
  const roadmapProjects = trpc.projects.list.useQuery();

  const resourceList = (learningResources.data ?? []) as LearningResource[];
  const buildChallenges = useMemo(() => toBuildChallenges((roadmapProjects.data ?? []) as PersistedRoadmapProject[]), [roadmapProjects.data]);
  const resourcesByModule = useMemo<Record<string, LearningResource[]>>(() => resourceList.reduce((collection, resource) => {
    (collection[resource.moduleId] ??= []).push(resource);
    return collection;
  }, {} as Record<string, LearningResource[]>), [resourceList]);
  const resourceCounts = useMemo(() => Object.fromEntries(Object.entries(resourcesByModule).map(([moduleId, resources]) => [moduleId, resources.length])), [resourcesByModule]);
  const templateCount = useMemo(() => resourceList.filter((resource) => resource.resourceType === "template").length, [resourceList]);
  const filteredResources = useMemo(() => filterLibraryView(resourceList, resourceFilter, resourceQuery, libraryStage), [libraryStage, resourceFilter, resourceList, resourceQuery]);
  const visibleResources = useMemo(() => visibleLibraryResources(filteredResources, resourceLimit), [filteredResources, resourceLimit]);
  const activeModule = roadmapModules.find((module) => module.id === activeModuleId) ?? roadmapModules[0];
  const progress = Math.round((completeIds.length / roadmapModules.length) * 100);
  const libraryMetric = learningResources.isLoading || learningResources.error ? "Curated resources" : `${resourceList.length} curated references`;

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(completeIds));
    } catch {
      // Browser storage is optional; the current view remains usable without it.
    }
  }, [completeIds]);
  useEffect(() => { setResourceLimit(RESOURCE_BATCH_SIZE); }, [libraryStage, resourceFilter, resourceQuery]);
  useEffect(() => {
    if ((resourceQuery.trim() || resourceFilter !== "all" || libraryStage !== "all") && !learningResources.isLoading && !learningResources.error && filteredResources.length === 0) {
      toast.info("No resources match this view. Clear the controls to browse the whole library.");
    }
  }, [filteredResources.length, libraryStage, learningResources.error, learningResources.isLoading, resourceFilter, resourceQuery]);

  const selectModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    window.setTimeout(() => scrollToId("stage-detail"), 0);
  };
  const toggleComplete = (moduleId: string) => {
    setCompleteIds((current) => toggleLocalProgress(current, moduleId));
    toast.success(completeIds.includes(moduleId) ? "Route checkpoint cleared on this device." : "Route checkpoint saved on this device.");
  };
  const browseStageResources = () => {
    setLibraryStage(activeModule.id);
    setResourceFilter("all");
    setResourceQuery("");
    window.setTimeout(() => scrollToId("library"), 0);
  };
  const clearLibrary = () => {
    setResourceFilter("all");
    setResourceQuery("");
    setLibraryStage("all");
  };
  const downloadFieldNotes = () => {
    const note = ["The Data Tea · AI Automation Path", "", "Local route progress", ...roadmapModules.map((module) => `${completeIds.includes(module.id) ? "[x]" : "[ ]"} ${module.route} · ${module.title} — ${module.deliverable}`), "", "Progress is stored only in this browser unless you save this field note."].join("\n");
    const blob = new Blob([note], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "the-data-tea-ai-automation-route.md";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const navigation = [["Roadmap", "roadmap"], ["Build studio", "builds"], ["Casebook", "casebook"], ["Resource index", "library"], ["Field kit", "field-kit"], ["Contribute", "suggestions"]] as const;

  return (
    <main id="main-content" className="min-h-screen overflow-x-hidden bg-[#09080b] text-white">
      <a className="skip-link" href="#roadmap">Skip to roadmap</a>
      <header className="sticky top-0 z-50 border-b border-white/[.08] bg-[#09080b]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="The Data Tea AI Automation Path home"><img src="/manus-storage/the-data-tea-automation-mark_85c07dab.png" alt="" className="size-9 object-contain" /><span><span className="display block text-lg tracking-[-.03em] text-white">The Data Tea</span><span className="mono mt-0.5 block text-[9px] font-bold uppercase tracking-[.16em] text-[#ffb4c5]">AI Automation Path</span></span></a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">{navigation.map(([label, target]) => <a key={target} href={`#${target}`} className="text-xs font-bold tracking-wide text-[#beb8c0] transition-colors hover:text-[#ffb4c5]">{label}</a>)}</nav>
          <div className="hidden items-center gap-3 sm:flex"><button type="button" onClick={() => window.print()} className="no-print inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-extrabold text-white hover:border-[#ea4b71]/60"><Printer className="size-3.5" />Print route</button><button type="button" onClick={downloadFieldNotes} className="no-print inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-[#ff7795]"><Download className="size-3.5" />Download field notes</button></div>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="no-print flex size-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        </div>
        {menuOpen && <div className="border-t border-white/[.08] bg-[#121015] px-5 py-4 lg:hidden"><div className="flex flex-col gap-2">{navigation.map(([label, target]) => <a onClick={() => setMenuOpen(false)} key={target} href={`#${target}`} className="rounded-xl px-3 py-2 text-sm font-bold text-[#e6e0e6] hover:bg-white/[.06]">{label}</a>)}</div></div>}
      </header>

      <section id="top" className="relative isolate overflow-hidden border-b border-white/[.08] bg-[#0b0a0e]">
        <div className="pointer-events-none absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(255,255,255,.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.28)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="pointer-events-none absolute -right-32 top-0 size-[38rem] rounded-full bg-[#ea4b71]/[.13] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-[#ffb4c5]/[.09] blur-3xl" />
        <div className="relative mx-auto grid min-h-[700px] max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-10 lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#ea4b71]/45 bg-[#ea4b71]/10 px-3 py-2 mono text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb4c5]"><Compass className="size-3.5" /> The Data Tea / field route</p>
            <h1 className="display mt-7 max-w-4xl text-[3.8rem] leading-[.84] tracking-[-.055em] text-white sm:text-[6rem]">A roadmap for <em className="text-[#ff9bb1]">automation</em> that survives contact with work.</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#cfc7ce] sm:text-lg">Map a real process. Connect the data. Build a workflow. Add AI where it helps. Leave behind proof another person can understand and operate.</p>
            <div className="mt-9 flex flex-wrap gap-3"><button type="button" onClick={() => { setActiveModuleId("prepare"); scrollToId("roadmap"); }} className="inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#ff7795]">Explore the route <ArrowDownRight className="size-4" /></button><button type="button" onClick={() => scrollToId("builds")} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[.04] px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#ff9bb1]/60">See build challenges <ArrowRight className="size-4" /></button></div>
            <div className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/[.12] pt-5 text-xs text-[#aaa2aa]"><span><strong className="block text-lg text-white">09</strong>connected stages</span><span><strong className="block text-lg text-white">{roadmapProjects.isLoading ? "—" : String(buildChallenges.length).padStart(2, "0")}</strong>build challenges</span><span><strong className="block text-lg text-white">{libraryMetric}</strong>learning index</span></div>
          </div>
          <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#110f14]/90 p-5 shadow-[0_28px_80px_rgba(0,0,0,.35)] sm:p-7">
            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#ea4b71]/15 blur-2xl" />
            <div className="relative flex items-start justify-between gap-5"><div><p className="mono text-[10px] font-bold uppercase tracking-[.16em] text-[#ffb4c5]">Course navigator</p><h2 className="display mt-3 text-3xl leading-[.9] text-white">Your route has a <em className="text-[#ff9bb1]">next move.</em></h2></div><span className="flex size-11 items-center justify-center rounded-xl border border-[#ea4b71]/35 bg-[#ea4b71]/15 text-[#ffb4c5]"><ShieldCheck className="size-5" /></span></div>
            <div className="relative mt-8 rounded-2xl border border-white/10 bg-black/20 p-5"><div className="flex items-end justify-between gap-5"><div><span className="mono text-[9px] uppercase tracking-[.14em] text-[#8f858f]">Route completion</span><p className="display mt-2 text-5xl text-white">{progress}<span className="ml-1 text-lg text-[#aaa0aa]">%</span></p></div><p className="max-w-[10rem] text-right text-xs leading-5 text-[#b9afb8]">{completeIds.length} checkpoints kept in this browser.</p></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#ea4b71] to-[#ffb4c5] transition-all duration-300" style={{ width: `${progress}%` }} /></div></div>
            <div className="relative mt-4 grid gap-3 sm:grid-cols-2"><button type="button" onClick={() => selectModule(activeModule.id)} className="rounded-xl border border-[#ea4b71]/45 bg-[#ea4b71]/10 p-4 text-left transition hover:bg-[#ea4b71]/15"><span className="mono text-[9px] font-bold uppercase tracking-[.14em] text-[#ffb4c5]">In focus</span><span className="mt-2 block text-sm font-extrabold text-white">{activeModule.route} · {activeModule.title}</span></button><button type="button" onClick={() => { setLibraryStage(activeModule.id); scrollToId("library"); }} className="rounded-xl border border-white/10 bg-white/[.035] p-4 text-left transition hover:border-white/30"><span className="mono text-[9px] font-bold uppercase tracking-[.14em] text-[#a89da6]">Stage assets</span><span className="mt-2 block text-sm font-extrabold text-white">{resourceCounts[activeModule.id] ?? 0} resources to inspect</span></button></div>
            <p className="relative mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-[#aaa0aa]">The map favors visible proofs: brief, workflow, data contract, review rule, runbook, or a portfolio-ready handoff.</p>
          </aside>
        </div>
      </section>

      <section id="roadmap" className="scroll-mt-16 bg-[#09080b] py-16 sm:py-20 lg:py-28"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mono text-[10px] font-bold uppercase tracking-[.18em] text-[#ffb4c5]">The visual curriculum</p><h2 className="display mt-4 max-w-3xl text-5xl leading-[.9] tracking-[-.045em] text-white sm:text-6xl">The route is the <em className="text-[#ff9bb1]">curriculum.</em></h2></div><p className="max-w-sm text-sm leading-7 text-[#aaa1aa]">Move through a visible chain of capabilities. The diagram shows core order, feedback loops, and the practical proof each coordinate is designed to produce.</p></div><RoadmapPathMap modules={roadmapModules} activeModuleId={activeModuleId} completedModuleIds={completeIds} resourceCounts={resourceCounts} onSelect={selectModule} /></div></section>

      <StageDetailPanel module={activeModule} resources={resourcesByModule[activeModule.id] ?? []} isComplete={completeIds.includes(activeModule.id)} onToggleComplete={() => toggleComplete(activeModule.id)} onBrowseAll={browseStageResources} />

      {roadmapProjects.isLoading ? <section id="builds" className="bg-[#f4eee9] px-5 py-16 text-[#19171c] sm:px-8 lg:px-10"><div className="mx-auto max-w-[1480px] animate-pulse rounded-[1.5rem] border border-black/10 bg-white p-8"><div className="h-5 w-32 rounded bg-[#eadde0]" /><div className="mt-5 h-14 max-w-xl rounded bg-[#f0e7e3]" /><div className="mt-8 h-72 rounded-xl bg-[#f0e7e3]" /></div></section> : <BuildChallengeRail challenges={buildChallenges} activeModuleId={activeModuleId} onSelectModule={selectModule} />}

      <CaseStudyLens activeModuleId={activeModuleId} onSelectModule={selectModule} />

      <section id="library" className="scroll-mt-16 bg-[#fffaf6] text-[#19161b]"><div className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-10 lg:py-28"><div className="grid gap-8 border-b border-black/10 pb-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="mono text-[10px] font-bold uppercase tracking-[.18em] text-[#c92f55]">Resource index</p><h2 className="display mt-5 text-5xl leading-[.9] tracking-[-.045em] sm:text-6xl">Choose the next <em>useful reference.</em></h2></div><div><p className="max-w-xl text-sm leading-7 text-[#615b62]">Public guides, templates, courses, videos, and source-labelled collections are filtered against the exact route coordinate you are building.</p><label className="relative mt-5 block max-w-xl"><BookOpen className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#c92f55]" /><input value={resourceQuery} onChange={(event) => setResourceQuery(event.target.value)} placeholder="Search a tool, concept, or source" className="w-full rounded-full border border-black/15 bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#898188] focus:border-[#ea4b71]" /></label></div></div>
        <div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-white p-4 lg:grid-cols-[1fr_auto] lg:items-center"><div className="flex flex-wrap items-center gap-2" aria-label="Filter learning resources by type">{resourceFilters.map((filter) => <button key={filter.id} type="button" onClick={() => setResourceFilter(filter.id)} aria-pressed={resourceFilter === filter.id} className={`rounded-full border px-3.5 py-2 text-xs font-extrabold transition ${resourceFilter === filter.id ? "border-[#ea4b71] bg-[#ea4b71] text-white" : "border-black/15 bg-white text-[#524b52] hover:border-[#ea4b71]/60"}`}>{filter.label}</button>)}</div><div className="flex flex-wrap items-center gap-3"><label className="text-xs font-bold text-[#504a50]">Route stage <select value={libraryStage} onChange={(event) => setLibraryStage(event.target.value)} className="ml-2 rounded-full border border-black/15 bg-white px-3 py-2 text-xs outline-none focus:border-[#ea4b71]"><option value="all">All stages</option>{roadmapModules.map((module) => <option key={module.id} value={module.id}>{module.route} · {module.title}</option>)}</select></label><span className="mono text-[9px] uppercase tracking-[.12em] text-[#847b83]">{templateCount} templates</span></div></div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs leading-5 text-[#6b636a]">Source collections and YouTube search fallbacks remain labelled honestly. Template cards open public provider pages in a new tab.</p><div className="flex items-center gap-3"><span className="mono text-[10px] uppercase tracking-[.12em] text-[#867d85]">{filteredResources.length} found</span>{(resourceFilter !== "all" || resourceQuery || libraryStage !== "all") && <button type="button" onClick={clearLibrary} className="text-xs font-extrabold text-[#c92f55] hover:text-[#ea4b71]">Clear view</button>}</div></div>
        {learningResources.isLoading && <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-[230px] animate-pulse rounded-2xl border border-black/10 bg-[#f4efec]" />)}</div>}
        {learningResources.error && <div className="mt-8 rounded-2xl border border-[#ea4b71]/35 bg-[#fff5f7] p-6"><p className="font-extrabold text-[#c92f55]">The resource index is temporarily unavailable.</p><p className="mt-1 text-sm text-[#615b62]">Refresh the page to retry the public collection.</p></div>}
        {!learningResources.isLoading && !learningResources.error && filteredResources.length === 0 && <div className="mt-8 rounded-2xl border border-dashed border-black/20 bg-white p-8 text-center"><p className="display text-3xl">No matching references.</p><p className="mt-2 text-sm text-[#615b62]">Try another filter or return to the full index.</p><button type="button" onClick={clearLibrary} className="mt-4 text-sm font-extrabold text-[#c92f55]">Show all resources</button></div>}
        {visibleResources.length > 0 && <><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleResources.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="group flex min-h-[240px] flex-col rounded-2xl border border-black/10 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#ea4b71]/50 hover:shadow-[0_18px_36px_rgba(52,28,38,.10)] sm:p-6"><div className="flex items-start justify-between gap-4"><span className="mono text-[9px] font-bold uppercase tracking-[.13em] text-[#c92f55]">{resource.moduleId} / {resource.resourceType}</span><ExternalLink className="size-4 text-[#ea4b71] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><h3 className="display mt-6 text-2xl leading-[.96] tracking-[-.02em]">{resource.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#615b62]">{resource.description}</p><div className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 pt-4"><span className="truncate text-xs font-bold text-[#252026]">{resource.provider}</span><span className="mono shrink-0 text-[9px] text-[#877d85]">{resource.effort}</span></div></a>)}</div>{visibleResources.length < filteredResources.length && <div className="mt-8 text-center"><button type="button" onClick={() => setResourceLimit((limit) => limit + RESOURCE_BATCH_SIZE)} className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-extrabold text-[#252026] transition hover:border-[#ea4b71] hover:text-[#c92f55]">Show 12 more resources <ArrowDownRight className="ml-1 inline size-4" /></button><p className="mt-3 text-xs text-[#877d85]">Showing {visibleResources.length} of {filteredResources.length} matching references.</p></div>}</>}
      </div></section>

      <section id="field-kit" className="scroll-mt-16 bg-[#121015] py-16 lg:py-24"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 sm:px-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-20 lg:px-10"><div><p className="mono text-[10px] font-bold uppercase tracking-[.18em] text-[#ffb4c5]">Browser field kit</p><h2 className="display mt-5 max-w-md text-5xl leading-[.9] tracking-[-.045em] text-white sm:text-6xl">Keep the route <em className="text-[#ff9bb1]">close to the work.</em></h2><p className="mt-6 max-w-md text-sm leading-7 text-[#beb6be]">Mark a checkpoint complete, then print or download your route as a portable field note. Your completion marks stay in this browser only—no account, sign-in, or personal file upload is required.</p><div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={downloadFieldNotes} className="inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#ff7795]"><Download className="size-4" />Download route note</button><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-extrabold text-white hover:border-[#ea4b71]/60"><Printer className="size-4" />Print field kit</button></div></div><div className="rounded-[1.5rem] border border-white/10 bg-white/[.04] p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="mono text-[10px] uppercase tracking-[.14em] text-[#ffb4c5]">Proof ledger</p><p className="mt-2 text-sm text-[#c7bec7]">Use the route as a lightweight build log while you work.</p></div><ClipboardList className="size-7 text-[#ea4b71]" /></div><div className="mt-6 grid gap-3 sm:grid-cols-2">{roadmapModules.slice(0, 6).map((module) => <button key={module.id} type="button" onClick={() => selectModule(module.id)} className="rounded-xl border border-white/10 bg-black/20 p-4 text-left transition hover:border-[#ea4b71]/50"><span className="mono text-[9px] uppercase tracking-[.12em] text-[#ffb4c5]">{completeIds.includes(module.id) ? "Proof marked" : "Open proof"}</span><span className="mt-2 block text-sm font-bold text-white">{module.deliverable}</span></button>)}</div><p className="mt-5 rounded-xl border border-dashed border-white/15 px-4 py-3 text-xs leading-5 text-[#bcb4bd]">For private workflow exports and files, save them in your own secure drive or repository alongside the downloaded route note.</p></div></div></section>

      <section id="suggestions" className="scroll-mt-16 bg-[#f4eee9] text-[#19161b]"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-10 lg:py-24"><div><p className="mono text-[10px] font-bold uppercase tracking-[.18em] text-[#c92f55]">Contribution desk</p><h2 className="display mt-5 max-w-md text-5xl leading-[.9] tracking-[-.045em] sm:text-6xl">Put the next <em>useful build</em> on the map.</h2><p className="mt-6 max-w-md text-sm leading-7 text-[#615b62]">Propose a source-backed project or learning resource through the public GitHub content template. It keeps the route open to contribution without collecting personal learner accounts in the app.</p><div className="mt-8 border-l-2 border-[#ea4b71] pl-4"><p className="mono text-[10px] font-bold uppercase tracking-[.13em] text-[#c92f55]">Review standard</p><p className="mt-2 text-sm leading-6 text-[#615b62]">Projects should show an operational result; resources should identify a credible provider and direct destination.</p></div></div><div className="rounded-[1.5rem] border border-black/10 bg-white p-7 shadow-[0_18px_44px_rgba(20,20,25,.07)]"><Github className="size-8 text-[#c92f55]" /><h3 className="display mt-6 text-4xl leading-[.92]">Open a <em>content proposal.</em></h3><p className="mt-4 max-w-xl text-sm leading-7 text-[#615b62]">The proposal template asks for a direct public source, provider, route stage, and evidence of learning value. That preserves clear provenance without requiring this website to collect a sign-in or account profile.</p><a href={GITHUB_CONTENT_PROPOSAL_URL} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#ff7795]">Propose a route addition <ExternalLink className="size-4" /></a><p className="mono mt-4 text-[9px] uppercase tracking-[.12em] text-[#877d85]">Public GitHub issue template · source-backed content only</p></div></div></section>

      <footer className="border-t border-white/[.08] bg-[#09080b]"><div className="mx-auto flex max-w-[1480px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><div className="flex items-center gap-3"><img src="/manus-storage/the-data-tea-automation-mark_85c07dab.png" alt="" className="size-8 object-contain" /><span className="text-sm font-extrabold text-white">The Data Tea</span></div><p className="mono text-[10px] uppercase tracking-[.14em] text-[#89808a]">AI Automation learning route · n8n builder track</p><a href="#top" className="inline-flex items-center gap-2 text-xs font-bold text-[#ffb4c5] hover:text-[#ff9bb1]">Back to top <ArrowRight className="size-3.5 -rotate-90" /></a></div></footer>
    </main>
  );
}
