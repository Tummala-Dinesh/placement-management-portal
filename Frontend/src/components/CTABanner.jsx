import { useNavigate } from "react-router-dom";

export default function CTABanner() {
  const navigate = useNavigate();
 
  return (
    <section style={{ padding: "80px 32px" }}>
      <div style={{
        maxWidth:   "900px",
        margin:     "0 auto",
        background: "linear-gradient(135deg, rgba(79,110,247,0.15), rgba(123,147,255,0.06))",
        border:     "1px solid rgba(79,110,247,0.28)",
        borderRadius:"24px",
        padding:    "64px 48px",
        textAlign:  "center",
        position:   "relative",
        overflow:   "hidden",
      }}>

        <div style={{
          position:      "absolute",
          top:           "-60px",
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "320px",
          height:        "200px",
          background:    "radial-gradient(ellipse, rgba(79,110,247,0.22), transparent 70%)",
          pointerEvents: "none",
        }} />
 
        <h2 style={{
          fontFamily:    "'Sora', sans-serif",
          fontSize:      "clamp(26px, 4vw, 36px)",
          fontWeight:    800,
          color:         "#fff",
          letterSpacing: "-0.8px",
          marginBottom:  "16px",
          position:      "relative",
        }}>
          Ready to land your dream role?
        </h2>
 
        <p style={{
          fontSize:     "17px",
          color:        "#8892A4",
          marginBottom: "36px",
          lineHeight:   1.7,
          position:     "relative",
        }}>
          Join thousands of students already using PlaceMe to track, apply,
          and succeed in campus placements.
        </p>
 
        <button
          className="btn-primary"
          onClick={() => navigate("/register")}
          style={{
            padding:      "15px 40px",
            fontSize:     "16px",
            borderRadius: "12px",
            position:     "relative",
          }}
        >
          Create Your Free Account →
        </button>
 
        <p style={{
          marginTop: "16px",
          fontSize:  "13px",
          color:     "rgba(136,146,164,0.6)",
          position:  "relative",
        }}>
          No credit card required. Student registration is completely free.
        </p>
      </div>
    </section>
  );
}