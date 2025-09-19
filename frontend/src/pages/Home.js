// src/pages/Home.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

const features = [
  { id: "summarizer", title: "Text Summarizer", description: "Get a short summary from long text." },
  { id: "blog", title: "Blog Writer", description: "Generate blog articles from topics." },
  { id: "chat", title: "Chat Assistant", description: "Ask questions and get answers." },
  { id: "f4", title: "Coming Soon" },
  { id: "f5", title: "Coming Soon" },
  { id: "f6", title: "Coming Soon" },
];

const featureRoutes = {
  summarizer: "/summarizer",
  blog: "/blog",
  chat: null,
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

  // live suggestions (Google-like)
  const suggestions = features.filter(
    (f) =>
      f.title &&
      searchTerm.trim() !== "" &&
      f.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFeatures =
    searchTerm.trim() === ""
      ? features
      : features.filter((f) =>
          f.title?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const handleSelectSuggestion = (title) => {
    setSearchTerm(title);
    setShowSuggestions(false);
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
      {/* Search box */}
      <div className="feature-search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search a feature..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setShowSuggestions(false);
            }
          }}
        />

        {/* Google-style suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((f) => (
              <li key={f.id} onClick={() => handleSelectSuggestion(f.title)}>
                {f.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Feature cards */}
      <div className="feature-cards">
        {filteredFeatures.map((f) => (
          <div
            key={f.id}
            ref={(el) => (cardRefs.current[f.id] = el)}
            onClick={() => {
              if (f.id === "chat") {
                setIsChatOpen(true);
              } else if (featureRoutes[f.id]) {
                navigate(featureRoutes[f.id]);
              }
            }}
            className={`feature-card ${f.title ? "clickable" : "disabled"}`}
          >
            {f.title ? (
              <>
                <h2>{f.title}</h2>
                {f.description && <p>{f.description}</p>}
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
