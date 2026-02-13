import { redirect, useRouteLoaderData } from "react-router-dom";
import TaskItem from "../components/tasks/TaskItem";
import { API_ENDPOINTS } from "../config/api";

export default function TaskDetailPage(){

  const data = useRouteLoaderData('task-detail');
  return (
    <TaskItem task={data.task} />
  )
}

export async function loader({request, params}) {

  const token = localStorage.getItem("token")

  if (!token) {
    throw new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }

  const id = params.taskId;
  const response = await fetch(API_ENDPOINTS.task(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if(!response.ok){
    throw new Response(
      JSON.stringify({ message: 'Could not fetch details for selected task' }),
      { status: 500 }
    );
  } else {
    return response;
  }
  
}

export async function action({params, request}) {
  const id = params.taskId;
  const response = await fetch(API_ENDPOINTS.task(id), {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    }
  });

  if(!response.ok){
    throw new Response(
      JSON.stringify({ message: 'Could not delete task' }),
      { status: 500 }
    );
  } 

  return redirect('/tasks');
}