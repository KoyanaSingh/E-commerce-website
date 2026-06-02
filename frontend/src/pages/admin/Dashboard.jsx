import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = API_URL ? API_URL.replace("/api", "") : "";

const STATUS_COLORS = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Contacted: "bg-sky-50 text-sky-700 border-sky-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((r) => {
        setStats(r.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#0f8a78] border-t-transparent rounded-full" />
      </div>
    );

  const statCards = [
    {
      label: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: "📦",
      link: "/admin/products",
    },
    {
      label: "Categories",
      value: stats?.totalCategories ?? 0,
      icon: "🗂️",
      link: "/admin/categories",
    },
    {
      label: "Total Inquiries",
      value: stats?.totalInquiries ?? 0,
      icon: "📩",
      link: "/admin/inquiries",
    },
    {
      label: "Pending Inquiries",
      value: stats?.pendingInquiries ?? 0,
      icon: "⏳",
      link: "/admin/inquiries",
    },
  ];

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#0f274a]">
          Dashboard
        </h1>
        <p className="text-muted text-sm mt-1">
          Business overview & activity snapshot
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((s) => (
          <Link
            key={s.label}
            to={s.link}
            className="p-5 rounded-xl border border-black/5 bg-white
              hover:border-[#0f8a78]/30 hover:shadow-sm transition-all"
          >
            <div className="text-2xl mb-3">{s.icon}</div>

            <div className="font-serif text-3xl font-bold text-[#0f274a]">
              {s.value}
            </div>

            <div className="text-xs text-muted mt-1.5 font-medium">
              {s.label}
            </div>

            <div className="mt-3 h-1 w-10 bg-[#0f8a78] rounded-full" />
          </Link>
        ))}
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="rounded-xl border border-black/5 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-semibold text-[#0f274a] text-sm">
              Recent Inquiries
            </h2>

            <Link
              to="/admin/inquiries"
              className="text-xs font-medium text-[#0f8a78] hover:opacity-80"
            >
              View all →
            </Link>
          </div>

          <div className="divide-y">
            {stats?.recentInquiries?.length === 0 && (
              <p className="text-muted text-sm text-center py-8">
                No inquiries yet.
              </p>
            )}

            {stats?.recentInquiries?.map((inq) => (
              <div key={inq._id} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0f274a] truncate">
                      {inq.name}
                    </p>

                    <p className="text-xs text-muted truncate">{inq.email}</p>

                    {inq.productId && (
                      <p className="text-xs text-[#0f8a78] mt-0.5 truncate">
                        📦 {inq.productId.name}
                      </p>
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border
                      ${STATUS_COLORS[inq.status] || STATUS_COLORS.Pending}`}
                  >
                    {inq.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Products */}
        <div className="rounded-xl border border-black/5 bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h2 className="font-semibold text-[#0f274a] text-sm">
              Recent Products
            </h2>

            <Link
              to="/admin/products"
              className="text-xs font-medium text-[#0f8a78] hover:opacity-80"
            >
              View all →
            </Link>
          </div>

          <div className="divide-y">
            {stats?.recentProducts?.length === 0 && (
              <p className="text-muted text-sm text-center py-8">
                No products yet.
              </p>
            )}

            {stats?.recentProducts?.map((prod) => (
              <div
                key={prod._id}
                className="flex items-center gap-3 px-5 py-3.5"
              >
                <div className="w-10 h-10 rounded-md bg-gray-50 flex items-center justify-center overflow-hidden border border-black/5">
                  {prod.images?.[0] ? (
                    <img
                      src={`${BASE}/uploads/${prod.images[0]}`}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  ) : (
                    <span>📦</span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0f274a] truncate">
                    {prod.name}
                  </p>
                  <p className="text-xs text-muted">
                    {prod.category?.name || "—"}
                  </p>
                </div>

                {prod.featured && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#0f8a78]/10 text-[#0f8a78] font-semibold">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {[
          {
            to: "/admin/products",
            label: "Add Product",
            icon: "➕",
            sub: "Upload new product",
          },
          {
            to: "/admin/categories",
            label: "Add Category",
            icon: "🗂️",
            sub: "Create category",
          },
          {
            to: "/admin/inquiries",
            label: "Inquiries",
            icon: "📩",
            sub: `${stats?.pendingInquiries || 0} pending`,
          },
        ].map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="p-4 rounded-xl border border-black/5 bg-white
              hover:border-[#0f8a78]/30 transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0f8a78]/10 flex items-center justify-center">
              {a.icon}
            </div>

            <div>
              <div className="text-sm font-semibold text-[#0f274a]">
                {a.label}
              </div>
              <div className="text-xs text-muted">{a.sub}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
