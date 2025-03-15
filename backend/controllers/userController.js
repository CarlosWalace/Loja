const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  console.log("Resultados do GET----------" + req.params.id);
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  res.json(user);
};

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  await user.update(req.body);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
  await user.destroy();
  res.json({ message: "Usuário deletado" });
};
