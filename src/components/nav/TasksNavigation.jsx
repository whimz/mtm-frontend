import { NavLink } from "react-router-dom"

export default function TasksNavigation(){

  return(
    <nav>
        <ul >
          <li>
            <NavLink 
              to="/tasks" 
              
              end
            >
              All tasks
              </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tasks/new" 
              
            >
              New task
            </NavLink>
          </li>
        </ul>
      </nav>
  )
}