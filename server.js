const express = require("express");
const app = express();

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(require("./src/routes/index.js"));

app.listen(5000);
console.log("Server on port 5000");
