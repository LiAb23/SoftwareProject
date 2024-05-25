/**
 *
 *
 * @author Liv <lh224hh@student.lnu.se>
 * @version 1.0.0
 */

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import "./AppStyles.css"
import axios from "axios"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = async (event) => {
    event.preventDefault() // Förhindra att sidan laddas om
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      })
      // console.log("Login response:", response.data) // fungerar, innehåller hela användarobjektet
      login(response.data.user)
      // Återställ inmatningsvärdet efter att ha sparat
      // Hantera inloggningssvar om det behövs
      setUsername("") // Återställ inmatningsvärdet efter att ha sparat
      setPassword("") // Återställ inmatningsvärdet efter att ha sparat
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