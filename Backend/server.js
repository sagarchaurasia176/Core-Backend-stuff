const express = require("express");
const dbConnection = require("./config/DbConnnection");
// const routes = require("");
const dotenv = require("dotenv");
const port = process.env.PORT || 8000;
// for middleware purpose
const app = express();
// this is called as you're mounting here
app.use(express.json());
// listend port at
app.listen(port, () => {
  console.log(`port run at ${port}`);
});
// db connection calling
dbConnection();





