'use strict';

var mongoose = require('mongoose');

// adds the schema type "currency" to mongoose
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var MaskSchema = new mongoose.Schema({
    title: {
      type: String,
      unique: true
    },
    description: {
      type: String
    },
    inventory: Number,
    image: {
      type: String,
      default: 'http://www.wholesaleforeveryone.com/Merchant2/graphics/00000001/hats/atht9030C0137.jpg'
    },
    style: {
        type: String,
        enum: ['eccentric', 'full', 'half'],
        required: true
    },
    color: {
        type: String
    },
    purpose: {
        type: String,
        enum: ['costume', 'burglary', 'armed robbery', 'meth making', 'handling liquid nitrogen', 'skiing']
    },
    price: {
        type: Currency
    },
});


mongoose.model('Mask', MaskSchema);
