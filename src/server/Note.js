/**
 * Note schema definition for MongoDB using Mongoose.
 *
 * @module Note
 * @requires mongoose
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import mongoose from "mongoose"

/**
 * Note schema for storing notes in the database with with a title, text, a reference to the user who created it and timestamps for creation and updates.
 *
 * @const {mongoose.Schema} noteSchema
 * @property {string} title - The title of the note. This field is required.
 * @property {string} [text] - The text content of the note.
 * @property {mongoose.ObjectId} createdBy - The user who created the note. References the User model.
 * @property {Date} createdAt - The date and time when the note was created. This field is automatically managed by Mongoose.
 * @property {Date} updatedAt - The date and time when the note was last updated. This field is automatically managed by Mongoose.
 */
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
)

/**
 * Note model for interacting with the notes collection in the database.
 *
 * @const {mongoose.Model} Note
 */
const Note = mongoose.model("Note", noteSchema)

export default Note