app.directive('account', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $('#context1 .menu .item')
        .tab({
          context: $('#context1')
        });
      $('#context2 .menu .item')
        .tab({
          context: 'parent'
        });
      $('.tabular.menu .item').tab();
    }
  }
})
