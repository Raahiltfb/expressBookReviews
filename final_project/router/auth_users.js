const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
};


//only registered users can login
regd_users.post("/customer/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (authenticatedUser(username, password)) {
        // Generate JWT token
        let accessToken = jwt.sign({ username }, 'access', { expiresIn: "1h" });

        req.session.authorization = { accessToken, username };

        return res.status(200).json({ message: "Login successful", accessToken });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
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
  }
});

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
