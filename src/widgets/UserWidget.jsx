import { useAuth } from "../contexts/AuthContext.jsx"
import classes from "./UserWidget.module.css"

export default function UserWidget() {
  const { user, onLogout } = useAuth()

  return (
    <div className={classes.userWidget}>
      <div className={classes.userInfo}>
        <span className={classes.userEmail}>{user.email}</span>
        <span className={classes.userLabel}>Logged in</span>
      </div>
      <button className={classes.logoutButton} onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}
