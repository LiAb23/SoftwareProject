/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState } from 'react';
import './App.css'; // Säkerställ att dina stilmallar är korrekt länkade
import './App.css'
import Board from './Board.jsx'
import SideBar from './SideBar.jsx'
import BottomBar from './BottomBar'
import { FaRegPlusSquare, FaRegTrashAlt, FaSistrix, FaCog } from 'react-icons/fa'

// A component

// invänta svar från servern först

export default function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
       <div className="header-container">
        <div style={{ flex: 1 }}></div> {/* Lämnar plats för att centrera rubriken */}
        <h1>My noteboard</h1>
        <div className="login-container">
          {!showLoginForm && (
      <button className="login-button"onClick={toggleLoginForm}>
        Login
      </button>
      )}
      {showLoginForm && (
        <div className="login-form">
          <form>
            <input type="text" placeholder="Username" className="login-input" />
            <input type="password" placeholder="Password" className="login-input" />
            <button type="button" onClick={toggleLoginForm}>Login</button>
          </form>
        </div>
      )}
      </div>
      <div style={{ flex: 1 }}></div> {/* Tom dummy-div till höger, kan tas bort om inte nödvändig */}
    </div>
    <div>
      < FaCog style={{ marginLeft : '1200px', fontSize: '20px' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <input type="text" placeholder="Search" style={{ marginRight: '7px' }} />
      < FaSistrix style={{ fontSize: '20px' }} />
      <p></p>
      </div>
      <Board />
        <SideBar />
    <div className="container">
      <div className="icon-container">
      <FaRegPlusSquare />
      <FaRegTrashAlt />
      </div>
    </div>
    <BottomBar />
    </div>
  )
}
