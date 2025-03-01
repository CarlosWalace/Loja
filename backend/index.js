const express = require("express");
const cors = require("cors"); // Permite que a API seja acessada de diferentes domínios.
require("dotenv").config(); // Carrega variáveis de ambiente do arquivo .env
const bcrypt = require("bcrypt"); // Usado para criptografar as senhas.
const { User, sequelize } = require("./models/db"); // Importa os modelos do banco de dados

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Testar a conexão com o banco de dados e sincronizar os modelos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida!");
    return sequelize.sync(); // Cria as tabelas se não existirem
  })
  .catch((error) => {
    console.error("Erro ao conectar com o banco de dados:", error);
  });

// Rota para criar um usuário
app.post("/users", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Verificar se o email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email já em uso" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o usuário no banco de dados
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Role padrão é 'user'
    });

    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar usuário", error });
  }
});

// Testando a rota principal
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
