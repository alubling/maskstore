app.controller('CartCtrl', function($scope, ShoppingCartService) {
    $scope.isCheckout =  $scope.isCheckout || false;

    var reloadCart = function(cart) {
        if (cart) {
            $scope.masks = cart.getMasks();
            $scope.subtotal = cart.subtotal;
            $scope.quantity = cart.quantity;
            $scope.cart = cart;
        }
    }

    ShoppingCartService.getCart()
        .then(function(cart) {
            reloadCart(cart);
        });

    $scope.removeMask = function(mask) {
        ShoppingCartService.getCart()
            .then(function(cart) {
                cart.remove(mask);
                ShoppingCartService.saveCart(cart)
                    .then(function(cart) {
                        reloadCart(cart);
                    })
            })
    };

    $scope.addMask = function(mask) {
        ShoppingCartService.getCart()
            .then(function(cart) {
                cart.add(mask);
                ShoppingCartService.saveCart(cart)
                    .then(function(cart) {
                        reloadCart(cart);
                    })
            });
    };

    $scope.updateMask = function() {
        ShoppingCartService.saveCart($scope.cart)
            .then(function(cart) {
                reloadCart(cart);
            })
    };
});
