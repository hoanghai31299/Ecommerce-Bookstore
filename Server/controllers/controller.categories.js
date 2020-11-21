const Category = require("../models/model.category");
const { errorHandler } = require("../helpers/errHandler");

exports.categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category)
      return res.status(500).json({
        error: "Category is not found",
      });
    req.category = category;
    next();
  } catch (error) {
    next(error);
  }
};

exports.create = (req, res) => {
  const { name } = req.body;
  if (!name) return res.json({ error: "Can't not create this category" });
  const newCate = new Category({ name });
  newCate.save((err, category) => {
    if (err)
      return res.status(500).json({
        error: errorHandler(err),
      });
    return res.status(200).json({
      message: "Create category successful",
      category,
    });
  });
};

exports.update = async (req, res, next) => {
  try {
    const data = req.body;
    const { name } = data;
    if (!name) return res.status(500).json({ error: "Name is required" });
    const { _id } = req.category;
    const updatedCategory = await Category.findByIdAndUpdate(_id, data, {
      new: true,
    });
    return res.status(200).json({
      message: "update successful",
      updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};
exports.get = (req, res) => {
  const { category } = req;
  return res.status(200).json({ category });
};

exports.remove = async (req, res, next) => {
  try {
    const { _id } = req.category;
    const deletedCategory = await Category.findByIdAndDelete(_id);
    return res.status(200).json({
      message: "update successful",
      deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};

//get all the categories
exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      message: "get all the categories successful",
      categories,
    });
  } catch (error) {
    next(error);
  }
};
