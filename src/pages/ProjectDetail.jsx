import { Link, useNavigate, useRouteLoaderData, useParams } from "react-router-dom"
import { useTaskStatus } from "../contexts/TaskStatusContext.jsx"
import { authFetch } from "../util/auth"
import { API_ENDPOINTS } from "../config/api.js"
import StatusBadge from "../ui/badges/StatusBadge.jsx"
import styles from "./ProjectDetail.module.css"

export default function ProjectDetail() {
  const data = useRouteLoaderData("project-detail")
  const navigate = useNavigate()
  const { projectId } = useParams()
  const project = data?.project
  const tasks = data?.tasks || []

  const taskStatuses = tasks.map((task) => useTaskStatus(task.id))

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h2>Project Not Found</h2>
        <Link to="/projects" className={styles.backButton}>
          Back to Projects
        </Link>
      </div>
    )
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      console.log("Delete project:", projectId)
      navigate("/projects")
    }
  }

  return (
    <div className={styles.projectDetail}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <Link to="/projects" className={styles.backLink}>
            ← Back to Projects
          </Link>
          <h1>{project.title}</h1>
        </div>
        <div className={styles.actions}>
          <Link to="edit" className={styles.editButton}>
            Edit Project
          </Link>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Delete Project
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.infoSection}>
          <h2>Project Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Description</label>
              <p>{project.description || "No description provided"}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Created</label>
              <p>{new Date(project.created_at).toLocaleString()}</p>
            </div>
            <div className={styles.infoItem}>
              <label>Last Updated</label>
              <p>{new Date(project.updated_at).toLocaleString()}</p>
            </div>
          </div>
        </section>

        <section className={styles.tasksSection}>
          <div className={styles.tasksSectionHeader}>
            <h2>Tasks ({tasks.length})</h2>
            <Link to="tasks/new" className={styles.addTaskButton}>
              + Add Task
            </Link>
          </div>

          {tasks.length === 0 ? (
            <div className={styles.tasksPlaceholder}>
              <p>No tasks yet. Create your first task for this project.</p>
            </div>
          ) : (
            <div className={styles.tasksList}>
              {tasks.map((task, index) => {
                const liveStatus = taskStatuses[index]
                const displayStatus = liveStatus || task.status

                return (
                  <div key={task.id} className={styles.taskCard}>
                    <div className={styles.taskHeader}>
                      <h3>{task.title}</h3>
                      <StatusBadge status={displayStatus || "PENDING"} size="small"/>
                    </div>
                    {task.description && <p className={styles.taskDescription}>{task.description}</p>}
                    <div className={styles.taskMeta}>
                      <span>Schedule: {task.schedule_type || "Not set"}</span>
                      {task.created_at && <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>}
                    </div>
                    <Link to={`tasks/${task.id}`} className={styles.viewTaskButton}>
                      View Details
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export async function loader({ params }) {
  const id = params.projectId

  // Fetch both project and tasks in parallel
  const [projectData, tasksData] = await Promise.all([
    authFetch(API_ENDPOINTS.project(id)),
    authFetch(API_ENDPOINTS.projectTasks(id)).catch(() => ({ tasks: [] })),
  ])

  return {
    project: projectData.project,
    tasks: tasksData.tasks || [],
  }
}
