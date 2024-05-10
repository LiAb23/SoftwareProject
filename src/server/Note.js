import mongoose from "mongoose"

// Define a Mongoose schema for notes
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: String,
  },
  {
    // Add and maintain createdAt and updatedAt fields.
    timestamps: true,
  }
)

// Create a Mongoose model for notes based on the schema
const Note = mongoose.model("Note", noteSchema)

export default Note