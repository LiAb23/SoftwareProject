// AuthProvider.js
import { useState } from "react"
import PropTypes from "prop-types"
import AuthContext from "./AuthContext"

// Provider component for AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (userData) => {
    setUser(userData)
    console.log("User logged in:", userData) // fungerar, innehåller hela användarobjektet
  }

  const logout = () => {
    setUser(null)
    console.log("User logged out")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

// // Provider-komponent för AuthContext
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)

//   const login = (userData) => {
//     setUser(userData)
//     console.log('User logged in:', userData) // skriver ut logged in och hela användarobjektet
//   }

//   const logout = () => {
//     setUser(null)
//     console.log('User logged out')
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// }
