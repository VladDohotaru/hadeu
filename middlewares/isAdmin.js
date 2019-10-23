'use strict';

const isAdmin = ( req, res, next) => {
	console.log('AICI', req);
	if (!req.user) {
		if ('BIBLIOTECAR' === req.user.type) {
			next();
		} else {
			res.send('Nu ai drepturi!');
		}
	} else {
		res.redirect('/login');
	}
  
};

module.exports = isAdmin;