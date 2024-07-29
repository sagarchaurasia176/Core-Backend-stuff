const express = require("express");
const dbConnection = require("./config/DbConnnection");
dbConnection();

require('dotenv').config();
const routes = require("./routes/route");
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

// added the routes
routes.use("/api/blog" , routes);
