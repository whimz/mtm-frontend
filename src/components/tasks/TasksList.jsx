import { useTaskStatus } from "../../contexts/TaskStatusContext.jsx"
import classes from "./TaskList.module.css"
import TaskListHeader from "./TaskListHeader"
import TaskListRow from "./TaskListRow"

export default function TasksList({ tasks }) {
  const liveStatuses = tasks.map((task) => useTaskStatus(task.id))

  return (
    <>
      <h1>All Tasks</h1>
      <ul className={classes.taskList}>
        <li>
          <TaskListHeader />
        </li>
        {tasks.length > 0 &&
          tasks.map((task, index) => {
            const liveStatus = liveStatuses[index]
            const displayStatus = liveStatus || task.status

            return <TaskListRow key={task.id} rowIndex={index} task={task} status={displayStatus} />
          })}
      </ul>
    </>
  )
}