import React, { useState, useEffect } from "react";
import { Sun, Moon, LogOut } from "lucide-react";
import AdminHome from "./AdminHome";
import AdminTasks from "./AdminTasks";
import VideoChat from "./AdminVideoChat";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

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

  const handleLogout = () => {
    // You can clear any auth token or session logic here
    alert("You have been logged out.");
    window.location.href = "/"; // redirect to login or home page
  };

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <AdminHome />;
      case "tasks":
        return <AdminTasks />;
      case "video":
        return <VideoChat />;
      default:
        return <AdminHome />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 p-4 shadow-lg flex flex-col justify-between">
        <div>
          {/* Profile */}
          <div className="mb-6">
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">Amrutha MT</p>
          </div>

          {/* Nav Buttons */}
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
        </div>

        {/* Footer */}
        <div className="mt-10 flex justify-between items-center">
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline flex items-center gap-1"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 overflow-auto p-6">{renderView()}</div>
    </div>
  );
};

export default AdminDashboard;