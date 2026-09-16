import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 420);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo da página"
      className={`group fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-black/80 text-white shadow-[0_4px_20px_rgba(216,31,38,0.28)] backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent hover:shadow-[0_6px_26px_rgba(216,31,38,0.55)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:bottom-8 sm:right-8 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
          : "pointer-events-none translate-y-4 opacity-0 scale-90"
      }`}
    >
      <ArrowUp
        size={18}
        className="text-white transition-transform duration-300 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
      {/* Tooltip sutil no desktop */}
      <span className="pointer-events-none absolute -top-9 right-0 hidden whitespace-nowrap rounded border border-white/10 bg-black/90 px-2.5 py-1 text-[11px] font-bold tracking-[1px] text-muted-2 opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 sm:block">
        TOPO
      </span>
    </button>
  );
}

