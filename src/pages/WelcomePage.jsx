import AuthForm from "../components/auth/AuthForm"
import styles from "./WelcomePage.module.css"

export default function WelcomePage({ onAuthSuccess }) {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <div className={styles.welcomeHero}>
          <h1 className={styles.title}>Welcome to TaskScheduler</h1>
          <p className={styles.subtitle}>Automate your tasks with intelligent scheduling</p>
        </div>

        <AuthForm onAuthSuccess={onAuthSuccess} />
      </div>
    </div>
  )
}
