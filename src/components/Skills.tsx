import { Braces, Code2, Database, LineChart, Layers, Server, Wrench } from "lucide-react";
import Reveal from "./Reveal";

const levelDots: Record<string, number> = {
  BÁSICO: 1,
  INTERMEDIÁRIO: 2,
  AVANÇADO: 3,
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

// rótulo exibido em português, mas a chave interna continua em inglês
// para não precisar mexer no restante do arquivo
const categoryLabels: Record<keyof typeof categoryIcons, string> = {
  FRONTEND: "FRONTEND",
  LANGUAGE: "LINGUAGEM",
  BACKEND: "BACKEND",
  DATABASE: "BANCO DE DADOS",
  TOOLS: "FERRAMENTAS",
  DATA: "DADOS",
  FUNDAMENTALS: "FUNDAMENTOS",
};

const skills = [
  { name: "React / Next.js", category: "FRONTEND", level: "INTERMEDIÁRIO" },
  { name: "JavaScript / TypeScript", category: "LANGUAGE", level: "INTERMEDIÁRIO" },
  { name: "Node.js & Express", category: "BACKEND", level: "INTERMEDIÁRIO" },
  { name: "PostgreSQL & SQL", category: "DATABASE", level: "INTERMEDIÁRIO" },
  { name: "Python / AI & ML", category: "DATA", level: "INTERMEDIÁRIO" },
  { name: "Java", category: "LANGUAGE", level: "INTERMEDIÁRIO" },
  { name: "Tailwind CSS", category: "FRONTEND", level: "AVANÇADO" },
  { name: "Angular", category: "FRONTEND", level: "INTERMEDIÁRIO" },
  { name: "REST APIs / Integrações", category: "BACKEND", level: "INTERMEDIÁRIO" },
  { name: "Docker & DevOps", category: "TOOLS", level: "BÁSICO" },
  { name: "Git / GitHub", category: "TOOLS", level: "INTERMEDIÁRIO" },
  { name: "Data Structures & Algorithms", category: "FUNDAMENTALS", level: "BÁSICO" },
] as const;

function SkillCard({ skill }: { skill: (typeof skills)[number] }) {
  const Icon = categoryIcons[skill.category];
  const filled = levelDots[skill.level] ?? 2;
  return (
    <div className="rounded-lg border border-surface-border bg-surface px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
            <Icon size={15} aria-hidden="true" />
          </span>
          <div>
            <span className="text-h3 font-bold text-ink">{skill.name}</span>
            <div className="mt-0.5 text-[11px] tracking-[1px] text-muted-2">{categoryLabels[skill.category]}</div>
          </div>
        </div>
        <div
          className="flex shrink-0 items-center gap-3"
          role="img"
          aria-label={`Nível de proficiência em ${skill.name}: ${skill.level.toLowerCase()}`}
        >
          <span className="text-[11px] font-bold tracking-[1px] text-accent">{skill.level}</span>
          <span className="flex gap-1" aria-hidden="true">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${i < filled ? "bg-accent" : "bg-white/15"}`}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-page pt-8 pb-16 sm:pt-10 sm:pb-20">
      <div className="wrap">
        <Reveal className="mb-14 text-center" as="div">
          <div className="mb-3.5 text-caption font-bold tracking-[2px] text-accent">
            ARSENAL E EXPERTISE
          </div>
          <h2 className="font-display text-h1 m-0 uppercase">
            HABILIDADES TÉCNICAS<span className="text-accent">.</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-[60px] bg-accent" />
          <p className="mx-auto mt-4 max-w-[440px] text-small text-muted-2">
            Minha experiência prática com tecnologia, construída através de projetos reais, desafios de negócio e desenvolvimento contínuo.

            Mais do que ferramentas, busco entender como cada tecnologia pode ser aplicada para criar soluções eficientes, escaláveis e bem estruturadas.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
