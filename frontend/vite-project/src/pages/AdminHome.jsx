import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import AdminTasks from "./AdminTasks";  // Import AdminTasks component

// -------- socket.io ----------
const socket = io("http://localhost:5000", { withCredentials: true });

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const AdminHome = () => {
  const { user } = useAuth();
  const [taskProgress, setTaskProgress] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotif] = useState([]);

  // Fetch tasks and update task progress
  useEffect(() => {
    if (!user?._id) return;
    socket.emit("register", user._id);

    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/tasks`
        );
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Fetch tasks failed", err);
      }
    };

    fetchTasks();

    socket.on("task-progress-update", (updatedTasks) => {
      setTasks(updatedTasks);
      const completed = updatedTasks.filter((task) => task.status === "Completed").length;
      const inProgress = updatedTasks.filter((task) => task.status === "In Progress").length;
      const pending = updatedTasks.filter((task) => task.status === "Pending").length;
      setTaskProgress([
        { name: "Completed", value: completed },
        { name: "In Progress", value: inProgress },
        { name: "Pending", value: pending },
      ]);
    });

    socket.on("receive-meeting-request", (meeting) => {
      setNotif((prev) => [
        ...prev,
        `📞 Meeting invite: ${meeting.meetingLink}`,
      ]);
    });

    return () => socket.off("task-progress-update");
  }, [user]);

  const completed = tasks.filter((task) => task.status === "Completed").length;
  const totalTasksCount = tasks.length;
  const userProgress = totalTasksCount ? Math.round((completed / totalTasksCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">{getGreeting()}, {user?.name || "Admin"}!</h2>
          <p className="text-gray-500">Here’s your dashboard overview</p>
        </div>

        {/* Calendar Box */}
        <div className="bg-white shadow rounded-lg p-4 w-64">
          <h3 className="font-semibold mb-2">Today</h3>
          <p>{new Date().toLocaleDateString()}</p>
          <p className="text-sm text-green-500 mt-2">You have {taskProgress[0]?.value} tasks today</p>
        </div>
      </div>

      {/* Task Progress */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Task Completion</h3>
        <div className="w-full bg-gray-300 h-6 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full text-center text-white text-sm"
            style={{ width: `${userProgress}%` }}
          >
            {userProgress}%
          </div>
        </div>
      </div>

      {/* Real-time Task Analytics - Using AdminTasks component */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Real-Time Task Analytics</h3>
        <AdminTasks taskProgress={taskProgress} tasks={tasks} />
      </div>

      {/* Notifications */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Upcoming Tasks</h3>
        <ul className="list-disc ml-5 text-sm space-y-1">
          {notifications.map((notif, index) => (
            <li key={index}>{notif}</li>
          ))}
        </ul>
      </div>

      {/* Small Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {taskProgress.map((task, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <h4 className="text-lg font-bold">{task.name}</h4>
            <p className="text-3xl font-bold text-blue-500 mt-2">{task.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;