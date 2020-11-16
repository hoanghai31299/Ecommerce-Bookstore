const express = require("express");
const route = express.Router();
const { validationResult } = require("express-validator");
const {signout, signin, signup,requireSignin } = require("../controllers/controller.auth");
const { userSignupValidator, validateResult } = require("../validators/index");


route.post("/signup", userSignupValidator, validateResult, signup);

route.post("/signin", signin);

route.get("/signout", signout);

module.exports = route;
