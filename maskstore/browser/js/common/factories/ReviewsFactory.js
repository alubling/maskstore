app.factory('ReviewsFactory', function($http){
	function getReviews(id){
    console.log("getting reviews for this mask: ", id);
		return $http.get('/api/reviews/mask/' + id)
      .then(function(res){
			   console.log(res.data);
         return res.data;
		  });
	}

	function createReview(newReview){
		console.log('Creating a new review: ');
		console.log(newReview);
		return $http.post('/api/reviews/', newReview).then(function(res){
			console.log(res.data);
			return res.data;
		});
	}

	// function getMask(id){
	// 	console.log("making a request to get one mask! this one: ", id);
	// 	return $http.get('/api/masks/' + id)
	// 		.then(function(res){
	// 			console.log(res.data);
	// 			return res.data;
	// 	});
	// }

	return {
		getReviews: getReviews,
		createReview: createReview
	}
});
