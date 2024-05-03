//contains the connection to the database
const mysql=require('mysql2')//dependency
const conn=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
})


let dataPool={}

dataPool.allProducts = () => {
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT * FROM Product`, (err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}

dataPool.oneProduct = (id)=> {
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT * FROM Product  WHERE ProductID = ?`, id, (err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}

//wishlist
dataPool.allProductsW = (id) => {
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT Product.* 
        FROM Product
        INNER JOIN WishlistItem ON Product.ProductID = WishlistItem.ProductID 
        INNER JOIN Wishlist ON WishlistItem.WishlistID = Wishlist.WishlistID 
        WHERE Wishlist.UserID = ?`, id ,(err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}
//cart
dataPool.allProductsC = (id) => {
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT Product.* 
        FROM Product 
        INNER JOIN CartItem ON Product.ProductID = CartItem.ProductID 
        INNER JOIN Cart ON CartItem.CartID = Cart.CartID 
        WHERE Cart.UserID = ?`, id ,(err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}



//fix it up a bit
dataPool.authUser = (username) => {
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT * FROM User WHERE Username = ?`, username, (err,res, fields)=>{
            if(err){return reject(err)}
            return resolve(res)
          })
        })  
      
}


dataPool.addUser = (username,pass,email,name,surname,country) => {
    return new Promise((resolve, reject)=>{
        conn.query(`INSERT INTO User (Username,Password,Email,Name,Surname,Country,Role) VALUES (?, ?, ?, ?, ?, ?,'Customer')`, [username,pass,email,name,surname,country], (err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}

//do it for cart as well
dataPool.addUser = (username, pass, email, name, surname, country) => {
    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) {
                return reject(err);
            }
            // Insert user
            conn.query(`INSERT INTO User (Username, Password, Email, Name, Surname, Country, Role) VALUES (?, ?, ?, ?, ?, ?, 'Customer')`, [username, pass, email, name, surname, country], (err, results) => {
                if (err) {
                    conn.rollback(() => {
                        reject(err);
                    });
                }
                // Insert wishlist
                conn.query(`INSERT INTO Wishlist (UserID) VALUES (?)`, [result.insertId], (err, wResult) => {
                    if (err) {
                        conn.rollback(() => {
                            reject(err);
                        });
                    }
                    conn.commit((err) => {
                        if (err) {
                            conn.rollback(() => {
                                reject(err);
                            });
                        }
                        resolve({ user: results, wishlist: wResult });
                    });
                });
            });
        });
    });
};



//stock level, id auto incremented
dataPool.addProduct= (name,price,weight,height,width,depth,desc,stocklevel) =>{
    return new Promise((resolve, reject)=>{
        conn.query(`INSERT INTO Product (Name,Price,Weight,Height,Width,Depth,Description,StockLevel) VALUES (?, ?, ?, ?, ?, ?, ?,?)`, [name,price,weight,height,width,depth,desc,stocklevel],(err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })

}
//adding product to wishlist
dataPool.addToWishlist = (userID, productID) => {
    return new Promise((resolve, reject) => {
        // Check if the product is already in the wishlist
        conn.query(`SELECT * FROM WishlistItem WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
            if (err) {
                return reject(err);
            }
            
            // If the product is already in the wishlist, reject
            if (results.length > 0) {
                return reject('Product already exists in the wishlist.');
            }
            
            // If the product is not in the wishlist, insert it
            conn.query(`
            INSERT INTO WishlistItem (WishlistID, UserID, ProductID) 
            SELECT w.WishlistID, ?, ? 
            FROM Wishlist w 
            WHERE w.UserID = ?
        `, [userID, productID, userID], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve('Product added to wishlist successfully.');
            });
        });
    });
}

//adding to cart
dataPool.addToCart=(userID, productID) =>{
    return new Promise((resolve, reject) => {
        // Check if the product is already in the cart
        conn.query(`SELECT * FROM CartItem WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
            if (err) {
                return reject(err);
            }
            
            // If the product is already in the cart
            if (results.length > 0) {
                return reject('Product already exists in the cart.');
            }
            
            // If the product is not in the cart, insert it
            conn.query(`INSERT INTO CartItem (UserID, ProductID) VALUES (?, ?)`, [userID, productID], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve('Product added to cart successfully.');
            });
        });
    });
}

//search products
dataPool.search=(search) =>{
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT * FROM Product WHERE Name LIKE ?`, '%'+search+'%',(err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}


conn.connect(err=>{
    if(err){
        console.log("ERROR"+err.message)
        return;
    }
    console.log("Connected to the database")
})

module.exports=dataPool