const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const TourSession = require("./TourSession");
const User = require("./User");

const Booking = db.define(
    "Booking",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        sessionId: {
            field: "session_id",
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: TourSession,
                key: "id"
            }
        },
        userId: {
            field: "user_id",
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        offer: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pending",
            validate: {
                isIn: [["pending", "confirmed", "rejected"]]
            }
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = Booking;
