import { ArrowUpRight, Check } from "lucide-react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { ClipReveal, Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { SiteImage } from "@/components/SiteImage";
import CTASection from "@/components/CTASection";
import { products } from "@/data/site";
import { productIcons } from "@/lib/productIcons";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <NotFound />;

  const Icon = productIcons[product.icon];
  const siblings = products.filter((p) => p.slug !== product.slug);

  return (
    <Layout>
      <PageHero index={product.no} section={product.name} parent={{ label: "Products", href: "/products" }} eyebrow={product.tag} title={product.name} lead={product.intro} />

      <section className="section">
        <div className="container detail-grid">
          <ClipReveal className="detail-media">
            <SiteImage src={product.image} alt={product.imageAlt} label={product.tag} icon={Icon} loading="eager" />
          </ClipReveal>

          <div>
            <Reveal className="detail-block">
              <p className="eyebrow">Built in</p>
              <ul className="check-list">
                {product.features.map((feature) => (
                  <li key={feature}>
                    <Check size={18} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="detail-block" delay={0.05}>
              <p className="eyebrow">Where it's used</p>
              <div className="chip-row">
                {product.applications.map((app) => (
                  <span className="chip" key={app}>
                    {app}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal className="detail-block" delay={0.1}>
              <p className="eyebrow">Next step</p>
              <p className="body-copy" style={{ marginBottom: 24 }}>
                Share your opening sizes, quantities and site location, and we will come back with a specification and quote.
              </p>
              <Link className="btn btn-red" href="/contact">
                Enquire about this system
                <span className="btn-icon">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Explore the other systems</p>
          </Reveal>
          <RevealStagger className="sibling-grid">
            {siblings.map((sibling) => (
              <motion.div variants={staggerItem} key={sibling.slug}>
                <Link href={`/products/${sibling.slug}`} className="product-card">
                  <div className="product-card-media">
                    <SiteImage src={sibling.image} alt={sibling.imageAlt} label={sibling.tag} />
                    <span className="p-no">{sibling.no}</span>
                  </div>
                  <div className="product-card-body">
                    <span className="p-tag">{sibling.tag}</span>
                    <h3>{sibling.name}</h3>
                    <span className="p-cta">
                      View system
                      <span className="arrow">
                        <ArrowUpRight size={16} />
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </RevealStagger>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
