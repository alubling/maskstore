app.config(function($stateProvider){
	$stateProvider
		.state('products', {
			url: '/products',
			templateUrl: "js/products/products.html",
			resolve: {
				masks: function(MasksFactory){
					return MasksFactory.getMasks();
				}
			},
			controller: function($scope, masks, $state){
				$scope.masks = masks;
			}
		})
	.state('productsDetail', {
		url: '/:id',
		templateUrl: 'js/common/directives/mask/mask.html',
		resolve: {
			mask: function(MasksFactory, $stateParams) {
				return MasksFactory.getMask($stateParams.id);
			}
		},
		controller: function($scope, mask) {
			$scope.mask = mask;
		}
	})
})
