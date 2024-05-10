/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

// StickyNote.jsx
import React from "react"
import "./StickyNoteStyles.css"
import { FaPencilAlt, FaRegStar } from "react-icons/fa"
import Draggable from "react-draggable"

export default function StickyNote({ color, title, text, timestamp }) {
  return (
    <Draggable>
    <div className={`sticky-note ${color}`}>
      <FaRegStar className="star-icon" />
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="timestamp-container">
        <span className="timestamp">{timestamp}</span>
      </div>
      <FaPencilAlt className="pen-icon" />
    </div>
    </Draggable>
  )
}
