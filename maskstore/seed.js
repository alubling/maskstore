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
        min: 5,
        max: 10
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

function getRealMasks() {
    var images = ['http://www.ravebooth.com/images/CR422.jpg',
    'http://www.ravebooth.com/images/CR435.jpg',
    'http://www.ravebooth.com/images/Plasma-Rainbow-Double-Tank-Gas-Mask.jpg',
    'https://shop.jkarmy.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/m/0/m04-gas-mask-style-mask-with-fan-bk-1.jpg',
    'http://kandigear.com/media/wysiwyg/kandi-mask/kandi-mask-42-1.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d9/Gas_mask_MUA_IMGP0157.jpg',
    'https://s-media-cache-ak0.pinimg.com/236x/84/4b/69/844b69a98cf25ef2c400ad7e33f33d50.jpg',
    'http://assets.audiomack.com/lilbittdp/407b02781f56ee834f6a1db03acb5ec9.jpeg',
    'https://s-media-cache-ak0.pinimg.com/736x/ff/1b/81/ff1b81325fac586f66c8e9eae8ace078.jpg',
    'http://g02.a.alicdn.com/kf/HTB1k5kfJXXXXXc2XXXXq6xXFXXXT/New-Fashion-Winter-cycling-font-b-masks-b-font-wind-dust-font-b-mask-b-font.jpg',
    'http://www.willyvanhoutte.be/images/articles//JSP/PowerCap.jpg?1291298337',
    'https://thehunt.insnw.net/app/public/system/note_images/3607388/note_preview/36156fcf006408ba411d33c884ec5d09.jpg',
    'http://www.lockwoods.com/images/uploads/outdoor%20designs/ski-mask-balaclava.jpg',
    'http://cdn2.bigcommerce.com/server4400/f978b/products/384/images/1486/Call_of_Duty_X17_Ski_Mask__59952.1432146982.195.195.jpg?c=2',
    'http://www.freecreditadvice.com/jan/NewHockeyMask.jpg',
    'http://www.freecreditadvice.com/oct/Pandaskimask_old.jpg',
    'http://ecx.images-amazon.com/images/I/51PL8zRbHrL._SY355_.jpg',
    'http://web.tradekorea.com/upload_file2/sell/83/S00029483/Half_face_gas_mask.jpg',
    'http://3.imimg.com/data3/JN/KI/MY-3037684/respiratory-masks-250x250.jpg',
    'http://g03.a.alicdn.com/kf/HTB1JaYDHVXXXXcyXpXXq6xXFXXX6/Type-M22-Full-Face-Safety-Chemical-Gas-Mask.jpg',
    'http://www.keison.co.uk/products/sabre/facemasks.jpg',
    'http://3.bp.blogspot.com/-KLe1nS9y_H0/USxj-TeRKUI/AAAAAAAAAJY/N8ulKfOU3q0/s1600/-V-for-Vendetta-Mask.jpg',
    'http://1.bp.blogspot.com/-yB2ldKBqD_I/U2vi8HhFn7I/AAAAAAAAJsg/mAXZNYEwpkY/s1600/mask.png',
    'http://1.bp.blogspot.com/-Eg0HQV9E2NY/VPGbrmAf_GI/AAAAAAAAQaw/2ScDZDkwJHA/s1600/SteamStarPilot-1.jpg',
    'http://images2.fanpop.com/images/photos/8100000/Masks-masquerade-8146657-600-400.jpg',
    'http://www.cliparthut.com/clip-arts/1674/best-masquerade-masks-1674002.jpg',
    'http://img.costumecraze.com/images/vendors/disguise/42528-Mens-Deluxe-Spider-man-Mask-large.jpg',
    'http://cdn.instructables.com/F8E/Q54A/H82U8JAO/F8EQ54AH82U8JAO.MEDIUM.jpg',
    'https://emelski.files.wordpress.com/2010/10/small-glowing-mask.jpg',];

var titles = ['Cool raver mask #1', 'Cool raver mask #2', 'Cool rainbow gas mask',
'Intense combat gas mask',
'Joker Candy mask (model not included)',
'Vintage gas mask',
'Creepy skeleton kandi mask',
'Classic brown ski mask',
'Totally white underarmor ski mask',
'Ski-with-friends Ski Mask Set',
'Weird cap mask with window',
'White ski mask',
'Ski mask for people with long necks',
'Call of duty Ski Mask',
'JSON Ski Mask',
'Kawaii Panda Mask',
'Classic black ski mask',
'Serious chemical mask',
'Cheap face mask',
'Full face safety mask',
'Master Chief wannabe mask',
'Guy fawkes mask',
'Illuminati Mask',
'Pretty-sure-its-an-alien Mask',
'Fancy masquerade mask',
'Fancy masquerade mask set',
'Spider man mask',
'Scream mask',
'Glow in the dark mask']
var styles = ['eccentric',
'eccentric',
'half',
'full',
'half',
'full',
'eccentric',
'full',
'full',
'half',
'eccentric',
'full',
'full',
'eccentric',
'eccentric',
'eccentric',
'full',
'full',
'half',
'full',
'eccentric',
'eccentric',
'eccentric',
'full',
'eccentric',
'eccentric',
'eccentric',
'eccentric',
'full']
var category = [
['costume', 'meth making'],
['costume', 'burglary'],
['costume', 'burglary'],
['handling liquid nitrogen', 'meth making'],
['armed robbery', 'costume'],
['armed robbery', 'meth making'],
['burglary', 'costume'],
['armed robbery', 'burglary', 'skiing'],
['skiing'],
['armed robbery', 'burglary', 'skiing'],
['handling liquid nitrogen'],
['skiing'],
['armed robbery', 'burglary', 'skiing'],
['costume', 'burglary'],
['costume', 'burglary'],
['armed robbery', 'burglary', 'skiing'],
['armed robbery', 'burglary', 'skiing'],
['handling liquid nitrogen'],
['meth making','costume'],
['handling liquid nitrogen', 'meth making'],
['costume'],
['costume', 'armed robbery', 'burglary'],
['armed robbery', 'burglary'],
['handling liquid nitrogen', 'meth making', 'costume'],
['costume', 'burglary'],
['costume', 'burglary'],
['costume'],
['costume', 'armed robbery'],
['handling liquid nitrogen', 'costume'],
]
var description = [
'The coolest raver mask you\'ll ever see',
'The second coolest raver mask you\'ll ever see',
'OMG IT\'S A DOUBLE RAINBOW!!!',
'Don\'t go into combat without this.',
'Great if you want to pretend to be the joker at a rave.',
'Old school gas mask now commonly used for making meth and breaking bad.',
'Don\'t mess with the guy wearing this mask. He\'s totally badass.',
'Classic mask. One of our bestsellers.',
'Don\'t tell underarmor we listed this on our site.',
'Now you have enough mask to skii with all your friends! Or for your whole hit squad… whichever you prefer.',
'This mask is really weird. We guess there are probably uses for this.',
'This mask is white so is really only suitable for camo-skiing ',
'If you have an extra long neck, this is the mask for you!',
'Do you LOVE Call of Duty? Here\'s your chance to love it more!',
'Haha… it\'s a JSON mask. Get it? GET IT??',
'TOTEMO KAWAIIIIIII PANDA MASKU',
'Classic mask. Our #1 best seller!',
'This mask is for serious chemical use only. ',
'Cheap face mask for people who are broke. ',
'Full face safety mask  for serious work',
'Do you LOVE Halo? Here\'s your chance to love it more! (Not really..)',
'Total classic Guy Fawkes mask. Multiple uses.',
'For those who are rushing the illuminati',
'This mask is creepy as hell. Great for Halloween or more serious uses. We\'re pretty sure it has an alien origin.',
'Best mask for fancy balls',
'Best mask for fancy parties',
'Do you LOVE Spider Man? Here\'s your chance to pretend to be him! Don\'t jump off buildings.',
'Classic mask that is commonly seen on Halloween.',
'This mask glows in the dark!']
var color = [
'Green',
'Purple',
'Rainbow',
'Green',
'Black',
'Green',
'White',
'Brown',
'White',
'Black',
'Green',
'White',
'Black',
'Green',
'Green',
'White',
'Black',
'Brown',
'White',
'Brown',
'Green',
'White',
'White',
'Brown',
'Black',
'Purple',
'Red',
'White',
'Blue']
var price = [
'2995',
'5300',
'2300',
'1515',
'2000',
'2000',
'3000',
'2995',
'5300',
'2300',
'1515',
'2000',
'2000',
'3000',
'2995',
'5300',
'2300',
'1515',
'2000',
'2000',
'3000',
'2995',
'5300',
'2300',
'1515',
'2000',
'2000',
'3000',
'5000',]

var masks = [];

for (var i = 0; i < images.length; i++) {
    masks.push(
        new Mask({
            title: titles[i],
            style: styles[i],
            description: description[i], 
            color: color[i], 
            category: category[i],
            price: price[i],
            image: images[i],
        }))}
    return masks;
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
                category: [categories[chance.natural({
                    min: 0,
                    max: categories.length - 1
                })]],
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
        var masks = getRealMasks();
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
