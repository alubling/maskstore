app.directive('products', function(){
  return {
    restrict: 'A',
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
