const User = require("../models/User");
const Message = require("../models/Message");
const responseGenerator = require("../util/responseGenerator");

const sendMessage = async (_sender, _receiver, _msg) => {
    const user = await User.findOne({ where: { id: _receiver } });

    if (!user) {
        return responseGenerator(404, {
            message: "User not found"
        });
    }

    const newMsg = Message.build({
        sender: _sender,
        receiver: _receiver,
        message: _msg,
        state: "sent"
    });

    try {
        newMsg.save();
        return responseGenerator(200, {
            success: true,
            msg: newMsg
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

const getInbox = async (_receiver) => {
    try {
        const messages = await Message.findAll({
            where: { receiver: _receiver }
        });

        return responseGenerator(200, {
            messages
        });
    } catch (err) {
        console.log(err);
        return responseGenerator(500, {
            message: "Something went wrong"
        });
    }
};

module.exports = {
    sendMessage,
    getInbox
};
