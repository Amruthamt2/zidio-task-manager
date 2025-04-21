import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      login(res.data.user);
      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/user/home");
    } catch (err) {
      setErrMsg("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <img src="/logo.png" alt="Zidio" className="w-32 mb-4" />
      <h1 className="text-2xl font-bold mb-4">Welcome to Zidio Task Manager</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="text-red-500 text-center">{errMsg}</p>
      </form>
      <p className="mt-4">
        Don’t have an account?{" "}
        <button className="text-blue-600" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default LoginPage;