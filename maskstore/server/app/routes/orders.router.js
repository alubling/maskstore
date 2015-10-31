'use strict';
var router = require('express').Router();
var Orders = require('../../db/models/order');

//Get all orders period.
router.get('/', function(req, res){
	Orders.find({})
		.then(function(orders){
		res.status('200').json(orders);
	})
	.catch(function(err){
		res.status('500').send("Error getting orders: "+err);
	})
});

//Get all orders for a user: GET /orders. Is this the right way to find the referring user?
router.get('/user/:userId', function(req, res){
	Orders.find({user: req.params.userId}).then(function(orders){
		res.status('200').json(orders);
	})
	.catch(function(err){
		console.log('Error getting orders for user: '+err);
	});
});

//get one order (just in case we need this)
router.get('/:orderId', function(req, res){
	Orders.find({_id: req.params.orderId}) // this should be findOne but who cares for now
	.populate('masks.mask') // need to grab the masks here rather than just having the ids
	.then(function(order){
		res.status('200').json(order);
	})
	.catch(function(err){
		console.log('Error getting order: '+err);
	});
});

//Create a new order: POST /orders
router.post('/', function(req, res){
	new Orders(req.body).save(function(err, newOrder){
		if (err) {
			return res.status('500').send("Error creating order: "+err);
		}
		res.status('200').json(newOrder); // this is not returning the new order as expected. It looks like what's being returned is a promise?
	});
});

//Update order: PUT /orders/:OrderId
router.put('/:orderId', function(req, res){
	var orderUpdates = req.body;
	Orders.findOneAndUpdate({_id: req.params.orderId},
		{$set: orderUpdates},
		{new: true})
	.then(function(updatedOrder){
		res.status('200').json(updatedOrder);
	})
	.catch(function(err){
		res.status('500').send('Error updating order: '+err);
	});
});

//Delete order: DELETE /orders/:OrderId
router.delete('/:orderId', function(req, res){
	Orders.findOne({_id: req.params.orderId}).then(function(order){
		console.log('Deleting Order: '+order+' \nfor user: '+order.user||'guest');
		order.remove();
		res.status('200').send('Successfully deleted order ID: '+req.params.orderId);
	})
	.catch(function(err){
		console.log('Error removing order: '+err);
	});
});

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

module.exports = router;
