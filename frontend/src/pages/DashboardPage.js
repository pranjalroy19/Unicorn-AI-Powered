// src/pages/DashboardPage.js
import React, { useState } from "react";
import "./DashboardPage.css";
import { FaUser, FaCog, FaBell, FaLock } from "react-icons/fa";

function DashboardPage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <button
          className={activeSection === "profile" ? "active" : ""}
          onClick={() => setActiveSection("profile")}
          title="Profile"
        >
          <FaUser />
        </button>
        <button
          className={activeSection === "preferences" ? "active" : ""}
          onClick={() => setActiveSection("preferences")}
          title="Preferences"
        >
          <FaCog />
        </button>
        <button
          className={activeSection === "notifications" ? "active" : ""}
          onClick={() => setActiveSection("notifications")}
          title="Notifications"
        >
          <FaBell />
        </button>
        <button
          className={activeSection === "account" ? "active" : ""}
          onClick={() => setActiveSection("account")}
          title="Account"
        >
          <FaLock />
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <h1 className="page-title">Settings</h1>

        {/* Profile Section */}
        {activeSection === "profile" && (
          <div className="settings-section">
            <h2>Profile Settings</h2>
            <div className="settings-option">
              <label>Change Profile Picture</label>
              <button>Upload</button>
            </div>
            <div className="settings-option">
              <label>Update Username</label>
              <button>Edit</button>
            </div>
          </div>
        )}

        {/* Preferences Section */}
        {activeSection === "preferences" && (
          <div className="settings-section">
            <h2>Preferences</h2>
            <div className="settings-option">
              <label>Language</label>
              <select className="dropdown">
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
                <option>Telugu</option>
                <option>Marathi</option>
                <option>Tamil</option>
                <option>Urdu</option>
                <option>Gujarati</option>
                <option>Kannada</option>
                <option>Odia</option>
                <option>Punjabi</option>
                <option>Malayalam</option>
                <option>Sanskrit</option>
                <option>French</option>
                <option>Spanish</option>
                <option>German</option>
                <option>Chinese</option>
                <option>Japanese</option>
                <option>Korean</option>
                <option>Russian</option>
              </select>
            </div>
            <div className="settings-option">
              <label>Theme</label>
              <button>Toggle Dark/Light</button>
            </div>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === "notifications" && (
          <div className="settings-section">
            <h2>Notifications</h2>
            <div className="settings-option">
              <label>Email Notifications</label>
              <button>Enable</button>
            </div>
            <div className="settings-option">
              <label>SMS Notifications</label>
              <button>Enable</button>
            </div>
          </div>
        )}

        {/* Account Section */}
        {activeSection === "account" && (
          <div className="settings-section">
            <h2>Account Management</h2>
            <div className="settings-option">
              <label>Change Password</label>
              <button>Update</button>
            </div>
            <div className="settings-option">
              <label>Delete Account</label>
              <button className="danger">Delete</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
