import { useContext } from 'react'
import AuthContext from './AuthContext'

// Hook för att använda AuthContext
export const useAuth = () => {
  return useContext(AuthContext)
}