const express=require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser=require('cookie-parser')
const path = require('path')

dotenv.config()

const port=process.env.PORT||8121;

const products = require("./routes/products")
const users = require('./routes/users')
const wishlist = require('./routes/wishlist')
const cart = require('./routes/cart')
const contact= require('./routes/contact')

app.use(express.static(path.join(__dirname, 'build')))//to serve static files
app.use(cookieParser("secretpassword"))//to parse cookies
app.use(express.json())//to send between frontend and backend
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin: ['http://88.200.63.148:8123'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],//to send cookies
    credentials: true // enable set cookie
}))


app.use('/images', express.static(path.join(__dirname, 'Images')));


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))//to send index.html file
})

app.use("/products", products)
app.use('/users', users)
app.use('/wishlist',wishlist)
app.use('/cart',cart)
app.use('/contact',contact)

//process gives us port or we use one provideed by us
app.listen(port, ()=>
console.log(`Server is running on port ${port}`
))


