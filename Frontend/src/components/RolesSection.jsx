import { ROLE_CARDS } from "../assets/data/landingData";
 
export default function RolesSection() {
  return (
    <section>
      <div className="section-container">

        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-label">Who Is It For</p>
          <h2 className="section-title">Two roles, one platform</h2>
          <p className="section-subtitle">
            Students find and apply for opportunities.
            Admins manage the entire placement operation.
          </p>
        </div>

        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap:                 "24px",
          maxWidth:            "800px",
          margin:              "0 auto",
        }} className="grid-3">
          {ROLE_CARDS.map((role, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ borderTop: `3px solid ${role.accentColor}` }}
            >
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>
                {role.icon}
              </div>
 
              <h3 style={{
                fontFamily:   "'Sora', sans-serif",
                fontSize:     "22px",
                fontWeight:   700,
                color:        "#fff",
                marginBottom: "20px",
              }}>
                {role.title}
              </h3>

              <ul style={{
                listStyle:     "none",
                display:       "flex",
                flexDirection: "column",
                gap:           "12px",
              }}>
                {role.points.map((point, j) => (
                  <li key={j} style={{
                    display:    "flex",
                    alignItems: "flex-start",
                    gap:        "10px",
                    fontSize:   "14px",
                    color:      "#C4CADA",
                    lineHeight: 1.6,
                  }}>
                    <span style={{ color: role.accentColor, marginTop: "2px", flexShrink: 0 }}>
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}