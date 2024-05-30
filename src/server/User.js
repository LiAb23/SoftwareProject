/**
 * User schema definition for MongoDB using Mongoose.
 *
 * @module User
 * @requires mongoose
 * @requires bcryptjs
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

/**
 * User schema for storing user information in the database.
 *
 * @const {mongoose.Schema} userSchema
 * @property {string} username - The username of the user. This field is required, must be unique, and have a length between 3 and 256 characters.
 * @property {string} password - The password of the user. This field is required and must have a length between 10 and 256 characters.
 * @property {string} email - The email address of the user. This field is required, must be unique, and must match the email pattern.
 * @property {boolean} termsAccepted - Indicates whether the user has accepted the terms. This field is required.
 * @property {Date} createdAt - The date and time when the user was created. This field is automatically managed by Mongoose.
 * @property {Date} updatedAt - The date and time when the user was last updated. This field is automatically managed by Mongoose.
 */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [3, "The username must be of minimum length 3 characters."],
      maxlength: [
        256,
        "The username must be of maximum length 256 characters.",
      ],
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [10, "The password must be of minimum length 10 characters."],
      maxlength: [
        256,
        "The password must be of maximum length 256 characters.",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

/**
 * Middleware that salts and hashes the user's password before saving the user document.
 *
 * @function
 * @param {Function} next - The next middleware function in the stack.
 */
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12)
  }
  next()
})

/**
 * Authenticates a user based on username and password.
 *
 * @function
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @throws Will throw an error if the login credentials are invalid.
 * @returns {Promise<mongoose.Document>} - The authenticated user document.
 */
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcryptjs.compare(password, user.password))) {
    throw new Error("Invalid login credentials") // skrivs ut
  }
  return user
}

/**
 * User model for interacting with the user collection in the database.
 *
 * @const {mongoose.Model} User
 */
const User = mongoose.model("User", userSchema)

export default User
