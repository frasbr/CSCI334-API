const User = require("../models/User");
const responseGenerator = require("../util/responseGenerator");

const findAllUsers = async () => {
    try {
        const users = await User.findAll();
        return responseGenerator(200, {
            data: users
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const findUserById = async (_id) => {
    try {
        const user = await User.findOne({
            where: {
                id: _id
            }
        });

        if (!user) {
            return responseGenerator(404, {
                message: `No users found with id: ${_id}`
            });
        }

        return responseGenerator(200, {
            user
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

const updateProfile = async (_id, _bio) => {
    const user = await User.findOne({ where: { id: _id } });

    if (!user) {
        return responseGenerator(404, {
            message: `No users found with id: ${_id}`
        });
    }

    // assign new bio
    user.bio = _bio;

    try {
        // update the record in the db
        user.save();
        return responseGenerator(200, {
            success: true,
            user
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

module.exports = {
    findAllUsers,
    findUserById,
    findUserByUsername,
    updateProfile
};
