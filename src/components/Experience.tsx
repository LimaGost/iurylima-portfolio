import { Award, Briefcase, GraduationCap } from "lucide-react";
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
        skills: ["ERP Linx Microvix", "Integrações", "APIs"],
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
        skills: ["Implantação de Sistemas", "ERP Linx Microvix"],
      },
    ],
  },
];

const education = {
  school: "Estácio",
  degree: "Curso Superior de Tecnologia (CST) — Análise e Desenvolvimento de Sistemas",
  period: "fev. 2023 – jul. 2026",
};

const certifications = [
  {
    title: "HTML5 e CSS3 parte 1: crie uma página da Web",
    issuer: "Alura",
    issued: "jun. 2022",
    expired: "jun. 2022",
    credentialId: "e87f2811-65ec-4659-9c80-4db0259c8101",
    skills: ["HTML5", "JavaScript"],
  },
  {
    title: "HTML5 e CSS3 parte 2: posicionamento, listas e navegação",
    issuer: "Alura",
    issued: "set. 2022",
    credentialId: "736f79fc-5ce6-4d80-b674-96fec8ae75dc",
    skills: ["HTML5", "CSS"],
  },
  {
    title: "HTML5 e CSS3 parte 3: trabalhando com formulários e tabelas",
    issuer: "Alura",
    issued: "set. 2022",
    expired: "dez. 2022",
    credentialId: "77a72851-018d-4f54-b5ef-ef1a0bb82f93",
    skills: ["HTML5", "CSS"],
  },
];

function SkillTags({ skills }: { skills: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="rounded-[14px] border border-surface-border px-3 py-1 text-[11px] font-bold text-body-text-2"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative bg-page py-16 sm:py-20">
      <div className="wrap">
        <Reveal className="mb-14 text-center" as="div">
          <div className="mb-3.5 text-caption font-bold tracking-[2px] text-accent">
            TRAJETÓRIA
          </div>
          <h2 className="font-display text-h1 m-0 uppercase">
            EXPERIÊNCIA<span className="text-accent">.</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-[60px] bg-accent" />
        </Reveal>

        <div className="mx-auto max-w-[860px]">
          {/* experiência profissional */}
          <Reveal>
            <div className="mb-3 flex items-center gap-2.5 text-muted">
              <Briefcase size={16} aria-hidden="true" />
              <span className="text-caption font-bold tracking-[1.5px]">EXPERIÊNCIA PROFISSIONAL</span>
            </div>

            {experience.map((company) => (
              <div key={company.name} className="relative border-l-2 border-accent/40 pl-8">
                <span
                  className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-accent bg-page"
                  aria-hidden="true"
                />
                <h3 className="text-h3 m-0 font-bold text-ink">{company.name}</h3>
                <div className="mb-7 mt-1 text-small text-muted-2">
                  {company.type} · {company.location}
                </div>

                <div className="flex flex-col gap-8 border-l border-surface-border pl-6">
                  {company.roles.map((role) => (
                    <div key={role.title} className="relative">
                      <span
                        className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-ink">{role.title}</span>
                        {role.current && (
                          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold tracking-[1px] text-accent">
                            ATUAL
                          </span>
                        )}
                      </div>
                      <div className="mb-3 inline-flex items-center rounded-full border border-surface-border bg-surface px-2.5 py-1 text-[12px] font-bold tracking-[0.5px] text-accent">
                        {role.period}
                        {role.mode ? ` · ${role.mode}` : ""}
                      </div>

                      {role.description?.map((paragraph, i) => (
                        <p key={i} className="text-small m-0 mb-2 leading-[1.75] text-body-text last:mb-0">
                          {paragraph}
                        </p>
                      ))}

                      {role.bullets && (
                        <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
                          {role.bullets.map((bullet) => (
                            <li key={bullet} className="text-small flex items-start gap-2.5 leading-[1.6] text-body-text">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                              {bullet}
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

          {/* formação acadêmica */}
          <Reveal delay={80} className="mt-10 flex items-start gap-3 border-t border-surface-border pt-8">
            <GraduationCap size={18} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
            <div>
              <div className="text-small font-bold text-ink">{education.school}</div>
              <div className="text-small text-body-text-2">{education.degree}</div>
              <div className="mt-0.5 text-[13px] text-muted-2">{education.period}</div>
            </div>
          </Reveal>
        </div>

        {/* certificações */}
        <Reveal delay={120} className="mx-auto mt-20 max-w-[1000px]" as="div">
          <div className="mb-3 flex items-center justify-center gap-2.5 text-muted">
            <Award size={16} aria-hidden="true" />
            <span className="text-caption font-bold tracking-[1.5px]">FORMAÇÃO CONTÍNUA</span>
          </div>
          <h3 className="font-display text-h2 m-0 mb-8 text-center uppercase">Certificações</h3>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {certifications.map((cert) => (
              <div
                key={cert.credentialId}
                className="rounded-lg border border-surface-border bg-surface p-5 transition-colors duration-200 hover:border-accent/40"
              >
                <div className="mb-1 text-[15px] font-bold leading-[1.35] text-ink">{cert.title}</div>
                <div className="mb-3 text-[13px] text-muted-2">{cert.issuer}</div>
                <div className="text-[12px] text-body-text-2">
                  Emitido em {cert.issued}
                  {cert.expired ? ` · Expirado em ${cert.expired}` : ""}
                </div>
                <div className="mt-2 truncate font-mono text-[10px] text-muted-2" title={cert.credentialId}>
                  ID: {cert.credentialId}
                </div>
                <SkillTags skills={cert.skills} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
