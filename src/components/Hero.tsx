import { Hand, MousePointerClick } from "lucide-react";
import { WebCorner } from "./WebSvg";
import HeroReveal from "./HeroReveal";

export default function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden pt-[88px]"
      style={{ minHeight: "100svh" }}
    >
      <WebCorner
        className="pointer-events-none absolute left-0 top-0 h-[220px] w-[220px] text-accent"
        style={{ opacity: 0.5 }}
        stroke="currentColor"
      />
      <WebCorner
        className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[260px] rotate-180 text-accent"
        style={{ opacity: 0.4 }}
        stroke="currentColor"
      />

      <div className="wrap grid grid-cols-1 items-center gap-16 py-16 md:grid-cols-[1fr_0.95fr] md:gap-10">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="inline-block h-2.5 w-2.5 bg-accent" />
            <span className="text-[15px] font-bold tracking-[2.5px] text-accent">
              Seu desenvolvedor de bairro favorito
            </span>
          </div>
          <h1 className="font-display text-display m-0 mb-7 uppercase text-accent" style={{ textShadow: "4px 4px 0 #1c1e24" }}>
            IURY LIMA
            <br />
          </h1>
          <p className="text-body m-0 mb-9 max-w-[480px] leading-[1.7] text-body-text">
            Analista de Sistemas na Linx Goiânia, conectando negócio,
            tecnologia e desenvolvimento para transformar processos em soluções eficientes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded bg-accent px-[26px] py-3.5 text-caption font-bold tracking-[1px] text-white transition-transform duration-200 hover:-translate-y-0.5"
              style={{ boxShadow: "0 4px 12px rgba(216,31,38,0.35)" }}
            >
              EXPLORE MEUS PROJETOS
              <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded border-2 border-white/30 bg-white/[0.06] px-[26px] py-3.5 text-caption font-bold tracking-[1px] text-white transition-colors duration-200 hover:border-accent hover:bg-accent/10"
            >
              ENTRE EM CONTATO
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] md:max-w-none">
          {/* moldura de retícula — os cantos dão um ar de HUD/painel de quadrinho ao reveal */}
          <span className="absolute -left-4 -top-4 h-7 w-7 border-l-2 border-t-2 border-accent/70" aria-hidden="true" />
          <span className="absolute -right-4 -top-4 h-7 w-7 border-r-2 border-t-2 border-accent/70" aria-hidden="true" />
          <span className="absolute -bottom-4 -left-4 h-7 w-7 border-b-2 border-l-2 border-accent/70" aria-hidden="true" />
          <span className="absolute -bottom-4 -right-4 h-7 w-7 border-b-2 border-r-2 border-accent/70" aria-hidden="true" />

          <HeroReveal
            maskSrc="/hero-mask.jpg"
            photoSrc="/hero-reveal.png"
            focalX={0.8}
            focalY={0.5}
            className="w-full bg-frame"
            style={{ aspectRatio: "4 / 5" }}
          />

          {/* dica presa à própria moldura, não flutuando embaixo — sempre lida como "sobre esta imagem" */}
          <div
            className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 py-2 pl-3 pr-4 backdrop-blur-sm"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
          >
            <MousePointerClick size={14} className="hidden text-accent sm:block" aria-hidden="true" />
            <Hand size={14} className="text-accent sm:hidden" aria-hidden="true" />
            <span className="font-display text-[12px] italic tracking-[0.5px] text-white">
              <span className="hidden sm:inline">Passe o mouse para revelar</span>
              <span className="sm:hidden">Toque e segure para revelar</span>
            </span>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Rolar até a seção Sobre"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted sm:flex"
      >
        <span className="text-[10px] font-bold tracking-[3px]">ROLAR</span>
        <span className="h-9 w-px animate-pulse bg-thread" />
      </a>
    </section>
  );
}
