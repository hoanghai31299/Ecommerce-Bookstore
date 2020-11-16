const express = require("express");
const route = express.Router();

const {userById} = require("../controllers/controller.users");

route.param("userId", userById);





module.exports = route;
