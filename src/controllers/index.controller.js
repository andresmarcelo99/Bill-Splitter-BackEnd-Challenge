const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Marcelosans12",
  database: "bill_splitter_api",
});

const getUser = (req, res) => {
  pool
    .query(`SELECT * from users`)
    .then((response) => res.send(response.rows))
    .catch((err) => res.send(err));
};

const getUserByEmail = (req, res) => {
  pool
    .query("SELECT * FROM users WHERE email = $1", [req.params.email])
    .then((response) => res.json(response.rows))
    .catch((err) => res.json(err));
};

const createUser = (req, res) => {
  const { name, email, split } = req.body;

  pool
    .query("INSERT INTO users(name, email, split) VALUES ($1, $2, $3)", [
      name,
      email,
      split,
    ])
    .then(() =>
      res.json({
        message: "User Created",
        body: {
          user: { name, email, split },
        },
      })
    )
    .catch((err) => res.send(err));
};

const deleteUser = (req, res) => {
  pool
    .query("DELETE FROM users WHERE email = $1", [req.params.email])
    .then(() => res.json(`User ${req.params.email} deleted `))
    .catch((err) => res.json(err));
};

module.exports = {
  getUser,
  createUser,
  getUserByEmail,
  deleteUser,
};
