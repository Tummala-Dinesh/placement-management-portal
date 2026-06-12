
const TECH_STACK = ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT Auth", "REST APIs"];
 
export default function AboutSection() {
  return (
    <section id="about" style={{
      background:   "rgba(255,255,255,0.02)",
      borderTop:    "1px solid rgba(255,255,255,0.05)",
    }}>
      <div className="section-container">
        <div style={{ maxWidth: "820px", margin: "0 auto", textAlign: "center" }}>
 
          <p className="section-label">About Us</p>
 
          <h2 className="section-title" style={{ marginBottom: "20px" }}>
            Built to replace spreadsheets and WhatsApp groups
          </h2>
 
          <p style={{
            fontSize:     "17px",
            color:        "#8892A4",
            lineHeight:   1.8,
            marginBottom: "20px",
          }}>
            PlaceMe was born out of frustration with chaotic placement workflows —
            companies emailing Excel sheets, students checking notice boards, and
            officers managing five different spreadsheets simultaneously.
          </p>
 
          <p style={{
            fontSize:   "17px",
            color:      "#8892A4",
            lineHeight: 1.8,
          }}>
            We built a platform where companies reach out to placement admins,
            admins create the drives, eligible students apply, and everyone
            tracks progress in real time — all in one place.
          </p>

          <div style={{
            marginTop:      "40px",
            display:        "flex",
            gap:            "12px",
            justifyContent: "center",
            flexWrap:       "wrap",
          }}>
            {TECH_STACK.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>

          <p style={{
            marginTop:  "36px",
            fontSize:   "14px",
            color:      "rgba(136,146,164,0.6)",
            lineHeight: 1.7,
          }}>
            Developed as a full-stack internship-level project by a two-person team
            — backend powered by Node.js + PostgreSQL, frontend in React.js.
          </p>
        </div>
      </div>
    </section>
  );
}