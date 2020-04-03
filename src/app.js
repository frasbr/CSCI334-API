const express = require("express");
const passport = require("passport");
const Sequelize = require("sequelize");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// import routes here
// todo

// initialise express server
const app = express();

// middleware for buffering http response into js object
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to the database
const sql = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_URI,
    port: process.env.DB_PORT,
    dialect: "mysql",
    dialectOptions: {
      ssl: "Amazon RDS"
    }
  }
);
// check the connection
sql
  .authenticate()
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

// middleware for private route authorisation
app.use(passport.initialize());
// todo: implement JwtStrategy

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
