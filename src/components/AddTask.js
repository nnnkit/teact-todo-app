import { useState } from "react";
import { TASK_URL } from "../lib/constants";

export default function AddTask(props) {
  const [task, setTask] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    fetch(TASK_URL, {
      method: "POST",
      body: JSON.stringify({ text: task }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        props.addNewTask(res);
        setTask("");
      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name of the task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
