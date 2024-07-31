const express = require("express");
const app = express();
const routes = require("./routes/MainRoutes");
require("dotenv").config();
const dbConnection = require("./config/DbConnnection");

// post definde
const port = process.env.PORT || 8000;
app.use(express.json());
// db connections
dbConnection();
//server running
app.get("/", (req, res) => {
  res.send("nodemailer server running !");
});

// added the routes
app.use("/api/blog", routes);

// listen ports
app.listen(port, () => {
  console.log(`port run at ${port}`);
});
