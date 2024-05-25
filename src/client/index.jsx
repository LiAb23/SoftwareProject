/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import React from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "./AuthProvider"
import App from "./App.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider> {/* Omge App med AuthProvider */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <App />
      <footer
        style={{
          marginTop: "auto",
          width: "100%",
          textAlign: "left",
          padding: "10px",
        }}
      >
        {" "}
        &copy; 2024 LNU
      </footer>
    </div>
    </AuthProvider>
  </React.StrictMode>,
)
