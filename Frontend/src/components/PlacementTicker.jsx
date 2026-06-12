import { TICKER_ITEMS } from "../assets/data/landingData";
 
 
export default function PlacementTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
 
  return (
    <div style={{
      background:   "rgba(79, 110, 247, 0.07)",
      borderTop:    "1px solid rgba(79, 110, 247, 0.18)",
      borderBottom: "1px solid rgba(79, 110, 247, 0.18)",
      overflow:     "hidden",
      padding:      "10px 0",
      userSelect:   "none",  
    }}>
      <div style={{
        position:   "absolute",
        left:       0,
        background: "linear-gradient(90deg, #0A1628 60%, transparent)",
        height:     "100%",
        width:      "120px",
        zIndex:     2,
        display:    "flex",
        alignItems: "center",
        paddingLeft:"16px",
        pointerEvents: "none",
      }}>
        <span style={{
          fontSize:    "11px",
          fontWeight:  700,
          color:       "#4F6EF7",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          whiteSpace:  "nowrap",
        }}>
          🔴 Live Placements
        </span>
      </div>

      <div style={{
        display:   "flex",
        animation: "ticker 32s linear infinite",
        width:     "max-content",
      }}>
        {doubled.map((item, i) => (
          <div key={i} style={{
            display:     "inline-flex",
            alignItems:  "center",
            gap:         "8px",
            padding:     "0 40px",
            whiteSpace:  "nowrap",
          }}>
            <span style={{
              background:  "rgba(79, 110, 247, 0.2)",
              color:       "#7B93FF",
              padding:     "2px 9px",
              borderRadius:"4px",
              fontSize:    "12px",
              fontWeight:  600,
            }}>
              {item.company}
            </span>
 
            <span style={{ fontSize: "13px", color: "#C4CADA" }}>
              {item.role}
            </span>

            <span style={{
              fontSize:   "13px",
              fontWeight: 600,
              color:      "#F5A623",
            }}>
              {item.package}
            </span>

            <span style={{ color: "rgba(255,255,255,0.12)", margin: "0 8px" }}>•</span>
          </div>
        ))}
      </div>
    </div>
  );
}