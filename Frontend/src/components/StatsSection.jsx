import { STATS } from "../assets/data/landingData";
 
export default function StatsSection() {
  return (
    <section id="stats">
      <div className="section-container">
        <div style={{
          display:             "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap:                 "20px",
        }} className="grid-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div style={{
                fontFamily:    "'Sora', sans-serif",
                fontSize:      "38px",
                fontWeight:    800,
                color:         "#fff",
                letterSpacing: "-1px",
                marginBottom:  "6px",
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "14px", color: "#8892A4" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}