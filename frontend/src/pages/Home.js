import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const features = [
  { id: "summarizer", title: "Text Summarizer", description: "Get a short summary from long text." },
  { id: "blog", title: "Blog Writer", description: "Generate blog articles from topics." },
  { id: "Content_Formatter", title: "Multiple Content Formats", description: "Generate emails, LinkedIn posts, tweets, product descriptions, YouTube scripts." },
  { id: "f5", title: "Coming Soon" },
];

const featureRoutes = {
  summarizer: "/summarizer",
  blog: "/blog",
  Content_Formatter: "/multi-content",
};

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cardRefs = useRef({});
  const navigate = useNavigate();

  const filteredFeatures =
    searchTerm.trim() === ""
      ? features
      : features.filter((f) =>
          f.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleFeatureClick = (featureId) => {
    if (featureRoutes[featureId]) {
      navigate(featureRoutes[featureId]); // Navigate to new page
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        message: userMessage,
      });
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
      {/* Feature Cards */}
      <div className="feature-cards">
        {filteredFeatures.map((f) => (
          <div
            key={f.id}
            ref={(el) => (cardRefs.current[f.id] = el)}
            onClick={() => handleFeatureClick(f.id)}
            className={`feature-card ${f.title ? "clickable" : "disabled"}`}
          >
            <h2>{f.title}</h2>
            {f.description && <p>{f.description}</p>}
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
            {loading && <div className="chat-message assistant">Typing...</div>}
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

      {!isChatOpen && (
        <button className="chat-floating-btn" onClick={() => setIsChatOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
}

export default Home;
