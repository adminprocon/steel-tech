/* Design philosophy: Light Industrial Precision. Proof-first hierarchy, warm paper surfaces, the logo's red as the only signal colour,
   and scroll-earned motion: mask-rising headlines, a pinned systems stage, word-lit tagline, and a rail that fills as you read. */
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { ClipReveal, Reveal } from "@/components/Reveal";
import { MaskLines, WordReveal, useParallax } from "@/components/motion";
import StatStrip from "@/components/StatStrip";
import CTASection from "@/components/CTASection";
import ProcessRail from "@/components/ProcessRail";
import ProductShowcase from "@/components/home/ProductShowcase";
import Hero from "@/components/home/Hero";
import IndustryList from "@/components/home/IndustryList";
import Bento from "@/components/home/Bento";
import { certifications, hardwarePartners } from "@/data/site";

export default function Home() {
  const quality = useParallax(50);

  return (
    <Layout>
      <Hero />

      <section className="section" id="about">
        <div className="container">
          <div className="intro-grid">
            <div>
              <Reveal>
                <p className="eyebrow">The company</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["Strength is a", "design decision."]} accent={[1]} delay={0} />
            </div>
            <Reveal delay={0.1}>
              <p className="lead">We manufacture and install steel door systems for homes, businesses, and critical environments across South India.</p>
              <p className="body-copy" style={{ marginTop: 24 }}>
                From fire-rated assemblies and scientific doors to fully glass steel doors and general-purpose access, Steeltech brings dependable materials and considered
                detailing to every opening.
              </p>
              <Link className="text-link" href="/about">
                Meet the people behind the product <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
          <StatStrip />
        </div>
      </section>

      <ProductShowcase />

      <section className="tagline">
        <div className="container">
          <WordReveal text="Every opening is a promise. We build steel doors that keep it, through fire, weather and decades of daily use." redWords={["promise", "keep"]} />
          <Reveal className="tagline-meta">
            <span>Steeltech Industries / Chennai</span>
            <span>A Royal Fab Group venture</span>
          </Reveal>
        </div>
      </section>

      <section className="section alt" id="performance">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">Why steel</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["Quietly", "uncompromising."]} accent={[1]} delay={0} />
            </div>
            <Reveal delay={0.1}>
              <p className="body-copy">Protection is not a feature you add at the end. It is the material, the frame, the fit, and the finish, all considered together.</p>
            </Reveal>
          </div>

          <Bento />
          <Reveal style={{ marginTop: 40 }}>
            <Link className="text-link" href="/quality">
              All eleven reasons steel holds up <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" id="applications">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">Where our doors work</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["One door.", "Many stakes."]} accent={[1]} delay={0} />
            </div>
            <Reveal delay={0.1}>
              <p className="body-copy">From a hospital corridor to a server room, the right opening gives people confidence before they ever touch the handle.</p>
            </Reveal>
          </div>
          <IndustryList />
        </div>
      </section>

      <section className="section white" id="process">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">Supply and installation</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["Six steps.", "No guesswork."]} accent={[1]} delay={0} />
            </div>
            <Reveal delay={0.1}>
              <p className="body-copy">Every installation follows the same disciplined process, from the first site survey to a final quality handover.</p>
              <div style={{ marginTop: 24 }}>
                <Link className="text-link" href="/installation">
                  How we install <ArrowUpRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
          <ProcessRail />
        </div>
      </section>

      <section className="section" id="quality">
        <div className="container split">
          <ClipReveal className="split-media">
            <div ref={quality.ref} style={{ height: "100%" }}>
              <motion.img src="/images/factory/pressbrake.jpg" alt="Steeltech technician operating a CNC press brake" loading="lazy" style={quality.style} />
            </div>
            <span className="media-tag">Made in house / Chennai</span>
          </ClipReveal>
          <div className="split-copy">
            <Reveal>
              <p className="eyebrow">Quality you can specify</p>
            </Reveal>
            <MaskLines as="h2" className="display-md" lines={["Certified,", "not just claimed."]} accent={[1]} delay={0} />
            <Reveal delay={0.1}>
              <p className="body-copy">Our quality system follows ISO 9001:2008, fire doors are independently tested, and hardware comes only from partners whose certification holds on rated assemblies.</p>
              <ul className="check-list">
                {certifications.map((c) => (
                  <li key={c.title}>
                    <Check size={18} />
                    <span>
                      <b>{c.title}.</b> {c.desc}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="partner-row">
                {hardwarePartners.map((p) => (
                  <span className="partner-chip" key={p}>
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
