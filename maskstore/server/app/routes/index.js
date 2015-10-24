'use strict';
var router = require('express').Router();

router.use('/members', require('./members'));
router.use('/masks', require('./masks'));
router.use('/reviews', require('./reviews'));
router.use('/orders', require('./orders'));
router.use('/users', require('./users'));

module.exports = router;