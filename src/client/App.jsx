/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import "./AppStyles.css"
import Board from "./Board.jsx"
import Register from "./Register.jsx"
import Login from "./Login.jsx"
import MyBoard from "./MyBoard.jsx"
import { FaSistrix, FaCog } from "react-icons/fa"

// A component

// invänta svar från servern först

export default function App() {
  return (
    <Router>
      <div>
        <div className="header-container">
          <div className="picture-container"></div>
          <h1>My noteboard</h1>
          <div>
            <Link to="/login" className="link-btn">
              Login
            </Link>
            <Link to="/register" className="link-btn">
              Register
            </Link>
            <Link to="/" className="link-btn">
              Home
            </Link>
          </div>
        </div>
        <div className="start-icons">
          <div>
            <FaCog className="cog-icon" />
          </div>
          <div className="search-form">
            <div className="search-icon-wrapper">
              <FaSistrix className="search-icon" />
            </div>
            <input type="text" placeholder="Search" aria-label="Search" className="search-input"/>
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
