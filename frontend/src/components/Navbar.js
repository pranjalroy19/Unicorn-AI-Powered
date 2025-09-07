import { useState } from "react";
import "./Navbar.css";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">Unicorn AI</div>

        {/* Desktop Menu */}
        <div className="menu">
          <a href="/">Home</a>
          <a href="/summarizer">Summarizer</a>
          <a href="/blog-writer">Blog Writer</a>
          <a href="/chat">Chat Assistant</a>
          <a href="/dashboard">Dashboard</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu">
          <a href="/">Home</a>
          <a href="/summarizer">Summarizer</a>
          <a href="/blog-writer">Blog Writer</a>
          <a href="/chat">Chat Assistant</a>
          <a href="/dashboard">Dashboard</a>
        </div>
      )}
    </nav>
  );
}
