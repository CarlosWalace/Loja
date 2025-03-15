require("dotenv").config(); // Deve ser o primeiro
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Usando as rotas de usuário
app.use("/user", userRoutes);

// Usando as rotas de produto
app.use("/product", productRoutes);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
