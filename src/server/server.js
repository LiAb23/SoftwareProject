/**
 * A module that starts an Express server.
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

// Create a new express application instance
const app = express()
const PORT = process.env.PORT || 5000
// Konstruera sökvägen till .env-filen
const envPath = path.resolve(process.cwd(), '.env')

// Ladda in miljövariabler från .env-filen
dotenv.config({ path: envPath })

// Middleware for parsing JSON bodies for incoming requests
app.use(express.json())

app.use(cors())

// Check if DB_CONNECTION_STRING is defined
// if (!process.env.DB_CONNECTION_STRING) {
//   throw new Error('DB_CONNECTION_STRING is not defined')
// }

// Check if DB_CONNECTION_STRING is defined
if (!process.env.MONGODB_URI) { // ny
  throw new Error('MONGODB_URI is not defined')
}

// Try connecting to MongoDB
// mongoose.connect(process.env.DB_CONNECTION_STRING)
mongoose.connect(process.env.MONGODB_URI) // ny
  .then(() => {
  console.log('Connected to MongoDB')
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error)
  process.exit(1)
})

// Define a Mongoose schema for notes
const noteSchema = new mongoose.Schema({
  title: String, 
  text: String,
}, {
  // Add and maintain createdAt and updatedAt fields.
  timestamps: true,
})

// Create a Mongoose model for notes based on the schema
const Note = mongoose.model('Note', noteSchema)

// Create a new note
app.post('/', async (req, res) => {
  try {
    const { title, text } = req.body
    const note = new Note({ title, text })
    await note.save()
    res.status(201).json(note)
  } catch (error) {
    res.status(500).json({ error: 'Error creating note' })
  }
})

// Fetch all notes
app.get('/', async (req, res) => {
  try {
    const notes = await Note.find()
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' })
  }
})

  // Start the HTTP server listening for connections
  const server = app.listen(process.env.PORT, () => {
    console.log(`\nServer running at http://localhost:${server.address().port}`)
    console.log('Press Ctrl-C to terminate...')
  })
