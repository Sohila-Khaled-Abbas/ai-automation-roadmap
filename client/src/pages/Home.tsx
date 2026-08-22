/**
 * The Data Tea AI Automation Path: a visual, staged learning product for n8n builders.
 * Public discovery is available to all learners; progress, vault, and submissions use authenticated tRPC procedures.
 */
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowDownRight, ArrowRight, BookOpen, ExternalLink, FileText, LogIn, LogOut, Menu, Printer, Send, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { RoadmapPathMap } from "@/components/RoadmapPathMap";
import { StageDetailPanel } from "@/components/StageDetailPanel";
import { trpc } from "@/lib/trpc";
import { filterLibraryView, visibleLibraryResources } from "@/lib/libraryView";
import { type ResourceFilterValue } from "@/lib/resourceFilters";
import { featuredBuilds, featuredProducts, roadmapModules } from "@/lib/roadmapData";

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

const MAX_CLIENT_UPLOAD_BYTES = 8 * 1024 * 1024;
const RESOURCE_BATCH_SIZE = 12;
const ALLOWED_CLIENT_UPLOADS = new Set(["application/json", "application/pdf", "application/zip", "text/markdown", "text/plain"]);
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
  const [completeIds, setCompleteIds] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourceQuery, setResourceQuery] = useState("");
  const [resourceFilter, setResourceFilter] = useState<ResourceFilter>("all");
  const [libraryStage, setLibraryStage] = useState("all");
  const [resourceLimit, setResourceLimit] = useState(RESOURCE_BATCH_SIZE);
  const [submissionForm, setSubmissionForm] = useState<{ submissionType: "project" | "resource"; title: string; description: string; url: string; moduleId: string }>({ submissionType: "project", title: "", description: "", url: "", moduleId: "" });
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();
  const utils = trpc.useUtils();
  const learningResources = trpc.resources.list.useQuery();
  const persistedProgress = trpc.roadmap.progress.useQuery(undefined, { enabled: isAuthenticated });
  const learnerFiles = trpc.files.list.useQuery(undefined, { enabled: isAuthenticated });
  const progressMutation = trpc.roadmap.setProgress.useMutation({ onSuccess: () => void utils.roadmap.progress.invalidate(), onError: (error) => toast.error(error.message) });
  const uploadMutation = trpc.files.upload.useMutation({ onSuccess: () => { void utils.files.list.invalidate(); toast.success("Resource saved to your personal vault."); }, onError: (error) => toast.error(error.message) });
  const submissionMutation = trpc.submissions.create.useMutation({ onSuccess: () => { setSubmissionForm({ submissionType: "project", title: "", description: "", url: "", moduleId: "" }); toast.success("Suggestion received — thank you for shaping the route."); }, onError: (error) => toast.error(error.message) });

  const resourceList = (learningResources.data ?? []) as LearningResource[];
  const resourcesByModule = useMemo<Record<string, LearningResource[]>>(() => resourceList.reduce((collection, resource) => {
    (collection[resource.moduleId] ??= []).push(resource);
    return collection;
  }, {} as Record<string, LearningResource[]>), [resourceList]);
  const resourceCounts = useMemo(() => Object.fromEntries(Object.entries(resourcesByModule).map(([moduleId, resources]) => [moduleId, resources.length])), [resourcesByModule]);
  const filteredResources = useMemo(() => filterLibraryView(resourceList, resourceFilter, resourceQuery, libraryStage), [libraryStage, resourceFilter, resourceList, resourceQuery]);
  const visibleResources = useMemo(() => visibleLibraryResources(filteredResources, resourceLimit), [filteredResources, resourceLimit]);
  const activeModule = roadmapModules.find((module) => module.id === activeModuleId) ?? roadmapModules[0];
  const progress = Math.round((completeIds.length / roadmapModules.length) * 100);
  const libraryMetric = learningResources.isLoading || learningResources.error ? "Curated learning library" : `${resourceList.length} curated resources`;

  useEffect(() => { if (persistedProgress.data) setCompleteIds(persistedProgress.data.map((item) => item.moduleId)); }, [persistedProgress.data]);
  useEffect(() => { setResourceLimit(RESOURCE_BATCH_SIZE); }, [libraryStage, resourceFilter, resourceQuery]);
  useEffect(() => {
    if ((resourceQuery.trim() || resourceFilter !== "all" || libraryStage !== "all") && !learningResources.isLoading && !learningResources.error && filteredResources.length === 0) {
      toast.info("No resources match this view. Clear the controls to browse the whole library.");
    }
  }, [filteredResources.length, libraryStage, learningResources.error, learningResources.isLoading, resourceFilter, resourceQuery]);
  useEffect(() => { if (learnerFiles.error) toast.error("Your personal vault could not be loaded. Please refresh and try again."); }, [learnerFiles.error]);

  const selectModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    window.setTimeout(() => scrollToId("stage-detail"), 0);
  };
  const toggleComplete = (moduleId: string) => {
    if (!isAuthenticated) { startLogin(); return; }
    progressMutation.mutate({ moduleId, completed: !completeIds.includes(moduleId) });
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
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!isAuthenticated) { startLogin(); return; }
    const contentType = file.type || (file.name.toLowerCase().endsWith(".md") ? "text/markdown" : "text/plain");
    if (!ALLOWED_CLIENT_UPLOADS.has(contentType)) { toast.error("Choose a PDF, JSON, ZIP, Markdown, or text file."); event.target.value = ""; return; }
    if (file.size > MAX_CLIENT_UPLOAD_BYTES) { toast.error("Files must be 8 MB or smaller."); event.target.value = ""; return; }
    const reader = new FileReader();
    reader.onload = () => {
      const dataBase64 = typeof reader.result === "string" ? reader.result.split(",")[1] : undefined;
      if (!dataBase64) { toast.error("That file could not be read."); return; }
      uploadMutation.mutate({ filename: file.name, contentType, dataBase64 });
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };
  const submitSuggestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAuthenticated) { startLogin(); return; }
    submissionMutation.mutate(submissionForm);
  };

  return (
    <main className="overflow-x-hidden bg-[#040506] text-white">
      <header className="sticky top-0 z-50 border-b border-white/[.08] bg-[#040506]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="The Data Tea AI Automation Path home"><img src="/manus-storage/the-data-tea-automation-mark_85c07dab.png" alt="" className="size-9 object-contain" /><span><span className="display block text-lg tracking-[-.03em] text-white">The Data Tea</span><span className="mono mt-0.5 block text-[9px] font-semibold uppercase tracking-[.16em] text-[#ffb4c5]">AI automation path</span></span></a>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">{[["Path map", "roadmap"], ["Library", "library"], ["Builds", "builds"], ["Vault", "vault"]].map(([label, target]) => <a key={target} href={`#${target}`} className="text-xs font-bold tracking-wide text-[#bebec8] transition-colors hover:text-[#ffb4c5]">{label}</a>)}</nav>
          <div className="hidden items-center gap-3 sm:flex"><button type="button" onClick={() => window.print()} className="no-print inline-flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-extrabold text-white hover:border-[#ea4b71]/60"><Printer className="size-3.5" />Print</button><button type="button" onClick={() => isAuthenticated ? void logout() : startLogin()} disabled={authLoading} className="no-print inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-[#ff7795] disabled:opacity-60">{isAuthenticated ? <LogOut className="size-3.5" /> : <LogIn className="size-3.5" />}{isAuthenticated ? "Sign out" : "Save progress"}</button></div>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="no-print flex size-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        </div>
        {menuOpen && <div className="border-t border-white/[.08] bg-[#121216] px-5 py-4 lg:hidden"><div className="flex flex-col gap-2">{[["Path map", "roadmap"], ["Library", "library"], ["Builds", "builds"], ["Vault", "vault"]].map(([label, target]) => <a onClick={() => setMenuOpen(false)} key={target} href={`#${target}`} className="rounded-xl px-3 py-2 text-sm font-bold text-[#e6e6eb] hover:bg-white/[.06]">{label}</a>)}</div></div>}
      </header>

      <section id="top" className="ink-grid relative isolate overflow-hidden border-b border-white/[.1]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]"><img src="/manus-storage/ai-automation-field-hero_f0709d9e.jpg" alt="An editorial workbench representing an AI automation learning path" className="h-full w-full object-cover object-[70%_center] opacity-55" /><div className="absolute inset-0 bg-gradient-to-r from-[#040506] via-[#040506]/90 to-[#040506]/20" /><div className="absolute inset-0 bg-gradient-to-t from-[#040506]/75 via-transparent to-[#040506]/30" /></div>
        <div className="relative mx-auto grid min-h-[650px] max-w-[1480px] items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:py-24"><div><div className="inline-flex items-center gap-2 rounded-full border border-[#ea4b71]/35 bg-[#121216]/85 px-3 py-2 text-[#ffb4c5] backdrop-blur-sm"><span className="flex size-5 items-center justify-center rounded-full bg-[#ea4b71] text-white"><BookOpen className="size-3" /></span><span className="mono text-[10px] font-semibold uppercase tracking-[.16em]">The Data Tea / AI Automation</span></div><h1 className="display mt-7 max-w-3xl text-[3.5rem] leading-[.88] tracking-[-.045em] text-white sm:text-[5.2rem]">Make AI automation <em className="text-[#ff9bb1]">reliable.</em></h1><p className="mt-7 max-w-xl text-base leading-7 text-[#d0d0d6] sm:text-lg">A visual, project-led path for learning workflow design, n8n, data operations, AI agents, and production delivery—one useful move at a time.</p><div className="mt-9 flex flex-wrap gap-3"><button type="button" onClick={() => { selectModule("prepare"); scrollToId("roadmap"); }} className="inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-[#ff7795]">Open path map <ArrowDownRight className="size-4" /></button><button type="button" onClick={() => scrollToId("library")} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:border-[#ea4b71]/60">Browse resources <BookOpen className="size-4" /></button></div><div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/[.12] pt-5 text-xs text-[#bebec8]"><span><strong className="block text-base text-white">10 weeks</strong>Build-to-learn route</span><span><strong className="block text-base text-white">9 stages</strong>From process to proof</span><span><strong className="block text-base text-white">{libraryMetric}</strong>Searchable learning library</span></div></div><aside className="hidden rounded-[2rem] border border-white/10 bg-[#0c0c11]/75 p-6 shadow-[0_24px_60px_rgba(0,0,0,.25)] backdrop-blur-sm lg:block"><p className="mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#ffb4c5]">Your route status</p><div className="mt-5 flex items-end justify-between"><p className="display text-6xl text-white">{progress}<span className="text-2xl text-[#a7a7b0]">%</span></p><p className="max-w-[10rem] text-right text-xs leading-5 text-[#b4b4bd]">{isAuthenticated ? `${completeIds.length} stages saved to your account.` : "Sign in to save progress across devices."}</p></div><div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-[#ea4b71] transition-all duration-300" style={{ width: `${progress}%` }} /></div><div className="mt-7 grid grid-cols-3 gap-2">{roadmapModules.slice(0, 6).map((module) => <button key={module.id} type="button" onClick={() => selectModule(module.id)} className={`rounded-lg border px-2 py-2 text-left transition-colors ${module.id === activeModuleId ? "border-[#ea4b71]/70 bg-[#ea4b71]/10" : "border-white/10 hover:border-white/25"}`}><span className="mono block text-[9px] text-[#ffb4c5]">{module.route.split("/")[0]}</span><span className="mt-1 block truncate text-xs font-bold text-white">{module.title.split(" ").slice(0, 2).join(" ")}</span></button>)}</div></aside></div>
      </section>

      <section id="roadmap" className="scroll-mt-16 bg-[#040506] py-16 sm:py-20 lg:py-24"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10"><div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">The AI Automation Path</p><h2 className="display mt-4 max-w-2xl text-5xl leading-[.92] tracking-[-.035em] text-white sm:text-6xl">See the system. <em className="text-[#ff9bb1]">Then build it.</em></h2></div><p className="max-w-sm text-sm leading-7 text-[#aaaab5]">Every node is a capability checkpoint. Open one to see the target, proof of learning, and only the resources you need next.</p></div><RoadmapPathMap modules={roadmapModules} activeModuleId={activeModuleId} completedModuleIds={completeIds} resourceCounts={resourceCounts} onSelect={selectModule} /></div></section>

      <StageDetailPanel module={activeModule} resources={resourcesByModule[activeModule.id] ?? []} isComplete={completeIds.includes(activeModule.id)} onToggleComplete={() => toggleComplete(activeModule.id)} onBrowseAll={browseStageResources} />

      <section id="library" className="paper-grain scroll-mt-16 bg-white text-[#15151a]"><div className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-8 border-b border-black/10 pb-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#c92f55]">Curated learning library</p><h2 className="display mt-5 text-5xl leading-[.93] tracking-[-.035em] sm:text-6xl">Explore the next <em>useful proof.</em></h2></div><div><p className="max-w-xl text-sm leading-7 text-[#606065]">Official n8n, OpenAI, MDN, Arabic and English learning material, and source-labelled Notebook collections support the route from first workflow to production operations.</p><label className="relative mt-5 block max-w-xl"><BookOpen className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#c92f55]" /><input value={resourceQuery} onChange={(event) => setResourceQuery(event.target.value)} placeholder="Search topics, providers, or sources" className="w-full rounded-full border border-black/15 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[#85858a] focus:border-[#ea4b71]" /></label></div></div>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]"><div className="flex flex-wrap items-center gap-2" aria-label="Filter learning resources by type">{resourceFilters.map((filter) => <button key={filter.id} type="button" onClick={() => setResourceFilter(filter.id)} aria-pressed={resourceFilter === filter.id} className={`rounded-full border px-3.5 py-2 text-xs font-extrabold transition-colors ${resourceFilter === filter.id ? "border-[#ea4b71] bg-[#ea4b71] text-white" : "border-black/15 bg-white text-[#505056] hover:border-[#ea4b71]/60"}`}>{filter.label}</button>)}</div><label className="flex items-center gap-2 text-xs font-bold text-[#505056]">Stage<select value={libraryStage} onChange={(event) => setLibraryStage(event.target.value)} className="rounded-full border border-black/15 bg-white px-3 py-2 text-xs outline-none focus:border-[#ea4b71]"><option value="all">All stages</option>{roadmapModules.map((module) => <option key={module.id} value={module.id}>{module.route} · {module.title}</option>)}</select></label></div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs leading-5 text-[#606065]">Search uses title, provider, source, stage, and learning format. Source collections and YouTube search fallbacks remain labelled honestly.</p><div className="flex items-center gap-3"><span className="mono text-[10px] uppercase tracking-[.12em] text-[#85858a]">{filteredResources.length} found</span>{(resourceFilter !== "all" || resourceQuery || libraryStage !== "all") && <button type="button" onClick={clearLibrary} className="text-xs font-extrabold text-[#c92f55] hover:text-[#ea4b71]">Clear view</button>}</div></div>
        {learningResources.isLoading && <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-[220px] animate-pulse border border-black/10 bg-[#f5f5f6]" />)}</div>}
        {learningResources.error && <div className="mt-8 border border-[#ea4b71]/35 bg-[#fff5f7] p-6"><p className="font-extrabold text-[#c92f55]">The resource library is temporarily unavailable.</p><p className="mt-1 text-sm text-[#606065]">Refresh the page to retry the public collection.</p></div>}
        {!learningResources.isLoading && !learningResources.error && filteredResources.length === 0 && <div className="mt-8 border border-dashed border-black/20 bg-white p-8 text-center"><p className="display text-3xl">No matching resources.</p><p className="mt-2 text-sm text-[#606065]">Try another filter or return to the complete library.</p><button type="button" onClick={clearLibrary} className="mt-4 text-sm font-extrabold text-[#c92f55]">Show all resources</button></div>}
        {visibleResources.length > 0 && <><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleResources.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="card-lift group flex min-h-[218px] flex-col border border-black/10 bg-white p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><span className="mono text-[10px] font-semibold uppercase tracking-[.13em] text-[#c92f55]">{resource.moduleId} / {resource.resourceType}</span><ExternalLink className="size-4 text-[#ea4b71] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><h3 className="display mt-6 text-2xl leading-[.96] tracking-[-.02em]">{resource.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#606065]">{resource.description}</p><div className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 pt-4"><span className="truncate text-xs font-bold text-[#202027]">{resource.provider}</span><span className="mono shrink-0 text-[10px] text-[#85858a]">{resource.effort}</span></div></a>)}</div>{visibleResources.length < filteredResources.length && <div className="mt-8 text-center"><button type="button" onClick={() => setResourceLimit((limit) => limit + RESOURCE_BATCH_SIZE)} className="rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-extrabold text-[#202027] transition-colors hover:border-[#ea4b71] hover:text-[#c92f55]">Show 12 more resources <ArrowDownRight className="ml-1 inline size-4" /></button><p className="mt-3 text-xs text-[#85858a]">Showing {visibleResources.length} of {filteredResources.length} matching resources.</p></div>}</>}
      </div></section>

      <section id="vault" className="scroll-mt-16 bg-[#121216] py-16 lg:py-24"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 sm:px-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-20 lg:px-10"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">Personal learner vault</p><h2 className="display mt-5 max-w-md text-5xl leading-[.93] tracking-[-.035em] text-white sm:text-6xl">Keep build notes <em className="text-[#ff9bb1]">with the path.</em></h2><p className="mt-6 max-w-md text-sm leading-7 text-[#bebec6]">Save briefs, n8n exports, and handover notes privately to your account. The database stores the record while secure storage holds the actual file.</p><input ref={inputRef} onChange={handleFileChange} accept=".pdf,.json,.zip,.md,.txt,application/pdf,application/json,application/zip,text/markdown,text/plain" className="hidden" type="file" /><button type="button" onClick={() => isAuthenticated ? inputRef.current?.click() : startLogin()} disabled={uploadMutation.isPending} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#ff7795] disabled:opacity-60"><Upload className="size-4" />{uploadMutation.isPending ? "Saving resource…" : isAuthenticated ? "Add a learning file" : "Sign in to add files"}</button><p className="mono mt-3 text-[10px] uppercase tracking-[.12em] text-[#85858f]">PDF, JSON, ZIP, Markdown, or text · up to 8 MB</p></div><div className="rounded-[1.5rem] border border-white/10 bg-white/[.04] p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="mono text-[10px] uppercase tracking-[.14em] text-[#ffb4c5]">{isAuthenticated ? `${user?.name ?? "Your"} vault` : "Account required"}</p><p className="mt-2 text-sm text-[#c7c7cd]">{isAuthenticated ? "Files you save stay available to your signed-in account." : "Sign in to attach workflow resources to this roadmap."}</p></div><FileText className="size-7 text-[#ea4b71]" /></div><div className="mt-6 space-y-3">{(learnerFiles.data ?? []).map((file) => <a key={file.id} href={file.fileUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 transition-colors hover:border-[#ea4b71]/50"><span className="min-w-0"><span className="block truncate text-sm font-bold text-white">{file.filename}</span><span className="mono mt-1 block text-[10px] uppercase tracking-[.1em] text-[#a0a0a8]">{Math.max(1, Math.round(file.sizeBytes / 1024))} KB · {file.contentType}</span></span><ExternalLink className="size-4 shrink-0 text-[#ffb4c5]" /></a>)}{isAuthenticated && learnerFiles.data?.length === 0 && <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-sm text-[#bcbcc4]">Your first saved workflow resource will appear here.</p>}{!isAuthenticated && <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-sm text-[#bcbcc4]">Your resources remain private after sign-in.</p>}</div></div></div></section>

      <section id="suggestions" className="scroll-mt-16 bg-[#f5f5f6] text-[#15151a]"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-20 lg:px-10 lg:py-24"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#c92f55]">Community contribution desk</p><h2 className="display mt-5 max-w-md text-5xl leading-[.93] tracking-[-.035em] sm:text-6xl">Put the next <em>useful build</em> on the path.</h2><p className="mt-6 max-w-md text-sm leading-7 text-[#606065]">Suggest a project prompt or learning resource that helps another n8n builder. Signed-in contributions are reviewed before reaching the public curriculum.</p><div className="mt-8 border-l-2 border-[#ea4b71] pl-4"><p className="mono text-[10px] uppercase tracking-[.13em] text-[#c92f55]">What helps most</p><p className="mt-2 text-sm leading-6 text-[#606065]">A concrete automation outcome, intended stage, and trustworthy direct link when you have one.</p></div></div><form onSubmit={submitSuggestion} className="rounded-[1.5rem] border border-black/10 bg-white p-5 shadow-[0_18px_44px_rgba(20,20,25,.07)] sm:p-7"><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold text-[#202027]">I am suggesting<select value={submissionForm.submissionType} onChange={(event) => setSubmissionForm((form) => ({ ...form, submissionType: event.target.value as "project" | "resource" }))} className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-sm outline-none focus:border-[#ea4b71]"><option value="project">An n8n automation project</option><option value="resource">A learning resource</option></select></label><label className="text-sm font-bold text-[#202027]">Best route stop<select value={submissionForm.moduleId} onChange={(event) => setSubmissionForm((form) => ({ ...form, moduleId: event.target.value }))} className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-sm outline-none focus:border-[#ea4b71]"><option value="">Choose later</option>{roadmapModules.map((module) => <option key={module.id} value={module.id}>{module.title}</option>)}</select></label></div><label className="mt-5 block text-sm font-bold text-[#202027]">Title<input required minLength={5} maxLength={255} value={submissionForm.title} onChange={(event) => setSubmissionForm((form) => ({ ...form, title: event.target.value }))} placeholder={submissionForm.submissionType === "project" ? "Example: Customer request triage agent" : "Example: n8n HTTP Request guide"} className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-sm outline-none focus:border-[#ea4b71]" /></label><label className="mt-5 block text-sm font-bold text-[#202027]">Why should it be on the path?<textarea required minLength={20} maxLength={4000} rows={5} value={submissionForm.description} onChange={(event) => setSubmissionForm((form) => ({ ...form, description: event.target.value }))} placeholder="Describe the outcome, learner use case, and why it is worthwhile." className="mt-2 w-full resize-y rounded-lg border border-black/15 bg-white px-3 py-3 text-sm leading-6 outline-none focus:border-[#ea4b71]" /></label><label className="mt-5 block text-sm font-bold text-[#202027]">Helpful link <span className="font-normal text-[#85858a]">(optional)</span><input type="url" value={submissionForm.url} onChange={(event) => setSubmissionForm((form) => ({ ...form, url: event.target.value }))} placeholder="https://…" className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-sm outline-none focus:border-[#ea4b71]" /></label><div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-5"><p className="max-w-sm text-xs leading-5 text-[#606065]">{isAuthenticated ? "Your contribution is saved as a pending review." : "Sign in when you submit so we can safely review and credit your contribution."}</p><button type="submit" disabled={submissionMutation.isPending} className="inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#ff7795] disabled:opacity-60"><Send className="size-4" />{submissionMutation.isPending ? "Sending…" : isAuthenticated ? "Send suggestion" : "Sign in to suggest"}</button></div></form></div></section>

      <section id="builds" className="bg-[#f5f5f6] text-[#15151a]"><div className="mx-auto max-w-[1480px] px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#c92f55]">The build bench</p><h2 className="display mt-5 text-5xl leading-[.93] tracking-[-.035em] sm:text-6xl">Proof you can show.</h2></div><p className="max-w-sm text-sm leading-7 text-[#606065]">Turn the route into portfolio-sized systems based on familiar operational problems.</p></div><div className="mt-7 grid gap-4 lg:grid-cols-3">{featuredBuilds.map((build) => <article key={build.id} className="card-lift min-h-[230px] rounded-[1.5rem] border border-black/10 bg-white p-6 sm:p-7"><p className="mono text-[10px] font-semibold tracking-[.15em] text-[#c92f55]">{build.label}</p><h3 className="display mt-8 max-w-sm text-3xl leading-[.98] tracking-[-.025em]">{build.title}</h3><p className="mono mt-5 text-[11px] leading-5 text-[#606065]">{build.note}</p><button type="button" onClick={() => selectModule("orchestrate")} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#c92f55] hover:text-[#ea4b71]">Trace the skills <ArrowRight className="size-4" /></button></article>)}</div></div></section>

      <section className="ink-grid border-y border-white/[.1] py-16 lg:py-24"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">The Data Tea products</p><h2 className="display mt-5 max-w-md text-5xl leading-[.93] tracking-[-.035em] text-white sm:text-6xl">A clearer way to keep building.</h2></div><p className="max-w-lg text-sm leading-7 text-[#aaaab5]">The learning path creates the foundation. The resource library, private vault, and build prompts make each stage practical.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{featuredProducts.map((product) => <article key={product.name} className="card-lift relative overflow-hidden rounded-[1.5rem] border border-[#ea4b71]/30 bg-[#121216]/95 p-6 sm:p-7"><div className="absolute left-0 top-0 h-full w-1 bg-[#ea4b71]" /><p className="mono text-[10px] font-semibold uppercase tracking-[.15em] text-[#ff9bb1]">{product.eyebrow}</p><h3 className="display mt-7 text-3xl leading-[.98] text-white">{product.name}</h3><p className="mt-4 text-sm leading-6 text-[#aaaab5]">{product.description}</p><div className="mt-7 flex items-center justify-between border-t border-white/[.1] pt-4"><span className="mono text-[10px] uppercase tracking-[.12em] text-[#bebec8]">{product.meta}</span><ArrowRight className="size-4 text-[#ff9bb1]" /></div></article>)}</div></div></section>

      <footer className="border-t border-white/[.08] bg-[#040506]"><div className="mx-auto flex max-w-[1480px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><div className="flex items-center gap-3"><img src="/manus-storage/the-data-tea-automation-mark_85c07dab.png" alt="" className="size-8 object-contain" /><span className="text-sm font-extrabold text-white">The Data Tea</span></div><p className="mono text-[10px] uppercase tracking-[.14em] text-[#85858f]">AI automation learning route · n8n builder track</p><a href="#top" className="inline-flex items-center gap-2 text-xs font-bold text-[#ffb4c5] hover:text-[#ff9bb1]">Back to top <ArrowRight className="size-3.5 -rotate-90" /></a></div></footer>
    </main>
  );
}
