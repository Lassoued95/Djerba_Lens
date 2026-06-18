import { useState } from "react";

const systemPrompt = `You are the official assistant for Djerba Lens, a professional photography and creative services business based in Djerba, Tunisia, run by Mohamed.

## Services Offered:
- Tourist & vacation photography (individuals, couples, families, groups)
- Portrait sessions (professional, personal branding, social media content)
- Food photography (restaurants, cafés, menus, social media)
- Real estate & villa photography (luxury properties, rentals, Airbnb listings)
- Hotel & hospitality photography (rooms, facilities, ambiance)
- Event photography (weddings, private events, corporate)
- Landscape & cultural photography of Djerba

## Pricing:
- Prices vary by session type and duration — always encourage contacting Mohamed directly for an exact quote
- Typical range: affordable for locals, competitive for tourists and businesses
- Packages available for restaurants and real estate agencies (monthly contracts)

## Booking & Contact:
- WhatsApp / Phone: +216 25 740 872
- Best to book 1–2 weeks in advance
- Urgent bookings possible via WhatsApp
- Available 7 days a week, flexible hours including golden hour shoots

## Best Photography Spots in Djerba:
- Houmt Souk medina and markets
- Erriadh village (famous street art / Djerbahood)
- El Ghriba synagogue area
- Djerba beaches (Sidi Mahrez, Aghir)
- Traditional fishing ports
- Djerba Explore / crocodile farm area
- Luxury hotels and seaside villas

## Tone & Rules:
- Be warm, professional, and helpful
- Always end with encouraging the user to contact Mohamed on WhatsApp: +216 25 740 872
- If asked about something unrelated to photography or Djerba Lens services, politely redirect
- Respond in the same language the user writes in (French, English, or Arabic)`;

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

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.text }]);
    setLoading(false);
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