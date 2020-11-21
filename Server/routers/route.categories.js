const express = require("express");
const route = express.Router();

const {
  create,
  categoryById,
  remove,
  update,
  get,
  getAll,
} = require("../controllers/controller.categories");
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/controller.auth");
const { userById } = require("../controllers/controller.users");

route.post("/create/:userId", requireSignin, isAuth, isAdmin, create);

route.get("/:categoryId", get);

route.get("/", getAll);

route.put("/:categoryId/:userId", requireSignin, isAuth, isAdmin, update);

route.delete("/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove);

route.param("userId", userById);
route.param("categoryId", categoryById);
module.exports = route;
