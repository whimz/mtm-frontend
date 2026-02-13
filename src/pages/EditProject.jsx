import { useRouteLoaderData } from "react-router-dom"
import ProjectForm, { action } from "../components/projectForm/ProjectForm";

export default function EditProject() {
  const data = useRouteLoaderData("project-detail")
  const project = data?.project

  if (!project) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <h2>Project Not Found</h2>
      </div>
    )
  }

  return <ProjectForm project={project} />
}

// Re-export the action from the component
export { action }
