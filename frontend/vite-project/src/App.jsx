import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMeetingForm from "./pages/AdminMeetingForm";

import UserHome from "./pages/UserHome";
import UserMeetings from "./pages/UserMeetings";

import VideoCall from "./pages/VideoCall";

import { useAuth } from "./context/AuthContext";

const App = () => {
  const auth = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        {auth.user?.role === "admin" && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/video-chat" element={<AdminMeetingForm />} />
          </>
        )}

        {/* User Routes */}
        {auth.user?.role === "user" && (
          <>
            <Route path="/user/home" element={<UserHome />} />
            <Route path="/user/video-chat" element={<UserMeetings/>} />
          </>
        )}
        {/* Shared Route:Jitsi Video Meeting */}
        <Route path="/video/:roomId" element={<VideoCall/>} />
      </Routes>
    </Router>
  );
};

export default App;