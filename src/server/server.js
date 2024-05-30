/**
 * The starting point of the application that sets up the Express server and connects to MongoDB using Mongoose.
 *
 * @module server
 * @requires express
 * @requires express-session
 * @requires helmet
 * @requires mongoose
 * @requires path
 * @requires dotenv
 * @requires cors
 * @requires routes
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import express from "express"
import session from "express-session"
import helmet from "helmet"
import mongoose from "mongoose"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes.js"

// Create a new express application instance
const app = express()

// Create a path to the .env file
const envPath = path.resolve(process.cwd(), ".env")

// Load environment variables from the .env file
dotenv.config({ path: envPath })

/**
 * Session options configuration.
 *
 * @type {Object}
 * @property {string} name - The name of the session ID cookie to set in the response.
 * @property {string} secret - The secret used to sign the session ID cookie.
 * @property {boolean} resave - Forces the session to be saved back to the session store, even if the session was never modified during the request.
 * @property {boolean} saveUninitialized - Forces a session that is "uninitialized" to be saved to the store.
 * @property {Object} cookie - The cookie settings.
 * @property {boolean} cookie.httpOnly - Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.
 * @property {number} cookie.maxAge - Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute.
 * @property {string} cookie.sameSite - CSRF protection by preventing the browser from sending the cookie along with cross-site requests.
 * @property {boolean} cookie.secure - Ensures the browser only sends the cookie over HTTPS.
 */
const sessionOptions = {
  name: process.env.SESSION_NAME, 
  secret: process.env.SESSION_SECRET, 
  resave: false, 
  saveUninitialized: false, 
  cookie: {
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 * 24, 
    sameSite: "strict", 
    secure: process.env.NODE_ENV === "production", 
  },
}

if (process.env.NODE_ENV === "production") {
  sessionOptions.cookie.secure = true // Serve secure cookies by only allowing HTTPS
}

app.use(session(sessionOptions))

/**
 * Use helmet to secure the application by setting various HTTP headers.
 */
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

/**
 * CORS options configuration.
 *
 * @type {Object}
 * @property {string} origin - Configures the Access-Control-Allow-Origin CORS header.
 * @property {string} methods - Configures the Access-Control-Allow-Methods CORS header.
 * @property {string[]} allowedHeaders - Configures the Access-Control-Allow-Headers CORS header.
 * @property {number} optionsSuccessStatus - Provides a status code to use for successful OPTIONS requests.
 * @property {boolean} credentials - Configures the Access-Control-Allow-Credentials CORS header.
 */
const corsOptions = {
  origin: "http://localhost:5173", // "https://software-project-liard.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, 
  credentials: true,
}

app.use(cors(corsOptions))

// Add preflight for all routes
app.options("*", cors(corsOptions))

// Check if DB_CONNECTION_STRING is defined
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined")
}

// Try connecting to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1)
  })

  // Use the routes defined in routes.js
app.use("/", routes)

// Start the HTTP server listening for connections
const server = app.listen(process.env.PORT, () => {
  console.log(`\nServer running at http://localhost:${server.address().port}`)
  console.log("Press Ctrl-C to terminate...")
})
