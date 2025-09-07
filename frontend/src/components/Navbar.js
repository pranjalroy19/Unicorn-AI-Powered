import React from "react";

function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-gray-100 dark:bg-gray-800">
      <h1 className="text-xl font-bold">Unicorn AI</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded bg-blue-500 text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
