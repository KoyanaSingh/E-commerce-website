import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import InquiryModal from "../components/InquiryModal";
import api from "../utils/api";

export default function CategoryPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/categories/${slug}/products`)
      .then((r) => {
        setData(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <p className="text-muted font-light">Category not found.</p>
          <Link to="/products" className="btn-ghost mt-4">
            ← Back to Products
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const { category, products } = data;

  return (
    <>
      <Navbar />

      {/* Header (MATCHES ProductsPage STYLE) */}
      <section className="hero" style={{ textAlign: "center" }}>
        <div className="shell">
          {/* <span className="badge" style={{ marginTop: 60 }}>
            CATEGORY COLLECTION
          </span> */}

          <h1
            style={{
              fontSize: "60px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            {category.name}
          </h1>

          {category.description && (
            <p style={{ maxWidth: "700px", margin: "0 auto" }}>
              {category.description}
            </p>
          )}

          <div style={{ marginTop: "20px" }}>
            <span className="text-muted">{products.length} products</span>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#0f8a78",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Inquire About This Category
          </button>
        </div>
      </section>

      {/* CONTENT AREA (same structure as ProductsPage) */}
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
        style={{ paddingTop: "0px", marginTop: "0px" }}
      >
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">📦</div>
            <p className="text-muted font-light">
              No products in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </div>

      <Footer />

      {showModal && (
        <InquiryModal
          onClose={() => setShowModal(false)}
          inquiryType="category"
          categoryId={category._id}
          categoryName={category.name}
        />
      )}
    </>
  );
}
