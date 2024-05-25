import { useState } from "react"
import PropTypes from 'prop-types'
import "./StickyNoteStyles.css"
import { FaPencilAlt, FaRegStar, FaStar } from "react-icons/fa"

export default function MiniStickyNote({ color, title, text, timestamp }) {
  const [isStarred, setIsStarred] = useState(false)

  const toggleStar = () => {
    setIsStarred(!isStarred)
  }

  return (
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
  )
}

MiniStickyNote.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
}
