const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const responseGenerator = require("../util/responseGenerator");

const login = (username, password) => {
  // Convert the provided password into a hash which can be compared with the hashed password stored within the database
  const hash = bcrypt.hashSync(password);

  // Look up the user in the database
  return User.findOne({
    where: {
      hash,
      $or: {
        username: username,
        email: username
      }
    }
  }).then((user) => {
    if (!user) {
      // No user matches the provided details so return 401 (unauthorised)
      return responseGenerator(401, {
        message: "Incorrect username or password"
      });
    }

    // If we find a match then we generate a jwt to return to the user
    try {
      const payload = {
        id: user.id,
        username: user.username,
        isLoginToken: true
      };

      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 });

      return responseGenerator(200, {
        token
      });
    } catch (err) {
      console.error(err);
      return responseGenerator(500, {
        message: "Something went wrong on our end"
      });
    }
  });
};

module.exports = {
  login
};
