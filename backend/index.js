const express=require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const port=process.env.PORT||8121;
const products = require("./routes/products")
const db= require("./db/conn.js")


app.get("/",(req,res)=>{
    res.send("This text must be changed to a static file")
})

app.use("/products", products)


//process gives us port or we use one provideed by us
app.listen(port, ()=>
console.log(`Server is running on port ${port}`
))


