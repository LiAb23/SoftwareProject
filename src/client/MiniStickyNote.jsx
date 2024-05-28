/**
 * MiniStickyNote component that renders a mini sticky note with a title, a text and a timestamp. It includes a star icon to toggle the note as a priority note and a pen icon to edit the note.
 *
 * @component
 * @param {object} props - Component props
 * @param {string} props.color - The color of the sticky note
 * @param {string} props.title - The title of the sticky note
 * @param {string} props.text - The text of the sticky note
 * @param {string} props.timestamp - The timestamp of the sticky note
 * @returns {JSX.Element} - Rendered MiniStickyNote component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import { useState } from "react"
import PropTypes from 'prop-types'
import "./styles/StickyNoteStyles.css"
import { FaPencilAlt, FaRegStar, FaStar } from "react-icons/fa"
import Draggable from "react-draggable"

export default function MiniStickyNote({ color, title, text, timestamp }) {
  const [isStarred, setIsStarred] = useState(false)

  const toggleStar = () => {
    setIsStarred(!isStarred)
  }

  return (
    <Draggable bounds="parent">
      <div className={`mini-sticky-note ${color}`}>
        {isStarred ? (
          <FaStar className="star-icon" onClick={toggleStar} />
        ) : (
          <FaRegStar className="star-icon" onClick={toggleStar} />
        )}
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

MiniStickyNote.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
}
