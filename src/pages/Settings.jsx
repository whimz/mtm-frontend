import { useLoaderData, useSearchParams, useRevalidator } from "react-router-dom"
import { useEffect } from "react"
import { authFetch } from "../util/auth"
import { API_ENDPOINTS } from "../config/api.js"
import styles from "./Settings.module.css"
import EmailsWidget from "../components/widgets/EmailsWidget.jsx"

export default function Settings() {
  const { emails } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const revalidator = useRevalidator();
  
  const connected = searchParams.get('connected') === 'true';

  useEffect(() => {
    if (connected) {
      // Refresh data after new email connected
      revalidator.revalidate();
      // Clear the query param
      setSearchParams({});
    }
  }, [connected]);

  return (
    <div className={styles.settingsPage}>
      <section className={styles.headerSection}>
        <h1>Settings</h1>
        <p className={styles.headerText}>Manage your account preferences and integrations.</p>
      </section>

      <div className={styles.widgetsGrid}>
        <EmailsWidget emails={emails} showSuccess={connected} />
      </div>
    </div>
  )
}

export async function loader() {
  try {
    const emails = await authFetch(API_ENDPOINTS.GMAIL_ACCOUNTS);
    return { emails: emails || [] };
  } catch (error) {
    console.error("Settings loader error:", error);
    return { emails: [] };
  }
}