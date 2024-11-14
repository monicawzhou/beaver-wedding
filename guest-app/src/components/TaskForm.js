import React, { useState } from "react";

function TaskForm({ guests, onSubmit }) {
  const [task, setTask] = useState({
    description: "",
    due_date: "",
    status: "Pending",
    assigned_member: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name == "due_date") {
      value = new Date(value).toISOString().split("T")[0];
    }

    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task); // Pass task data to the parent component or log it
  };

  return (
    <div>
      <h1>Create a New Task</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="due_date">Due Date:</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={task.due_date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="assigned_member">Assigned Member:</label>
          <select
            id="assigned_member"
            name="assigned_member"
            value={task.assigned_member}
            onChange={handleChange}
            required
          >
            <option value="">Select a member</option>
            {guests.map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
