const Router = require("express");
const router = Router();

const {
  getUser,
  createUser,
  getUserByEmail,
  deleteUser,
} = require("../controllers/index.controller");

router.get("/users", getUser);
router.get("/users/:email", getUserByEmail);
router.post("/users", createUser);
router.delete("/users/:email", deleteUser);

module.exports = router;
