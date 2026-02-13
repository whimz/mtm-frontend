import TasksRoot from "../pages/TasksRoot.jsx"
import TasksPage from "../pages/Tasks.jsx"
import TaskDetailPage, { loader as taskDetailLoader, action as deleteTaskAction } from "../pages/TaskDetail.jsx"
import EditTaskPage from "../pages/EditTask.jsx"
import NewTaskPage from "../pages/NewTask.jsx"
import { loader as tasksLoader } from "../pages/Tasks.jsx"

export const taskRoutes = {
  path: "tasks",
  element: <TasksRoot />,
  children: [
    {
      index: true,
      element: <TasksPage />,
      loader: tasksLoader,
    },
    {
      path: ":taskId",
      id: "task-detail",
      loader: taskDetailLoader,
      children: [
        {
          index: true,
          element: <TaskDetailPage />,
          action: deleteTaskAction,
        },
        {
          path: "edit",
          element: <EditTaskPage />,
        },
      ],
    },
    {
      path: "new",
      element: <NewTaskPage />,
    },
  ],
}
