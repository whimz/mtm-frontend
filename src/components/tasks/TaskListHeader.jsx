import classes from './TaskList.module.css';

export default function TaskListHeader(){
  
  return(
    <>
      <span>
        <b>#</b>
      </span>
      <div className={classes["taskList-preview"]}>
        <p><b>Title</b></p>
        <p><b>Created</b></p>
        <p><b>Launch time</b></p>
        <p><b>Schedule type</b></p>
        <p><b>Status</b></p>
      </div>
    </>
  )
}