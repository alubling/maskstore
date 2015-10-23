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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mask',
        required: true
    }
});


mongoose.model('Review', schema);
