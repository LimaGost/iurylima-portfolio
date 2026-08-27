import type { CSSProperties } from "react";

interface WebSvgProps {
  className?: string;
  style?: CSSProperties;
  stroke?: string;
}

const SPOKES = 8;
const RINGS = [25, 55, 90];
const CENTER = 100;

function spokePoint(i: number, r: number) {
  const angle = (i / SPOKES) * Math.PI * 2;
  return { x: CENTER + Math.cos(angle) * r, y: CENTER + Math.sin(angle) * r };
}

/** Arco pendendo entre dois raios do mesmo anel — os fios de uma teia real
 *  curvam levemente para dentro pela própria tensão, diferente de um círculo perfeito. */
function ringPath(r: number) {
  let d = "";
  for (let i = 0; i <= SPOKES; i++) {
    const p = spokePoint(i, r);
    if (i === 0) {
      d += `M ${p.x} ${p.y}`;
    } else {
      const midAngle = ((i - 0.5) / SPOKES) * Math.PI * 2;
      const sag = r * 0.09;
      const cx = CENTER + Math.cos(midAngle) * (r - sag);
      const cy = CENTER + Math.sin(midAngle) * (r - sag);
      d += ` Q ${cx} ${cy} ${p.x} ${p.y}`;
    }
  }
  return d;
}

/* Teia decorativa: 8 fios radiais + 3 anéis pendentes, lida como uma teia de
 * aranha de verdade em vez de um radar geométrico. O traço padrão é quase
 * branco já que o site inteiro roda sobre fundo preto sólido. */
export default function WebSvg({ className = "", style, stroke = "#ffffff" }: WebSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" aria-hidden="true">
      <g stroke={stroke} fill="none" strokeWidth="1" strokeLinecap="round">
        {Array.from({ length: SPOKES }).map((_, i) => {
          const p = spokePoint(i, RINGS[RINGS.length - 1]);
          return <line key={i} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} />;
        })}
        {RINGS.map((r) => (
          <path key={r} d={ringPath(r)} />
        ))}
      </g>
    </svg>
  );
}

/* Teia ancorada no canto, com alguns fios soltos pendurados — para quando
 * o elemento fica colado na borda de uma moldura (cantos da retícula do Hero). */
export function WebCorner({ className = "", style, stroke = "#ffffff" }: WebSvgProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 160 160" aria-hidden="true">
      <g stroke={stroke} fill="none" strokeWidth="1.1" strokeLinecap="round">
        <path d="M0 0 Q 60 8 155 60" />
        <path d="M0 0 Q 45 30 110 130" />
        <path d="M0 0 L 155 60" opacity="0" />
        {[20, 45, 75, 110].map((r) => (
          <path
            key={r}
            d={`M ${r} 0 Q ${r * 0.75} ${r * 0.55} 0 ${r}`}
          />
        ))}
        <path d="M118 45 q -4 10 2 18" strokeWidth="0.9" opacity="0.7" />
        <path d="M92 96 q -3 9 3 16" strokeWidth="0.9" opacity="0.7" />
      </g>
    </svg>
  );
}

/* Ícone de teia 18×18 usado como separador no letreiro (marquee). */
export function WebIcon({ color = "#fff", opacity = 0.85 }: { color?: string; opacity?: number }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      style={{ opacity, flex: "none" }}
      aria-hidden="true"
    >
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  );
}
