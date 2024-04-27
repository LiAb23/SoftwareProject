/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState } from "react"
import "./AppStyles.css"
import "./AppStyles.css"
import Board from "./Board.jsx"
import { FaSistrix, FaCog } from "react-icons/fa"

// A component

// invänta svar från servern först

export default function App() {
  const [showLoginForm, setShowLoginForm] = useState(false)

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm)
  }

  return (
    <div>
      <div className="header-container">
        <div className="picture-container"></div>
        <h1>My noteboard</h1>
        <div className="login-container">
          {!showLoginForm && (
            <button className="btn" onClick={toggleLoginForm}>
              Login
            </button>
          )}
          {showLoginForm && (
            <div className="login-form">
              <form>
                <input
                  type="text"
                  placeholder="Username"
                  className="login-input"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="login-input"
                />
                <button type="button" onClick={toggleLoginForm}>
                  Login
                </button>
              </form>
            </div>
          )}
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
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <Board />
    </div>
  )
}
