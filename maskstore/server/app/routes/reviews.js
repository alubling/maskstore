'use strict';
var router = require('express').Router();
var Reviews = require('../../db/models/review');

//Get All Reviews: GET /reviews
router.get('/', function(req, res, next){
		Reviews.find({}).then(function(reviews){
			res.status('200').json(reviews);
		})
		.catch(function(err){
			console.log('Error: '+err);
		});
	});

//Create Review: POST /reviews
router.post('/', function(req, res, next){
	Reviews.create(req.body).then(function(newReview){
		res.status('200').json(newReview);
	})
	.catch(function(err){
			console.log('Error: '+err);
		});
});

//Update Review: PUT /reviews/:maskId
router.put('/:maskId', function(req, res, next){
	var query = {_id: req.params.maskId};
	var updatedReview = req.params.body

	Reviews.findOneAndUpdate(query, updatedReview)
	.then(function(updatedReview){
		res.status('200').json(updatedReview);
	})
	.catch(function(err){
		console.log("Error: "+err);
	});
})
//Delete Review: DELETE /reviews/:maskId
router.delete('/:maskId', function(req, res, next){
	Reviews.findOne({_id: req.params.maskId}).remove().exec().then(function(response){
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
