const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const Tour = require("./Tour");

const TourPhoto = db.define(
    "TourPhoto",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        tourId: {
            type: DataTypes.UUID,
            references: {
                model: Tour,
                key: "id"
            },
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
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = TourPhoto;
