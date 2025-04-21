// src/components/Navbar.jsx
import { LogOut, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar({ role }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-6 py-3 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-blue-600 dark:text-white">Zidio Task Manager</div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 dark:text-gray-300 font-medium hidden sm:block">Welcome, {role}</span>
        <img
          src={`https://ui-avatars.com/api/?name=${role}&background=0D8ABC&color=fff`}
          alt="user"
          className="w-9 h-9 rounded-full"
        />
        <button
          className="text-gray-500 hover:text-yellow-400 dark:hover:text-yellow-300 transition"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          className="text-gray-500 hover:text-red-500 transition"
          title="Logout"
          onClick={() => alert("Logout logic here")}
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;