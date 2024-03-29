'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const passwordCheck = require('./config/checkPassword');
const requireLogin = require('./middlewares/requireLogin');
const isAdmin = require('./middlewares/isAdmin');
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
  getActivity,
  Activity
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

app.get('/', function(req, res) {
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

app.get('/activitati/activitate_noua', function(req, res) {
  res.render('addActivity.html')
});

app.get('/api/activitati', function(req, res) {
  getAllActivities().then((response) => {
    res.json(response).end();
  }); 
});

app.post('/api/activitati/activitate_noua', function(req, res) {
  createActivity(req.body).then((response) => {
    res.json(response)
  }); 
});

app.delete('/api/activitati/*', (req, res) => {
  let idToDelete = req.params[0];
  console.log('AICI')
  Activity.destroy({
    where: {
      id: idToDelete
    }
  }).then(response => res.json(response))
});

app.post('/register', function(req, res, next) {
  const { username, password, type } = req.body;
  createUser({ username, password, type }).then(user =>
    res.json({ user, msg: 'account created successfully' })
  );
});

app.get('/login', async function(req, res) {
  res.render('login.html');
});

app.get('/register', async function(req, res) {
  res.render('register.html');
});

app.post('/api/login', async function(req, res, next) {
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

app.listen(3000, function() {
  console.log('Express is running on port 3000');
});