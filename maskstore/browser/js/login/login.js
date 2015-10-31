app.config(function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'AuthCtrl'
    })
    .state('resetPassword', {
        url: '/reset',
        templateUrl: 'js/login/resetPassword.html',
        controller: 'AuthCtrl'
    });
});

app.controller('AuthCtrl', function($scope, AuthService, $state, ShoppingCartService) {
    $scope.login = {};
    $scope.signup = {};
    $scope.error = null;

    $scope.showSignupForm = false;
    $scope.toggleSignupForm = function() {
        $scope.showSignupForm = !$scope.showSignupForm;
    }

    $scope.sendLogin = function(loginInfo) {
        $scope.error = null;
        AuthService.login(loginInfo).then(function(res) {
            // if user had cart previously saved in the db, load those back.
            console.log(res)
            ShoppingCartService.getCart(res.user._id)
                .then(function(cart) {
                    if(res.user.passwordReset) {
                         $state.go('resetPassword')
                     }
                    $state.go('home');
                })
                .catch(function(err) {
                    console.log(err);
                    $state.go('home');
                });


        }).catch(function() {
            $scope.error = 'Invalid login credentials.';
        });

    };
    $scope.setNewPassword = function(userId, newPassword){
        var req = {newPassword: newPassword};
        $http.get('/api/users/'+userId+'/setNewPassword').then(function(res){
            console.log(res.data);
            $state.go('/');
        });
    }
    $scope.sendSignup = function(signupInfo) {
        $scope.error = null;

        AuthService.signup(signupInfo).then(function() {
            $state.go('home');
        }).catch(function(err) {
            $scope.error = 'Error during sign up: ' + err.message;
        });
    }
});
