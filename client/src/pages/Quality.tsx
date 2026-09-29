import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { MaskLines } from "@/components/motion";
import StatStrip from "@/components/StatStrip";
import CTASection from "@/components/CTASection";
import { benefits, certifications, certificationImages } from "@/data/site";

export default function Quality() {
  return (
    <Layout>
      <PageHero
        index="04"
        section="Quality"
        eyebrow="Not just supplied. Proven."
        title={
          <>
            Quietly
            <br />
            <span>uncompromising.</span>
          </>
        }
        lead="Protection is not a feature you add at the end. It is the material, the frame, the fit, and the finish, considered together and tested throughout."
      />

      <section className="section tight">
        <div className="container">
          <StatStrip className="no-top" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">Why steel wins</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["Eleven reasons", "it holds up."]} accent={[1]} delay={0} />
            </div>
          </div>
          <RevealStagger className="benefit-grid" stagger={0.05}>
            {benefits.map((benefit) => (
              <motion.div variants={staggerItem} className="benefit-item" key={benefit.no}>
                <i>{benefit.no}</i>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">Certified, tested, warrantied</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["Compliance", "built in."]} accent={[1]} delay={0} />
            </div>
          </div>
          <RevealStagger className="card-grid four">
            {certifications.map((cert, i) => (
              <motion.div variants={staggerItem} className="info-card" key={cert.title}>
                <span className="ic-no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{cert.title}</h3>
                <p>{cert.desc}</p>
              </motion.div>
            ))}
          </RevealStagger>
          <Reveal className="cert-row" style={{ marginTop: 48 }}>
            {certificationImages.map((img) => (
              <div className="cert-card" key={img.src}>
                <img src={img.src} alt={img.alt} loading="lazy" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Have a compliance question?"
        title={
          <>
            Ask about
            <br />
            <span>certification.</span>
          </>
        }
        lead="We can walk you through the ratings, standards, and warranty terms for any system in our range."
      />
    </Layout>
  );
}
