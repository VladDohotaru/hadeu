// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account say hello
    if (req.user) {
      res.send('Hello')
    }
    else {
      res.send('Nu exista user');
    }  
  });
//
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.send('Deja logat')
    }
    res.send('TODO redirect la pagina de login');
  });
};