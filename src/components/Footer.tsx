import { GithubIcon, LinkedinIcon, MailIcon } from "./SocialIcons";

const socialLinks = [
  { label: "GITHUB", href: "https://github.com/LimaGost", icon: GithubIcon },
  { label: "LINKEDIN", href: "https://linkedin.com", icon: LinkedinIcon },
  { label: "EMAIL", href: "mailto:iuryslima_001@outlook.com", icon: MailIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-dark">
      {/* Linha vermelha no topo com gradiente sutil */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />

      <div className="wrap py-10 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Branding */}
          <div>
            <a href="#top" className="font-display text-[22px] tracking-[0.5px] text-white hover:text-accent transition-colors">
              IURY LIMA<span className="text-accent">.</span>
            </a>
            <div className="mt-1 text-[11px] font-semibold tracking-[1px] text-muted">
              DESENVOLVEDOR FULL-STACK &amp; ANALISTA DE SISTEMAS
            </div>
          </div>

          {/* Disponibilidade com radar pulsante */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </span>
            <span className="text-[12px] font-semibold tracking-[0.5px] text-white">
              Disponível para novos projetos
            </span>
          </div>

          {/* Redes sociais com boa área de toque */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={`Visitar meu perfil no ${label}`}
                className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-muted transition-all duration-200 hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_0_14px_rgba(216,31,38,0.4)]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="m-0 text-[12px] text-muted">
            © {year} Iury Lima. Feito com React, TypeScript, Tailwind CSS &amp; WebGL.
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 text-[12px] font-semibold tracking-[1px] text-muted transition-colors duration-200 hover:text-accent"
          >
            VOLTAR AO TOPO
            <span className="transition-transform duration-200 group-hover:-translate-y-1">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
