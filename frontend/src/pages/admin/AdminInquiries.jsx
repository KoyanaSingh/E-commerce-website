import { useEffect, useState } from "react";
import api from "../../utils/api";

const STATUS_STYLES = {
  Pending: "bg-[#fff7e6] text-[#0f8a78] border-[#0f8a78]/20",
  Contacted: "bg-[#e6f7f5] text-[#0f8a78] border-[#0f8a78]/30",
  Completed: "bg-[#edf8f7] text-[#0f8a78] border-[#0f8a78]/40",
};

const STATUSES = ["Pending", "Contacted", "Completed"];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  const load = () => {
    setLoading(true);
    api
      .get("/inquiries")
      .then((r) => {
        setInquiries(r.data.inquiries || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(load, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/inquiries/${id}/status`, { status });
      setInquiries((prev) =>
        prev.map((i) => (i._id === id ? { ...i, status } : i)),
      );
    } catch {
      alert("Failed to update status.");
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await api.delete(`/inquiries/${id}`);
      setInquiries((prev) => prev.filter((i) => i._id !== id));
    } catch {
      alert("Delete failed.");
    }
  };

  const filtered =
    filter === "All" ? inquiries : inquiries.filter((i) => i.status === filter);

  const counts = {
    All: inquiries.length,
    ...Object.fromEntries(
      STATUSES.map((s) => [s, inquiries.filter((i) => i.status === s).length]),
    ),
  };

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-ink">Inquiries</h1>
        <p className="text-muted text-sm mt-0.5">
          {inquiries.length} total inquiries
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["All", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
              filter === s
                ? "bg-[#0f8a78] text-white border-[#0f8a78]"
                : "bg-white text-ink-light border-gray-200 hover:border-[#0f8a78] hover:text-[#0f8a78]"
            }`}
          >
            {s} <span className="opacity-60">({counts[s] || 0})</span>
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="h-20 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-card p-16 text-center">
          <div className="text-5xl mb-3 opacity-20">📩</div>
          <p className="text-muted font-light">
            No inquiries {filter !== "All" ? `with status "${filter}"` : "yet"}.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inq) => (
            <div key={inq._id} className="admin-card overflow-hidden">
              {/* Row */}
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#edf8f7] transition"
                onClick={() =>
                  setExpanded(expanded === inq._id ? null : inq._id)
                }
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-ink text-sm">
                      {inq.name}
                    </span>

                    {inq.productId && (
                      <span className="text-[10px] bg-[#edf8f7] text-[#0f8a78] font-semibold px-1.5 py-0.5 rounded">
                        📦 {inq.productId.name}
                      </span>
                    )}

                    {inq.categoryId && (
                      <span className="text-[10px] bg-[#fff7e6] text-[#0f8a78] font-semibold px-1.5 py-0.5 rounded">
                        🗂️ {inq.categoryId.name}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-muted mt-0.5 font-light">
                    {inq.email} {inq.phone && `· ${inq.phone}`} ·{" "}
                    {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`text-[10px] font-semibold px-2 py-1 rounded border ${
                      STATUS_STYLES[inq.status] || STATUS_STYLES.Pending
                    }`}
                  >
                    {inq.status}
                  </span>
                  <span className="text-gray-300">
                    {expanded === inq._id ? "▲" : "▼"}
                  </span>
                </div>
              </div>

              {/* Expanded */}
              {expanded === inq._id && (
                <div className="border-t border-gray-100 px-5 py-4 bg-[#fbfcfc]">
                  {inq.message && (
                    <div className="mb-4">
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-muted mb-1">
                        Message
                      </div>
                      <p className="text-sm text-ink-light font-light">
                        {inq.message}
                      </p>
                    </div>
                  )}

                  {inq.quantity && (
                    <div className="mb-4">
                      <div className="text-[10px] uppercase tracking-wider font-semibold text-muted mb-1">
                        Requirement
                      </div>
                      <p className="text-sm text-ink-light font-light">
                        {inq.quantity}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <span className="text-xs font-medium text-muted">
                      Update:
                    </span>

                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(inq._id, s)}
                        className={`text-xs px-3 py-1.5 rounded border font-semibold transition ${
                          inq.status === s
                            ? "bg-[#0f8a78] text-white border-[#0f8a78]"
                            : "bg-white text-ink-light border-gray-200 hover:border-[#0f8a78] hover:text-[#0f8a78]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}

                    <div className="ml-auto flex gap-2">
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-xs px-3 py-1.5 rounded bg-[#edf8f7] text-[#0f8a78] hover:bg-[#e6f7f5] font-medium"
                      >
                        ✉️ Reply
                      </a>

                      {inq.phone && (
                        <a
                          href={`tel:${inq.phone}`}
                          className="text-xs px-3 py-1.5 rounded bg-[#fff7e6] text-[#0f8a78] hover:bg-[#fff1d6] font-medium"
                        >
                          📞 Call
                        </a>
                      )}

                      <button
                        onClick={() => del(inq._id)}
                        className="text-xs px-3 py-1.5 rounded bg-red-50 text-red-500 hover:bg-red-100 font-medium"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
