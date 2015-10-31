app.factory('AdminFactory', function($http){
	function getAllUsers(){
		return	$http.get('/api/users').then(function(res){
			return res.data;
		});
	}

	function deleteUser(userId){
		return $http.delete('/api/users/'+userId).then(function(res){
			console.log(res.data);
		});
	}

	function resetPassword(userId){
		console.log('Triggering password reset for user...');
		return $http.get('/api/users/'+userId).then(function(res){
			var user = res.data;
			if(user.google || user.twitter || user.facebook) {
				console.log('You cannot trigger a password reset for oAuth users.');
			} //don't let password resets trigger for oAuth users.
		}).then(function(){
			return $http.put('/api/users/passwordReset'+userId).then(function(res){
				console.log('User '+res.data.firstName+' '+res.data.lastName+' will be prompted to reset their password on next log in.');
			});
		});
	}

	function createMask(newMask){
		console.log('Creating a new mask: ');
		console.log(newMask);
		return $http.post('/api/masks/', newMask).then(function(res){
			console.log(res.data);
		});
	}

	function addInventory(id, amt){
		console.log('Adding '+amt+' to inventory.');
		if (!amt || !id) return;
		var req = {amt: amt};
		$http.put('/api/masks/'+id+'/inv', req).then(function(res){
			console.log(res.data);
		});
	}
	function subtractInventory(id, amt){
		console.log('Subtracting '+amt+' from inventory.');
		if (!amt || !id) return;
		amt = amt*-1;
		var req = {amt: amt};
		$http.put('/api/masks/'+id+'/inv', req).then(function(res){
			console.log(res.data);
		});
	}

	function updateCategory(id, category){
		if (!category || !id) return;
		console.log('Updating category to '+category);
		var req = {category: category};
		$http.put('/api/masks/'+id+'/cat', req).then(function(res){
			console.log(res.data);
		});
	}

	function changeAdmin(id){
		console.log("Changing admin status of user...")
		$http.put('/api/users/'+id+'/admin').then(function(res){
			console.log(res.data);
		});
	}

	return {
		getAllUsers: getAllUsers,
		deleteUser: deleteUser,
		resetPassword: resetPassword,
		createMask: createMask,
		addInventory: addInventory,
		subtractInventory: subtractInventory,
		updateCategory: updateCategory,
		changeAdmin: changeAdmin
	}
});