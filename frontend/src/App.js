import React, { useState, useEffect } from "react";
import "./i18n.js"; 
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.js"; 
import MultiContentPage from "./pages/MultiContentPage.js"; // Added .js extension
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
import { UserProvider } from "./context/UserContext.js";

import SummarizerPage from "./pages/SummarizerPage.js";
import Blog from "./pages/Blog.js";
import Chat from "./pages/Chat.js";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Home */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Summarizer */}
        <Route
          path="/summarizer"
          element={
            <ProtectedRoute>
              <SummarizerPage />
            </ProtectedRoute>
          }
        />

        {/* Blog */}
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />

        {/* Multiple Content Formats */}
        <Route
          path="/multi-content"
          element={
            <ProtectedRoute>
              <MultiContentPage />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    i18n.changeLanguage(language); 
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
              setLanguage={setLanguage}
            />
            <AnimatedRoutes />
          </Router>
        </UserProvider>
      </I18nextProvider>
    </div>
  );
}

export default App;
