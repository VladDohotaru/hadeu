'use strict';

const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';
const {
	getAllUsers,
	createUser,
  getUser,
  createActivity,
	getAllActivities,
  getActivity,
  Activity
} = require('../models/index.js');
const passwordCheck = require('../config/checkPassword');
const requireLogin = require('../middlewares/requireLogin');


module.exports = (router, passport) => {
	router.get('/', requireLogin, function(req, res) {
		res.render('index.html')
	});
		
	router.post('/register', async (req, res) => {
		const { username, password, type } = req.body;
		const user = await createUser({ username, password, type });
		res.json({ user, msg: 'account created successfully' });	
	});
		
	router.get('/login', async function(req, res) {
		res.render('login.html');
	});
		
	router.get('/register', async function(req, res) {
		res.render('register.html');
	});
		
	router.post('/login',  async function(req, res) {
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
				res.cookie('Authorization', token);
				res.redirect('/');
			}
		}
	});
}