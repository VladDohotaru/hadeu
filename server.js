'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const passwordCheck = require('./config/checkPassword.js');
const encryption = require('./config/passwordEncryption.js');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
const bodyParser = require('body-parser');
const {
	User,
	getAllUsers,
	createUser,
	getUser,
} = require('./models/model.js');
const passport = require('./config/passport');

const app = express();
app.use(passport.initialize());
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// add a basic route
app.get('/', function(req, res) {
  res.json({ message: 'Express is up!' });
});

app.get('/users', function(req, res) {
  getAllUsers().then(user => res.json(user)); 
});
// register route
app.post('/register', function(req, res, next) {
  const { username, password } = req.body;
  createUser({ username, password }).then(user =>
    res.json({ user, msg: 'account created successfully' })
  );
});

app.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    let securedPassword = encryption(password);
    let user = await getUser({ username: username });
    console.log('User from getUser', user)
    if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (false === passwordCheck(password, user.password)) {
      	res.status(401).json({ msg: 'Password is incorrect' });
       	return done(null, false);
    } else {
      // from now on we'll identify the user by the id and the id is the 
      // only personalized value that goes into our token
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token });
    }
  }
});

// start the app
app.listen(3000, function() {
  console.log('Express is running on port 3000');
});