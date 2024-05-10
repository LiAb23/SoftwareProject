import React from "react"
import "./AppStyles.css"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <ul className="bottom-list">
        <div className="left-arrow">
          <FaAngleLeft />
        </div>
        <li>Note 1</li>
        <li>Note 2</li>
        <li>Note 3</li>
        <div className="right-arrow">
          <FaAngleRight />
        </div>
      </ul>
    </div>
  )
}
