import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

/** Headline lines that rise out of a mask, one after another. Pass `accent` indexes to colour a line red. */
export function MaskLines({ lines, accent = [], delay = 0.1, className = "", as = "h1", id }: { lines: string[]; accent?: number[]; delay?: number; className?: string; as?: "h1" | "h2"; id?: string }) {
  const Tag = as;
  // Observe the heading, not the lines: each line starts translated outside its overflow mask, so it never "intersects" by itself.
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Tag className={className} id={id} aria-label={lines.join(" ")} ref={ref}>
      {lines.map((line, i) => (
        <span className="mask-line" key={line} aria-hidden="true">
          <motion.span
            className={accent.includes(i) ? "accent" : undefined}
            initial={{ y: "110%" }}
            animate={inView ? { y: "0%" } : undefined}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function Word({ children, progress, range, red }: { children: string; progress: MotionValue<number>; range: [number, number]; red: boolean }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className={`word${red ? " red" : ""}`} style={{ opacity }}>
      {children}
    </motion.span>
  );
}

/** Large statement whose words brighten one by one, in reading order, as the block scrolls through the viewport. */
export function WordReveal({ text, redWords = [] }: { text: string; redWords?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} aria-label={text}>
      {words.map((word, i) => (
        <Word key={`${word}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} red={redWords.includes(word.replace(/[.,]/g, ""))}>
          {word}
        </Word>
      ))}
    </p>
  );
}

/** Animates the leading number in values like "30+", "2HR" or "360°" once the element is visible. */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const [display, setDisplay] = useState(match && !reduce ? 0 : target);

  useEffect(() => {
    if (!match || !inView || reduce) return;
    const controls = animate(0, target, { duration: 1.6, ease: EASE, onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {display}
      <em>{suffix}</em>
    </span>
  );
}

/** Wraps a control so it drifts toward the cursor on a spring, then settles back on leave. Pointer-fine devices only. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Subtle vertical parallax for imagery; returns a ref for the frame and a style for the inner image. */
export function useParallax(distance = 60) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  return { ref, style: { y, scale: 1.25 } };
}
