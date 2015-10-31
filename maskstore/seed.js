'use strict'
/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var chance = require('chance')(123);
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Mask = Promise.promisifyAll(mongoose.model('Mask'));

function getRandText() {
    var numWords = chance.natural({
        min: 1,
        max: 8
    });
    return chance.sentence({
            words: numWords
        })
        .replace(/\b\w/g, function(m) {
            return m.toUpperCase();
        })
        .slice(0, -1);
}

function getRandomUsers(num) {
    num = num || 1;
    var users = [];
    for (var i = 0; i < num; i++) {
        users.push(
            new User({
                firstName: chance.first(),
                lastName: chance.last(),
                phone: chance.phone(),
                email: chance.email(),
                password: 'password', // default password so we can login
                isAdmin: chance.weighted([true, false], [5, 95]),
                cart: {
                    masks: [],
                    userid: null,
                    subtotal: 0,
                    quantity: 0
                }
            }));
    };

    return users;
}


function getRandomMasks(num) {
    num = num || 1;
    var styles = ['eccentric', 'full', 'half'],
        colors = ['Red', 'Green', 'Yellow', 'Blue', 'Orange', 'Purple', 'Pink', 'Brown', 'Black', 'Gray', 'White'],
        categories = ['costume', 'burglary', 'armed robbery', 'meth making', 'handling liquid nitrogen', 'skiing'],
        masks = [];

    for (var i = 0; i < num; i++) {
        masks.push(
            new Mask({
                title: getRandText(),
                description: getRandText(),
                inventory: chance.natural({
                    min: 1,
                    max: 100
                }),
                image: 'http://www.wholesaleforeveryone.com/Merchant2/graphics/00000001/hats/atht9030C0100.jpg',
                style: styles[chance.natural({
                    min: 0,
                    max: styles.length - 1
                })],
                color: chance.natural({
                    min: 0,
                    max: colors.length - 1
                }),
                category: categories[chance.natural({
                    min: 0,
                    max: categories.length - 1
                })],
                price: chance.dollar()
            }));
    };

    return masks;
};

function getRandomReviews(users, masks) {
    return users.reduce(function(c, d) {
        return masks.reduce(function(a, b) {
            a.push({
                stars: chance.natural({
                    min: 0,
                    max: 5
                }),
                text: getRandText(),
                mask: b,
                user: d
            });
            return a;
        }, []);
    }, []);
};

mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase(function() {
        // these are fake users for testing purposes
        var users = getRandomUsers(10);

        // this should be the real mask data, which needs to be accumulated
        var masks = getRandomMasks(10);
        var maskModels, userModels;

        Promise.resolve(User.createAsync(users))
            .then(function(results) {
                console.log(chalk.green('Seeded Users successful!'));
                userModels = results;
                return Mask.createAsync(masks);
            })
            .then(function(results) {
                console.log(chalk.green('Seeded Masks successful!'));
                maskModels = results;
                var reviews = getRandomReviews(userModels, maskModels);
                return Review.createAsync(reviews);
            })
            .then(function(results) {
                console.log(chalk.green('Seeded Reviews successful!'));

                var orders = [{
                    masks: [{
                        mask: maskModels[0],
                        price: 1,
                        quantity: 1
                    }, {
                        mask: maskModels[1],
                        price: 2,
                        quantity: 3
                    }],
                    totalPrice: '$59.95',
                    user: userModels[0],
                    status: 'completed'
                }];

                return Order.createAsync(orders);
            })
            .then(function(results) {
                console.log(chalk.green('Seeded Orders successful!'));
                process.kill(0);
            })
            .catch(function(err) {
                console.log(chalk.magenta('Error:  ' + err));
                process.kill(1);
            });
    });
});
