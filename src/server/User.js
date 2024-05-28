import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

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

// Middleware för att hasha lösenord före spara
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 12)
  }
  next()
})

// Metod för att autentisera användaren baserat på användarnamn och lösenord
userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })
  if (!user || !(await bcryptjs.compare(password, user.password))) {
    throw new Error("Invalid login credentials") // skrivs ut
  }
  return user
}

// Create a Mongoose model for users based on the schema
const User = mongoose.model("User", userSchema)

export default User
