'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    text: {
        type: String,
        minlength: 6
    },
    owner: {
        type: String,
        ref: 'User',
        required: true
    },
    mask: {
        type: String,
        ref: 'Mask',
        required: true
    }
});


mongoose.model('Review', schema);
