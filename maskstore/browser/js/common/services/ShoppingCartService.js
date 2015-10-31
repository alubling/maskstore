app.service('ShoppingCartService', function(localStorageService, CartFactory, AuthService, $http, $q) {
    var shoppingCartService = this;
    var LOCAL_STORAGE_KEY = "cartsData";

    // if userId is available, getCart() will return the saved cart from the db
    // otherwise it will return one from localStorage if available. If not, 
    // getCart() will create a new cart and return that.
    shoppingCartService.getCart = function(userId) {
        var cartsData = localStorageService.get(LOCAL_STORAGE_KEY);

        if (userId) {
            // authenticated user
            return $http.get('/api/users/' + userId + '/cart')
                .then(function(res) {
                    var cart = CartFactory.getCart(userId, res.data);
                    if (cartsData) {
                        // we have an existing cart in localStorage
                        // merge localStorage's cart with existing cart
                        // from database
                        CartFactory.appendCart(cart, cartsData);
                    }
                    localStorageService.set(LOCAL_STORAGE_KEY, cart);
                    return cart;
                });
        } else {
            // guest user
            var deferred = $q.defer();
            if (cartsData && cartsData.userId) {
                var cart = CartFactory.getCart(cartsData.userId, cartsData);
                deferred.resolve(cart);
                

            } else {
                var cart = CartFactory.getCart(null, cartsData);
                localStorageService.set(LOCAL_STORAGE_KEY, cart);
                deferred.resolve(cart);
            }
            return deferred.promise;
        }
    };

    // Assign a userId to the current cart. This is useful especially we need to create the association with 
    // our existing cart by update the existing shopping cart's user id
    shoppingCartService.associateUserToCart = function(user) {
        if (user) {
            var cartsData = localStorageService.get(LOCAL_STORAGE_KEY);
            if (cartsData) {
                // we have an existing cart, need to associate userId to this cart
                var cart = CartFactory.getCart(user._id, cartsData);
                return localStorageService.set(LOCAL_STORAGE_KEY, cart);
            } else {
                // user has no cart yet, so create one now
                this.getCart()
                    .then(function(cart) {
                        cart.setUserId(user._id);
                        return localStorageService.set(LOCAL_STORAGE_KEY, cart);
                    })
            }
        }
    }

    // saves cart into localStorage
    shoppingCartService.saveCart = function(cart) {
        if (AuthService.isAuthenticated()) {
            return $http.put('/api/users/' + cart.userId + '/cart', cart)
                .then(function(res) {
                    // save cart to localStorage just incase we log out
                    localStorageService.set(LOCAL_STORAGE_KEY, cart);
                    return cart;
                });
        } else {
            var deferred = $q.defer();
            localStorageService.set(LOCAL_STORAGE_KEY, cart);
            deferred.resolve(cart);
            return deferred.promise;
        }
    }

    // saves cart into localStorage
    shoppingCartService.clearCart = function() {
        return localStorageService.clearAll();
    }
});
