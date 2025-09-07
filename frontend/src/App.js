import React, { useState } from "react";
import Navbar from "./components/Navbar.js";
import DashboardPage from "./pages/DashboardPage.js";
import Home from "./pages/Home.js";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  return (
    <div
      className={
        darkMode
          ? "dark bg-gray-900 text-white min-h-screen"
          : "bg-white text-black min-h-screen"
      }
    >
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      {/* For now just show DashboardPage, later use React Router */}
      <DashboardPage />
    </div>
  );
}

export default App;
