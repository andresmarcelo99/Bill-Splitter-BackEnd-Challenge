const Router = require("express");
const router = Router();
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const {
  getUser,
  createUser,
  getUserByEmail,
  deleteUser,
} = require("../controllers/index.controller");

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

router.get("/users", getUser);
router.get("/users/:email", checkJwt, getUserByEmail);
router.post("/users", createUser);
router.delete("/users/:email", deleteUser);

module.exports = router;
