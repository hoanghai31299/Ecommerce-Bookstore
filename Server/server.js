const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 9000;

//import routers
const authRoute = require("./routers/route.auth");
const userRoute = require("./routers/route.users");
const categoryRoute = require("./routers/route.categories");
const productRoute = require("./routers/route.products");
//connect database
const { mongoose, connectDB } = require("./models");
connectDB();

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());

//routers
app.get("/", (req, res) => {
  res.send("hello anh em");
});
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/categories", categoryRoute);
app.use("/products", productRoute);

app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  }
});
//listen
app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
