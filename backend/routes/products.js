const express = require("express");
const products = express.Router();
const db=require("../db/conn.js")


//sending json object to browser /products
products.get("/", async(req, res, next) => {
 try {
  let queryResult = await db.allProducts()//await bcuz of the promise
  res.json(queryResult)
 } catch (err) {
    console.error(err)
    res.sendStatus(500)
 }
})



module.exports = products;