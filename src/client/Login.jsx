/**
 * Login component that renders a login form and handles the login process.
 *
 * @component
 * @returns {JSX.Element} - Rendered Login component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import "./styles/AppStyles.css"
import axios from "axios"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  /**
   * Handles the login process by sending a POST request to the server and navigating to the my-board page if successful.
   */
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      })
      login(response.data.user)
      setUsername("") 
      setPassword("") 
      setMessage(response.data.message)
      navigate("/my-board")
    } catch (error) {
      console.error("Error logging in:", error)
      setMessage("Error logging in.")
    }
  }
  
  return (
    <div className="form-container">
       <h1 className="form-title">Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
        />
        <br />
        <button type="submit" className="link-btn">
          Login
        </button>
      </form>
    </div>
  )
}