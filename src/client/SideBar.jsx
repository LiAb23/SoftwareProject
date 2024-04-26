import React from 'react'
import './AppStyles.css'
import { FaAngleDown } from 'react-icons/fa'

export default function SideBar() {
  return (
    <div className="side-bar">
    <div>
      <h2>My lists:</h2>
      </div>
      <div className="down-arrow">
      <FaAngleDown />
    </div>
    </div>
  )
}
