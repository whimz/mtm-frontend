import { createContext, useContext, useState } from "react"

// Initial sample projects
const initialProjects = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Redesign company website with modern UI/UX principles",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: 2,
    title: "Marketing Campaign",
    description: "Q1 2024 marketing campaign for new product launch",
    createdAt: new Date("2024-01-20").toISOString(),
    updatedAt: new Date("2024-01-22").toISOString(),
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Develop iOS and Android applications for customer engagement",
    createdAt: new Date("2024-02-01").toISOString(),
    updatedAt: new Date("2024-02-01").toISOString(),
  },
  {
    id: 4,
    title: "Backend Infrastructure",
    description: "Migrate backend services to microservices architecture",
    createdAt: new Date("2024-02-10").toISOString(),
    updatedAt: new Date("2024-02-15").toISOString(),
  },
]

const ProjectsContext = createContext()

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(initialProjects)

  const createProject = (projectData) => {
    const newProject = {
      id: Date.now(), // Temporary ID
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setProjects((prev) => [...prev, newProject])
    return newProject
  }

  const getProjects = () => {
    return projects
  }

  const getProjectById = (id) => {
    return projects.find((p) => p.id === Number(id))
  }

  const updateProject = (id, projectData) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === Number(id)
          ? {
              ...p,
              ...projectData,
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    )
  }

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== Number(id)))
  }

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        createProject,
        getProjects,
        getProjectById,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectsContext)
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider")
  }
  return context
}
