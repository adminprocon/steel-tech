import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

/** Heavy fade-up with a short blur, triggered once as the element enters the viewport. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 40,
  style,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  style?: CSSProperties;
  as?: "div" | "section" | "article" | "li";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

export function RevealStagger({
  children,
  className = "",
  stagger = 0.07,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  style?: CSSProperties;
  as?: "div" | "ul";
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </Tag>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 32, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

/** Clip-path wipe for imagery: the frame opens from the bottom edge as it scrolls into view. */
export function ClipReveal({ children, className = "", delay = 0, style }: { children: ReactNode; className?: string; delay?: number; style?: CSSProperties }) {
  return (
    <motion.div
      className={`clip-reveal ${className}`}
      style={style}
      initial={{ clipPath: "inset(18% 8% 18% 8%)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, delay, ease: [0.77, 0, 0.175, 1] }}
    >
      {children}
    </motion.div>
  );
}
