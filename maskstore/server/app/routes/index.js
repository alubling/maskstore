'use strict';
var router = require('express').Router();
module.exports = router;
var MasksModel = require('../../db/models/mask');
var OrdersModel = require('../../db/models/order');

router.use('/members', require('./members'));


// these routes are all prepended with /api in the ajax calls

// get all masks for the homepage
router.get('/masks', function(req, res) {

    // in case there is a category filter masks by the category
    var modelParams = {};
    if (req.query.category) {
    	modelParams.category = req.query.category;
    }

    MasksModel.find(modelParams, function (err, masks) {
        setTimeout(function () {
            res.send(masks);
        }, Math.random() * 1000); // this will be a good place for some GSAP animation as the masks come in
    });
});

// get one mask for its detail page
router.get('/masks/:maskId', function (req, res) {

    MasksModel.findById(req.params.maskId, function (err, mask) {
        setTimeout(function () {
            res.send(mask);
        }, Math.random() * 1000);
    });

});

// post a specific mask to an order
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

})


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
