import { useState } from "react";
import { sendMessage, reportMistake } from "../services/api";
import MistakesPanel from "./MistakesPanel";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [refreshMistakes, setRefreshMistakes] = useState(0);

  const send = async () => {
    const res = await sendMessage({ message: input, userId: "user1" });
    setMessages([
      ...messages,
      { role: "user", text: input },
      { role: "bot", text: res.data.reply },
    ]);
    setInput("");
  };

  const report = async (msg) => {
    const userMsg = messages[messages.indexOf(msg) - 1]?.text || "";

    await reportMistake({
      query: userMsg,
      botResponse: msg.text,
      errorType: "wrong_intent",
    });

    alert("Reported!");
    setRefreshMistakes((prev) => prev + 1);
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>Chat</h2>
      {messages.map((m, i) => (
        <div key={i}>
          <b>{m.role}:</b> {m.text}
          {m.role === "bot" && (
            <button onClick={() => report(m)} style={{ marginLeft: "10px" }}>
              Report
            </button>
          )}
        </div>
      ))}
      <div style={{ marginTop: "10px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginRight: "5px", width: "70%" }}
        />
        <button onClick={send}>Send</button>
      </div>

      {/* Mistakes Panel at the bottom */}
      <MistakesPanel refreshTrigger={refreshMistakes} />
    </div>
  );
}
