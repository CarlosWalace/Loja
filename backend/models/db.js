const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config(); // Carregar variáveis do arquivo .env

console.log(process.env.DB_HOST); // Verifique se o valor de DB_HOST está sendo lido corretamente
console.log(process.env.DB_USER); // Verifique se o valor de DB_USER está sendo lido corretamente
console.log(process.env.DB_PASSWORD); // Verifique se o valor de DB_PASSWORD está sendo lido corretamente
console.log(process.env.DB_NAME); // Verifique se o valor de DB_NAME está sendo lido corretamente
console.log(process.env.DB_PORT); // Verifique se o valor de DB_PORT está sendo lido corretamente

// Usando as variáveis de ambiente para construir a URL de conexão
const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialect: "postgres",
    logging: false, // Desativar logs de SQL
  }
);

// Definir o modelo de Usuário
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user", // Role padrão
  },
});

// Testar a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida!");
  })
  .catch((error) => {
    console.error("Não foi possível conectar ao banco de dados:", error);
  });

module.exports = { sequelize, User };
