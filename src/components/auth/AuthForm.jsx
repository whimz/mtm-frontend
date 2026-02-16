import { useState } from "react"
import styles from "./AuthForm.module.css"
import { API_ENDPOINTS } from "../../config/api"

export default function AuthForm({ onAuthSuccess }) {
  const [mode, setMode] = useState("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_ENDPOINTS.AUTH}/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.token) {
        localStorage.setItem("token", data.token)
        onAuthSuccess({ email })
      } else {
        alert(data.error || "Authentication failed")
      }
    } catch (error) {
      alert("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.authCard}>
      <h2 className={styles.title}>{mode === "login" ? "Sign In" : "Create Account"}</h2>

      <form onSubmit={handleAuth} className={styles.authForm}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.authButton} disabled={isLoading}>
          {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className={styles.authSwitch}>
        {mode === "login" ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          className={styles.switchButton}
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  )
}
