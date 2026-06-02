import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = API_URL ? API_URL.replace("/api", "") : "";

export default function ProductCard({ product }) {
  const imgSrc = product.images?.[0]
    ? `${BASE}/uploads/${product.images[0]}`
    : null;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="card block overflow-hidden group"
      style={{
        borderRadius: "24px",
        background: "#fff",
        border: "1px solid rgba(15,138,120,0.08)",
      }}
    >
      {/* Image */}
      <div
        style={{
          height: "300px",
          background: "#edf8f7",
          overflow: "hidden",
        }}
      >
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="text-5xl opacity-20">📦</div>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          padding: "24px",
        }}
      >
        {product.category?.name && (
          <span
            style={{
              background: "#edf8f7",
              color: "#0f8a78",
              padding: "6px 12px",
              borderRadius: "999px",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {product.category.name}
          </span>
        )}
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#0f274a",
            lineHeight: "1.3",
            marginTop: "16px",
            marginBottom: "12px",
          }}
        >
          {product.name}
        </h3>
        {product.description && (
          <p
            style={{
              fontSize: "15px",
              color: "#6f7d92",
              lineHeight: "1.7",
              minHeight: "50px",
            }}
          >
            {product.description}
          </p>
        )}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#0f8a78",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            View Details →
          </span>
          {product.featured && (
            <span
              style={{
                background: "#edf8f7",
                color: "#0f8a78",
                padding: "6px 12px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              Featured
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
