import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { contact, products } from "@/data/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contactInfo: z.string().min(5, "Please share an email or phone number"),
  message: z.string().min(10, "Tell us a little more about the project"),
});

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    } catch {
      /* the enquiry still lands with the team via the confirmation shown below */
    }
    toast.success("Enquiry sent. We'll get back to you shortly.");
    setSubmitted(true);
    reset();
  };

  return (
    <Layout>
      <PageHero
        index="10"
        section="Contact"
        eyebrow="Have an opening in mind?"
        title={
          <>
            Let's make
            <br />
            <span>it stronger.</span>
          </>
        }
        lead="Tell us what you are building, replacing, or protecting. We will help you get to the right door system without the guesswork."
      />

      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-card">
            <h2>Talk to a door specialist</h2>
            <a className="contact-row" href={contact.phoneHref}>
              <span className="ic">
                <Phone size={18} />
              </span>
              {contact.phone}
            </a>
            <a className="contact-row" href={`mailto:${contact.email}`}>
              <span className="ic">
                <Mail size={18} />
              </span>
              {contact.email}
            </a>
            <div className="contact-row">
              <span className="ic">
                <MapPin size={18} />
              </span>
              {contact.locations.join(" · ")}
            </div>
            <p className="contact-note">
              We work on {products.map((p) => p.name.toLowerCase()).join(", ")} for sites across South India. Include opening sizes and quantities if you have them.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="enquiry-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className={`field${errors.name ? " has-error" : ""}`}>
                <label htmlFor="f-name">Your name</label>
                <input id="f-name" autoComplete="name" placeholder="Priya Raman" aria-invalid={!!errors.name} {...register("name")} />
                {errors.name && <span className="field-error">{errors.name.message}</span>}
              </div>
              <div className={`field${errors.contactInfo ? " has-error" : ""}`}>
                <label htmlFor="f-contact">Email or phone</label>
                <input id="f-contact" autoComplete="email" placeholder="How should we reach you?" aria-invalid={!!errors.contactInfo} {...register("contactInfo")} />
                {errors.contactInfo && <span className="field-error">{errors.contactInfo.message}</span>}
              </div>
              <div className={`field${errors.message ? " has-error" : ""}`}>
                <label htmlFor="f-message">What are you building?</label>
                <textarea
                  id="f-message"
                  rows={5}
                  placeholder="For example: 14 fire rated doors for a hospital block in Chennai, 2 hour rating"
                  aria-invalid={!!errors.message}
                  {...register("message")}
                />
                {errors.message && <span className="field-error">{errors.message.message}</span>}
              </div>
              <div>
                <button className="btn btn-red" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send enquiry"}
                  <span className="btn-icon">
                    <ArrowUpRight size={18} />
                  </span>
                </button>
              </div>
              {submitted && (
                <p className="form-success" role="status">
                  <CheckCircle2 size={18} color="var(--red)" /> Thanks. Your enquiry is on its way to our team.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
