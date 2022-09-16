import React, { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { TASK_URL } from "./lib/constants";

export default function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(TASK_URL)
      .then((res) => res.json())
      .then((tasks) => setTasks(tasks));
  }, []);

  function addNewTask(task) {
    setTasks(tasks.concat(task));
  }
  function removeTask(id) {
    setTasks(tasks.filter((task) => task._id !== id));
  }
  function updateTask(task) {
    const updatedTask = tasks.map((t) => {
      if (task._id === t._id) {
        return task;
      }
      return t;
    });
    setTasks(updatedTask);
  }
  return (
    <div>
      <AddTask addNewTask={addNewTask} />
      <Tasks tasks={tasks} removeTask={removeTask} updateTask={updateTask} />
    </div>
  );
}
