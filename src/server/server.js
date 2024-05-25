/**
 * A module that starts an Express server.
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import express from "express"
import session from "express-session"
import helmet from "helmet"
import mongoose from "mongoose"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import Note from "./Note.js"
import User from "./User.js"

// Create a new express application instance
const app = express()
// const PORT = process.env.PORT || 5000
// Konstruera sökvägen till .env-filen
const envPath = path.resolve(process.cwd(), ".env")

// Ladda in miljövariabler från .env-filen
dotenv.config({ path: envPath })

// Konfigurera sessions
const sessionOptions = {
  name: process.env.SESSION_NAME, // Don't use default session cookie name.
  secret: process.env.SESSION_SECRET, // En hemlig nyckel för att signera session-id:erna
  resave: false, // Spara inte sessionen om den inte ändras
  saveUninitialized: false, // Spara inte sessionen om den inte har ändrats
  cookie: {
    httpOnly: true, // Mitigate the risk of client side script accessing the protected cookie.
    maxAge: 1000 * 60 * 60 * 24, // The cookie will expire after 24 hours.
    sameSite: "strict", // CSRF protection by preventing the browser from sending the cookie along with cross-site requests.
    secure: process.env.NODE_ENV === "production", // Serve secure cookies by only allowing HTTPS
  },
}

if (process.env.NODE_ENV === "production") {
  sessionOptions.cookie.secure = true // Serve secure cookies by only allowing HTTPS
}

app.use(session(sessionOptions))

// Use helmet to secure the application by setting various HTTP headers.
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "default-src": ["'self'"],
        "script-src": ["'self'"],
        "style-src": ["'self'"],
      },
    },
  })
)

// Middleware for parsing JSON bodies for incoming requests
app.use(express.json())

// Cors configuration
// app.use((req, res, next) => { // ny
//   console.log('Request headers:', req.headers) // ny
//   console.log('Request origin:', req.headers.origin) // ny
//   res.header('Access-Control-Allow-Origin', '*') // ändra?
//   res.header('Access-Control-Allow-Origin', 'https://software-project-liard.vercel.app/') // ändra?
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   // Allow preflight requests to pass through
//   if (req.method === 'OPTIONS') {
//     res.sendStatus(200)
//   } else {
//     next()
//   }
// })

// const allowedOrigins = [ 'https://software-project-liard.vercel.app/' ] // ny

// app.use(cors(
//   { // ny
//   origin: function (origin, callback) {
//     // Kontrollera om ursprunget är i listan över tillåtna ursprung
//     console.log('Request origin:', origin)

//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// ))

// app.use(cors())

// Skapa CORS-alternativ
const corsOptions = {
  origin: "http://localhost:5173", // eller din front-end URL // "https://software-project-liard.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // några äldre browsers (IE11, diverse SmartTVs) kräver detta
  credentials: true, // Tillåt cookies att skickas med anropet
}

// Använd CORS med dina inställningar
app.use(cors(corsOptions))

// Lägg till en extra kontroll för preflight-anrop
app.options("*", cors(corsOptions)) // Aktivera preflight för alla rutter

// Check if DB_CONNECTION_STRING is defined
// if (!process.env.DB_CONNECTION_STRING) {
//   throw new Error('DB_CONNECTION_STRING is not defined')
// }

// Check if DB_CONNECTION_STRING is defined
if (!process.env.MONGODB_URI) {
  // ny
  throw new Error("MONGODB_URI is not defined")
}

// Try connecting to MongoDB
// mongoose.connect(process.env.DB_CONNECTION_STRING)
mongoose
  .connect(process.env.MONGODB_URI) // ny
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1)
  })

// const dataApiKey = process.env.DATA_API_KEY
// const dataApiUrl = process.env.DATA_API_URL

// Create a new note
app.post("/", async (req, res) => {
  try {
    console.log("Session user:", req.session.user) // användaren är undefined
    // console.log("Received POST request at /") // fungerar
    // if (!req.session.user) {
    //   return res.status(401).json({ error: "Unauthorized: User not logged in" })
    // }

    // console.log("User ID:", req.session.user._id)
    // console.log("Request body:", req.body) // fungerar, innehåller användarens ID: Request body: { title: 'adsfa', text: '', createdBy: '6634b3c123f4beb417399d67' }

    const { title, text } = req.body
    // const createdBy = req.user._id
    // const createdBy = req.session.user._id

    // Logga detaljer om anteckningen som ska skapas
    console.log("Creating note with title:", title)
    console.log("Creating note with text:", text)
    // console.log("Creating note with createdBy:", createdBy)

    // const note = new Note({ title, text, createdBy })
    const note = new Note({ title, text })
    await note.save()
    res.status(201).json(note)
  } catch (error) {
    console.error("Error creating note:", error)
    res.status(500).json({ error: "Error creating note" })
  }
})

// Hantera användarregistrering
app.post("/register", async (req, res) => {
  try {
    // Extrahera användarinformation från förfrågningskroppen
    const { username, password, email, termsAccepted } = req.body

    // Skapa en ny användare
    const newUser = new User({ username, password, email, termsAccepted })

    // Spara den nya användaren i databasen
    await newUser.save()

    // Skicka en framgångsrik respons tillbaka till klienten
    res.status(201).json({
      message: "User registered successfully",
    })
  } catch (error) {
    // Om något går fel, skicka en felrespons tillbaka till klienten
    console.error("Error registering user:", error)
    res.status(500).json({ error: "Failed to register user" })
  }
})

app.post("/login", async (req, res) => {
  try {
    // console.log("Attempting to log in user:", req.body.username) // fungerar, skriver ut användarnamnet
    // Authenticate the user credentials against the database.
    const user = await User.authenticate(req.body.username, req.body.password)

    if (!user) {
      console.error("Authentication failed: No user returned")
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // console.log("User authenticated successfully:", user.username) // fungerar, skriver ut användarnamnet
    // console.log("Full user object:", user) // fungerar, skriver ut hela användarobjektet

    // Regenerate the session to prevent fixation attacks.
    req.session.regenerate((err) => {
      if (err) {
        console.error("Failed to re-generate session:", err)
        // throw new Error("Failed to re-generate session")
        return res.status(500).json({ error: "Failed to log in user" })
      }

      // Tilldela ett ID till sessionen
      // const sessionId = req.sessionID
      // console.log("Session ID:", sessionId) // fungerar, skriver ut sessionens ID

      // console.log("Session regenerated successfully")

      // Mark user is logged in and store the authenticated user in the session.
      req.session.user = user
      console.log("User added to session:", req.session.user)

      // // Set a flash message to indicate successful login.
      // req.session.flash = { type: 'success', text: 'You are now logged in' }

      // console.log("User added to session:", user) // fungerar, skriver ut hela användarobjektet

      // res.redirect("./")
      // res.json({ message: `Welcome ${user.username}!` }) // fungerar
      // console.log("Sending response with user object:", user) // fungerar, skriver ut hela användarobjektet
      res.json({ user })
    })
  } catch (error) {
    console.error("Error logging in user:", error)
    res.status(500).json({ error: "Failed to log in user" })
    // req.session.flash = { type: 'danger', text: error.message }
    // res.redirect("./")
  }
})

// Create a new note
app.post("/my-board", async (req, res) => {
  try {
    // console.log("Session user:", req.session.user)
    // console.log("Received POST request at /my-board")
    // Kontrollera om användarens ID finns i sessionen
    // if (!req.session.user) {
    //   return res.status(401).json({ error: "Unauthorized: User not logged in" })
    // }

    // console.log("User ID from session:", req.session.user._id)
    console.log("Request body:", req.body)

    const { title, text, createdBy } = req.body
    // const createdBy = req.session.user._id // Hämta användarens ID från sessionen

    console.log("Title:", title)
    console.log("Text:", text)
    console.log("Created by:", createdBy)

    // const note = new Note({ title, text, createdBy }) // Inkludera createdBy när du skapar anteckningen
    const note = new Note({ title, text, createdBy })
    await note.save()

    console.log("Note created successfully:", note)
    res.status(201).json(note)
  } catch (error) {
    console.error("Error creating note:", error)
    res.status(500).json({ error: "Error creating note" })
  }
  // try {
  //   console.log("User ID:", req.user._id)
  //   const { title, text } = req.body
  //   const createdBy = req.user._id // Hämta användarens ID från autentiseringsuppgifterna
  //   const note = new Note({ title, text, createdBy }) // Inkludera createdBy när du skapar anteckningen
  //   await note.save()
  //   res.status(201).json(note)
  // } catch (error) {
  //   res.status(500).json({ error: "Error creating note" })
  // }
})

// Hämta användarens anteckningar
app.get("/my-board/:userId", async (req, res) => {
  try {
    const createdBy = req.params.userId
    console.log("Fetching notes for user:", createdBy) // undefined

    const notes = await Note.find({ createdBy: createdBy })
    res.status(200).json(notes)
  } catch (error) {
    console.error("Error fetching notes:", error)
    res.status(500).json({ error: "Error fetching notes" })
  }
})

// // Endpoint för att ta bort en anteckning baserat på dess ID
// app.delete("/my-board/:id", async (req, res) => {
//   try {
//     const { id } = req.params

//     // Ta bort anteckningen från databasen baserat på ID
//     await Note.findByIdAndDelete(id)

//     res.status(204).end() // Svara med status 204 (No Content) för att indikera att borttagningen lyckades
//   } catch (error) {
//     console.error("Error deleting note:", error)
//     res.status(500).json({ error: "Error deleting note" })
//   }
// })

app.put("/my-board/:id", async (req, res) => {
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

// Logout endpoint
app.post("/logout", (req, res) => {
  try {
    console.log("Session before logout:", req.session)
    // Förstör sessionen
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying ", err)
        return res.status(500).json({ error: "Failed to logout" })
      }
      console.log("User logged out successfully")
      res.json({ message: "Logout successful" })
    })
    // console.log("Session after logout:", req.session) // fungerar, ger undefined
  } catch (error) {
    console.error("Error logging out user:", error)
    res.status(500).json({ error: "Failed to logout" })
  }
})

// Start the HTTP server listening for connections
const server = app.listen(process.env.PORT, () => {
  console.log(`\nServer running at http://localhost:${server.address().port}`)
  console.log("Press Ctrl-C to terminate...")
})
