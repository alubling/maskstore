app.directive('masks', function(){
  return {
    restrict: 'A',
    link: function($scope, element, attrs){
      $('.special.cards .image').dimmer({
        on: 'hover'
      });
    }
  };
});
