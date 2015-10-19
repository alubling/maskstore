'use strict';

var mongoose = require('mongoose');

// adds the schema type "currency" to mongoose
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var schema = new mongoose.Schema({

    masks: [
        mask: {
            type: Schema.Types.ObjectId,
            ref: 'Mask'
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        }
    ],
    totalPrice: {
        type: Currency // to use this to calculate check this: https://www.npmjs.com/package/mongoose-currency (also use .toFixed(2) after totalPrice to convert back to currency)
    },
    owner: {
        type: String,
        ref: 'User', // how can an order be made available to both an authenticated user AND guest session?
        required: true
    }
});

mongoose.model('Order', schema);
