'use strict';

app.controller('CartCtrl', function($scope, CartFactory) {
	$scope.cart = CartFactory;
});