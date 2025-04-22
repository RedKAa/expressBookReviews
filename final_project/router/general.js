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
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params?.isbn;
  if(isbn){
    let book = books[isbn];
    if(book){
      return res.status(200).json(book);
    }
  }
  return res.status(404).json({message: "Not found!"});
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let result = [];
  let author = req.params?.author;
  author = author.trim().toLowerCase();
  if(author){
    for (let [key, book] of Object.entries(books)) {
      if(book.author && book.author != 'Unknown' &&  book.author.toLowerCase().indexOf(author) >= 0){
        result.push(book);
      }
    }
  }
  return res.status(200).json(result);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let result = [];
  let title = req.params?.title;
  title = title.trim().toLowerCase();
  if(title){
    for (let [key, book] of Object.entries(books)) {
      if(book.title && book.title.toLowerCase().indexOf(title) >= 0){
        result.push(book);
      }
    }
  }
  return res.status(200).json(result);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
