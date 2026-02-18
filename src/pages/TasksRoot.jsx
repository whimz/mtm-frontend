import { NavLink, Outlet } from 'react-router-dom';
import TasksNavigation from '../components/nav/TasksNavigation';

function TaskRootLayout() {
  return (
    <>
      {/* <TasksNavigation /> */}
      <Outlet />
    </>
  );
}

export default TaskRootLayout;
