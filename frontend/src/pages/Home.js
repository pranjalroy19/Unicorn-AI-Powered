// src/pages/Home.js
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  { id: "f4" },
  { id: "f5" },
  { id: "f6" },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const cardRefs = useRef({});
  const navigate = useNavigate();

  // 🔍 Scroll to matched card on search
  useEffect(() => {
    if (searchTerm.trim() === "") return;

    const match = features.find(
      (f) =>
        f.title && f.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (match && cardRefs.current[match.id]) {
      cardRefs.current[match.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
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
            onClick={() => {
              if (!f.title) return; // ignore "Coming soon" cards
              navigate(`/feature/${f.id}`);
            }}
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
    </div>
  );
}

export default Home;
