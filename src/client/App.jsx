/**
 * App component that sets up the main application routes and handles user authentication and logout.
 *
 * @component
 * @returns {JSX.Element} - Rendered App component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { useAuth } from "./useAuth"
import "./styles/AppStyles.css"
import axios from "axios"
import Board from "./Board.jsx"
import Register from "./Register.jsx"
import Login from "./Login.jsx"
import MyBoard from "./MyBoard.jsx"
import {
  FaSistrix,
  FaCog,
  FaRegQuestionCircle,
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaUserCircle,
} from "react-icons/fa"
import puppy from "./images/puppy.webp"
import icon from "./images/icon.png"

export default function App() {
  const { user, logout } = useAuth()
  const [showLogoutMessage, setShowLogoutMessage] = useState(false)

  /**
   * Handles the logout of the user by sending a POST request to the server and updating the user state.
   * @async
   */
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/logout")
      logout()
      setShowLogoutMessage(true)
    } catch (error) {
      console.error("Error logging out user:", error)
    }
  }

  /**
   * Sets a timeout to hide the logout message after 3 seconds.'
   * @effect
   */
  useEffect(() => {
    if (showLogoutMessage) {
      const timeoutId = setTimeout(() => {
        setShowLogoutMessage(false)
      }, 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [showLogoutMessage, user])

  return (
    <Router>
      <div>
        <div className="header-container">
          <div className="picture-container"></div>
          <img src={puppy} alt="Image puppy" className="img" />
          <div className="title-container">
            <h1 className="title">My Noteboard</h1>
            <img src={icon} alt="Icon" className="icon" />
          </div>
          <div className="links-container">
            <div>
              {user && (
                <div className="user-info">
                  <p className="log-message">
                    Logged in as:{" "}
                    <span className="username">{user.username}</span>{" "}
                    <Link to="/my-board" className="avatar-link">
                      <FaUserCircle />
                    </Link>
                  </p>
                </div>
              )}
              {showLogoutMessage && (
                <div className="log-message">
                  <p>Logged out successfully.</p>
                </div>
              )}
            </div>
            {user ? (
              <Link to="/" onClick={handleLogout} className="link-btn">
                Logout
                <FaSignOutAlt className="btn-icon" />
              </Link>
            ) : (
              <>
                <Link to="/login" className="link-btn">
                  Login
                  <FaSignInAlt className="btn-icon" />
                </Link>
              </>
            )}
            <Link to="/register" className="link-btn">
              Register
              <FaUserPlus className="btn-icon" />
            </Link>
            <Link to="/" className="link-btn">
              Home
              <FaHome className="btn-icon" />
            </Link>
          </div>
        </div>
        <div className="start-icons">
          <div>
            <FaRegQuestionCircle className="help-icon" />
            <FaCog className="cog-icon" />
          </div>
          <div className="search-form">
            <div className="search-icon-wrapper">
              <FaSistrix className="search-icon" />
            </div>
            <input
              type="text"
              placeholder="Search"
              aria-label="Search"
              className="search-input"
            />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-board" element={<MyBoard />} />
        </Routes>
      </div>
    </Router>
  )
}
