/**
 * SideBar component that renders a sidebar with multiple draggable lists and handles scrolling and starring functionality.
 *
 * @component
 * @returns {JSX.Element} - Rendered SideBar component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import "./styles/AppStyles.css"
import { useState, useRef } from "react"
import { FaAngleDown, FaPencilAlt, FaRegStar, FaStar, FaAngleUp } from "react-icons/fa"
import Draggable from "react-draggable"

export default function SideBar() {
  const list1Items = ["Mark: 23 June", "Julia: 2 July", "Mom: 13 Aug"]
  const list2Items = ["1984 - George Orwell", "The Alchemist - Paulo Coelho", "The Catcher in the Rye - av J.D. Salinger"]
  const list3Items = ["Soap", "Stamp", "Face cream"]
  const list4Items = ["1", "2", "3"]

  /**
   * State for tracking starred status of lists.
   * @type {Object}
   * @property {boolean} list1 - Starred status of list 1
   * @property {boolean} list2 - Starred status of list 2
   * @property {boolean} list3 - Starred status of list 3
   * @property {boolean} list4 - Starred status of list 4
   */
  const [starred, setStarred] = useState({
    list1: false,
    list2: false,
    list3: false,
    list4: false,
  })

  /**
   * Reference to the scroll container element.
   */
  const scrollContainerRef = useRef(null)

  /**
   * Reference to the scroll interval ID.
   */
  const scrollIntervalRef = useRef(null)

  /**
   * Toggles the starred status of a list.
   *
   * @param {string} list - The list to be starred/unstarred
   */
  const handleStarClick = (list) => {
    setStarred((prevState) => ({
      ...prevState,
      [list]: !prevState[list],
    }))
  }

  /**
   * Handles the mouse down event to start scrolling down.
   */
  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        scrollContainerRef.current.scrollTop += 10
      }, 100)
    }
  }

  /**
   * Handles the mouse down event to start scrolling up.
   */
  const handleScrollUp = () => {
    if (scrollContainerRef.current) {
      scrollIntervalRef.current = setInterval(() => {
        scrollContainerRef.current.scrollTop -= 10
      }, 100)
    }
  }

  /**
   * Handles the mouse up event to stop scrolling.
   */
  const handleMouseUp = () => {
    clearInterval(scrollIntervalRef.current)
  }

  return (
    <div className="side-bar">
      <div className="scroll-container" ref={scrollContainerRef}>
      <div>
        <h2>My Lists:</h2>
      </div>
        <div 
        className="up-arrow"
          onMouseDown={handleScrollUp}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
        <FaAngleUp />
      </div>
      <Draggable bounds="parent">
      <div className="list-container">
        <div className="list-header">
        <h3 className="list-title"> Upcoming birthdays:
          </h3>
        <FaPencilAlt className="list-pen-icon" />
        {starred.list1 ? (
            <FaStar className="list-star-icon" onClick={() => handleStarClick("list1")} />
          ) : (
            <FaRegStar className="list-star-icon" onClick={() => handleStarClick("list1")} />
          )}
        </div>
        <ul className="list">
          {list1Items.map((item, index) => (
            <li key={index} >
            {item}</li>
          ))}
        </ul>
      </div>
      </Draggable>
      <Draggable bounds="parent">
      <div className="list-container">
        <div className="list-header">
        <h3 className="list-title">Books I wanna read:
          </h3>
          <FaPencilAlt className="list-pen-icon" />
          {starred.list2 ? (
            <FaStar className="list-star-icon" onClick={() => handleStarClick("list2")} />
          ) : (
            <FaRegStar className="list-star-icon" onClick={() => handleStarClick("list2")} />
          )}
        </div>
        <ul className="list">
          {list2Items.map((item, index) => (
            <li key={index}>
            {item}</li>
          ))}
        </ul>
      </div>
      </Draggable>
     <Draggable bounds="parent">
      <div className="list-container">
        <div className="list-header">
        <h3 className="list-title">Shopping List:
          </h3>
          <FaPencilAlt className="list-pen-icon" />
          {starred.list3 ? (
            <FaStar className="list-star-icon" onClick={() => handleStarClick("list3")} />
          ) : (
            <FaRegStar className="list-star-icon" onClick={() => handleStarClick("list3")} />
          )}
        </div>
        <ul className="list">
          {list3Items.map((item, index) => (
            <li key={index}>
            {item}</li>
          ))}
        </ul>
      </div>
      </Draggable>
      <Draggable bounds="parent">
        <div className="list-container">
          <div className="list-header">
            <h3 className="list-title">Another list:</h3>
            <FaPencilAlt className="list-pen-icon" />
            {starred.list4 ? (
              <FaStar className="list-star-icon" onClick={() => handleStarClick("list4")} />
            ) : (
              <FaRegStar className="list-star-icon" onClick={() => handleStarClick("list4")} />
            )}
          </div>
          <ul className="list">
            {list4Items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </Draggable>
      </div>
      <div 
      className="down-arrow"
      onMouseDown={handleScrollDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      >
        <FaAngleDown />
      </div>
    </div>
  )
}
