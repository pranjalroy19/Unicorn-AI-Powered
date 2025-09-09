// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import heroImg from "../assets/robot_female.png";

function Register({ darkMode }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const pageClass = darkMode ? "auth-page dark" : "auth-page";

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }
    setMessage({ type: "success", text: "Registered successfully!" });
    setFormData({ name: "", email: "", password: "" });
    setTimeout(() => navigate("/login"), 900);
  };

  return (
    <div className={pageClass}>
      <div className="auth-card" style={{ width: "920px", minHeight: "560px" }}>
        <div className="auth-left">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>
            <div className="input">
              <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="input">
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="input">
              <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Register</button>
            {message.text && (
              <p className={message.type === "success" ? "auth-success" : "auth-error"}>
                {message.text}
              </p>
            )}
          </form>
        </div>
        <div className="auth-right" style={{ backgroundImage: `url(${heroImg})` }}>
          <div className="credit">Powered by AI</div>
        </div>
      </div>
    </div>
  );
}

export default Register;
