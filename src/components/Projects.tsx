import Reveal from "./Reveal";

interface Project {
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
}

const projects: Project[] = [
  {
    title: "Plataforma SaaS Multi-Tenant",
    description:
      "Arquitetei uma aplicação SaaS multi-tenant containerizada, com isolamento estrito de dados, resolução dinâmica de tenancy e controle de acesso baseado em papéis.",
    tags: ["REACT", "NODE.JS", "POSTGRESQL", "DOCKER"],
    featured: false,
  },
  {
    title: "Gateway de Pagamento Full-Stack",
    description:
      "Construí um sistema de gateway de pagamento robusto, com gestão de estado de transações em tempo real, webhooks seguros e múltiplos fluxos de processamento.",
    tags: ["NODE.JS", "EXPRESS", "STRIPE API"],
    featured: false,
  },
  {
    title: "Portal Universitário Notice Hub",
    description:
      "Desenvolvi uma plataforma de notificações em tempo real para centralizar avisos da universidade, comunicação com estudantes e atualizações do campus.",
    tags: ["REACT", "TAILWIND CSS", "NODE.JS"],
    featured: false,
  },
  {
    title: "Extensão de Produtividade",
    description:
      "Criei uma extensão para Chrome rica em funcionalidades, usando as APIs do Chrome para otimizar gestão de tarefas e acompanhamento de fluxo de trabalho pessoal.",
    tags: ["JAVASCRIPT", "CHROME APIS", "TAILWIND"],
    featured: true,
  },
];

/** Capa abstrata por projeto — um padrão gerado a partir do stack, nunca uma
 *  screenshot fabricada de um produto que não tem uma neste repositório. */
function ProjectCover({ project, large = false }: { project: Project; large?: boolean }) {
  const seed = project.title.length + project.tags.length;
  return (
    <div
      aria-hidden="true"
      className={`relative mb-5 overflow-hidden rounded border border-surface-border/70 ${large ? "h-28" : "h-20"}`}
      style={{ background: "linear-gradient(135deg, rgba(216,31,38,0.08), rgba(0,0,0,0.4))" }}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={`${(i * 22 + seed) % 100}%`}
            y1="0"
            x2={`${(i * 22 + seed - 30) % 100}%`}
            y2="100%"
            stroke="var(--color-accent)"
            strokeOpacity={0.18}
            strokeWidth={1}
          />
        ))}
      </svg>
      <span className="absolute bottom-2 right-3 font-display text-[11px] tracking-[1px] text-accent/70">
        {project.tags[0]}
      </span>
    </div>
  );
}

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`group relative flex h-full flex-col rounded-md bg-surface transition-all duration-300 hover:-translate-y-1 hover:bg-accent/[0.06] ${large ? "p-8 sm:p-10" : "p-7"}`}
      style={{
        border: project.featured ? "2px solid var(--color-accent)" : "1px solid var(--color-surface-border)",
      }}
    >
      {project.featured && (
        <span className="mb-4 inline-block text-[11px] font-bold tracking-[1.5px] text-accent">
          DESTAQUE
        </span>
      )}
      <ProjectCover project={project} large={large} />
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className={`font-extrabold ${large ? "text-h2" : "text-h3"}`}>{project.title}</span>
        <span
          className="shrink-0 text-lg text-muted-2 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>
      <p className={`m-0 mb-[18px] leading-[1.7] text-body-text-2 ${large ? "max-w-[560px] text-body" : "text-small"}`}>
        {project.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-[14px] border border-surface-border px-3 py-1.5 text-[11px] font-bold text-body-text-2 transition-colors duration-300 group-hover:border-accent/40 group-hover:text-ink"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-16 sm:py-20" style={{ background: "var(--color-page)" }}>
      <div className="wrap">
        <Reveal className="mb-14 text-center" as="div">
          <div className="mb-3.5 text-caption font-bold tracking-[2px] text-accent">
            TRABALHOS EM DESTAQUE
          </div>
          <h2 className="font-display text-h1 m-0 uppercase">
            PROJETOS<span className="text-accent">.</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-[60px] bg-accent" />
        </Reveal>

        <div className="mx-auto flex max-w-[1100px] flex-col gap-6">
          {featured && (
            <Reveal>
              <ProjectCard project={featured} large />
            </Reveal>
          )}
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-3">
            {rest.map((project, i) => (
              <Reveal key={project.title} delay={i * 80} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
