import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { installationSteps } from "@/data/site";
import { RevealStagger, staggerItem } from "./Reveal";

/** Six installation steps on a rail that fills in red as the section scrolls past, lighting each step in turn. */
export default function ProcessRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const n = installationSteps.length;

  useMotionValueEvent(scrollYProgress, "change", (p) => setLit(Math.round(p * (n - 1)) + (p > 0.02 ? 1 : 0)));

  return (
    <div className="process" ref={ref}>
      <div className="process-line" aria-hidden="true">
        <motion.i style={{ scaleX: scrollYProgress }} />
      </div>
      <RevealStagger className="process-grid">
        {installationSteps.map((step, i) => (
          <motion.div variants={staggerItem} className={`process-step${i < lit ? " is-lit" : ""}`} key={step.no}>
            <div className="dot">{step.no}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </RevealStagger>
    </div>
  );
}
