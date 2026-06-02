import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InquiryModal from "../components/InquiryModal";
import api from "../utils/api";

const BASE = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace("/api", "");

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/products/${slug}`)
      .then((r) => {
        setProduct(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  // Parse specifications (stored as JSON string or object)
  const parseSpecs = (specs) => {
    if (!specs) return null;
    try {
      return typeof specs === "string" ? JSON.parse(specs) : specs;
    } catch {
      return null;
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </div>
      </>
    );

  if (!product)
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <p className="text-muted font-light">Product not found.</p>
          <Link to="/products" className="btn-ghost mt-4">
            ← Back to Products
          </Link>
        </div>
        <Footer />
      </>
    );

  const images = product.images || [];
  const specs = parseSpecs(product.specifications);

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted mb-8">
          <Link to="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gold transition-colors">
            Products
          </Link>
          {product.category && (
            <>
              <span>/</span>
              <Link
                to={`/category/${product.category.slug}`}
                className="hover:text-gold transition-colors"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-ink-light font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-cream rounded-xl overflow-hidden aspect-square flex items-center justify-center border border-gold/15">
              {images[activeImg] ? (
                <img
                  src={`${BASE}/uploads/${images[activeImg]}`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-8xl opacity-15">📦</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === activeImg ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <img
                      src={`${BASE}/uploads/${img}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {product.category && (
              <Link
                to={`/category/${product.category.slug}`}
                className="text-[11px] tracking-[1.5px] uppercase font-semibold text-gold hover:text-gold-light transition-colors"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="font-serif text-3xl font-bold text-ink mt-2 mb-4 leading-snug">
              {product.name}
            </h1>

            {product.featured && (
              <span
                className="inline-block bg-gold-pale text-rust text-[10px] font-bold 
                px-3 py-1 rounded-sm tracking-[1px] uppercase mb-4"
              >
                Featured Product
              </span>
            )}

            {product.description && (
              <p className="text-muted leading-relaxed font-light mb-6 text-sm">
                {product.description}
              </p>
            )}

            {/* Specs */}
            {specs && typeof specs === "object" && (
              <div className="bg-cream rounded-lg p-4 mb-6 border border-gold/15">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink mb-3">
                  Specifications
                </h3>
                <dl className="space-y-2">
                  {Object.entries(specs).map(([k, v]) => (
                    <div key={k} className="flex gap-3 text-sm">
                      <dt className="text-muted font-medium min-w-[100px] capitalize">
                        {k}
                      </dt>
                      <dd className="text-ink-light font-light">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {specs && typeof specs === "string" && (
              <div className="bg-cream rounded-lg p-4 mb-6 border border-gold/15">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink mb-2">
                  Specifications
                </h3>
                <p className="text-sm text-ink-light font-light leading-relaxed">
                  {specs}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => setShowModal(true)}
                className="w-full btn-primary py-4 text-center text-base"
              >
                Inquire / Get Quote →
              </button>
              <a
                href="tel:9811947407"
                className="w-full btn-ghost py-3 text-center justify-center"
              >
                📞 Call: 9811947407
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gold/15 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted text-xs uppercase tracking-wide font-medium">
                  Delivery
                </span>
                <p className="text-ink-light font-light mt-0.5">Pan-India</p>
              </div>
              <div>
                <span className="text-muted text-xs uppercase tracking-wide font-medium">
                  Pricing
                </span>
                <p className="text-ink-light font-light mt-0.5">
                  Bulk discounts available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {showModal && (
        <InquiryModal
          onClose={() => setShowModal(false)}
          inquiryType="product"
          productId={product._id}
          productName={product.name}
        />
      )}
    </>
  );
}
