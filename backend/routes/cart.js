const express = require("express");
const cart = express.Router();
const db = require("../db/conn.js");

// Route to get all products in the wishlist
cart.get("/all/:id", async (req, res, next) => {
  const userID = req.params.id;
  try {
    let queryResult = await db.allProductsC(userID);
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
  const { userID, productID, quantity } = req.body;

  if (!userID || !productID || !quantity) {
    console.log("Missing fields in request");
    return res.sendStatus(400);
  }

  try {
    const queryResult = await db.addToCart(userID, productID, quantity);
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
cart.put("/", async (req, res, next) => {
  const { userID, productID, quantity } = req.body;

  if (!userID || !productID || !quantity) {
    console.log("Missing fields in request");
    return res.sendStatus(400);
  }

  try {
    const updatedProducts = await db.updateCartQuantity(userID, productID, quantity);
    console.log("Quantity updated in the cart");
    return res.status(200).json(updatedProducts);
  } catch (err) {
    console.error("Failed to update quantity in the cart:", err);
    return res.sendStatus(500);
  }
});


cart.delete("/", async (req, res, next) => {
  const userID = req.query.userID;
  const productID = req.query.productID;
  if (!userID || !productID) {
    console.log("Missing fields in request");
    return res.sendStatus(400);
  }

  try {
    const queryResult = await db.removeCartItem(userID, productID);
    console.log("Product deleted from cart");
    return res.status(200).json(queryResult);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

module.exports = cart;
