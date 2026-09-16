import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

const links = [
  { label: "SOBRE", href: "#about" },
  { label: "HABILIDADES", href: "#skills" },
  { label: "EXPERIÊNCIA", href: "#experience" },
  { label: "PROJETOS", href: "#projects" },
];

const sectionIds = [...links.map((l) => l.href.slice(1)), "contact"];

export default function Navbar() {
  const { active, scrolled } = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  // trava o scroll do body enquanto o menu mobile está aberto e escuta tecla Escape
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
      }}
    >
      <div className="wrap flex items-center justify-between py-4">
        <a
          href="#top"
          className="group flex items-center gap-2"
          aria-label="Iury Lima — Voltar ao início"
        >
          <span className="font-display text-[20px] tracking-[0.5px] text-white transition-colors duration-200 group-hover:text-accent">
            IURY LIMA<span className="text-accent">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className="group relative px-4 py-2 text-caption font-semibold tracking-[1.5px] transition-colors duration-200"
                style={{ color: isActive ? "#ffffff" : "#b8bcc7" }}
              >
                {link.label}
                {/* linha ativa com brilho suave */}
                <span
                  className="absolute inset-x-3 -bottom-0.5 h-[2px] origin-left bg-accent shadow-[0_0_8px_rgba(216,31,38,0.7)] transition-transform duration-300 ease-out"
                  style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                />
                {/* linha hover */}
                <span
                  className="absolute inset-x-3 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-accent/50 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ display: isActive ? "none" : undefined }}
                />
              </a>
            );
          })}

          {/* CTA principal */}
          <a
            href="#contact"
            className={`ml-4 rounded-md border px-4 py-2 text-caption font-bold tracking-[1.5px] transition-all duration-200 ${
              active === "contact"
                ? "border-accent bg-accent text-white shadow-[0_0_16px_rgba(216,31,38,0.4)]"
                : "border-accent/60 bg-accent/10 text-accent hover:border-accent hover:bg-accent hover:text-white hover:shadow-[0_0_14px_rgba(216,31,38,0.35)]"
            }`}
          >
            FALE COMIGO
          </a>
        </div>

        {/* Hambúrguer mobile com área de toque ergonômica */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="relative flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg border border-white/10 bg-white/[0.04] sm:hidden"
        >
          <span
            className="h-[2px] w-5 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }}
          />
          <span
            className="h-[2px] w-5 bg-white transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="h-[2px] w-5 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {/* Backdrop móvel ao abrir menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 -z-10 bg-black/70 backdrop-blur-sm sm:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out sm:hidden"
        style={{
          maxHeight: menuOpen ? 380 : 0,
          opacity: menuOpen ? 1 : 0,
          backgroundColor: "rgba(0,0,0,0.96)",
          backdropFilter: "blur(16px)",
          borderBottom: menuOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}
      >
        <div className="wrap flex flex-col gap-1 py-4">
          {links.map((link) => {
            const isItemActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex min-h-[44px] items-center gap-3 rounded-md px-2 py-3 text-sm font-semibold tracking-[1.5px] transition-colors duration-200 ${
                  isItemActive ? "text-white" : "text-muted hover:text-white"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full transition-all duration-200 ${
                    isItemActive ? "bg-accent shadow-[0_0_8px_rgba(216,31,38,0.8)]" : "bg-white/20"
                  }`}
                />
                {link.label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-lg border border-accent/60 bg-accent/15 px-4 py-3 text-caption font-bold tracking-[1.5px] text-white shadow-[0_2px_12px_rgba(216,31,38,0.25)] transition-all hover:bg-accent"
          >
            FALE COMIGO
          </a>
        </div>
      </div>
    </nav>
  );
}
