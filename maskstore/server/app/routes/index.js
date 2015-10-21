'use strict';
var router = require('express').Router();
module.exports = router;
var MasksModel = require('../../db/models/mask');
var OrdersModel = require('../../db/models/order');

router.use('/members', require('./members'));
router.use('/masks', require('./masks'));
router.use('/reviews', require('./reviews'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
