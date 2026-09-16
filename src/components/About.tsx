import WebSvg, { WebIcon } from "./WebSvg";
import Reveal from "./Reveal";

const stack = [
  { name: "React / Next.js", tag: "Frontend" },
  { name: "TypeScript", tag: "Linguagem" },
  { name: "Node.js & Express", tag: "Backend" },
  { name: "PostgreSQL & SQL", tag: "Banco de Dados" },
  { name: "APIs & Integrações", tag: "Arquitetura" },
  { name: "Linx Microvix ERP", tag: "Enterprise" },
];

const stats = [
  { value: "2+", label: "Anos de experiência", desc: "No ecossistema tech" },
  { value: "60+", label: "Projetos entregues", desc: "Sistemas & integrações" },
  { value: "6+", label: "Tecnologias no stack", desc: "Domínio prático" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-16 pb-8 sm:pt-24 sm:pb-12">
      {/* Número de seção decorativo */}
      <span
        className="section-number right-0 top-0 translate-x-1/4"
        aria-hidden="true"
      >
        01
      </span>

      <WebSvg
        className="pointer-events-none absolute left-[-70px] top-[80px] h-80 w-80 text-white"
        style={{ opacity: 0.05 }}
      />

      <div className="wrap grid grid-cols-1 items-center gap-16 md:grid-cols-[1.3fr_0.7fr] md:gap-12">
        <Reveal>
          {/* Label de seção */}
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="inline-block h-2.5 w-2.5 bg-accent shadow-[0_0_8px_rgba(216,31,38,0.8)]" />
            <span className="text-caption font-bold tracking-[2px] text-accent">
              POR TRÁS DA MÁSCARA
            </span>
          </div>

          <h2 className="font-display text-h1 m-0 mb-6 uppercase tracking-[0.5px]">
            IURY LIMA<span className="text-accent">.</span>
          </h2>

          <div className="max-w-[540px]">
            <p className="text-body m-0 mb-[18px] leading-[1.8] text-body-text">
              Sou Analista de Sistemas com experiência em ERP, integrações e desenvolvimento,
              conectando tecnologia às necessidades reais do negócio. Atuo com Linx Microvix,
              APIs, bancos de dados e soluções web, enquanto evoluo constantemente em engenharia
              de software e desenvolvimento Full Stack.
            </p>
            <p className="text-body m-0 mb-8 font-medium leading-[1.8] text-white">
              Transformando problemas complexos em soluções simples, rápidas e eficientes.
            </p>
          </div>

          {/* Stats em cards com estética HUD */}
          <Reveal delay={80} className="mb-8 grid grid-cols-3 gap-3.5 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-card card-glow relative overflow-hidden rounded-lg border-t-2 border-t-accent/60 p-4 text-center"
              >
                <div className="font-display text-[2.25rem] leading-none text-accent drop-shadow-[0_2px_12px_rgba(216,31,38,0.4)]">
                  {stat.value}
                </div>
                <div className="mt-2 text-[12px] font-bold tracking-[0.5px] text-white">
                  {stat.label}
                </div>
                <div className="mt-0.5 text-[10px] text-muted hidden sm:block">
                  {stat.desc}
                </div>
              </div>
            ))}
          </Reveal>

          {/* Stack Principal */}
          <div className="mb-3.5 text-small font-bold tracking-[1.5px] text-muted-2">
            STACK PRINCIPAL
          </div>
          <div className="flex flex-wrap gap-2.5">
            {stack.map((item) => (
              <span
                key={item.name}
                className="glass-card card-glow group flex items-center gap-2 rounded-lg px-3.5 py-2 text-small font-semibold text-body-text transition-all duration-200 hover:border-accent/40 hover:text-white"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70 transition-transform duration-200 group-hover:scale-125 group-hover:bg-accent" />
                {item.name}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Foto pendurada por um fio de teia estilizado */}
        <Reveal delay={120} className="relative flex flex-col items-center justify-self-center">
          {/* Nó de fixação da teia no topo */}
          <div className="flex flex-col items-center">
            <WebIcon color="var(--color-accent)" opacity={0.9} />
            <div className="h-16 w-px bg-gradient-to-b from-accent via-thread to-accent/60 md:h-24 shadow-[0_0_6px_rgba(216,31,38,0.3)]" />
          </div>

          <div className="relative">
            <span
              className="absolute -inset-5 rounded-full border border-accent/30"
              aria-hidden="true"
              style={{ borderStyle: "dashed" }}
            />
            {/* Anel pulsante externo */}
            <span
              className="absolute -inset-8 rounded-full border border-accent/15"
              aria-hidden="true"
              style={{ animation: "pulse 3s ease-in-out infinite" }}
            />
            <div
              className="relative rounded-full border-[2px] border-accent bg-black p-1.5"
              style={{ width: 240, height: 240, boxShadow: "0 0 40px rgba(216,31,38,0.3), 0 10px 40px rgba(216,31,38,0.18)" }}
            >
              <img
                src="/A763CD68-C919-4FC6-80C7-A1B82713269E.jpg"
                alt="Iury Lima"
                width={240}
                height={240}
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <span
              className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-[0_4px_14px_rgba(216,31,38,0.6)]"
              aria-hidden="true"
            >
              &lt;/&gt;
            </span>

            {/* Sticker com tema aranha */}
            <img
              src="/preview.jpg"
              alt=""
              aria-hidden="true"
              width={104}
              height={104}
              loading="lazy"
              decoding="async"
              className="absolute -bottom-6 -left-8 h-[92px] w-[92px] rotate-[-10deg] rounded-xl border-[3px] border-white object-cover shadow-[0_8px_24px_rgba(0,0,0,0.7)] transition-transform duration-300 hover:-rotate-3 hover:scale-105 sm:h-[110px] sm:w-[110px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
