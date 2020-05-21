const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const TourSession = require("./TourSession");
const User = require("./User");

const Booking = db.define("Booking", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    sessionId: {
        field: "session_id",
        type: DataTypes.STRING,
        allowNull: false,
        references: TourSession.id
    },
    userId: {
        field: "user_id",
        type: DataTypes.STRING,
        allowNull: false,
        references: User.id
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
});

module.exports = Booking;
