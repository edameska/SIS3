const express = require("express");
const products = express.Router();
const db=require("../db/conn.js")
const multer = require("multer")


//multer
// Define the storage location and file naming scheme
const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
   callBack(null, '/home/studenti/famnit/89221002/Desktop/SIS3/backend/Images/'); 
  },
  filename: function (req, file, callBack) {
   callBack(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage: storage });



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
      let queryResult= await db.search(req.params.name)
      res.json(queryResult)
   }
   catch (err) {
      console.error(err)
      res.sendStatus(500)
   }
})

//adding a new product
products.post("/", upload.single('image'), async (req, res, next) => {
   console.log(req.body);
   const name = req.body.Name;
   const price = req.body.Price;
   const weight = req.body.Weight;
   const height = req.body.Height;
   const width = req.body.Width;
   const depth = req.body.Depth;
   const stock = req.body.StockLevel;
   const desc = req.body.Description;
   const image = req.file; 
   console.log(image);
   const imagename = image.filename;

   if (image) {
       const isCompleteProduct = name && price && weight && height && width && depth && desc && stock && imagename;

       if (isCompleteProduct) {
           try {
               const queryResult = await db.addProduct(name, price, weight, height, width, depth, desc, stock, imagename);

               if (queryResult.affectedRows) {
                   console.log("Product added");
                   res.sendStatus(200);
               }
           } catch (err) {
               console.error(err);
               res.sendStatus(500);
           }
       } else {
           console.log("Missing fields");
           res.sendStatus(400);
       }
   } else {
       res.status(400).json({ error: 'Missing image file' });
   }
});
//edit product
products.put("/:id", async (req, res, next) => {
   console.log(req.body);
   console.log(req.file);
   
   const id = req.params.id;
   const name = req.body.Name;
   const price = req.body.Price;
   const weight = req.body.Weight;
   const height = req.body.Height;
   const width = req.body.Width;
   const depth = req.body.Depth;
   const stock = req.body.StockLevel;
   const desc = req.body.Description;


   if (name && price && weight && height && width && depth && desc && stock) {
       try {
           const queryResult = await db.editProduct(id, name, price, weight, height, width, depth, desc, stock);

           if (queryResult.affectedRows) {
               console.log("Product edited");
               res.sendStatus(200);
           } else {
               console.log("No rows affected");
               res.sendStatus(404); // Not found if no rows are affected
           }
       } catch (err) {
           console.error(err);
           res.sendStatus(500);
       }
   } else {
       console.log("Missing fields");
       res.sendStatus(400);
   }
});
//edit image
products.put("/edit-image/:id", upload.single('image'), async (req, res, next) => {
    const id = req.params.id;
    const image = req.file; // Access the uploaded file using req.file

    if (image) {
         const imagename = image.filename;

         try {
              const queryResult = await db.editProductImage(id, imagename);
    
              if (queryResult.affectedRows) {
                console.log("Product image edited");
                res.sendStatus(200);
              } else {
                console.log("No rows affected");
                res.sendStatus(404); // Not found if no rows are affected
              }
         } catch (err) {
              console.error(err);
              res.sendStatus(500);
         }
    } else {
         console.log("Missing fields");
         res.sendStatus(400);
    }
});
//delete product
products.delete("/:id", async (req, res, next) => {
   const id = req.params.id;

   try {
       const queryResult = await db.deleteProduct(id);

       if (queryResult.affectedRows) {
           console.log("Product deleted");
           res.sendStatus(200);
       } else {
           console.log("No rows affected");
           res.sendStatus(404); // Not found if no rows are affected
       }
   } catch (err) {
       console.error(err);
       res.sendStatus(500);
   }
});

module.exports = products;