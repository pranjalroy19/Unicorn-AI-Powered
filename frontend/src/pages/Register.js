import React, { useState } from "react";
import "./Register.css";

function Register({ darkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  const containerClass = darkMode
    ? "register-container dark"
    : "register-container light";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    console.log("Register Data:", formData);
    setMessage({ type: "success", text: "Registered successfully!" });
    setFormData({ name: "", email: "", password: "" });
  };

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
  );
}

export default Register;
