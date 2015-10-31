'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: 'js/admin/admin.html',
		controller: 'AdminCtrl'
	})
	.state('inventorymgmt', {
		url: '/inventorymgmt',
		templateUrl: 'js/admin/inventorymgmt.html',
		resolve: {
			masklist: function(MasksFactory){
				return MasksFactory.getMasks();
			}
		},
		controller: function($scope, masklist, $state, AdminFactory, MasksFactory){
			$scope.masks = masklist;
			$scope.createMask = AdminFactory.createMask;
			$scope.styles = [{num: 0, name: 'Eccentric'}, {num: 1, name:'Full'}, {num: 2, name: 'Half'}];
			$scope.categories = [{num: 0, name: 'Costume'}, {num: 1, name: 'Burglary'}, {num: 2, name: 'Armed robbery'}, {num: 3, name: 'Meth making'}, {num: 4, name: 'Handling liquid nitrogen'}, {num: 5, name: 'Skiing'}];
			$scope.addInventory = AdminFactory.addInventory;
			$scope.subtractInventory = AdminFactory.subtractInventory;
			$scope.updateCategory = AdminFactory.updateCategory;
		}
	})
	.state('ordermgmt', {
		url: '/ordermgmt',
		templateUrl: 'js/admin/ordermgmt/ordermgmt.html',
		controller: 'AdminCtrl'
	})
	.state('usermgmt', {
		url: '/usermgmt',
		templateUrl: 'js/admin/usermgmt/usermgmt.html',
		controller: 'AdminCtrl'
	});
});

app.controller('AdminCtrl', function($scope, AuthService, AdminFactory, $state){
	$scope.users = AdminFactory.getAllUsers();
})