import React, { useState, useEffect } from "react";
import "./Register.css";

function Register({ darkMode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // Optional: apply dark mode class to container
  const containerClass = darkMode ? "register-container dark" : "register-container light";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    // Here you can call your API to register user
    console.log("Register Data:", formData);
    setMessage({ type: "success", text: "Registered successfully!" });
    setFormData({ name: "", email: "", password: "" });
  };

  return React.createElement(
    "div",
    { className: containerClass },
    React.createElement(
      "form",
      { className: "register-form", onSubmit: handleSubmit },
      [
        React.createElement("h2", { key: "title" }, "Register"),
        React.createElement("input", {
          key: "name",
          type: "text",
          name: "name",
          placeholder: "Name",
          value: formData.name,
          onChange: handleChange,
        }),
        React.createElement("input", {
          key: "email",
          type: "email",
          name: "email",
          placeholder: "Email",
          value: formData.email,
          onChange: handleChange,
        }),
        React.createElement("input", {
          key: "password",
          type: "password",
          name: "password",
          placeholder: "Password",
          value: formData.password,
          onChange: handleChange,
        }),
        React.createElement(
          "button",
          { key: "submit", type: "submit" },
          "Register"
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
  );
}

export default Register;
