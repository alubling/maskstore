app.directive('masks', function(MasksFactory){
  return {
    scope: {
      masks: '='
    },
    restrict: 'E',
    templateUrl: '/js/components/masks/masks.html',
    link: function($scope, element, attrs){
    }
  };
});
