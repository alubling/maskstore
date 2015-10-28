app.factory("CartFactory", function() {
    return {
        getCart: function(userId, data) {
            return new Cart(userId, data);
        },
        getExistingCart: function(userId, cartData) {
            return new Cart(userId, cartData);
        }
    }
})

function Cart(userId, cartData) {
    this.masks = [];
    this.isNew = true;
    this.userId = userId;

    // if cartData is available, use it as the existing data for new cart
    if (cartData) {
        this.masks = cartData.masks;
        this.subtotal = cartData.subtotal;
        this.isNew = false;
        this.userId = userId;
    }
};

Cart.prototype.add = function(mask) {
    this.masks.push(mask);
};

Cart.prototype.remove = function(mask) {
    var indexFound = -1;

    for (var i = 0; i < this.masks.length; i++) {
        if (mask.title === this.masks[i].title) {
            indexFound = i;
            break;
        }
    }

    if (indexFound >= 0)
        var removed = this.masks.splice(indexFound, 1)[0];
};

Cart.prototype.getMasks = function() {
    return this.masks;
};

Cart.prototype.getSubtotal = function() {
    return this.masks.reduce(function(p, c) {
        return p.price + c.price;
    }, 0);
};

Cart.prototype.getQuantity = function() {
    return this.masks.length;
}

Cart.prototype.clear = function() {
    this.masks = [];
}
