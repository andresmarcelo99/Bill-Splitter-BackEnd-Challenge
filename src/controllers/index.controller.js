const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: 5433,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const getUser = (req, res) => {
  console.log(require("dotenv").config());
  pool
    .query(`SELECT * from users`)
    .then((response) => res.json(response.rows))
    .catch((err) => res.json(err));
};

const getUserByEmail = (req, res) => {
  pool
    .query("SELECT * FROM users WHERE email = $1", [req.params.email])
    .then((response) => {
      return res.json(response.rows);
    })
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
    .query("DELETE FROM users WHERE id = $1", [req.params.id])
    .then(() => res.json(`User ${req.params.id} deleted `))
    .catch((err) => res.json(err));
};

module.exports = {
  getUser,
  createUser,
  getUserByEmail,
  deleteUser,
};
