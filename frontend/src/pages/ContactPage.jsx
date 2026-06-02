import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: "",
  });
  const [status, setStatus] = useState("idle");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/inquiries", { ...form, inquiryType: "general" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <section className="hero contact-hero">
        <div className="shell">
          <div className="badge">GET IN TOUCH</div>

          <h1>
            Let's Discuss Your
            <br />
            <span>Packaging Requirements</span>
          </h1>

          <p>
            Whether you need custom boxes, labels, tags or carry bags, our team
            is ready to help with the right packaging solution.
          </p>
        </div>
      </section>

      <section className="categories">
        <div className="shell">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="card contact-info-card">
              <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>
                Business Details
              </h2>

              {[
                {
                  icon: "📍",
                  label: "Address",
                  value:
                    "1149, Saddique Nagar, Meerut Road, Ghaziabad U.P-201001",
                },
                {
                  icon: "📞",
                  label: "Phone",
                  value: "9811947407",
                  href: "tel:9811947407",
                },
                {
                  icon: "✉️",
                  label: "Email",
                  value: "pkenterprises0009@gmail.com",
                  href: "mailto:pkenterprises0009@gmail.com",
                },
                { icon: "👤", label: "Owner", value: "Mr. Kamal" },
              ].map((item) => (
                <div key={item.label} className="contact-detail">
                  <div className="contact-icon">{item.icon}</div>

                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <h4
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        letterSpacing: "1.2px",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.label}
                    </h4>

                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          margin: 0,
                          textDecoration: "none",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ margin: 0, lineHeight: 1.5 }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="card offer-card">
                <h3>What We Offer</h3>

                <p>Premium packaging solutions for businesses of all sizes.</p>

                <div className="offer-grid">
                  {[
                    "Custom Boxes",
                    "Product Labels",
                    "Paper Bags",
                    "Kraft Bags",
                    "Tags",
                    "Barcode Stickers",
                  ].map((item) => (
                    <div key={item} className="offer-item">
                      ✓ {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="card contact-form-card">
                <div className="smalll">REQUEST A QUOTE</div>

                <h2 style={{ marginTop: "10px", fontSize: "20px" }}>
                  Send Us Your Requirement
                </h2>

                <div className="p-6">
                  {status === "success" ? (
                    <div className="success-card">
                      <div className="text-5xl mb-4">✅</div>
                      <h3 className="font-serif text-xl font-bold text-ink mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted text-sm font-light">
                        We'll respond within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={submit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-s font-medium text-ink-light mb-1 block">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="name"
                            required
                            value={form.name}
                            onChange={handle}
                            placeholder="Your name"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label className="text-s font-medium text-ink-light mb-1 block">
                            Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="phone"
                            required
                            value={form.phone}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, ""); // only digits
                              if (val.length <= 10) {
                                setForm((prev) => ({ ...prev, phone: val }));
                              }
                            }}
                            maxLength={10}
                            inputMode="numeric"
                            placeholder="9XXXXXXXXX"
                            className="input-field"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-s font-medium text-ink-light mb-1 block">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handle}
                          placeholder="you@example.com"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="text-s font-medium text-ink-light mb-1 block">
                          Quantity / Requirement
                        </label>
                        <input
                          name="quantity"
                          value={form.quantity}
                          onChange={handle}
                          placeholder="e.g. 500 pieces, custom sizes..."
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="text-s font-medium text-ink-light mb-1 block">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={form.message}
                          onChange={handle}
                          placeholder="Describe your packaging requirements..."
                          className="input-field resize-none"
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-s text-red-500">
                          Something went wrong. Please try again or call us
                          directly.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="btn-primary contact-btn"
                      >
                        {status === "loading" ? "Sending..." : "Send Message →"}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
