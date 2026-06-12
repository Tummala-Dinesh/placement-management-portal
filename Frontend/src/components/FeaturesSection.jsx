import { FEATURES } from "../assets/data/landingData";
 
export default function FeaturesSection() {
  return (
    <section id="features">
      <div className="section-container">

        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-label">Platform Features</p>
          <h2 className="section-title">Everything placement, in one place</h2>
          <p className="section-subtitle">
            Built for the complete placement lifecycle — no external tools,
            no spreadsheets, no chaos.
          </p>
        </div>

        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap:                 "20px",
        }} className="grid-3">
          {FEATURES.map((feature, i) => (
            <div key={i} className="feature-card">

              <div style={{
                width:          "48px",
                height:         "48px",
                borderRadius:   "12px",
                background:     "rgba(79, 110, 247, 0.12)",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                fontSize:       "22px",
                marginBottom:   "18px",
              }}>
                {feature.icon}
              </div>
 
              <h3 style={{
                fontFamily:    "'Sora', sans-serif",
                fontSize:      "17px",
                fontWeight:    700,
                color:         "#fff",
                marginBottom:  "10px",
                letterSpacing: "-0.3px",
              }}>
                {feature.title}
              </h3>
 
              <p style={{ fontSize: "14px", color: "#8892A4", lineHeight: 1.7 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}