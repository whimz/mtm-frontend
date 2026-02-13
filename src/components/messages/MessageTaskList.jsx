import MessageTask from "./MessageTaskItem";
import { dummyTasks } from "../../data";
import classes from "./MessageTaskList.module.css";

export default function MessageTaskList() {

  return (

    <ul>
      {dummyTasks.map(task => (
        <li key={task.name} className={classes.messageTaskItem}>
          <MessageTask task={task} />
        </li>
      ))}
    </ul>
  )
}