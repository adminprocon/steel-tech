import { motion } from "framer-motion";
import { ArrowUpRight, DoorClosed, DoorOpen, Eye, Layers, Lock, RotateCw, type LucideIcon } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { ClipReveal, Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { MaskLines } from "@/components/motion";
import CTASection from "@/components/CTASection";
import { accessories, hardwarePartners } from "@/data/site";

const icons: Record<string, LucideIcon> = {
  "Door Closers": DoorClosed,
  "Panic & Exit Hardware": DoorOpen,
  "Locks & Cylinders": Lock,
  "Hinges & Pivots": RotateCw,
  "Vision Panels": Eye,
  "Seals & Thresholds": Layers,
};

export default function Accessories() {
  return (
    <Layout>
      <PageHero
        index="03"
        section="Accessories"
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
        <div className="partner-row">
          {hardwarePartners.map((partner) => (
            <span className="partner-chip" key={partner}>
              {partner}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="container">
          <RevealStagger className="card-grid">
            {accessories.map((item, i) => {
              const Icon = icons[item.name] ?? Layers;
              return (
                <motion.div variants={staggerItem} className="info-card" key={item.name}>
                  <span className="ic-icon">
                    <Icon size={22} />
                  </span>
                  <span className="ic-no">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </motion.div>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      <section className="section alt">
        <div className="container split">
          <ClipReveal className="split-media">
            <img src="/images/products/accessories.jpg" alt="Stainless steel door hardware and ironmongery" loading="lazy" style={{ objectFit: "contain", background: "#fff" }} />
          </ClipReveal>
          <div className="split-copy">
            <Reveal>
              <p className="eyebrow">Sourced from certified partners</p>
            </Reveal>
            <MaskLines as="h2" className="display-md" lines={["Hardware that", "holds its rating."]} accent={[1]} delay={0} />
            <Reveal delay={0.1}>
              <p className="body-copy">
                We only specify hardware from manufacturers whose testing and certification hold up on rated assemblies: Dorma, Geze and Yale, so the door performs exactly as
                designed for the life of the installation.
              </p>
              <Link className="btn" href="/contact">
                Ask about hardware specs
                <span className="btn-icon">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Fitting out a project?"
        title={
          <>
            Ask about
            <br />
            <span>hardware specs.</span>
          </>
        }
        lead="We'll help you match closers, locks, and exit hardware to your door category and compliance requirements."
      />
    </Layout>
  );
}
