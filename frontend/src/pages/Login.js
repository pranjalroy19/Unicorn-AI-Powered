// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../context/UserContext.js"; // ✅ import context
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const { setUser } = useUser(); // ✅ get setUser from context

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    // ✅ Check if user already registered
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const existingUser = registeredUsers.find(
      (user) => user.email === formData.email
    );

    // Use registered username if exists, otherwise create dynamic username from email
    const username = existingUser?.username || formData.email.split("@")[0];

    // Create user data for context & storage
    const userData = {
      username, // ✅ dynamic username
      email: formData.email,
      theme: "light",
      language: "en",
      profilePic: null,
    };

    // Save login state & user data
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // ✅ update context

    setMessage({ type: "success", text: "Login successful!" });

    // ✅ redirect to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <motion.div
      className="auth-page login"
      style={{ backgroundColor: "#0f172a" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="auth-card floating">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          {message.text && (
            <p
              className={message.type === "success" ? "auth-success" : "auth-error"}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
