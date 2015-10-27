'use strict';

app.controller('CartCtrl', function($scope, ShoppingCartService) {
    $scope.cart = ShoppingCartService.getCart(123);

    // test data -- will remove when we have the ability to add products into shopping cart
    if ($scope.cart.isNew) {
        $scope.cart.add({
            id: 1,
            title: "Guy Fawkes Mask",
            price: 5,
            quantity: 1,
            image: "http://g03.a.alicdn.com/kf/HTB1Rmc.HVXXXXXcXFXXq6xXFXXXt/Free-shipping-V-for-Vendetta-font-b-mask-b-font-Holiday-party-Halloween-font-b-mask.jpg"
        });
        $scope.cart.add({
            id: 2,
            title: "Halloween Mask",
            price: 2,
            quantity: 1,
            image: "http://g03.a.alicdn.com/kf/HTB1ip54JpXXXXX0XVXXq6xXFXXX9/Devil-font-b-Scream-b-font-font-b-Mask-b-font-Halloween-Masquerade-font-b-Mask.jpg"
        });
        $scope.cart.add({
            id: 3,
            title: "Halloween Mask 2",
            price: 4,
            quantity: 1,
            image: "http://g03.a.alicdn.com/kf/HTB1ip54JpXXXXX0XVXXq6xXFXXX9/Devil-font-b-Scream-b-font-font-b-Mask-b-font-Halloween-Masquerade-font-b-Mask.jpg"
        });
        $scope.cart.isNew = false;
    }

    $scope.masks = $scope.cart.getMasks();
    $scope.subtotal = $scope.cart.getSubtotal();


    $scope.removeMask = function(mask) {
        $scope.cart.remove(mask);
        $scope.masks = $scope.cart.getMasks();
        $scope.subtotal = $scope.cart.getSubtotal();
    };

    $scope.addMask = function(mask) {
        $scope.cart.add(mask);
        $scope.masks = $scope.cart.getMasks();
        $scope.subtotal = $scope.cart.getSubtotal();
    };

    $scope.$watch('cart', function() {
        ShoppingCartService.saveCart($scope.cart);
    }, true);
});
