import React from 'react';
import { Link } from "react-router-dom";
import { formatISODateTime } from "../../util/helpers";
import classes from "./TaskList.module.css";
import StatusBadge from '../../ui/badges/StatusBadge';

function TaskListRow({ rowIndex, task, status }) {

  return (
    <li>
      <span>{rowIndex + 1}</span>
      <div className={classes["taskList-preview"]}>
        <Link to={task.id.toString()}>
          <span
            className={classes["taskList-preview-title"]}
            title={task.title}
          >
            {task.title}
          </span>
        </Link>

        <span>{task.created_at}</span>
        <span>{/^null:\d{2}$/.test(task.launch_time) ? '' : formatISODateTime(task.launch_time)}</span>
        <span style={{textTransform: 'uppercase'}}>{task.schedule_type}</span>
        <StatusBadge status={status} />
      </div>
    </li>
  );
}

export default React.memo(TaskListRow);
