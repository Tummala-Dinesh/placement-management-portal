const FOOTER_COLS = [
  {
    title: "Platform",
    links: ["Features", "How It Works", "Student Dashboard", "Admin Dashboard"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Support", "Status Page"],
  },
  {
    title: "Company",
    links: ["About Us", "Blog", "Careers", "Contact"],
  },
];
 
export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding:   "48px 32px 32px",
      maxWidth:  "1100px",
      margin:    "0 auto",
    }}>

      <div style={{
        display:        "flex",
        justifyContent: "space-between",
        flexWrap:       "wrap",
        gap:            "40px",
        marginBottom:   "40px",
      }}>

        <div style={{ maxWidth: "260px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{
              width:          "32px",
              height:         "32px",
              borderRadius:   "8px",
              background:     "linear-gradient(135deg, #4F6EF7, #7B93FF)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontSize:       "16px",
            }}>🎓</div>
            <span style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              fontSize:   "16px",
              color:      "#fff",
            }}>
              PlaceMe<span style={{ color: "#4F6EF7" }}>.</span>
            </span>
          </div>
          <p style={{ fontSize: "13px", color: "#8892A4", lineHeight: 1.7 }}>
            The modern college placement management platform for students and placement officers.
          </p>
        </div>

        {FOOTER_COLS.map((col, i) => (
          <div key={i}>
            <p style={{
              fontFamily:    "'Sora', sans-serif",
              fontSize:      "13px",
              fontWeight:    700,
              color:         "#fff",
              marginBottom:  "16px",
              letterSpacing: "0.3px",
            }}>
              {col.title}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {col.links.map((link, j) => (
                <a
                  key={j}
                  href="#"
                  style={{ fontSize: "13px", color: "#8892A4", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "#8892A4"}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        borderTop:      "1px solid rgba(255,255,255,0.06)",
        paddingTop:     "24px",
        display:        "flex",
        justifyContent: "space-between",
        alignItems:     "center",
        flexWrap:       "wrap",
        gap:            "12px",
      }}>
        <p style={{ fontSize: "13px", color: "#8892A4" }}>
          © 2026 PlaceMe. Built for campus placement.
        </p>
        <div style={{ display: "flex", gap: "20px" }}>
          {["Privacy Policy", "Terms of Service"].map((text, i) => (
            <a
              key={i}
              href="#"
              style={{ fontSize: "13px", color: "#8892A4", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "#8892A4"}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}