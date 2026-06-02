import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InquiryModal from "../components/InquiryModal";
import api from "../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faGear,
  faTruck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = API_URL ? API_URL.replace("/api", "") : "";

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

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6"
        style={{
          paddingTop: "20px",
          paddingBottom: "80px",
        }}
      >
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 text-xs text-muted mb-8"
          style={{ paddingBottom: "20px", margin: "0px" }}
        >
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
                to={`/categories/${product.category.slug}`}
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
            <div
              style={{
                background: "#edf8f7",
                borderRadius: "30px",
                padding: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(15,39,74,0.08)",
              }}
            >
              {images[activeImg] ? (
                <img
                  src={`${BASE}/uploads/${images[activeImg]}`}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "450px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
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
                to={`/categories/${product.category.slug}`}
                className="hover:text-gold-light transition-colors"
                style={{
                  display: "inline-block",
                  background: "#edf8f7",
                  color: "#0f8a78",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {product.category.name}
              </Link>
            )}
            <h1
              style={{
                fontSize: "44px",
                lineHeight: "1.1",
                fontWeight: "800",
                color: "#0f274a",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
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
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.8",
                  color: "#6f7d92",
                  marginBottom: "30px",
                }}
              >
                {product.description}
              </p>
            )}

            {/* Specs */}
            {specs && typeof specs === "object" && (
              <div
                style={{
                  background: "#edf8f7",
                  borderRadius: "24px",
                  padding: "28px",
                  marginBottom: "30px",
                }}
              >
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
              <div
                style={{
                  background: "#edf8f7",
                  borderRadius: "24px",
                  padding: "28px",
                  marginBottom: "30px",
                }}
              >
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
                style={{
                  width: "100%",
                  height: "60px",
                  background: "#0f8a78",
                  color: "#fff",
                  border: "none",
                  borderRadius: "16px",
                  fontSize: "17px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Inquire / Get Quote →
              </button>
              <a
                href="tel:9811947407"
                style={{
                  width: "100%",
                  height: "56px",
                  border: "1px solid #0f8a78",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0f8a78",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                📞 Call: 9811947407
              </a>
            </div>

            <div
              style={{
                marginTop: "40px",
                paddingTop: "30px",
                borderTop: "1px solid rgba(15,138,120,0.12)",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
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

      <section style={{ marginBottom: "70px" }}>
        <div className="trustbar shell">
          <div className="trust-item">
            <div className="trust-icon">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>

            <div className="trust-content">
              <h4>Premium Quality</h4>
              <p>
                Manufactured using premium-grade materials for maximum
                durability.
              </p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <FontAwesomeIcon icon={faGear} />
            </div>
            <div>
              <h4>Custom Solutions</h4>
              <p>
                Tailor-made solutions designed for your products and brand
                identity
              </p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div>
              <h4>Fast & On-Time Delivery</h4>
              <p>Reliable dispatch and delivery schedules you can depend on.</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div>
              <h4>Trusted by 500+ Businesses</h4>
              <p>
                Building long-term partnerships through quality and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

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
