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

  
  const syncUserToStorage = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const idx = users.findIndex((u) => u.email === updatedUser.email);
    if (idx > -1) users[idx] = { ...users[idx], ...updatedUser };
    else users.push(updatedUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  
  useEffect(() => {
    if (!user) return;

    const theme = user.theme || "light";
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");

    
    if (!user.theme) {
      syncUserToStorage({ ...user, theme });
    }
  }, [user]);

  useEffect(() => {
    if (user?.language) i18n.changeLanguage(user.language);
  }, [user?.language, i18n]);

  
  if (!user) return <Navigate to="/login" replace />;

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      syncUserToStorage({ ...user, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleUsernameChange = () => {
    const newName = prompt(t("updateUsername"), user?.username || "");
    if (newName?.trim()) {
      syncUserToStorage({ ...user, username: newName.trim() });
    }
  };

  const handleLanguageChange = (lang) => {
    syncUserToStorage({ ...user, language: lang });
    i18n.changeLanguage(lang);
  };

  const toggleTheme = () => {
    const newTheme = user.theme === "light" ? "dark" : "light";
    syncUserToStorage({ ...user, theme: newTheme });


    const root = document.documentElement;
    if (newTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  };

  const handleChangePassword = () => {
    const newPassword = prompt("Enter new password:");
    if (!newPassword) return alert("Password not changed.");
    syncUserToStorage({ ...user, password: newPassword });
    alert("Password updated successfully!");
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone!"
    );
    if (!confirmDelete) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.filter((u) => u.email !== user.email);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);

    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <button className={activeSection === "profile" ? "active" : ""} onClick={() => setActiveSection("profile")} title={t("profileSettings")}>
          <FaUser />
        </button>
        <button className={activeSection === "preferences" ? "active" : ""} onClick={() => setActiveSection("preferences")} title={t("preferences")}>
          <FaCog />
        </button>
        <button className={activeSection === "notifications" ? "active" : ""} onClick={() => setActiveSection("notifications")} title={t("notifications")}>
          <FaBell />
        </button>
        <button className={activeSection === "account" ? "active" : ""} onClick={() => setActiveSection("account")} title={t("accountManagement")}>
          <FaLock />
        </button>
      </aside>

      <main className="dashboard-main">
        <h1 className="page-title">{t("settings")}</h1>

        {activeSection === "profile" && (
          <div className="settings-section">
            <h2>{t("profileSettings")}</h2>
            <div className="settings-option">
              <label>{t("changeProfilePic")}</label>
              <div>
                <input type="file" accept="image/*" onChange={handleProfilePicChange} style={{ display: "none" }} id="profilePicInput"/>
                <button onClick={() => document.getElementById("profilePicInput").click()}>{t("upload")}</button>
              </div>
            </div>
            <div className="settings-option">
              <label>{t("updateUsername")}</label>
              <button onClick={handleUsernameChange}>{t("edit")}</button>
            </div>
          </div>
        )}

        {activeSection === "preferences" && (
          <div className="settings-section">
            <h2>{t("preferences")}</h2>
            <div className="settings-option">
              <label>{t("language")}</label>
              <select className="dropdown" value={user?.language || "en"} onChange={(e) => handleLanguageChange(e.target.value)}>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
            <div className="settings-option">
              <label>{t("theme")}</label>
              <button onClick={toggleTheme}>
                {user.theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
            </div>
          </div>
        )}

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

        {activeSection === "account" && (
          <div className="settings-section">
            <h2>{t("accountManagement")}</h2>
            <div className="settings-option">
              <label>{t("changePassword")}</label>
              <button onClick={handleChangePassword}>{t("update")}</button>
            </div>
            <div className="settings-option">
              <label>{t("deleteAccount")}</label>
              <button className="danger" onClick={handleDeleteAccount}>{t("dangerDelete")}</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
