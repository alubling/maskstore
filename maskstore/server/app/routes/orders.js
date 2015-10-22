'use strict';
var router = require('express').Router();
var Orders = require('../../db/models/mask');

//Create a new order: POST /orders
router.post('/', function(req, res, next){
	var newOrder = req.body;
	Orders.create(newOrder).then(function(newOrder){
		res.status('200').json(newOrder);
	})
	.catch(function(err){
		console.log('Error creating order: '+err);
	});
});

//Get all orders for a user: GET /orders. Is this the right way to find the referring user?
router.get('/:userId', function(req, res, next){
	Orders.find({owner.ref: req.params.userId}).then(function(orders){
		res.status('200').json(orders);
	})
	.catch(function(err){
		console.log('Error getting orders for user: '+err);
	});
});

//Update order: PUT /orders/:OrderId
router.put('/:orderId', function(req, res, next){
	Orders.findOneAndUpdate({_id: req.params.OrderId}, req.body).then(function(updatedOrder){
		res.status('200').json(updatedOrder);
	})
	.catch(function(err){
		console.log('Error updating order: '+err);
	});
});

//Delete order: DELETE /orders/:OrderId
router.delete('/:orderId', function(req, res, next){
	Orders.delete({_id: req.params.orderId}).then(function(result){
		res.status('200').send('Successfully deleted order');
	})
})
