/**
 * Barra de progresso de scroll — linha fina vermelha no topo da viewport.
 *
 * Usa CSS `animation-timeline: scroll()` quando suportado (Chrome 115+).
 * O componente renderiza apenas o elemento; o CSS em index.css faz o trabalho.
 * Em navegadores sem suporte (Safari), a div fica com largura 0 e invisível —
 * graceful degradation sem JS extra.
 */
export default function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress pointer-events-none"
    />
  );
}
