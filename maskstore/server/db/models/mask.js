'use strict';

var mongoose = require('mongoose');

// adds the schema type "currency" to mongoose
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var MaskSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1
    },
    inventory: {
        type: Number,
        min: 0,
        default: 0
    },
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
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['costume', 'burglary', 'armed robbery', 'meth making', 'handling liquid nitrogen', 'skiing'],
        required: true
    },
    price: {
        type: Currency,
        default: 0,
        min: 0
    },
    quantity: {
        type: Number,
        min: 0
    }
});

MaskSchema.methods.updateInventory = function(amt){
    return this.inventory += amt;
}

MaskSchema.methods.updateCategory = function(cat){
    return this.category = cat.toLowerCase();
}

mongoose.model('Mask', MaskSchema);

module.exports = mongoose.model('Mask', MaskSchema);
