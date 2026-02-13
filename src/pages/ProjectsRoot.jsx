import { Outlet } from "react-router-dom";
import ProjectsNavigation from "../components/nav/ProjectsNavigation";

export default function ProjectsRootLayout() {

  return (
    <>
      <ProjectsNavigation/>
      <Outlet />
    </>
  )
}