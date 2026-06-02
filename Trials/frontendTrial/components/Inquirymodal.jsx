import { useState } from "react";
import api from "../utils/api";

export default function InquiryModal({
  onClose,
  productId,
  categoryId,
  inquiryType = "general",
  productName = "",
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/inquiries", {
        ...form,
        inquiryType,
        productId: productId || undefined,
        categoryId: categoryId || undefined,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-ink px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[2px] uppercase text-gold font-semibold">
              Send Inquiry
            </p>
            <h2 className="font-serif text-lg text-white font-bold mt-0.5">
              {productName || "Get a Quote"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-serif text-xl font-bold text-ink mb-2">
                Inquiry Sent!
              </h3>
              <p className="text-muted text-sm font-light">
                We'll get back to you within 24 hours.
              </p>
              <button onClick={onClose} className="btn-primary mt-6">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
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
                  placeholder="e.g. 500 pieces, 1 carton..."
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
                  rows={3}
                  value={form.message}
                  onChange={handle}
                  placeholder="Describe your requirement..."
                  className="input-field resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-500">{errMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full btn-primary py-3 text-center disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Inquiry →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
