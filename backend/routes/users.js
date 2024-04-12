const express = require("express");
const users = express.Router();
const session = require('express-session')
const db = require("../db/conn.js");

users.use(session({
    secret:"secretpassword",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires:600000
    }
}));

users.get("/login", (req, res) => {
    if(req.session.user){
        res.send({
            loggedIn:true,
            user:req.session.user
        })
    }else
    {
        res.send({
            loggedIn:false
        });
    }
});

users.post('/login', async (req, res, next) => {
    try{
     const username = req.body.username;
     const password = req.body.password;
     if (username && password){
         const queryResult=await db.authUser(username)        
         if(queryResult.length>0){
             if(password===queryResult[0].Password){
                // console.log(queryResult)
                 res.send({logged:true, user:queryResult[0].Username, role:queryResult[0].Role, userId:queryResult[0].ID})
                 req.session.user=queryResult[0]//saving user in session
                 console.log("valid session")
             } else{
                 res.sendStatus(204)
                  console.log("INCORRECT PASSWORD")
             }
         } else{
             res.sendStatus(204)
             console.log("USER NOT REGISTRED");   
         }
     } 
     else {
         res.sendStatus(204)
         console.log("Please enter Username and Password!")
     }
     res.end();
    }catch(err){
     console.log(err)
     res.sendStatus(500)
     next()
    }
  });


users.post("/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let name = req.body.name;
  let surname = req.body.surname;
  
  // Initialize missingFields array
  let missingFields = [];

  if (!username) {
    missingFields.push("username");
  }
  if (!password) {
    missingFields.push("password");
  }
  if (!email) {
    missingFields.push("email");
  }
  if (!name) {
    missingFields.push("name");
  }
  if (!surname) {
    missingFields.push("surname");
  }

  if (missingFields.length === 0) {
    try {
      let queryResult = await db.addUser(username, password, email, name, surname);
      if (queryResult.affectedRows) {
        console.log("User created");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    console.log("Missing fields:", missingFields.join(", "));
  }
  res.end();
});

module.exports = users;
