'use strict';

var express = require('express');
var router = express.Router();

// get all orders
router.get('/orders', function(req, res) {
	console.log('getting all orders');
	res.send(200);
});

// create a new order
router.post('/orders', function(req, res) {
	console.log('creating an order');
	res.send(200);
});

// update an order by orderId
router.put('/orders/:orderId', function(req, res) {
	console.log('updating order id:' + req.params.orderId);
	res.send(200);
});

// delete an order by orderId
router.delete('/orders/:orderId', function(req, res) {
	console.log('deleted order id:' + req.params.orderId);
	res.send(200);
});

module.exports = router;