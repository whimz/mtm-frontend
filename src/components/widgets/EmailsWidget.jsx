import styles from "./EmailsWidget.module.css"
import Button from "../../ui/buttons/Button";
import buttonClasses from "../../ui/buttons/Button.module.css"
import { authFetch } from "../../util/auth";
import { API_ENDPOINTS } from "../../config/api";
import { useRevalidator } from "react-router-dom";

export default function EmailsWidget({ emails = [], showSuccess = false }) {
  const hasEmails = emails.length > 0;
  const revalidator = useRevalidator();

  const handleConnectEmail = async () => {
    try {
      const data = await authFetch(API_ENDPOINTS.GMAIL_AUTH)
      if (data.authUrl) {
        window.location.href = data.authUrl
      }
    } catch (error) {
      console.error("Failed to get auth URL:", error)
    }
  }

  const handleDisconnect = async (emailId) => {
    try {
      await authFetch(API_ENDPOINTS.gmail(emailId), {
        method: 'DELETE'
      });
      revalidator.revalidate();
    } catch (error) {
      console.error("Failed to disconnect email:", error)
    }
  }

  return (
    <div className={styles.widget}>
      <div className={styles.widgetHeader}>
        <h2>Connected Emails</h2>
      </div>

      <div className={styles.widgetContent}>
        {showSuccess && (
          <div className={styles.successMessage}>
            Email connected successfully!
          </div>
        )}
        
        {hasEmails ? (
          <ul className={styles.emailList}>
            {emails.map((email) => (
              <li key={email.id} className={styles.emailItem}>
                <span className={styles.emailAddress}>{email.email_address}</span>
                <div className={styles.emailActions}>
                  <Button
                    className={buttonClasses['no-icon']}
                    title="Disconnect"
                    variant="delete"
                    icon="disconnect"
                    size="sm"
                    onClick={() => handleDisconnect(email.id)}
                  >Disconnect</Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <p>No email connected</p>
          </div>
        )}

        <div className={styles.widgetFooter}>
          <button 
            className={`${buttonClasses.btn} ${buttonClasses["btn-default"]}`}
            onClick={handleConnectEmail}
          >
            Connect Email
          </button>
        </div>
      </div>
    </div>
  )
}