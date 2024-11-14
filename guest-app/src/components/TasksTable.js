import React, { useState, useEffect } from "react";
import { getTasks, createTask, updateTask } from "../taskService";
import { getGuests } from "../guestService";
import TaskForm from "./TaskForm";
import ChatInterface from "./ChatInterface";

const TaskTable = () => {
  // Initial task list
  const [tasks, setTasks] = useState([]);
  const [guests, setGuests] = useState([]);
  //   const [guests, setGuests] = useState([]);

  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const guests = await getGuests();
    setGuests(guests);
    const data = await getTasks();
    const guestMap = guests.reduce((map, guest) => {
      map[guest.id] = guest.name;
      return map;
    }, {});

    const tasksWithGuestNames = data.map((task) => ({
      ...task,
      assigned_member: guestMap[task.assigned_member] || "Unknown", // Fallback in case ID doesn't match
    }));

    setTasks(tasksWithGuestNames);
  };

  const handleSaveClick = async (id) => {
    const updatedTask = tasks.find((task) => task.id === id);

    try {
      await updateTask(id, updatedTask);
      setEditingTaskId(null);

      fetchTasks();
    } catch (error) {
      console.error("There was an error updating the task!", error);
    }
  };

  // Function to handle edit button click
  const handleEditClick = (id) => {
    setEditingTaskId(id);
  };

  const handleTaskSubmit = async (task) => {
    console.log("New Task:", task);
    try {
      await createTask(task);

      fetchTasks();
    } catch (error) {
      console.error("There was an error adding the task!", error);
    }
  };

  // Function to handle input change
  const handleInputChange = (e, taskId, field) => {
    let value = e.target.value;
    if (field == "due_date") {
      value = new Date(value).toISOString().split("T")[0];
    }
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <div>
        <h1>Task List</h1>
        <table border="1">
          <thead>
            <tr>
              <th>Description</th>
              <th>Due Date</th>
              <th>Category</th>
              <th>Assigned Member</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                {editingTaskId === task.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={task.description}
                        onChange={(e) =>
                          handleInputChange(e, task.id, "description")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={task.due_date}
                        onChange={(e) =>
                          handleInputChange(e, task.id, "due_date")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={task.status}
                        onChange={(e) =>
                          handleInputChange(e, task.id, "status")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={task.assigned_member}
                        onChange={(e) =>
                          handleInputChange(e, task.id, "assigned_member")
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSaveClick(task.id)}>
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.description}</td>
                    <td>{task.due_date}</td>
                    <td>{task.status}</td>
                    <td>{task.assigned_member}</td>
                    <td>
                      <button onClick={() => handleEditClick(task.id)}>
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <TaskForm guests={guests} onSubmit={handleTaskSubmit} />
      </div>
      <div>
        <ChatInterface data={tasks} />
      </div>
    </div>
  );
};

export default TaskTable;
