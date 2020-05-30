const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const responseGenerator = require("../util/responseGenerator");
const Op = require("sequelize").Op;

const registerUser = (userDetails) => {
    const { username, email, password, firstName, lastName } = userDetails;

    return User.findOne({
        // find a user that matches either the username OR the email address
        where: { [Op.or]: [{ username }, { email }] }
    }).then(async (user) => {
        if (user) {
            // These details are not unique so return a 401
            const errors = {};
            if (user.username === username) {
                errors.username =
                    "There is already an account with the specified username";
            }
            if (user.email === email) {
                errors.email =
                    "There is already an account associated with this email address";
            }
            return responseGenerator(401, errors);
        }

        // Otherwise the details provided are good, so we can create a new user

        // dont forget to hash dat password
        const hash = bcrypt.hashSync(password);

        // Create a new user instance
        const newUser = User.build({
            username,
            email,
            hash,
            firstName,
            lastName
        });

        try {
            // Save that to the database
            await newUser.save();
            // Let the user know it was a success :D
            return responseGenerator(200, {
                success: true
            });
        } catch (error) {
            console.error(error);
            return responseGenerator(500, {
                message: "Something went wrong. Try again later"
            });
        }
    });
};

const login = async (username, password) => {
    // Convert the provided password into a hash which can be compared with the hashed password stored within the database
    const hash = bcrypt.hashSync(password);

    // Look up the user in the database
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email: username }]
            }
        });

        if (!user) {
            // No user matches the provided details so return 401 (unauthorised)
            return responseGenerator(401, {
                message: "Incorrect username or password"
            });
        } else {
            // check the password
            if (!bcrypt.compareSync(password, user.hash)) {
                return responseGenerator(401, {
                    message: "Incorrect username or password"
                });
            }
        }

        const payload = {
            id: user.id,
            username: user.username,
            isLoginToken: true
        };

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 * 24
        });

        return responseGenerator(200, {
            token
        });
    } catch (err) {
        console.error(err);
        return responseGenerator(500, {
            message: "Something went wrong on our end"
        });
    }
};

module.exports = {
    registerUser,
    login
};
