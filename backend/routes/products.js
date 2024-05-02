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

//pass the id
products.get("/:id", async(req, res, next) => {
   console.log(req.params)
   try{
      console.log(req)
      let queryResult= await db.oneProduct(req.params.id)
      res.json(queryResult)
   }
   catch (err) {
      console.error(err)
      res.sendStatus(500)
   }

})

//search 
products.get("/search/:name", async(req, res, next) => {
   console.log(req.params)
   try{
      console.log(req)
      let queryResult= await db.search(req.params.name)
      res.json(queryResult)
   }
   catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

//adding a new product
products.post("/", async(req, res, next) => {
   console.log(req.body)
   let name = req.body.Name;
   let price= req.body.Price
   let weight= req.body.Weight
   let height = req.body.Height
   let width= req.body.Width
   let depth = req.body.Depth
   let stock = req.body.StockLevel
   let desc= req.body.Description
   let isCompleteProduct = name && price && weight && height && width && depth && desc && stock;
   if (isCompleteProduct) {

         try{
            let  queryResult = await db.addProduct(name, price, weight, height, width, depth, desc, stock)
            if(queryResult.affectedRows){
               console.log("product added")
            }
         }
         catch (err) {
            console.error(err)
            res.sendStatus(500)
         }
   }
   else {
      console.log("missing fields")
      res.sendStatus(400)
   }
   res.end()

})

module.exports = products;