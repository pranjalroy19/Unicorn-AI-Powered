import React, { useState, useEffect } from "react";
import "./i18n.js"; // <-- Add .js extension
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.js"; // <-- Also add .js here

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import DashboardPage from "./pages/DashboardPage.js";
import AboutPage from "./pages/AboutPage.js";
import { UserProvider, useUser } from "./context/UserContext.js";

// ✅ Protected route
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

// ✅ Animated Routes wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

  // ✅ Apply theme on load/change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✅ Apply language on load/change
  useEffect(() => {
    i18n.changeLanguage(language); // Updates all components instantly
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <I18nextProvider i18n={i18n}>
        <UserProvider>
          <Router>
            <Navbar
              darkMode={darkMode}
              toggleTheme={toggleTheme}
              language={language}
              setLanguage={setLanguage} // Pass setLanguage to Navbar if needed
            />
            <AnimatedRoutes />
          </Router>
        </UserProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
