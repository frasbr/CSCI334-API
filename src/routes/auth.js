const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authService = require("../services/auth");
const userService = require("../services/user");

// @route   POST /login
// @desc    Request access to a user account
// @access  Public
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    res.status(401).json({
      message: "Please enter a valid username and password"
    });
  }

  // Attempt to login
  const { status, data } = authService.login(username, password);

  // Return the result to the user
  res.status(status).json(data);
});

module.exports = router;
