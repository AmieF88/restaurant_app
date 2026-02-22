import { useState } from "react";

export default function Chatbot() {
  const [history, setHistory] = useState([
    { role: "assistant", content: "Hi! I’m your waiter. Ask me about our menu." },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;

    const nextHistory = [...history, { role: "user", content: q }];
    setHistory(nextHistory);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_CHATBOT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history: nextHistory }),
      });

      const data = await res.json();
      setHistory((prev) => [
        ...prev,
        { role: "assistant", content: data.answer || "Sorry, try again." },
      ]);
    } catch (err) {
      console.error(err);
      setHistory((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "0 auto" }}>
      <h1>Chatbot</h1>

      <div style={{ border: "1px solid #555", padding: 12, borderRadius: 10, minHeight: 250 }}>
        {history.map((m, i) => (
          <p key={i}>
            <b>{m.role === "user" ? "You" : "Waiter"}:</b> {m.content}
          </p>
        ))}
        {loading && <p><i>Thinking...</i></p>}
      </div>

      <form onSubmit={handleSend} style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about the menu..."
          style={{ flex: 1, padding: 10 }}
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}