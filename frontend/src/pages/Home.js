// src/pages/Home.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // ✅ import axios
import "./Home.css";

const features = [
  { id: "summarizer", title: "Text Summarizer", description: "Get a short summary from long text." },
  { id: "blog", title: "Blog Writer", description: "Generate blog articles from topics." },
  { id: "chat", title: "Chat Assistant", description: "Ask questions and get answers." },
  { id: "f4" }, { id: "f5" }, { id: "f6" },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // Loading indicator for AI
  const cardRefs = useRef({});

  // Scroll to card on search
  useEffect(() => {
    if (!searchTerm) return;
    const match = features.find(
      (f) => f.title && f.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (match && cardRefs.current[match.id]) {
      cardRefs.current[match.id].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [searchTerm]);

  // Send message to AI
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/ai/chat", { message: userMessage });
      const reply = res.data.reply;
      setMessages((prev) => [...prev, { sender: "assistant", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: "Sorry, something went wrong!" },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Search box */}
      <div className="feature-search">
        <input
          type="text"
          placeholder="Search a feature..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Feature cards */}
      <div className="feature-cards">
        {features.map((f, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[f.id] = el)}
            onClick={() => f.id === "chat" && setIsChatOpen(true)}
            className={`feature-card ${f.title ? "clickable" : "disabled"}`}
          >
            {f.title ? (
              <>
                <h2>{f.title}</h2>
                <p>{f.description}</p>
              </>
            ) : (
              <span>Coming soon</span>
            )}
          </div>
        ))}
      </div>

      {/* Chat Widget */}
      {isChatOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <span>Chat Assistant</span>
            <button onClick={() => setIsChatOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`chat-message ${m.sender === "user" ? "user" : "assistant"}`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="chat-message assistant">Typing...</div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      {/* Floating button */}
      {!isChatOpen && (
        <button className="chat-floating-btn" onClick={() => setIsChatOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
}

export default Home;
