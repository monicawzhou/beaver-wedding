const pool = require("./dbConfig");

const getGuests = (request, response) => {
  pool.query("SELECT * FROM guests", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createGuest = (request, response) => {
  const { name, role } = request.body;

  pool.query(
    "INSERT INTO guests (name, role) values ($1, $2)",
    [name, role],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("A new guest has been added to the database.");
    }
  );
};

const updateGuest = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, role } = request.body;

  pool.query(
    "UPDATE guests SET name = $1, role = $2 WHERE id = $3",
    [name, role, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("A guest has been updated in the database.");
    }
  );
};

const deleteGuest = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM guests WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Guest deleted with ID: ${id}`);
  });
};

module.exports = {
  getGuests,
  createGuest,
  updateGuest,
  deleteGuest,
};
