import { useRouteLoaderData } from "react-router-dom";
import TaskForm from "../components/taskForm/TaskForm";

export default function EditTaskPage(){

  const data = useRouteLoaderData('task-detail');

  return (
    <TaskForm method="patch" task={data.task}/>
  )
}