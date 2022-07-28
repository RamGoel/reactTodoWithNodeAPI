import React from 'react';

export default function Task(props) {
  return (
    <div
      className={
        props.completed ? 'completedTask todo-card card ' : 'todo-card card '
      }
    >
      <p className="card-title p-2 m-0">{props.TaskName}</p>
      <div className="todo-card-btn-box card-footer">
        <button onClick={props.markC} className={(props.completed) ? 'dltBtn card-btn' :'completeBtn card-btn'}>Mark as {(props.completed)? 'Incomplete' :"Completed" }</button>
        <button className="dltBtn card-btn" onClick={props.dltTask}>Delete</button>
      </div>
    </div>
  );
}
