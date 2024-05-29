const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');

dotenv.config();

const port = process.env.PORT || 8121;

const products = require('./routes/products');
const users = require('./routes/users');
const wishlist = require('./routes/wishlist');
const cart = require('./routes/cart');
const contact = require('./routes/contact');

app.use(express.static(path.join(__dirname, 'build'))); // Serve static files
app.use(cookieParser()); // Parse cookies

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(cors({
    origin: ['http://88.200.63.148:8123'],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/images', express.static(path.join(__dirname, 'Images')));

// Session middleware
let sess = {
    secret: 'secretpassword',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}

app.use(session(sess))


// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/products', products);
app.use('/users', users);
app.use('/wishlist', wishlist);
app.use('/cart', cart);
app.use('/contact', contact);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
