// src/pages/DashboardPage.js
import React, { useState, useEffect } from "react";
import "./DashboardPage.css";
import { FaUser, FaCog, FaBell, FaLock } from "react-icons/fa";
import { useUser } from "../context/UserContext.js";
import { useTranslation } from "react-i18next";

function DashboardPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const { user, setUser } = useUser();
  const { t, i18n } = useTranslation();

  // Apply theme
  useEffect(() => {
    if (user.theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [user.theme]);

  // Apply language globally
  useEffect(() => {
    i18n.changeLanguage(user.language);
  }, [user.language, i18n]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setUser(prev => ({ ...prev, profilePic: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleUsernameChange = () => {
    const newName = prompt(t("updateUsername"), user.username || "");
    if (newName && newName.trim() !== "") {
      setUser(prev => ({ ...prev, username: newName.trim() }));
    }
  };

  const handleLanguageChange = (lang) => {
    setUser(prev => ({ ...prev, language: lang }));
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

 const toggleTheme = () => {
  setUser(prev => {
    const newTheme = prev.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme); // ✅ store the new theme
    return { ...prev, theme: newTheme };
  });
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
                <button onClick={() => document.getElementById("profilePicInput").click()}>
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
                value={user.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                {/* Add more languages here */}
              </select>
            </div>

            <div className="settings-option">
              <label>{t("theme")}</label>
              <button onClick={toggleTheme}>
                {user.theme === "light" ? t("toggleDark") : t("toggleLight")}
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
              <button>{t("update")}</button>
            </div>
            <div className="settings-option">
              <label>{t("deleteAccount")}</label>
              <button className="danger">{t("dangerDelete")}</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
