import React from "react";
import Guests from "./components/Guests";

import TasksTable from "./components/TasksTable";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Guest Management App</h1>

      <Guests />
      <TasksTable />
    </div>
  );
}

export default App;
