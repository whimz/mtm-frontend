import { createContext, useContext, useEffect, useState, useRef } from "react"
import { API_ENDPOINTS } from "../config/api"

const TaskStatusContext = createContext()

export function TaskStatusProvider({ children }) {
  const [statuses, setStatuses] = useState({})
  const [isConnected, setIsConnected] = useState(false)
  const eventSourceRef = useRef(null)

  useEffect(() => {
    console.log("📡 TaskStatusProvider: Opening SSE connection")
    const eventSource = new EventSource(API_ENDPOINTS.TASK_STATUS_UPDATES)
    eventSourceRef.current = eventSource

    eventSource.addEventListener("message", (event) => {
      console.log("📨 TaskStatusProvider: Received message:", event.data)
      try {
        const data = JSON.parse(event.data)
        if (data.taskId && data.status) {
          setStatuses((prev) => ({
            ...prev,
            [data.taskId]: data.status,
          }))
        }
      } catch (err) {
        console.error("❌ Failed to parse event data:", event.data)
      }
    })

    eventSource.addEventListener("snapshot-complete", () => {
      console.log("✅ TaskStatusProvider: Initial statuses loaded")
      setIsConnected(true)
    })

    eventSource.onerror = (err) => {
      console.error("❌ TaskStatusProvider: SSE error", err)
      setIsConnected(false)
    }

    eventSource.onopen = () => {
      console.log("✅ TaskStatusProvider: Connection opened")
      setIsConnected(true)
    }

    return () => {
      console.log("📴 TaskStatusProvider: Closing SSE connection")
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        eventSourceRef.current = null
      }
      // Clear all statuses on unmount
      setStatuses({})
      setIsConnected(false)
    }
  }, [])

  return <TaskStatusContext.Provider value={{ statuses, isConnected }}>{children}</TaskStatusContext.Provider>
}

// Hook to get status for a specific task
export function useTaskStatus(taskId) {
  const context = useContext(TaskStatusContext)
  if (!context) {
    throw new Error("useTaskStatus must be used within TaskStatusProvider")
  }
  return context.statuses[taskId] || null
}

// Hook to get all statuses (for lists)
export function useAllTaskStatuses() {
  const context = useContext(TaskStatusContext)
  if (!context) {
    throw new Error("useAllTaskStatuses must be used within TaskStatusProvider")
  }
  return context.statuses
}

// Hook to check connection status
export function useTaskStatusConnection() {
  const context = useContext(TaskStatusContext)
  if (!context) {
    throw new Error("useTaskStatusConnection must be used within TaskStatusProvider")
  }
  return context.isConnected
}
