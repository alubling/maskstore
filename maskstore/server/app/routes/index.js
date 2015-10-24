'use strict';
var router = require('express').Router();

router.use('/members', require('./members'));
router.use('/masks', require('./masks.router'));
router.use('/reviews', require('./reviews.router'));
router.use('/orders', require('./orders.router'));
router.use('/users', require('./users.router'));
router.use('/auth', require('./auth.router'));

module.exports = router;