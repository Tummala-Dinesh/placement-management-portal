import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  const NAV_ITEMS = [
    { label: "Features",     id: "features"     },
    { label: "How It Works", id: "how-it-works"  },
    { label: "Stats",        id: "stats"         },
    { label: "About Us",     id: "about"         },
  ];
 
  return (
    <nav style={{
      position:       "fixed",
      top: 0, left: 0, right: 0,
      zIndex:         100,
      padding:        "0 40px",
      height:         "68px",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "space-between",
      background:     scrolled ? "rgba(10,22,40,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom:   scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      transition:     "background 0.35s, backdrop-filter 0.35s, border-bottom 0.35s",
    }}>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ display: "flex", alignItems: "center", gap: "10px",
                 background: "none", border: "none", cursor: "pointer" }}
      >
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(135deg, #4F6EF7, #7B93FF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px",
        }}>🎓</div>
        <span style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 700,
          fontSize: "17px", color: "#fff", letterSpacing: "-0.3px",
        }}>
          PlaceMe<span style={{ color: "#4F6EF7" }}>.</span>
        </span>
      </button>

      <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "36px" }}>
        {NAV_ITEMS.map(({ label, id }) => (
          <button
            key={id}
            className="nav-link"
            onClick={() => scrollToSection(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="hide-mobile" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button className="btn-outline" onClick={() => navigate("/login")}>
          Log In
        </button>
        <button className="btn-primary" onClick={() => navigate("/register")}>
          Register Free
        </button>
      </div>

      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display:    "none",        
          background: "transparent",
          border:     "none",
          color:      "#fff",
          fontSize:   "22px",
          cursor:     "pointer",
        }}
        className="show-mobile-flex" 
        aria-label="Toggle menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {mobileOpen && (
        <div style={{
          position:       "absolute",
          top:            "68px", left: 0, right: 0,
          background:     "rgba(10,22,40,0.97)",
          backdropFilter: "blur(20px)",
          borderBottom:   "1px solid rgba(255,255,255,0.08)",
          padding:        "20px 24px",
          display:        "flex",
          flexDirection:  "column",
          gap:            "20px",
        }}>
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              className="nav-link"
              onClick={() => scrollToSection(id)}
              style={{ textAlign: "left", fontSize: "16px" }}
            >
              {label}
            </button>
          ))}
          <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
            <button className="btn-outline" style={{ flex: 1 }}
              onClick={() => { navigate("/login"); setMobileOpen(false); }}>
              Log In
            </button>
            <button className="btn-primary" style={{ flex: 1 }}
              onClick={() => { navigate("/register"); setMobileOpen(false); }}>
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}