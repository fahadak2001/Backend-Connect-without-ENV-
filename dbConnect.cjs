const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" }); //requires the config file
const express = require("express");

const app = express();

app.use("/users", require("./routeusers")); //this whole code allows CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

async function main() {
  try {
    const Db = process.env.DB_URI; //this returns an obj from the config
    console.log("Connecting to MongoDB with URI:", Db);
    await mongoose.connect(Db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

const port = process.env.PORT || 3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
  console.log(`Server is running on port ${port}`);
});



main();
