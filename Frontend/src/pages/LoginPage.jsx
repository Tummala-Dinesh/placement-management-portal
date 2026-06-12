import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../utils/api";
 
export default function LoginPage() {
  const navigate  = useNavigate();
  const { login } = useAuth();
 
  const [form,   setForm]   = useState({ email: "", password: "" });
  const [error,  setError]  = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };
 
  const handleSubmit = async () => {

    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
 
    setLoading(true);
    try {
      const res  = await authAPI.login(form);
      const { token, user } = res.data;
 
      login(user, token);

      if (user.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/student");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };
 
  return (
    <div style={{
      minHeight:      "100vh",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      background:     "#0A1628",
      padding:        "24px",
      position:       "relative",
      overflow:       "hidden",
    }}>

      <div style={{
        position:   "absolute",
        top:        "-100px",
        left:       "50%",
        transform:  "translateX(-50%)",
        width:      "600px",
        height:     "400px",
        background: "radial-gradient(ellipse, rgba(79,110,247,0.15), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        background:   "rgba(15,31,61,0.95)",
        border:       "1px solid rgba(79,110,247,0.2)",
        borderRadius: "20px",
        padding:      "44px 40px",
        width:        "100%",
        maxWidth:     "420px",
        animation:    "fadeUp 0.4s ease both",
        position:     "relative",
      }}>

        <Link to="/" style={{
          display:      "inline-flex",
          alignItems:   "center",
          gap:          "6px",
          fontSize:     "13px",
          color:        "#8892A4",
          marginBottom: "28px",
          transition:   "color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = "#fff"}
          onMouseLeave={e => e.currentTarget.style.color = "#8892A4"}
        >
          ← Back to home
        </Link>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🎓</div>
          <h1 style={{
            fontFamily:   "'Sora', sans-serif",
            fontSize:     "24px",
            fontWeight:   700,
            color:        "#fff",
            marginBottom: "6px",
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: "14px", color: "#8892A4" }}>
            Sign in to your PlaceMe account
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
 
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              className="form-input"
              name="email"
              type="email"
              placeholder="you@college.edu"
              value={form.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />
          </div>
 
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={labelStyle}>Password</label>
              <a href="#" style={{ fontSize: "12px", color: "#4F6EF7" }}>
                Forgot password?
              </a>
            </div>
            <input
              className="form-input"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div style={{
              background:   "rgba(239,68,68,0.1)",
              border:       "1px solid rgba(239,68,68,0.3)",
              borderRadius: "8px",
              padding:      "10px 14px",
              fontSize:     "13px",
              color:        "#FCA5A5",
            }}>
              ⚠️ {error}
            </div>
          )}
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width:        "100%",
              padding:      "13px",
              borderRadius: "10px",
              marginTop:    "4px",
              opacity:      loading ? 0.7 : 1,
              cursor:       loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
 
          {/* Register link */}
          <p style={{ textAlign: "center", fontSize: "13px", color: "#8892A4" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#7B93FF", fontWeight: 600 }}>
              Register free
            </Link>
          </p>
        </div>
 
        {/* Admin note */}
        <div style={{
          marginTop:    "24px",
          padding:      "12px 16px",
          background:   "rgba(255,255,255,0.03)",
          borderRadius: "8px",
          fontSize:     "12px",
          color:        "rgba(136,146,164,0.7)",
          textAlign:    "center",
          lineHeight:   1.6,
        }}>
          🛡️ Admin? Use your admin credentials — role access is managed by the backend.
        </div>
      </div>
    </div>
  );
}
 
const labelStyle = {
  display:      "block",
  fontSize:     "13px",
  fontWeight:   500,
  color:        "#C4CADA",
  marginBottom: "6px",
};