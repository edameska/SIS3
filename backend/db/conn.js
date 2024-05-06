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
                    WHERE Wishlist.UserID = ?`, id, (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

dataPool.checkIfInWishlist = (userID, productID) => {
    return new Promise((resolve, reject) => {
        // Check if the product is already in the wishlist
        conn.query(`SELECT * FROM WishlistItem WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
            if (err) {
                return reject(err);
            }
            
            if (results.length > 0) {
                resolve(true); // Product exists in wishlist
            } else {
                resolve(false); // Product doesn't exist in wishlist
            }
        });
    });
};

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

dataPool.removeWishlistItem = (userID, productID) => {
    return new Promise((resolve, reject) => {
        // Check if the product is in the wishlist
        conn.query(`SELECT * FROM WishlistItem WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
            if (err) {
                return reject(err);
            }
            
            // If the product is not in the wishlist, reject
            if (results.length === 0) {
                return reject('Product does not exist in the wishlist.');
            }
            
            // If the product is in the wishlist, delete it
            conn.query(`DELETE FROM WishlistItem WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve('Product removed from wishlist successfully.');
            });
        });
    });

}


//cart
dataPool.allProductsC = (id) => {
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT Product.* , CartItems.quantity
                    FROM Product
                    INNER JOIN CartItems ON Product.ProductID = CartItems.ProductID 
                    INNER JOIN Cart ON CartItems.CartID = Cart.CartID 
                    WHERE Cart.UserID = ?`, [id], (err, results)=>{
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
}


//adding to cart
dataPool.addToCart = (userID, productID) => {
    return new Promise((resolve, reject) => {
        // Check if the product is already in the cart
        conn.query(`SELECT * FROM CartItems WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
            if (err) {
                return reject(err);
            }
            
            // If the product is already in the cart
            if (results.length > 0) {
                // Increase the quantity
                conn.query(`
                    UPDATE CartItems 
                    SET Quantity = Quantity + 1 
                    WHERE UserID = ? AND ProductID = ?
                `, [userID, productID], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve('Quantity increased in the cart.');
                });
            } else {
                // If the product is not in the cart, insert it
                conn.query(`
                    INSERT INTO CartItems (CartID, UserID, ProductID, Quantity) 
                    SELECT c.CartID, ?, ?, 1 
                    FROM Cart c 
                    WHERE c.UserID = ?
                `, [userID, productID, userID], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve('Product added to cart successfully.');
                });
            }
        });
    });
}

dataPool.updateCartQuantity = (userID, productID, quantity) => {
    return new Promise((resolve, reject) => {
        // Check if the product is in the cart
        conn.query(`SELECT * FROM CartItems WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
            if (err) {
                return reject(err);
            }
            
            // If the product is not in the cart
            if (results.length === 0) {
                return reject('Product does not exist in the cart.');
            }
            
            // If the product is in the cart, update the quantity
            conn.query(`
                UPDATE CartItems 
                SET Quantity = ? 
                WHERE UserID = ? AND ProductID = ?
            `, [quantity, userID, productID], (err, results) => {
                if (err) {
                    return reject(err);
                }
                conn.query(`SELECT Product.* , CartItems.quantity
                FROM Product
                INNER JOIN CartItems ON Product.ProductID = CartItems.ProductID 
                INNER JOIN Cart ON CartItems.CartID = Cart.CartID 
                WHERE Cart.UserID = ?`, [userID], (err, updatedProducts) => {
                    if (err) {
                        return reject(err);
                    }
                    
                    return resolve(updatedProducts);
                });
            });
        });
    });
}

dataPool.removeCartItem = (userID, productID) => {
    return new Promise((resolve, reject) => {
        // Check if the product is in the cart
        conn.query(`SELECT * FROM CartItems WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
            if (err) {
                return reject(err);
            }
            
            // If the product is not in the cart
            if (results.length === 0) {
                return reject('Product does not exist in the cart.');
            }
            
            // If the product is in the cart, delete it
            conn.query(`DELETE FROM CartItems WHERE UserID = ? AND ProductID = ?`, [userID, productID], (err, results) => {
                if (err) {
                    return reject(err);
                }
                conn.query(`SELECT Product.* , CartItems.quantity
                FROM Product
                INNER JOIN CartItems ON Product.ProductID = CartItems.ProductID 
                INNER JOIN Cart ON CartItems.CartID = Cart.CartID 
                WHERE Cart.UserID = ?`, [userID], (err, updatedProducts) => {
                    if (err) {
                        return reject(err);
                    }
                    
                    return resolve(updatedProducts);
            });
        });
    });

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

dataPool.addUser = (username, pass, email, name, surname, country) => {
    return new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
            if (err) {
                return reject(err);
            }
            // Insert user
            conn.query(`INSERT INTO User (Username, Password, Email, Name, Surname, Country, Role) VALUES (?, ?, ?, ?, ?, ?, 'Customer')`, [username, pass, email, name, surname, country], (err, userResult) => {
                if (err) {
                    conn.rollback(() => {
                        reject(err);
                    });
                }
                // Insert wishlist
                conn.query(`INSERT INTO Wishlist (UserID) VALUES (?)`, [userResult.insertId], (err, wishlistResult) => {
                    if (err) {
                        conn.rollback(() => {
                            reject(err);
                        });
                    }
                    // Insert cart
                    conn.query(`INSERT INTO Cart (UserID) VALUES (?)`, [userResult.insertId], (err, cartResult) => {
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
                            resolve({ user: userResult, wishlist: wishlistResult, cart: cartResult });
                        });
                    });
                });
            });
        });
    });
};




// id auto incremented
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