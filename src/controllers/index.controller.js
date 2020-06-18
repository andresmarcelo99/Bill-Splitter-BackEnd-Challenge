const { Pool } = require("pg");
const dotenv = require("dotenv").config({ path: "../../.env" });

// const pool = new Pool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

const pool = new Pool({
  host: "mysplitsdb.cjb79ibvsmnw.us-east-2.rds.amazonaws.com",
  port: 5433,
  user: "postgres",
  password: "marcelosans12",
  database: "postgres",
});

const getUser = (req, res) => {
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
