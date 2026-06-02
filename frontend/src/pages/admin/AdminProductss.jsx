import { useEffect, useState, useRef } from "react";
import api from "../../utils/api";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = API_URL ? API_URL.replace("/api", "") : "";

const PRIMARY = "#0f8a78";

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
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${slug}`);
      loadProducts();
    } catch {
      alert("Delete failed.");
    }
  };

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Products</h1>
          <p className="text-muted text-sm mt-0.5">{total} products total</p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 rounded-md text-sm font-semibold text-white"
          style={{ backgroundColor: PRIMARY }}
        >
          + Add Product
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
            {/* Header — MATCH Categories EXACTLY */}
            <div
              className="px-6 py-5 flex items-center justify-between flex-shrink-0"
              style={{ backgroundColor: "#0f8a78" }}
            >
              <h2 className="font-serif text-lg text-white font-bold">
                {editSlug ? "Edit" : "Add"} Product
              </h2>

              <button
                onClick={closeForm}
                className="text-white/50 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Scrollable body — FIX HEIGHT ISSUE */}
            <form
              className="p-6 space-y-4 overflow-y-auto flex-1"
              onSubmit={save}
            >
              <div>
                <label className="text-xs font-medium text-ink-light mb-1 block">
                  Product Name *
                </label>
                <input
                  className="input-field"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-light mb-1 block">
                  Category *
                </label>
                <select
                  className="input-field"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  required
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
                <label className="text-xs font-medium text-ink-light mb-1 block">
                  Description
                </label>
                <textarea
                  className="input-field resize-none"
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-light mb-1 block">
                  Specifications
                </label>
                <textarea
                  className="input-field resize-none font-mono text-xs"
                  rows={3}
                  value={form.specifications}
                  onChange={(e) =>
                    setForm({ ...form, specifications: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-light mb-1 block">
                  Images
                </label>

                <input
                  type="file"
                  ref={fileRef}
                  multiple
                  className="hidden"
                  onChange={(e) => setImageFiles(Array.from(e.target.files))}
                />

                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  className="btn-ghost text-sm py-2"
                >
                  {imageFiles.length
                    ? `${imageFiles.length} file(s) selected`
                    : "+ Upload Images"}
                </button>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm({ ...form, featured: e.target.checked })
                  }
                />
                Featured Product
              </label>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-md text-white font-semibold disabled:opacity-60"
                  style={{ backgroundColor: "#0f8a78" }}
                >
                  {saving
                    ? "Saving..."
                    : editSlug
                      ? "Update Product"
                      : "Create Product"}
                </button>

                <button
                  type="button"
                  onClick={closeForm}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-16 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
        </div>
      ) : products.length === 0 ? (
        <div className="admin-card p-16 text-center">
          <div className="text-5xl opacity-20 mb-3">📦</div>
          <p className="text-muted">No products found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((p) => (
            <div key={p._id} className="admin-card p-4 flex items-center gap-4">
              <div className="w-14 h-14 bg-cream rounded-lg overflow-hidden border border-black/10 flex items-center justify-center">
                {p.images?.[0] ? (
                  <img
                    src={`${BASE}/uploads/${p.images[0]}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "📦"
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-ink truncate">{p.name}</div>
                <div className="text-xs text-muted">
                  {p.category?.name || "—"}
                </div>
                <div className="text-[10px] text-muted font-mono">{p.slug}</div>
              </div>

              {p.featured && (
                <span
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Featured
                </span>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => openEdit(p)}
                  className="text-xs px-3 py-1 rounded border"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(p.slug)}
                  className="text-xs px-3 py-1 rounded border text-red-500"
                >
                  Delete
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
              className="w-9 h-9 rounded border text-sm"
              style={{
                borderColor: n === page ? PRIMARY : "#e5e7eb",
                color: n === page ? PRIMARY : "#111",
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
