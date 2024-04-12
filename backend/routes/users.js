const express = require("express");
const users = express.Router();
const db = require("../db/conn.js");

users.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let isUserComplete = username && password;
  if (isUserComplete) {
    try {
      let queryResult = await db.authUser(username);
      if (queryResult.length > 0) {
        if (queryResult[0].password === password) {
          console.log("Login successful");
        } else {
          console.log("Wrong password");
        }
      } else {
        console.log("User does not exist");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  } else {
    console.log("username and password are required");
  }
  res.end();
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
