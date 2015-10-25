app.factory("CartFactory", function() {
    var orders = [{
        id: 1,
        title: "Party Mask",
        price: 1,
        quantity: 2,
        image: "http://g02.a.alicdn.com/kf/HTB1OvuLHVXXXXakXpXXq6xXFXXXm/resin-font-b-mask-b-font-font-b-Chainsaw-b-font-font-b-Massacre-b-font.jpg"
    }, {
        id: 2,
        title: "Surgical Mask",
        price: 2,
        quantity: 5,
        image: "https://hardartworker.files.wordpress.com/2010/04/33292.jpg?w=600&h=600"
    }];

    var getTotalItems = function() {
        return orders.reduce(function(prev, curr) {
            return {
                quantity: prev.quantity + curr.quantity
            };
        }, {
            quantity: 0
        }).quantity;
    };

    var getOrders = function() {
        return orders;
    };

    var getTotalPrice = function() {
        return orders.reduce(function(prev, curr) {
            return {
                price: (prev.price * prev.quantity) + (curr.price * curr.quantity),
                quantity: 1
            };
        }, {
            price: 0,
            quantity: 0
        }).price;
    };

    return {
        totalPrice: getTotalPrice(),
        orders: getOrders(),
        totalItems: getTotalItems()
    }
})
