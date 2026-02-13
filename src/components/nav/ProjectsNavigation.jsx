import { NavLink } from "react-router-dom";

export default function ProjectsNavigation() {

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/projects"
            end
          >
            All Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects/new">
            New project
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}