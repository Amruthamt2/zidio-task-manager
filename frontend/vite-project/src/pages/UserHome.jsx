import { useState, useEffect } from "react";
import UserTasks from "../pages/UserTasks";
import UserVideoChat from "../pages/UserVideoChat";
import io from "socket.io-client";

// Initialize socket only once
const socket = io("http://localhost:5000", { withCredentials: true });

function UserHome() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userName, setUserName] = useState("Amrita");
  const [userId, setUserId] = useState("user@123"); // Replace with dynamic login data
  const [notifications, setNotifications] = useState([]);
  const [missedMeetings, setMissedMeetings] = useState([]);

  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);
      console.log("User registered:", userId);
    }

    socket.on("receive-meeting-request", (meeting) => {
      console.log("Meeting received by user:", meeting);
      setNotifications((prev) => [...prev, `New Meeting: ${meeting.meetingLink}`]);
      setMissedMeetings((prev) => [...prev, meeting]);
    });

    return () => {
      socket.off("receive-meeting-request");
    };
  }, [userId]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full text-left ${activeTab === "dashboard" ? "font-bold" : ""}`}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`w-full text-left ${activeTab === "tasks" ? "font-bold" : ""}`}
            >
              User Tasks
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("video")}
              className={`w-full text-left ${activeTab === "video" ? "font-bold" : ""}`}
            >
              Video Chat
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-semibold mb-2">Welcome, {userName}!</h1>
            {notifications.length > 0 && (
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4 shadow">
                <h3 className="font-semibold">Notifications:</h3>
                <ul className="list-disc ml-6 mt-2">
                  {notifications.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "tasks" && <UserTasks />}
        {activeTab === "video" && <UserVideoChat userId={userId} />}
      </div>
    </div>
  );
}

export default UserHome;