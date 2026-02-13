import { createContext, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children, user, onLogout }) => {
  return (
    <AuthContext.Provider value={{ user, onLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
