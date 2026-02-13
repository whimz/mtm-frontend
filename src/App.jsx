import { useState, useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { createRouter } from "./router.jsx" // ← Import createRouter, not router
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { TaskStatusProvider } from "./contexts/TaskStatusContext.jsx"
import WelcomePage from "./pages/WelcomePage.jsx"
import "./App.css"

const API = "http://localhost:8080/auth"

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [authVersion, setAuthVersion] = useState(0) // Track auth changes

  useEffect(() => {
    console.log("🔍 App mounted, checking auth...")
    const token = localStorage.getItem("token")
    console.log("🎫 Token exists:", !!token)

    if (token) {
      fetch(`${API}/me`, {
        headers: { Authorization: token },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("👤 User data:", data)
          if (!data.error) {
            setUser(data)
          } else {
            console.log("❌ Invalid token, clearing")
            localStorage.removeItem("token")
          }
        })
        .catch((err) => {
          console.error("❌ Auth check failed:", err)
          localStorage.removeItem("token")
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleAuthSuccess = (userData) => {
    console.log("✅ Auth success:", userData)
    setUser(userData)
    setAuthVersion((prev) => prev + 1) // Increment to force remount
  }

  const handleLogout = () => {
    console.log("👋 Logging out")
    localStorage.removeItem("token")
    setUser(null)
    setAuthVersion((prev) => prev + 1) // Increment to force remount
  }

  console.log("🎨 Rendering App:", { isLoading, user: !!user, authVersion })

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
        }}
      >
        Loading...
      </div>
    )
  }

  if (!user) {
    console.log("📄 Showing WelcomePage")
    return <WelcomePage onAuthSuccess={handleAuthSuccess} />
  }

  console.log("🏠 Showing RouterProvider with TaskStatusProvider")

  // Create fresh router instance
  const router = createRouter()

  return (
    <AuthProvider user={user} onLogout={handleLogout}>
      {/* Key forces complete remount when authVersion changes */}
      <TaskStatusProvider key={`auth-${authVersion}`}>
        <RouterProvider router={router} key={`router-${authVersion}`} />
      </TaskStatusProvider>
    </AuthProvider>
  )
}

export default App
