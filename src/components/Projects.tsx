import { ExternalLink, GitBranch, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import Reveal from "./Reveal";

interface Project {
  title: string;
  file: string;
  description: string;
  stack: { k: string; v: string }[];
  tags: string[];
  featured: boolean;
  status: string;
  href?: string;
  techIcon?: string;
}

const projects: Project[] = [
  {
    title: "Server Integrations Hub",
    file: "server-integrations/server.ts",
    description:
      "Camada de integrações externas para um sistema de tickets, rodando como serviço Node/Express independente em produção — arquitetura de backend resiliente com webhooks e automação de chamados. Em uso ativo em ambiente corporativo real (nome da empresa omitido por confidencialidade).",
    stack: [
      { k: "Arquitetura", v: "Serviço Node/Express standalone" },
      { k: "Integrações", v: "Gmail API + webhooks de automação" },
      { k: "Deploy", v: "VPS, processo persistente PM2" },
    ],
    tags: ["TYPESCRIPT", "NODE.JS", "EXPRESS", "GMAIL API"],
    featured: true,
    status: "Em Produção",
    href: "https://github.com/LimaGost/Server--integrations-main",
    techIcon: "🔗",
  },
  {
    title: "ML Integration Hub",
    file: "ml-integration-hub/oauth.js",
    description:
      "Painel de cadastro em lote de produtos no Mercado Livre via API oficial, com fluxo de autenticação completo OAuth2 + PKCE e renovação automática de token para operações comerciais.",
    stack: [
      { k: "Auth", v: "OAuth2 + PKCE" },
      { k: "API", v: "Mercado Livre (oficial)" },
      { k: "Extra", v: "Refresh token automático + demo público" },
    ],
    tags: ["JAVASCRIPT", "OAUTH2 + PKCE", "MERCADO LIVRE API"],
    featured: false,
    status: "Concluído",
    href: "https://github.com/LimaGost/ml-integration-hub",
    techIcon: "🛒",
  },
  {
    title: "Controle Software House - CRM - Tickets",
    file: "controle-software-house-crm-tickets/crm.js",
    description:
      "CRM e controle interno de uma software house, cobrindo gestão de tickets, suporte ao cliente, relatórios e fluxos operacionais ponta a ponta. Em uso ativo em ambiente corporativo real (nome da empresa omitido por confidencialidade).",
    stack: [
      { k: "Domínio", v: "CRM interno / atendimento" },
      { k: "Stack", v: "JavaScript + React" },
      { k: "Escopo", v: "Fluxo operacional completo" },
    ],
    tags: ["JAVASCRIPT", "CRM", "REACT"],
    featured: false,
    status: "Concluído",
    href: "https://github.com/LimaGost/controle-software-house-crm-tickets",
    techIcon: "🎫",
  },
];

/** Capa estilo editor de código / terminal VS Code refinado */
function ProjectCover({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`relative mb-5 overflow-hidden rounded-lg border border-white/10 bg-black/60 shadow-inner ${
        large ? "h-28" : "h-24"
      }`}
      style={{
        background: "linear-gradient(135deg, rgba(216,31,38,0.12) 0%, rgba(0,0,0,0.7) 100%)",
      }}
    >
      {/* Barra de abas de código estilo macOS / VS Code */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-3.5 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_6px_rgba(216,31,38,0.6)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 truncate font-mono text-[11px] tracking-[0.5px] text-muted">
            {project.file}
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
          <GitBranch size={11} className="text-accent" />
          <span>main</span>
        </div>
      </div>

      {/* Conteúdo decorativo do editor */}
      <div className="flex h-full items-center justify-between px-4 pb-4">
        <div className="flex items-center gap-2.5">
          {project.techIcon && <span className="text-2xl">{project.techIcon}</span>}
          <span className="font-mono text-[12px] font-semibold text-white/90">
            {project.tags[0]}
          </span>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
          ● {project.status}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <div
      className={`glass-card card-glow relative flex h-full flex-col rounded-xl transition-all duration-300 ${
        large ? "p-7 sm:p-9" : "p-6"
      }`}
      style={{
        border: project.featured
          ? "2px solid rgba(216,31,38,0.55)"
          : "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {project.featured && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[11px] font-bold tracking-[1.5px] text-accent">
          <Sparkles size={12} className="animate-spin" />
          PROJETO EM DESTAQUE
        </div>
      )}

      <ProjectCover project={project} large={large} />

      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className={`font-bold text-white ${large ? "text-h2" : "text-h3"}`}>
          {project.title}
        </h3>
      </div>

      <p className={`m-0 mb-5 leading-[1.75] text-body-text ${large ? "max-w-[620px] text-body" : "text-small"}`}>
        {project.description}
      </p>

      {/* Especificações técnicas em bloco terminal */}
      <ul className="m-0 mb-5 flex list-none flex-col gap-2 rounded-lg border border-white/10 bg-black/40 p-3.5 font-mono text-[12px] leading-[1.5]">
        {project.stack.map((item) => (
          <li key={item.k} className="flex gap-2 text-body-text">
            <span className="shrink-0 text-accent font-bold">▹</span>
            <span>
              <span className="text-muted font-medium">{item.k}:</span> {item.v}
            </span>
          </li>
        ))}
      </ul>

      {/* Tags e Ação de acesso ao código */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.5px] text-muted-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver repositório do projeto ${project.title} no GitHub`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/50 bg-accent/10 px-3.5 py-2 text-xs font-bold text-white shadow-[0_2px_10px_rgba(216,31,38,0.2)] transition-all duration-200 hover:border-accent hover:bg-accent hover:shadow-[0_4px_16px_rgba(216,31,38,0.4)]"
          >
            <GithubIcon size={13} aria-hidden="true" />
            <span>Repositório</span>
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative overflow-hidden bg-page py-16 sm:py-24">
      {/* Número de seção decorativo */}
      <span className="section-number right-0 top-0 translate-x-1/4" aria-hidden="true">
        04
      </span>

      <div className="wrap">
        <Reveal className="mb-12 text-center" as="div">
          <div className="mb-3.5 flex items-center justify-center gap-2">
            <span className="inline-block h-2 w-2 bg-accent shadow-[0_0_8px_rgba(216,31,38,0.8)]" />
            <span className="text-caption font-bold tracking-[2px] text-accent">
              TRABALHOS EM DESTAQUE
            </span>
          </div>
          <h2 className="font-display text-h1 m-0 uppercase tracking-[0.5px]">
            PROJETOS<span className="text-accent">.</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-[60px] bg-accent shadow-[0_0_8px_rgba(216,31,38,0.6)]" />
          <p className="mx-auto mt-4 max-w-[500px] text-small text-body-text">
            Sistemas reais em produção, integrações de APIs corporativas e soluções que resolvem problemas operacionais.
          </p>
        </Reveal>

        <div className="mx-auto flex max-w-[1100px] flex-col gap-6">
          {featured && (
            <Reveal>
              <ProjectCard project={featured} large />
            </Reveal>
          )}
          <div
            className={`grid grid-cols-1 items-stretch gap-6 ${
              rest.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
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
