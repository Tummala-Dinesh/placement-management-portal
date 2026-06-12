import { STEPS } from "../assets/data/landingData";
 
 
export default function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{
      background:   "rgba(255,255,255,0.02)",
      borderTop:    "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-label">The Flow</p>
          <h2 className="section-title">How PlaceMe works</h2>
          <p className="section-subtitle">
            From a company's hiring intent to a student's signed offer —
            every step on one platform.
          </p>
        </div>

        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap:                 "16px",
          position:            "relative",
        }} className="grid-5">
          {STEPS.map((step, i) => (
            <div key={i} className="step-card" style={{ position: "relative" }}>
 
              {i < STEPS.length - 1 && (
                <div style={{
                  position:   "absolute",
                  top:        "38px",
                  right:      "-8px",
                  width:      "16px",
                  height:     "2px",
                  background: "rgba(79, 110, 247, 0.3)",
                  zIndex:     1,
                }} className="hide-mobile" />
              )}

              <div style={{
                fontFamily:   "'Sora', sans-serif",
                fontSize:     "13px",
                fontWeight:   700,
                color:        "#4F6EF7",
                marginBottom: "10px",
              }}>
                {step.num}
              </div>

              <span style={{
                display:      "inline-block",
                background:   `${step.color}18`,
                color:        step.color,
                padding:      "2px 10px",
                borderRadius: "4px",
                fontSize:     "11px",
                fontWeight:   600,
                marginBottom: "14px",
              }}>
                {step.role}
              </span>

              <p style={{ fontSize: "13px", color: "#C4CADA", lineHeight: 1.65 }}>
                {step.action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}