const express=require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser=require('cookie-parser')
dotenv.config()

const port=process.env.PORT||8121;

const products = require("./routes/products")
const users = require('./routes/users')
const wishlist = require('./routes/wishlist')
const cart = require('./routes/cart')

app.use(cookieParser("secretpassword"))//to parse cookies
app.use(express.json())//to send between frontend and backend
app.use(express.urlencoded({extended : true}));
app.use(cors({
    origin: ["http://88.200.63.148:8122"],
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],//to send cookies
    credentials: true // enable set cookie
}))



app.get("/",(req,res)=>{
    res.send("This text must be changed to a static file")
})

app.use("/products", products)
app.use('/users', users)
app.use('/wishlist',wishlist)
app.use('/cart',cart)

//process gives us port or we use one provideed by us
app.listen(port, ()=>
console.log(`Server is running on port ${port}`
))


