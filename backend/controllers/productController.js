const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Produto não encontrado" });
  res.json(product);
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Produto não encontrado" });
  await product.update(req.body);
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Produto não encontrado" });
  await product.destroy();
  res.json({ message: "Produto deletado" });
};
