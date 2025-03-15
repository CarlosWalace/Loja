const sequelize = require("./config/db"); // Caminho do seu arquivo de configuração
const User = require("./models/user"); // Caminho do modelo que você criou

sequelize
  .sync({ force: true }) // Se você quiser recriar a tabela, use 'force: true'
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao sincronizar as tabelas:", error);
  });
