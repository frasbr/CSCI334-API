const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");

const User = db.define(
    "User",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            field: "first_name",
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            field: "last_name",
            allowNull: false
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false
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
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10000
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        validated: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        isAdmin: {
            field: "is_admin",
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = User;
