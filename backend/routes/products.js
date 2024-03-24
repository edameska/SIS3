const express = require("express");
const products = express.Router();


//sending json object to browser
products.get("/", (req, res) => {
  console.log("Products route hit");
  res.json({ title : "Products" });
})

module.exports = products;