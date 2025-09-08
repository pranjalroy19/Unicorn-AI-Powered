// src/pages/Register.js
import React, { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    alert("Registered Successfully!");
  };

  return React.createElement(
    "div",
    { className: "flex justify-center items-center min-h-screen" },
    React.createElement(
      "form",
      {
        onSubmit: handleSubmit,
        className:
          "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 space-y-4",
      },
      [
        React.createElement(
          "h2",
          {
            key: "title",
            className: "text-2xl font-bold text-center dark:text-white",
          },
          "Register"
        ),
        React.createElement("input", {
          key: "name",
          type: "text",
          name: "name",
          placeholder: "Name",
          value: formData.name,
          onChange: handleChange,
          className:
            "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white",
        }),
        React.createElement("input", {
          key: "email",
          type: "email",
          name: "email",
          placeholder: "Email",
          value: formData.email,
          onChange: handleChange,
          className:
            "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white",
        }),
        React.createElement("input", {
          key: "password",
          type: "password",
          name: "password",
          placeholder: "Password",
          value: formData.password,
          onChange: handleChange,
          className:
            "w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white",
        }),
        React.createElement(
          "button",
          {
            key: "submit",
            type: "submit",
            className:
              "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition",
          },
          "Register"
        ),
      ]
    )
  );
}

export default Register;
