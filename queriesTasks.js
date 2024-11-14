const pool = require("./dbConfig");

const getTasks = (request, response) => {
  pool.query("SELECT * FROM tasks", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createTask = (request, response) => {
  const { description, due_date, status, assigned_member } = request.body;

  pool.query(
    "INSERT INTO tasks (description, due_date, status, assigned_member) values ($1, $2, $3, $4)",
    [description, due_date, status, assigned_member],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("A new guest has been added to the database.");
    }
  );
};

const updateTask = (request, response) => {
  const id = parseInt(request.params.id);
  const { description, due_date, status, assigned_member } = request.body;

  pool.query(
    "UPDATE tasks SET description = $1, due_date = $2, status = $3, assigned_member = $4 WHERE id = $5",
    [description, due_date, status, assigned_member, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("A guest has been updated in the database.");
    }
  );
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
};
