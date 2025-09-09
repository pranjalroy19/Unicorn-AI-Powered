// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import heroImg from "../assets/robot_female.png"; // <-- place your AI image at src/assets/ai-photo.png

function Register({ darkMode }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const pageClass = darkMode ? "register-page dark" : "register-page";

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    // TODO: call your API here
    console.log("Register Data:", formData);

    setMessage({ type: "success", text: "Registered successfully!" });
    setFormData({ name: "", email: "", password: "" });

    // redirect AFTER showing success message
    setTimeout(() => navigate("/login"), 900);
  };

  return (
    <div className={pageClass}>
      <div className="register-card">
        <div className="register-left">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Create account</h2>

            <div className="input">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            <div className="input">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                type="email"
              />
            </div>

            <div className="input">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
              />
            </div>

            <button type="submit">Register</button>

            {message.text && (
              <p className={message.type === "success" ? "register-success" : "register-error"}>
                {message.text}
              </p>
            )}
          </form>
        </div>

        <div
          className="register-right"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="credit">Powered by AI</div>
        </div>
      </div>
    </div>
  );
}

export default Register;
