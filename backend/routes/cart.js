const express = require("express");
const cart = express.Router();
const db = require("../db/conn.js");

// Route to get all products in the wishlist
cart.get("/all/:id", async (req, res, next) => {
  try {
    let queryResult = await db.allProductsC();
    res.json(queryResult);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Route to get a specific product in the wishlist by ID
cart.get("/:id", async (req, res, next) => {
  try {
    let queryResult = await db.oneProduct(req.params.id);
    res.json(queryResult);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Route to add a new product to the cart
cart.post("/", async (req, res, next) => {
  const { userID, productID } = req.body;

  if (!userID || !productID) {
    console.log("Missing fields in request");
    return res.sendStatus(400);
  }

  try {
    const queryResult = await db.addToCart(userID, productID);
    if (queryResult === 'Product added to cart successfully.') {
      console.log("Product added to cart");
      return res.sendStatus(200);
    } else if (queryResult === 'Quantity increased in the cart.') {
      console.log("Quantity increased in the cart");
      return res.sendStatus(200);
    } else {
      console.log("Failed to add product to cart");
      return res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});


module.exports = cart;
