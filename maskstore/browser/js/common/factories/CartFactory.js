app.factory("CartFactory", function() {
    return {
        getCart: function(userId, data) {
            return new Cart(userId, data);
        }
    }
})

function Cart(userId, cartData) {
    this.masks = [];
    this.userId = userId;
    this.subtotal = 0;
    this.quantity = 0;

    // if cartData is available, use it as the existing data for new cart
    if (cartData) {
        this.masks = cartData.masks;
        this.subtotal = cartData.subtotal;
        this.userId = userId;
        this.quantity = cartData.quantity;
    }
};

Cart.prototype.add = function(mask) {

    var found = false;
    for (var i = 0; i < this.masks.length; i++) {
        if (this.masks[i].title === mask.title) {
            this.masks[i].quantity++;
            found = true;
            break;
        }
    }
    if (!found) {
        mask.quantity = 1;
        this.masks.push(mask);
    }
};

Cart.prototype.remove = function(mask) {
    var indexFound = -1;

    for (var i = 0; i < this.masks.length; i++) {
        if (mask.title === this.masks[i].title) {
            indexFound = i;
            break;
        }
    }

    if (indexFound >= 0) {
        var removed = this.masks.splice(indexFound, 1)[0];
    }
};

Cart.prototype.getMasks = function() {
    return this.masks;
};

Cart.prototype.getSubtotal = function() {
    return this.masks.map(function(m) {
        return m.quantity * m.price;
    }).reduce(function(p, c) {
        return p + c;
    }, 0);
};

Cart.prototype.getQuantity = function() {
    return this.masks.map(function(m) {
        return parseInt(m.quantity);
    }).reduce(function(p, c) {
        return p + c;
    }, 0);
}

Cart.prototype.clear = function() {
    this.masks = [];
}
