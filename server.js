const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const app = express();
const dotenv = require("dotenv").config();

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000" }));

//setup auth0
const authConfig = {
  domain: "dev-en69qxgm.auth0.com",
  audience: "https://bill-splitter-api.com",
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"],
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your Access Token was successfully validated!",
  });
});

//routes
app.use(require("./src/routes/index.js"));

app.listen(5000);
console.log("Server on port 5000");
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_USER);
// console.log(process.env._DB);
// console.log(process.env.DB_PASSWORD);
