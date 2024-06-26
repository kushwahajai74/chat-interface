import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./Provider/AuthProvider.jsx";
import axios from "axios";

axios.defaults.baseURL = "https://coral-app-wu5hd.ondigitalocean.app/api/v1";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  // </React.StrictMode>
);
