app.factory("CartFactory", function() {
    return {
        getCart: function(userId, data) {
            return new Cart(userId, data);
        },
        appendCart: function(cart, data) {
            console.log(data);
            for (var i = 0; i < data.masks.length; i++) {
                cart.add(data.masks[i]);
            }
        }
    }
})

function Cart(userId, cartData) {
    this.userId = userId;
    this.masks = [];
    this.subtotal = 0;
    this.quantity = 0;

    // if cartData is available, use it as the existing data for new cart
    if (cartData) {
        this.masks = cartData.masks;

        // calculate only if we have masks
        if (this.masks.length)
            this._recalculate();
    }
};

// allow userId to be set
Cart.prototype.setUserId = function(userId) {
    this.userId = userId;
}

// add a mask to cart
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
        this.masks.push(mask);
        this.masks.slice(-1).quantity = 1;
    }

    this._recalculate();
};

// remove a mask from cart
Cart.prototype.remove = function(mask) {
    var indexFound = -1;
    for (var i = 0; i < this.masks.length; i++) {
        if (mask.title === this.masks[i].title) {
            indexFound = i;
            break;
        }
    }

    if (indexFound >= 0) {
        this.masks.splice(indexFound, 1)[0];
        this._recalculate();
    }
};

Cart.prototype._recalculate = function() {
    this.subtotal = this._getSubtotal();
    this.quantity = this._getQuantity();
}

Cart.prototype.getMasks = function() {
    return this.masks;
};

Cart.prototype._getSubtotal = function() {
    return this.masks.map(function(m) {
        return m.quantity * m.price;
    }).reduce(function(p, c) {
        return p + c;
    }, 0);
};

Cart.prototype._getQuantity = function() {
    return this.masks.map(function(m) {
        return parseInt(m.quantity);
    }).reduce(function(p, c) {
        return p + c;
    }, 0);
}

Cart.prototype.clear = function() {
    this.masks = [];
}
