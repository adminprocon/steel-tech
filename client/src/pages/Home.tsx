/* Design philosophy: Rugged Industrial Editorial. Asymmetric layouts, proof-first copy, charcoal steel surfaces, safety amber signals, and motion that feels engineered. */
import { lazy, Suspense, useState } from "react";
import { Link } from "wouter";
import { ArrowDownRight, ArrowRight, Check, MoveUpRight, ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import HeroDoorSlider from "@/components/HeroDoorSlider";
import { InfiniteSlider } from "@/components/core/infinite-slider";
import Scene3DBoundary from "@/components/Scene3DBoundary";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { SiteImage } from "@/components/SiteImage";
import StatStrip from "@/components/StatStrip";
import CTASection from "@/components/CTASection";
import { products, benefits, clients, hardwarePartners } from "@/data/site";
import { productIcons } from "@/lib/productIcons";
import { motion } from "framer-motion";

const DoorScene3D = lazy(() => import("@/components/DoorScene3D"));

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);
  const featured = products.slice(0, 3);
  const topBenefits = benefits.slice(0, 4);

  return (
    <Layout>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grain" />
        <div className="hero-image" />
        <div className="hero-grid" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}>
          <div className="eyebrow light">
            <span className="amber-dot" /> ACCESS SYSTEMS / 1995-2026
          </div>
          <h1 id="hero-title">
            Built to
            <br />
            <em>hold the line.</em>
          </h1>
          <p className="hero-copy">Steel doors engineered for the places that cannot afford to compromise on protection, performance, or permanence.</p>
          <div className="hero-actions">
            <Link className="button button-amber" href="/products">
              Explore systems <ArrowDownRight size={18} />
            </Link>
            <Link className="text-link light" href="/contact">
              Tell us what you need <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
        <HeroDoorSlider />
        <div className="hero-bottom">
          <span>STEELTECH INDUSTRIES</span>
          <span>CHENNAI · PONDICHERRY</span>
          <span>01 / 05</span>
        </div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-index">
          01 <span>/ THE COMPANY</span>
        </div>
        <div className="intro-layout">
          <div className="intro-title">
            <Reveal>
              <p className="eyebrow">Steeltech Industries / Since 1995</p>
              <h2>
                Strength is a
                <br />
                <span>design decision.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="intro-body">
            <p className="lead">We manufacture and install steel door systems for homes, businesses, and critical environments across South India.</p>
            <p>From fire-rated assemblies and scientific doors to fully glass steel doors and general-purpose access, Steeltech brings dependable materials and considered detailing to every opening.</p>
            <Link className="text-link" href="/about">
              Meet the people behind the product <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
        <StatStrip />
      </section>

      <section className="products section-pad dark-section" id="products">
        <div className="section-index light">
          02 <span>/ SYSTEMS</span>
        </div>
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow light">
              <span className="amber-dot" /> Choose your line of defence
            </p>
            <h2>
              Doors for the
              <br />
              <em>real world.</em>
            </h2>
          </div>
          <p className="heading-aside">Four product families, one manufacturer. Every system is built around the way your space actually works.</p>
        </Reveal>
        <RevealStagger className="product-rail">
          {featured.map((product, index) => {
            const Icon = productIcons[product.icon];
            return (
              <motion.article
                variants={staggerItem}
                className={`product-card ${activeProduct === index ? "active" : ""}`}
                key={product.slug}
                onMouseEnter={() => setActiveProduct(index)}
              >
                <div className="product-image">
                  <SiteImage src={product.image} alt={product.imageAlt} label={product.tag} icon={Icon} />
                  <span className="product-number">{product.no}</span>
                </div>
                <div className="product-info">
                  <p className="eyebrow light">{product.tag}</p>
                  <h3>{product.name}</h3>
                  <p>{product.short}</p>
                  <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
                    View system <MoveUpRight size={17} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </RevealStagger>
        <div className="product-footer">
          <span>SELECT A SYSTEM TO SEE THE DIFFERENCE</span>
          <div className="progress">
            <i style={{ width: `${((activeProduct + 1) / featured.length) * 100}%` }} />
          </div>
          <Link href="/products" className="text-link light">
            All 4 systems <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="performance section-pad" id="performance">
        <div className="section-index">
          03 <span>/ PERFORMANCE</span>
        </div>
        <div className="performance-layout">
          <Reveal className="performance-sticky">
            <p className="eyebrow">Why steel / the advantage</p>
            <h2>
              Quietly
              <br />
              <span>uncompromising.</span>
            </h2>
            <p>Protection is not a feature you add at the end. It is the material, the frame, the fit, and the finish, all considered together.</p>
            <Link className="button button-dark" href="/quality">
              See how we prove it <ArrowRight size={17} />
            </Link>
          </Reveal>
          <RevealStagger className="benefit-list">
            {topBenefits.map((benefit) => (
              <motion.div variants={staggerItem} className="benefit" key={benefit.no}>
                <span className="benefit-no">{benefit.no}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </div>
                <Check size={19} />
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <section className="application-split" id="applications">
        <div className="application-image">
          <Scene3DBoundary>
            <Suspense fallback={null}>
              <DoorScene3D />
            </Suspense>
          </Scene3DBoundary>
        </div>
        <div className="application-copy">
          <div className="section-index light">
            04 <span>/ APPLICATIONS</span>
          </div>
          <Reveal>
            <p className="eyebrow light">
              <span className="amber-dot" /> Made for the moments that matter
            </p>
            <h2>
              One door.
              <br />
              <em>Many stakes.</em>
            </h2>
            <p>From a family home to a high-traffic facility, the right opening gives people confidence before they ever touch the handle.</p>
            <div className="application-links">
              <Link href="/products/general-purpose-doors">
                Residential <ArrowRight size={17} />
              </Link>
              <Link href="/products/aluminium-glass-doors">
                Commercial <ArrowRight size={17} />
              </Link>
              <Link href="/products/scientific-doors">
                Institutional <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="quality section-pad dark-section" id="quality">
        <div className="section-index light">
          05 <span>/ QUALITY + INSTALLATION</span>
        </div>
        <div className="quality-layout">
          <Reveal className="quality-image">
            <SiteImage src="/images/factory/pressbrake.jpg" alt="Steeltech technician operating a CNC press brake" icon={ShieldCheck} label="Manufacturing" />
            <span>PRECISION FABRICATION / QUALITY CONTROLLED</span>
          </Reveal>
          <Reveal delay={0.1} className="quality-copy">
            <p className="eyebrow light">Not just supplied. Installed right.</p>
            <h2>
              From first
              <br />
              <em>measure to final lock.</em>
            </h2>
            <p>Our team helps you choose the right specification, coordinate the opening, and finish the installation with the same care we put into the door itself.</p>
            <div className="mini-points">
              <span>
                <ShieldCheck size={20} /> Site guidance
              </span>
              <span>
                <ShieldCheck size={20} /> Custom sizes
              </span>
              <span>
                <ShieldCheck size={20} /> Installation support
              </span>
            </div>
            <Link className="text-link light" href="/installation">
              See how we work <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 90, paddingBottom: 90 }}>
        <Reveal>
          <p className="eyebrow" style={{ textAlign: "center" }}>
            Trusted by
          </p>
          <InfiniteSlider gap={56} duration={32} durationOnHover={70} className="logo-strip">
            {clients.map((client) => (
              <img key={client.file} src={client.logo} alt={client.name} loading="lazy" className="logo-strip-img" />
            ))}
          </InfiniteSlider>
          <Link href="/clientele" className="text-link" style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            See the full client list <ArrowRight size={16} />
          </Link>
          <p className="eyebrow" style={{ textAlign: "center", marginTop: 40 }}>
            Hardware partners: {hardwarePartners.join(" · ")}
          </p>
        </Reveal>
      </section>

      <CTASection />
    </Layout>
  );
}
