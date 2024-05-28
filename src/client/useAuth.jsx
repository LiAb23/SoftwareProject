/**
 * Custom hook for using AuthContext.
 *
 * @returns {object} - The current authentication context value
 * @version 1.0.0
 * @author Liv <lh224hh@student.lnu.se>
 */

import { useContext } from 'react'
import AuthContext from './AuthContext'

export const useAuth = () => {
  return useContext(AuthContext)
}