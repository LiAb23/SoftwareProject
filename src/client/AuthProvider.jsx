/**
 * Component for providing authentication context to its children.
 * 
 * This component is used to provide authentication context to its children by setting the user state and providing login and logout functions.
 *
 * @component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - The child components that will receive the authentication context
 * @returns {JSX.Element} - Rendered AuthProvider component
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import { useState } from "react"
import PropTypes from "prop-types"
import AuthContext from "./AuthContext"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  /**  
   * Logs the user in by setting the user state to the provided user data.
   * @param {object} userData - The user data to set in the context
  */
  const login = (userData) => {
    setUser(userData)
  }

  /**  
   * Logs the user out by setting the user state to null.
  */
  const logout = () => {
    setUser(null)
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