import React from "react";

export default function TaskCard({
  title,
  description,
  status,
  priority,
  deadline,
  onStatusChange,
  isUser = false,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-red-100 text-red-700";
      case "inprogress":
        return "bg-yellow-100 text-yellow-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 font-bold";
      case "Medium":
        return "text-yellow-600 font-semibold";
      case "Low":
        return "text-green-600 font-medium";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>

      <div className="mt-3 flex flex-col gap-2">
        <span className={`px-3 py-1 rounded-full text-sm w-max ${getStatusColor(status)}`}>
          Status: {status}
        </span>
        <span className={`text-sm ${getPriorityColor(priority)}`}>
          Priority: {priority}
        </span>
        <span className="text-sm text-blue-700 font-medium">
          Deadline: {deadline}
        </span>
      </div>

      {isUser && (
        <button
          onClick={onStatusChange}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200"
        >
          Update Status
        </button>
      )}
    </div>
  );
}