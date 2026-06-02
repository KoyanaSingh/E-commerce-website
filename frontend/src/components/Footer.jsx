import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="footer-brand">
              PK <span>Enterprises</span>
            </div>

            <p className="text-sm leading-relaxed max-w-md mt-4 text-black/70">
              Premium packaging manufacturer based in Ghaziabad, Uttar Pradesh.
              Delivering high-quality corrugated boxes, cartons, paper bags, and
              custom packaging solutions to businesses across India.
            </p>

            <div className="footer-contact mt-6">
              <p>
                📍 1149, Saddique Nagar, Meerut Road, Ghaziabad, U.P. - 201001
              </p>
              <p>
                📞{" "}
                <a href="tel:9811947407" className="footer-link-inline">
                  9811947407
                </a>
              </p>
              <p>
                ✉️{" "}
                <a
                  href="mailto:pkenterprises0009@gmail.com"
                  className="footer-link-inline"
                >
                  pkenterprises0009@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-title">Categories</h4>

            {categories.slice(0, 6).map((category) => (
              <Link
                key={category._id}
                to={`/categories/${category.slug}`}
                className="footer-link"
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>

            <Link to="/" className="footer-link">
              Home
            </Link>

            <Link to="/categories" className="footer-link">
              Categories
            </Link>

            <Link to="/products" className="footer-link">
              Products
            </Link>

            <Link to="/contact-us" className="footer-link">
              Get a Quote
            </Link>

            <Link to="/admin/login" className="footer-link">
              Admin Login
            </Link>
          </div>
        </div>

        <div className="footer-bottom flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>
            © {new Date().getFullYear()} PK Enterprises. All Rights Reserved.
          </span>

          <span>Owned & Operated by Mr. Kamal</span>
        </div>
      </div>
    </footer>
  );
}
