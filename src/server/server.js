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
const PORT = process.env.PORT || 5000
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
    const { title, text } = req.body
    const note = new Note({ title, text })
    await note.save()
    res.status(201).json(note)
  } catch (error) {
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

app.post("/login", async (req, res, next) => {
  try {
    console.log("Attempting to log in user:", req.body.username)
    // Authenticate the user credentials against the database.
    const user = await User.authenticate(req.body.username, req.body.password)
    
    console.log("User authenticated successfully:", user.username)

    // Regenerate the session to prevent fixation attacks.
    req.session.regenerate((err) => {
      if (err) {
        console.error("Failed to re-generate session:", err)
        throw new Error("Failed to re-generate session")
      }

      console.log("Session regenerated successfully")

      // Mark user is logged in and store the authenticated user in the session.
      req.session.user = user

      // // Set a flash message to indicate successful login.
      // req.session.flash = { type: 'success', text: 'You are now logged in' }

      console.log("User added to session:", user.username)

      // res.redirect("./")
      res.json({ message: `Welcome ${user.username}!` })
    })
  } catch (error) {
    console.error("Error logging in user:", error)
    // req.session.flash = { type: 'danger', text: error.message }
    // res.redirect("./")
  }
})

// Hämta användarens anteckningar
app.get("/my-board", async (req, res) => {
  try {
    if (req.session.user) {
      console.log("User is logged in:", req.session.user.username)
      // Hämta alla anteckningar kopplade till den aktuella användaren
      console.log("Session ID:", req.session.id)

      console.log("User_id:", req.session.user._id)
      const notes = await Note.find({ user: req.session.user._id })
      console.log("User's notes:", notes)

      // Skicka de hämtade anteckningarna till klienten
      res.json(notes)
    } else {
      // Om användaren inte är inloggad, skicka en felrespons
      res.status(401).json({ error: "Unauthorized: User not logged in" })
    }
  } catch (error) {
    // Om något går fel, skicka en felrespons
    console.error("Error fetching user's notes:", error)
    res.status(500).json({ error: "Error fetching user's notes" })
  }
})

// Start the HTTP server listening for connections
const server = app.listen(process.env.PORT, () => {
  console.log(`\nServer running at http://localhost:${server.address().port}`)
  console.log("Press Ctrl-C to terminate...")
})
