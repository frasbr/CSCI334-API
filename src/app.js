const express = require("express");
const passport = require("passport");

// load variables from .env file into process.env
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// initialise express server
const app = express();

// import routes for server to use
const authRouter = require("./routes/auth");
app.use(authRouter.getPath(), authRouter.getInstance());
const userRouter = require("./routes/user");
app.use(userRouter.getPath(), userRouter.getInstance());

// middleware for buffering http response into js object
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to the database
const db = require("./config/database");

// check database connection
db.authenticate()
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((err) => {
        console.error(err);
    });

// middleware for private route authorisation
app.use(passport.initialize());
// initialise JwtStrategy
require("./config/passport")(passport);

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
