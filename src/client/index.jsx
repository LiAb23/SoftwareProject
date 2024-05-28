/**
 * Main Entry Point component that sets up the root of the React application, wrapping the App component with an AuthProvider and adding a footer.
 *
 * @component
 * @returns {JSX.Element} - Rendered root component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import React from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "./AuthProvider"
import App from "./App.jsx"
import "./styles/index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <div className="flex-container">
      <App />
      <footer className="footer">
        {" "}
        &copy; 2024 LNU
      </footer>
    </div>
    </AuthProvider>
  </React.StrictMode>,
)
