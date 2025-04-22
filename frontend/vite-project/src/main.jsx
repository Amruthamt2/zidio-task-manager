// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; // Use App.jsx for all routing logic
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
        <App/>
    </AuthProvider>
  </React.StrictMode>
);