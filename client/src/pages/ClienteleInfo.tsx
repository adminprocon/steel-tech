import type { ReactNode } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { qualityPolicy, serviceOfferings, assurance, certificationImages } from "@/data/site";
import NotFound from "./NotFound";

type Card = { title: string; desc: string };

const pages: Record<
  string,
  {
    index: string;
    section: string;
    eyebrow: string;
    title: ReactNode;
    lead: string;
    cards: readonly Card[];
    images?: readonly { src: string; alt: string }[];
  }
> = {
  certifications: {
    index: "07",
    section: "Certifications",
    eyebrow: "Standards we build to",
    title: (
      <>
        Certified,
        <br />
        <span>not just claimed.</span>
      </>
    ),
    lead: "Our quality management system follows ISO 9001:2008, and every fire-rated assembly is tested against recognised standards before it reaches a site.",
    cards: qualityPolicy.map((p) => ({ title: p.area, desc: p.desc })),
    images: certificationImages,
  },
  "our-approach": {
    index: "08",
    section: "Our approach",
    eyebrow: "How we take on a project",
    title: (
      <>
        Three ways
        <br />
        <span>we get involved.</span>
      </>
    ),
    lead: "Every project gets one of three levels of Steeltech involvement, chosen to match how your own team is set up.",
    cards: serviceOfferings,
  },
  assurance: {
    index: "09",
    section: "Assurance",
    eyebrow: "What we stand behind",
    title: (
      <>
        Backed after
        <br />
        <span>the handover.</span>
      </>
    ),
    lead: "A door is a long-term commitment. Here is what continues once the installation is complete.",
    cards: assurance,
  },
};

export default function ClienteleInfo() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? pages[slug] : undefined;

  if (!page) return <NotFound />;

  const columns = page.cards.length === 4 ? "card-grid two" : "card-grid";

  return (
    <Layout>
      <PageHero index={page.index} section={page.section} parent={{ label: "Clientele", href: "/clientele" }} eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <section className="section">
        <div className="container">
          <RevealStagger className={columns}>
            {page.cards.map((card, i) => (
              <motion.div variants={staggerItem} className="info-card" key={card.title}>
                <span className="ic-no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      {page.images && (
        <section className="section alt">
          <div className="container">
            <Reveal>
              <p className="eyebrow" style={{ display: "flex", justifyContent: "center" }}>
                Certificates on file
              </p>
            </Reveal>
            <Reveal className="cert-row">
              {page.images.map((img) => (
                <div className="cert-card" key={img.src}>
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <CTASection />
    </Layout>
  );
}
