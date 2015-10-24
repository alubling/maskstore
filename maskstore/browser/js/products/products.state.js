app.config(function($stateProvider){
	$stateProvider.state('products', {
		url: '/products', 
		templateUrl: "js/products/products.html",
		resolve: {
			masks: function(MasksFactory){
				return MasksFactory.getMasks();
			}
		},
		controller: function($scope, masks){
			$scope.masks = masks;
			console.log($scope.masks);
		}
	} )
})