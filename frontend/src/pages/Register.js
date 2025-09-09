import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

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
    <div className="auth-page register">
      <div className="auth-left">
        <div className="auth-left">



</div>
      </div>
      <div className="auth-card floating">
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit">Register</button>
          {message.text && <p className={message.type==="success"?"auth-success":"auth-error"}>{message.text}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
