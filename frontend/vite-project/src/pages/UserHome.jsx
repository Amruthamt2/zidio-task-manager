// src/pages/UserHome.jsx
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UserVideoChat from "./UserMeetings";
import { useAuth } from "../context/AuthContext";

// -------- socket.io ----------
const socket = io("http://localhost:5000", { withCredentials: true });

export default function UserHome() {
  // ---------- app state ----------
  const { user, logout } = useAuth();          // user comes from AuthContext
  const [activeTab, setActiveTab]   = useState("dashboard");
  const [tasks, setTasks]           = useState([]);
  const [notifications, setNotif]   = useState([]);

  // ---------- fetch tasks ----------
  useEffect(() => {
    if (!user?._id) return;
    socket.emit("register", user._id);

    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/tasks/user/${user._id}`
        );
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Fetch tasks failed", err);
      }
    };
    fetchTasks();

    socket.on("receive-meeting-request", (meeting) => {
      setNotif((prev) => [
        ...prev,
       `📞 Meeting invite: ${meeting.meetingLink}`,
      ]);
    });

    return () => socket.off("receive-meeting-request");
  }, [user]);

  // ---------- helpers ----------
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const todayISO  = new Date().toDateString();
  const dueToday  = tasks.filter(
    (t) => new Date(t.deadline).toDateString() === todayISO
  );

  const updateStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status } : t))
      );
    } catch (err) {
      console.error("Update status error", err);
    }
  };

  // ---------- UI ----------
  return (
    <div className="flex h-screen bg-gray-100">
      {/* ========== sidebar ========== */}
      <aside className="w-64 bg-white shadow flex flex-col justify-between">
        <div className="p-4">
          {/* profile */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-full text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.4c-3.2 0-9.4 1.6-9.4 4.8v2.2h18.7V19.2c0-3.2-6.2-4.8-9.3-4.8z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Logged in as</p>
              <p className="font-semibold">Amrutha&nbsp;M&nbsp;T</p>
            </div>
          </div>

          {/* nav */}
          <nav className="space-y-3">
            {["dashboard", "video"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`block w-full text-left px-2 py-1 rounded ${
                  activeTab === t ? "bg-blue-100 text-blue-600" : "hover:bg-gray-200"
                }`}
              >
                {t === "dashboard" ? "Home" : "Video Chat"}
              </button>
            ))}
          </nav>
        </div>

        {/* logout */}
        <button
          onClick={logout}
          className="m-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Logout
        </button>
      </aside>

      {/* ========== main ========== */}
      <main className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" ? (
          <>
            {/* greeting + donut + calendar */}
            <div className="flex flex-wrap items-center gap-10 mb-6">
              <h1 className="text-2xl font-bold grow">
                {`Good ${
                  new Date().getHours() < 12
                    ? "morning"
                    : new Date().getHours() < 18
                    ? "afternoon"
                    : "evening"
                }, Amrutha M T 👋`}
              </h1>

              {/* donut */}
              <div className="w-40 h-40 relative">
                <svg viewBox="0 0 36 36" className="transform -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray={`${progress}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                  {progress}%
                </span>
              </div>

              {/* calendar */}
              <Calendar className="border rounded shadow" />
            </div>

            {/* today deadline banner */}
            {dueToday.length > 0 && (
              <div className="bg-red-50 text-red-700 p-3 rounded shadow mb-6 space-y-1">
                <p className="font-semibold">
                  🔔 {dueToday.length} task
                  {dueToday.length > 1 && "s"} due today!
                </p>
                <ul className="list-disc ml-6">
                  {dueToday.map((t) => (
                    <li key={t._id}>{t.title}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* task list */}
            <h2 className="text-xl font-bold mb-3">Assigned Tasks</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 rounded shadow space-y-1"
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-xs">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>

                  {/* status dropdown */}
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task._id, e.target.value)}
                    className="mt-1 w-full border rounded p-1 bg-gray-50"
                  >
                    {["Pending", "Ongoing", "Completed"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </>
        ) : (
          <UserVideoChat userId={user?._id} />
        )}
      </main>
    </div>
  );
}