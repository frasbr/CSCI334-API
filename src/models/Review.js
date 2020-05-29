const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const User = require("./User");
const Tour = require("./Tour");

const Review = db.define(
    "Review",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        tourId: {
            field: "tour_id",
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Tour,
                key: "id"
            }
        },
        reviewer: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id"
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 5,
                min: 0
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = Review;
