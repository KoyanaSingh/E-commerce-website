import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="font-serif text-xl font-bold text-white mb-3">
              PK <span className="text-gold">Enterprises</span>
            </div>
            <p className="text-sm leading-relaxed font-light max-w-xs">
              Premium packaging manufacturer based in Ghaziabad, U.P. Serving
              businesses across India with custom boxes, labels, tags and carry
              bags.
            </p>
            <div className="mt-5 space-y-1 text-sm">
              <p>📍 1149, Saddique Nagar, Meerut Road, Ghaziabad U.P-201001</p>
              <p>
                📞{" "}
                <a
                  href="tel:9811947407"
                  className="hover:text-gold-light transition-colors"
                >
                  9811947407
                </a>
              </p>
              <p>
                ✉️{" "}
                <a
                  href="mailto:pkenterprises0009@gmail.com"
                  className="hover:text-gold-light transition-colors"
                >
                  pkenterprises0009@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase font-semibold text-gold mb-4">
              Products
            </h4>
            {["Custom Boxes", "Stickers & Labels", "Tags", "Carry Bags"].map(
              (p) => (
                <Link
                  key={p}
                  to="/products"
                  className="block text-sm text-white/40 hover:text-gold-light transition-colors mb-2"
                >
                  {p}
                </Link>
              ),
            )}
          </div>

          <div>
            <h4 className="text-[11px] tracking-[2px] uppercase font-semibold text-gold mb-4">
              Quick Links
            </h4>
            {[
              ["/", "Home"],
              ["/products", "All Products"],
              ["/contact", "Get a Quote"],
              ["/admin/login", "Admin Login"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="block text-sm text-white/40 hover:text-gold-light transition-colors mb-2"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gold/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/25">
          <span>
            © {new Date().getFullYear()} PK Enterprises. All rights reserved.
          </span>
          <span>Owner: Mr. Kamal</span>
        </div>
      </div>
    </footer>
  );
}
