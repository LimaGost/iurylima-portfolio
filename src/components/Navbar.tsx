import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

const links = [
  { label: "SOBRE", href: "#about" },
  { label: "HABILIDADES", href: "#skills" },
  { label: "EXPERIÊNCIA", href: "#experience" },
  { label: "PROJETOS", href: "#projects" },
  { label: "CONTATO", href: "#contact" },
];

const sectionIds = links.map((l) => l.href.slice(1));

export default function Navbar() {
  const { active, scrolled } = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  // trava o scroll do body enquanto o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      }}
    >
      <div className="wrap flex items-center justify-between py-4">
        <a href="#top" className="font-display text-[19px] tracking-[0.5px] text-white">
          IURY LIMA<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className="group relative px-4 py-2 text-caption font-semibold tracking-[1.5px]"
                style={{ color: isActive ? "#fff" : "#cfd2d8" }}
              >
                {link.label}
                <span
                  className="absolute inset-x-4 -bottom-0.5 h-[2px] origin-left bg-accent transition-transform duration-300 ease-out"
                  style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                />
                <span
                  className="absolute inset-x-4 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-accent/50 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ display: isActive ? "none" : undefined }}
                />
              </a>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] sm:hidden"
        >
          <span
            className="h-[2px] w-6 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }}
          />
          <span
            className="h-[2px] w-6 bg-white transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="h-[2px] w-6 bg-white transition-transform duration-300"
            style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-out sm:hidden"
        style={{
          maxHeight: menuOpen ? 320 : 0,
          opacity: menuOpen ? 1 : 0,
          backgroundColor: "rgba(0,0,0,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}
      >
        <div className="wrap flex flex-col gap-1 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-sm font-semibold tracking-[1.5px]"
              style={{ color: active === link.href.slice(1) ? "#fff" : "#cfd2d8" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
