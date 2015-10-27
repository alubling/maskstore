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
				$scope.options = [
					{ label: 'Costume', value: 'costume' },
					{ label: 'Burglary', value: 'burglary' },
					{ label: 'Armed Robbery', value: 'armed robbery' },
					{ label: 'Meth Making', value: 'meth making' },
					{ label: 'Handling Liquid Nitrogen', value: 'handling liquid nitrogen' },
					{ label: 'Skiing', value: 'skiing' },
				];
				// $scope.watch('categoryWatch', function(value) {
				// 	if (value) {
				// 		$state.go('products.category({category: value})');
				// 	}
				// });
				$scope.stateChange = function(value) {
					console.log("is this the value? ", value);
					$state.go('products.category', {category: value });
				}
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
	.state('products.category', {
		controller: function($scope, masks){
			$scope.masks = masks;
		},
		url: '/:category',
		resolve: {
			masks: function(MasksFactory, $stateParams){
					return MasksFactory.getMasks($stateParams.category);
			}
		},
		templateUrl: "js/products/products.html"
	});
});
