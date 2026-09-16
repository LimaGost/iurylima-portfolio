import { useEffect, useRef, useState } from "react";

/**
 * Rastreia qual das seções informadas está mais visível no momento, para
 * destacar o link ativo do menu, além de indicar se a página já passou de
 * um pequeno limite de scroll, para o estado translúcido/blur da navbar.
 *
 * O array `ids` é estabilizado via ref para evitar que um novo array literal
 * (criado a cada render pelo chamador) dispare re-observe desnecessário.
 */
export function useActiveSection(ids: string[], scrollThreshold = 24) {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  // Estabiliza referência: só atualiza se o conteúdo do array mudar
  const idsRef = useRef(ids);
  if (ids.join(",") !== idsRef.current.join(",")) idsRef.current = ids;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    const stableIds = idsRef.current;
    const sections = stableIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { active, scrolled };
}
