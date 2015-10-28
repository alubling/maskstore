app.service('ShoppingCartService', function(localStorageService, CartFactory, AuthService, $http, $q) {
    // load existing cartData if exists
    var carts = (localStorageService.get('cartsData') || []).map(function(c) {
        return CartFactory.getCart(c.userId, c);
    });

    var shoppingCartService = this;

    // return the user's shopping cart. 
    // getCart() will create a new cart if one doesn't already exist
    shoppingCartService.getCart = function(userId) {
        return $q(function(resolve, reject){
            if (userId) {
                   return $http.get('/api/users/:userId/cart').then(function(res){
                        if(!res) {
                            reject('Error: Could not find this user. No cart found.');
                        }
                        resolve(CartFactory.getCart(userId, res.data));
                    });
            }
            else {
                var res = carts.filter(function(c) {
                    return c.userId === userId;
                });
                if (res.length === 1) {
                    resolve(res[0]);
                } 
                else {
                    var newCart = CartFactory.getCart(userId);
                    carts.push(newCart);
                    localStorageService.set('cartsData', carts);
                    resolve(newCart);
                }
            }
        });
    };
       

    // saves all carts into localStorage
    shoppingCartService.saveCart = function(cart) {
    
        $q(function(resolve, reject){
            if (AuthService.isAuthenticated()) {
              return  $http.put('/api/users/:userId/cart', cart).then(function(res){
                    if(!res){
                        reject('Could not save the cart.');
                    }
                    resolve(res.data);
              });
            }
            else {
                for (var i = 0; i < carts.length; i++) {
                    if (carts[i].userId === cart.userId) {
                        console.log('auto saving');
                        cart.isNew = false;
                        carts[i] = cart;
                        localStorageService.set('cartsData', carts);
                        resolve();
                    }
                }
            }
        });
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
