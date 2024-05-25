import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "./BoardStyles.css"
import { useAuth } from "./useAuth"
import StickyNote from "./StickyNote"
import SideBar from "./SideBar.jsx"
import BottomBar from "./BottomBar"
import { FaRegPlusSquare, FaRegTrashAlt, FaTimes } from "react-icons/fa"
import { alternateColor } from "./colorUtils"

export default function MyBoard() {
  const [showModal, setShowModal] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [titleValue, setTitleValue] = useState("")
  const [textValue, setTextValue] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [notes, setNotes] = useState([])
  const [showTrashModal, setShowTrashModal] = useState(false)
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)
  const [editNote, setEditNote] = useState(null)
  const navigate = useNavigate()

  const { user } = useAuth()
  // console.log("My-board: User:", user) // fungerar, innehåller hela användarobjektet

  useEffect(() => {
    if (!user) {
      navigate("/")
    } else {
      fetchNotes()
    }
  }, [user, navigate])

  const fetchNotes = async () => {
    try {
      // console.log("Fetching notes for user:", user) // fungerar, innehåller hela användarobjektet
      const response = await axios.get(`http://localhost:8080/my-board/${user._id}`)
      console.log("Notes fetched:", response.data)

      let lastColor = "pink"
      // Uppdatera färgerna på hämtade lappar baserat på mönstret
      const updatedNotes = response.data.map((note) => {
        const color = alternateColor(lastColor)
        lastColor = color
        return {
        ...note,
        color: color,
        timestamp: `${new Date(note.createdAt).toLocaleDateString("sv-SE", {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })} at ${new Date(note.createdAt).toLocaleTimeString("sv-SE", {
          hour: '2-digit',
          minute: '2-digit', // uppdatera ev. senare med updatedAt
        })}`,
        }
      })

      setNotes(updatedNotes)
      // setNotes(response.data)
    } catch (error) {
      console.error("Error fetching notes:", error)
    }
  }

  const handleEditClick = (index) => {
    // Implementera logiken för redigering här
    // Visa redigeringsformulär eller modalfönster för att redigera den specifika anteckningen
    console.log("Edit note:", notes[index])
    const selectedNote = notes[index]
  setEditNote(selectedNote)
  setTitleValue(selectedNote.title)
  setTextValue(selectedNote.text)
  setShowNoteForm(true)
  }

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

    console.log("Submitting note for user:", user) // Logga användarobjektet
  console.log("Title value:", titleValue) // Logga titelvärdet
  console.log("Text value:", textValue) // Logga textvärdet

    // Kontrollera om titeln är tom
    if (!titleValue.trim()) {
      alert("Please fill in a title.") // Visa ett felmeddelande om titeln är tom
      return // Avbryt funktionen om titeln är tom
    }

    try {
      if (editNote) {
        console.log("Editing note:", editNote)
        
        // Om editNote är satt, betyder det att vi redigerar en befintlig anteckning
        const updatedNote = { ...editNote, title: titleValue, text: textValue, color: editNote.color, timestamp: `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}` }
        console.log("Updated note:", updatedNote)

        // Skicka en uppdateringsförfrågan till servern
        const response = await axios.put(`http://localhost:8080/my-board/${editNote._id}`, updatedNote)
        console.log("Updated note response:", response.data)
  
        // Uppdatera notes state med den uppdaterade anteckningen
      const updatedNotes = notes.map(note => note._id === editNote._id ? { ...note, title: titleValue, text: textValue, timestamp: updatedNote.timestamp } : note)
      setNotes(updatedNotes)
      console.log("Updated notes:", updatedNotes)
  
        // Återställ editNote och formulärets fält
        setEditNote(null)
        setTitleValue("")
        setTextValue("")
        setSuccessMessage("Your note was successfully updated.")
        setShowNoteForm(false)
  
        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      } else {
      // const response = await axios.post("https://softwareproject-wu0e.onrender.com/", {
      const response = await axios.post("http://localhost:8080/my-board", {
        // const response = await axios.post('https://software-project-liard.vercel.app/', {
        title: titleValue,
        text: textValue,
        createdBy: user._id,
      })
      // , {
      //   withCredentials: true // Se till att cookies skickas med begäran
      // })

      console.log("Saved note:", response.data)
      // console.log('Data saved to:', response.data.data)
      setTitleValue("") // Återställ inmatningsvärdet efter att ha sparat
      setTextValue("") // Återställ inmatningsvärdet efter att ha sparat
      setSuccessMessage("Your note was successfully saved.") // Visa meddelande om lyckad sparning
      setShowNoteForm(false)
      // Visa meddelandet i 2 sekunder innan det försvinner
      // Lägg till den nya anteckningen till listan med anteckningar

      // // Funktion för att alternera mellan färgerna gult, blått och rosa
      // function alternateColor(currentColor) {
      //   if (currentColor === "yellow") {
      //     return "blue"
      //   } else if (currentColor === "blue") {
      //     return "pink"
      //   } else {
      //     return "yellow"
      //   }
      // }

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
    }
    } catch (error) {
      console.error("Error saving note:", error)
      alert("Error saving note: " + error.message)
    }
  }

  const handleTrashClick = (index) => {
    setSelectedNoteIndex(index)
    setShowTrashModal(true)
  }

  const handleConfirmDelete = () => {
    const updatedNotes = [...notes]
    updatedNotes.splice(selectedNoteIndex, 1)
    setNotes(updatedNotes)
    setShowTrashModal(false)
  }

//   const handleConfirmDelete = async () => {
//   try {
//     if (selectedNoteIndex === null || selectedNoteIndex === undefined) {
//       console.error("No note selected for deletion")
//       alert("No note selected for deletion")
//       return
//     }

//     // Hämta ID för den anteckning som ska tas bort
//     const noteId = notes[selectedNoteIndex]._id

//     // Skicka en förfrågan till servern för att ta bort anteckningen
//     await axios.delete(`http://localhost:8080/my-board/${noteId}`)

//     // Uppdatera frontend: ta bort den borttagna anteckningen från listan
//     const updatedNotes = [...notes]
//     updatedNotes.splice(selectedNoteIndex, 1)
//     setNotes(updatedNotes)
//     setShowTrashModal(false)
//   } catch (error) {
//     console.error("Error deleting note:", error)
//     alert("Error deleting note: " + error.message)
//   }
// }

  const handleCancelDelete = () => {
    setShowTrashModal(false)
  }

  return (
    <>
      <div className="grid-container">
        <div className="side">
        <SideBar />
        </div>
        <div className="main-content">
          <div className="notes-grid">
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
                      value={editNote ? editNote.title : titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                    />
                  </div>
                  <p className="form-text">Text</p>
                  <textarea
                    className="form-textarea"
                    placeholder="Text"
                    value={editNote ? editNote.text : textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                  />{" "}
                  <br />
                  <button type="submit" className="btn">
                  {editNote ? "Update note" : "Create note"}
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
                onTrashClick={() => handleTrashClick(index)}
                onEditClick={() => handleEditClick(index)}
              />
            ))}
            <div className="icon-container">
              <div className="icons">
                <FaRegPlusSquare
                  className="plus-icon"
                  onClick={handleModalOpen}
                />
                <FaRegTrashAlt onClick={handleTrashClick}/>
                <div className="trash-bin" >
                  </div>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="modal" onClick={handleModalClose}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <FaTimes
                    className="close-icon"
                    onClick={handleModalClose}
                  />
                <h3>What do you want to create?</h3>
                <div
                  className="choice"
                  onClick={() => handleNoteTypeSelection("note")}
                >
                  New Note
                </div>
                <div
                  className="choice"
                  onClick={() => handleNoteTypeSelection("list")}
                >
                  New List
                </div>
              </div>
            </div>
          )}
          {showTrashModal && (
            <div className="modal">
              <div className="modal-content">
                <FaTimes
                  className="close-icon"
                  onClick={handleCancelDelete}
                />
                <h3>Do you want to delete this note?</h3>
                <div className="modal-buttons">
                  <button onClick={handleConfirmDelete}>Yes</button>
                  <button onClick={handleCancelDelete}>No</button>
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
