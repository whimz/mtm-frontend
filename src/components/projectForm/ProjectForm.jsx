import { Form, useNavigate, useNavigation, redirect } from "react-router-dom"
import { API_ENDPOINTS } from "../../config/api"
import styles from "./ProjectForm.module.css"

export default function ProjectForm({ project }) {
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const isEditing = !!project
  const submitText = isEditing ? "Save Changes" : "Create Project"

  return (
    <div className={styles.formContainer}>
      <h1>{isEditing ? "Edit Project" : "Create New Project"}</h1>

      <Form method="post" className={styles.form}>
        {/* Hidden field to track if we're editing */}
        {isEditing && <input type="hidden" name="projectId" value={project.id} />}

        <div className={styles.formGroup}>
          <label htmlFor="title">Project Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter project title"
            defaultValue={project?.title || ""}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter project description"
            rows="4"
            defaultValue={project?.description || ""}
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={() => navigate(-1)} className={styles.cancelButton} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : submitText}
          </button>
        </div>
      </Form>
    </div>
  )
}

// Single action handles both create and edit
export async function action({ request, params }) {
  const formData = await request.formData()
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 })
  }

  const projectData = {
    title: formData.get("title"),
    description: formData.get("description"),
  }

  // Check if we're editing (projectId comes from either params or hidden field)
  const projectId = params.projectId || formData.get("projectId")
  const isEditing = !!projectId

  const method = isEditing ? "PATCH" : "POST"
  const url = isEditing ? API_ENDPOINTS.project(projectId) : API_ENDPOINTS.PROJECTS

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(projectData),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Response(
      JSON.stringify({ message: error.error || `Could not ${isEditing ? "update" : "create"} project` }),
      { status: res.status },
    )
  }

  const data = await res.json()
  const redirectId = isEditing ? projectId : data.project.id

  return redirect(`/projects/${redirectId}`)
}
