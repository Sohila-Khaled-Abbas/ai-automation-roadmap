/**
 * Design system: n8n learning field guide — Brand Dark #040506, n8n Pink #EA4B71, and white learning surfaces.
 * The public route remains editorial; authenticated actions add persistent progress and a private resource vault.
 */
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ExternalLink,
  FileText,
  GitBranch,
  LogIn,
  LogOut,
  Menu,
  Printer,
  Sparkles,
  Upload,
  Waypoints,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { featuredBuilds, featuredProducts, roadmapModules, type RoadmapModule } from "@/lib/roadmapData";

type LearningResource = {
  id: number;
  moduleId: string;
  title: string;
  description: string;
  url: string;
  provider: string;
  resourceType: "course" | "guide" | "template" | "reference";
  effort: string;
  source: string;
};

const MAX_CLIENT_UPLOAD_BYTES = 8 * 1024 * 1024;
const ALLOWED_CLIENT_UPLOADS = new Set(["application/json", "application/pdf", "application/zip", "text/markdown", "text/plain"]);

const toneStyles = {
  amber: { accent: "#ff9bb1", chip: "border-[#ea4b71]/35 bg-[#ea4b71]/10 text-[#ffb4c5]", node: "border-[#ea4b71]" },
  mint: { accent: "#ffb4c5", chip: "border-[#ffb4c5]/35 bg-[#ea4b71]/10 text-[#ffb4c5]", node: "border-[#ff9bb1]" },
  coral: { accent: "#ea4b71", chip: "border-[#c92f55]/40 bg-[#c92f55]/15 text-[#ff9bb1]", node: "border-[#c92f55]" },
} as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ModuleCard({
  module,
  resources,
  isActive,
  isDone,
  onToggle,
  onSelect,
}: {
  module: RoadmapModule;
  resources: LearningResource[];
  isActive: boolean;
  isDone: boolean;
  onToggle: () => void;
  onSelect: () => void;
}) {
  const tone = toneStyles[module.tone];
  return (
    <article id={module.id} className="relative ml-3 scroll-mt-28 border-l border-white/15 pl-7 sm:ml-8 sm:pl-10">
      <span className={`absolute -left-[.44rem] top-8 size-3.5 rounded-full border-[3px] bg-[#040506] ${tone.node} ${isDone ? "bg-[#ea4b71]" : ""}`} />
      <div className={`card-lift overflow-hidden border ${isActive ? "border-[#ea4b71]/55" : "border-white/10"} bg-[#121216]/95 shadow-[0_18px_44px_rgba(0,0,0,.22)]`}>
        <button type="button" onClick={onSelect} aria-expanded={isActive} className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-7">
          <div>
            <p className="mono text-[10px] font-semibold uppercase tracking-[.18em]" style={{ color: tone.accent }}>{module.route}</p>
            <h3 className="display mt-3 max-w-xl text-3xl leading-[.98] text-white sm:text-[2.45rem]">{module.title}</h3>
            <p className="mt-3 text-xs text-[#a6a6af]">{module.duration} · {module.tools.join(" · ")}</p>
          </div>
          <span className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border ${isActive ? tone.chip : "border-white/15 text-[#b5b5be]"}`}>{isActive ? <X className="size-4" /> : <ChevronDown className="size-4" />}</span>
        </button>
        {isActive && (
          <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
            <div className="grid gap-7 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <p className="max-w-xl text-sm leading-7 text-[#c3c3ca]">{module.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{module.skills.map((skill) => <span key={skill} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${tone.chip}`}>{skill}</span>)}</div>
              </div>
              <aside className="border-t border-dashed border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                <p className="mono text-[10px] uppercase tracking-[.14em] text-[#ffb4c5]">Field deliverable</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-white">{module.deliverable}</p>
                <p className="mono mt-5 text-[10px] uppercase tracking-[.14em] text-[#ffb4c5]">Builder prompt</p>
                <p className="mt-2 text-sm italic leading-6 text-[#b6b6c0]">“{module.prompt}”</p>
              </aside>
            </div>
            <div className="mt-7 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between gap-3"><p className="mono text-[10px] uppercase tracking-[.14em] text-[#ffb4c5]">Selected learning links</p><span className="mono text-[10px] text-[#a4a4ad]">{resources.length} resources</span></div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {resources.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="group rounded-xl border border-white/10 bg-black/20 p-3 transition-colors hover:border-[#ea4b71]/60"><span className="mono text-[9px] uppercase tracking-[.12em] text-[#ff9bb1]">{resource.resourceType} · {resource.effort}</span><span className="mt-1.5 flex gap-2 text-sm font-bold text-white">{resource.title}<ExternalLink className="mt-0.5 size-3.5 shrink-0 text-[#ffb4c5] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span><span className="mt-1 block text-xs text-[#a4a4ad]">{resource.provider}</span></a>)}
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-[#aaaab4]">Marking a route stop as complete saves it to your account.</p>
              <button type="button" onClick={onToggle} className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors ${isDone ? "border border-[#ea4b71]/35 bg-[#ea4b71]/10 text-[#ffb4c5]" : "bg-[#ea4b71] text-white hover:bg-[#ff7795]"}`}>
                {isDone ? <Check className="size-4" /> : <Waypoints className="size-4" />}{isDone ? "Saved complete" : "Save as complete"}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

export default function Home() {
  const [activeModule, setActiveModule] = useState("orient");
  const [completeIds, setCompleteIds] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourceQuery, setResourceQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();
  const utils = trpc.useUtils();
  const learningResources = trpc.resources.list.useQuery();
  const persistedProgress = trpc.roadmap.progress.useQuery(undefined, { enabled: isAuthenticated });
  const learnerFiles = trpc.files.list.useQuery(undefined, { enabled: isAuthenticated });
  const progressMutation = trpc.roadmap.setProgress.useMutation({ onSuccess: () => void utils.roadmap.progress.invalidate(), onError: (error) => toast.error(error.message) });
  const uploadMutation = trpc.files.upload.useMutation({ onSuccess: () => { void utils.files.list.invalidate(); toast.success("Resource saved to your personal vault."); }, onError: (error) => toast.error(error.message) });

  const resourceList = (learningResources.data ?? []) as LearningResource[];
  const resourcesByModule = useMemo<Record<string, LearningResource[]>>(() => resourceList.reduce((collection, resource) => { (collection[resource.moduleId] ??= []).push(resource); return collection; }, {} as Record<string, LearningResource[]>), [resourceList]);
  const filteredResources = useMemo(() => {
    const needle = resourceQuery.trim().toLowerCase();
    return !needle ? resourceList : resourceList.filter((resource) => [resource.title, resource.description, resource.provider, resource.resourceType, resource.moduleId].join(" ").toLowerCase().includes(needle));
  }, [resourceList, resourceQuery]);
  const progress = Math.round((completeIds.length / roadmapModules.length) * 100);

  useEffect(() => { if (persistedProgress.data) setCompleteIds(persistedProgress.data.map((item) => item.moduleId)); }, [persistedProgress.data]);
  useEffect(() => {
    if (resourceQuery.trim() && !learningResources.isLoading && !learningResources.error && filteredResources.length === 0) {
      toast.info("No resources match that search. Clear the search to browse the full library.");
    }
  }, [filteredResources.length, learningResources.error, learningResources.isLoading, resourceQuery]);
  useEffect(() => {
    if (learnerFiles.error) toast.error("Your personal vault could not be loaded. Please refresh and try again.");
  }, [learnerFiles.error]);

  const toggleComplete = (moduleId: string) => {
    if (!isAuthenticated) { startLogin(); return; }
    progressMutation.mutate({ moduleId, completed: !completeIds.includes(moduleId) });
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
  const startRoute = () => { setActiveModule("orient"); scrollToId("roadmap"); };

  return (
    <main className="overflow-x-hidden bg-[#040506] text-white">
      <header className="sticky top-0 z-50 border-b border-white/[.08] bg-[#040506]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="The Data Tea AI Automation Path home"><img src="/manus-storage/the-data-tea-automation-mark_85c07dab.png" alt="" className="size-10 object-contain" /><span><span className="display block text-xl tracking-[-.03em] text-white">The Data Tea</span><span className="mono mt-1 block text-[9px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">n8n learning path</span></span></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">{[["Path", "roadmap"], ["Library", "library"], ["Builds", "builds"], ["Products", "products"]].map(([label, target]) => <a key={label} href={`#${target}`} className="text-xs font-bold tracking-wide text-[#bebec8] transition-colors hover:text-[#ff9bb1]">{label}</a>)}</nav>
          <div className="hidden items-center gap-3 sm:flex"><button type="button" onClick={() => window.print()} className="no-print inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-extrabold text-white hover:border-[#ea4b71]/60"><Printer className="size-3.5" />Print</button><button type="button" onClick={() => isAuthenticated ? void logout() : startLogin()} disabled={authLoading} className="no-print inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-4 py-2 text-xs font-extrabold text-white transition-colors hover:bg-[#ff7795] disabled:opacity-60">{isAuthenticated ? <LogOut className="size-3.5" /> : <LogIn className="size-3.5" />}{isAuthenticated ? "Sign out" : "Save progress"}</button></div>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="no-print flex size-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        </div>
        {menuOpen && <div className="border-t border-white/[.08] bg-[#121216] px-5 py-4 lg:hidden"><div className="flex flex-col gap-2">{[["Path", "roadmap"], ["Library", "library"], ["Builds", "builds"], ["Products", "products"]].map(([label, target]) => <a onClick={() => setMenuOpen(false)} key={label} href={`#${target}`} className="rounded-xl px-3 py-2 text-sm font-bold text-[#e6e6eb] hover:bg-white/[.06]">{label}</a>)}</div></div>}
      </header>

      <section id="top" className="ink-grid relative isolate min-h-[740px] overflow-hidden border-b border-white/[.1]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]"><img src="/manus-storage/ai-automation-field-hero_f0709d9e.jpg" alt="An editorial workbench representing an AI automation learning path" className="h-full w-full object-cover object-[70%_center] opacity-65" /><div className="absolute inset-0 bg-gradient-to-r from-[#040506] via-[#040506]/90 to-[#040506]/20" /><div className="absolute inset-0 bg-gradient-to-t from-[#040506]/80 via-transparent to-[#040506]/20" /></div>
        <div className="relative mx-auto flex min-h-[740px] max-w-[1480px] items-center px-5 py-24 sm:px-8 lg:px-10"><div className="max-w-3xl pb-10 lg:w-[62%]"><div className="enter-up inline-flex items-center gap-2 border border-[#ea4b71]/35 bg-[#121216]/85 px-3 py-2 text-[#ffb4c5] backdrop-blur-sm"><span className="flex size-5 items-center justify-center rounded-full bg-[#ea4b71] text-white"><Sparkles className="size-3" /></span><span className="mono text-[10px] font-semibold uppercase tracking-[.16em]">The Data Tea / n8n Roadmaps</span></div><h1 className="display enter-up-delayed mt-7 max-w-3xl text-[3.7rem] leading-[.89] tracking-[-.045em] text-white sm:text-[5.6rem] lg:text-[6.75rem]">Make AI automation <em className="text-[#ff9bb1]">useful.</em></h1><p className="enter-up-late mt-7 max-w-xl text-base leading-7 text-[#d0d0d6] sm:text-lg">A complete, project-led route to design, build, and operate AI workflows — with <strong className="font-extrabold text-white">n8n</strong> at the center.</p><div className="enter-up-late mt-9 flex flex-wrap gap-3"><button type="button" onClick={startRoute} className="inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-6 py-3.5 text-sm font-extrabold text-white transition-colors hover:bg-[#ff7795]">Start your route <ArrowDownRight className="size-4" /></button><button type="button" onClick={() => scrollToId("library")} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:border-[#ea4b71]/60">Browse resources <BookOpen className="size-4" /></button></div><div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[.12] pt-5 text-xs text-[#bebec8]"><span>06-week route</span><span>13 curated resources</span><span>Private learning vault</span></div></div></div>
      </section>

      <section id="roadmap" className="scroll-mt-16 bg-[#040506] py-20 lg:py-28"><div className="mx-auto grid max-w-[1480px] gap-14 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-10"><aside className="lg:sticky lg:top-28 lg:self-start"><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">The complete route</p><h2 className="display mt-5 max-w-md text-5xl leading-[.92] tracking-[-.035em] text-white sm:text-6xl">Learn the parts. <em className="text-[#ff9bb1]">Ship the whole.</em></h2><p className="mt-6 max-w-sm text-sm leading-7 text-[#aaaab5]">Every stop combines a practical outcome with a resource pack selected for that exact capability.</p><div className="route-card mt-9 max-w-sm border border-white/[.12] bg-[#121216] p-5"><div className="flex items-start justify-between"><div><p className="mono text-[10px] uppercase tracking-[.15em] text-[#ffb4c5]">Saved route meter</p><p className="mt-2 text-3xl font-extrabold tracking-[-.05em] text-white">{progress}<span className="text-base text-[#aaaab5]">%</span></p></div><Waypoints className="size-5 text-[#ea4b71]" /></div><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#ea4b71] transition-all" style={{ width: `${progress}%` }} /></div><p className="mt-3 text-xs leading-5 text-[#aaaab5]">{isAuthenticated ? `${completeIds.length} of ${roadmapModules.length} route stops saved to your account.` : "Sign in to save your route across devices."}</p></div></aside><div className="relative space-y-6 pb-4 sm:space-y-8"><div className="absolute bottom-0 left-3 top-8 w-px bg-gradient-to-b from-[#ea4b71] via-[#ff9bb1] to-[#c92f55] sm:left-8" />{roadmapModules.map((module) => <ModuleCard key={module.id} module={module} resources={resourcesByModule[module.id] ?? []} isActive={activeModule === module.id} isDone={completeIds.includes(module.id)} onSelect={() => setActiveModule((current) => current === module.id ? "" : module.id)} onToggle={() => toggleComplete(module.id)} />)}</div></div></section>

      <section id="library" className="paper-grain scroll-mt-16 bg-white text-[#15151a]"><div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><div className="grid gap-8 border-b border-black/10 pb-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#c92f55]">Curated learning library</p><h2 className="display mt-5 text-5xl leading-[.93] tracking-[-.035em] sm:text-6xl">Learn the next <em>useful thing.</em></h2></div><div><p className="max-w-xl text-sm leading-7 text-[#606065]">Official n8n, MDN, and OpenAI material supports the whole roadmap, from automation mechanics to structured AI outputs and production hardening.</p><label className="relative mt-5 block max-w-xl"><BookOpen className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#c92f55]" /><input value={resourceQuery} onChange={(event) => setResourceQuery(event.target.value)} placeholder="Search guides, providers, or topics" className="w-full rounded-full border border-black/15 bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[#85858a] focus:border-[#ea4b71]" /></label></div></div><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredResources.map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="card-lift group flex min-h-[220px] flex-col border border-black/10 bg-white p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><span className="mono text-[10px] font-semibold uppercase tracking-[.13em] text-[#c92f55]">{resource.moduleId} / {resource.resourceType}</span><ExternalLink className="size-4 text-[#ea4b71] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><h3 className="display mt-7 text-2xl leading-[.96] tracking-[-.02em]">{resource.title}</h3><p className="mt-3 text-sm leading-6 text-[#606065]">{resource.description}</p><div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4"><span className="text-xs font-bold text-[#202027]">{resource.provider}</span><span className="mono text-[10px] text-[#85858a]">{resource.effort}</span></div></a>)}</div>{learningResources.isLoading && <p className="mt-8 text-sm text-[#606065]">Loading the curated library…</p>}{learningResources.error && <p className="mt-8 text-sm text-[#c92f55]">The resource library is temporarily unavailable.</p>}</div></section>

      <section className="bg-[#121216] py-20 lg:py-28"><div className="mx-auto grid max-w-[1480px] gap-10 px-5 sm:px-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-20 lg:px-10"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">Personal resource vault</p><h2 className="display mt-5 max-w-md text-5xl leading-[.93] tracking-[-.035em] text-white sm:text-6xl">Keep your build notes <em className="text-[#ff9bb1]">with the route.</em></h2><p className="mt-6 max-w-md text-sm leading-7 text-[#bebec6]">Save briefs, n8n exports, and handover notes to your account. The database keeps the record while secure storage keeps the actual file.</p><input ref={inputRef} onChange={handleFileChange} accept=".pdf,.json,.zip,.md,.txt,application/pdf,application/json,application/zip,text/markdown,text/plain" className="hidden" type="file" /><button type="button" onClick={() => isAuthenticated ? inputRef.current?.click() : startLogin()} disabled={uploadMutation.isPending} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ea4b71] px-5 py-3 text-sm font-extrabold text-white transition-colors hover:bg-[#ff7795] disabled:opacity-60"><Upload className="size-4" />{uploadMutation.isPending ? "Saving resource…" : isAuthenticated ? "Add a learning file" : "Sign in to add files"}</button><p className="mono mt-3 text-[10px] uppercase tracking-[.12em] text-[#85858f]">PDF, JSON, ZIP, Markdown, or text · up to 8 MB</p></div><div className="border border-white/10 bg-white/[.04] p-5 sm:p-7"><div className="flex items-start justify-between gap-4"><div><p className="mono text-[10px] uppercase tracking-[.14em] text-[#ffb4c5]">{isAuthenticated ? `${user?.name ?? "Your"} vault` : "Account required"}</p><p className="mt-2 text-sm text-[#c7c7cd]">{isAuthenticated ? "Files you save are available to your signed-in account." : "Sign in to attach your workflow resources to this roadmap."}</p></div><FileText className="size-7 text-[#ea4b71]" /></div><div className="mt-6 space-y-3">{(learnerFiles.data ?? []).map((file) => <a key={file.id} href={file.fileUrl} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 px-4 py-3 transition-colors hover:border-[#ea4b71]/50"><span className="min-w-0"><span className="block truncate text-sm font-bold text-white">{file.filename}</span><span className="mono mt-1 block text-[10px] uppercase tracking-[.1em] text-[#a0a0a8]">{Math.max(1, Math.round(file.sizeBytes / 1024))} KB · {file.contentType}</span></span><ExternalLink className="size-4 shrink-0 text-[#ff9bb1]" /></a>)}{isAuthenticated && learnerFiles.data?.length === 0 && <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-sm text-[#bcbcc4]">Your first saved workflow resource will appear here.</p>}{!isAuthenticated && <p className="rounded-xl border border-dashed border-white/15 px-4 py-6 text-sm text-[#bcbcc4]">Your resources remain private to your account after sign-in.</p>}</div></div></div></section>

      <section id="builds" className="bg-[#f5f5f6] text-[#15151a]"><div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#c92f55]">The build bench</p><h2 className="display mt-5 text-5xl leading-[.93] tracking-[-.035em] sm:text-6xl">Proof you can show.</h2></div><p className="max-w-sm text-sm leading-7 text-[#606065]">Use the routes and reference links to make portfolio-sized systems from recognisable operational problems.</p></div><div className="mt-7 grid gap-4 lg:grid-cols-3">{featuredBuilds.map((build) => <article key={build.id} className="card-lift min-h-[250px] border border-black/10 bg-white p-6 sm:p-7"><p className="mono text-[10px] font-semibold tracking-[.15em] text-[#c92f55]">{build.label}</p><h3 className="display mt-10 max-w-sm text-3xl leading-[.98] tracking-[-.025em]">{build.title}</h3><p className="mono mt-5 text-[11px] leading-5 text-[#606065]">{build.note}</p><button type="button" onClick={startRoute} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#c92f55] hover:text-[#ea4b71]">Trace the skills <ArrowRight className="size-4" /></button></article>)}</div></div></section>

      <section id="products" className="ink-grid scroll-mt-16 border-y border-white/[.1] py-20 lg:py-28"><div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#ffb4c5]">The Data Tea products</p><h2 className="display mt-5 max-w-md text-5xl leading-[.93] tracking-[-.035em] text-white sm:text-6xl">A better way to keep building.</h2></div><p className="max-w-lg text-sm leading-7 text-[#aaaab5]">The learning route is the foundation. The resource library and private vault give learners a clear way to keep building after their first workflow.</p></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{featuredProducts.map((product) => <article key={product.name} className="card-lift relative overflow-hidden border border-[#ea4b71]/30 bg-[#121216]/95 p-6 sm:p-7"><div className="absolute left-0 top-0 h-full w-1 bg-[#ea4b71]" /><p className="mono text-[10px] font-semibold uppercase tracking-[.15em] text-[#ff9bb1]">{product.eyebrow}</p><h3 className="display mt-7 text-3xl leading-[.98] text-white">{product.name}</h3><p className="mt-4 text-sm leading-6 text-[#aaaab5]">{product.description}</p><div className="mt-7 flex items-center justify-between border-t border-white/[.1] pt-4"><span className="mono text-[10px] uppercase tracking-[.12em] text-[#bebec8]">{product.meta}</span><ArrowRight className="size-4 text-[#ff9bb1]" /></div></article>)}</div></div></section>

      <footer className="border-t border-white/[.08] bg-[#040506]"><div className="mx-auto flex max-w-[1480px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><div className="flex items-center gap-3"><img src="/manus-storage/the-data-tea-automation-mark_85c07dab.png" alt="" className="size-8 object-contain" /><span className="text-sm font-extrabold text-white">The Data Tea</span></div><p className="mono text-[10px] uppercase tracking-[.14em] text-[#85858f]">AI automation learning route · n8n builder track</p><a href="#top" className="inline-flex items-center gap-2 text-xs font-bold text-[#ffb4c5] hover:text-[#ff9bb1]">Back to top <ArrowRight className="size-3.5 -rotate-90" /></a></div></footer>
    </main>
  );
}
