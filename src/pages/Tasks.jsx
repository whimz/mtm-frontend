import { useLoaderData } from "react-router-dom";
import TasksList from "../components/tasks/TasksList";
import { API_ENDPOINTS } from "../config/api";

export default function TasksPage() {
  const data = useLoaderData();
    const tasks = data.tasks;
    return (
      <>
        {(tasks && tasks.length > 0) && <TasksList tasks={tasks} />}
        {(!tasks || tasks.length === 0) && <TasksList tasks={[]} />}
        {(data.message === 'No tasks found') && <p>{data.message}</p>}
      </>
    )
}

export async function loader(){
  const response = await fetch(API_ENDPOINTS.TASKS);
  if(!response.ok){
    throw new Response(
      JSON.stringify({ message: 'Could not fetch tasks' }),
      { status: 500 }
    );
  } else {
    return response;
  }
}