'use strict';

var express = require('express');
var router = express.Router();
var Users = require('../../db/models/user')

// get all users
router.get('/', function(req, res) {
	Users.find({}).then(function(users){
		res.status('200').json(users);
	})
	.catch(function(err){
		console.log("Error getting users: "+err);
	})	
});

// create a new user
router.post('/', function(req, res) {
	Users.create(req.body).then(function(newUser){
		res.status('200').json(newUser);
	})
	.catch(function(err){
		console.log("Error creating user: "+err);
	})
});

// update a user by userId
router.put('/:userId', function(req, res) {
	Users.findOneAndUpdate({_id: req.params.userId}, req.body).then(function(updatedUser){
		res.status('200').json(updatedUser);
	})
	.catch(function(err){
		console.log("Error updating user: "+err);
	})
});

// delete a user by userId
router.delete('/:userId', function(req, res) {
	Users.remove({_id: req.params.userId}).then(function(result){
		res.status('200').json(result);
	})
	.catch(function(err){
		console.log("Error removing user: "+err);
	})
});

module.exports = router;