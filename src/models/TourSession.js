const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const Tour = require("./Tour");

const TourSession = db.define(
    "TourSession",
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        tourId: {
            type: DataTypes.UUID,
            references: {
                model: Tour,
                key: "id"
            },
            field: "tour_id",
            allowNull: false
        },
        startTime: {
            field: "start_time",
            type: DataTypes.DATE,
            allowNull: false
        },
        finishTime: {
            field: "finish_time",
            type: DataTypes.DATE,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = TourSession;
