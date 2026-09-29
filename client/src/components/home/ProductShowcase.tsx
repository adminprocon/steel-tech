import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "wouter";
import { products } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number];
const WIPE = [0.77, 0, 0.175, 1] as [number, number, number, number];

function ProgressBar({ progress, index, count }: { progress: MotionValue<number>; index: number; count: number }) {
  const scaleX = useTransform(progress, [index / count, (index + 1) / count], [0, 1]);
  return (
    <span>
      <motion.i style={{ scaleX }} />
    </span>
  );
}

/** Desktop: a pinned stage where scrolling steps through each door system and wipes its photo in from below.
 * Below 900px it collapses to a plain card stack, since pinned scroll stages fight touch scrolling. */
export default function ProductShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = products.length;
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(p * count))));
  });

  const jumpTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / count), behavior: "smooth" });
  };

  const product = products[active];

  return (
    <section className="showcase" id="systems" aria-label="Door systems">
      <div className="showcase-track" ref={trackRef} style={{ height: `${count * 100}vh` }}>
        <div className="showcase-sticky">
          <div className="container showcase-grid">
            <div>
              <p className="eyebrow">Door systems / 0{active + 1} of 0{count}</p>
              <ul className="showcase-list">
                {products.map((p, i) => (
                  <li key={p.slug} className={i === active ? "is-active" : ""}>
                    <button onClick={() => jumpTo(i)} aria-current={i === active}>
                      <i>{p.no}</i>
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="showcase-detail">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.18 } }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <p>{product.short}</p>
                    <ul>
                      {product.features.slice(0, 3).map((f) => (
                        <li key={f}>
                          <Check size={16} /> {f}
                        </li>
                      ))}
                    </ul>
                    <Link className="btn btn-sm" href={`/products/${product.slug}`}>
                      Explore {product.name}
                      <span className="btn-icon">
                        <ArrowUpRight size={16} />
                      </span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="showcase-progress" aria-hidden="true">
                {products.map((p, i) => (
                  <ProgressBar key={p.slug} progress={scrollYProgress} index={i} count={count} />
                ))}
              </div>
            </div>

            <div className="showcase-media">
              {products.map((p, i) => (
                <motion.figure
                  key={p.slug}
                  style={{ zIndex: i }}
                  initial={false}
                  animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
                  transition={{ duration: 1, ease: WIPE }}
                >
                  <motion.img
                    src={p.image}
                    alt={p.imageAlt}
                    loading="lazy"
                    initial={false}
                    animate={{ scale: i === active ? 1 : 1.12 }}
                    transition={{ duration: 1.4, ease: EASE }}
                  />
                  <figcaption>
                    <span className="accent">{p.no}</span> {p.tag}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container section showcase-mobile">
        <p className="eyebrow">Door systems</p>
        {products.map((p) => (
          <Reveal key={p.slug}>
            <Link href={`/products/${p.slug}`} className="product-card">
              <div className="product-card-media">
                <img src={p.image} alt={p.imageAlt} loading="lazy" />
                <span className="p-no">{p.no}</span>
              </div>
              <div className="product-card-body">
                <span className="p-tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <p>{p.short}</p>
                <span className="p-cta">
                  View system
                  <span className="arrow">
                    <ArrowUpRight size={16} />
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
