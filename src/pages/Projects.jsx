import { Link, useLoaderData } from "react-router-dom"
import { API_ENDPOINTS } from "../config/api"
import styles from "./Projects.module.css"

export default function ProjectsPage() {

  const data = useLoaderData()
  const projects = data.projects || []

  if (projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No Projects Yet</h2>
        <p>{data.message || "Create your first project to get started!"}</p>
        <Link to="/projects/new" className={styles.createButton}>
          Create Project
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.projectsList}>
      {projects.map((project) => (
        <div key={project.id} className={styles.projectCard}>
          <h3>{project.title}</h3>
          <p>{project.description || "No description"}</p>
          <div className={styles.projectMeta}>
            <span>Created: {new Date(project.created_at).toLocaleDateString("en-GB")}</span>
          </div>
          <Link to={`/projects/${project.id}`} className={styles.viewButton}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function loader() {

  const token = localStorage.getItem("token")

  if (!token) {
    throw new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 })
  }

  const response = await fetch(API_ENDPOINTS.PROJECTS, {
    headers: {
      Authorization: token, // Send token to backend
    },
  })

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: 'Could not fetch projects' }),
      { status: 500 }
    );
  } else {
    return response;
  }
}
