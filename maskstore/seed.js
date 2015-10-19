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
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Review = Promise.promisifyAll(mongoose.model('Review'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Mask = Promise.promisifyAll(mongoose.model('Mask'));

// these are fake users for testing purposes

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.createAsync(users);

};

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

// this should be the real mask data, which needs to be accumulated

var seedMasks = function () {

    var masks = [
        {
            title: 'the propagator',
            description: 'the propogatar is a mask extremely suitable for handling liquid nitrogen, take if from us.',
            inventory: 100,
            image: 'http://www.wholesaleforeveryone.com/Merchant2/graphics/00000001/hats/atht9030C0100.jpg',
            style: 'full',
            color: 'neon yellow',
            category: 'handling liquid nitrogen',
            price: '$19.95'
        },
        {
            title: 'the cthulu',
            description: 'cthulu will scare your friends to death!',
            inventory: 100,
            image: 'http://ecx.images-amazon.com/images/I/81b2kjDDHnL._SL1500_.jpg',
            style: 'eccentric',
            color: 'green',
            category: 'costume',
            price: '$19.95'
        }
    ];

    return Mask.createAsync(masks);

};

connectToDb.then(function () {
    Mask.findAsync({}).then(function (masks) {
        if (masks.length === 0) {
            return seedMasks();
        } else {
            console.log(chalk.magenta('Seems to already be masks data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Masks seeding successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

// these are fake reviews for testing purposes

var seedReviews = function () {

    var reviews = [
        {
            stars: 3,
            text: 'this is the worst mask ever',
        },
        {
            stars: 5,
            text: 'love this thing!'
        }
    ];

    return Review.createAsync(reviews);

};

connectToDb.then(function () {
    Review.findAsync({}).then(function (reviews) {
        if (reviews.length === 0) {
            return seedReviews();
        } else {
            console.log(chalk.magenta('Seems to already be review data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Reviews seeded successfully!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

// these are fake orders for testing purposes

var seedOrders = function () {

    var orders = [
        {
            totalPrice: '$59.95'
        },
        {
            totalPrice: '109.95'
        }
    ];

    return Order.createAsync(orders);

};

connectToDb.then(function () {
    Order.findAsync({}).then(function (orders) {
        if (orders.length === 0) {
            return seedOrders();
        } else {
            console.log(chalk.magenta('Seems to already be order data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Orders seeded successfully!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});

// a method of seeding the entire database at once - modify and use this to drop the existing database and then reseed masks inventory

// mongoose.connection.on('open', function() {
//   mongoose.connection.db.dropDatabase(function() {
//
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
//
//   });
// });
