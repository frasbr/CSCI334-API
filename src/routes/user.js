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
const getCurrentUser = new Route("get", "/current", true, async (req, res) => {
    const { id } = req.user;
    const { status, data } = await userService.findUserById(id);
    return res.status(status).json(data);
});

router.registerRoute(getCurrentUser);

// @route   GET /id/:id
// @desc    Return information about the user account specified by the provided `id`
// @access  Protected
const getUserById = new Route("get", "/id/:id", true, async (req, res) => {
    const { id } = req.params;
    const { status, data } = await userService.findUserById(id);
    return res.status(status).json(data);
});

router.registerRoute(getUserById);

// @route   GET /name/:username
// @desc    Return information about the user account specified by the provided `username`
// @access  Protected
const getUserByName = new Route(
    "get",
    "/name/:username/",
    true,
    async (req, res) => {
        const { username } = req.params;
        const { status, data } = await userService.findUserByUsername(username);
        return res.status(status).json(data);
    }
);

router.registerRoute(getUserByName);

// @route   POST /update/:id
// @desc    Update information related to a user profile
// @access  Protected - restricted to users whose token matches the id given in the url
const updateProfile = new Route(
    "post",
    "/update/:id",
    true,
    async (req, res) => {
        const { id } = req.params;
        const { id: userId } = req.user;

        // check if the request is related to the users own profile
        if (userId !== id) {
            return res.status(401).json({
                message: "You may only make changes to your own profile"
            });
        }
        const { bio } = req.body;
        const { status, data } = await userService.updateProfile(userId, bio);
        return res.status(status).json(data);
    }
);

router.registerRoute(updateProfile);

module.exports = router;
