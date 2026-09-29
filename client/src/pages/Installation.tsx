import { ArrowRight, Factory } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { SiteImage } from "@/components/SiteImage";
import CTASection from "@/components/CTASection";
import { installationSteps } from "@/data/site";
import { motion } from "framer-motion";

export default function Installation() {
  return (
    <Layout>
      <PageHero
        index="05"
        section="INSTALLATION"
        eyebrow="Not just supplied. Installed right."
        title={
          <>
            From first measure
            <br />
            <span>to final lock.</span>
          </>
        }
        lead="Our team helps you choose the right specification, coordinate the opening, and finish the installation with the same care we put into the door itself."
      />

      <section className="quality section-pad">
        <div className="quality-layout">
          <Reveal className="quality-image">
            {/* Photo removed pending replacement image from Steeltech. */}
            <SiteImage alt="Steeltech installation" icon={Factory} label="Manufacturing" />
            <span style={{ color: "#111315" }}>MANUFACTURED IN-HOUSE / INSTALLED BY US</span>
          </Reveal>
          <Reveal delay={0.1} className="quality-copy">
            <p className="eyebrow">Site guidance, start to finish</p>
            <h2 style={{ color: "#111315" }}>
              Six steps,
              <br />
              <span>no guesswork.</span>
            </h2>
            <p style={{ color: "#656a65" }}>
              Every installation follows the same disciplined process, from the first site survey to a final quality handover, so the outcome is predictable regardless of
              project size.
            </p>
            <Link className="text-link" href="/clientele/our-approach">
              See our three service models <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad dark-section" style={{ paddingTop: 40 }}>
        <div className="section-index light">
          02 <span>/ THE PROCESS</span>
        </div>
        <RevealStagger className="step-grid" style={{ marginTop: 40 }}>
          {installationSteps.map((step) => (
            <motion.div variants={staggerItem} className="step-card" key={step.no}>
              <span>{step.no}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </RevealStagger>
      </section>

      <CTASection eyebrow="Ready to schedule a survey?" title={<>Book a<br /><span>site visit.</span></>} lead="Share your location and project scope, and we'll arrange a survey to get you an accurate specification." />
    </Layout>
  );
}
