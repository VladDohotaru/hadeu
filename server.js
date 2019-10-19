const express = require('express');
const bodyParser = require('body-parser');
const {
	User,
	getAllUsers,
	createUser,
} = require('./models/model.js');
const app = express();
// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
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

// start the app
app.listen(3000, function() {
  console.log('Express is running on port 3000');
});