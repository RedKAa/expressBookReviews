const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username": username, "password": password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "Username already exists!"});
    }
  }
  if(!username){
    return res.status(404).json({message: "Unable to register user. Missing username."});
  }
  if(!password){
    return res.status(404).json({message: "Unable to register user. Missing password."});
  }
});

const getBooks = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
}
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  getBooks().then(books => {
    return res.status(200).json(books);
  });
});

// Get book details based on ISBN
const getBookByIsbn = (isbn) => {
  return new Promise((resolve, reject) => {
    let result;
    if(isbn){
      result = books[isbn];
    }
    setTimeout(() => {
      resolve(result);
    }, 1000);
  })
};
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params?.isbn;
  getBookByIsbn(isbn).then(book => {
    if(book){
      return res.status(200).json(book);
    } else {
      return res.status(404).json({message: "Not found!"});
    }
  });
});
  
// Get book details based on author
const getBookByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    let result = [];
    if(author){
      for (let [key, book] of Object.entries(books)) {
        if(book.author && book.author != 'Unknown' &&  book.author.toLowerCase().indexOf(author) >= 0){
          result.push(book);
        }
      }
    }
    setTimeout(() => {
      resolve(result);
    }, 1000);
  })
};
public_users.get('/author/:author',function (req, res) {
  let author = req.params?.author;
  author = author.trim().toLowerCase();
  getBookByAuthor(author).then(books => {
    return res.status(200).json(books);
  });
});

// Get all books based on title
const getBookByTitle = (title) => {
  return new Promise((resolve, reject) => {
    let result = [];
    if(title){
      for (let [key, book] of Object.entries(books)) {
        if(book.title && book.title.toLowerCase().indexOf(title) >= 0){
          result.push(book);
        }
      }
    }
    setTimeout(() => {
      resolve(result);
    }, 1000);
  })
};
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params?.title;
  title = title.trim().toLowerCase();
  getBookByTitle(title).then(books => {
    return res.status(200).json(books);
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params?.isbn;
  if(isbn){
    let book = books[isbn];
    if(book){
      return res.status(200).json(book.reviews);
    }
  }
  return res.status(200).json({message: "Not found!"});
});

module.exports.general = public_users;
