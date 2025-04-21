import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "Low",
    assignedTo: "", // user _id
  });

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/api/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users", err));
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/tasks", newTask)
      .then(() => {
        fetchTasks();
        setNewTask({
          title: "",
          description: "",
          deadline: "",
          priority: "Low",
          assignedTo: "",
        });
      })
      .catch((err) => console.error("Failed to create task", err));
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:5000/api/tasks/${taskId}`)
      .then(() => fetchTasks())
      .catch((err) => console.error("Failed to delete task", err));
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const updateStatus = (taskId, newStatus) => {
    axios
      .put(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus })
      .then(() => fetchTasks())
      .catch((err) => console.error("Failed to update status", err));
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow mb-6"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newTask.title}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newTask.description}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700"
            required
          />
          <input
            type="date"
            name="deadline"
            value={newTask.deadline}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700"
            required
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          {/* Dropdown for selecting user */}
          <select
            name="assignedTo"
            value={newTask.assignedTo}
            onChange={handleChange}
            className="w-full p-2 border rounded dark:bg-gray-700"
            required
          >
            <option value="">Assign to</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Task
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Deadline: {task.deadline}
              </p>
              <p className="text-sm">Priority: {task.priority}</p>
              <p className="text-sm">Assigned to: {task.assignedTo?.email || "N/A"}</p>
              <p className="text-sm mb-2">Status: {task.status}</p>

              <div className="flex items-center space-x-2 mb-2">
                <select
                  className="p-1 rounded border dark:bg-gray-700"
                  value={task.status}
                  onChange={(e) =>
                    handleStatusChange(task._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
                <button
                  onClick={() => updateStatus(task._id, task.status)}
                  className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Update Status
                </button>
              </div>

              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTasks;