'use strict';

var express = require('express');
var router = express.Router();
var Users = require('../../db/models/user')

// get all users
router.get('/', function(req, res) {
	Users.find({})
		.then(function(users){
		res.status('200').json(users);
	})
	.catch(function(err){
		console.log("Error getting users: "+err);
	})	
});

// get a user by ID
router.get('/:userId', function(req, res, next){
	Users.findOne({_id: req.params.userId}).then(function(user){
		res.status('200').json(user);
	})
	.catch(function(err){
		console.log('Error getting user: '+err);
	});
});

// create a new user
router.post('/', function(req, res) {
	var newUser = new Users(req.body).save(function(err, newUser){
		if (err) return res.status('500').send('Error creating user: '+err);
		res.status('200').json(newUser);
	});
});

// update a user by userId
router.put('/:userId', function(req, res) {
	Users.findOneAndUpdate({_id: req.params.userId}, 
		{$set: req.body},
		{new: true})
	.then(function(updatedUser){
		res.status('200').json(updatedUser);
	})
	.catch(function(err){
		console.log("Error updating user: "+err);
	})
});

// delete a user by userId
router.delete('/:userId', function(req, res) {
	Users.findOne({_id: req.params.userId}).then(function(user){
		console.log('Deleting user: '+user);
		user.remove();
		res.status('200').send('Successfully deleted user');
	})
	.catch(function(err){
		console.log("Error removing user: "+err);
	});
});

module.exports = router;