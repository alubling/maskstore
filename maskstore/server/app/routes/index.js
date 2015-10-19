'use strict';
var router = require('express').Router();
module.exports = router;
var MasksModel = require('../../db/models/mask');

router.use('/members', require('./members'));


// these routes are all prepended with /api in the ajax calls

// get all masks for the homepage
router.get('/masks', function(req, res) {

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




// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
