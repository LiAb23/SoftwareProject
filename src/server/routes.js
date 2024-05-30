/**
 * Express router providing user and note related routes.
 *
 * @module routes
 * @requires express
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import express from 'express'
import Note from './Note.js'
import User from './User.js'

const router = express.Router()

/**
 * Route for registering a new user.
 *
 * @name POST/register
 * @function
 * @memberof module:routes
 * @inner
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post("/register", async (req, res) => {
  try {
    // Extract the user data from the request body
    const { username, password, email, termsAccepted } = req.body

    // Create a new user instance
    const newUser = new User({ username, password, email, termsAccepted })

    // Save the user to the database
    await newUser.save()

    // Send a success response to the client
    res.status(201).json({
      message: "User registered successfully",
    })
  } catch (error) {
    // If an error occurs, log it and send an error response to the client
    console.error("Error registering user:", error)
    res.status(500).json({ error: "Failed to register user" })
  }
})

/**
 * Route for logging in a user.
 *
 * @name POST/login
 * @function
 * @memberof module:routes
 * @inner
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post("/login", async (req, res) => {
  try {
    // Authenticate the user credentials against the database.
    const user = await User.authenticate(req.body.username, req.body.password)

    if (!user) {
      console.error("Authentication failed: No user returned")
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Regenerate the session to prevent fixation attacks.
    req.session.regenerate((err) => {
      if (err) {
        console.error("Failed to re-generate session:", err)
        return res.status(500).json({ error: "Failed to log in user" })
      }

      // Mark user is logged in and store the authenticated user in the session.
      req.session.user = user

      res.json({ user })
    })
  } catch (error) {
    console.error("Error logging in user:", error)
    res.status(500).json({ error: "Failed to log in user" })
  }
})

/**
 * Route for creating a new example note.
 *
 * @name POST/
 * @function
 * @memberof module:routes
 * @inner
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post("/", async (req, res) => {
  try {
    const { title, text } = req.body

    const note = new Note({ title, text })
    await note.save()
    res.status(201).json(note)
  } catch (error) {
    console.error("Error creating note:", error)
    res.status(500).json({ error: "Error creating note" })
  }
})

/**
 * Route for creating a new personal note.
 *
 * @name POST/my-board
 * @function
 * @memberof module:routes
 * @inner
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post("/my-board", async (req, res) => {
  try {
    const { title, text, createdBy } = req.body

    const note = new Note({ title, text, createdBy })
    await note.save()

    res.status(201).json(note)
  } catch (error) {
    console.error("Error creating note:", error)
    res.status(500).json({ error: "Error creating note" })
  }
})

/**
 * Route for fetching personal notes.
 *
 * @name GET/my-board/:userId
 * @function
 * @memberof module:routes
 * @inner
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.get("/my-board/:userId", async (req, res) => {
  try {
    const createdBy = req.params.userId

    const notes = await Note.find({ createdBy: createdBy })
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error fetching notes:", error)
    res.status(500).json({ error: "Error fetching notes" })
  }
})

/**
 * Route for updating a specific note.
 *
 * @name PUT/my-board/:id
 * @function
 * @memberof module:routes
 * @inner
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.put("/my-board/:id", async (req, res) => {
  try {
    const { title, text, color } = req.body
    const noteId = req.params.id
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, text, color },
      { new: true }
    )
    res.status(200).json(updatedNote)
  } catch (error) {
    console.error("Error updating note:", error)
    res.status(500).json({ error: "Error updating note" })
  }
})

/**
 * Route for logging out a user.
 *
 * @name POST/logout
 * @function
 * @memberof module:routes
 * @inner
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
router.post("/logout", (req, res) => {
  try {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying ", err)
        return res.status(500).json({ error: "Failed to logout" })
      }
      res.json({ message: "Logout successful" })
    })
  } catch (error) {
    console.error("Error logging out user:", error)
    res.status(500).json({ error: "Failed to logout" })
  }
})

export default router