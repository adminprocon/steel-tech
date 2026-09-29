import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Layers, Minimize2 } from "lucide-react";

/* Panel geometry, in the door's own plane, before the axonometric transform. */
const W = 150;
const H = 320;
const AXO = "matrix(0.866 0.5 0 1 212 96)"; // x-axis recedes to the lower right, y stays vertical
const SPREAD = 46; // px between layers when fully exploded
const DEPTH = { x: -0.866, y: 0.5 }; // the projected depth axis: front layers move to the lower left

const layers = [
  { name: "Pressed steel frame", note: "Welded frame fixed into the opening" },
  { name: "Rear steel skin", note: "Galvanised sheet, pressed and folded" },
  { name: "Fire resistant core", note: "Infill that holds integrity under heat" },
  { name: "Intumescent seal", note: "Expands under heat to block smoke" },
  { name: "Front skin, PU finish", note: "Acrylic aliphatic PU in RAL colours" },
  { name: "Fire rated vision panel", note: "Glazing rated with the leaf" },
  { name: "Certified hardware", note: "Dorma, Geze and Yale fittings" },
];

function LayerShape({ i }: { i: number }) {
  switch (i) {
    case 0:
      return <path d={`M-12 -12H${W + 12}V${H + 12}H-12Z M0 0V${H}H${W}V0Z`} fillRule="evenodd" className="an-frame" />;
    case 1:
      return <rect x="0" y="0" width={W} height={H} className="an-skin-rear" />;
    case 2:
      return <rect x="6" y="6" width={W - 12} height={H - 12} fill="url(#an-core)" className="an-core" />;
    case 3:
      return <rect x="2" y="2" width={W - 4} height={H - 4} className="an-seal" />;
    case 4:
      return <path d={`M0 0H${W}V${H}H0Z M44 38V132H106V38Z`} fillRule="evenodd" className="an-skin-front" />;
    case 5:
      return (
        <g className="an-glass">
          <rect x="44" y="38" width="62" height="94" />
          <path d="M54 60L80 44M56 84L96 60M70 118L104 98" />
        </g>
      );
    default:
      return (
        <g className="an-hw">
          <rect x="26" y="-2" width="70" height="10" rx="2" />
          <rect x="120" y="160" width="10" height="44" rx="3" />
          <path d="M125 172H100" strokeWidth="6" strokeLinecap="round" />
        </g>
      );
  }
}

function Layer({ i, explode, active, setActive }: { i: number; explode: MotionValue<number>; active: number | null; setActive: (i: number | null) => void }) {
  const k = i - (layers.length - 1) / 2;
  const x = useTransform(explode, (v) => k * SPREAD * v * DEPTH.x);
  const y = useTransform(explode, (v) => k * SPREAD * v * DEPTH.y);
  const markerOpacity = useTransform(explode, [0.35, 0.8], [0, 1]);
  const dim = active !== null && active !== i;
  return (
    <motion.g
      style={{ x, y }}
      animate={{ opacity: dim ? 0.18 : 1 }}
      transition={{ duration: 0.25 }}
      onPointerEnter={() => setActive(i)}
      onPointerLeave={() => setActive(null)}
      className={active === i ? "is-on" : undefined}
    >
      <g transform={AXO}>
        <LayerShape i={i} />
        <motion.g style={{ opacity: markerOpacity }}>
          <circle cx={W + 20} cy={-4} r="11" className="an-marker" />
          <text x={W + 20} y={0} textAnchor="middle" className="an-marker-text">
            {i + 1}
          </text>
        </motion.g>
      </g>
    </motion.g>
  );
}

/** Axonometric anatomy of a fire rated door. Layers separate as the card scrolls into view, can be toggled with a button,
 * and highlight from either the drawing or the legend. */
export default function DoorAnatomy() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [manual, setManual] = useState<number | null>(null);
  const explode = useSpring(0, { stiffness: 70, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "center 0.45"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (manual === null) explode.set(Math.min(1, Math.max(0, v)));
  });
  useEffect(() => {
    explode.set(manual ?? Math.min(1, Math.max(0, scrollYProgress.get())));
  }, [manual, explode, scrollYProgress]);

  const [isOpen, setIsOpen] = useState(false);
  useMotionValueEvent(explode, "change", (v) => setIsOpen(v > 0.5));

  return (
    <div className="anatomy" ref={ref}>
      <div className="anatomy-head">
        <span className="eyebrow plain">Fire door anatomy</span>
        <button className="anatomy-toggle" onClick={() => setManual(isOpen ? 0 : 1)} aria-pressed={isOpen}>
          {isOpen ? <Minimize2 size={14} /> : <Layers size={14} />}
          {isOpen ? "Assemble" : "Explode"}
        </button>
      </div>

      <svg className="anatomy-svg" viewBox="0 0 520 560" role="img" aria-label="Exploded axonometric drawing of a Steeltech fire rated steel door, showing seven layers">
        <defs>
          <pattern id="an-core" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="10" height="10" fill="#efe6d6" />
            <line x1="0" y1="0" x2="0" y2="10" stroke="#c8b48f" strokeWidth="3" />
          </pattern>
        </defs>
        {/* ground shadow */}
        <ellipse cx="290" cy="500" rx="170" ry="22" className="an-shadow" />
        {layers.map((_, i) => (
          <Layer key={i} i={i} explode={explode} active={active} setActive={setActive} />
        ))}
      </svg>

      <ol className="anatomy-legend">
        {layers.map((l, i) => (
          <li key={l.name}>
            <button
              className={active === i ? "on" : ""}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => {
                setActive(i);
                setManual(1);
              }}
              onBlur={() => setActive(null)}
              onClick={() => {
                setManual(1);
                setActive(active === i ? null : i);
              }}
            >
              <i>{String(i + 1).padStart(2, "0")}</i>
              <span>
                <b>{l.name}</b>
                <small>{l.note}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
