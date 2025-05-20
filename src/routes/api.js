const express = require("express");
const User = require("./users/route.js");

const route = express.Router();

route.get("/", (req, res) => {
  return res.status(200).json({ message: "Belajar Crud User" });
});

route.use("/users",User); 

module.exports = route;