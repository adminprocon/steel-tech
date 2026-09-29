import { useRef, useState, type ReactNode } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { RevealStagger, staggerItem } from "@/components/Reveal";

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

/* ---------- Card shell: cursor spotlight + gentle spring tilt (fine pointers only) ---------- */
function BentoCard({ className = "", children, onHoverChange }: { className?: string; children: ReactNode; onHoverChange?: (h: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className={`bento-card ${className}`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      onPointerEnter={(e) => e.pointerType === "mouse" && onHoverChange?.(true)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ref.current.style.setProperty("--mx", `${px * 100}%`);
        ref.current.style.setProperty("--my", `${py * 100}%`);
        rx.set((0.5 - py) * 4);
        ry.set((px - 0.5) * 4);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
        onHoverChange?.(false);
      }}
    >
      <span className="b-spot" aria-hidden="true" />
      {children}
    </motion.div>
  );
}

/* ---------- A. Fire resistant: photo breaks out of the top, hover runs a 120 minute test dial ---------- */
function FireCard() {
  // Rests at the full 120 minute rating; hovering or tapping replays the test from zero.
  const [mins, setMins] = useState(120);
  const run = (v: boolean) => {
    if (!v) return;
    animate(0, 120, { duration: 1.8, ease: EASE, onUpdate: (m) => setMins(Math.round(m)) });
  };
  const C = 2 * Math.PI * 34;
  return (
    <BentoCard className="tall b-fire" onHoverChange={run}>
      <div className="b-fire-photo">
        <img src="/images/hero-doors/door-fire-exit-grey-crop.jpg" alt="Grey fire exit double steel doors with push bars" loading="lazy" />
      </div>
      <button className="b-dial" onClick={() => run(true)} aria-label="Replay the 120 minute fire test">
        <svg viewBox="0 0 80 80" aria-hidden="true">
          <circle cx="40" cy="40" r="34" className="track" />
          <circle cx="40" cy="40" r="34" className="fill" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - mins / 120) }} />
        </svg>
        <span>
          <b>{mins}</b>
          <small>min</small>
        </span>
      </button>
      <div className="b-body">
        <span className="b-no">04 / Fire resistant by material</span>
        <h3>Steel is the foundation of our certified range.</h3>
        <p>{mins < 120 ? `Test running: ${mins} of 120 minutes, integrity holding.` : "Stability and integrity held for the full 120 minutes. Tap the dial to replay."}</p>
      </div>
    </BentoCard>
  );
}

/* ---------- B. 2HR rating: overflowing standards seal, slider follows the ISO 834 furnace curve ---------- */
function RatingCard() {
  const [t, setT] = useState(60);
  const temp = Math.round(20 + 345 * Math.log10(8 * t + 1));
  return (
    <BentoCard className="wide red b-rating">
      <div className="b-seal" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <defs>
            <path id="seal-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text>
            <textPath href="#seal-path">IS 3614 PART II · BS 476 PART 20 & 22 · </textPath>
          </text>
        </svg>
        <b>2H</b>
      </div>
      <span className="b-no">Certified fire protection</span>
      <div className="b-rating-grid">
        <div className="b-big">2HR</div>
        <div className="b-sim">
          <label htmlFor="fire-t">Fire exposure</label>
          <div className="b-sim-read">
            <strong>{t} min</strong>
            <span>Furnace at {temp}°C</span>
          </div>
          <input id="fire-t" type="range" min={0} max={120} step={5} value={t} onChange={(e) => setT(Number(e.target.value))} style={{ ["--p" as string]: `${(t / 120) * 100}%` }} />
          <ul>
            <li className="ok">
              <Check size={14} /> Stability
            </li>
            <li className="ok">
              <Check size={14} /> Integrity
            </li>
            <li className="ok">
              <Check size={14} /> Smoke sealed
            </li>
          </ul>
        </div>
      </div>
      <p>Tested to IS 3614 Part II-1992 and BS 476 part 20 and 22, rated 60 to 120 minutes. Drag to follow the standard time temperature curve.</p>
    </BentoCard>
  );
}

/* ---------- C. Strength: I-beam breaks the corner, toggle compares steel with timber ---------- */
const compare = {
  strength: { label: "Impact strength", steel: 4, note: "4x stronger than timber" },
  warp: { label: "Warp resistance", steel: 7, note: "7x more warp resistant" },
};
function StrengthCard() {
  const [mode, setMode] = useState<keyof typeof compare>("strength");
  const c = compare[mode];
  return (
    <BentoCard className="b-strength">
      <svg className="b-beam" viewBox="0 0 120 60" aria-hidden="true">
        <path d="M4 6h112v10H68v28h48v10H4V44h48V16H4z" />
      </svg>
      <span className="b-no">01 / Strength</span>
      <div className="b-toggle" role="tablist" aria-label="Compare">
        {(Object.keys(compare) as (keyof typeof compare)[]).map((k) => (
          <button key={k} role="tab" aria-selected={mode === k} className={mode === k ? "on" : ""} onClick={() => setMode(k)}>
            {compare[k].label}
          </button>
        ))}
      </div>
      <div className="b-bars">
        <div>
          <span>Steel</span>
          <i>
            <motion.b animate={{ width: "100%" }} initial={{ width: 0 }} transition={{ duration: 0.8, ease: EASE }} />
          </i>
          <em>{c.steel}x</em>
        </div>
        <div>
          <span>Timber</span>
          <i>
            <motion.b className="timber" animate={{ width: `${100 / c.steel}%` }} transition={{ duration: 0.7, ease: EASE }} />
          </i>
          <em>1x</em>
        </div>
      </div>
      <h3>{c.note}</h3>
    </BentoCard>
  );
}

/* ---------- D. Termite: stamp overlaps the edge, switch contrasts upkeep ---------- */
function TermiteCard() {
  const [steel, setSteel] = useState(true);
  return (
    <BentoCard className="b-termite">
      <div className="b-stamp" aria-hidden="true">
        No chemical
        <br />
        treatment
      </div>
      <span className="b-no">02 / Termite & pest resistant</span>
      <div className="b-toggle" role="tablist" aria-label="Material">
        <button role="tab" aria-selected={steel} className={steel ? "on" : ""} onClick={() => setSteel(true)}>
          Steel door
        </button>
        <button role="tab" aria-selected={!steel} className={!steel ? "on" : ""} onClick={() => setSteel(false)}>
          Timber door
        </button>
      </div>
      <dl className="b-spec">
        <div>
          <dt>Termite and borer risk</dt>
          <dd className={steel ? "good" : "bad"}>{steel ? "None" : "High"}</dd>
        </div>
        <div>
          <dt>Chemical treatment</dt>
          <dd className={steel ? "good" : "bad"}>{steel ? "Never" : "Recurring"}</dd>
        </div>
      </dl>
      <p>Steel doors do not attract termites or borers, so no chemical treatment is ever required.</p>
    </BentoCard>
  );
}

/* ---------- E. Warranty: seal spins out past the corner, coverage list reveals on hover ---------- */
function WarrantyCard() {
  const [hover, setHover] = useState(false);
  const items = ["Material and workmanship", "Installation certified by our engineers", "Life time service support"];
  return (
    <BentoCard className="ink b-warranty" onHoverChange={setHover}>
      <div className={`b-roundel${hover ? " fast" : ""}`} aria-hidden="true">
        <svg viewBox="0 0 120 120">
          <defs>
            <path id="warranty-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
          </defs>
          <text>
            <textPath href="#warranty-path">1 YEAR WARRANTY · LIFE TIME SERVICE · </textPath>
          </text>
        </svg>
        <b>1Y</b>
      </div>
      <span className="b-no">09 / Assurance</span>
      <div>
        <h3>1 Year Warranty</h3>
        <ul className="b-cover">
          {items.map((it, i) => (
            <motion.li key={it} initial={false} animate={{ opacity: hover ? 1 : 0.55, x: hover ? 0 : -4 }} transition={{ duration: 0.4, delay: hover ? i * 0.06 : 0, ease: EASE }}>
              <Check size={14} /> {it}
            </motion.li>
          ))}
        </ul>
      </div>
    </BentoCard>
  );
}

/* ---------- F. Finish: door leaf stands out of the card, RAL swatches repaint it ---------- */
const ral = [
  { code: "RAL 3000", name: "Flame red", hex: "#AF2B1E" },
  { code: "RAL 5010", name: "Gentian blue", hex: "#0E4C92" },
  { code: "RAL 7035", name: "Light grey", hex: "#C5C7C4" },
  { code: "RAL 9016", name: "Traffic white", hex: "#F1F0EA" },
  { code: "RAL 6021", name: "Pale green", hex: "#89AC76" },
  { code: "RAL 7016", name: "Anthracite", hex: "#383E42" },
];
function FinishCard() {
  const [c, setC] = useState(ral[0]);
  return (
    <BentoCard className="b-finish">
      <svg className="b-door" viewBox="0 0 70 120" aria-hidden="true">
        <rect x="1" y="1" width="68" height="118" rx="2" className="frame" />
        <motion.rect x="7" y="7" width="56" height="112" rx="1" animate={{ fill: c.hex }} transition={{ duration: 0.5, ease: EASE }} />
        <rect x="22" y="18" width="26" height="30" rx="1" className="glass" />
        <rect x="50" y="62" width="4" height="16" rx="2" className="handle" />
      </svg>
      <span className="b-no">03 / 12x superior finish</span>
      <div>
        <h3>
          {c.code} <span className="muted">{c.name}</span>
        </h3>
        <div className="b-swatches" role="radiogroup" aria-label="RAL colour">
          {ral.map((r) => (
            <button key={r.code} role="radio" aria-checked={c.code === r.code} aria-label={`${r.code} ${r.name}`} className={c.code === r.code ? "on" : ""} style={{ background: r.hex }} onClick={() => setC(r)} />
          ))}
        </div>
        <p>Acrylic aliphatic PU paint in standard and custom RAL colours, holding its finish far longer than painted wood.</p>
      </div>
    </BentoCard>
  );
}

/* ---------- G. Designs: draggable style strip runs past the right edge ---------- */
type Variant = "flush" | "vision" | "square" | "louvre" | "double" | "panels" | "glass";
const styles: { v: Variant; name: string }[] = [
  { v: "vision", name: "Vision slot" },
  { v: "square", name: "Square vision" },
  { v: "louvre", name: "Louvred" },
  { v: "double", name: "Double leaf" },
  { v: "panels", name: "Moulded panel" },
  { v: "glass", name: "Fully glass" },
  { v: "flush", name: "Flush" },
];
function DoorGlyph({ v }: { v: Variant }) {
  return (
    <svg viewBox="0 0 60 100" aria-hidden="true">
      <rect x="1" y="1" width="58" height="98" rx="2" className="frame" />
      {v === "double" ? (
        <>
          <rect x="6" y="6" width="23.5" height="94" className="leaf" />
          <rect x="30.5" y="6" width="23.5" height="94" className="leaf" />
          <rect x="25" y="50" width="2" height="10" className="handle" />
          <rect x="33" y="50" width="2" height="10" className="handle" />
        </>
      ) : (
        <>
          <rect x="6" y="6" width="48" height="94" className={v === "glass" ? "glass" : "leaf"} />
          <rect x="46" y="50" width="3" height="12" className="handle" />
        </>
      )}
      {v === "vision" && <rect x="16" y="14" width="8" height="46" className="glass" />}
      {v === "square" && <rect x="18" y="14" width="24" height="24" className="glass" />}
      {v === "louvre" && [70, 76, 82, 88].map((y) => <rect key={y} x="14" y={y} width="32" height="2" className="line" />)}
      {v === "panels" && (
        <>
          <rect x="12" y="12" width="36" height="34" className="line-box" />
          <rect x="12" y="54" width="36" height="38" className="line-box" />
        </>
      )}
    </svg>
  );
}
function DesignCard() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const progress = useTransform(x, [0, -380], [0, 1]);
  return (
    <BentoCard className="b-designs">
      <span className="b-no">05 / 35+ design options</span>
      <div className="b-strip" ref={trackRef}>
        <motion.div className="b-strip-inner" drag="x" dragConstraints={{ left: -380, right: 0 }} dragElastic={0.12} style={{ x }}>
          {styles.map((s) => (
            <figure key={s.v}>
              <DoorGlyph v={s.v} />
              <figcaption>{s.name}</figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
      <div className="b-strip-bar" aria-hidden="true">
        <motion.i style={{ scaleX: progress }} />
      </div>
      <div>
        <h3>From flush panels to moulded profiles.</h3>
        <p>Drag the strip to browse a few of the 35+ leaf designs.</p>
      </div>
    </BentoCard>
  );
}

export default function Bento() {
  return (
    <RevealStagger className="bento">
      <FireCard />
      <RatingCard />
      <StrengthCard />
      <TermiteCard />
      <WarrantyCard />
      <FinishCard />
      <DesignCard />
    </RevealStagger>
  );
}
