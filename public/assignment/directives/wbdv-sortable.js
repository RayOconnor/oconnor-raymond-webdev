(function () {
  angular
    .module('WebAppMaker')
    .directive('wbdvSortable', sortableDir)
    .controller('');
  
  function sortableDir() {
    function linkFunc(scope, element, attributes, controllers) {
      var startIndex;
      element.sortable({
        axis: 'y',
        start: function(event, ui) {
          startIndex = ui.item.index();
        },
        stop: function(event, ui) {
          scope.model.reorderWidget(startIndex, ui.item.index());
        },
        handle: ".handle"
      });
    }
    return {
      link: linkFunc
    };
  }
  


})();