// JitsiMeetComponent.jsx
import React, { useEffect, useRef } from "react";

const JitsiMeetComponent = ({ roomName, displayName }) => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    const domain = "meet.jit.si";
    const options = {
      roomName,
      width: "100%",
      height: 500,
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    return () => api.dispose();
  }, [roomName, displayName]);

  return <div ref={jitsiContainerRef} className="w-full h-full" />;
};

export default JitsiMeetComponent;