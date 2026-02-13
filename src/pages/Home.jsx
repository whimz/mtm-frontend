import { Link, useLoaderData } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext.jsx"
import { useTaskStatus } from "../contexts/TaskStatusContext.jsx"
import { authFetch } from "../util/auth"
import { API_ENDPOINTS } from "../config/api.js";
import StatusBadge from "../ui/badges/StatusBadge.jsx" 
import styles from "./Home.module.css"

export default function HomePage() {
  const { user } = useAuth()
  const { projects, recentTasks, stats } = useLoaderData()
  const taskStatuses = recentTasks.map((task) => useTaskStatus(task.id))

  return (
    <div className={styles.homePage}>
      <section className={styles.welcomeSection}>
        <h1>Welcome Back!</h1>
        <p className={styles.welcomeText}>Hello, {user?.email}! Here's what's happening with your projects.</p>
      </section>

      {/* Statistics Cards */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalProjects}</span>
            <span className={styles.statLabel}>Projects</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.totalTasks}</span>
            <span className={styles.statLabel}>Total Tasks</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.pendingTasks}</span>
            <span className={styles.statLabel}>Pending</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.completedTasks}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>
      </section>

      <div className={styles.dashboardGrid}>
        {/* Projects Section */}
        <section className={styles.projectsSection}>
          <h2>Your Projects</h2>

          {projects.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No projects yet. Create your first project to get started!</p>
            </div>
          ) : (
            <div className={styles.projectsList}>
              {projects.slice(0, 3).map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`} className={styles.projectItem}>
                  <div className={styles.projectInfo}>
                    <h3>{project.title}</h3>
                    <p>{project.description || "No description"}</p>
                  </div>
                  <span className={styles.projectArrow}>→</span>
                </Link>
              ))}
            </div>
          )}

          <div className={styles.quickActions}>
            <Link to="/projects/new" className={styles.actionButton}>
              + Create New Project
            </Link>
            <Link to="/projects" className={styles.actionButtonSecondary}>
              View All Projects
            </Link>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className={styles.recentActivitySection}>
          <h2>Recent Tasks</h2>

          {recentTasks.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No tasks yet. Create a project and add your first task!</p>
            </div>
          ) : (
            <div className={styles.tasksList}>
              {recentTasks.map((task, index) => {
                const liveStatus = taskStatuses[index]
                const displayStatus = liveStatus || task.status

                return (
                  <Link key={task.id} to={`/projects/${task.project_id}/tasks/${task.id}`} className={styles.taskItem}>
                    <div className={styles.taskHeader}>
                      <span className={styles.taskTitle}>{task.title}</span>
                      <StatusBadge status={displayStatus || "PENDING"} size="small" />
                    </div>
                    <div className={styles.taskMeta}>
                      <span className={styles.projectName}>{task.project_title}</span>
                      <span className={styles.taskDate}>{new Date(task.created_at).toLocaleDateString()}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export async function loader() {
  try {
    // Fetch projects
    const projectsData = await authFetch(API_ENDPOINTS.PROJECTS)
    const projects = projectsData.projects || []

    // Fetch all tasks (we'll show recent ones)
    let recentTasks = []
    let stats = {
      totalProjects: projects.length,
      totalTasks: 0,
      pendingTasks: 0,
      completedTasks: 0,
    }

    if (projects.length > 0) {
      // Fetch all user's tasks
      const tasksData = await authFetch(API_ENDPOINTS.TASKS)
      const allTasks = tasksData.tasks || []

      // Get recent tasks (last 5)
      recentTasks = allTasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)

      // Calculate stats
      stats = {
        totalProjects: projects.length,
        totalTasks: allTasks.length,
        pendingTasks: allTasks.filter((t) => t.status === "PENDING").length,
        completedTasks: allTasks.filter((t) => t.status === "COMPLETE").length,
      }
    }

    console.log(stats.completedTasks);

    return { projects, recentTasks, stats }

  } catch (error) {
    console.error("❌ Dashboard loader error:", error)
    // Return empty state on error
    return {
      projects: [],
      recentTasks: [],
      stats: {
        totalProjects: 0,
        totalTasks: 0,
        pendingTasks: 0,
        completedTasks: 0,
      },
    }
  }
}
