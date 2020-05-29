const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");
const Tour = require("./Tour");

const Tag = db.define("Tag", {
    tourId: {
        field: "tour_id",
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Tour,
            key: "id"
        }
    },
    tagName: {
        field: "tag_name",
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Tag;
