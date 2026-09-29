import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { SiteImage } from "@/components/SiteImage";
import StatStrip from "@/components/StatStrip";
import CTASection from "@/components/CTASection";
import { productRange, timeline } from "@/data/site";

export default function About() {
  return (
    <Layout>
      <PageHero
        index="01"
        section="THE COMPANY"
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

      <section className="section-pad">
        <div className="intro-layout" style={{ paddingTop: 0 }}>
          <Reveal className="intro-title">
            <p className="eyebrow">Who we are</p>
            <h2>
              From steel windows
              <br />
              <span>to certified fire doors.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="intro-body">
            <p className="lead">Steeltech Industries began in 1995 manufacturing flash butt welded steel windows, roof trusses, and building accessories to IS 1038 / IS 1361 standards.</p>
            <p>
              In 2005 we expanded into pressed steel flush doors, and over the following decade grew into a dedicated 2hrs. fire-rated door specialist, integrating global
              testing standards into local manufacturing. Today, as part of the Royal Fab Group, we supply and install 2hrs. fire-rated steel doors, scientific steel doors,
              general-purpose steel doors, lead line steel doors and fully glass steel door systems for commercial, institutional, and residential clients across South India.
            </p>
            <p className="eyebrow">Products</p>
            <ul className="feature-list product-range">
              {productRange.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <Link className="text-link" href="/quality">
              See our quality standards <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <StatStrip />
      </section>

      <section className="section-pad dark-section">
        <div className="section-index light">
          02 <span>/ TIMELINE</span>
        </div>
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow light">
              <span className="amber-dot" /> Three decades, one discipline
            </p>
            <h2>
              How we
              <br />
              <em>got here.</em>
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="timeline" style={{ margin: "0 8vw", borderTopColor: "#4b5151" }}>
          {timeline.map((item) => (
            <div className="timeline-row" key={item.year} style={{ borderBottomColor: "#4b5151" }}>
              <strong>{item.year}</strong>
              <div>
                <h3>{item.title}</h3>
                <p style={{ color: "#a9afab" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </RevealStagger>
      </section>

      <section className="quality section-pad">
        <div className="quality-layout">
          <Reveal className="quality-image">
            <SiteImage src="/images/hero_building.jpg" alt="Steeltech Industries facility" label="Chennai / Pondicherry" />
            <span style={{ color: "#111315" }}>CHENNAI · PONDICHERRY</span>
          </Reveal>
          <Reveal delay={0.1} className="quality-copy">
            <p className="eyebrow">Manufacturing, on our terms</p>
            <h2 style={{ color: "#111315" }}>
              Built in-house,
              <br />
              <span>installed by us.</span>
            </h2>
            <p style={{ color: "#656a65" }}>
              We control the process end to end, from steel fabrication and finishing through to on-site installation, so every door that leaves our facility carries the
              same standard of engineering.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection eyebrow="Want to know more?" title={<>Talk to<br /><span>our team.</span></>} lead="Whether it's a single residential door or a full commercial fit-out, we're happy to walk you through it." />
    </Layout>
  );
}
