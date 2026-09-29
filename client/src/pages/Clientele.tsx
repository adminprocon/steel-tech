import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { MaskLines } from "@/components/motion";
import CTASection from "@/components/CTASection";
import DomeGallery from "@/components/ui/DomeGallery";
import { clients, hardwarePartners, serviceGeography } from "@/data/site";

const trustLinks = [
  { href: "/clientele/certifications", title: "Certifications", desc: "ISO 9001:2008 and our quality policy" },
  { href: "/clientele/our-approach", title: "Our approach", desc: "How we take on a project" },
  { href: "/clientele/assurance", title: "Assurance", desc: "Warranty and after sales support" },
];

export default function Clientele() {
  const galleryImages = clients.map((c) => ({ src: c.logo, alt: c.name }));

  return (
    <Layout>
      <PageHero
        index="06"
        section="Clientele"
        eyebrow="Trusted across sectors"
        title={
          <>
            Proven on
            <br />
            <span>real projects.</span>
          </>
        }
        lead="From national infrastructure to regional hospitals, our door systems are specified where reliability isn't optional. Drag the dome to explore who we've worked with."
      />

      <section className="section">
        <div className="container">
          <Reveal className="client-dome">
            <DomeGallery images={galleryImages} grayscale={false} segments={30} fit={0.55} overlayBlurColor="#ffffff" />
          </Reveal>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">{clients.length} organisations and counting</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["Every client,", "at a glance."]} accent={[1]} delay={0} />
            </div>
            <Reveal delay={0.1}>
              <p className="body-copy">Hospitals, automotive plants, research institutions, utilities and developers who rely on Steeltech openings every day.</p>
            </Reveal>
          </div>
          <RevealStagger className="logo-wall" stagger={0.02}>
            {clients.map((c) => (
              <motion.div variants={staggerItem} key={c.file}>
                <img src={c.logo} alt={c.name} loading="lazy" />
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ display: "flex", justifyContent: "center" }}>
              Service geography
            </p>
            <div className="geo-row">
              {serviceGeography.map((city) => (
                <span className="geo-chip" key={city}>
                  {city}
                </span>
              ))}
            </div>
          </Reveal>

          <RevealStagger className="card-grid" style={{ marginTop: 64 }}>
            {trustLinks.map((l) => (
              <motion.div variants={staggerItem} key={l.href}>
                <Link href={l.href} className="info-card link-card">
                  <h3>{l.title}</h3>
                  <p>{l.desc}</p>
                  <span className="arrow" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </RevealStagger>

          <Reveal style={{ marginTop: 64, textAlign: "center" }}>
            <p className="eyebrow">Hardware sourced from</p>
            <div className="partner-row" style={{ justifyContent: "center" }}>
              {hardwarePartners.map((partner) => (
                <span className="partner-chip" key={partner}>
                  {partner}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Want to see how we work?"
        title={
          <>
            Become our
            <br />
            <span>next reference.</span>
          </>
        }
        lead="Tell us about your project and we will show you how we have handled similar work before."
      />
    </Layout>
  );
}
