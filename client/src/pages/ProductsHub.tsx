import { MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { RevealStagger, staggerItem } from "@/components/Reveal";
import { SiteImage } from "@/components/SiteImage";
import CTASection from "@/components/CTASection";
import { products } from "@/data/site";
import { productIcons } from "@/lib/productIcons";
import { motion } from "framer-motion";

export default function ProductsHub() {
  return (
    <Layout>
      <PageHero
        index="02"
        section="SYSTEMS"
        eyebrow="Four product families, one manufacturer"
        title={
          <>
            Doors for the
            <br />
            <span>real world.</span>
          </>
        }
        lead="Every opening is different. Choose the system built for yours, from certified fire protection to light-filled fully glass steel doors."
      />

      <section className="products section-pad dark-section">
        <RevealStagger className="product-rail" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
          {products.map((product) => {
            const Icon = productIcons[product.icon];
            return (
              <motion.article variants={staggerItem} className="product-card" key={product.slug}>
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
      </section>

      <CTASection eyebrow="Not sure which system fits?" title={<>We'll help<br /><span>you specify it.</span></>} lead="Tell us about the opening and how it's used, and we'll recommend the right door category, rating, and finish." />
    </Layout>
  );
}
