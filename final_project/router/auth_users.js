const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let b = true;
  for(let i = 0; i < users.length; i++) {
    if(users[i].username === username) {
      b = false;
    }
  }
  return b;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  //write code to check if username and password match the one we have in records.
  for(let i = 0; i < users.length; i++) {
    let obj = users[i];
    if(obj.username === username && obj.password === password) {
      return true;
    }
  }
  return false;
}

//only registered users can login
regd_users.post("/login", async (req,res) => {
  //Write your code here
  const privateKey = 'privateKey';
  const { username, password } = req.body;
  if(authenticatedUser(username, password)) {
    let token = await jwt.sign({ username, password }, privateKey);
    for(let i = 0; i < users.length; i++) {
      if(users[i].username === username) {
        users[i].jwt = token;
      }
    }
    return res.status(200).json({token});
  }
  else {
    return res.status(400).json({message: "Invalid credentials"});
  }


  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
