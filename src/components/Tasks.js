import React from "react";
import { TASK_URL } from "../lib/constants";

export default function Tasks(props) {
  function handleDelete(id) {
    fetch(TASK_URL + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        props.removeTask(res.id);
      });
  }
  function handleEdit(id) {
    const updatedText = prompt("Enter the new text!");
    if (!updatedText.trim()) return;
    fetch(TASK_URL + id, {
      method: "PUT",
      body: JSON.stringify({ text: updatedText }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        props.updateTask(res);
      });
  }
  return (
    <ul>
      {props.tasks.map((task) => {
        return (
          <li key={task._id}>
            <span>{task.text}</span>
            <span>
              <button onClick={() => handleDelete(task._id)}>del</button>
            </span>
            <span>
              <button onClick={() => handleEdit(task._id)}>edit</button>
            </span>
          </li>
        );
      })}
    </ul>
  );
}
