const { Sequelize } = require("sequelize");
require("dotenv").config(); // Carrega as variáveis de ambiente

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT,
    logging: false, // Desativa logs SQL no console
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conexão bem-sucedida com o banco de dados"))
  .catch((error) => console.error("Erro ao conectar ao banco:", error));

module.exports = sequelize;
