const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;

  if(!username) {
    return res.status(400).json({message: "Missing username"});  
  }
  if(!password) {
    return res.status(400).json({message: "Missing password"});  
  }

  if(isValid(username)) {
    users.push({username, password});
    return res.status(200).json({message: "Successfully registered"});  
  }
  else {
    return res.status(400).json({message: "Username already in use"});  
  }
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {
  let result = await new Promise((resolve,reject) => {
    //Write your code here
    let arr = [];
    Object.keys(books).forEach((key) => {
      arr.push(books[key])
    });
    resolve(arr);
  });

  return res.status(200).json({
    books: result
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  let result = await new Promise((resolve,reject) => {
    //Write your code here
    const isbn = Number(req.params.isbn);
    let resultingBook;
    Object.keys(books).forEach((key) => {
      if(books[key].isbn === isbn) {
        resultingBook = books[key];
        return;
      }
    });
    resolve(resultingBook);
  });
  
  if(!result)  {
    return res.status(500).json({message: "No result found"});
  }
  return res.status(200).json({book: result});
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  let result = await new Promise((resolve,reject) => {
    const author = req.params.author;
    let responseBooks = [];
    Object.keys(books).forEach((key) => {
      if(books[key].author.toLowerCase().includes(author.toLowerCase())) {
        responseBooks.push(books[key]);
        return;
      }
    });
    resolve(responseBooks);
  });
  //Write your code here
  if(result.length === 0) {
    return res.status(500).json({message: "No result found"});
  }
  return res.status(200).json({result: result});
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
  let result = await new Promise((resolve,reject) => {
    //Write your code here
    const title = req.params.title;
    let responseBooks = [];
    Object.keys(books).forEach((key) => {
      if(books[key].title.toLowerCase().includes(title.toLowerCase())) {
        responseBooks.push(books[key]);
        return;
      }
    });
    resolve(responseBooks);
  });
  if(result.length === 0) {
    return res.status(500).json({message: "No result found"});
  }
  return res.status(200).json({result: result});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let k;
  Object.keys(books).forEach((key) => {
    if(books[key].isbn === Number(isbn)) {
      console.log(key, k, isbn)
      k = key;
      return;
    }
  })
  if(!k) {
    return res.status(500).json({message: "No result found"});
  }
  return res.status(200).json({reviews: books[k].reviews});
});

module.exports.general = public_users;
