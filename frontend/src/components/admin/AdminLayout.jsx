import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/admin/products", label: "Products", icon: "📦" },
  { to: "/admin/categories", label: "Categories", icon: "🗂️" },
  { to: "/admin/inquiries", label: "Inquiries", icon: "📩" },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#f0f4f3] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#1a1f2e] flex flex-col min-h-screen sticky top-0">
        {/* Brand */}
        <div className="px-5 py-6 border-b border-white/10">
          <div className="font-serif text-2xl font-bold text-white">
            PK <span className="text-[#0f8a78]">Enterprises</span>
          </div>
          <div className="text-xs text-white/40 mt-1 uppercase tracking-wider">
            Admin Panel
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#0f8a78] text-white shadow-sm"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 py-2 mb-2">
            <div className="text-[10px] text-white/30 uppercase tracking-wider">
              Logged in as
            </div>
            <div className="text-white/70 text-xs mt-0.5 truncate">
              {admin?.email}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm
              text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <span>🚪</span> Logout
          </button>

          <a
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm
              text-white/60 hover:text-white hover:bg-white/10 transition-all mt-0.5"
          >
            <span>🌐</span> View Site
          </a>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 min-w-0 p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
