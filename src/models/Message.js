const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const User = require("./User");

const Message = db.define(
    "Message",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        receiver: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
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
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            field: "created_at",
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at",
            allowNull: true
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = Message;
