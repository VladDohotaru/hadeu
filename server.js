'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

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
	console.log(req.body)
  const { username, password } = req.body;
  createUser({ username, password }).then(user =>
    res.json({ user, msg: 'account created successfully' })
  );
});

app.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  console.log('req.body:', req.body);
  if (username && password) {
    let user = await getUser({ username: username });
    if (!user) {
      res.status(401).json({ message: 'No such user found' });
    }
    if (user.password === password) {
      // from now on we'll identify the user by the id and the id is the 
      // only personalized value that goes into our token
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ msg: 'ok', token: token });
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
});

// start the app
app.listen(3000, function() {
  console.log('Express is running on port 3000');
});