import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutUsPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="shell" style={{ textAlign: "center" }}>
          <span className="badge" style={{ marginTop: 60 }}>
            ABOUT US
          </span>

          <h1 style={{ fontSize: 60, marginTop: 20 }}>
            Built for <span>Packaging Excellence</span>
          </h1>

          <p style={{ maxWidth: 700, margin: "20px auto", color: "#6f7d92" }}>
            PK Enterprises is a packaging manufacturer focused on delivering
            durable, custom-designed solutions for brands across India.
          </p>
        </div>
      </section>

      {/* Content */}
      <section
        className="shell"
        style={{
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingBottom: "40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: 32, color: "#0f274a" }}>Who We Are</h2>
            <p style={{ color: "#6f7d92", lineHeight: 1.8 }}>
              We specialize in custom boxes, labels, tags, and carry bags. Our
              focus is on quality manufacturing, consistent supply, and scalable
              packaging solutions for businesses of all sizes.
            </p>

            <div
              style={{
                marginTop: 20,
                padding: 20,
                background: "#edf8f7",
                borderRadius: 16,
                border: "1px solid rgba(15,138,120,0.12)",
              }}
            >
              <strong style={{ color: "#0f274a" }}>Our Mission</strong>
              <p style={{ color: "#6f7d92", marginTop: 8 }}>
                To simplify packaging procurement with reliable quality and
                transparent pricing.
              </p>
            </div>
          </div>

          <div
            style={{
              background: "#edf8f7",
              borderRadius: 20,
              padding: 30,
              border: "1px solid rgba(15,138,120,0.12)",
            }}
          >
            <h3 style={{ color: "#0f274a", marginBottom: 20 }}>
              What We Deliver
            </h3>

            {[
              "Custom Boxes",
              "Rigid Packaging",
              "Product Labels",
              "Barcode Stickers",
              "Paper & Kraft Bags",
              "Garment Tags",
            ].map((item) => (
              <div
                key={item}
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                  color: "#0f274a",
                  fontSize: 14,
                }}
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
