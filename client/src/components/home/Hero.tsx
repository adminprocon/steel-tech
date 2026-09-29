import { useRef, useState, type KeyboardEvent } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { MaskLines, CountUp, Magnetic } from "@/components/motion";
import { InfiniteSlider } from "@/components/core/infinite-slider";
import { clients } from "@/data/site";

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];
const WIPE = [0.77, 0, 0.175, 1] as [number, number, number, number];
const CYCLE_MS = 6000;

const systems = [
  {
    slug: "fire-rated-doors",
    name: "Fire rated",
    img: "/images/products/fire-rated-doors.jpg",
    alt: "Red Steeltech fire rated double steel door installed in a corridor",
    thumb: "/images/hero-doors/door-fire-exit-red.jpg",
    spec: { label: "Fire rating", value: "120", unit: "min", note: "IS 3614 Part II and BS 476 part 20 and 22" },
  },
  {
    slug: "scientific-doors",
    name: "Scientific",
    img: "/images/products/scientific-doors.jpg",
    alt: "Stainless steel scientific double doors with vision panels",
    thumb: "/images/hero-doors/door-cleanroom-sliding.jpg",
    spec: { label: "Surface", value: "Seamless", unit: "", note: "Air tight gasketing for pressure controlled rooms" },
  },
  {
    slug: "general-purpose-doors",
    name: "General purpose",
    img: "/images/products/general-purpose-doors.jpg",
    alt: "Grey general purpose steel double door in a granite surround",
    thumb: "/images/hero-doors/door-double-blue.jpg",
    spec: { label: "Design options", value: "35", unit: "+", note: "Standard and custom sizes to fit any opening" },
  },
  {
    slug: "aluminium-glass-doors",
    name: "Fully glass",
    img: "/images/products/aluminium-glass-doors.jpg",
    alt: "Fully glass steel double doors at an office entrance",
    thumb: "/images/hero-doors/door-staffroom-granite.jpg",
    spec: { label: "Glazing", value: "Toughened", unit: "", note: "Toughened or laminated safety glass to IS standards" },
  },
];

/** Blueprint crosshair that tracks the cursor across the hero with a live coordinate readout. Fine pointers only. */
function Crosshair({ x, y, visible }: { x: MotionValue<number>; y: MotionValue<number>; visible: boolean }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const update = () => {
    if (labelRef.current) labelRef.current.textContent = `X ${String(Math.round(x.get())).padStart(4, "0")}  Y ${String(Math.round(y.get())).padStart(4, "0")}`;
  };
  useMotionValueEvent(x, "change", update);
  useMotionValueEvent(y, "change", update);
  return (
    <motion.div className="hc-cross" aria-hidden="true" animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.3 }}>
      <motion.i className="hc-cross-h" style={{ y }} />
      <motion.i className="hc-cross-v" style={{ x }} />
      <motion.span ref={labelRef} className="hc-cross-label" style={{ x, y }} />
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pointerIn, setPointerIn] = useState(false);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.3 });
  const progress = useMotionValue(0);
  const playing = !paused && inView && !reduce;

  // Autoplay advances through the systems; pauses on hover or focus, off screen, and under reduced motion.
  useAnimationFrame((_, delta) => {
    if (!playing) return;
    const next = progress.get() + delta / CYCLE_MS;
    if (next >= 1) {
      progress.set(0);
      setActive((a) => (a + 1) % systems.length);
    } else progress.set(next);
  });

  const select = (i: number) => {
    progress.set(0);
    setActive(i);
  };
  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : systems.length - 1)) % systems.length;
    select(next);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };

  // Cursor-driven depth: each layer drifts a different distance on a spring.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 120, damping: 20 });
  const smy = useSpring(my, { stiffness: 120, damping: 20 });
  const photoX = useTransform(smx, (v) => v * -10);
  const photoY = useTransform(smy, (v) => v * -10);
  const thumbX = useTransform(smx, (v) => v * 18);
  const thumbY = useTransform(smy, (v) => v * 18);
  const specX = useTransform(smx, (v) => v * 26);
  const specY = useTransform(smy, (v) => v * 26);

  const cx = useMotionValue(0);
  const cy = useMotionValue(0);

  const sys = systems[active];

  return (
    <section
      className="hero"
      aria-labelledby="hero-title"
      ref={sectionRef}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !sectionRef.current) return;
        const r = sectionRef.current.getBoundingClientRect();
        cx.set(e.clientX - r.left);
        cy.set(e.clientY - r.top);
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
        if (!pointerIn) setPointerIn(true);
      }}
      onPointerLeave={() => {
        setPointerIn(false);
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="hero-blueprint" />
      <Crosshair x={cx} y={cy} visible={pointerIn} />

      <div className="container hero-grid">
        <div className="hero-text">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            Steel door systems / Since 1995
          </motion.p>
          <MaskLines id="hero-title" className="hero-title" lines={["Built to", "hold the line."]} accent={[1]} />
          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            2 hour fire rated, scientific, general purpose and fully glass steel doors, manufactured in house and installed by our own teams across South India.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}>
            <Magnetic>
              <Link className="btn btn-red" href="/contact">
                Get a quote
                <span className="btn-icon">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Magnetic>
            <Link className="btn btn-ghost" href={`/products/${sys.slug}`}>
              Explore {sys.name.toLowerCase()} doors
            </Link>
          </motion.div>
          <motion.div className="hero-proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.75 }}>
            <div>
              <strong>
                <CountUp value="30+" />
              </strong>
              <span>Years in steel</span>
            </div>
            <div>
              <strong>
                <CountUp value="120" />
              </strong>
              <span>Minute fire rating</span>
            </div>
            <div>
              <strong>
                <CountUp value={`${clients.length}+`} />
              </strong>
              <span>Enterprise clients</span>
            </div>
          </motion.div>
        </div>

        <div
          className="hc"
          onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="hc-stage">
            <div className="hc-dim" aria-hidden="true">
              <span>Made to measure</span>
            </div>
            <motion.div
              className="hc-frame"
              style={{ x: photoX, y: photoY }}
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.4, delay: 0.15, ease: WIPE }}
            >
              {systems.map((s, i) => (
                <motion.figure
                  key={s.slug}
                  id={`hc-panel-${i}`}
                  role="tabpanel"
                  aria-hidden={i !== active}
                  style={{ zIndex: i === active ? 2 : 1 }}
                  initial={false}
                  animate={{ clipPath: i === active ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)", scale: i === active ? 1.04 : 1.14 }}
                  transition={{ clipPath: { duration: 0.9, ease: WIPE }, scale: { duration: 1.6, ease: EASE } }}
                >
                  <img src={s.img} alt={s.alt} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : undefined} />
                </motion.figure>
              ))}
              <span className="hc-caption">
                <b>0{active + 1}</b> {sys.name} steel doors
              </span>
            </motion.div>

            <motion.div className="hc-thumb" style={{ x: thumbX, y: thumbY }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.9, ease: EASE }}>
              <AnimatePresence initial={false}>
                <motion.img
                  key={sys.thumb}
                  src={sys.thumb}
                  alt=""
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </AnimatePresence>
            </motion.div>

            <motion.div className="spec-card" style={{ x: specX, y: specY }} initial={{ opacity: 0, y: -16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 1.1, ease: EASE }}>
              <div className="spec-top">
                <span>{sys.spec.label}</span>
                <span className="live">Certified</span>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={sys.slug}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)", transition: { duration: 0.15 } }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <strong>
                    {sys.spec.value}
                    {sys.spec.unit && <small>{sys.spec.unit}</small>}
                  </strong>
                  <p>{sys.spec.note}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          <div className="hc-tabs" role="tablist" aria-label="Door systems">
            {systems.map((s, i) => (
              <button
                key={s.slug}
                role="tab"
                aria-selected={i === active}
                aria-controls={`hc-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                className={i === active ? "on" : ""}
                onClick={() => select(i)}
                onKeyDown={onTabKey}
              >
                <i>0{i + 1}</i>
                <span>{s.name}</span>
                <em aria-hidden="true">{i === active ? <motion.b style={{ scaleX: reduce ? 1 : progress }} /> : null}</em>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-marquee">
        <span>Trusted on sites for</span>
        <InfiniteSlider gap={64} duration={40} durationOnHover={90} className="logo-strip">
          {clients.map((client) => (
            <img key={client.file} src={client.logo} alt={client.name} loading="lazy" />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
}
