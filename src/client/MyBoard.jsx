/**
 * MyBoard component that renders the personal main board with sticky notes, sidebar and bottom bar including functionality to add, edit and delete notes.
 *
 * @component
 * @returns {JSX.Element} - Rendered MyBoard component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import "./styles/BoardStyles.css"
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

  /**
   * Fetches personal notes for the logged-in user when the component mounts or the user changes.
   */
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/my-board/${user._id}`
        )

        let lastColor = "pink"
        const updatedNotes = response.data.map((note) => {
          const color = alternateColor(lastColor)
          lastColor = color
          return {
            ...note,
            color: color,
            timestamp: `${new Date(note.createdAt).toLocaleDateString("sv-SE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })} at ${new Date(note.createdAt).toLocaleTimeString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
            })}`,
          }
        })
        setNotes(updatedNotes)
      } catch (error) {
        console.error("Error fetching notes:", error)
      }
    }

    if (!user) {
      navigate("/")
    } else {
      fetchNotes()
    }
  }, [user, navigate])

  /**
   * Handles the click event to start editing a note.
   *
   * @param {number} index - Index of the note to edit.
   */
  const handleEditClick = (index) => {
    const selectedNote = notes[index]
    setEditNote(selectedNote)
    setTitleValue(selectedNote.title)
    setTextValue(selectedNote.text)
    setShowNoteForm(true)
  }

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
   * Handles the form submission for creating or updating a note.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!titleValue.trim()) {
      alert("Please fill in a title.")
      return
    }

    try {
      if (editNote) {
        const updatedNote = {
          ...editNote,
          title: titleValue,
          text: textValue,
          color: editNote.color,
          timestamp: `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}`,
        }

        await axios.put(
          `http://localhost:8080/my-board/${editNote._id}`,
          updatedNote
        )

        const updatedNotes = notes.map((note) =>
          note._id === editNote._id
            ? {
                ...note,
                title: titleValue,
                text: textValue,
                timestamp: updatedNote.timestamp,
              }
            : note
        )
        setNotes(updatedNotes)

        setEditNote(null)
        setTitleValue("")
        setTextValue("")
        setSuccessMessage("Your note was successfully updated.")
        setShowNoteForm(false)

        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      } else {
        await axios.post("http://localhost:8080/my-board", {
          // const response = await axios.post('https://software-project-liard.vercel.app/my-board', {
          title: titleValue,
          text: textValue,
          createdBy: user._id,
        })

        setTitleValue("")
        setTextValue("")
        setSuccessMessage("Your note was successfully saved.")
        setShowNoteForm(false)
        
        const newNote = {
          color: alternateColor(notes[notes.length - 1]?.color || "pink"),
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

  /**
   * Handles the click event to show the delete confirmation modal.
   *
   * @param {number} index - Index of the note to delete.
   */
  const handleTrashClick = (index) => {
    setSelectedNoteIndex(index)
    setShowTrashModal(true)
  }

  /**
   * Confirms the deletion of the selected note.
   */
  const handleConfirmDelete = () => {
    const updatedNotes = [...notes]
    updatedNotes.splice(selectedNoteIndex, 1)
    setNotes(updatedNotes)
    setShowTrashModal(false)
  }

  /**
   * Cancels the deletion of the selected note.
   */
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
            {showNoteForm ? (
              <div className="note-form">
                <form onSubmit={handleSubmit}>
                  <FaTimes
                    className="close-icon"
                    onClick={() => setShowNoteForm(false)}
                  />
                  <div className="form-header">
                  <h3>Add new note</h3>
                  </div>
                  <div className="form-group">
                    <p className="form-title">Title (mandatory)</p>
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
                  <button type="submit" className="link-btn form-btn">
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
                <FaRegTrashAlt onClick={handleTrashClick} />
                <div className="trash-bin"></div>
              </div>
            </div>
          </div>
          {showModal && (
            <div className="modal" onClick={handleModalClose}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <FaTimes className="close-icon" onClick={handleModalClose} />
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
                <FaTimes className="close-icon" onClick={handleCancelDelete} />
                <h3>Do you want to delete this note?</h3>
                <div className="modal-buttons">
                  <button className="link-btn" onClick={handleConfirmDelete}>
                    Yes
                  </button>
                  <button className="link-btn" onClick={handleCancelDelete}>
                    No
                  </button>
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
