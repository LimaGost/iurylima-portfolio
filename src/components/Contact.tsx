import WebSvg from "./WebSvg";
import Reveal from "./Reveal";

const availability = [
  "Desenvolvimento Full-Stack",
  "Aplicações Web",
  "APIs e Integrações",
  "Soluções para processos de negócio",
  "Automação e evolução de sistemas",
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden pt-16 pb-28 sm:pt-20 sm:pb-32">
      <WebSvg
        className="pointer-events-none absolute bottom-[-90px] left-[-90px] h-[400px] w-[400px]"
        style={{ opacity: 0.08 }}
      />

      <div className="wrap relative grid grid-cols-1 gap-16 md:grid-cols-[1fr_1fr] md:gap-12">
        <Reveal>
          <div className="mb-[18px] flex items-center gap-2.5">
            <span className="inline-block h-2.5 w-2.5 bg-accent" />
            <span className="text-caption font-bold tracking-[2px] text-accent">
              ENTRE EM CONTATO
            </span>
          </div>
          <h2 className="font-display text-h1 m-0 mb-8 uppercase leading-[1.02]">
            VAMOS CONSTRUIR
            <br />
            ALGO <span className="text-accent">INCRÍVEL.</span>
          </h2>
          <div className="mb-2 text-small font-bold tracking-[1.5px] text-muted-2">
            DISPONÍVEL PARA
          </div>
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {availability.map((item) => (
              <li key={item} className="flex items-center gap-3 text-body text-body-text">
                <span className="h-1.5 w-1.5 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form className="grid grid-cols-1 gap-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-[11px] font-bold tracking-[1.5px] text-muted">
                Seu nome
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Peter Parker"
                autoComplete="name"
                className="w-full rounded border border-white/20 bg-white/[0.06] px-4 py-3.5 text-sm transition-colors duration-200 focus:border-accent/60"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-[11px] font-bold tracking-[1.5px] text-muted">
                Seu e-mail
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="peter@parker.com"
                autoComplete="email"
                className="w-full rounded border border-white/20 bg-white/[0.06] px-4 py-3.5 text-sm transition-colors duration-200 focus:border-accent/60"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-2 block text-[11px] font-bold tracking-[1.5px] text-muted">
                Mensagem
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Vamos construir algo incrível juntos..."
                rows={4}
                className="w-full resize-y rounded border border-white/20 bg-white/[0.06] px-4 py-3.5 font-sans text-sm transition-colors duration-200 focus:border-accent/60"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded bg-accent px-4 py-4 text-[13px] font-bold tracking-[1px] text-white transition-transform duration-200 hover:-translate-y-0.5"
            >
              Enviar Mensagem
              <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
