import { useState } from "react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();

      if (typeof data?.text !== "string") {
        throw new Error("Invalid response from chat API");
      }

      setMessages([...newMessages, { role: "assistant", content: data.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>
      {open ? (
        <div style={{ width: 340, background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#1a1a2e", color: "#fff", padding: "12px 16px", borderRadius: "12px 12px 0 0", display: "flex", justifyContent: "space-between" }}>
            <span>📸 Lens Photography</span>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ height: 300, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.length === 0 && <p style={{ color: "#888", fontSize: 14 }}>Hi! Ask me about photography sessions, pricing, or booking in Djerba 🌴</p>}
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "#f5a623" : "#f0f0f0", color: m.role === "user" ? "#fff" : "#333", padding: "8px 12px", borderRadius: 8, maxWidth: "80%", fontSize: 14 }}>
                {m.content}
              </div>
            ))}
            {loading && <div style={{ alignSelf: "flex-start", color: "#888", fontSize: 13 }}>Typing...</div>}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #eee", padding: 8, gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Type a message..."
              style={{ flex: 1, border: "1px solid #ddd", borderRadius: 8, padding: "8px 12px", fontSize: 14, outline: "none" }}
            />
            <button onClick={send} style={{ background: "#f5a623", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#fff", fontWeight: "bold" }}>→</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{ background: "#f5a623", border: "none", borderRadius: "50%", width: 56, height: 56, fontSize: 24, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>📸</button>
      )}
    </div>
  );
}