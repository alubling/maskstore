'use strict';

var mongoose = require('mongoose');

// adds the schema type "currency" to mongoose
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var schema = new mongoose.Schema({
    orderDate : { 
        type : Date, 
        default: Date.now 
    },
    masks: [{
        mask: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mask'
        },
        price: { 
            type: Currency,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Currency // to use this to calculate check this: https://www.npmjs.com/package/mongoose-currency (also use .toFixed(2) after totalPrice to convert back to currency)
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // how can an order be made available to both an authenticated user AND guest session?
    }
});

mongoose.model('Order', schema);
