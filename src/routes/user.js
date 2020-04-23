const Router = require("./Router");
const Route = require("./Route");
const userService = require("../services/user");

// init user router
const router = new Router("/user");

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

module.exports = router;
