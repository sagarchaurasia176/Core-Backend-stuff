const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = () => {
  const dbConnections = mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
        console.log("db connected !");
  }).catch((er)=>{
    console.log("db failed to connected !");
  });
};


module.exports = dbConnection;