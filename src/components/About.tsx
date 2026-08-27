import WebSvg from "./WebSvg";
import Reveal from "./Reveal";

const stack = ["React", "TypeScript", "Express", "PostgreSQL", "Node.js", "REST APIs"];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden pt-16 pb-8 sm:pt-20 sm:pb-10">
      <WebSvg
        className="pointer-events-none absolute left-[-70px] top-[100px] h-80 w-80"
        style={{ opacity: 0.08 }}
      />

      <div className="wrap grid grid-cols-1 items-center gap-16 md:grid-cols-[1.25fr_0.75fr] md:gap-10">
        <Reveal>
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="inline-block h-2.5 w-2.5 bg-accent" />
            <span className="text-caption font-bold tracking-[2px] text-accent">
              Por trás da máscara
            </span>
          </div>
          <h2 className="font-display text-h1 m-0 mb-6 uppercase">
            IURY LIMA<span className="text-accent">.</span>
          </h2>
          <div className="max-w-[520px]">
            <p className="text-body m-0 mb-[18px] leading-[1.8] text-body-text">
              Sou Analista de Sistemas com experiência em ERP, integrações e desenvolvimento, conectando tecnologia às necessidades reais do negócio.
              Atuo com Linx Microvix, APIs, bancos de dados e soluções web, enquanto evoluo constantemente em engenharia de software e desenvolvimento Full Stack.
            </p>
            <p className="text-body m-0 mb-8 leading-[1.8] text-body-text">
              Transformo problemas em soluções.
            </p>
          </div>
          <div className="mb-3.5 text-small font-bold tracking-[1.5px] text-muted-2">
            STACK PRINCIPAL
          </div>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech) => (
              <span
                key={tech}
                className="rounded-[10px] border border-surface-border bg-surface px-[18px] py-[9px] text-small font-semibold text-body-text transition-colors duration-200 hover:border-accent/40"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>

        {/* foto pendurada por um fio, como um pingente — a moldura geométrica dá peso a ela */}
        <Reveal delay={120} className="relative flex flex-col items-center justify-self-center">
          <div className="h-16 w-px bg-thread md:h-24" />
          <div className="relative">
            <span
              className="absolute -inset-5 rounded-full border border-accent/25"
              aria-hidden="true"
              style={{ borderStyle: "dashed" }}
            />
            <div
              className="relative rounded-full border-[2px] border-accent bg-black p-1.5"
              style={{ width: 240, height: 240, boxShadow: "0 10px 40px rgba(216,31,38,0.18)" }}
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
              className="absolute -bottom-2 -right-2 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-bold text-white"
              style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.4)" }}
              aria-hidden="true"
            >
              &lt;/&gt;
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
