import { useEffect, useState } from "react";
import { getMistakes } from "../services/api";

export default function MistakesPanel({ refreshTrigger }) {
  const [mistakes, setMistakes] = useState([]);

  const loadMistakes = () => {
    getMistakes().then((res) => setMistakes(res.data));
  };

  useEffect(() => {
    loadMistakes();
  }, [refreshTrigger]); // reload whenever refreshTrigger changes

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Mistakes</h2>
      {mistakes.length === 0 && <p>No mistakes reported yet.</p>}

      {mistakes.map((m) => (
        <div
          key={m.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div>
            <strong>User Input:</strong>
            <div style={{ marginLeft: "10px" }}>{m.query}</div>
          </div>

          <div style={{ marginTop: "5px" }}>
            <strong>Bot Response:</strong>
            <div style={{ marginLeft: "10px" }}>{m.botResponse}</div>
          </div>

          <div style={{ marginTop: "5px", color: "red" }}>
            <strong>Error Type:</strong> {m.errorType}
          </div>

          {m.resolved && (
            <div style={{ marginTop: "5px", color: "green" }}>✅ Fixed</div>
          )}
        </div>
      ))}
    </div>
  );
}
