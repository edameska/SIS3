const express = require("express");
const wishlist = express.Router();
const db = require("../db/conn.js");

// Route to get all products in the wishlist
wishlist.get("/all/:id", async (req, res, next) => {
  const userID = req.params.id;
  try {
    let queryResult = await db.allProductsW(userID);
    res.json(queryResult);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Route to check if a product is in the wishlist
wishlist.get("/check", async (req, res, next) => {
  const userID = req.query.userID;
  const productID = req.query.productID;
  try {
    let isInWishlist = await db.checkIfInWishlist(userID, productID);
    res.json({ inWishlist: isInWishlist });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


// Route to get a specific product in the wishlist by ID
wishlist.get("/:id", async (req, res, next) => {
  try {
    let queryResult = await db.oneProduct(req.params.id);
    res.json(queryResult);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// Route to add a new product to the wishlist
wishlist.post("/", async (req, res, next) => {
  const { userID, productID } = req.body;

  if (!userID || !productID) {
    console.log("Missing fields in request");
    return res.sendStatus(400);
  }

  try {
    const queryResult = await db.addToWishlist(userID, productID);
    if (queryResult === 'Product added to wishlist successfully.') {
      console.log("Product added to wishlist");
      return res.sendStatus(200);
    } else if (queryResult === 'Product already exists in the wishlist.') {
      console.log("Product already exists in the wishlist");
      return res.sendStatus(409);
    } else {
      console.log("Failed to add product to wishlist");
      return res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});

// Route to remove a product from the wishlist
wishlist.delete("/", async (req, res, next) => {
  const userID = req.query.userID;
  const productID = req.query.productID;
  if (!userID || !productID) {
    console.log("Missing fields in request");
    return res.sendStatus(400);
  }

  try {
    const queryResult = await db.removeWishlistItem(userID, productID);
    if (queryResult === 'Product removed from wishlist successfully.') {
      console.log("Product removed from wishlist");
      return res.sendStatus(200);
    } else if (queryResult === 'Product does not exist in the wishlist.') {
      console.log("Product does not exist in the wishlist");
      return res.sendStatus(404);
    } else {
      console.log("Failed to remove product from wishlist");
      return res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
});


module.exports = wishlist;

