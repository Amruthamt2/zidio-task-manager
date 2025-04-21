import React from "react";
import {
  BarChart,
  Bar,
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

const progress = Math.round((8 / (8 + 5 + 4)) * 100); // completed / total

const AdminHome = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Admin Dashboard Overview</h2>

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
    </div>
  );
};

export default AdminHome;