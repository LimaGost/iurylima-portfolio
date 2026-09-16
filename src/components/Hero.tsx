import { Hand, MousePointerClick, MapPin, Code2, Sparkles } from "lucide-react";
import { WebCorner } from "./WebSvg";
import HeroReveal from "./HeroReveal";

export default function Hero() {
  return (
    <section
      className="relative flex items-center overflow-hidden pt-[88px]"
      style={{ minHeight: "100svh" }}
    >
      <div className="absolute inset-0">
        <HeroReveal
          maskSrc="/hero-reveal.mp4"
          photoSrc="/iury-photo.png"
          maskFocalX={0.62}
          maskFocalY={0.42}
          photoFocalX={0.5}
          photoFocalY={0.32}
          photoZoomOut={1.35}
          className="h-full w-full bg-frame"
        />
      </div>

      {/* gradiente para manter texto e navbar legíveis por cima do vídeo em tela cheia */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0) 92%), linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 24%)",
        }}
      />

      <WebCorner
        className="pointer-events-none absolute left-0 top-0 h-[220px] w-[220px] text-accent"
        style={{ opacity: 0.55 }}
        stroke="currentColor"
      />
      <WebCorner
        className="pointer-events-none absolute bottom-0 right-0 h-[260px] w-[260px] rotate-180 text-accent"
        style={{ opacity: 0.45 }}
        stroke="currentColor"
      />

      {/* pointer-events-none para deixar o hover do reveal passar pro canvas; o bloco de texto reativa pointer-events */}
      <div className="wrap pointer-events-none relative z-10 py-16">
        <div className="pointer-events-auto max-w-[580px]">
          {/* Badge temático de boas-vindas */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 shadow-[0_0_14px_rgba(216,31,38,0.25)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-xs font-bold tracking-[2px] text-accent uppercase">
              Seu desenvolvedor de bairro favorito
            </span>
          </div>

          <h1
            className="font-display text-display m-0 mb-4 uppercase text-white"
            style={{
              textShadow: "0 0 32px rgba(216,31,38,0.35), 3px 3px 0 #121316",
            }}
          >
            IURY LIMA<span className="text-accent"></span>
          </h1>

          {/* Quick Context Pills — leitura instantânea de contexto */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold tracking-[0.5px] text-muted backdrop-blur-sm">
              <MapPin size={12} className="text-accent" aria-hidden="true" />
              Goiânia, GO
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[11px] font-semibold tracking-[0.5px] text-muted backdrop-blur-sm">
              <Code2 size={12} className="text-accent" aria-hidden="true" />
              Full-Stack &amp; ERP Linx
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/[0.08] px-2.5 py-1 text-[11px] font-semibold tracking-[0.5px] text-body-text backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              Disponível
            </span>
          </div>

          <p className="text-body m-0 mb-8 max-w-[500px] leading-[1.8] text-body-text">
            Analista de Sistemas na Linx Goiânia, conectando negócio,
            tecnologia e desenvolvimento para transformar processos complexos em soluções eficientes.
          </p>

          {/* Ações principais com área de toque mínima de 48px para ergonomia */}
          <div className="flex flex-wrap gap-3.5">
            <a
              href="#projects"
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-lg bg-accent px-7 py-3.5 text-caption font-bold tracking-[1.5px] text-white shadow-[0_4px_16px_rgba(216,31,38,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#eb242c] hover:shadow-[0_6px_22px_rgba(216,31,38,0.6)]"
            >
              EXPLORE MEUS PROJETOS
              <span className="transition-transform duration-200 group-hover:translate-x-1">↗</span>
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-white/20 bg-white/[0.05] px-7 py-3.5 text-caption font-bold tracking-[1.5px] text-white backdrop-blur-sm transition-all duration-200 hover:border-accent hover:bg-accent/15 hover:text-white"
            >
              <Sparkles size={14} className="text-accent" aria-hidden="true" />
              FALE COMIGO
            </a>
          </div>
        </div>
      </div>

      {/* Dica de interação com visual HUD */}
      <div
        className="absolute bottom-8 right-6 z-10 flex items-center gap-2.5 rounded-full border border-white/15 bg-black/75 py-2.5 pl-3.5 pr-4.5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md sm:right-8"
      >
        <MousePointerClick size={15} className="hidden text-accent sm:block" aria-hidden="true" />
        <Hand size={15} className="text-accent sm:hidden" aria-hidden="true" />
        <span className="font-display text-[12px] italic tracking-[0.8px] text-white">
          <span className="hidden sm:inline">Passe o mouse para revelar a foto</span>
          <span className="sm:hidden">Toque na tela para revelar</span>
        </span>
      </div>

      <a
        href="#about"
        aria-label="Rolar até a seção Sobre"
        className="group absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors duration-200 hover:text-white sm:flex"
      >
        <span className="text-[10px] font-bold tracking-[3px]">ROLAR</span>
        <span className="h-9 w-px bg-gradient-to-b from-thread to-accent animate-pulse" />
      </a>
    </section>
  );
}
