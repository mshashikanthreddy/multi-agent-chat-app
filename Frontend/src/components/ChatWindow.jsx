import { useEffect, useRef, useState } from "react";
import api from "../api/axios";

function ChatWindow({ agent }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Reset chat when agent changes
  useEffect(() => {
    setMessages([]);
  }, [agent]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!agent) {
    return <div style={{ flex: 1, padding: 10 }}>Select an agent to start chat</div>;
  }

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post(`/agents/${agent._id}/chat`, {
        message: userMsg.content
      });

      const aiMsg = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error getting response" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 10 }}>
      <h4>Chat with {agent.name}</h4>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: 10,
          marginBottom: 10
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              textAlign: m.role === "user" ? "right" : "left",
              margin: "6px 0"
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: 6,
                background: m.role === "user" ? "#d1e7dd" : "#f1f1f1"
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
        {loading && <p>Typing…</p>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1 }}
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;


