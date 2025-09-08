// src/pages/Login.js
import React, { useState } from "react";
import { loginUser } from "../utils/api.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await loginUser({ email, password });
      setSuccess("Login successful!");
      console.log("User data:", response);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return React.createElement(
    "div",
    { className: "flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900" },
    React.createElement(
      "div",
      { className: "w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6" },
      [
        React.createElement(
          "h2",
          { className: "text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white", key: "title" },
          "Login"
        ),
        React.createElement(
          "form",
          { onSubmit: handleSubmit, className: "flex flex-col gap-4", key: "form" },
          [
            // Email input
            React.createElement("input", {
              type: "email",
              placeholder: "Email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className:
                "p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
              key: "email"
            }),

            // Password input
            React.createElement("input", {
              type: "password",
              placeholder: "Password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className:
                "p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
              key: "password"
            }),

            // Submit button
            React.createElement(
              "button",
              {
                type: "submit",
                className:
                  "w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition",
                key: "submit"
              },
              "Login"
            )
          ]
        ),

        // Error message
        error &&
          React.createElement(
            "p",
            { className: "mt-4 text-center text-red-500", key: "error" },
            error
          ),

        // Success message
        success &&
          React.createElement(
            "p",
            { className: "mt-4 text-center text-green-500", key: "success" },
            success
          )
      ]
    )
  );
}

export default Login;
