const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const User = require("./User");
const Booking = require("./Booking");

const Ticket = db.define("Ticket", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    issuerId: {
        field: "issuer_id",
        type: DataTypes.STRING,
        allowNull: false,
        references: User.id
    },
    subjectId: {
        field: "subject_id",
        type: DataTypes.STRING,
        allowNull: true,
        references: User.id
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [["tour", "verification"]]
        }
    },
    bookingId: {
        field: "booking_id",
        type: DataTypes.STRING,
        allowNull: true,
        references: Booking.id
    },
    document: {
        type: DataTypes.STRING,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Ticket;
