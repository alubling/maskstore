app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state) {
    $scope.login = {};
    $scope.signup = {};
    $scope.error = null;

    $scope.showSignupForm = false;
    $scope.toggleSignupForm = function(){
        $scope.showSignupForm = !$scope.showSignupForm;
    }

    $scope.sendLogin = function (loginInfo) {
        $scope.error = null;

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

    $scope.sendSignup = function (signupInfo) {
        $scope.error = null;

        AuthService.signup(signupInfo).then(function(){
            $state.go('home');
        }).catch(function(err) {
            $scope.error = 'Error during sign up: '+err.message;
        });
    }
});