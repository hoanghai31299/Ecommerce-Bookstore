const express = require("express");
const route = express.Router();

const {create} = require("../controllers/controller.categories");
const {requireSignin,isAuth,isAdmin} = require("../controllers/controller.auth");
const {userById} = require("../controllers/controller.users");

route.post("/create/:userId",requireSignin,isAuth,isAdmin, create);

route.param("userId", userById);

module.exports = route;