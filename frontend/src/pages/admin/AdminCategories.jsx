import { useEffect, useState, useRef } from "react";
import api from "../../utils/api";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = API_URL ? API_URL.replace("/api", "") : "";

const EMPTY = { name: "", description: "" };

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const fileRef = useRef();

  const load = () => {
    setLoading(true);
    api
      .get("/categories")
      .then((r) => {
        setCategories(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(load, []);

  const openAdd = () => {
    setForm(EMPTY);
    setEditId(null);
    setImageFile(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setForm({ name: cat.name, description: cat.description || "" });
    setEditId(cat._id);
    setImageFile(null);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditId(null);
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
      fd.append("description", form.description);
      if (imageFile) fd.append("image", imageFile);

      if (editId) await api.put(`/categories/${editId}`, fd);
      else await api.post("/categories", fd);

      closeForm();
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving category.");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this category? This cannot be undone.")) return;

    try {
      await api.delete(`/categories/${id}`);
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink">Categories</h1>
          <p className="text-muted text-sm mt-0.5">
            {categories.length} categories
          </p>
        </div>

        <button
          onClick={openAdd}
          className="px-4 py-2 rounded-md bg-[#0f8a78] text-white text-sm font-medium hover:bg-[#0f8a78]/90 transition-colors"
        >
          + Add Category
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="bg-[#0f8a78] px-6 py-5 flex items-center justify-between">
              <h2 className="font-serif text-lg text-white font-bold">
                {editId ? "Edit" : "Add"} Category
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
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Rigid Boxes"
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#0f8a78]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Description
                </label>
                <textarea
                  rows={3}
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
                  Image
                </label>

                <input
                  type="file"
                  ref={fileRef}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />

                <button
                  type="button"
                  onClick={() => fileRef.current.click()}
                  className="text-sm text-[#0f8a78] font-medium"
                >
                  {imageFile ? `📎 ${imageFile.name}` : "+ Upload Image"}
                </button>
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 rounded-md bg-[#0f8a78] text-white text-sm font-medium disabled:opacity-60 hover:bg-[#0f8a78]/90 transition"
                >
                  {saving ? "Saving..." : editId ? "Update" : "Create"}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-28 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="admin-card p-16 text-center">
          <div className="text-5xl mb-3 opacity-20">🗂️</div>
          <p className="text-muted font-light">
            No categories yet. Add your first one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="admin-card p-4 flex items-center gap-4 border border-[#0f8a78]/10"
            >
              <div className="w-14 h-14 bg-[#0f8a78]/5 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#0f8a78]/10">
                {cat.image ? (
                  <img
                    src={`${BASE}/uploads/${cat.image}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">🗂️</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-ink text-sm truncate">
                  {cat.name}
                </h3>

                <p className="text-xs text-muted font-light truncate mt-0.5">
                  {cat.description || "No description"}
                </p>

                <p className="text-[10px] text-gray-400 mt-1 font-mono">
                  {cat.slug}
                </p>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={() => openEdit(cat)}
                  className="w-8 h-8 rounded-md bg-[#0f8a78]/10 text-[#0f8a78] hover:bg-[#0f8a78]/20 flex items-center justify-center transition"
                >
                  ✏️
                </button>

                <button
                  onClick={() => del(cat._id)}
                  className="w-8 h-8 rounded-md bg-[#C9A84C]/10 text-[#C9A84C] hover:bg-[#C9A84C]/20 flex items-center justify-center transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
