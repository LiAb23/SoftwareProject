/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import { useState } from 'react'
import axios from 'axios' 
import { FaPen, FaRegStar } from 'react-icons/fa'

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
        title: titleValue,
        text: textValue,
      })
      console.log('Saved note:', response.data)
      setTitleValue('') // Återställ inmatningsvärdet efter att ha sparat
      setTextValue('') // Återställ inmatningsvärdet efter att ha sparat
      setSuccessMessage('Your text was successfully saved.') // Visa meddelande om lyckad sparning
      // Visa meddelandet i 2 sekunder innan det försvinner
      setTimeout(() => {
        setSuccessMessage('')
      }, 2000);
    } catch (error) {
      console.error('Error saving note:', error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        <button type="submit" className="btn btn-primary">Save note</button>
        {successMessage && <p>{successMessage}</p>}
      </form>
      <FaRegStar />
      <FaPen />
    </div>
  )
}