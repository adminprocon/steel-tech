import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { SiteImage } from "@/components/SiteImage";
import CTASection from "@/components/CTASection";
import { accessories, hardwarePartners } from "@/data/site";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

export default function Accessories() {
  return (
    <Layout>
      <PageHero
        index="03"
        section="ACCESSORIES"
        eyebrow="Hardware that matches the door"
        title={
          <>
            Every fitting,
            <br />
            <span>certified to fit.</span>
          </>
        }
        lead="A door is only as strong as its hardware. We source and fit ironmongery from globally certified partners on every installation."
      >
        <div className="partner-row" style={{ marginTop: 34 }}>
          {hardwarePartners.map((partner) => (
            <span className="partner-chip" key={partner}>
              {partner}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section-pad" style={{ paddingBottom: 0 }}>
        <div className="section-index">
          02 <span>/ RANGE</span>
        </div>
        <RevealStagger className="simple-grid">
          {accessories.map((item) => (
            <motion.div variants={staggerItem} className="simple-card" key={item.name}>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </RevealStagger>
      </section>

      <section className="quality section-pad">
        <div className="quality-layout">
          <Reveal className="quality-image">
            <SiteImage src="/images/products/accessories.jpg" alt="Stainless steel door hardware and ironmongery" icon={Wrench} label="Hardware" />
          </Reveal>
          <Reveal delay={0.1} className="quality-copy" style={{ color: "#111315" }}>
            <p className="eyebrow">Sourced from certified partners</p>
            <p style={{ color: "#656a65" }}>
              We only specify hardware from manufacturers whose testing and certification hold up on rated assemblies: Dorma, Geze and Yale, so the door performs
              exactly as designed for the life of the installation.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection eyebrow="Fitting out a project?" title={<>Ask about<br /><span>hardware specs.</span></>} lead="We'll help you match closers, locks, and exit hardware to your door category and compliance requirements." />
    </Layout>
  );
}
