import UserWidget from "../../widgets/UserWidget";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.logoBlock}>
        <UserWidget />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="projects"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="settings"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
