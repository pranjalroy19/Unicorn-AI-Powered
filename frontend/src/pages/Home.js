import React, { useState, useRef, useEffect } from "react";
import Summarizer from "../components/Summarizer.js";
import "./Home.css";

const features = [
  {
    id: "summarizer",
    title: "Text Summarizer",
    description: "Get a short summary from long text.",
  },
  {
    id: "blog",
    title: "Blog Writer",
    description: "Generate blog articles from topics.",
  },
  {
    id: "chat",
    title: "Chat Assistant",
    description: "Ask questions and get answers.",
  },
  { id: "f4" }, { id: "f5" }, { id: "f6" },
];

function Home() {
  const [activeFeature, setActiveFeature] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const cardRefs = useRef({});

  // 🔍 When searchTerm changes, scroll to the matched card
  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const match = features.find(
      (f) => f.title && f.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (match && cardRefs.current[match.id]) {
      cardRefs.current[match.id].scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveFeature(match.id);
    }
  }, [searchTerm]);

  return (
    <div className="home-container">
      {/* 🔍 Search box */}
      <div className="feature-search">
        <input
          type="text"
          placeholder="Search a feature..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="feature-cards">
        {features.map((f, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[f.id] = el)}
            onClick={() => f.title && setActiveFeature(f.id)}
            className={`feature-card ${f.title ? "clickable" : "disabled"} ${
              activeFeature === f.id ? "active" : ""
            }`}
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

      {/* Feature content */}
      <div className="feature-content">
        {activeFeature === "summarizer" && <Summarizer />}
        {activeFeature === "blog" && (
          <div className="placeholder">✍️ Blog Writer coming soon...</div>
        )}
        {activeFeature === "chat" && (
          <div className="placeholder">🤖 Chat Assistant coming soon...</div>
        )}
        {!activeFeature && (
          <p className="placeholder">Click on a card to start a feature</p>
        )}
      </div>
    </div>
  );
}

export default Home;
