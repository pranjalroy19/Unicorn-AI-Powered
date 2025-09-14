import React from "react";
import { useNavigate } from "react-router-dom";


export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      <header className="navbar">
        <div className="logo" onClick={() => navigate("/")}>🦄 Unicorn AI</div>
      </header>

      <main className="main">
        <h1>About Unicorn AI</h1>
        <p>
          Unicorn AI is an intelligent content management platform that helps users
          generate, summarize, and manage content efficiently. Our platform offers:
        </p>
        <ul>
          <li><strong>Text Summarizer:</strong> Paste an article → get a short summary. Options for Short, Medium, or Detailed summaries.</li>
          <li><strong>Blog/Article Writer:</strong> Input a topic or keywords → AI generates a blog draft. Options: Formal, Casual, Professional.</li>
          <li><strong>Chat Assistant:</strong> A built-in chatbot to answer queries or assist with writing.</li>
        </ul>
        <p>
          Our mission is to empower creators and professionals with smart AI tools
          that save time and enhance productivity.
        </p>
      </main>
    </div>
  );
}
