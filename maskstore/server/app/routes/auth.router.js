'use strict'
var router = require('express').Router();
var User = require('../../db/models/user');

router.post('/signup', function (req, res){
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

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;