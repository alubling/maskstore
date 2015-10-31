'use strict';
var router = require('express').Router();

router.post('/auth/signup', function (req, res){
 	User.findOne({email: req.body.email}).then(function(user){
		if (user){
			return res.send('Unable to sign up: an account already exists with that e-mail.');
		}
		new User(req.body).save(function(err, newUser){
			if (err) 
				console.log(err);
				return res.status('500').send(err);
			res.status('200').json(newUser);
		});
	});
});

router.use('/members', require('./members'));
router.use('/masks', require('./masks.router'));
router.use('/reviews', require('./reviews.router'));
router.use('/orders', require('./orders.router'));
router.use('/users', require('./users.router'));

module.exports = router;