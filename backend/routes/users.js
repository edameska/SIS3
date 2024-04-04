const express = require("express");
const users = express.Router();
const db=require("../db/conn.js")

users.post("/login", async(req, res) => {
    let {username,password} = req.body;
    let isUserComplete =username && password;
    if(isUserComplete){
        try {
            let queryResult = await db.authUser(username)
            if(queryResult.length>0){
                if(queryResult[0].password === password){
                    console.log("Login successful")
                }
                else{
                    console.log("Wrong password")
                }
            }
            else{
                console.log("User does not exist")
            }
         } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }

    }
    else{
        //maybe add whch field is missing
        console.log("username and password are required");
    }
    res.end()
})
//check 06 video if it doesnt work
users.post("/register", async(req, res) => {
    let {username,pass,email,name,surname,role} = req.body;
    let isUserComplete =username && password && email && name && surname && role;
    if(isUserComplete){
        try {
            let queryResult = await db.addUser(username,pass,email,name,surname,role)
            if(queryResult.affectedRows){
                console.log("User created")
            }
         } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }

    }
    else{
        //maybe add whch field is missing
        console.log("field is missing");
    }
    res.end()
})