/**
 * Board component that renders the main board with sticky notes, sidebar and bottom bar.
 *
 * @component
 * @returns {JSX.Element} - Rendered Board component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import { useState } from "react"
import axios from "axios"
import "./styles/BoardStyles.css"
import StickyNote from "./StickyNote"
import SideBar from "./SideBar.jsx"
import BottomBar from "./BottomBar"
import { FaRegPlusSquare, FaRegTrashAlt, FaTimes } from "react-icons/fa"

export default function Board() {
  const [showModal, setShowModal] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [titleValue, setTitleValue] = useState("")
  const [textValue, setTextValue] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  /**
   * Opens a modal to choose a type if note form is not already open.
   */
  const handleModalOpen = () => {
    if (showNoteForm) {
      return
    }
    setShowModal(true)
  }

  /**
   * Closes the modal.
   */
  const handleModalClose = () => {
    setShowModal(false)
  }

  /**
   * Handles the selection of type and opens the note form if 'note' is selected.
   *
   * @param {string} type - The type of element to create (either 'note' or 'list').
   */
  const handleNoteTypeSelection = (type) => {
    if (type === "note") {
      setShowNoteForm(true)
    } else {
      setShowNoteForm(false)
    }
    handleModalClose()
  }

  /**
   * Submits the new note by sending a POST request to the server and updating the state.
   *
   * @param {React.FormEvent} event - The form submission event.
   * @async
   */
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // const response =
      // await axios.post("http://localhost:8080", {
        // const response = 
        await axios.post('https://software-project-liard.vercel.app/', {
        title: titleValue,
        text: textValue,
      })
      setTitleValue("")
      setTextValue("")
      setSuccessMessage("Your note was successfully saved.")
      setShowNoteForm(false)
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error saving note:", error)
    }
  }

  /**
   * Generates a timestamp for the current date and time.
   *
   * @returns {string} - The generated timestamp.
   */
  const generateTimestamp = () => {
    const currentDate = new Date()
    const dateString = currentDate.toLocaleDateString()
    const timeString = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    return `${dateString} at ${timeString}`
  }

  return (
    <>
      <div className="grid-container">
        <div className="side">
          <SideBar />
        </div>
        <div className="main-content">
          <div className="notes-grid">
            <StickyNote
              color="pink"
              title="Todo 1"
              text="Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
              timestamp={generateTimestamp()}
            />
            <StickyNote
              color="yellow"
              title="Todo 2"
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
              timestamp={generateTimestamp()}
            />
            <StickyNote
              color="blue"
              title="Todo 3"
              text={
                <>
                  Cras elementum ultrices diam.
                  <br />
                  <br />
                  Maecenas ligula massa, varius a, semper congue, euismod non,
                  mi.
                </>
              }
              timestamp={generateTimestamp()}
            />
            {showNoteForm ? (
              <div className="note-form">
                <form onSubmit={handleSubmit}>
                  <FaTimes
                    className="close-icon"
                    onClick={() => setShowNoteForm(false)}
                  />
                  <h3>Add new note</h3>
                  <div>
                    <p className="form-text">Title (mandatory)</p>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Title"
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                    />
                  </div>
                  <p className="form-text">Text</p>
                  <textarea
                    className="form-textarea"
                    placeholder="Text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                  />{" "}
                  <br />
                  <button type="submit" className="link-btn">
                    Create note
                  </button>
                  {successMessage && <p>{successMessage}</p>}
                </form>
              </div>
            ) : (
              <></>
            )}
            <div className="icon-container">
              <div className="icons">
                <FaRegPlusSquare
                  className="plus-icon"
                  onClick={handleModalOpen}
                />
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <FaTimes className="close-icon" onClick={handleModalClose} />
                <h3>What do you want to create?</h3>
                <div
                  className="choice"
                  onClick={() => handleNoteTypeSelection("note")}
                >
                  Note
                </div>
                <div
                  className="choice"
                  onClick={() => handleNoteTypeSelection("list")}
                >
                  List
                </div>
              </div>
            </div>
          )}
        </div>
        <BottomBar />
      </div>
    </>
  )
}
