const express = require("express");
const users = express.Router();
const session = require('express-session'); // Import express-session
const db = require("../db/conn.js");

// Apply session middleware
users.use(session({
    secret: "secretpassword",
    resave: false,
    saveUninitialized: true,
}));

// Define routes
users.get("/login", (req, res) => {
    if(req.session.user){
        res.send({
            loggedIn: true,
            user: req.session.user
        })
    } else {
        res.send({
            loggedIn: false
        });
    }
});

// Logout
users.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.sendStatus(500); 
        } else {
            console.log("Session destroyed");
            res.sendStatus(200);
        }
    });
});

users.post('/login', async (req, res, next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (username && password) {
            const queryResult = await db.authUser(username);        
            if (queryResult.length > 0) {
                if (password === queryResult[0].Password) {
                    res.send({
                        logged: true,
                        user: queryResult[0].Username,
                        role: queryResult[0].Role,
                        userId: queryResult[0].ID,
                        name: queryResult[0].Name,
                        surname: queryResult[0].Surname,
                        country: queryResult[0].Country,
                        email: queryResult[0].Email
                    });
                    req.session.user = queryResult[0]; // Save user in session
                    console.log("valid session");
                } else {
                    res.sendStatus(204);
                    console.log("INCORRECT PASSWORD");
                }
            } else {
                res.sendStatus(204);
                console.log("USER NOT REGISTRED");   
            }
        } else {
            res.sendStatus(204);
            console.log("Please enter Username and Password!");
        }
        res.end();
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
        next();
    }
});

// Rest of the routes...

module.exports = users;
