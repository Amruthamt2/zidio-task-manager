import React, { useEffect, useState } from "react";
import JitsiMeetComponent from "../components/jitsiMeetComponent";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // change if your backend is on another host

const AdminVideoChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [roomName, setRoomName] = useState("");

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const startMeeting = () => {
    if (!selectedUser) return alert("Please select a user");

    const generatedRoom = `meeting-${Date.now()}`;
    setRoomName(generatedRoom);
    setMeetingStarted(true);

    // Notify selected user via socket
    socket.emit("startMeeting", {
      toUserId: selectedUser,
      roomName: generatedRoom,
      initiatedBy: "Admin",
    });

    // Save meeting in DB
    axios.post("http://localhost:5000/api/meetings", {
      roomName: generatedRoom,
      participants: ["admin", selectedUser],
      status: "started",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Start a Video Meeting</h2>

      {!meetingStarted && (
        <div className="space-y-4">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select a User --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name || user.email || user._id}
              </option>
            ))}
          </select>

          <button
            onClick={startMeeting}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Start Meeting
          </button>
        </div>
      )}

      {meetingStarted && roomName && (
        <div className="mt-6">
          <JitsiMeetComponent roomName={roomName} displayName="Admin" />
        </div>
      )}
    </div>
  );
};

export default AdminVideoChat;