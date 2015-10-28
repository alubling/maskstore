app.directive('mask', function(CartFactory, ShoppingCartService, AuthService){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $('.special.cards .image').dimmer({
        on: 'hover'
      });
      scope.addToCart = function(mask) {
        console.log("adding this mask with a title of: ", mask.title);
        if (AuthService.isAuthenticated()) {
          var userid = AuthService.getLoggedInUser()._id //if the user is logged in
          ShoppingCartService.getCart(userid).then(function(cart){ //then find the user's cart in the database (async)
            cart.add(mask);
            return cart;
          })
          .then(function(cart){
             ShoppingCartService.saveCart(cart); //save the cart in the database again.
          });
        }
        else {
          var cart = ShoppingCartService.getCart().add(mask);    
          ShoppingCartService.saveCart(cart);
           }
          };
        }
     }
   });
