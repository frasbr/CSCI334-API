const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const User = require("./User");

const Message = db.define("Message", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    sender: {
        type: DataTypes.STRING,
        allowNull: false,
        references: User.id
    },
    receiver: {
        type: DataTypes.STRING,
        allowNull: false,
        references: User.id
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sentAt: {
        field: "sent_at",
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
});

module.exports = Message;
