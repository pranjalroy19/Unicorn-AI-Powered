// src/pages/DashboardPage.js
import React, { useState, useEffect } from "react";
import "./DashboardPage.css";
import { FaUser, FaCog, FaBell, FaLock } from "react-icons/fa";
import { useUser } from "../context/UserContext.js";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";

function DashboardPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const { user, setUser } = useUser();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Apply theme
  useEffect(() => {
    if (!user) return;
    if (user.theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [user?.theme]);

  // Apply language
  useEffect(() => {
    if (user?.language) i18n.changeLanguage(user.language);
  }, [user?.language, i18n]);

  // Redirect if not logged in (after hooks)
  if (!user) return <Navigate to="/login" replace />;

  // helper: sync updated user to context, "user" key and "users" array
  const syncUserToStorage = (updatedUser) => {
    // update context & single-user storage
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // update users array (persist per-email)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex((u) => u.email === updatedUser.email);
    if (idx > -1) {
      users[idx] = { ...users[idx], ...updatedUser };
    } else {
      users.push(updatedUser);
    }
    localStorage.setItem("users", JSON.stringify(users));
  };

  // Profile handlers
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = { ...user, profilePic: reader.result };
      syncUserToStorage(updated);
    };
    reader.readAsDataURL(file);
  };

  const handleUsernameChange = () => {
    const newName = prompt(t("updateUsername"), user?.username || "");
    if (newName && newName.trim() !== "") {
      const updated = { ...user, username: newName.trim() };
      syncUserToStorage(updated);
    }
  };

  const handleLanguageChange = (lang) => {
    const updated = { ...user, language: lang };
    syncUserToStorage(updated);
    i18n.changeLanguage(lang);
  };

  const toggleTheme = () => {
    const newTheme = user?.theme === "light" ? "dark" : "light";
    const updated = { ...user, theme: newTheme };
    syncUserToStorage(updated);
  };

  // Account management
  const handleChangePassword = () => {
    const newPassword = prompt("Enter new password:");
    if (!newPassword) return alert("Password not changed.");

    const updated = { ...user, password: newPassword };
    syncUserToStorage(updated);
    alert("Password updated successfully!");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone!"
    );
    if (!confirmDelete) return;

    // Remove from users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((u) => u.email !== user.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Remove current session
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <button
          className={activeSection === "profile" ? "active" : ""}
          onClick={() => setActiveSection("profile")}
          title={t("profileSettings")}
        >
          <FaUser />
        </button>
        <button
          className={activeSection === "preferences" ? "active" : ""}
          onClick={() => setActiveSection("preferences")}
          title={t("preferences")}
        >
          <FaCog />
        </button>
        <button
          className={activeSection === "notifications" ? "active" : ""}
          onClick={() => setActiveSection("notifications")}
          title={t("notifications")}
        >
          <FaBell />
        </button>
        <button
          className={activeSection === "account" ? "active" : ""}
          onClick={() => setActiveSection("account")}
          title={t("accountManagement")}
        >
          <FaLock />
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <h1 className="page-title">{t("settings")}</h1>

        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className="settings-section">
            <h2>{t("profileSettings")}</h2>
            <div className="settings-option">
              <label>{t("changeProfilePic")}</label>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  style={{ display: "none" }}
                  id="profilePicInput"
                />
                <button
                  onClick={() =>
                    document.getElementById("profilePicInput").click()
                  }
                >
                  {t("upload")}
                </button>
              </div>
            </div>

            <div className="settings-option">
              <label>{t("updateUsername")}</label>
              <button onClick={handleUsernameChange}>{t("edit")}</button>
            </div>
          </div>
        )}

        {/* Preferences Section */}
        {activeSection === "preferences" && (
          <div className="settings-section">
            <h2>{t("preferences")}</h2>
            <div className="settings-option">
              <label>{t("language")}</label>
              <select
                className="dropdown"
                value={user?.language || "en"}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>

            <div className="settings-option">
              <label>{t("theme")}</label>
              <button onClick={toggleTheme}>
                {user?.theme === "light" ? t("toggleDark") : t("toggleLight")}
              </button>
            </div>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === "notifications" && (
          <div className="settings-section">
            <h2>{t("notifications")}</h2>
            <div className="settings-option">
              <label>{t("emailNotifications")}</label>
              <button>{t("enable")}</button>
            </div>
            <div className="settings-option">
              <label>{t("smsNotifications")}</label>
              <button>{t("enable")}</button>
            </div>
          </div>
        )}

        {/* Account Section */}
        {activeSection === "account" && (
          <div className="settings-section">
            <h2>{t("accountManagement")}</h2>

            <div className="settings-option">
              <label>{t("changePassword")}</label>
              <button onClick={handleChangePassword}>{t("update")}</button>
            </div>

            <div className="settings-option">
              <label>{t("deleteAccount")}</label>
              <button className="danger" onClick={handleDeleteAccount}>
                {t("dangerDelete")}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
