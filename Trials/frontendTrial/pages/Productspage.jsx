import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import api from "../utils/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    api
      .get("/categories")
      .then((r) => setCategories(r.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const catFromUrl = searchParams.get("category") || "";
    setCatFilter(catFromUrl);
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 12 });
    if (catFilter) params.set("category", catFilter);
    api
      .get(`/products?${params}`)
      .then((r) => {
        let prods = r.data.products || [];
        if (search.trim()) {
          const q = search.toLowerCase();
          prods = prods.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.description?.toLowerCase().includes(q),
          );
        }
        setProducts(prods);
        setTotal(r.data.total);
        setPages(r.data.pages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, catFilter, search]);

  const handleCat = (id) => {
    setCatFilter(id);
    setPage(1);
    if (id) setSearchParams({ category: id });
    else setSearchParams({});
  };

  return (
    <>
      <Navbar />

      {/* Header */}
      <div className="bg-ink py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[11px] tracking-[2px] uppercase text-gold font-semibold block mb-2">
            Our Catalogue
          </span>
          <h1 className="font-serif text-4xl font-bold text-white">
            All Products
          </h1>
          <p className="text-white/40 text-sm font-light mt-2">
            {total} products available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-52 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gold/15 p-4 sticky top-20">
              <h3 className="text-xs font-semibold text-ink uppercase tracking-wider mb-4">
                Categories
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleCat("")}
                  className={`w-full text-left text-sm px-3 py-2 rounded-sm transition-colors ${
                    !catFilter
                      ? "bg-ink text-gold-light font-semibold"
                      : "text-ink-light hover:bg-cream"
                  }`}
                >
                  All Products
                </button>
                {categories.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => handleCat(c._id)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-sm transition-colors ${
                      catFilter === c._id
                        ? "bg-ink text-gold-light font-semibold"
                        : "text-ink-light hover:bg-cream"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Search bar */}
            <div className="mb-6">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search products..."
                className="input-field max-w-xs"
              />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg h-64 animate-pulse border border-gold/10"
                    />
                  ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4 opacity-30">📦</div>
                <p className="text-muted font-light">No products found.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        onClick={() => setPage(n)}
                        className={`w-9 h-9 rounded-sm text-sm font-medium transition-colors ${
                          n === page
                            ? "bg-ink text-gold-light"
                            : "bg-white border border-ink/15 text-ink hover:border-gold hover:text-gold"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
