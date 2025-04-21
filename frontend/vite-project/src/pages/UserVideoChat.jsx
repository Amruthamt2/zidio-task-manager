import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import JitsiMeetComponent from "../components/jitsiMeetComponent";

const socket = io("http://localhost:5000");

const UserVideoChat = ({ userId }) => {
  const [meetingRoom, setMeetingRoom] = useState("");
  const [startMeeting, setStartMeeting] = useState(false);

  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);
    }

    socket.on("receive-meeting-request", (meeting) => {
      if (meeting?.roomId) {
        setMeetingRoom(meeting.roomId);
        setStartMeeting(true);
      }
    });

    return () => {
      socket.off("receive-meeting-request");
    };
  }, [userId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">User Video Chat</h2>
      {!startMeeting ? (
        <p>No active meeting. Please wait for an invitation.</p>
      ) : (
        <JitsiMeetComponent roomName={meetingRoom} displayName="User" />
      )}
    </div>
  );
};

export default UserVideoChat;