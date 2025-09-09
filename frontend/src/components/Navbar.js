// src/components/Navbar.js
import React from "react";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      {/* Left: Brand */}
      <h1 className="navbar-title">Unicorn AI</h1>

      {/* Right: Links */}
      <div className="navbar-links">
        <Link to="/" className={window.location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/dashboard"
          className={window.location.pathname === "/dashboard" ? "active" : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/login"
          className={window.location.pathname === "/login" ? "active" : ""}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={window.location.pathname === "/register" ? "active" : ""}
        >
          Register
        </Link>

        {/* Theme Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
