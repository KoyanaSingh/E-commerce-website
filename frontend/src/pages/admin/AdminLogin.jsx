import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#fbfcfc] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="font-serif text-2xl font-bold text-ink">
              PK <span style={{ color: "#0f8a78" }}>Enterprises</span>
            </div>
            <p className="text-sm text-muted mt-1">Admin Login</p>
          </div>

          {/* Card */}
          <div className="bg-white border border-gold/15 rounded-2xl shadow-sm p-8">
            <h1
              className="font-serif text-xl font-bold text-ink mb-1"
              style={{ textAlign: "center" }}
            >
              Sign in
            </h1>
            <p
              className="text-sm text-muted mb-6"
              style={{ textAlign: "center" }}
            >
              Access your admin dashboard
            </p>

            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-ink-light mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pkenterprises.com"
                  className="input-field"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-ink-light mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-100 p-2 rounded-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-sm"
              >
                {loading ? "Signing in..." : "Sign In →"}
              </button>
            </form>
          </div>

          {/* Back link */}
          <div className="text-center mt-6">
            <a
              href="/"
              className="text-sm text-muted hover:text-gold transition-colors"
            >
              ← Back to website
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
