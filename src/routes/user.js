const Router = require("./Router");
const Route = require("./Route");
const userService = require("../services/user");

// init user router
const router = new Router("/user");

// @route   GET /all
// @desc    Returns information about all user accounts
// @access  Public [TEST]
const getAllUsers = new Route("get", "/all", false, async (req, res) => {
    const { status, data } = await userService.findAllUsers();
    return res.status(status).json(data);
});

router.registerRoute(getAllUsers);

// @route   GET /current
// @desc    Returns information about the user account currently logged in
// @access  Protected
const getCurrentUser = new Route("get", "/current", true, (req, res) => {
    if (req.user) {
        return res.status(200).json(req.user);
    } else {
        return res.status(404).json({
            message: "User not found"
        });
    }
});

router.registerRoute(getCurrentUser);

// @route   GET /byid/:id
// @desc    Return information about the user account specified by the provided `id`
// @access  Protected
const getUserById = new Route("get", "/byid/:id", true, (req, res) => {
    const { id } = req.params;
    const { status, data } = userService.getUserById(id);
    return res.status(status).json(data);
});

router.registerRoute(getUserById);

// @route   GET /byid/:username
// @desc    Return information about the user account specified by the provided `username`
// @access  Protected
const getUserByName = new Route(
    "get",
    "/byname/:username",
    true,
    (req, res) => {
        const { username } = req.params;
        const { status, data } = userService.getUserByUsername(username);
        return res.status(status).json(data);
    }
);

router.registerRoute(getUserByName);

module.exports = router;
