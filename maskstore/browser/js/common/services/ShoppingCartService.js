app.service('ShoppingCartService', function(localStorageService, CartFactory, AuthService, $http, $q) {
    var shoppingCartService = this;
    var LOCAL_STORAGE_KEY = "cartsData";

    // if userId is available, getCart() will return the saved cart from the db
    // otherwise it will return one from localStorage if available. If not, 
    // getCart() will create a new cart and return that.
    shoppingCartService.getCart = function(userId) {
        if (userId) {
            return $http.get('/api/users/'+userId+'/cart')
                .then(function(res) {
                    return CartFactory.getCart(userId, res.data);
                });
        } else {
            return $q(function(resolve, reject) {
                var cartsData = localStorageService.get(LOCAL_STORAGE_KEY);
                if (cartsData) {
                    return resolve(CartFactory.getCart(userId, cartsData));
                }
                else {
                    var cart = CartFactory.getCart(userId);
                    localStorageService.set(LOCAL_STORAGE_KEY, cart);
                    return resolve(cart);
                }
            });
        }
    };
       

    // saves cart into localStorage
    shoppingCartService.saveCart = function(cart) {
        console.log(cart);
        console.log(cart.userId)
        if (AuthService.isAuthenticated()) {
            return $http.put('/api/users/'+cart.userId+'/cart', cart)
                .then(function(res) {
                    console.log('we made it! added to cart and saved. check out the updated cart:');
                    console.log(res.data);
                    return res.data;
                }, function(err){
                    console.log(err);
                });
        } else {
            localStorageService.set(LOCAL_STORAGE_KEY, cart);
        }
    }
});
