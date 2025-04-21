import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import AdminHome from "./AdminHome";
import AdminTasks from "./AdminTasks";
import VideoChat from "./AdminVideoChat";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <AdminHome />;
      case "tasks":
        return <AdminTasks />;
      case "users":
        return <AdminUsers />;
      case "video":
        return <VideoChat />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-3">
          <li>
            <button onClick={() => setActiveView("home")} className="w-full text-left hover:underline">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => setActiveView("tasks")} className="w-full text-left hover:underline">
              Tasks
            </button>
          </li>
          
          <li>
            <button onClick={() => setActiveView("video")} className="w-full text-left hover:underline">
              Video Chat
            </button>
          </li>
        </ul>

        <div className="mt-10">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 overflow-auto p-6">{renderView()}</div>
    </div>
  );
};

export default AdminDashboard;