const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
 const username = req.params.username;
  let books = books[username];

  if (books) {
    let review = req.body.review;

    if (review) {
      books["review"] = review;
    }

    books[username] = books;
    res.send('Review updated')

// Delete book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const username = req.params.username;
    let review = review[username];

    if (review) {
        delete username[review];
    }

    res.send('Review by ${username} deleted.');
    
    });
    

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
