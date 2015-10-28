'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var validator = require('validator');

var User = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 1
    },
    lastName: {
        type:String,
        minlength: 1
    },
    phone: {
        type: String,
        minlength: 10
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validator.isEmail, 'invalid email']
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: {
        type: Object
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
User.statics.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64');
};

User.statics.encryptPassword = function(plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

User.methods.authenticate = function(attempt) {
    return this.password === this.constructor.encryptPassword(attempt, this.salt);
};

User.pre('save', function(next) {
    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }
    next();
});

module.exports = mongoose.model('User', User);
