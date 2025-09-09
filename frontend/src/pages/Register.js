<<<<<<< HEAD
import React, { useState } from "react";
=======
// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 4abbeed0158fd3859e67d8aa17d7c53894ef7432
import "./Register.css";
import heroImg from "../assets/robot_female.png"; // <-- place your AI image at src/assets/ai-photo.png

function Register({ darkMode }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

<<<<<<< HEAD
  const containerClass = darkMode
    ? "register-container dark"
    : "register-container light";
=======
  const pageClass = darkMode ? "register-page dark" : "register-page";
>>>>>>> 4abbeed0158fd3859e67d8aa17d7c53894ef7432

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

<<<<<<< HEAD
=======
    // TODO: call your API here
>>>>>>> 4abbeed0158fd3859e67d8aa17d7c53894ef7432
    console.log("Register Data:", formData);

    setMessage({ type: "success", text: "Registered successfully!" });
    setFormData({ name: "", email: "", password: "" });

    // redirect AFTER showing success message
    setTimeout(() => navigate("/login"), 900);
  };

<<<<<<< HEAD
  return React.createElement(
    "div",
    { className: containerClass },
    [
      React.createElement(
        "div",
        { key: "form-box", className: "form-box" },
        React.createElement(
          "form",
          { className: "register-form", onSubmit: handleSubmit },
          [
            React.createElement("h2", { key: "title" }, "Register"),
            React.createElement("input", {
              key: "name",
              type: "text",
              name: "name",
              placeholder: "NAME",
              value: formData.name,
              onChange: handleChange,
            }),
            React.createElement("input", {
              key: "email",
              type: "email",
              name: "email",
              placeholder: "EMAIL",
              value: formData.email,
              onChange: handleChange,
            }),
            React.createElement("input", {
              key: "password",
              type: "password",
              name: "password",
              placeholder: "PASSWORD",
              value: formData.password,
              onChange: handleChange,
            }),
            React.createElement(
              "button",
              { key: "submit", type: "submit" },
              "REGISTER"
            ),
            message.text &&
              React.createElement(
                "p",
                {
                  key: "msg",
                  className:
                    message.type === "success"
                      ? "register-success"
                      : "register-error",
                },
                message.text
              ),
          ]
        )
      ),
      React.createElement(
        "div",
        { key: "robot-box", className: "robot-box" },
        React.createElement("img", {
          src: "/robot.png", // ✅ place robot.png inside /public folder
          alt: "AI Robot",
          className: "robot-image",
        })
      ),
    ]
=======
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
>>>>>>> 4abbeed0158fd3859e67d8aa17d7c53894ef7432
  );
}

export default Register;
