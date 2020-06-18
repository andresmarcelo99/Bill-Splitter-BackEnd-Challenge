const { Pool } = require("pg");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

//test db
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: 5433,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getUser = (req, res) => {
  pool
    .query(
      `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
         name VARCHAR(40),
        email TEXT,
         split TEXT
    )`
    )
    .then((resp) => {
      pool
        .query(`SELECT * from users`)
        .then((response) => res.json(response.rows))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err));
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
      {
        
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "secure233.servconfig.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "info@sidhn.com", // generated ethereal user
            pass: "HLqiV7F(lglu", // generated ethereal password
          },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: '"Bill-Splitter" <info@sidhn.com>', // sender address
          to: `${email}`, // list of receivers
          subject: "Your lastest split", // Subject line
          text: "Text", // plain text body
          html: `<b>${split}</b>`, // html body
        });
        
        return res.json({
        message: "User Created",
        body: {
          user: { name, email, split },
        },
      })}
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
