import { WebIcon } from "./WebSvg";

const strip1 = ["DESENVOLVIMENTO FULL STACK", "DESENVOLVIMENTO FRONTEND", "UI/UX DESIGN", "ARQUITETURA BACKEND"];
const strip2 = ["ANALISTA DE SISTEMAS", "CLEAN CODE", "API DESIGN", "INTEGRAÇÕES"];

function Strip({ items, color, iconColor, iconOpacity }: {
  items: string[];
  color: string;
  iconColor: string;
  iconOpacity: number;
}) {
  return (
    <div className="flex items-center gap-11 whitespace-nowrap pr-11">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-11">
          <span className="text-lg font-extrabold uppercase tracking-[1.5px]" style={{ color }}>
            {item}
          </span>
          <WebIcon color={iconColor} opacity={iconOpacity} />
        </span>
      ))}
    </div>
  );
}

/**
 * Faz a ponte entre Hero → About como uma faixa única e contida, em vez de
 * dois elementos com rotação/margem negativa independentes. O visual diagonal
 * vem do clip-path aplicado nos filhos, que ficam dentro de um pai com
 * `width: 100%` e `overflow: hidden` — então a forma nunca consegue empurrar
 * a página para scroll horizontal, seja qual for a largura da viewport.
 * Esse corte é decorativo e proposital, não um remendo pra esconder bug.
 */
export default function SectionTransition() {
  return (
    <div
      aria-hidden="true"
      className="relative isolate w-full overflow-hidden bg-page"
      style={{ height: "clamp(112px, 14vw, 176px)" }}
    >
      <div
        className="absolute inset-x-0 bg-accent"
        style={{
          top: "-18%",
          height: "72%",
          clipPath: "polygon(0 0, 100% 30%, 100% 100%, 0 70%)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        }}
      >
        <div
          className="flex h-full items-center"
          style={{
            animation: "marquee-left 26s linear infinite",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <Strip items={strip1} color="#fff" iconColor="#fff" iconOpacity={0.85} />
          <Strip items={strip1} color="#fff" iconColor="#fff" iconOpacity={0.85} />
        </div>
      </div>

      <div
        className="absolute inset-x-0 bg-dark"
        style={{
          bottom: "-18%",
          height: "58%",
          clipPath: "polygon(0 30%, 100% 0, 100% 70%, 0 100%)",
          borderTop: "2px solid var(--color-accent)",
          borderBottom: "2px solid var(--color-accent)",
        }}
      >
        <div
          className="flex h-full items-center"
          style={{
            animation: "marquee-right 26s linear infinite",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <Strip items={strip2} color="var(--color-accent)" iconColor="var(--color-accent)" iconOpacity={0.9} />
          <Strip items={strip2} color="var(--color-accent)" iconColor="var(--color-accent)" iconOpacity={0.9} />
        </div>
      </div>
    </div>
  );
}
