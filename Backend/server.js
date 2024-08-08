const express = require("express");
const app = express();
const routes = require("./routes/MainRoutes");
const LoginRoute = require("./routes/log/LoginRoutes");
require("dotenv").config();
const dbConnection = require("./config/DbConnnection");
//cookies parser
const cookiesParser = require("cookie-parser");

// Environment variable configuration
const port = process.env.PORT || 8000;
app.use(cookiesParser());
// Middleware for parsing JSON bodies
app.use(express.json());

// Database connection
dbConnection();

// Server status route
app.get("/", (req, res) => {
  res.send("Nodemailer server running!");
});

// Blog routes
app.use("/api/blog", routes);
// Authentication routes
app.use("/api/auth", LoginRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
