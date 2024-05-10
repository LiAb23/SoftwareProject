import React from "react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import "./BoardStyles.css"
import StickyNote from "./StickyNote"
import SideBar from "./SideBar.jsx"
import BottomBar from "./BottomBar"
import { FaRegPlusSquare, FaRegTrashAlt, FaTimes } from "react-icons/fa"

// A component

// invänta svar från servern först

export default function MyBoard() {
  const [showModal, setShowModal] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [titleValue, setTitleValue] = useState("")
  const [textValue, setTextValue] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [notes, setNotes] = useState([])

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get("http://localhost:8080/my-board") // Gör en GET-förfrågan till din server
        console.log("Notes fetched:", response.data) // Skriver ut hela HTML-sidans kod
        setNotes(response.data) // Spara de hämtade anteckningarna i komponentens tillstånd
      } catch (error) {
        console.error("Error fetching notes:", error)
      }
    }

    fetchNotes() // Kalla på funktionen för att hämta anteckningar när komponenten monteras
  }, []) // Använd en tom beroendelista för att effekten bara ska köras vid montering

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

    // Kontrollera om titeln är tom
    if (!titleValue.trim()) {
      alert("Please fill in the title.") // Visa ett felmeddelande om titeln är tom
      return // Avbryt funktionen om titeln är tom
    }

    try {
      // const response = await axios.post("https://softwareproject-wu0e.onrender.com/", {
      //const response = await axios.post("http://localhost:8080", {
        const response = await axios.post('https://software-project-liard.vercel.app/', {
        title: titleValue,
        text: textValue,
      })
      console.log("Saved note:", response.data)
      // console.log('Data saved to:', response.data.data)
      setTitleValue("") // Återställ inmatningsvärdet efter att ha sparat
      setTextValue("") // Återställ inmatningsvärdet efter att ha sparat
      setSuccessMessage("Your note was successfully saved.") // Visa meddelande om lyckad sparning
      setShowNoteForm(false)
      // Visa meddelandet i 2 sekunder innan det försvinner
      // Lägg till den nya anteckningen till listan med anteckningar

      // Funktion för att alternera mellan färgerna gult, blått och rosa
      function alternateColor(currentColor) {
        if (currentColor === "yellow") {
          return "blue"
        } else if (currentColor === "blue") {
          return "pink"
        } else {
          return "yellow"
        }
      }

      // Skapa en ny lapp med alternerande färg
      const newNote = {
        color: alternateColor(notes[notes.length - 1]?.color || "pink"), // Använder sista lappens färg om det finns, annars default till rosa
        title: titleValue,
        text: textValue,
        timestamp: `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}`,
      }
      setNotes([...notes, newNote])

      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      console.error("Error saving note:", error)
      alert
    }
  }

  return (
    <>
      <div>
        <Link to="/" className="link-btn">
          Logout
        </Link>
      </div>
      <div className="grid-container">
        <SideBar />
        <div className="container">
          <div>
            {showNoteForm ? ( // Visa formuläret för att skapa anteckningen om tillståndet är sant
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
                  <button type="submit" className="btn">
                    Create note
                  </button>
                  {successMessage && <p>{successMessage}</p>}
                </form>
              </div>
            ) : (
              <></>
            )}
            {notes.map((note, index) => (
              <StickyNote
                key={index}
                color={note.color}
                title={note.title}
                text={note.text}
                timestamp={note.timestamp}
              />
            ))}
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
