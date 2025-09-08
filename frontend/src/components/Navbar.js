// src/components/Navbar.js
import React from "react";
import "./styles/Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ darkMode, toggleTheme }) {
  return React.createElement(
    "nav",
    {
      className:
        "navbar flex justify-between items-center p-4 shadow-md bg-gray-100 dark:bg-gray-800",
    },

    // Left: Brand
    React.createElement(
      "h1",
      {
        className:
          "navbar-title text-xl font-bold text-gray-900 dark:text-white",
      },
      "Unicorn AI"
    ),

    // Right: Links
    React.createElement(
      "div",
      { className: "navbar-links flex items-center gap-6" },
      [
        React.createElement(
          Link,
          {
            to: "/",
            className:
              "text-gray-800 dark:text-gray-200 hover:text-blue-500 transition",
            key: "home",
          },
          "Home"
        ),
        React.createElement(
          Link,
          {
            to: "/dashboard",
            className:
              "text-gray-800 dark:text-gray-200 hover:text-blue-500 transition",
            key: "dashboard",
          },
          "Dashboard"
        ),
        React.createElement(
          Link,
          {
            to: "/login",
            className:
              "text-gray-800 dark:text-gray-200 hover:text-blue-500 transition",
            key: "login",
          },
          "Login"
        ),
        React.createElement(
          Link,
          {
            to: "/register",
            className:
              "text-gray-800 dark:text-gray-200 hover:text-blue-500 transition",
            key: "register",
          },
          "Register"
        ),
        React.createElement(
          "button",
          {
            onClick: toggleTheme,
            className:
              "px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition",
            key: "toggle",
          },
          darkMode ? "Light Mode" : "Dark Mode"
        ),
      ]
    )
  );
}

export default Navbar;
