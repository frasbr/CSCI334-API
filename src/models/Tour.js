const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const User = require("./User");

const Tour = db.define(
    "Tour",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true
        },
        guide: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
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
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = Tour;
