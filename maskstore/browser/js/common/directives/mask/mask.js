app.directive('mask', function(CartFactory, ShoppingCartService, AuthService) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $('.special.cards .image').dimmer({
                on: 'hover'
            });
            scope.addToCart = function(mask) {
                console.log("adding this mask with a title of: ", mask.title);
                AuthService.getLoggedInUser().then(function(res){
                  var cart = ShoppingCartService.getCart(res.user._id);
                  console.log('Found the user\'s current cart: ');
                  console.log(cart);
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
