const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');

const createProduct = async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(201).json({ product });
}

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  console.log(products)
  res.status(StatusCodes.OK).json({ products })
}

module.exports = { createProduct, getAllProducts };