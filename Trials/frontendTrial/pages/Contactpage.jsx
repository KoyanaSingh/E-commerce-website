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
      <div className="bg-ink py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] tracking-[2px] uppercase text-gold font-semibold block mb-2">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl font-bold text-white">
            Contact Us
          </h1>
          <p className="text-white/40 text-sm font-light mt-2 max-w-md">
            Reach out for quotes, samples, custom orders or any packaging
            requirements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink mb-8">
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
              <div key={item.label} className="flex gap-4 mb-6">
                <div className="w-10 h-10 bg-cream-dark rounded-md flex items-center justify-center text-lg flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-muted mb-0.5">
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-ink-light text-sm font-medium hover:text-gold transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-ink-light text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-ink rounded-xl p-6 mt-8">
              <h3 className="font-serif text-lg font-bold text-white mb-1">
                What we offer
              </h3>
              <p className="text-white/40 text-xs font-light mb-4">
                Custom packaging for every business
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Custom Boxes",
                  "Rigid Boxes",
                  "Product Labels",
                  "Barcode Stickers",
                  "Hang Tags",
                  "Garment Tags",
                  "Paper Bags",
                  "Kraft Bags",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-white/55 text-xs"
                  >
                    <span className="text-gold">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="bg-white rounded-xl border border-gold/15 overflow-hidden shadow-sm">
              <div className="bg-ink px-6 py-5">
                <p className="text-[10px] tracking-[2px] uppercase text-gold font-semibold">
                  Send a Message
                </p>
                <h2 className="font-serif text-xl text-white font-bold mt-0.5">
                  Request a Quote
                </h2>
              </div>

              <div className="p-6">
                {status === "success" ? (
                  <div className="text-center py-10">
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
                        <label className="text-xs font-medium text-ink-light mb-1 block">
                          Name *
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
                        <label className="text-xs font-medium text-ink-light mb-1 block">
                          Phone
                        </label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handle}
                          placeholder="9XXXXXXXXX"
                          className="input-field"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-ink-light mb-1 block">
                        Email *
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
                      <label className="text-xs font-medium text-ink-light mb-1 block">
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
                      <label className="text-xs font-medium text-ink-light mb-1 block">
                        Message *
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
                      <p className="text-xs text-red-500">
                        Something went wrong. Please try again or call us
                        directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full btn-primary py-3 text-center disabled:opacity-60"
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

      <Footer />
    </>
  );
}
