//contains the connection to the database
const mysql=require('mysql2')//dependency
const conn=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
})

conn.connect(err=>{
    if(err){
        console.log("ERROR"+err.message)
        return;
    }
    console.log("Connected to the database")
})

module.exports=conn