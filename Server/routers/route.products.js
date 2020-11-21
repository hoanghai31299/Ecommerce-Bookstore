const express = require("express");
const route = express.Router();
const {
  create,
  get,
  remove,
  update,
  productById,
  relatedProduct,
  getByCategory,
} = require("../controllers/controller.products");
const { uploads } = require("../helpers/multer");
const { userById } = require("../controllers/controller.users");
const { categoryById } = require("../controllers/controller.categories");
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/controller.auth");
route.param("userId", userById);
route.param("productId", productById);
route.param("categoryId", categoryById);
route.post(
  "/create/:userId",
  [requireSignin, isAuth, isAdmin, uploads.single("photo")],
  create
);

route.get("/:productId", get);
route.delete(
  "/:productId/:userId",
  [requireSignin, isAuth, isAdmin, uploads.single("photo")],
  remove
);
route.put(
  "/:productId/:userId",
  [requireSignin, isAuth, isAdmin, uploads.single("photo")],
  update
);
route.get("/", get);
route.get("/category/:categoryId", getByCategory);
route.get("/related/:productId", relatedProduct);
module.exports = route;
