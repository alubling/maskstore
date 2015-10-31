'use strict';
var router = require('express').Router();
var MasksModel = require('../../db/models/mask');

// these routes are all prepended with /api in the ajax calls

// get all masks for the homepage
router.get('/', function(req, res) {
// in case there is a category filter masks by the category
    var modelParams = {};
    if (req.query.category) {
    	modelParams.category = req.query.category;
    }

    MasksModel.find(modelParams).then(function(masks){
    	res.json(masks);
    })
    .catch(function(err){
    	console.log('Error getting all masks: '+err);
    });
});


// get one mask for its detail page
router.get('/:maskId', function (req, res) {
	MasksModel.findById(req.params.maskId).then(function(mask){
		res.json(mask);
	}, function(err){
		console.log('Error finding mask: '+err);
	});
});

//create a mask
router.post('/', function (req, res){
	req.body.category = req.body.category.toLowerCase();
	req.body.style = req.body.style.toLowerCase();
	new MasksModel(req.body).save(function(err, newMask){
		if (err) {
			console.log(err);
			return res.status(500).send("Error creating mask: "+err);
		}
		res.json(newMask);
	});
});

//update a mask
router.put('/:maskId', function (req, res){
	var maskUpdates = req.body;
	MasksModel.findOneAndUpdate({_id: req.params.maskId},
		{$set: maskUpdates},
		{new: true})
	.then(function(updatedMask){
		res.status(200).json(updatedMask);
	}, function(err){
		res.status(500).send("Error posting mask: "+err);
	});
});
//update a mask inventory
router.put('/:maskId/inv', function (req, res){
	var amt = parseInt(req.body.amt);
	MasksModel.findOne({_id: req.params.maskId}).then(function(mask){
		mask.updateInventory(amt);
		mask.save();
		res.json(mask);
	}, function(err){
		res.status(500).send("Error posting mask: "+err);
	});
});

//update a mask category
router.put('/:maskId/cat', function (req, res){
	var cat = req.body.category
	MasksModel.findOne({_id: req.params.maskId}).then(function(mask){
		if (req.body.add) {
			mask.addCategory(cat);
			mask.save();
		}
		else {
			mask.removeCategory(cat);
			mask.save();
		}
		res.json(mask);
	}, function(err){
		res.status(500).send("Error posting mask: "+err);
	});
});

//delete a mask
router.delete('/:maskId', function (req, res){
	MasksModel.findOne({_id: req.params.maskId}).then(function(mask){
		console.log('Removing Mask: '+mask.title);
		mask.remove();
		res.status('200').send('Successfully removed the mask.');
	}, function(err){
		console.log('Error removing mask: '+err);
	});
});
//add a category

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;