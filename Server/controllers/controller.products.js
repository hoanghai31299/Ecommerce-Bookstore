const Product = require("../models/model.products");
const { uploadSingle, dataUri } = require("../helpers/cloudinary");
const { errorHandler } = require("../helpers/errHandler");

//middleware to get product by id
exports.productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).exec();
    if (!product)
      return res.status(500).json({
        error: "Product is not found",
      });
    req.product = product;
    next();
  } catch (error) {
    next(error);
  }
};

//get product by id
exports.get = (req, res) => {
  const { product } = req;
  return res.status(200).json({ product });
};

//remove product by id
exports.remove = async (req, res, next) => {
  const product = req.product;
  try {
    const deletedProduct = await Product.findByIdAndDelete(product.id).exec();
    return res.status(200).json({
      message: "Delete successful",
      deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res) => {
  const data = req.body;
  const { name, shipping, description, price, category, quantity } = data;
  if (!(name || shipping || description || price || category || quantity))
    return res.status(500).json({
      error: "All fields are required",
    });
  if (req.file) {
    const file = dataUri(req.file).content;
    const imgCloudinary = await uploadSingle(file);
    data.photoUrl = imgCloudinary.url;
  }
  const newProduct = new Product(data);
  newProduct.save((err, product) => {
    if (err) {
      return res.status(500).json({
        error: errorHandler(err),
      });
    }
    return res.status(200).json({
      message: "Create product successful",
      product,
    });
  });
};

exports.update = async (req, res, next) => {
  try {
    product = req.product;
    const data = req.body;
    const { name, shipping, description, price, category, quantity } = data;
    if (!(name || shipping || description || price || category || quantity))
      return res.status(500).json({
        error: "All fields are required",
      });
    if (req.file) {
      const file = dataUri(req.file).content;
      const imgCloudinary = await uploadSingle(file);
      data.photoUrl = imgCloudinary.url;
    }
    const updatedProduct = await Product.findByIdAndUpdate(product.id, data, {
      new: true,
    });
    return res.status(200).json({
      message: "update successful",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/*
 * get products by filter
 * the path like /products?by=category&order=-&limit=10&page=2
 * if it has no query, return all the product by default
 */
exports.get = async (req, res, next) => {
  try {
    const { query } = req;
    const order = query.order || "+";
    const by = query.by || "_id";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find()
      .sort(order + by)
      .limit(limit)
      .skip(skip);
    if (!products) return next(new Error("no product found"));
    return res.status(200).json({
      message: "get products successful",
      products,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * get related products base on one product id
 * products have the same category will be returned
 * included limit and page query
 */
exports.relatedProduct = async (req, res, next) => {
  try {
    const { query, product } = req;
    const limit = parseInt(query.limit) || 5;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .limit(limit)
      .skip(skip);
    if (!relatedProducts)
      return res.status(200).json({
        error: "No product found",
      });
    return res.status(200).json({
      message: "get products successful",
      relatedProducts,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * Get product by category
 * with query sort,by, limit, page
 */
exports.getByCategory = async (req, res, next) => {
  try {
    const {
      query,
      category: { _id },
    } = req;
    const order = query.order || "+";
    const by = query.by || "_id";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find({
      category: _id,
    })
      .sort(order + by)
      .limit(limit)
      .skip(skip);
    if (!products) return next(new Error("no product found"));
    return res.status(200).json({
      message: "get products successful",
      products,
    });
  } catch (error) {
    next(error);
  }
};
