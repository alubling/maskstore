'use strict';
var router = require('express').Router();
var Reviews = require('../../db/models/review');

//Get All Reviews: GET /reviews
router.get('/', function(req, res, next){
		Reviews.find({})
			.then(function(reviews){
			res.status('200').json(reviews);
		})
		.catch(function(err){
			console.log('Error: '+err);
		});
	});
//Get One Review: GET /reviews/:reviewID
router.get('/:reviewId', function(req, res, next){
	Reviews.find({_id: req.params.reviewId}).then(function(review){
		res.status('200').json(review);
	})
	.catch(function(err){
		console.log('Error getting review: '+err);
	});
});

//Get All Reviews for a particular mask: GET /reviews/mask/:maskId
router.get('/mask/:maskId', function(req, res, next){
	Reviews.find({mask: req.params.maskId}).then(function(reviews){
		res.status('200').json(reviews);
	})
	.catch(function(err){
		console.log('Error getting reviews for mask: '+err);
	});
});

//Get All Reviews for a particular user: GET /reviews/user/:userId
router.get('/user/:userId', function(req, res, next){
	Reviews.find({user: req.params.userId}).then(function(reviews){
		res.status('200').json(reviews);
	})
	.catch(function(err){
		console.log('Error getting reviews for user: '+err);
	});
});

//Create Review: POST /reviews
router.post('/', function(req, res, next){
	var review = new Reviews(req.body).save(function(err, review){
		if (err) return res.status('500').send("Error creating review: "+err);
		res.status('200').json(review);
	})
});

//Update Review: PUT /reviews/:reviewId
router.put('/:reviewId', function(req, res, next){
	var reviewUpdates = req.body;

	Reviews.findOneAndUpdate({_id: req.params.reviewId},
		{$set: reviewUpdates}, 
		{new: true})
	.then(function(updatedReview){
		res.status('200').json(updatedReview);
	})
	.catch(function(err){
		res.status('500').send("Error updating review: "+err);
	});
});

//Delete Review: DELETE /reviews/:maskId
router.delete('/:maskId', function(req, res, next){
	Reviews.findOne({_id: req.params.maskId}).then(function(review){
		console.log('Deleting review: '+review);
		review.remove();
		res.status('200').send('Successfully deleted review');
	})
	.catch(function(err){
			console.log('Error: '+err);
	});
})

router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;
