import { useNavigate } from "react-router-dom";
import PlacementTicker from "./PlacementTicker";
 
export default function HeroSection() {
  const navigate = useNavigate();
 
  const scrollToHowItWorks = () => {
    document.getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
 
  return (
    <section style={{
      minHeight:      "100vh",
      display:        "flex",
      flexDirection:  "column",
      justifyContent: "center",
      position:       "relative",
      overflow:       "hidden",
      paddingTop:     "68px",
    }}>
 
      <div style={{
        position:   "absolute",
        inset:      0,
        zIndex:     0,
        background: `
          radial-gradient(ellipse 80% 60% at 20% 20%, rgba(79,110,247,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 80% 70%, rgba(123,147,255,0.10) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 60% 10%, rgba(245,166,35,0.07) 0%, transparent 50%),
          #0A1628
        `,
        animation: "meshFloat 12s ease-in-out infinite",
      }} />
 
      {/* ── Subtle Grid Overlay ── */}
      <div style={{
        position:            "absolute",
        inset:               0,
        zIndex:              0,
        backgroundImage:     `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize:      "60px 60px",
        pointerEvents:       "none",
      }} />

      <div style={{
        position:   "relative",
        zIndex:     1,
        maxWidth:   "860px",
        margin:     "0 auto",
        padding:    "80px 32px 60px",
        textAlign:  "center",
        animation:  "fadeUp 0.8s ease both",
      }}>
 

        <div className="badge" style={{ marginBottom: "32px" }}>
          <span style={{
            width: "7px", height: "7px", borderRadius: "50%",
            background: "#F5A623",
            boxShadow: "0 0 8px #F5A623",
            flexShrink: 0,
          }} />
          Placement Season 2025–26 is live
        </div>

        <h1 style={{
          fontFamily:    "'Sora', sans-serif",
          fontSize:      "clamp(36px, 6vw, 62px)", 
          fontWeight:    800,
          lineHeight:    1.1,
          letterSpacing: "-1.5px",
          color:         "#fff",
          marginBottom:  "24px",
        }}>
          Your Campus Career,{" "}
          <span style={{
            background:             "linear-gradient(90deg, #4F6EF7, #7B93FF, #F5A623)",
            WebkitBackgroundClip:   "text",
            WebkitTextFillColor:    "transparent",
            backgroundClip:         "text",
          }}>
            Managed Smartly
          </span>
        </h1>

        <p style={{
          fontSize:     "19px",
          lineHeight:   1.75,
          color:        "#8892A4",
          maxWidth:     "600px",
          margin:       "0 auto 44px",
        }}>
          PlaceMe connects <strong style={{ color: "#C4CADA" }}>students</strong> and{" "}
          <strong style={{ color: "#C4CADA" }}>placement admins</strong> on one platform —
          from job drives and eligibility checks to interview scheduling and offer letters.
        </p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn-primary"
            onClick={() => navigate("/register")}
            style={{ padding: "14px 32px", fontSize: "16px", borderRadius: "12px" }}
          >
            Get Started — It's Free
          </button>
          <button
            className="btn-outline"
            onClick={scrollToHowItWorks}
            style={{ padding: "14px 32px", fontSize: "16px", borderRadius: "12px" }}
          >
            See How It Works →
          </button>
        </div>

        <div style={{
          marginTop:      "52px",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          gap:            "28px",
          flexWrap:       "wrap",
        }}>
          {[
            "🔒 Secure & Role-Based",
            "📱 Mobile Friendly",
            "⚡ Real-Time Updates",
          ].map((text, i) => (
            <span key={i} style={{ fontSize: "13px", color: "#8892A4" }}>
              {text}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <PlacementTicker />
      </div>
    </section>
  );
}