import express from "express";
import passport from "passport";

// import routes here
// todo

// initialise express server
const app = express();

// middleware for buffering http response into js object
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to the database
// todo

// middleware for private route authorisation
app.use(passport.initialize());
// todo: implement JwtStrategy

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
