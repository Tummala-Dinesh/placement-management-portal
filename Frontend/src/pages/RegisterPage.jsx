import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../utils/api";
 
const DEPARTMENTS = [
  "Computer Science Engineering",
  "Electronics & Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Information Technology",
  "Chemical Engineering",
  "Biotechnology",
  "Other",
];
 
export default function RegisterPage() {
  const navigate = useNavigate();
 
  const [form, setForm] = useState({
    fullName:        "",
    email:           "",
    rollNumber:      "",
    department:      "",
    cgpa:            "",
    password:        "",
    confirmPassword: "",
  });
 
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
 
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };
 
  const validate = () => {
    if (!form.fullName || !form.email || !form.rollNumber ||
        !form.department || !form.cgpa || !form.password || !form.confirmPassword) {
      return "Please fill in all fields.";
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      return "Please enter a valid email address.";
    }
    const cgpaNum = parseFloat(form.cgpa);
    if (isNaN(cgpaNum) || cgpaNum < 0 || cgpaNum > 10) {
      return "CGPA must be a number between 0 and 10.";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }
    return null;
  };
 
  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
 
    setLoading(true);
    try {
      const { confirmPassword, ...payload } = form;
      payload.cgpa = parseFloat(payload.cgpa);
 
      await authAPI.register(payload);
 
      setSuccess("Account created! Redirecting to login…");
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div style={{
      minHeight:      "100vh",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      background:     "#0A1628",
      padding:        "40px 24px",
      position:       "relative",
      overflow:       "hidden",
    }}>
      <div style={{
        position:   "absolute",
        top:        "-80px",
        left:       "50%",
        transform:  "translateX(-50%)",
        width:      "600px",
        height:     "400px",
        background: "radial-gradient(ellipse, rgba(79,110,247,0.13), transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        background:   "rgba(15,31,61,0.95)",
        border:       "1px solid rgba(79,110,247,0.2)",
        borderRadius: "20px",
        padding:      "44px 40px",
        width:        "100%",
        maxWidth:     "480px",
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
          <div style={{ fontSize: "36px", marginBottom: "12px" }}>🧑‍🎓</div>
          <h1 style={{
            fontFamily:   "'Sora', sans-serif",
            fontSize:     "24px",
            fontWeight:   700,
            color:        "#fff",
            marginBottom: "6px",
          }}>
            Create your account
          </h1>
          <p style={{ fontSize: "14px", color: "#8892A4" }}>
            Student registration — free forever
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

          <div>
            <label style={labelStyle}>Full Name</label>
            <input className="form-input" name="fullName" placeholder="Arjun Sharma"
              value={form.fullName} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>College Email</label>
            <input className="form-input" name="email" type="email"
              placeholder="arjun@college.edu"
              value={form.email} onChange={handleChange} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={labelStyle}>Roll Number</label>
              <input className="form-input" name="rollNumber" placeholder="21CSE045"
                value={form.rollNumber} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>CGPA (out of 10)</label>
              <input className="form-input" name="cgpa" type="number"
                placeholder="8.5" min="0" max="10" step="0.1"
                value={form.cgpa} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Department</label>
            <select
              className="form-input"
              name="department"
              value={form.department}
              onChange={handleChange}
              style={{ cursor: "pointer" }}
            >
              <option value="" disabled>Select your department</option>
              {DEPARTMENTS.map((dept, i) => (
                <option key={i} value={dept} style={{ background: "#0F1F3D" }}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input className="form-input" name="password" type="password"
              placeholder="At least 6 characters"
              value={form.password} onChange={handleChange} />
          </div>

          <div>
            <label style={labelStyle}>Confirm Password</label>
            <input className="form-input" name="confirmPassword" type="password"
              placeholder="Re-enter your password"
              value={form.confirmPassword} onChange={handleChange} />
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

          {success && (
            <div style={{
              background:   "rgba(52,199,89,0.1)",
              border:       "1px solid rgba(52,199,89,0.3)",
              borderRadius: "8px",
              padding:      "10px 14px",
              fontSize:     "13px",
              color:        "#86EFAC",
            }}>
              ✅ {success}
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
            {loading ? "Creating account…" : "Create Account →"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", color: "#8892A4" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#7B93FF", fontWeight: 600 }}>
              Sign in
            </Link>
          </p>
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