app.factory('AdminFactory', function($http){
	function getAllUsers(){
		return	$http.get('/api/users').then(function(res){
			return res.data;
		});
	}

	function deleteUser(userId){
		return $http.delete('/api/users/'+userId).then(function(res){
			return console.log(res.data);
		});
	}

	function passwordReset(userId){
		return $http.get('/api/users/'+userId).then(function(res){
			var user = res.data;
			if(user.google || user.twitter || user.facebook) {
				console.log('You cannot trigger a password reset for oAuth users.')
				break;
			} //don't let password resets trigger for oAuth users.
		}).then(function(){
			return $http.put('/api/users/passwordReset'+userId).then(function(res){
				return console.log('User '+res.data.firstName+' '+res.data.lastName+' will be prompted to reset their password on next log in.');
			});
		});
	}
});