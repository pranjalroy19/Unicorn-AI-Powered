
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ type: "error", text: "All fields are required!" });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === formData.email)) {
      setMessage({ type: "error", text: "User already exists!" });
      return;
    }

    const newUser = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
      theme: "light",
      language: "en",
      profilePic: null,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage({ type: "success", text: "Registered successfully!" });
    setFormData({ name: "", email: "", password: "" });
    setTimeout(() => navigate("/login"), 900);
  };

  return (
    <div className="auth-page register">
      <div className="auth-card floating">
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
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
          <button type="submit">Register</button>
          {message.text && (
            <p
              className={
                message.type === "success" ? "auth-success" : "auth-error"
              }
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
