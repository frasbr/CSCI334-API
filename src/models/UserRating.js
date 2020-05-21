const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const User = require("./User");

const UserRating = db.define("UserRating", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        field: "user_id",
        type: DataTypes.STRING,
        allowNull: false,
        references: User.id
    },
    guideId: {
        field: "guide_id",
        type: DataTypes.STRING,
        allowNull: false,
        references: User.id
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 5
        }
    }
});

module.exports = UserRating;
