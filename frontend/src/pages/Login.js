// src/pages/Login.js
import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    alert("Login submitted!");
  };

  return React.createElement(
    "div",
    { className: "login-container" },
    React.createElement(
      "form",
      { className: "login-form", onSubmit: handleSubmit },
      [
        React.createElement(
          "h2",
          { key: "title" },
          "Login"
        ),
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
          "Login"
        ),
      ]
    )
  );
}

export default Login;
