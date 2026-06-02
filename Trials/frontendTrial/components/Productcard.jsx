import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE = API_URL.replace("/api", "");

export default function ProductCard({ product }) {
  const imgSrc = product.images?.[0]
    ? `${BASE}/uploads/${product.images[0]}`
    : null;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="card block overflow-hidden group"
    >
      {/* Image */}
      <div className="h-48 bg-cream flex items-center justify-center overflow-hidden border-b border-gold/10">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-5xl opacity-20">📦</div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {product.category?.name && (
          <span className="text-[10px] tracking-[1.5px] uppercase font-semibold text-gold">
            {product.category.name}
          </span>
        )}
        <h3 className="font-semibold text-ink text-[15px] leading-snug mt-1 mb-2 line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-muted leading-relaxed line-clamp-2 font-light">
            {product.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-gold tracking-wide">
            View Details →
          </span>
          {product.featured && (
            <span className="text-[10px] bg-gold-pale text-rust font-semibold px-2 py-0.5 rounded-sm tracking-wide uppercase">
              Featured
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
