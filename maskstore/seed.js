'use strict'

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
                isAdmin: chance.weighted([true, false], [5, 95])
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
                owner: d
            });
            return a;
        }, []);
    }, []);
};

mongoose.connection.on('open', function() {
    mongoose.connection.db.dropDatabase(function() {
        // these are fake users for testing purposes
        var users = getRandomUsers(50);
        var seedUsers = function() {
            return User.createAsync(users);
        };

        connectToDb.then(function() {
            User.findAsync({}).then(function(users) {
                if (users.length === 0) {
                    return seedUsers();
                } else {
                    console.log(chalk.magenta('Seems to already be user data, exiting!'));
                    process.kill(0);
                }
            }).then(function() {
                console.log(chalk.green('Seed successful!'));
                process.kill(0);
            }).catch(function(err) {
                console.error(err);
                process.kill(1);
            });
        });

        // this should be the real mask data, which needs to be accumulated
        var masks = getRandomMasks(50);
        var seedMasks = function() {
            return Mask.createAsync(masks);

        };

        connectToDb.then(function() {
            Mask.findAsync({}).then(function(masks) {
                if (masks.length === 0) {
                    return seedMasks();
                } else {
                    console.log(chalk.magenta('Seems to already be masks data, exiting!'));
                    process.kill(0);
                }
            }).then(function() {
                console.log(chalk.green('Masks seeding successful!'));
                process.kill(0);
            }).catch(function(err) {
                console.error(err);
                process.kill(1);
            });
        });

        var seedReviews = function() {
            var reviews = getRandomReviews(users, masks);
            return Review.createAsync(reviews);
        };

        connectToDb.then(function() {
            Review.findAsync({}).then(function(reviews) {
                if (reviews.length === 0) {
                    return seedReviews();
                } else {
                    console.log(chalk.magenta('Seems to already be review data, exiting!'));
                    process.kill(0);
                }
            }).then(function() {
                console.log(chalk.green('Reviews seeded successfully!'));
                process.kill(0);
            }).catch(function(err) {
                console.error(err);
                process.kill(1);
            });
        });

        // these are fake orders for testing purposes

        var seedOrders = function() {

            var orders = [{
                masks: [m],
                totalPrice: '$59.95',
                owner: o
            }];

            return Order.createAsync(orders);
        };

        connectToDb.then(function() {
            Order.findAsync({}).then(function(orders) {
                if (orders.length === 0) {
                    return seedOrders();
                } else {
                    console.log(chalk.magenta('Seems to already be order data, exiting!'));
                    process.kill(0);
                }
            }).then(function() {
                console.log(chalk.green('Orders seeded successfully!'));
                process.kill(0);
            }).catch(function(err) {
                console.error(err);
                process.kill(1);
            });
        });
    });
});


// a method of seeding the entire database at once - modify and use this to drop the existing database and then reseed masks inventory

// mongoose.connection.on('open', function() {
//   mongoose.connection.db.dropDatabase(function() {

//     console.log("Dropped old data, now inserting data");
//     Promise.map(Object.keys(data), function(modelName) {
//       return Promise.map(data[modelName], function(item) {
//         return models[modelName].create(item);
//       });
//     }).then(function() {
//       console.log("Finished inserting data");
//     }, console.log).then(function() {
//       mongoose.connection.close()
//     });

//   });
// });
