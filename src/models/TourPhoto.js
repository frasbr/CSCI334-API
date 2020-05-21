const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const Tour = require("./Tour");

const TourPhoto = db.define("TourPhoto", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    tourId: {
        type: DataTypes.STRING,
        references: Tour.id,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caption: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = TourPhoto;
