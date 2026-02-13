import { Link, useSubmit } from "react-router-dom"
import { useTaskStatus } from "../../contexts/TaskStatusContext.jsx"
import classes from "./TaskItem.module.css"
import StatusBadge from "../../ui/badges/StatusBadge"
import Button from "../../ui/buttons/Button"

export default function TaskItem({ task }) {
  const submit = useSubmit()
  const liveStatus = useTaskStatus(task.id)
  const displayStatus = liveStatus || task.status

  console.log(task);

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?")

    if (proceed) {
      submit(null, { method: "delete" })
    }
  }

  return (
    <article className={classes.task}>
      <h2>{task.title}</h2>

      <div className={classes.taskRow}>
        <span>Description</span>
        <span>{task.description}</span>
      </div>
      <div className={classes.taskRow}>
        <span>URL</span>
        <span>
          <a href={task.url} target="_blank" rel="noopener noreferrer">
            {task.url}
          </a>
        </span>
      </div>
      <div className={classes.taskRow}>
        <span>Data</span>
        <div className={classes.inputs}>
          <div className={classes.task__inputsRow}>
            <span>Key</span>
            <span>
              <b>Value</b>
            </span>
            <span>
              <b>Selector</b>
            </span>
          </div>
          {Object.entries(task?.inputs?.fields || {}).map(([key, value]) => (
            <div className={classes.task__inputsRow} key={key}>
              <span className={classes.task__inputKey}>{key}: </span>
              <span>{value.value}</span>
              <span>{value.selector}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={classes.taskRow}>
        <span>Schedule type</span>
        <span>{task.schedule_type}</span>
      </div>
      <div className={classes.taskRow}>
        <span>Surveyed email</span>
        <span>{task.email_address}</span>
      </div>
      <div className={classes.taskRow}>
        <span>Launch Time</span>
        <span>{task.launch_time ? new Date(task.launch_time).toLocaleString("en-GB") : "Not set"}</span>
      </div>
      <div className={classes.taskRow}>
        <span>Created</span>
        <span>{new Date(task.created_at).toLocaleString("en-GB")}</span>
      </div>
      <div className={classes.taskRow}>
        <span>Updated</span>
        <span>{new Date(task.updated_at).toLocaleString("en-GB")}</span>
      </div>
      <div className={classes.taskRow}>
        <span>Status</span>
        <StatusBadge status={displayStatus} />
      </div>

      <menu className={classes.actions}>
        <Button as={Link} to="edit" variant="edit" icon="edit">
          Edit
        </Button>
        <Button onClick={startDeleteHandler} variant="delete" icon="delete">
          Delete
        </Button>
      </menu>
    </article>
  )
}
