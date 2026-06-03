import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCircleCheck,
  faGear,
  faTruck,
  faStar,
  faMedal,
  faLeaf,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import api from "../utils/api";
import heroPackaging from "../assets/hero-packaging.png";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = API_URL ? API_URL.replace("/api", "") : "";

export default function () {
  const cards = [
    "Corrugated Boxes",
    "Cartons",
    "Paper Bags",
    "Packing Materials",
    "Sheets & Rolls",
    "Custom Packaging",
  ];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="shell hero-grid">
          <div style={{ zIndex: 20 }}>
            <div className="badge">PREMIUM PACKAGING SOLUTIONS</div>
            <h1>
              Packaging That Protects.
              <br />
              Quality That
              <br />
              <span>Builds Trust.</span>
            </h1>
            <p>
              We manufacture premium packaging products that combine safety,
              strength and presentation for modern businesses.
            </p>
            <div className="hero-actions">
              <button className="primary">Explore Products</button>
              <button className="secondary">Get a Free Quote</button>
            </div>
          </div>

          <div
            className="hero-right"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Background Circle */}
            <div
              style={{
                position: "absolute",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, #d1ece8 0%, #edf8f7 50%, #ffffff 100%)",
                zIndex: 0,
              }}
            />

            {/* Main Image */}
            <img
              src={heroPackaging}
              alt="Packaging Products"
              style={{
                width: "100%",
                maxWidth: "450px",
                position: "relative",
                zIndex: 2,
              }}
            />
          </div>

          {/* Premium Quality */}
          <div
            className="floating-icon"
            style={{
              top: "130px",
              left: "800px",
              zIndex: 3,
            }}
          >
            <div className="floating-box">
              <FontAwesomeIcon
                icon={faMedal}
                style={{
                  color: "#0f8a78",
                  fontSize: "30px",
                  transform: "rotate(180deg)",
                }}
              />
            </div>
            <div className="tooltip">Premium Quality</div>
          </div>

          {/* Eco Friendly */}
          <div
            className="floating-icon"
            style={{
              top: "250px",
              right: "80px",
              zIndex: 3,
            }}
          >
            <div className="floating-box">
              <FontAwesomeIcon
                icon={faLeaf}
                style={{
                  color: "#0f8a78",
                  fontSize: "30px",
                }}
              />
            </div>
            <div className="tooltip tooltip-left">Eco Friendly</div>
          </div>

          {/* Custom Packaging */}
          <div
            className="floating-icon"
            style={{
              bottom: "135px",
              left: "640px",
              zIndex: 3,
            }}
          >
            <div className="floating-box">
              <FontAwesomeIcon
                icon={faBoxOpen}
                style={{
                  color: "#0f8a78",
                  fontSize: "30px",
                }}
              />
            </div>
            <div className="tooltip">Custom Packaging</div>
          </div>
        </div>

        <div className="trustbar shell">
          <div className="trust-item">
            <div className="trust-icon">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>

            <div className="trust-content">
              <h4>Premium Quality</h4>
              <p>
                Manufactured using premium-grade materials for maximum
                durability.
              </p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <FontAwesomeIcon icon={faGear} />
            </div>
            <div>
              <h4>Custom Solutions</h4>
              <p>
                Tailor-made solutions designed for your products and brand
                identity
              </p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div>
              <h4>Fast & On-Time Delivery</h4>
              <p>Reliable dispatch and delivery schedules you can depend on.</p>
            </div>
          </div>

          <div className="trust-item">
            <div className="trust-icon">
              <FontAwesomeIcon icon={faStar} />
            </div>
            <div>
              <h4>Trusted by 500+ Businesses</h4>
              <p>
                Building long-term partnerships through quality and reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell categories">
        <div className="heading">
          <div>
            <div className="small">OUR CATEGORIES</div>
            <h2>
              Explore Our Wide Range of <span>Packaging Products</span>
            </h2>
          </div>
          <Link to="/products" className="secondary">
            View All Products
          </Link>
        </div>

        <div className="cards">
          {categories.map((c) => (
            <Link
              key={c._id}
              to={`/categories/${c.slug}`}
              className="card"
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  height: "220px",
                  overflow: "hidden",
                  borderRadius: "12px",
                  marginBottom: "18px",
                  background: "#edf8f7",
                }}
              >
                <img
                  src={`${BASE}/uploads/${c.image}`}
                  alt={c.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* <div className="card-icon">📦</div> */}

              <h3>{c.name}</h3>

              <p>{c.description}</p>

              <span className="card-link">Learn More →</span>
            </Link>
          ))}

          {cards.map((c) => (
            <div className="card" key={c}>
              <div className="card-icon">📦</div>

              <h3>{c}</h3>

              <p>
                Premium packaging solutions engineered for durability,
                protection, and brand presentation.
              </p>

              <span className="card-link">Learn More →</span>
            </div>
          ))}
        </div>

        <div className="stats">
          <div className="stat-card">
            <strong>10+</strong>
            <span>Years of Industry Experience</span>
          </div>

          <div className="stat-card">
            <strong>500+</strong>
            <span>Businesses Served</span>
          </div>

          <div className="stat-card">
            <strong>1000+</strong>
            <span>Orders Successfully Delivered</span>
          </div>

          <div className="stat-card">
            <strong>99%</strong>
            <span>Client Satisfaction Rate</span>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
