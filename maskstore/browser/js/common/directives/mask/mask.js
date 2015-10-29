app.directive('mask', function(CartFactory, ShoppingCartService, AuthService) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $('.special.cards .image').dimmer({
                on: 'hover'
            });
            $('.rating')
              .rating({
                maxRating: 5,
                disable: true
            });
            scope.addToCart = function(mask) {
                console.log("adding this mask with a title of: ", mask.title);
                AuthService.getLoggedInUser()
                    .then(function(res) {
                        var userId = res === null ? null : res.user._id;
                        var cart = ShoppingCartService.getCart(userId);
                        console.log('Adding Cart with UserId: (' + userId + ')');
                        return cart;
                    })
                    .then(function(cart) {
                        mask.quantity = 1;
                        cart.add(mask);
                        return cart;
                    })
                    .then(function(cart) {
                        ShoppingCartService.saveCart(cart);
                    });
            }
        }
    };
});
