const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
const db = require("../config/database");

const User = db.define("User", {
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
    defaultValue: Sequelize.DATE,
    field: "created_at",
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
    allowNull: true
  }
});

module.exports = User;
