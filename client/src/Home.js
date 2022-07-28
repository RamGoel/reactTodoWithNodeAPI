import React, { useState, useEffect } from 'react';
import Task from './Task';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [task, setTaskValue] = useState('');
  var count = 50;

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const fiftyTasks = data.filter((elem) => elem.id <= count);
        setTasks(fiftyTasks);
        var completedTasks = fiftyTasks.filter(
          (elem) => elem.completed == true
        );
        setCompleted(completedTasks);
      });
  }, ['']);

  const updateTask = (taskId) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${taskId}`, {
      method: 'PATCH',
      data: JSON.stringify({
        completed: true,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then(() => {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((data) => {
          const fiftyTasks = data.filter((elem) => elem.id <= count);
          setTasks(fiftyTasks);
          var completedTasks = fiftyTasks.filter(
            (elem) => elem.completed == true
          );
          setCompleted(completedTasks);
        });
    });
  };

  const deleteTask = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    }).then(() => {
      count = count - 1;
      alert('Task Deleted');
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
        .then((data) => {
          const fiftyTasks = data.filter((elem) => elem.id <= count);
          setTasks(fiftyTasks);
          var completedTasks = fiftyTasks.filter(
            (elem) => elem.completed == true
          );
          setCompleted(completedTasks);
        });
    });
  };

  const createTask = (value) => {
    count = count + 1;
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        userId: 1,
        id: count,
        title: value,
        completed: false,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        alert('Task Created');
        incOper(oper + 1);
      });
  };

  return (
    <div>
      <header className="w-100 p-3 text-center">
        To-Do List ({completed.length}/{tasks.length} tasks completed)
      </header>
      <div id="content" className="container">
        <div id="topDiv" className="">
          <p className="m-0">Add a New Task in List</p>
          <br />
          <div className="row">
            <input
              placeholder="Enter the task Here"
              className="form-control bg-gray  w-50"
              onChange={(e) => setTaskValue(e.target.value)}
              value={task}
            />
            <button
              id="submitBtn"
              className="col-2"
              onClick={() => createTask(task)}
            >
              Submit
            </button>
          </div>
        </div>

        <div id="Task Container" className="my-3">
          <p>Added Tasks in To-do List</p>
          <ol className="row " id="taskList">
            {tasks.map((elem) => {
              return (
                <li className="col-4 my-2">
                  <Task
                    key={elem.id}
                    TaskName={elem.title}
                    completed={elem.completed}
                    dltTask={() => deleteTask(elem.id)}
                    markC={() => updateTask(elem.id)}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
