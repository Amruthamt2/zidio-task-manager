import React from "react";
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

const taskStats = [
  { name: "Completed", value: 8 },
  { name: "Pending", value: 5 },
  { name: "In Progress", value: 4 },
];

const pieColors = ["#10b981", "#f59e0b", "#3b82f6"];
const totalTasks = taskStats.reduce((acc, task) => acc + task.value, 0);
const progress = Math.round((taskStats[0].value / totalTasks) * 100);

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

const AdminHome = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold">
            {getGreeting()}, Amrutha MT!
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Here’s your dashboard overview</p>
        </div>

        {/* Calendar Box */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 w-64">
          <h3 className="font-semibold mb-2">Today</h3>
          <p>{new Date().toLocaleDateString()}</p>
          <p className="text-sm text-green-500 mt-2">You have 3 tasks today</p>
        </div>
      </div>

      {/* Task Progress */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Task Completion</h3>
        <div className="w-full bg-gray-300 dark:bg-gray-700 h-6 rounded-full overflow-hidden">
          <div
            className="bg-green-500 h-full text-center text-white text-sm"
            style={{width:`${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart */}
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

        {/* Pie Chart */}
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
                label={({ name, percent }) =>
                 `${name} ${(percent * 100).toFixed(0)}%`
                }
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

      {/* Notifications */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Upcoming Tasks</h3>
        <ul className="list-disc ml-5 text-sm space-y-1">
          <li>Design Review Meeting – due today</li>
          <li>Fix Bug #245 – due tomorrow</li>
          <li>Complete UI for dashboard – due in 3 days</li>
        </ul>
      </div>

      {/* Small Task Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {taskStats.map((task, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center"
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