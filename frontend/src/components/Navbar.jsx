import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Products", path: "/products" },
    { name: "About Us", path: "/about-us" },
    { name: "Why Us", path: "/why-choose-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  const [categories, setCategories] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <Link to="/" className="logo">
          <div
            className="font-serif text-2xl font-bold text-white"
            style={{ fontSize: "30px" }}
          >
            PK{" "}
            <span className="text-[#0f8a78]" style={{ fontSize: "30px" }}>
              Enterprises
            </span>
          </div>
          <div style={{ paddingTop: "10px", fontSize: "15px" }}>
            PACKAGING SOLUTIONS
          </div>
        </Link>

        {/* Desktop */}
        <div className="links">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              {item.name}
            </NavLink>
          ))}

          <a className="phone">+91 87604 48119</a>

          <Link className="quote" to="/contact-us">
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
