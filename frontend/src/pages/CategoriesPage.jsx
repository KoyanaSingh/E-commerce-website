import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../utils/api";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = API_URL ? API_URL.replace("/api", "") : "";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      {/* Header (same structure as ProductsPage) */}
      <section className="hero" style={{ textAlign: "center" }}>
        <div className="shell" style={{ textAlign: "center" }}>
          <span className="badge" style={{ marginTop: 60 }}>
            PRODUCT CATEGORIES
          </span>

          <h1
            style={{
              fontSize: "60px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            Explore Our <span>Categories</span>
          </h1>

          <p
            style={{
              textAlign: "center",
              width: "100%",
              margin: "0 auto",
            }}
          >
            Browse packaging categories and find the right product segment for
            your requirement.
          </p>
        </div>
      </section>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 py-10"
        style={{ marginTop: "0px", paddingTop: "0px" }}
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg h-48 animate-pulse border border-gold/10"
                />
              ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-30">📦</div>
            <p className="text-muted font-light">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((c) => (
              <Link
                key={c._id}
                to={`/categories/${c.slug}`}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(15, 39, 74, 0.08)",
                  borderRadius: "16px",
                  padding: "24px",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                  display: "block",
                }}
                className="hover:shadow-lg"
              >
                <div
                  style={{
                    height: "220px",
                    overflow: "hidden",
                    borderRadius: "12px",
                    marginBottom: "18px",
                    background: "#edf8f7",
                  }}
                >
                  <img
                    src={`${BASE}/uploads/${c.image}`}
                    alt={c.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#0f274a",
                    marginBottom: "10px",
                  }}
                >
                  {c.name}
                </h3>

                {c.description && (
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#6f7d92",
                      lineHeight: "1.6",
                    }}
                  >
                    {c.description}
                  </p>
                )}

                <div
                  style={{
                    marginTop: "16px",
                    fontSize: "12px",
                    color: "#0f8a78",
                    fontWeight: "600",
                  }}
                >
                  View Products →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
