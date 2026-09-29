import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { ClipReveal, Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { MaskLines, WordReveal } from "@/components/motion";
import StatStrip from "@/components/StatStrip";
import CTASection from "@/components/CTASection";
import { productRange, timeline } from "@/data/site";

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  return (
    <div className="timeline" ref={ref}>
      <div className="timeline-line" aria-hidden="true">
        <motion.i style={{ scaleY: scrollYProgress }} />
      </div>
      {timeline.map((item) => (
        <Reveal className="timeline-row" key={item.year}>
          <strong>{item.year}</strong>
          <div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <Layout>
      <PageHero
        index="01"
        section="About"
        eyebrow="Steeltech Industries / Since 1995"
        title={
          <>
            Three decades
            <br />
            <span>of considered steel.</span>
          </>
        }
        lead="A Royal Fab Group venture, built from a simple idea: an opening is only as good as the engineering behind it."
      />

      <section className="section">
        <div className="container">
          <div className="intro-grid">
            <div>
              <Reveal>
                <p className="eyebrow">Who we are</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["From steel windows", "to certified", "fire doors."]} accent={[2]} delay={0} />
            </div>
            <Reveal delay={0.1}>
              <p className="lead">Steeltech Industries began in 1995 manufacturing flash butt welded steel windows, roof trusses, and building accessories to IS 1038 / IS 1361 standards.</p>
              <p className="body-copy" style={{ margin: "24px 0 32px" }}>
                In 2005 we expanded into pressed steel flush doors, and over the following decade grew into a dedicated 2hrs. fire-rated door specialist, integrating global
                testing standards into local manufacturing. Today, as part of the Royal Fab Group, we supply and install 2hrs. fire-rated steel doors, scientific steel doors,
                general-purpose steel doors, lead line steel doors and fully glass steel door systems for commercial, institutional, and residential clients across South India.
              </p>
              <Link className="text-link" href="/quality">
                See our quality standards <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
          <StatStrip />
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">Products</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["What we", "manufacture."]} accent={[1]} delay={0} />
            </div>
            <Reveal delay={0.1}>
              <Link className="text-link" href="/products">
                Explore the door systems <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
          <RevealStagger as="ul" className="range-list" stagger={0.04}>
            {productRange.map((item, i) => (
              <motion.li variants={staggerItem} key={item}>
                <i>{String(i + 1).padStart(2, "0")}</i>
                {item}
              </motion.li>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">Three decades, one discipline</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["How we", "got here."]} accent={[1]} delay={0} />
            </div>
          </div>
          <Timeline />
        </div>
      </section>

      <section className="tagline" style={{ paddingTop: 0 }}>
        <div className="container">
          <WordReveal text="We control the process end to end, from steel fabrication and finishing to on site installation, so every door carries the same standard." redWords={["same", "standard"]} />
        </div>
      </section>

      <section className="section white">
        <div className="container split">
          <ClipReveal className="split-media">
            <img src="/images/factory/paintbooth.jpg" alt="Steeltech paint booth finishing a steel door leaf" loading="lazy" />
            <span className="media-tag">Paint booth / Finishing</span>
          </ClipReveal>
          <div className="split-copy">
            <Reveal>
              <p className="eyebrow">Manufacturing, on our terms</p>
            </Reveal>
            <MaskLines as="h2" className="display-md" lines={["Built in house,", "installed by us."]} accent={[1]} delay={0} />
            <Reveal delay={0.1}>
              <p className="body-copy">
                Cutting, pressing, welding, finishing and installation all stay with one team, so accountability never gets lost between a supplier and a contractor.
              </p>
              <Link className="btn" href="/installation">
                How we install
                <span className="btn-icon">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Want to know more?"
        title={
          <>
            Talk to
            <br />
            <span>our team.</span>
          </>
        }
        lead="Whether it's a single residential door or a full commercial fit-out, we're happy to walk you through it."
      />
    </Layout>
  );
}
