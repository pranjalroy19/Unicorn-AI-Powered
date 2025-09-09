// src/pages/Dashboard.js
import React, { useState } from "react";
import "./DashboardPage.css";
import {
  FaChartLine,
  FaTasks,
  FaUserFriends,
  FaCog,
  FaSignOutAlt,
  FaPaperPlane,
  FaRobot,
  FaClock,
  FaTachometerAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! I’m your Unicorn AI assistant 🦄. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [chatOpen, setChatOpen] = useState(true);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");

    // Mock AI reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "I got your message: " + input },
      ]);
    }, 1000);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Unicorn</h2>
        <nav className="menu">
          <a href="#" className="active">
            <FaChartLine /> Overview
          </a>
          <a href="#">
            <FaTasks /> Tasks
          </a>
          <a href="#">
            <FaUserFriends /> Team
          </a>
          <a href="#">
            <FaCog /> Settings
          </a>
        </nav>
        <button className="logout">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main">
        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="user-info">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="user-avatar"
            />
            <span className="username">Pranjal</span>
          </div>
        </header>

        {/* Cards Grid */}
        <section className="cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>1,245</p>
          </div>
          <div className="card">
            <h3>Active Tasks</h3>
            <p>87</p>
          </div>
          <div className="card">
            <h3><FaClock /> Screen Time</h3>
            <p>5h 20m</p>
          </div>
          <div className="card">
            <h3><FaTachometerAlt /> Performance</h3>
            <p>92%</p>
          </div>
        </section>

        {/* Activity Section */}
        <section className="activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>
              User <strong>Aryan</strong> completed a task ✅
            </li>
            <li>
              New member <strong>Kavya</strong> joined the team 👋
            </li>
            <li>
              Screen time decreased by <strong>20m</strong> ⏳
            </li>
          </ul>
        </section>

        {/* Chatbot Section */}
        <section className={`chatbot ${chatOpen ? "open" : "closed"}`}>
          <header
            className="chatbot-header"
            onClick={() => setChatOpen(!chatOpen)}
          >
            <FaRobot /> Unicorn AI Assistant
          </header>
          {chatOpen && (
            <div className="chatbot-body">
              <div className="chat-messages">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`chat-message ${msg.from}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
