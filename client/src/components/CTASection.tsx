import { ArrowUpRight, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { contact } from "@/data/site";
import { Reveal } from "./Reveal";
import { Magnetic } from "./motion";

export default function CTASection({
  eyebrow = "Have an opening in mind?",
  title = (
    <>
      Let's make
      <br />
      <span>it stronger.</span>
    </>
  ),
  lead = "Tell us what you are building, replacing, or protecting. We will help you get to the right door system without the guesswork.",
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
}) {
  return (
    <section className="cta">
      <div className="container">
        <Reveal className="cta-card">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <div className="cta-bottom">
            <div>
              <p>{lead}</p>
              <div className="cta-contacts">
                <a href={contact.phoneHref}>
                  <Phone size={16} /> {contact.phone}
                </a>
                <a href={`mailto:${contact.email}`}>
                  <Mail size={16} /> {contact.email}
                </a>
              </div>
            </div>
            <Magnetic>
              <Link className="btn btn-red" href="/contact">
                Get a quote
                <span className="btn-icon">
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
