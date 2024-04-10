const express = require("express");
const wishlist = express.Router();
const db = require("../db/conn.js");

// Route to get all products in the wishlist
wishlist.get("/all/:id", async (req, res, next) => {
  try {
    let queryResult = await db.allProductsW();
    res.json(queryResult);
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
  let { userID, productID } = req.body;
  let isCompleteRequest = userID && productID;

  if (isCompleteRequest) {
    try {
      let queryResult = await db.addProductToWishlist(userID, productID);
      if (queryResult.affectedRows) {
        console.log("Product added to wishlist");
        res.sendStatus(200);
      } else {
        console.log("Failed to add product to wishlist");
        res.sendStatus(500);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  } else {
    console.log("Missing fields in request");
    res.sendStatus(400);
  }
});

module.exports = wishlist;
