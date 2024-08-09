const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let arr = [];
  Object.keys(books).forEach((key) => {
    arr.push(books[key])
  });


  return res.status(200).json({
    books: arr
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = Number(req.params.isbn);
  let resultingBook;
  Object.keys(books).forEach((key) => {
    if(books[key].isbn === isbn) {
      resultingBook = books[key];
      return;
    }
  });
  if(!resultingBook)  {
    return res.status(500).json({message: "No result found"});
  }
  return res.status(200).json({book: resultingBook});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let responseBooks = [];
  Object.keys(books).forEach((key) => {
    if(books[key].author.toLowerCase().includes(author.toLowerCase())) {
      responseBooks.push(books[key]);
      return;
    }
  })
  if(responseBooks.length === 0) {
    return res.status(500).json({message: "No result found"});
  }
  return res.status(200).json({result: responseBooks});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
