import ProjectForm, { action } from "../components/projectForm/ProjectForm";

export default function NewProject() {
  return <ProjectForm />
}

// Re-export the action from the component
export { action }