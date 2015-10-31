app.factory('OrderFactory', function($http){
	function getOrders(id){
		return $http.get('/api/orders/user/' + id)
      .then(function(res){
			   console.log(res.data);
         return res.data;
		  });
	}


	function getOrder(id){
		console.log("get this order: ", id);
		return $http.get('/api/orders/' + id)
			.then(function(res){
				console.log(res.data);
				return res.data;
		});
	}

	return {
		getOrders: getOrders,
    getOrder: getOrder
	}
});
