import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import { MaskLines } from "@/components/motion";
import { SiteImage } from "@/components/SiteImage";
import CTASection from "@/components/CTASection";
import { productRange, products } from "@/data/site";
import { productIcons } from "@/lib/productIcons";

export default function ProductsHub() {
  return (
    <Layout>
      <PageHero
        index="02"
        section="Products"
        eyebrow="Four door systems, one manufacturer"
        title={
          <>
            Doors for the
            <br />
            <span>real world.</span>
          </>
        }
        lead="Every opening is different. Choose the system built for yours, from certified fire protection to light-filled fully glass steel doors."
      />

      <section className="section">
        <div className="container">
          <RevealStagger className="product-grid">
            {products.map((product) => {
              const Icon = productIcons[product.icon];
              return (
                <motion.div variants={staggerItem} key={product.slug}>
                  <Link href={`/products/${product.slug}`} className="product-card" aria-label={`View ${product.name}`}>
                    <div className="product-card-media">
                      <SiteImage src={product.image} alt={product.imageAlt} label={product.tag} icon={Icon} />
                      <span className="p-no">{product.no}</span>
                    </div>
                    <div className="product-card-body">
                      <span className="p-tag">{product.tag}</span>
                      <h3>{product.name}</h3>
                      <p>{product.short}</p>
                      <span className="p-cta">
                        View system
                        <span className="arrow">
                          <ArrowUpRight size={16} />
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <div>
              <Reveal>
                <p className="eyebrow">Full product range</p>
              </Reveal>
              <MaskLines as="h2" className="display-lg" lines={["Everything the", "opening needs."]} accent={[1]} delay={0} />
            </div>
            <Reveal delay={0.1}>
              <p className="body-copy">Beyond the four core systems, we manufacture the frames, ventilators, vision panels and specialist doors that complete a steel opening.</p>
            </Reveal>
          </div>
          <RevealStagger as="ul" className="range-list" stagger={0.04}>
            {productRange.map((item, i) => (
              <motion.li variants={staggerItem} key={item}>
                <i>{String(i + 1).padStart(2, "0")}</i>
                {item}
              </motion.li>
            ))}
          </RevealStagger>
        </div>
      </section>

      <CTASection
        eyebrow="Not sure which system fits?"
        title={
          <>
            We'll help
            <br />
            <span>you specify it.</span>
          </>
        }
        lead="Tell us about the opening and how it's used, and we'll recommend the right door category, rating, and finish."
      />
    </Layout>
  );
}
