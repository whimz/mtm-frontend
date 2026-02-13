// Centralized API configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

// API endpoints
export const API_ENDPOINTS = {
  // Static endpoints
  AUTH: `${API_URL}/auth`,
  TASKS: `${API_URL}/tasks`,
  PROJECTS: `${API_URL}/projects`,
  TASK_EVENTS: `${API_URL}/tasks/events`,
  GMAIL_ACCOUNTS: `${API_URL}/gmail/accounts`,
  GMAIL_AUTH: `${API_URL}/gmail/auth`,
  SCRAPE_FORMS: `${API_URL}/scrape-forms`,

  // Dynamic helpers
  project: (id) => `${API_URL}/projects/${id}`,
  projectTasks: (id) => `${API_URL}/projects/${id}/tasks`,
  projectTask: (projectId, taskId) => `${API_URL}/projects/${projectId}/tasks/${taskId}`,
  task: (id) => `${API_URL}/tasks/${id}`,
  taskStatus: (id) => `${API_URL}/tasks/${id}/status`,
  gmail: (id) => `${API_URL}/gmail/accounts/${id}`
}