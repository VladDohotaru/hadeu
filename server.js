'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const passwordCheck = require('./config/checkPassword.js');
const requireLogin = require('./middlewares/requireLogin');
let ExtractJwt = passportJWT.ExtractJwt;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
const bodyParser = require('body-parser');
const {
	getAllUsers,
	createUser,
  getUser,
  createActivity,
	getAllActivities,
	getActivity
} = require('./models/index.js');

const passport = require('./config/passport');

const app = express();
app.use(passport.initialize());
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', __dirname + '/public/html');

app.get('/', requireLogin, function(req, res) {
  res.json({ message: 'Express is up!' });
});

app.get('/users', function(req, res) {
  res.render('users.html');
});

app.get('/api/users', function(req, res) {
  getAllUsers().then((response) => {
    res.json(response).end();
  }); 
});

app.get('/activitati', function(req, res) {
  res.render('activity.html')
});

app.get('/api/activitati', function(req, res) {
  getAllActivities().then((response) => {
    res.json(response).end();
  }); 
});

app.post('/api/activitati', function(req, res) {
  createActivity(req.body).then((response) => {
    res.json(response)
  }); 
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
    let user = await getUser({ username: username });
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