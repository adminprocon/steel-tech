import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Link, useLocation } from "wouter";
import { contact, navItems } from "@/data/site";

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const { scrollY } = useScroll();

  // Tuck the island away while reading downward; bring it back the moment the visitor scrolls up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 240 && y > prev && !open);
  });

  useEffect(() => {
    setOpen(false);
    setOpenDropdown(null);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? location === "/" : location === href || location.startsWith(`${href}/`));

  return (
    <>
      <header className={`site-header${hidden ? " is-hidden" : ""}`}>
        <div className="header-bar">
          <Link href="/" className="brand" aria-label="Steeltech Industries home">
            <img src="/images/logo-transparent.png" alt="Steeltech Industries" className="brand-logo" width={176} height={46} />
          </Link>

          <nav className="desktop-nav" aria-label="Primary">
            {navItems.map((item) =>
              item.children ? (
                <div className="nav-dropdown" key={item.label} onMouseEnter={() => setOpenDropdown(item.label)} onMouseLeave={() => setOpenDropdown(null)}>
                  <Link
                    href={item.href}
                    className={`nav-link${isActive(item.href) ? " is-active" : ""}`}
                    aria-expanded={openDropdown === item.label}
                    onFocus={() => setOpenDropdown(item.label)}
                  >
                    {item.label} <ChevronDown size={14} />
                  </Link>
                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        className="nav-panel"
                        initial={{ opacity: 0, scale: 0.96, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
                        transition={{ duration: 0.2, ease: EASE }}
                      >
                        {item.children.map((child, i) => (
                          <Link key={child.href} href={child.href} onBlur={i === item.children!.length - 1 ? () => setOpenDropdown(null) : undefined}>
                            <i>{String(i + 1).padStart(2, "0")}</i>
                            <b>{child.label}</b>
                            <span>{child.desc}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className={`nav-link${isActive(item.href) ? " is-active" : ""}`}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="header-actions">
            <Link className="btn btn-red btn-sm" href="/contact">
              Get a quote
              <span className="btn-icon">
                <ArrowUpRight size={16} />
              </span>
            </Link>
            <button className={`menu-button${open ? " is-open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} transition={{ duration: 0.35, ease: EASE }}>
            <nav aria-label="Mobile">
              {[{ label: "Home", href: "/" }, ...navItems].map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 + i * 0.05, ease: [0.32, 0.72, 0, 1] }}>
                  <Link href={item.href} className={`m-link${isActive(item.href) ? " is-active" : ""}`}>
                    {item.label}
                    <small>{String(i + 1).padStart(2, "0")}</small>
                  </Link>
                  {"children" in item && item.children && (
                    <div className="m-sub">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>
            <motion.div className="m-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <a href={contact.phoneHref}>{contact.phone}</a>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
