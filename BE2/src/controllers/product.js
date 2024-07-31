import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  console.log("Hello");
  try {
    // const newProduct = new Product({ title, price, description });
    // await newProduct.save();
    const newProduct = await Product.create(req.body);
    return res.status(201).json({ data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    // const newProduct = new Product({ title, price, description });
    // await newProduct.save();
    const newProduct = await Product.find();
    return res.status(201).json({ data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getbyIDProduct = async (req, res) => {
  try {
    // const newProduct = new Product({ title, price, description });
    // await newProduct.save();
    const newProduct = await Product.findById(req.params.id);
    return res.status(201).json({ data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  console.log("Hello");
  try {
    // const newProduct = new Product({ title, price, description });
    // await newProduct.save();
    const newProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(201).json({ data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const delProduct = async (req, res) => {
  try {
    // const newProduct = new Product({ title, price, description });
    // await newProduct.save();
    const newProduct = await Product.findByIdAndDelete(req.params.id);
    return res.status(201).json({ data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
