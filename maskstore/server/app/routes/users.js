'use strict';

var express = require('express');
var router = express.Router();

// get all users
router.get('/users', function(req, res) {
	console.log('getting all users');
	res.send(200);
});

// create a new user
router.post('/users', function(req, res) {
	console.log('creating a user');
	res.send(200);
});

// update a user by userId
router.put('/users/:userId', function(req, res) {
	console.log('updating user id:' + req.params.userId);
	res.send(200);
});

// delete a user by userId
router.delete('/users/:userId', function(req, res) {
	console.log('deleted user id:' + req.params.userId);
	res.send(200);
});

module.exports = router;