'use strict';

const  requireLogin = (req, res, next) => {
    console.log('REQUIRE LOGIN', req)
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = requireLogin;