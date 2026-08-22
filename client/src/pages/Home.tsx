/**
 * Design system: Automation Field Notes — a vertically navigable editorial route map.
 * The page uses deep ink for focus, warm paper for learning content, and signal colors as functional milestones.
 */
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  CircuitBoard,
  FileText,
  Gauge,
  GitBranch,
  Layers3,
  Menu,
  NotebookPen,
  Play,
  Printer,
  Sparkles,
  Waypoints,
  X,
} from "lucide-react";
import { featuredBuilds, featuredProducts, roadmapModules, type RoadmapModule } from "@/lib/roadmapData";

const toneStyles = {
  amber: {
    text: "text-[#e7b463]",
    chip: "border-[#e7b463]/30 bg-[#e7b463]/10 text-[#f0cf93]",
    border: "border-[#e7b463]/30",
    button: "bg-[#e7b463] text-[#08131a] hover:bg-[#f0cf93]",
    line: "bg-[#e7b463]",
  },
  mint: {
    text: "text-[#82d2c4]",
    chip: "border-[#82d2c4]/30 bg-[#82d2c4]/10 text-[#9be1d5]",
    border: "border-[#82d2c4]/30",
    button: "bg-[#82d2c4] text-[#08131a] hover:bg-[#a3e5da]",
    line: "bg-[#82d2c4]",
  },
  coral: {
    text: "text-[#f09279]",
    chip: "border-[#dd6e56]/30 bg-[#dd6e56]/10 text-[#f3a28e]",
    border: "border-[#dd6e56]/30",
    button: "bg-[#dd6e56] text-[#fff7ef] hover:bg-[#ed8b75]",
    line: "bg-[#dd6e56]",
  },
} as const;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ModuleCard({
  module,
  isActive,
  isDone,
  onToggle,
  onSelect,
}: {
  module: RoadmapModule;
  isActive: boolean;
  isDone: boolean;
  onToggle: () => void;
  onSelect: () => void;
}) {
  const tone = toneStyles[module.tone];
  const nodeTone = module.tone === "mint" ? "route-node-mint" : module.tone === "coral" ? "route-node-coral" : "";

  return (
    <article
      id={module.id}
      className={`route-node relative ml-4 scroll-mt-28 border-l border-white/15 pl-8 sm:ml-8 sm:pl-10 ${nodeTone} ${isDone ? "route-node-done" : ""}`}
    >
      <div className={`card-lift overflow-hidden border ${isActive ? tone.border : "border-white/10"} bg-[#0d202a]/85 shadow-[0_16px_44px_rgb(0,0,0,0.16)]`}>
        <button
          type="button"
          onClick={onSelect}
          aria-expanded={isActive}
          className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-7"
        >
          <div>
            <p className={`mono text-[10px] font-semibold uppercase tracking-[.18em] ${tone.text}`}>{module.route}</p>
            <h3 className="display mt-3 max-w-xl text-3xl leading-[.98] text-[#f8f1e8] sm:text-[2.45rem]">{module.title}</h3>
          </div>
          <span className={`mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border ${isActive ? tone.chip : "border-white/15 text-[#b8c7c6]"}`}>
            {isActive ? <X className="size-4" /> : <ChevronDown className="size-4" />}
          </span>
        </button>

        {isActive && (
          <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
            <div className="grid gap-7 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <p className="max-w-xl text-sm leading-7 text-[#bdcdca] sm:text-[15px]">{module.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {module.skills.map((skill) => (
                    <span key={skill} className={`rounded-full border px-3 py-1.5 text-xs font-bold ${tone.chip}`}>{skill}</span>
                  ))}
                </div>
              </div>
              <aside className="border-l-0 border-t border-dashed border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
                <p className="mono text-[10px] uppercase tracking-[.14em] text-[#82d2c4]">Field deliverable</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#f5f1e7]">{module.deliverable}</p>
                <p className="mono mt-5 text-[10px] uppercase tracking-[.14em] text-[#82d2c4]">Tool station</p>
                <p className="mt-2 text-sm text-[#a8bbbd]">{module.tools.join(" · ")}</p>
              </aside>
            </div>
            <div className="mt-7 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm italic leading-6 text-[#d5d8cb]">“{module.prompt}”</p>
              <button
                type="button"
                onClick={onToggle}
                className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors ${isDone ? "border border-[#82d2c4]/30 bg-[#82d2c4]/10 text-[#9be1d5]" : tone.button}`}
              >
                {isDone ? <Check className="size-4" /> : <Waypoints className="size-4" />}
                {isDone ? "Route stamped" : "Mark complete"}
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

  const progress = useMemo(() => Math.round((completeIds.length / roadmapModules.length) * 100), [completeIds.length]);

  const toggleComplete = (id: string) => {
    setCompleteIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  const startRoute = () => {
    setActiveModule("orient");
    scrollToId("roadmap");
  };

  return (
    <main className="overflow-x-hidden bg-[#08131a] text-[#f5f1e7]">
      <header className="sticky top-0 z-50 border-b border-white/[.08] bg-[#08131a]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1480px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="The Data Tea AI Automation Path home">
            <img src="/manus-storage/the-data-tea-automation-mark_85c07dab.png" alt="" className="size-10 object-contain" />
            <span className="leading-none">
              <span className="display block text-xl tracking-[-.03em] text-[#f8f1e8]">The Data Tea</span>
              <span className="mono mt-1 block text-[9px] font-semibold uppercase tracking-[.18em] text-[#82d2c4]">Automation path</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {["Path", "Why this route", "Builds", "Products"].map((item) => {
              const target = item === "Path" ? "roadmap" : item === "Why this route" ? "method" : item === "Builds" ? "builds" : "products";
              return <a key={item} href={`#${target}`} className="text-xs font-bold tracking-wide text-[#b5c6c4] transition-colors hover:text-[#f0cf93]">{item}</a>;
            })}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <button type="button" onClick={() => window.print()} className="no-print inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-extrabold text-[#f5f1e7] transition-colors hover:border-[#e7b463]/50 hover:text-[#f0cf93]">
              <Printer className="size-3.5" /> Print route
            </button>
            <button type="button" onClick={startRoute} className="no-print inline-flex items-center gap-2 rounded-full bg-[#e7b463] px-4 py-2 text-xs font-extrabold text-[#08131a] transition-colors hover:bg-[#f0cf93]">
              Begin <ArrowRight className="size-3.5" />
            </button>
          </div>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="no-print flex size-10 items-center justify-center rounded-full border border-white/15 text-[#f5f1e7] lg:hidden" aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/[.08] bg-[#0d202a] px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {["Path", "Why this route", "Builds", "Products"].map((item) => {
                const target = item === "Path" ? "roadmap" : item === "Why this route" ? "method" : item === "Builds" ? "builds" : "products";
                return <a onClick={() => setMenuOpen(false)} key={item} href={`#${target}`} className="rounded-xl px-3 py-2 text-sm font-bold text-[#d6e0dc] hover:bg-white/[.06]">{item}</a>;
              })}
            </div>
          </div>
        )}
      </header>

      <section id="top" className="ink-grid relative isolate min-h-[760px] overflow-hidden border-b border-white/[.1]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
          <img src="/manus-storage/ai-automation-field-hero_f0709d9e.jpg" alt="An editorial workbench representing an AI automation learning path" className="h-full w-full object-cover object-[70%_center] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08131a] via-[#08131a]/86 to-[#08131a]/12" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08131a]/85 via-transparent to-[#08131a]/25" />
        </div>
        <div className="relative mx-auto flex min-h-[760px] max-w-[1480px] items-center px-5 py-24 sm:px-8 lg:px-10">
          <div className="max-w-3xl pb-10 lg:w-[62%]">
            <div className="enter-up inline-flex items-center gap-2 border border-[#82d2c4]/25 bg-[#0d202a]/80 px-3 py-2 text-[#9be1d5] backdrop-blur-sm">
              <span className="flex size-5 items-center justify-center rounded-full bg-[#82d2c4] text-[#08131a]"><Sparkles className="size-3" /></span>
              <span className="mono text-[10px] font-semibold uppercase tracking-[.16em]">The Data Tea / Roadmaps</span>
            </div>
            <h1 className="display enter-up-delayed mt-7 max-w-3xl text-[3.7rem] leading-[.89] tracking-[-.045em] text-[#f8f1e8] sm:text-[5.6rem] lg:text-[6.75rem]">
              Make AI automation <em className="text-[#f0cf93]">useful.</em>
            </h1>
            <p className="enter-up-late mt-7 max-w-xl text-base leading-7 text-[#c8d5d2] sm:text-lg">
              A project-led route for learning how to design, build, and operate AI workflows — with <strong className="font-extrabold text-[#f5f1e7]">n8n</strong> at the center.
            </p>
            <div className="enter-up-late mt-9 flex flex-wrap gap-3">
              <button type="button" onClick={startRoute} className="inline-flex items-center gap-2 rounded-full bg-[#e7b463] px-6 py-3.5 text-sm font-extrabold text-[#08131a] transition-colors hover:bg-[#f0cf93]">
                Start your route <ArrowDownRight className="size-4" />
              </button>
              <button type="button" onClick={() => scrollToId("builds")} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#08131a]/50 px-6 py-3.5 text-sm font-bold text-[#f5f1e7] backdrop-blur-sm transition-colors hover:border-[#82d2c4]/60 hover:text-[#9be1d5]">
                See the builds <Play className="size-4" />
              </button>
            </div>
            <div className="enter-up-late mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/[.12] pt-5 text-xs text-[#a8bbbd]">
              <span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#e7b463]" /> 06-week route</span>
              <span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#82d2c4]" /> 05 practical builds</span>
              <span className="inline-flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#dd6e56]" /> Human-first systems</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 left-5 hidden items-center gap-3 text-[#9bb2b1] sm:left-8 lg:left-10 md:flex">
          <span className="mono text-[9px] uppercase tracking-[.18em]">Scroll to trace the path</span>
          <span className="h-px w-14 bg-[#82d2c4]/50" />
        </div>
      </section>

      <section id="method" className="paper-grain scroll-mt-20 bg-[#f5f1e7] text-[#102229]">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-28">
          <div>
            <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#467d78]">The method</p>
            <h2 className="display mt-5 text-5xl leading-[.94] tracking-[-.035em] sm:text-6xl">Small systems. <em>Real stakes.</em></h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#52666a]">You do not need a catalogue of tools. You need a way to recognize a useful workflow, build it visibly, and improve it safely.</p>
            <a href="#roadmap" className="mt-8 inline-flex items-center gap-2 border-b border-[#102229] pb-1 text-sm font-extrabold text-[#102229] transition-colors hover:border-[#d07d4f] hover:text-[#a55332]">How the route works <ArrowRight className="size-4" /></a>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#102229]/15 bg-[#102229]/15 sm:grid-cols-3">
            {[
              { icon: Waypoints, title: "Start with work", text: "Map a process before you automate it.", mark: "01" },
              { icon: CircuitBoard, title: "Build in public", text: "Make logic, data, and exceptions inspectable.", mark: "02" },
              { icon: Gauge, title: "Operate with care", text: "Design for review, recovery, and change.", mark: "03" },
            ].map(({ icon: Icon, title, text, mark }) => (
              <div key={mark} className="bg-[#f5f1e7] p-6 sm:p-7">
                <span className="mono text-[10px] font-semibold text-[#a55332]">{mark}</span>
                <Icon className="mt-9 size-6 text-[#0d5b58]" strokeWidth={1.5} />
                <h3 className="mt-5 text-base font-extrabold tracking-tight">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#607276]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="print-dark ink-grid scroll-mt-16 border-y border-white/[.1] py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1480px] gap-14 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-24 lg:px-10">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#82d2c4]">The 06-week route</p>
            <h2 className="display mt-5 max-w-md text-5xl leading-[.92] tracking-[-.035em] text-[#f8f1e8] sm:text-6xl">Learn the parts. <em className="text-[#f0cf93]">Ship the whole.</em></h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#a8bbbd]">Each stop puts a specific capability into practice, then leaves you with an artifact you can use, share, and improve.</p>
            <div className="route-card mt-9 max-w-sm border border-white/[.12] bg-[#0d202a]/90 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono text-[10px] font-semibold uppercase tracking-[.15em] text-[#82d2c4]">Your route meter</p>
                  <p className="mt-2 text-3xl font-extrabold tracking-[-.05em] text-[#f8f1e8]">{progress}<span className="text-base text-[#a8bbbd]">%</span></p>
                </div>
                <span className="flex size-10 items-center justify-center rounded-full border border-[#e7b463]/30 bg-[#e7b463]/10 text-[#f0cf93]"><NotebookPen className="size-4" /></span>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-[#e7b463]" style={{ width: `${progress}%` }} /></div>
              <p className="mt-3 text-xs leading-5 text-[#a8bbbd]">{completeIds.length === 0 ? "Open a route stop and stamp it as you go." : `${completeIds.length} of ${roadmapModules.length} route stops stamped.`}</p>
            </div>
            <div className="mt-7 hidden border-l border-[#82d2c4]/30 pl-4 lg:block">
              <p className="mono text-[9px] uppercase tracking-[.15em] text-[#82d2c4]">Rule of thumb</p>
              <p className="mt-2 text-sm leading-6 text-[#d4dfdb]">Automate the repeatable step, not the human judgement around it.</p>
            </div>
          </aside>

          <div className="relative space-y-6 pb-4 sm:space-y-8">
            <div className="absolute bottom-0 left-4 top-8 w-px bg-gradient-to-b from-[#e7b463] via-[#82d2c4] to-[#dd6e56] sm:left-8" />
            {roadmapModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                isActive={activeModule === module.id}
                isDone={completeIds.includes(module.id)}
                onSelect={() => setActiveModule((current) => current === module.id ? "" : module.id)}
                onToggle={() => toggleComplete(module.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="paper-grain bg-[#f5f1e7] text-[#102229]">
        <div className="mx-auto grid max-w-[1480px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10 lg:py-28">
          <div className="relative min-h-[420px] overflow-hidden border border-[#102229]/15 bg-[#0f2029] sm:min-h-[540px]">
            <img src="/manus-storage/ai-automation-n8n-station_eb986d6b.jpg" alt="A visual field note representing an n8n workflow station" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08131a]/65 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 border border-white/20 bg-[#08131a]/85 px-4 py-3 text-[#f5f1e7] backdrop-blur-sm sm:bottom-7 sm:left-7">
              <p className="mono text-[9px] uppercase tracking-[.15em] text-[#82d2c4]">Tool station / 03</p>
              <p className="mt-1 text-sm font-extrabold">Your first visible workflow</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#a55332]">Featured product</p>
            <div className="mt-5 flex items-center gap-3"><span className="flex size-11 items-center justify-center rounded-full bg-[#f07c2d] text-white"><GitBranch className="size-5" /></span><span className="mono text-xs font-semibold uppercase tracking-[.13em] text-[#52666a]">n8n automation path</span></div>
            <h2 className="display mt-6 max-w-xl text-5xl leading-[.93] tracking-[-.035em] sm:text-6xl">One trigger can become a <em>useful system.</em></h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#52666a]">n8n is the hands-on center of the route. You will use it to connect tools, make decisions visible, introduce AI where it helps, and design the exception paths that make a workflow dependable.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["A focused n8n sandbox", "Node-by-node build notes", "Review gates for AI output", "Workflow handover template"].map((item) => (
                <div key={item} className="flex items-center gap-3 border-t border-[#102229]/15 pt-3 text-sm font-bold"><span className="flex size-5 items-center justify-center rounded-full bg-[#0d5b58] text-white"><Check className="size-3" /></span>{item}</div>
              ))}
            </div>
            <button type="button" onClick={() => { setActiveModule("orchestrate"); scrollToId("orchestrate"); }} className="mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-[#102229] px-5 py-3 text-sm font-extrabold text-[#f5f1e7] transition-colors hover:bg-[#0d5b58]">
              Open n8n module <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="builds" className="scroll-mt-16 bg-[#e6e3da] text-[#102229]">
        <div className="mx-auto max-w-[1480px] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="flex flex-col justify-between gap-6 border-b border-[#102229]/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#467d78]">The build bench</p>
              <h2 className="display mt-5 text-5xl leading-[.93] tracking-[-.035em] sm:text-6xl">Proof you can show.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-[#52666a]">Make the learning legible with portfolio-sized systems that start from a recognisable operational problem.</p>
          </div>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {featuredBuilds.map((build, index) => (
              <article key={build.id} className="card-lift relative min-h-[265px] overflow-hidden border border-[#102229]/15 bg-[#f5f1e7] p-6 sm:p-7">
                <div className={`absolute right-0 top-0 h-1.5 w-2/5 ${index === 0 ? "bg-[#e7b463]" : index === 1 ? "bg-[#82d2c4]" : "bg-[#dd6e56]"}`} />
                <p className="mono text-[10px] font-semibold tracking-[.15em] text-[#a55332]">{build.label}</p>
                <h3 className="display mt-10 max-w-sm text-3xl leading-[.98] tracking-[-.025em]">{build.title}</h3>
                <p className="mono mt-5 text-[11px] leading-5 text-[#607276]">{build.note}</p>
                <button type="button" onClick={() => scrollToId("roadmap")} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#0d5b58] hover:text-[#a55332]">Trace the skills <ArrowRight className="size-4" /></button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="ink-grid scroll-mt-16 border-y border-white/[.1] py-20 lg:py-28">
        <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#82d2c4]">The Data Tea products</p>
              <h2 className="display mt-5 max-w-md text-5xl leading-[.93] tracking-[-.035em] text-[#f8f1e8] sm:text-6xl">A better way to keep building.</h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-[#a8bbbd]">The roadmap is the starting point. The product set helps learners move from a first useful build to a collection of systems they can explain and operate.</p>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {featuredProducts.map((product) => {
              const tone = product.accent === "amber" ? toneStyles.amber : product.accent === "mint" ? toneStyles.mint : toneStyles.coral;
              return (
                <article key={product.name} className={`card-lift relative overflow-hidden border ${tone.border} bg-[#0d202a]/85 p-6 sm:p-7`}>
                  <div className={`absolute left-0 top-0 h-full w-1 ${tone.line}`} />
                  <p className={`mono text-[10px] font-semibold uppercase tracking-[.15em] ${tone.text}`}>{product.eyebrow}</p>
                  <h3 className="display mt-7 text-3xl leading-[.98] text-[#f8f1e8]">{product.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#a8bbbd]">{product.description}</p>
                  <div className="mt-7 flex items-center justify-between border-t border-white/[.1] pt-4">
                    <span className="mono text-[10px] uppercase tracking-[.12em] text-[#b8c7c6]">{product.meta}</span>
                    <ArrowRight className={`size-4 ${tone.text}`} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0d202a] py-20 lg:py-28">
        <img src="/manus-storage/ai-automation-roadmap-map_cc1a5000.jpg" alt="" className="absolute right-[-4%] top-[-26%] h-[140%] w-auto max-w-none opacity-25 mix-blend-screen" />
        <div className="relative mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="mono text-[10px] font-semibold uppercase tracking-[.18em] text-[#82d2c4]">Your next useful system</p>
            <h2 className="display mt-5 text-5xl leading-[.91] tracking-[-.04em] text-[#f8f1e8] sm:text-7xl">Start with one trigger. <em className="text-[#f0cf93]">End with a system.</em></h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#bed0cd]">Pick a repeated task, trace it honestly, and use the route to build an automation you can trust with real work.</p>
            <button type="button" onClick={startRoute} className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#e7b463] px-6 py-3.5 text-sm font-extrabold text-[#08131a] transition-colors hover:bg-[#f0cf93]">Begin the n8n route <ArrowDownRight className="size-4" /></button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[.08] bg-[#08131a]">
        <div className="mx-auto flex max-w-[1480px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <img src="/manus-storage/the-data-tea-automation-mark_85c07dab.png" alt="" className="size-8 object-contain" />
            <span className="text-sm font-extrabold text-[#f5f1e7]">The Data Tea</span>
          </div>
          <p className="mono text-[10px] uppercase tracking-[.14em] text-[#789091]">AI automation learning route · n8n builder track</p>
          <a href="#top" className="inline-flex items-center gap-2 text-xs font-bold text-[#9be1d5] hover:text-[#f0cf93]">Back to top <ArrowRight className="size-3.5 -rotate-90" /></a>
        </div>
      </footer>
    </main>
  );
}
