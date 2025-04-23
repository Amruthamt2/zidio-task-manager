// src/pages/VideoCall.jsx or VideoRoom.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const VideoCall = () => {
  const { roomId } = useParams();

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName: roomId,
      width: "100%",
      height: 700,
      parentNode: document.getElementById("jitsi-container"),
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      },
    };
    new window.JitsiMeetExternalAPI(domain, options);
  }, [roomId]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Meeting Room: {roomId}</h2>
      <div id="jitsi-container" style={{ height: "700px", width: "100%" }}></div>
    </div>
  );
};

export default VideoCall;