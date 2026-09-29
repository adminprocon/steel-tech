import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

export default function PageHero({
  index,
  section,
  eyebrow,
  title,
  lead,
  parent,
  children,
}: {
  index: string;
  section: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  parent?: { label: string; href: string };
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="hero-blueprint" />
      <span className="page-hero-index" aria-hidden="true">
        {index}
      </span>
      <div className="container">
        <motion.nav className="crumbs" aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Link href="/">Home</Link>
          <span>/</span>
          {parent && (
            <>
              <Link href={parent.href}>{parent.label}</Link>
              <span>/</span>
            </>
          )}
          <b>{section}</b>
        </motion.nav>
        <div className="page-hero-grid">
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              {eyebrow}
            </motion.p>
            <motion.h1
              initial={{ clipPath: "inset(0% 0% 100% 0%)", y: 40 }}
              animate={{ clipPath: "inset(0% 0% -10% 0%)", y: 0 }}
              transition={{ duration: 1.1, delay: 0.08, ease: EASE }}
            >
              {title}
            </motion.h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.3, ease: EASE }}>
            {lead && <p className="lead">{lead}</p>}
            {children && <div className="page-hero-extra">{children}</div>}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
