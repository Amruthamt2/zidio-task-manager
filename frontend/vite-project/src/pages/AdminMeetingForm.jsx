import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const AdminMeetingForm = () => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomId = uuidv4(); // generate unique meeting room ID

    try {
      const res = await axios.post("http://localhost:5000/api/meetings", {
        title,
        roomId,
        assignedTo: userId,
      });
      window.location.href = `/video/${roomId}`; // redirect to meeting room
    } catch (err) {
      console.error("Meeting creation failed", err);
      setMessage("Meeting creation failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Create Meeting</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Meeting Title"
          className="border p-2 w-full"
          required
        />
        <select
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 w-full"
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name || user.email}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create & Join
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default AdminMeetingForm;