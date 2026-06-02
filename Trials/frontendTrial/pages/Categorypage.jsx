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

  if (loading)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-gold border-t-transparent rounded-full" />
        </div>
      </>
    );

  if (!data)
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

  const { category, products } = data;

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="bg-ink py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/products"
            className="text-gold/60 hover:text-gold text-xs tracking-wider uppercase font-medium transition-colors"
          >
            ← All Categories
          </Link>
          <h1 className="font-serif text-4xl font-bold text-white mt-3">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-white/45 text-sm font-light mt-2 max-w-xl leading-relaxed">
              {category.description}
            </p>
          )}
          <div className="flex items-center gap-4 mt-5">
            <span className="text-gold text-sm">
              {products.length} products
            </span>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gold text-ink font-bold text-sm px-4 py-2 rounded-sm hover:bg-gold-light transition-colors"
            >
              Inquire About This Category →
            </button>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">📦</div>
            <p className="text-muted font-light">
              No products in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
          productName={category.name}
        />
      )}
    </>
  );
}
