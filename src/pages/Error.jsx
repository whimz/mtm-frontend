import MainNavigation from "../components/nav/MainNavigation"
import { useRouteError } from "react-router-dom"
import PageContent from "../components/PageContent"

export default function ErrorPage() {
  const error = useRouteError()

  // Debug: Log the full error to console
  console.error("Full error object:", error)
  console.error("Error type:", typeof error)
  console.error("Error keys:", Object.keys(error || {}))

  let title = "An error occurred!"
  let message = "Something went wrong"

  if (error.status === 500) {
    try {
      message = JSON.parse(error.data).message
    } catch (e) {
      message = error.data || "Internal server error"
    }
  }

  if (error.status === 404) {
    title = "Not found!"
    message = "Could not find resource"
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>

        {/* Temporary debug section */}
        <div
          style={{
            marginTop: "2rem",
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: "1rem",
            background: "#fff5f5",
            border: "1px solid #feb2b2",
            borderRadius: "8px",
            maxWidth: "1024px",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Debug Info:</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontSize: "0.85rem",
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            {JSON.stringify(
              {
                status: error?.status,
                statusText: error?.statusText,
                message: error?.message,
                data: error?.data,
                stack: error?.stack?.substring(0, 500),
              },
              null,
              2,
            )}
          </pre>
        </div>
      </PageContent>
    </>
  )
}
