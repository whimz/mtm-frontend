import { createBrowserRouter } from "react-router-dom";
import "./App.css";

import HomePage, { loader as homeLoader } from "./pages/Home";
import Settings, { loader as settingsLoader } from "./pages/Settings";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import TasksPage from "./pages/Tasks";
import TaskRootLayout from "./pages/TasksRoot";
import { loader as tasksLoader } from "./pages/Tasks";
import TaskDetailPage, {
  loader as taskDetailLoader,
  action as deleteTaskAction,
} from "./pages/TaskDetail";
import EditTaskPage from "./pages/EditTask";
import NewTaskPage from "./pages/NewTask";
import ProjectsPage, { loader as projectsLoader } from "./pages/Projects";
import NewProjectPage, {
  action as createProjectAction,
} from "./pages/NewProject";
import ProjectDetail, {
  loader as projectDetailLoader,
} from "./pages/ProjectDetail";
import EditProject, { action as editProjectAction } from "./pages/EditProject";
import ProjectsRootLayout from "./pages/ProjectsRoot";

export function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: homeLoader,
        },
        {
          path: "projects",
          element: <ProjectsRootLayout />,
          children: [
            {
              index: true,
              element: <ProjectsPage />,
              loader: projectsLoader,
            },
            {
              path: "new",
              element: <NewProjectPage />,
              action: createProjectAction,
            },
            {
              path: ":projectId",
              id: "project-detail",
              loader: projectDetailLoader,
              children: [
                {
                  index: true,
                  element: <ProjectDetail />,
                },
                {
                  path: "edit",
                  element: <EditProject />,
                  action: editProjectAction,
                },
                {
                  path: "tasks",
                  element: <TaskRootLayout />,
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
                },
              ],
            },
          ],
        },
        {
          path: "settings",
          element: <Settings/>,
          loader: settingsLoader
        }
      ],
    },
  ]);
}

// Export singleton for initial load (if needed elsewhere)
export const router = createRouter()