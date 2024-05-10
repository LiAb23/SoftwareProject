/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import { useState } from "react"
import axios from "axios"
import "./BoardStyles.css"
import StickyNote from "./StickyNote"
import SideBar from "./SideBar.jsx"
import BottomBar from "./BottomBar"
import {
  FaRegPlusSquare,
  FaRegTrashAlt,
} from "react-icons/fa"

// A component

// invänta svar från servern först

export default function Board() {
  const [showModal, setShowModal] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [titleValue, setTitleValue] = useState("")
  const [textValue, setTextValue] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleModalOpen = () => {
    if (showNoteForm) {
      return
    }
    // Om showModal är true, stäng modalen, annars öppna den
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleNoteTypeSelection = (type) => {
    if (type === "note") {
      setShowNoteForm(true)
    } else {
      setShowNoteForm(false)
    }
    handleModalClose()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post("http://localhost:8080", {
        // const response = await axios.post('https://software-project-liard.vercel.app/', {
        title: titleValue,
        text: textValue,
      })
      // console.log('Saved note:', response.data)
      // console.log('Data saved to:', response.data.data)
      setTitleValue("") // Återställ inmatningsvärdet efter att ha sparat
      setTextValue("") // Återställ inmatningsvärdet efter att ha sparat
      setSuccessMessage("Your note was successfully saved.") // Visa meddelande om lyckad sparning
      setShowNoteForm(false)
      // Visa meddelandet i 2 sekunder innan det försvinner
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error saving note:", error)
    }
  }

  return (
    <>
      <div className="grid-container">
        <SideBar />
        <StickyNote
          color="pink"
          title="Todo 1"
          text="Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor."
        />
        <StickyNote
          color="yellow"
          title="Todo 2"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
        />
        <StickyNote
          color="blue"
          title="Todo 3"
          text={
            <>
              Cras elementum ultrices diam.
              <br />
              <br />
              Maecenas ligula massa, varius a, semper congue, euismod non, mi.
            </>
          }
        />
        <div className="container">
          <div>
          {showNoteForm ? ( // Visa formuläret för att skapa anteckningen om tillståndet är sant
              <div className="note-form">
            <form onSubmit={handleSubmit}>
              <h3>Add new note</h3>
              <div>
                <p className="form-text">Title (mandatory)</p>
                <input className="form-input"
                  type="text"
                  placeholder="Title"
                  value={titleValue}
                  onChange={(e) => setTitleValue(e.target.value)}
                />
              </div>
              <p className="form-text">Text</p>
              <textarea className="form-textarea"
                placeholder="Text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
              /> <br />
              <button type="submit" className="btn">
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
                <FaRegPlusSquare className="plus-icon" onClick={handleModalOpen}/>
                <FaRegTrashAlt />
              </div>
            </div>
          </div>
          {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>What do you want to create?</h3>
            <div className="choice" onClick={() => handleNoteTypeSelection("note")}>Note</div>
            <div className="choice" onClick={() => handleNoteTypeSelection("list")}>List</div>
      </div>
    </div>
  )}
        </div>
      <BottomBar />
      </div>
    </>
  )
}
