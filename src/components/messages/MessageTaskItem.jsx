export default function MessageTask({ task }){

  return (

    <>
     <div>
        <span>Task Name: </span>
        <span>{task.name}</span>
      </div>
      <div>
        <span>URL: </span>
        <span>{task.url}</span>
      </div>
      <div className="inputValues">
        <div className="inputItem">
          <span>Name: </span>
          <span>{task.inputs.name}</span>
        </div>
        <div className="inputItem">
          <span>Email: </span>
          <span>{task.inputs.email}</span>
        </div>
        <div className="inputItem">
          <span>Message: </span>
          <span>{task.inputs.message}</span>
        </div>
      </div> 
    </>
  )
}