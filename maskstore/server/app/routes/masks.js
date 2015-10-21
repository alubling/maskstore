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

/*
    MasksModel.find(modelParams, function (err, masks) {
        setTimeout(function () {
            res.send(masks);
        }, Math.random() * 1000); // this will be a good place for some GSAP animation as the masks come in
    });
*/
});


// get one mask for its detail page
router.get('/:maskId', function (req, res) {
	MasksModel.findById(req.params.maskId).then(function(mask){
		res.status('200').json(mask);
	})
	.catch(function(err){
		console.log('Error finding mask: '+err);
	})

/*
    MasksModel.findById(req.params.maskId, function (err, mask) {
        setTimeout(function () {
            res.send(mask);
        }, Math.random() * 1000);
    });
*/

});

//create a mask
router.post('/', function (req, res, next){
	var newMask = req.body;
	MasksModel.create(newMask).then(function(newMask){
		res.status('200').json('newMask');
	})
	.catch(function(err){
		console.log('Error creating mask: '+err);
	})
})

//update a mask
router.put('/:maskId', function (req, res, next){
	var currentMask = {_id: req.params.id};
	var updatedMask = req.body;
	MasksModel.findOneandUpdate(currentMask, updatedMask).then(function(newMask){
		res.status('200').json(newMask);
	})
	.catch(function(err){
		console.log('Error updating mask: '+err);
	});
}

//delete a mask
router.delete('/:maskId', function (req, res, next){
	MasksModel.delete({_id: req.params.id}).then(function(result){
		res.status('200').send('Successfully deleted a mask.');
	})
	.catch(function(err){
		console.log('Error deleting mask: '+err);
	});
})

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