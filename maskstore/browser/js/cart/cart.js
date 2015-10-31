app.config(function($stateProvider) {
    $stateProvider.state('cart', {
        url: '/cart',
        template: '<shopping-cart></shopping-cart>',
        controller: 'CartCtrl'
    });
});
