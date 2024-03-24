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
        conn.query(`SELECT * FROM Product  WHERE ProuctID = ?`, id, (err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}

//fix it up a bit
dataPool.authUser = (username, password) => {
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT * FROM User WHERE Username = ? AND Password = ?`, [username, password], (err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}

dataPool.authUser = (username,pass,email,name,surname,role) => {
    return new Promise((resolve, reject)=>{
        conn.query(`INSERT INTO User (Username,Password,E-mail,Name,Surname,Role) VALUES (?, ?, ?, ?, ?, ?)`, [username,pass,email,name,surname,role], (err, results)=>{
            if(err){
                return reject(err)
            }
            return resolve(results)
        })
    })
}

//stock level, id auto incremented
dataPool.addProduct= (name,price,weight,height,width,depth,desc) =>{
    return new Promise((resolve, reject)=>{
        conn.query(`INSERT INTO Product (Name,PricePerTon(in€),Weight,Height,Width,Depth,Description) VALUES (?, ?, ?, ?, ?, ?, ?)`, [name,price,weight,height,width,depth,desc],(err, results)=>{
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