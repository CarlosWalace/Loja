const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Importa a conexão com o banco

const product = sequelize.define("Product", {
  // Modelo em minúsculo
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = product;
