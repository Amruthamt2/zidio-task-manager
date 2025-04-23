import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserMeetings = ({ userId }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await axios.get(`http://localhost:5000/api/meetings/user/${userId}`);
      setMeetings(res.data);
    };
    fetchMeetings();
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Your Meetings</h2>
      <ul className="space-y-4">
        {meetings.map((meeting) => (
          <li key={meeting._id} className="border p-3 rounded flex justify-between">
            <span>{meeting.title}</span>
            <Link
              to={`/video/${meeting.roomId}`}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Join
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserMeetings;