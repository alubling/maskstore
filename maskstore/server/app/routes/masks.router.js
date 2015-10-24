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
    	res.status('200').json(masks);
    })
    .catch(function(err){
    	console.log('Error getting all masks: '+err);
    });
});


// get one mask for its detail page
router.get('/:maskId', function (req, res) {
	MasksModel.findById(req.params.maskId).then(function(mask){
		res.status('200').json(mask);
	})
	.catch(function(err){
		console.log('Error finding mask: '+err);
	})
});

//create a mask
router.post('/', function (req, res){
	new MasksModel(req.body).save(function(err, newMask){
		if (err) {
			return res.status('500').send("Error creating mask: "+err);
		}
		res.status('200').json(newMask);
	});
});

//update a mask
router.put('/:maskId', function (req, res){
	var maskUpdates = req.body;
	MasksModel.findOneAndUpdate({_id: req.params.maskId},
		{$set: maskUpdates},
		{new: true})
	.then(function(updatedMask){
		res.status('200').json(updatedMask);
	})
	.catch(function(err){
		res.status('500').send("Error posting mask: "+err);
	});
});

//delete a mask
router.delete('/:maskId', function (req, res){
	MasksModel.findOne({_id: req.params.maskId}).then(function(mask){
		console.log('Removing Mask: '+mask.title);
		mask.remove();
		res.status('200').send('Successfully removed the mask.');
	})
	.catch(function(err){
		console.log('Error removing mask: '+err);
	});
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;




//I don't think we need this route -- we can just add all of the masks to the order when the user checks out.

/*// post a specific mask to an order
router.post('/masks/:maskId', function(req, res) {

  // create a new order
  var newOrder = new OrdersModel(); // what if there is an existing order? add a put route? if statement here to check if there's an order? Creating an order might have to come earlier in the process and adding is just a series of puts
  // add a mask to the order
  newOrder.masks.push(req.body._id);
  // increment the total price by this mask
  newOrder.totalPrice += req.body.price;

  newOrder.save().then(function(err, data) {
    console.log("new order created and mask added!");
    res.send(data);
  });
})*/