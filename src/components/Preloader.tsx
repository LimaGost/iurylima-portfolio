import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const rings = [18, 34, 50, 66, 82, 98];
const spokes = 12;
const center = 100;

const spokePoints = Array.from({ length: spokes }, (_, i) => {
  const angle = (i / spokes) * Math.PI * 2;
  return {
    x: center + Math.cos(angle) * 98,
    y: center + Math.sin(angle) * 98,
  };
});

const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { delay, duration: 0.5, ease: "easeInOut" as const },
  }),
};

interface PreloaderProps {
  onFinish: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    const total = spokes * 0.04 + rings.length * 0.15 + 1.1;
    const t = setTimeout(() => setDone(true), total * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!done && (
        <motion.div
          role="status"
          aria-label="Carregando"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-spider-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-40 h-40 sm:w-56 sm:h-56 text-spider-red"
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
          >
            {spokePoints.map((p, i) => (
              <motion.line
                key={`spoke-${i}`}
                x1={center}
                y1={center}
                x2={p.x}
                y2={p.y}
                variants={lineDraw}
                initial="hidden"
                animate="visible"
                custom={i * 0.04}
              />
            ))}
            {rings.map((r, ri) => (
              <motion.polygon
                key={`ring-${ri}`}
                points={spokePoints
                  .map((p) => {
                    const scale = r / 98;
                    const x = center + (p.x - center) * scale;
                    const y = center + (p.y - center) * scale;
                    return `${x},${y}`;
                  })
                  .join(" ")}
                variants={lineDraw}
                initial="hidden"
                animate="visible"
                custom={0.5 + ri * 0.15}
              />
            ))}
          </svg>
          <motion.p
            className="mt-6 font-display text-spider-red text-sm tracking-[0.4em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            CARREGANDO
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
