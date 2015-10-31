'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('cart', {
		url: '/admin',
		templateUrl: 'js/cart/cart.html',
		controller: 'AdminCtrl'
	});
});

app.controller('AdminCtrl', function($scope, AuthService, AdminFactory, $state){

})