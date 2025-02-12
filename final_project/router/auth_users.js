const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
      return (user.username === username && user.password === password);
  });

  if (validusers.length > 0) {
      return true;
  } else {
      return false;
  }
}


//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
    
    if (!username || !password) {
        return res.status(404).json({ message: "Username and password are required" });
    }
    
    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', {expiresIn: 60*60});
        req.session.authorization = {
            accessToken, username
        }
            return res.status(200).send("Customer succesfully logged in")
    } else {
        return res.status(404).json ({ message: "Invalid login. Check username and password"});
    }
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review; 
  const username = req.session.authorization.username; 
  
  if (!review) {
    return res.status(400).json({ message: "Review cannot be empty" });
  }
  

  if (books[isbn]) {
    if (!books[isbn].reviews) {
      books[isbn].reviews = {};
    }

    books[isbn].reviews[username] = review;
    
    return res.status(200).json({ message: `Review for book with ISBN ${isbn} added/updated successfully` });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Delete book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if(books[isbn]) {
    let book = books[isbn];

    if (book.reviews[username]) {
      delete book.reviews[username];

      return res.status(200).json({ message: `Review for book with ISBN ${isbn} by user ${username} deleted. `});

    } else {
      return res.status(404).json({ message : `No review found for user ${username} on book with ISBN ${isbn}`});

    }
  } else {
    return res.status(404).json({message: `Book with ISBN ${isbn} not found.`})
  }

})
    

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
