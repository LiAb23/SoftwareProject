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
      // const response = await axios.post('https://software-project-liard.vercel.app/', {
        title: titleValue,
        text: textValue,
      })
      console.log('Saved note:', response.data)
      console.log('Data saved to:', response.data.data)
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
    <div style={{ maxWidth: '180px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Add your note</h2>
          <input
            type="text"
            placeholder="Title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="text"
            placeholder="Text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            style={{ marginBottom: '10px', height: '60px'}}
          />
        <button type="submit" className="btn btn-primary" style={{ width: '100px' }}>Add</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {/* <FaRegStar />
      <FaPen /> */}
       </div>
  )
}