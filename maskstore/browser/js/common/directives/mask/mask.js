app.directive('mask', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $('.special.cards .image').dimmer({
        on: 'hover'
      });
      scope.addToCart = function(mask) {
        console.log("adding this mask with a title of: ", mask.title);
      }
    }
  };
});
