import { useState } from "react";
import { Award, Briefcase, GraduationCap, Copy, Check, ExternalLink } from "lucide-react";
import Reveal from "./Reveal";

interface Role {
  title: string;
  period: string;
  mode?: string;
  current?: boolean;
  description?: string[];
  bullets?: string[];
  skills: string[];
}

interface Company {
  name: string;
  type: string;
  location: string;
  roles: Role[];
}

const experience: Company[] = [
  {
    name: "Linx Goiânia | SuporTI",
    type: "Tempo integral",
    location: "Goiânia, GO, Brasil",
    roles: [
      {
        title: "Analista de Sistemas",
        period: "jun. 2025 – atual",
        mode: "Presencial",
        current: true,
        description: [
          "Atuo na implantação e evolução do ERP Linx Microvix para clientes do varejo, conectando processos de negócio a soluções tecnológicas e integrações entre sistemas.",
          "Minha atuação envolve levantamento de requisitos, estruturação de processos e condução de implantações, garantindo aderência às regras de negócio e estabilidade operacional.",
          "Também participo do acompanhamento e orientação de analistas em formação, apoiando treinamentos, validando configurações e contribuindo para a organização dos fluxos de trabalho dentro dos projetos.",
          "Paralelamente, colaboro em iniciativas de integração entre sistemas e melhoria contínua, apoiando a evolução dos ambientes e a construção de soluções mais eficientes e escaláveis.",
        ],
        skills: ["ERP Linx Microvix", "Integrações", "APIs", "SQL", "Regras de Negócio"],
      },
      {
        title: "Analista de Sistemas Trainee",
        period: "nov. 2024 – jun. 2025",
        bullets: [
          "Apoio à implantação e configuração inicial do ERP Linx Microvix.",
          "Levantamento de requisitos junto aos clientes e apoio à parametrização do sistema.",
          "Realização de testes, validações e suporte durante a fase de implantação.",
          "Construção de base técnica em processos de varejo e integrações sistêmicas.",
        ],
        skills: ["Implantação de Sistemas", "ERP Linx Microvix", "Processos de Varejo"],
      },
    ],
  },
];

const education = {
  school: "Estácio",
  institution: "Centro Universitário Estácio de Santa Catarina",
  degree: "Curso Superior de Tecnologia (CST) — Análise e Desenvolvimento de Sistemas",
  period: "fev. 2023 – jul. 2026",
  location: "São José, SC",
  conclusion: "Conclusão em 05/07/2026 · Colação de grau em 24/07/2026",
  href: "https://consultadiploma.estacio.br/diploma/1510.1510.be6c10699b94",
};

interface Certification {
  title: string;
  issuer: string;
  issued: string;
  credentialId: string;
  skills: string[];
  href?: string;
}

const certifications: Certification[] = [
  {
    title: "Postman: Do Zero ao Avançado + Testes Automatizados",
    issuer: "Udemy",
    issued: "ago. 2025",
    credentialId: "UC-06a729c8-ca1e-4c45-bf6f-d0f2ae908d28",
    skills: ["Postman", "REST APIs", "Automação de Testes", "API Development"],
    href: "https://www.udemy.com/certificate/UC-06a729c8-ca1e-4c45-bf6f-d0f2ae908d28/",
  },
  {
    title: "Aprenda a Extrair Dados de APIs com Python do Zero!",
    issuer: "Udemy",
    issued: "ago. 2025",
    credentialId: "UC-1ab969ae-ae02-48b9-af3c-f8099c036c76",
    skills: ["Python", "Integrações & APIs", "REST APIs", "HTTP"],
    href: "https://www.udemy.com/certificate/UC-1ab969ae-ae02-48b9-af3c-f8099c036c76/",
  },
  {
    title: "HTML5 e CSS3 parte 1: crie uma página da Web",
    issuer: "Alura",
    issued: "jun. 2022",
    credentialId: "e87f2811-65ec-4659-9c80-4db0259c8101",
    skills: ["HTML5", "JavaScript"],
  },
  {
    title: "HTML5 e CSS3 parte 2: posicionamento, listas e navegação",
    issuer: "Alura",
    issued: "set. 2022",
    credentialId: "736f79fc-5ce6-4d80-b674-96fec8ae75dc",
    skills: ["HTML5", "CSS", "JavaScript"],
  },
  {
    title: "HTML5 e CSS3 parte 3: trabalhando com formulários e tabelas",
    issuer: "Alura",
    issued: "set. 2022",
    credentialId: "77a72851-018d-4f54-b5ef-ef1a0bb82f93",
    skills: ["HTML5", "CSS", "JavaScript"],
  },
];

function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div className="mt-3.5 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-muted-2 transition-colors hover:border-accent/40 hover:text-white"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function CredentialIdCopy({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-2.5 flex items-center justify-between gap-2 rounded border border-white/10 bg-black/40 px-2.5 py-1 text-[11px] font-mono text-muted">
      <span className="truncate" title={id}>ID: {id}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "ID copiado" : "Copiar ID da credencial"}
        className="flex shrink-0 items-center gap-1 text-[10px] font-bold text-accent transition-colors hover:text-white"
      >
        {copied ? (
          <>
            <Check size={12} className="text-emerald-400" />
            <span className="text-emerald-400">Copiado</span>
          </>
        ) : (
          <>
            <Copy size={12} />
            <span>Copiar</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-page py-16 sm:py-24">
      {/* Número de seção decorativo */}
      <span className="section-number left-0 top-0 -translate-x-1/4" aria-hidden="true">
        03
      </span>

      <div className="wrap">
        <Reveal className="mb-12 text-center" as="div">
          <div className="mb-3.5 flex items-center justify-center gap-2">
            <span className="inline-block h-2 w-2 bg-accent shadow-[0_0_8px_rgba(216,31,38,0.8)]" />
            <span className="text-caption font-bold tracking-[2px] text-accent">
              TRAJETÓRIA PROFISSIONAL
            </span>
          </div>
          <h2 className="font-display text-h1 m-0 uppercase tracking-[0.5px]">
            EXPERIÊNCIA<span className="text-accent">.</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-[60px] bg-accent shadow-[0_0_8px_rgba(216,31,38,0.6)]" />
        </Reveal>

        <div className="mx-auto max-w-[880px]">
          {/* Experiência profissional com nó aranha luminoso */}
          <Reveal>
            <div className="mb-8 flex items-center gap-2.5 text-muted">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-accent">
                <Briefcase size={15} aria-hidden="true" />
              </span>
              <span className="text-caption font-bold tracking-[1.5px] text-white">ATUAÇÃO CORPORATIVA</span>
            </div>

            {experience.map((company) => (
              <div key={company.name} className="relative border-l-2 border-accent/40 pl-7 sm:pl-9">
                {/* Nó aranha principal */}
                <div
                  className="absolute -left-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-black shadow-[0_0_12px_rgba(216,31,38,0.7)]"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </div>

                <div className="mb-6">
                  <h3 className="text-h2 m-0 font-bold text-white">{company.name}</h3>
                  <div className="mt-1 text-small text-muted">
                    {company.type} · {company.location}
                  </div>
                </div>

                {/* Lista de cargos */}
                <div className="flex flex-col gap-8">
                  {company.roles.map((role) => (
                    <div
                      key={role.title}
                      className="glass-card card-glow relative rounded-xl border border-white/10 p-6 sm:p-7"
                    >
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h4 className="text-h3 m-0 font-bold text-white">{role.title}</h4>
                          {role.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold tracking-[1px] text-accent">
                              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                              ATUAL
                            </span>
                          )}
                        </div>
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11.5px] font-semibold text-muted-2">
                          {role.period}
                          {role.mode ? ` · ${role.mode}` : ""}
                        </div>
                      </div>

                      {role.description?.map((paragraph, i) => (
                        <p key={i} className="text-small m-0 mb-3 leading-[1.8] text-body-text last:mb-0">
                          {paragraph}
                        </p>
                      ))}

                      {role.bullets && (
                        <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
                          {role.bullets.map((bullet) => (
                            <li key={bullet} className="text-small flex items-start gap-2.5 leading-[1.65] text-body-text">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      <SkillTags skills={role.skills} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Certificações & Formação */}
        <Reveal delay={120} className="mx-auto mt-20 max-w-[1000px]" as="div">
          <div className="mb-3 flex items-center justify-center gap-2.5 text-muted">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-accent">
              <Award size={15} aria-hidden="true" />
            </span>
            <span className="text-caption font-bold tracking-[1.5px] text-white">FORMAÇÃO &amp; CERTIFICAÇÕES</span>
          </div>
          <h3 className="font-display text-h2 m-0 mb-8 text-center uppercase tracking-[0.5px]">
            EDUCAÇÃO CONTÍNUA<span className="text-accent">.</span>
          </h3>

          {/* Diploma em destaque */}
          <a
            href={education.href}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card card-glow group mb-6 flex flex-col gap-4 rounded-xl border-2 border-accent/50 bg-gradient-to-r from-accent/[0.08] via-transparent to-transparent p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent shadow-[0_0_14px_rgba(216,31,38,0.3)]">
                <GraduationCap size={24} aria-hidden="true" />
              </span>
              <div>
                <span className="inline-block rounded-full bg-accent/20 border border-accent/40 px-2.5 py-0.5 text-[10px] font-bold tracking-[1px] text-accent">
                  DIPLOMA UNIVERSITÁRIO
                </span>
                <div className="mt-1.5 text-[17px] font-bold leading-[1.35] text-white group-hover:text-accent transition-colors">
                  {education.degree}
                </div>
                <div className="mt-1 text-[13px] text-body-text">
                  {education.institution} · {education.location}
                </div>
                <div className="mt-1 text-[12px] text-muted">
                  {education.period} · {education.conclusion}
                </div>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-accent/40 bg-accent/15 px-4 py-2 text-[12px] font-bold text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white sm:self-center">
              Verificar diploma
              <ExternalLink size={13} aria-hidden="true" />
            </span>
          </a>

          {/* Grade de certificações */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {certifications.map((cert) => {
              const Wrapper = cert.href ? "a" : "div";
              return (
                <Wrapper
                  key={cert.credentialId}
                  {...(cert.href
                    ? { href: cert.href, target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="glass-card card-glow group relative flex flex-col justify-between rounded-xl p-5 transition-all duration-300"
                >
                  <div>
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <span className="text-[15px] font-bold leading-[1.35] text-white group-hover:text-accent transition-colors">
                        {cert.title}
                      </span>
                      {cert.href && (
                        <span
                          className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      )}
                    </div>
                    <div className="mb-2 text-[13px] font-semibold text-accent">{cert.issuer}</div>
                    <div className="text-[12px] text-muted">Emitido em {cert.issued}</div>
                  </div>

                  <div>
                    <CredentialIdCopy id={cert.credentialId} />
                    <SkillTags skills={cert.skills} />
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
