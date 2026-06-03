import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function WhyUsPage() {
  return (
    <div className="why-us-page">
      <Navbar />

      {/* Hero */}
      <section className="hero hero1">
        <div className="shell" style={{ textAlign: "center" }}>
          <span className="badge" style={{ marginTop: 60 }}>
            WHY CHOOSE US
          </span>

          <h1 style={{ fontSize: 60, marginTop: 20 }}>
            Why Brands Choose <span>PK Enterprises</span>
          </h1>

          <p style={{ maxWidth: 700, margin: "20px auto", color: "#6f7d92" }}>
            We focus on consistency, material quality, and scalable production
            for long-term business partnerships.
          </p>
        </div>
      </section>

      {/* Reasons */}
      <section
        className="shell"
        style={{
          paddingBottom: "40px",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <div className="shell2">
          {[
            {
              title: "Manufacturing Strength",
              desc: "Reliable production capacity for bulk orders without delays.",
            },
            {
              title: "Custom Design Support",
              desc: "Tailored packaging based on brand and product requirements.",
            },
            {
              title: "Quality Control",
              desc: "Strict inspection process ensures consistent output quality.",
            },
            {
              title: "Competitive Pricing",
              desc: "Optimized costs for wholesale and recurring clients.",
            },
            {
              title: "Pan-India Supply",
              desc: "Fast dispatch and logistics across India.",
            },
            {
              title: "Business Focused",
              desc: "Designed specifically for B2B packaging needs.",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: "#edf8f7",
                padding: 24,
                borderRadius: 18,
                border: "1px solid rgba(15,138,120,0.12)",
                textAlign: "center",
              }}
            >
              <h3
                style={{ color: "#0f274a", marginBottom: 10, fontSize: "20px" }}
              >
                {item.title}
              </h3>
              <p style={{ color: "#6f7d92", fontSize: 14, lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: 50,
            textAlign: "center",
            background: "#d1ece8",
            padding: 40,
            borderRadius: 20,
            color: "black",
            border: "1px solid #0f8a78",
          }}
        >
          <h2 style={{ marginBottom: 10, fontSize: "25px" }}>
            Need Custom Packaging?
          </h2>
          <p style={{ opacity: 0.7, marginBottom: 20 }}>
            Get a quote tailored to your requirements.
          </p>

          <a
            href="/contact-us"
            style={{
              background: "#0f8a78",
              color: "white",
              padding: "12px 24px",
              borderRadius: 12,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Get Quote →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
