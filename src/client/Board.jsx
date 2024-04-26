/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import { useState } from 'react'
import axios from 'axios'
import './BoardStyles.css'
import SideBar from './SideBar.jsx'
import BottomBar from './BottomBar' 
import { FaRegPlusSquare, FaRegTrashAlt, FaPen, FaRegStar } from 'react-icons/fa'

// A component

// invänta svar från servern först

export default function Board() {
  const [titleValue, setTitleValue] = useState('')
  const [textValue, setTextValue] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:8080', {
      // const response = await axios.post('https://software-project-liard.vercel.app/', {
        title: titleValue,
        text: textValue,
      })
      // console.log('Saved note:', response.data)
      // console.log('Data saved to:', response.data.data)
      setTitleValue('') // Återställ inmatningsvärdet efter att ha sparat
      setTextValue('') // Återställ inmatningsvärdet efter att ha sparat
      setSuccessMessage('Your note was successfully saved.') // Visa meddelande om lyckad sparning
      // Visa meddelandet i 2 sekunder innan det försvinner
      setTimeout(() => {
        setSuccessMessage('')
      }, 2000);
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  return (
    <>
    <div className="grid-container">
    <SideBar />
    <div className="container">
    <div>
      <form onSubmit={handleSubmit} className="note-form">
        <h2>Add a new note</h2>
          <input
            type="text"
            placeholder="Title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="form-field"
          />
          <input
            type="text"
            placeholder="Text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            className="form-field"
          />
        <button type="submit" className="btn">Add</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {/* <FaRegStar />
      <FaPen /> */} 
    <div className="icon-container">
      <div className="icons">
      <FaRegPlusSquare />
      <FaRegTrashAlt />
      </div>
    </div>
    </div>
    </div>
    </div>
    <BottomBar />
    </>
  )
}