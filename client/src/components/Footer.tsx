import { ArrowUp, ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "wouter";
import { contact, navItems, products } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <img src="/images/logo-transparent.png" alt="Steeltech Industries" className="footer-logo" loading="lazy" width={275} height={72} />
          <p>Fire rated, scientific, general purpose and fully glass steel doors, manufactured and installed across South India since 1995. A Royal Fab Group venture.</p>
          <Link className="btn btn-red btn-sm" href="/contact">
            Start a project
            <span className="btn-icon">
              <ArrowUpRight size={16} />
            </span>
          </Link>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Company</h4>
            {navItems
              .filter((i) => i.label !== "Products")
              .map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </div>
          <div>
            <h4>Door systems</h4>
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`}>
                {p.name}
              </Link>
            ))}
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            {contact.locations.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="footer-wordmark" aria-hidden="true">
        Steel<span>tech</span>
      </p>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Steeltech Industries</span>
        <span>Engineered access since 1995</span>
        <a href="#top">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
      <div className="container footer-credit">
        <span>
          Designed and developed by <b>stat6</b> · Aarupadaiyar KJ
        </span>
        <a href="https://www.instagram.com/theleveragegame/" target="_blank" rel="noopener noreferrer" aria-label="theleveragegame on Instagram (opens in a new tab)">
          <Instagram size={14} /> @theleveragegame
        </a>
      </div>
    </footer>
  );
}
