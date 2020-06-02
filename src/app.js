const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");

// load variables from .env file into process.env
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// initialise express server
const app = express();

// FOR AVOIDING CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// middleware for buffering http response into js object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes for server to use
const authRouter = require("./routes/auth");
app.use(authRouter.getPath(), authRouter.getInstance());
const userRouter = require("./routes/user");
app.use(userRouter.getPath(), userRouter.getInstance());
const tourRouter = require("./routes/tour");
app.use(tourRouter.getPath(), tourRouter.getInstance());
const ticketRouter = require("./routes/ticket");
app.use(ticketRouter.getPath(), ticketRouter.getInstance());
const msgRouter = require("./routes/message");
app.use(msgRouter.getPath(), msgRouter.getInstance());

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

// set up associations in sequelize
require("./models/Associations")();

// middleware for private route authorisation
app.use(passport.initialize());
// initialise JwtStrategy
require("./config/passport")(passport);

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
