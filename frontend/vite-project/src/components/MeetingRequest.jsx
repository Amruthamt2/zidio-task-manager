import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const MeetingRequest = ({ currentUserId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchMeetings();
    socket.emit("register", currentUserId);
    socket.on("receive-meeting-request", () => fetchMeetings());
  }, []);

  const fetchMeetings = async () => {
    const res = await axios.get(`/api/meetings/user/${currentUserId}`);
    setRequests(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.patch(`/api/meetings/status/${id}`, { status });
    fetchMeetings();
  };

  return (
    <div>
      <h2>Meeting Requests</h2>
      {requests.map((r) => (
        <div key={r._id} className="border p-2 mb-2">
          <p><strong>From:</strong> {r.fromUserId}</p>
          <p><strong>Room:</strong> {r.roomId}</p>
          <p><strong>Status:</strong> {r.status}</p>
          {r.status === "pending" && (
            <>
              <button onClick={() => updateStatus(r._id, "accepted")}>Accept</button>
              <button onClick={() => updateStatus(r._id, "rejected")}>Reject</button>
            </>
          )}
          {r.status === "accepted" && (
            <a href={`https://meet.jit.si/${r.roomId}`} target="_blank" rel="noreferrer">Join Meeting</a>
          )}
        </div>
      ))}
    </div>
  );
};

export default MeetingRequest;