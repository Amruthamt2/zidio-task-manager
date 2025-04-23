import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pieColors = ["#10b981", "#f59e0b", "#3b82f6"];
const priorityColors = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#10b981",
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const AdminHome = () => {
  const [taskStats, setTaskStats] = useState([]);
  const [priorityStats, setPriorityStats] = useState([]);
  const [progress, setProgress] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const data = await res.json();

        // Count statuses
        const statusCount = {
          Completed: 0,
          Pending: 0,
          "In Progress": 0,
        };

        // Count priorities
        const priorityCount = {
          High: 0,
          Medium: 0,
          Low: 0,
        };

        const today = new Date().toISOString().split("T")[0];
        const alerts = [];

        data.forEach((task) => {
          statusCount[task.status] = (statusCount[task.status] || 0) + 1;
          priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;

          if (task.dueDate) {
            const due = task.dueDate.split("T")[0];
            if (due <= today && task.status !== "Completed") {
              alerts.push(`Task "${task.title}" is due or overdue! Assigned to: ${task.assignedTo}`);
            }
          }
        });

        // Set stats
        const stats = Object.entries(statusCount).map(([name, value]) => ({ name, value }));
        const priority = Object.entries(priorityCount).map(([name, value]) => ({ name, value }));

        const total = stats.reduce((acc, t) => acc + t.value, 0);
        const completed = statusCount["Completed"] || 0;
        const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

        setTaskStats(stats);
        setPriorityStats(priority);
        setProgress(progressPercent);
        setNotifications(alerts);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="space-y-6">
      {/* Greeting Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">
            {getGreeting()}, Amrutha MT!
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Here’s your dashboard overview
          </p>
        </div>
      </div>

      {/* Task Progress */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Task Completion</h3>
        <div className="w-full bg-gray-300 dark:bg-gray-700 h-6 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full text-center text-white text-sm"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>

      {/* Priority Level Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Priority Levels</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={priorityStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {priorityStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={priorityColors[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Task Status Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Task Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={taskStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Task Status Pie</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {taskStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Deadline Notifications */}
      {notifications.length > 0 && (
        <div className="bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Deadline Alerts</h3>
          <ul className="list-disc list-inside space-y-1">
            {notifications.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminHome;