'use strict';

app.factory("CartFactory", function() {
    var masks = [{
        id: 1,
        title: "Guy Fawkes Mask",
        price: 1,
        quantity: 2,
        image: "http://g03.a.alicdn.com/kf/HTB1Rmc.HVXXXXXcXFXXq6xXFXXXt/Free-shipping-V-for-Vendetta-font-b-mask-b-font-Holiday-party-Halloween-font-b-mask.jpg"
    }, {
        id: 2,
        title: "Halloween Mask",
        price: 2,
        quantity: 5,
        image: "http://g03.a.alicdn.com/kf/HTB1ip54JpXXXXX0XVXXq6xXFXXX9/Devil-font-b-Scream-b-font-font-b-Mask-b-font-Halloween-Masquerade-font-b-Mask.jpg"
    }];

    var getTotalQuantity = function() {
        return masks.reduce(function(prev, curr) {
            return {
                quantity: prev.quantity + curr.quantity
            };
        }, {
            quantity: 0
        }).quantity;

    };

    var getMasks = function() {
        return masks;
    };

    var getSubtotal = function() {
        return masks.reduce(function(prev, curr) {
            return {
                price: (prev.price * prev.quantity) + (curr.price * curr.quantity),
                quantity: 1
            };
        }, {
            price: 0,
            quantity: 0
        }).price;
    };

    var removeMask = function(mask) {
        return masks = masks.filter(function(m) {
            return m.id !== mask.id;
        });
    }

    return {
        getSubtotal: getSubtotal,
        getMasks: getMasks,
        getTotalQuantity: getTotalQuantity,
        removeMask: removeMask
    }
})
