import { useEffect, useRef } from "react";

/**
 * Cria um IntersectionObserver que muda data-reveal="in" uma única vez, na
 * primeira vez que o elemento entra na tela. O CSS (`[data-reveal]` no
 * index.css) é quem controla a transição de verdade e a desativa quando o
 * usuário prefere menos movimento.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      el.dataset.reveal = "in";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            io.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return ref;
}
