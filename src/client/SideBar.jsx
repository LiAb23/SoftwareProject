import React from 'react'
import './App.css'
import { FaAngleDown } from 'react-icons/fa'

export default function SideBar() {
  return (
    <div className="side-container">
    <div className="side-bar">
      <h2>My lists:</h2>
      </div>
      <div className="down-arrow">
      <FaAngleDown style={{ fontSize: '20px' }} />
    </div>
    </div>
  )
}
