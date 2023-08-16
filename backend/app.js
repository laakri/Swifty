const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const prodRoutes = require("./routes/prod");
const emailRoutes = require("./routes/email");
const categRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const returnRoutes = require("./routes/return");
const couponRoutes = require("./routes/coupon");
const reviewRoutes = require("./routes/review");
const dashboardRoutes = require("./routes/dashboard");
const notificationRoutes = require("./routes/notification");

const app = express();

mongoose.set("strictQuery", false);

//conection to data
mongoose
  .connect(
    "mongodb+srv://laakri:FOsKetQKbHeDsf2s@cluster0.o974hom.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/file-folder", express.static(path.join("backend/file-folder")));
app.use("/file-profile", express.static(path.join("backend/file-profile")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/prods", prodRoutes);
app.use("/api/categs", categRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/return", returnRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notification", notificationRoutes);

module.exports = app;
