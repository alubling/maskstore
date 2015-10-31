app.controller('CheckoutCtrl', function($scope, ShoppingCartService, $http) {
    $scope.isCheckout = true;

    $scope.submit = function() {
        ShoppingCartService.getCart()
            .then(function(cart) {
                var masks = cart.getMasks();
                var totalPrice = cart.subtotal;
                var user = cart.userId;

                var order = {
                    masks: masks,
                    totalPrice: totalPrice,
                    user: user,
                    status: "created"
                }

                return $http.post('/api/orders', order)
                    .then(function(response) {
                        console.log(response);
                        return response;
                    });
            })
    }
});
