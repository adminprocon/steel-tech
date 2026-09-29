import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <section className="not-found">
        <div className="container">
          <p className="eyebrow">Error 404</p>
          <h1>
            4<span>0</span>4
          </h1>
          <p className="lead" style={{ margin: "32px 0" }}>
            This opening doesn't lead anywhere. The page may have moved, or the link may be out of date.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-red" href="/">
              Back to home
              <span className="btn-icon">
                <ArrowUpRight size={18} />
              </span>
            </Link>
            <Link className="btn btn-ghost" href="/products">
              View door systems
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
