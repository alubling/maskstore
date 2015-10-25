'use strict';

app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/cart/cart.html',
        controller: function($scope, CartFactory) {
        	$scope.totalPrice = CartFactory.totalPrice;
        	$scope.orders = CartFactory.orders;
        	$scope.totalItems = CartFactory.totalItems;
        }
    });
});