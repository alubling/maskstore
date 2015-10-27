app.service('ShoppingCartService', function(localStorageService, CartFactory) {
    // load existing cartData if exists
    var carts = (localStorageService.get('cartsData') || []).map(function(c) {
        return CartFactory.getExistingCart(c.userId, c);
    });

    var shoppingCartService = this;

    // return the user's shopping cart. 
    // getCart() will create a new cart if one doesn't already exist
    shoppingCartService.getCart = function(userId) {
        var res = carts.filter(function(c) {
            return c.userId === userId;
        });

        if (res.length === 1) {
            return res[0];
        } else {
            var newCart = CartFactory.getCart(userId);
            carts.push(newCart);
            localStorageService.set('cartsData', carts);
            return newCart;
        }
    };

    // saves all carts into localStorage
    shoppingCartService.saveCart = function(cart) {
        for (var i = 0; i < carts.length; i++) {
            if (carts[i].userId === cart.userId) {
                console.log('auto saving');
                cart.isNew = false;
                carts[i] = cart;
                localStorageService.set('cartsData', carts);
                break;
            }
        }
    };

    // clear shopping cart
    shoppingCartService.clearCart = function(cart) {
        for (var i = 0; i < carts.length; i++) {
            if (carts[i].userId === cart.userId) {
                cart.clear();
                localStorageService.set('cartsData', carts);
                break;
            }
        }
    };
});
