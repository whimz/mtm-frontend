import classes from "../auth/AuthForm.module.css";

export default function MessageAddTask() {

  function handleAddTask(event){
    event.preventDefault();
    console.log(new FormData(event.target));
  }

  return (

    <>
      <form className={classes.form} onSubmit={handleAddTask}>
        <p>
          <label htmlFor="taskName">Task name</label>
          <input type="text" name="taskName" id="taskName" />
        </p>
        <p>
          <label htmlFor="urls">Target URL</label>
          <input type="text" name="urls" id="urls" />
        </p>
        <p>
          <label htmlFor="senderName">Sender name</label>
          <input type="text" name="senderName" id="senderName" />
        </p>
        <p>
          <label htmlFor="senderEmail">Sender Email</label>
          <input type="email" name="senderEmail" id="senderEmail" />
        </p>
        <p>
          <label htmlFor="senderPhone">Sender Phone</label>
          <input type="tel" name="senderPhone" id="senderPhone" />
        </p>
        <p>
          <label htmlFor="senderMessage">Sender Message</label>
          <textarea name="senderMessage" id="senderMessage"></textarea>
        </p>
        <p>
          <button>Add Task</button>
        </p>
      </form>
    </>
  )
}