const Product = require("../models/model.products");
const { uploadSingle, dataUri } = require("../helpers/cloudinary");
const { errorHandler } = require("../helpers/errHandler");
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
