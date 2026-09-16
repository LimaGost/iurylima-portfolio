import { useEffect, useRef, useState, useMemo } from "react";
import { Braces, Code2, Database, LineChart, Layers, Server, Wrench } from "lucide-react";
import Reveal from "./Reveal";

const levelWidth: Record<string, string> = {
  BÁSICO: "40%",
  INTERMEDIÁRIO: "72%",
  AVANÇADO: "94%",
};

const categoryIcons = {
  FRONTEND: Code2,
  LANGUAGE: Braces,
  BACKEND: Server,
  DATABASE: Database,
  TOOLS: Wrench,
  DATA: LineChart,
  FUNDAMENTALS: Layers,
} as const;

const categoryLabels: Record<keyof typeof categoryIcons, string> = {
  FRONTEND: "FRONTEND",
  LANGUAGE: "LINGUAGEM",
  BACKEND: "BACKEND",
  DATABASE: "BANCO DE DADOS",
  TOOLS: "FERRAMENTAS",
  DATA: "DADOS & IA",
  FUNDAMENTALS: "FUNDAMENTOS",
};

interface SkillItem {
  name: string;
  category: keyof typeof categoryIcons;
  level: "BÁSICO" | "INTERMEDIÁRIO" | "AVANÇADO";
  group: "frontend" | "backend" | "database" | "tools";
}

const skills: SkillItem[] = [
  { name: "React / Next.js", category: "FRONTEND", level: "INTERMEDIÁRIO", group: "frontend" },
  { name: "JavaScript / TypeScript", category: "LANGUAGE", level: "INTERMEDIÁRIO", group: "frontend" },
  { name: "Node.js & Express", category: "BACKEND", level: "INTERMEDIÁRIO", group: "backend" },
  { name: "PostgreSQL & SQL", category: "DATABASE", level: "INTERMEDIÁRIO", group: "database" },
  { name: "REST APIs & Integrações", category: "BACKEND", level: "INTERMEDIÁRIO", group: "backend" },
  { name: "Python / AI & ML", category: "DATA", level: "INTERMEDIÁRIO", group: "database" },
  { name: "Tailwind CSS", category: "FRONTEND", level: "AVANÇADO", group: "frontend" },
  { name: "Angular", category: "FRONTEND", level: "INTERMEDIÁRIO", group: "frontend" },
  { name: "Java", category: "LANGUAGE", level: "INTERMEDIÁRIO", group: "backend" },
  { name: "Git & GitHub", category: "TOOLS", level: "INTERMEDIÁRIO", group: "tools" },
  { name: "Docker & DevOps", category: "TOOLS", level: "BÁSICO", group: "tools" },
  { name: "Estruturas de Dados & Algoritmos", category: "FUNDAMENTALS", level: "BÁSICO", group: "tools" },
];

const filters = [
  { id: "all", label: "TODAS" },
  { id: "frontend", label: "FRONTEND" },
  { id: "backend", label: "BACKEND & APIS" },
  { id: "database", label: "DADOS & DB" },
  { id: "tools", label: "FERRAMENTAS" },
] as const;

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const Icon = categoryIcons[skill.category];
  const width = levelWidth[skill.level] ?? "50%";
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("bar-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (el.parentElement) observer.observe(el.parentElement);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="glass-card card-glow group relative rounded-lg p-5 transition-all duration-300"
      style={{ borderLeft: "2px solid rgba(216,31,38,0.5)" }}
    >
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent shadow-[0_0_10px_rgba(216,31,38,0.15)] transition-colors duration-200 group-hover:bg-accent group-hover:text-white">
            <Icon size={16} aria-hidden="true" />
          </span>
          <div>
            <span className="text-[15px] font-bold text-white transition-colors duration-200 group-hover:text-accent">
              {skill.name}
            </span>
            <div className="mt-0.5 text-[11px] font-medium tracking-[0.8px] text-muted">
              {categoryLabels[skill.category]}
            </div>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[1px] ${
            skill.level === "AVANÇADO"
              ? "bg-accent/20 text-accent border border-accent/40"
              : "bg-white/[0.06] text-muted-2 border border-white/10"
          }`}
        >
          {skill.level}
        </span>
      </div>

      {/* Barra de progresso com ponta brilhante */}
      <div
        className="relative h-[4px] w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={skill.level === "AVANÇADO" ? 94 : skill.level === "INTERMEDIÁRIO" ? 72 : 40}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Proficiência em ${skill.name}: ${skill.level.toLowerCase()}`}
      >
        <div
          ref={barRef}
          className="skill-bar-inner shadow-[0_0_10px_rgba(216,31,38,0.7)]"
          style={
            {
              width,
              "--bar-delay": `${(index % 6) * 60}ms`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredSkills = useMemo(() => {
    if (activeFilter === "all") return skills;
    return skills.filter((s) => s.group === activeFilter);
  }, [activeFilter]);

  return (
    <section id="skills" className="relative overflow-hidden bg-page pt-10 pb-16 sm:pt-14 sm:pb-24">
      {/* Número de seção decorativo */}
      <span className="section-number right-0 top-0 translate-x-1/4" aria-hidden="true">
        02
      </span>

      <div className="wrap">
        <Reveal className="mb-10 text-center" as="div">
          <div className="mb-3.5 flex items-center justify-center gap-2">
            <span className="inline-block h-2 w-2 bg-accent shadow-[0_0_8px_rgba(216,31,38,0.8)]" />
            <span className="text-caption font-bold tracking-[2px] text-accent">
              ARSENAL &amp; EXPERTISE
            </span>
          </div>
          <h2 className="font-display text-h1 m-0 uppercase tracking-[0.5px]">
            HABILIDADES<span className="text-accent">.</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-[60px] bg-accent shadow-[0_0_8px_rgba(216,31,38,0.6)]" />
          <p className="mx-auto mt-4 max-w-[480px] text-small text-body-text">
            Experiência prática com tecnologia, construída através de projetos reais,
            desafios de negócio corporativos e desenvolvimento contínuo.
          </p>
        </Reveal>

        {/* Barra ergonômica de filtros por categoria */}
        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-2"
          role="tablist"
          aria-label="Filtrar habilidades por categoria"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const count =
              filter.id === "all"
                ? skills.length
                : skills.filter((s) => s.group === filter.id).length;

            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`group flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold tracking-[1px] transition-all duration-200 ${
                  isActive
                    ? "bg-accent text-white shadow-[0_2px_14px_rgba(216,31,38,0.4)]"
                    : "border border-white/10 bg-white/[0.04] text-muted hover:border-accent/40 hover:text-white"
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    isActive ? "bg-black/30 text-white" : "bg-white/10 text-muted-2"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grade de habilidades */}
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {filteredSkills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
