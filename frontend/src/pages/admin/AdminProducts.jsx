import { useEffect, useState, useRef } from "react";
import api from "../../utils/api";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = API_URL ? API_URL.replace("/api", "") : "";

const EMPTY = {
  name: "",
  category: "",
  description: "",
  specifications: "",
  featured: false,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState(EMPTY);
  const [editSlug, setEditSlug] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fileRef = useRef();

  const loadProducts = () => {
    setLoading(true);
    api
      .get(`/products?page=${page}&limit=10`)
      .then((r) => {
        setProducts(r.data.products || []);
        setTotal(r.data.total || 0);
        setPages(r.data.pages || 1);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    api
      .get("/categories")
      .then((r) => setCategories(r.data))
      .catch(() => {});
  }, []);

  useEffect(loadProducts, [page]);

  const openAdd = () => {
    setForm(EMPTY);
    setEditSlug(null);
    setImageFiles([]);
    setError("");
    setShowForm(true);
  };

  const openEdit = (p) => {
    setForm({
      name: p.name,
      category: p.category?._id || "",
      description: p.description || "",
      specifications:
        typeof p.specifications === "object"
          ? JSON.stringify(p.specifications, null, 2)
          : p.specifications || "",
      featured: !!p.featured,
    });
    setEditSlug(p.slug);
    setImageFiles([]);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditSlug(null);
    setForm(EMPTY);
    setError("");
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("description", form.description);
      fd.append("featured", form.featured);

      if (form.specifications.trim()) {
        fd.append("specifications", form.specifications);
      }

      imageFiles.forEach((f) => fd.append("images", f));

      if (editSlug) await api.put(`/products/${editSlug}`, fd);
      else await api.post("/products", fd);

      closeForm();
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving product.");
    } finally {
      setSaving(false);
    }
  };

  const del = async (slug) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      await api.delete(`/products/${slug}`);
      loadProducts();
    } catch {
      alert("Delete failed.");
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Products</h1>
          <p className="text-muted text-sm mt-0.5">
            {categories.length} products
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 rounded-md bg-[#0f8a78] text-white text-sm font-medium hover:bg-[#0f8a78]/90 transition-colors"
        >
          + Add Product
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="bg-[#0f8a78] px-6 py-5 flex items-center justify-between">
              <h2 className="font-serif text-lg text-white font-bold">
                {editSlug ? "Edit" : "Add"} Product
              </h2>

              <button
                onClick={closeForm}
                className="text-white/70 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={save} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Luxury Gift Box"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0f8a78]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Category *
                </label>
                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0f8a78]"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Description
                </label>
                <textarea
                  rows={1}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Brief description..."
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0f8a78] resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Specifications
                </label>
                <textarea
                  rows={1}
                  value={form.specifications}
                  onChange={(e) =>
                    setForm({ ...form, specifications: e.target.value })
                  }
                  placeholder='{"material": "cardboard", "size": "10x10x5"}'
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0f8a78] resize-none font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Images
                </label>

                <input
                  type="file"
                  ref={fileRef}
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFiles(Array.from(e.target.files))}
                />

                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  className="text-sm text-[#0f8a78] font-medium"
                >
                  {imageFiles.length
                    ? `📎 ${imageFiles.length} file(s) selected`
                    : "+ Upload Images"}
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                  className="accent-[#0f8a78]"
                />
                Featured Product
              </label>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 rounded-md bg-[#0f8a78] text-white text-sm font-medium disabled:opacity-60 hover:bg-[#0f8a78]/90 transition"
                >
                  {saving ? "Saving..." : editSlug ? "Update" : "Create"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 text-sm text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-28 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
        </div>
      ) : products.length === 0 ? (
        <div className="admin-card p-16 text-center">
          <div className="text-5xl mb-3 opacity-20">📦</div>
          <p className="text-muted font-light">
            No products yet. Add your first one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="admin-card p-4 flex items-center gap-4 border border-[#0f8a78]/10"
            >
              <div className="w-14 h-14 bg-[#0f8a78]/5 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#0f8a78]/10">
                {p.images?.[0] ? (
                  <img
                    src={`${BASE}/uploads/${p.images[0]}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">📦</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-ink text-sm truncate">
                  {p.name}
                </h3>

                <p className="text-xs text-muted font-light truncate mt-0.5">
                  {p.category?.name || "No category"}
                </p>

                <p className="text-[10px] text-gray-400 mt-1 font-mono">
                  {p.slug}
                </p>
              </div>

              {p.featured && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0f8a78]/10 text-[#0f8a78] font-medium border border-[#0f8a78]/20">
                  Featured
                </span>
              )}

              <div className="flex gap-1.5">
                <button
                  onClick={() => openEdit(p)}
                  className="w-8 h-8 rounded-md bg-[#0f8a78]/10 text-[#0f8a78] hover:bg-[#0f8a78]/20 flex items-center justify-center transition"
                >
                  ✏️
                </button>

                <button
                  onClick={() => del(p.slug)}
                  className="w-8 h-8 rounded-md bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-[#C9A84C]/20 flex items-center justify-center transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex gap-2 mt-5">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className="w-9 h-9 rounded-md border text-sm transition-colors"
              style={{
                borderColor: n === page ? "#0f8a78" : "#e5e7eb",
                color: n === page ? "#0f8a78" : "#111",
                backgroundColor: n === page ? "#0f8a78/5" : "transparent",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
