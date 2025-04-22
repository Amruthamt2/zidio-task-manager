import React, { useState, useContext } from "react";
import { Sun, Moon, UserCircle2, LogOut } from "lucide-react";
import AdminHome from "./AdminHome";
import AdminTasks from "./AdminTasks";
import VideoChat from "./AdminVideoChat";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("home");
  const { logout } = useAuth();

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
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 text-white p-3 rounded-full shadow-md">
              <UserCircle2 size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-400 dark:text-gray-300">Welcome</p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Amrutha MT</h3>
            </div>
          </div>

          {/* Admin Panel Title */}
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Admin Panel</h2>

          {/* Navigation */}
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActiveView("home")}
                className="w-full text-left hover:text-blue-500 dark:hover:text-blue-400"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView("tasks")}
                className="w-full text-left hover:text-blue-500 dark:hover:text-blue-400"
              >
                Tasks
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView("video")}
                className="w-full text-left hover:text-blue-500 dark:hover:text-blue-400"
              >
                Video Chat
              </button>
            </li>
          </ul>
        </div>

        {/* Bottom Buttons */}
        <div className="space-y-4">

         {/* Logout */}
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg flex items-center justify-center w-full"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">{renderView()}</div>
    </div>
  );
};

export default AdminDashboard;