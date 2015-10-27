app.directive('products', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/products/products.html',
    link: function(scope, element, attrs) {
      $('.ui.dropdown')
        .dropdown({
          transition: 'drop'
        });
      $('.reset.button')
        .on('click', function() {
          $('.ui.dropdown')
            .dropdown('clear');
        });
    }
  };
});
