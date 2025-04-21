import { useEffect, useState } from "react";
import axios from "axios";

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tasks/user/${userId}`).then(res => {
      setTasks(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Assigned Tasks</h2>
      {tasks.map(task => (
        <div key={task._id} className="bg-white shadow rounded p-4 mb-4">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm">{task.description}</p>
          <p className="text-xs text-gray-500">Deadline: {new Date(task.deadline).toLocaleString()}</p>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width:` ${task.progress}%`}}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTasks;