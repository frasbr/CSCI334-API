const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const User = require("./User");

const UserRating = db.define(
    "UserRating",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            field: "user_id",
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        guideId: {
            field: "guide_id",
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: User,
                key: "id"
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
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
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = UserRating;
