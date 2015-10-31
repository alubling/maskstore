app.config(function ($stateProvider) {

    // Register the account state for a user's account info
    $stateProvider
      .state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        resolve: {
          user: function(AuthService) {
            return AuthService.getLoggedInUser();
          },
    			orders: function(AuthService, OrderFactory) {
    				return AuthService.getLoggedInUser()
              .then(function(user) {
                console.log("got the user! ", user.user._id);
                return OrderFactory.getOrders(user.user._id);
              })
              .then(function(orders) {
                console.log("orders should be here: ", orders);
                return orders;
              })
              // .catch(function(err) {
              //   console.err(err);
              // });
    			}
    		},
    		controller: function($scope, user, orders) {
    			$scope.user = user;
    			$scope.orders = orders;
          $scope.dates = orders.map(function(order) {
            return moment(order.orderDate).format("MMM Do YY");
          })
    		}
    	})
      .state('account.detail', {
        url: '/:id',
        templateUrl: 'js/account/accountDetail.html',
        resolve: {
          order: function(OrderFactory, $stateParams) {
            console.log("is something happening here? Getting this order by id: ", $stateParams.id);
            return OrderFactory.getOrder($stateParams.id);
          }
        },
        controller: function($scope, order) {
          console.log("got this order again: ", order);
          $scope.order = order;
          $scope.masks = order[0].masks;
        }
      });
});
