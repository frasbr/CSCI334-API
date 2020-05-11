const User = require("../models/User");
const responseGenerator = require("../util/responseGenerator");

const findAllUsers = async () => {
    try {
        const users = await User.findAll();
        return responseGenerator(200, { data: users });
    } catch (err) {
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const findUserById = async (_id) => {
    try {
        const user = await User.findOne({ _id });

        if (!user) {
            return responseGenerator(404, {
                message: `No users found for id: ${_id}`
            });
        }

        // return relevant information about user
        const { username, firstName, lastName } = user;

        return responseGenerator(200, {
            username,
            firstName,
            lastName
        });
    } catch (err) {
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const findUserByUsername = async (_username) => {
    try {
        const user = await User.findOne({
            where: {
                username: _username
            }
        });

        if (!user) {
            return responseGenerator(404, {
                message: `No users found with username: ${_username}`
            });
        }

        // return relevant information about user
        const { username, firstName, lastName } = user;

        return responseGenerator(200, {
            username,
            firstName,
            lastName
        });
    } catch (err) {
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

module.exports = {
    findAllUsers,
    findUserById,
    findUserByUsername
};
