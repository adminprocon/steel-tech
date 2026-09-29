import { ArrowUpRight, Check, Factory } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { ClipReveal, Reveal } from "@/components/Reveal";
import { MaskLines } from "@/components/motion";
import { SiteImage } from "@/components/SiteImage";
import ProcessRail from "@/components/ProcessRail";
import CTASection from "@/components/CTASection";

export default function Installation() {
  return (
    <Layout>
      <PageHero
        index="05"
        section="Installation"
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

      <section className="section">
        <div className="container split">
          <ClipReveal className="split-media">
            {/* Photo removed pending replacement image from Steeltech. */}
            <SiteImage alt="Steeltech installation" icon={Factory} label="Photo coming soon" />
          </ClipReveal>
          <div className="split-copy">
            <Reveal>
              <p className="eyebrow">Site guidance, start to finish</p>
            </Reveal>
            <MaskLines as="h2" className="display-md" lines={["Six steps,", "no guesswork."]} accent={[1]} delay={0} />
            <Reveal delay={0.1}>
              <p className="body-copy">
                Every installation follows the same disciplined process, from the first site survey to a final quality handover, so the outcome is predictable regardless of
                project size.
              </p>
              <ul className="check-list">
                <li>
                  <Check size={18} /> Site guidance from survey to handover
                </li>
                <li>
                  <Check size={18} /> Doors fabricated to exact opening sizes
                </li>
                <li>
                  <Check size={18} /> Installed by our own trained teams
                </li>
              </ul>
              <Link className="text-link" href="/clientele/our-approach">
                See our three service models <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">The process</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["Survey to", "handover."]} accent={[1]} delay={0} />
            </div>
          </div>
          <ProcessRail />
        </div>
      </section>

      <CTASection
        eyebrow="Ready to schedule a survey?"
        title={
          <>
            Book a
            <br />
            <span>site visit.</span>
          </>
        }
        lead="Share your location and project scope, and we'll arrange a survey to get you an accurate specification."
      />
    </Layout>
  );
}
