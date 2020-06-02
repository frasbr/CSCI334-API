// const router = require("express").Router();
const authService = require("../services/auth");
const Router = require("./Router");
const Route = require("./Route");

const router = new Router("/auth");

// @route   POST /register/user
// @desc    Register a new user account
// @access  Public
const registerUser = new Route(
    "post",
    "/register/user",
    false,
    async (req, res) => {
        const { username, email, password, firstName, lastName } = req.body;

        // to do: implement input validation

        // Attempt to register a new user
        const { status, data } = await authService.registerUser({
            username,
            email,
            password,
            firstName,
            lastName
        });

        // Return the result to the user
        res.status(status).json(data);
    }
);

router.registerRoute(registerUser);

// @route   POST /login
// @desc    Request access to a user account
// @access  Public
const login = new Route("post", "/login", false, async (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(422).json({
            message: "Please enter a valid username and password"
        });
    }

    // Attempt to login
    const { status, data } = await authService.login(username, password);

    // Return the result to the user
    res.status(status).json(data);
});

router.registerRoute(login);

module.exports = router;
