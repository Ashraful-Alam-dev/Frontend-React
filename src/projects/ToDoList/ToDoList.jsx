import React, { useState } from "react";
import './styles.css';

function ToDoList() {
    const [tasks, setTasks] = useState([
        { text: "Breakfast", done: false },
        { text: "Shower", done: false }
    ]);
    const [newTask, setNewTask] = useState("");

    function handleInput(event) {
        setNewTask(event.target.value);
    }

    function add() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { text: newTask, done: false }]);
            setNewTask("");
        }
    }

    function remove(index) {
        const updatedTasks = tasks.filter((task, i) => i !== index);
        setTasks(updatedTasks);
    }

    function done(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, done: !task.done } : task
        );
        setTasks(updatedTasks);
    }

    return (
        <div>
            <h1>ToDo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter New Task.."
                    value={newTask}
                    onChange={handleInput}
                />
                <button className="add" onClick={add}>
                    Add
                </button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={task.done ? "task-done" : ""}>
                        <span>{task.text}</span>
                        <div className="buttons">
                            <button
                                className="done"
                                onClick={() => done(index)}
                            >
                                {task.done ? "Undo" : "Mark as Done"}
                            </button>
                            <button
                                className="delete"
                                onClick={() => !task.done && remove(index)}
                                disabled={task.done}
                            >
                                Remove
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;
