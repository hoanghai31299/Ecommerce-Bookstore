const express = require("express");
const route = express.Router();
const {create} = require("../controllers/controller.products");
const {uploads} = require("../helpers/multer");
route.post("/create",uploads.single("photo"),create)


module.exports = route;
