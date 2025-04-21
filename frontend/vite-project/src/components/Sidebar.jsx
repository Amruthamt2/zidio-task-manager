import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold p-4">Zidio Task</h2>
        <ul className="p-4 space-y-2">
          {isAdmin ? (
            <>
              <li>
                <Link
                  to="/admin"
                  className="block px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/video-chat"
                  className="block px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  Video Chat
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/users"
                  className="block px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                >
                  Manage Users
                </Link>
              </li>

            </>
          ) : (
            <>
          
            </>
          )}
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;