app.controller('CartCtrl', function($scope, ShoppingCartService) {
    var reloadCart = function(cart) {
        $scope.masks = cart.getMasks();
        $scope.subtotal = cart.getSubtotal();
        $scope.quantity = cart.getQuantity();
        $scope.cart = cart;
    }

    ShoppingCartService.getCart()
        .then(function(cart) {
            reloadCart(cart);
        });

    $scope.removeMask = function(mask) {
        ShoppingCartService.getCart()
            .then(function(cart) {
                cart.remove(mask);
                return reloadCart(cart);
            });
    };

    $scope.addMask = function(mask) {
        ShoppingCartService.getCart()
            .then(function(cart) {
                cart.add(mask);
                reloadCart(cart);
            });
    };

    $scope.$watch('cart', function() {
        ShoppingCartService.saveCart($scope.cart);
    }, true);
});