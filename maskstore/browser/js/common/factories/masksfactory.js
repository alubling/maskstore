app.factory('MasksFactory', function($http){
	function getMasks(){
		return $http.get('/api/masks').then(function(res){
			console.log(res.data);
			return res.data;
		});
	}

	return {
		getMasks: getMasks
	}
});