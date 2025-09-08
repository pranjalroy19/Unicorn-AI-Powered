// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ darkMode, toggleTheme }) {
  return React.createElement(
    "nav",
    {
      className:
        "flex justify-between items-center p-4 shadow-md bg-gray-100 dark:bg-gray-800",
    },

    // Left: Brand
    React.createElement(
      "h1",
      { className: "text-xl font-bold text-gray-900 dark:text-white" },
      "Unicorn AI"
    ),

    // Right: Links
    React.createElement(
      "div",
      { className: "flex items-center gap-6" },
      [
        React.createElement(
          Link,
          {
            to: "/",
            className: "text-gray-800 dark:text-gray-200 hover:text-blue-500",
            key: "home",
          },
          "Home"
        ),
        React.createElement(
          Link,
          {
            to: "/dashboard",
            className: "text-gray-800 dark:text-gray-200 hover:text-blue-500",
            key: "dashboard",
          },
          "Dashboard"
        ),
        React.createElement(
          Link,
          {
            to: "/login",
            className: "text-gray-800 dark:text-gray-200 hover:text-blue-500",
            key: "login",
          },
          "Login"
        ),
        React.createElement(
          Link,
          {
            to: "/register",
            className: "text-gray-800 dark:text-gray-200 hover:text-blue-500",
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
