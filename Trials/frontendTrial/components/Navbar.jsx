import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream/92 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-serif text-xl font-bold text-ink">
          PK <span className="text-gold">Enterprises</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "text-gold" : "text-ink-light hover:text-gold"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            onClick={() => navigate("/contact")}
            className="bg-ink text-gold-light px-5 py-2 text-sm font-semibold rounded-sm hover:bg-rust transition-colors"
          >
            Get Quote
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          <span className="block w-5 h-0.5 bg-ink mb-1"></span>
          <span className="block w-5 h-0.5 bg-ink mb-1"></span>
          <span className="block w-3 h-0.5 bg-ink"></span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-gold/20 px-4 py-4 space-y-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-ink-light hover:text-gold transition-colors"
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block btn-primary text-center mt-2"
          >
            Get Quote
          </Link>
        </div>
      )}
    </nav>
  );
}
