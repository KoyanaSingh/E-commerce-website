import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import InquiryModal from "../components/InquiryModal";
import api from "../utils/api";

const MARQUEE_ITEMS = [
  "Corrugated Boxes",
  "Duplex Boxes",
  "Rigid Boxes",
  "Gift Boxes",
  "Food Packaging",
  "Cosmetic Boxes",
  "Product Labels",
  "Barcode Labels",
  "Vinyl Stickers",
  "Die-Cut Stickers",
  "Hang Tags",
  "Garment Tags",
  "Paper Carry Bags",
  "Kraft Bags",
  "Non Woven Bags",
];

const CATEGORY_ICONS = {
  default: "📦",
  corrugated: "🏭",
  duplex: "📦",
  rigid: "🎁",
  gift: "🎁",
  food: "🥡",
  cosmetic: "💄",
  sticker: "🏷️",
  label: "🏷️",
  tag: "🔖",
  carry: "🛍️",
  bag: "🛍️",
  printed: "🖨️",
};
function catIcon(name = "") {
  const lower = name.toLowerCase();
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "📦";
}

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api
      .get("/categories")
      .then((r) => setCategories(r.data))
      .catch(() => {});
    api
      .get("/products?limit=6")
      .then((r) => setFeatured(r.data.products || []))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        {/* Left */}
        <div className="flex flex-col justify-center px-6 md:px-16 py-20 fade-up">
          <span
            className="inline-flex items-center gap-2 bg-gold-pale border border-gold/30
            px-3 py-1.5 rounded-sm text-[11px] font-semibold uppercase tracking-[1.5px]
            text-rust mb-8 w-fit"
          >
            <span className="w-5 h-px bg-gold"></span>
            Premium Packaging Manufacturer · Ghaziabad
          </span>

          <h1 className="font-serif text-5xl lg:text-6xl font-black text-ink leading-[1.05] mb-6">
            Packaging that
            <br />
            elevates your <em className="text-gold not-italic">brand</em>
          </h1>

          <p className="text-base text-muted font-light leading-relaxed max-w-md mb-8">
            Custom boxes, labels, tags and carry bags — manufactured in
            Ghaziabad and delivered pan-India. MOQ flexible. Bulk pricing
            available.
          </p>

          <div className="flex flex-wrap gap-3">
            <button onClick={() => setShowModal(true)} className="btn-primary">
              Get a Free Quote
            </button>
            <Link to="/products" className="btn-ghost">
              Browse Products →
            </Link>
          </div>

          <div className="flex gap-8 mt-12 pt-8 border-t border-gold/20">
            {[
              ["500+", "Products"],
              ["Pan-India", "Delivery"],
              ["Custom", "Printing"],
              ["Bulk", "Pricing"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-2xl font-bold text-ink leading-tight">
                  {n}
                </div>
                <div className="text-xs text-muted mt-0.5 tracking-wide font-medium">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – dark panel */}
        <div className="hidden lg:flex bg-ink relative overflow-hidden items-center justify-center">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)",
              backgroundSize: "12px 12px",
            }}
          />
          <div className="relative z-10 p-10 w-full max-w-sm">
            <div className="space-y-3">
              {[
                {
                  icon: "🎁",
                  name: "Rigid & Gift Boxes",
                  sub: "Premium, custom printed",
                },
                {
                  icon: "🏷️",
                  name: "Labels & Stickers",
                  sub: "Waterproof, die-cut, roll",
                },
                {
                  icon: "🛍️",
                  name: "Carry Bags",
                  sub: "Paper, kraft, non-woven",
                },
                { icon: "🔖", name: "Tags", sub: "Hang, garment, luxury tags" },
                {
                  icon: "📦",
                  name: "Corrugated Boxes",
                  sub: "E-commerce, industrial",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/4 border border-gold/15 
                    rounded-md px-4 py-3 hover:-translate-y-0.5 transition-transform duration-200"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {item.name}
                    </div>
                    <div className="text-white/40 text-xs font-light">
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-ink py-3 overflow-hidden border-y border-gold/20">
        <div className="marquee-track flex gap-0 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-8 text-[11px]
              tracking-[2px] uppercase text-white/40 font-medium"
            >
              <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0"></span>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      {categories.length > 0 && (
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Shop by Category</span>
            <h2 className="section-title">
              Everything your business{" "}
              <em className="text-rust not-italic">needs</em>
            </h2>
            <p className="text-muted text-sm font-light mt-3 max-w-md mx-auto leading-relaxed">
              From custom box manufacturing to labels, tags and carry bags — all
              under one roof.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat, i) => (
              <Link
                key={cat._id}
                to={`/category/${cat.slug}`}
                className="bg-ink rounded-lg overflow-hidden group relative border border-gold/10 
                  hover:border-gold/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)",
                    backgroundSize: "10px 10px",
                  }}
                />
                <div className="relative p-5">
                  <div className="text-3xl mb-3">{catIcon(cat.name)}</div>
                  <div className="text-[10px] tracking-[2px] uppercase text-gold font-semibold mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-serif text-base font-bold text-white leading-snug mb-2">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-white/35 text-xs font-light line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  )}
                  <span
                    className="inline-block mt-3 text-[11px] text-gold-light font-semibold 
                    tracking-wide uppercase group-hover:translate-x-1 transition-transform"
                  >
                    Explore →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {categories.length > 8 && (
            <div className="text-center mt-8">
              <Link to="/products" className="btn-ghost">
                View All Categories
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── WHY US ── */}
      <section className="bg-ink py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[11px] tracking-[2px] uppercase font-semibold text-gold-light block mb-3">
              Why Choose Us
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
              Quality you can <em className="text-gold not-italic">trust</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 rounded-lg overflow-hidden border border-gold/10">
            {[
              {
                icon: "🖨️",
                title: "Custom Printing",
                desc: "Logo, brand colors, custom sizes. Your packaging, your identity.",
              },
              {
                icon: "📦",
                title: "All Box Types",
                desc: "Corrugated, duplex, rigid, food grade, cosmetic and industrial.",
              },
              {
                icon: "🏷️",
                title: "Labels & Tags",
                desc: "Barcode, waterproof, die-cut, vinyl, hang tags and more.",
              },
              {
                icon: "🛍️",
                title: "Eco Carry Bags",
                desc: "Paper, kraft, non-woven and eco-friendly carry bag options.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-ink p-8 hover:bg-[#261f18] transition-colors duration-300 group"
              >
                <div
                  className="w-12 h-12 border border-gold/25 rounded-md flex items-center 
                  justify-center text-xl mb-5 bg-gold/5 group-hover:border-gold group-hover:bg-gold/10 
                  transition-all duration-300"
                >
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">
                  {f.title}
                </h3>
                <p className="text-white/40 text-xs font-light leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      {featured.length > 0 && (
        <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Our Products</span>
            <h2 className="section-title">
              Featured <em className="text-rust not-italic">products</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products" className="btn-ghost">
              View All Products
            </Link>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <div className="bg-rust relative overflow-hidden">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 bg-black/10"
          style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 
          md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-snug mb-3">
              Ready to get your
              <br />
              custom packaging?
            </h2>
            <p className="text-white/70 text-sm font-light leading-relaxed">
              Talk to Mr. Kamal directly for bulk pricing, samples and custom
              design support.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white text-rust font-bold px-6 py-3 rounded-sm text-sm hover:bg-gold-pale transition-colors"
            >
              Request a Quote
            </button>
            <a
              href="tel:9811947407"
              className="border-2 border-white/50 text-white font-medium px-6 py-3 rounded-sm 
                text-sm hover:border-white hover:bg-white/10 transition-colors"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </div>

      <Footer />

      {showModal && (
        <InquiryModal
          onClose={() => setShowModal(false)}
          inquiryType="general"
        />
      )}
    </>
  );
}
