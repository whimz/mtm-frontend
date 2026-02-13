import classes from "./StatusBadge.module.css"

// Unified status config
const statusConfig = {
  COMPLETE: {
    icon: "✅",
    className: classes.complete,
    description: "Task completed successfully",
  },
  COMPLETED: {
    icon: "✅",
    className: classes.complete,
    description: "Task completed successfully",
  },
  FAILED: {
    icon: "❌",
    className: classes.failed,
    description: "Task failed to execute",
  },
  PENDING: {
    icon: "⏳",
    className: classes.pending,
    description: "Task is waiting to be scheduled",
  },
  RUNNING: {
    icon: "🔄",
    className: classes.running,
    description: "Task is currently running",
  },
  DISABLED: {
    icon: "⏸",
    className: classes.disabled,
    description: "Task is disabled or paused",
  },
  SCHEDULED: {
    icon: "🕒",
    className: classes.scheduled,
    description: "Task is scheduled to run",
  },
}

export default function StatusBadge({ status, size = "medium", showIcon = true }) {
  const normalizedStatus = status?.toUpperCase() || "PENDING"
  const config = statusConfig[normalizedStatus]

  if (!config) {
    return (
      <span className={`${classes.statusBadge} ${classes[size]}`} title={status}>
        {status}
      </span>
    )
  }

  const { icon, className, description } = config

  return (
    <span
      className={`${classes.statusBadge} ${className} ${classes[size]}`}
      title={description}
      aria-label={`${normalizedStatus}: ${description}`}
      role="status"
    >
      {showIcon && icon && (
        <span className={classes.statusIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{normalizedStatus}</span>
    </span>
  )
}
